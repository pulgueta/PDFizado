import { Metadata, NextPage } from 'next';

import { Skeleton } from '~/shadcn/skeleton';
import { Button } from '~/shadcn/button';
import { UserFiles } from '~/components/client/user/user-files';
import { ParentDialog } from '~/components/client/dialog/dialog-component';
import { Dropzone } from '~/components/client/dialog/pdf/dropzone';
import { currentUser } from '~/lib/auth/currentUser';
import { db } from '~/database/db';

export const metadata: Metadata = {
	metadataBase: new URL('https://pdfizado.com/dashboard'),
	alternates: {
		canonical: '/dashboard',
	},
};

export const dynamic = 'force-dynamic';

type DashboardPage = {
	searchParams: {
		page: string;
	};
};

const Dashboard: NextPage<DashboardPage> = async ({ searchParams }) => {
	const page = Number(searchParams.page) || 1;
	const take = 6;
	const skip = page <= 1 ? 0 : Math.abs(page - 1 * take);

	const user = await currentUser();

	const filesCountPromise = db.file.count();

	const filesPromise = db.file.findMany({
		where: {
			userId: user?.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take,
		skip,
	});

	const [files, filesCount] = await Promise.all([
		filesPromise,
		filesCountPromise,
	]);

	const totalPages = Math.ceil(filesCount / take);

	return (
		<>
			<header className='container space-y-4'>
				{user?.name ? (
					<h1
						id='dashboard-title'
						className='mt-4 scroll-m-20 text-pretty text-4xl font-extrabold tracking-tighter md:text-5xl'
					>
						Dashboard de {user.name}
					</h1>
				) : (
					<Skeleton className='mb-8 h-10 w-80 md:w-96' />
				)}
				<p className='mb-4 text-pretty'>
					Bienvenido a tu dashboard, aquí podrás acceder a todas las
					funcionalidades de PDFizado
				</p>
				<ParentDialog
					title='Subir PDF'
					trigger={
						<Button
							disabled={user?.plan === 'FREE' && filesCount >= 6}
						>
							Subir PDF
						</Button>
					}
				>
					<Dropzone />
				</ParentDialog>
			</header>

			<main className='container min-h-dvh md:min-h-[calc(100dvh-390px)]'>
				<h2 className='mt-6 text-2xl font-bold tracking-tight'>
					Tus PDFs:
				</h2>
				<UserFiles
					files={files}
					page={page}
					hasNextPage={skip + take < filesCount}
					totalPages={totalPages}
				/>
			</main>
		</>
	);
};
export default Dashboard;
