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
	const page = Number(searchParams.page) || 1;

	const userPromise = currentUser();
	const filesCountPromise = db.file.count();

	const [user, filesCount] = await Promise.all([
		userPromise,
		filesCountPromise,
	]);

	if (!user) redirect('/login');

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
					trigger={
						<Button
							disabled={user.plan === 'FREE' && filesCount >= 6}
						>
							Subir PDF
						</Button>
					}
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
						user={user}
						page={page}
						filesCount={filesCount}
					/>
				</Suspense>
			</main>
		</>
	);
};
export default Dashboard;
