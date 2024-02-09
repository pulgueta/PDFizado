import { Suspense } from 'react';

import { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

import { Button } from '~/shadcn/button';
import { UserFiles } from '~/components/client/user/user-files';
import { ParentDialog } from '~/components/client/dialog/dialog-component';
import { Dropzone } from '~/components/client/dialog/pdf/dropzone';
import { currentUser } from '~/lib/auth/currentUser';
import { db } from '~/database/db';
import { PDFLoader } from '~/components/server/pdf-loaders';
import { maxFiles, plan } from '~/lib/plan-allowance';

export const metadata: Metadata = {
	metadataBase: new URL('https://pdfizado.com/dashboard'),
	alternates: {
		canonical: '/dashboard',
	},
};

type DashboardPage = {
	searchParams: {
		page: string;
	};
};

const Dashboard: NextPage<DashboardPage> = async ({ searchParams }) => {
	const user = await currentUser();

	if (!user) redirect('/login');

	const page = Number(searchParams.page) || 1;
	const take = 6;
	const skip = page <= 1 ? 0 : Math.abs(page - 1 * take);

	const filesCountPromise = db.file.count();
	const filesPromise = db.file.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take,
		skip,
	});

	const [filesCount, files] = await Promise.all([
		filesCountPromise,
		filesPromise,
	]);

	const totalPages = Math.ceil(filesCount / take);

	const disabled =
		user.plan === plan[user.plan] && filesCount === maxFiles[user.plan];

	console.log({
		user,
		files,
		filesCount,
		disabled,
		userPlan: user.plan,
		plan: plan[user.plan],
		isPlanSame: user.plan === plan[user.plan],
		isFilesExceeded: filesCount >= maxFiles[user.plan],
		maxFiles: maxFiles[user.plan],
	});

	return (
		<>
			<header className='container space-y-4'>
				<h1
					id='dashboard-title'
					className='mt-4 scroll-m-20 text-pretty text-4xl font-extrabold tracking-tighter md:text-5xl'
				>
					¡Hola, {user.name}!
				</h1>

				<p className='mb-4 text-pretty'>
					Bienvenido a tu dashboard, aquí podrás acceder a todas las
					funcionalidades de PDFizado
				</p>
				<ParentDialog
					title='Subir PDF'
					trigger={<Button disabled={disabled}>Subir PDF</Button>}
				>
					<Dropzone />
				</ParentDialog>
			</header>

			<main className='container min-h-dvh md:min-h-[calc(100dvh-270px)]'>
				<h2 className='my-6 text-2xl font-bold tracking-tight'>
					Tus PDFs:
				</h2>
				<Suspense fallback={<PDFLoader />}>
					<UserFiles
						page={page}
						filesCount={filesCount}
						files={files}
						skip={skip}
						take={take}
						totalPages={totalPages}
					/>
				</Suspense>
			</main>
		</>
	);
};
export default Dashboard;
