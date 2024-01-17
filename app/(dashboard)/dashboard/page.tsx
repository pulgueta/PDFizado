import { Metadata } from 'next';

import { UserFiles } from '~/components/client/user/user-files';
import { Skeleton } from '~/shadcn/skeleton';
import { currentUser } from '~/lib/auth/currentUser';
import { ParentDialog } from '~/components/client/dialog/dialog-component';
import { Button } from '~/components/ui/button';
import { db } from '~/database/db';
import { Dropzone } from '~/components/client/dialog/pdf/dropzone';

export const metadata: Metadata = {
	metadataBase: new URL('https://pdfizado.com/dashboard'),
	alternates: {
		canonical: '/dashboard',
	},
};

const Dashboard = async () => {
	const user = await currentUser();

	const files = await db.file.findMany({
		where: {
			userId: user?.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<>
			<header className='container space-y-4'>
				{user?.name ? (
					<h1
						id='dashboard-title'
						className='mt-4 scroll-m-20 text-pretty text-4xl font-extrabold tracking-tighter lg:text-5xl'
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
							disabled={
								user?.plan === 'FREE' && files.length >= 6
							}
						>
							Subir PDF
						</Button>
					}
				>
					<Dropzone />
				</ParentDialog>
			</header>

			<main className='container min-h-screen md:min-h-[calc(100vh-390px)]'>
				<div className='rounded'>
					<h2 className='mt-6 text-2xl font-bold tracking-tight'>
						Tus PDFs:
					</h2>
					<UserFiles />
				</div>
			</main>
		</>
	);
};
export default Dashboard;
