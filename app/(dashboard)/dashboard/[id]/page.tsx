import { UploadPDF } from '~/components/client/dialog/pdf/upload-pdf';
import { UserFiles } from '~/components/client/user-files';
import { Skeleton } from '~/shadcn/skeleton';
import { auth } from '~/lib/auth';

const Dashboard = async () => {
	const session = await auth();

	return (
		<>
			<header className='mx-auto max-w-7xl p-4'>
				{session?.user.name ? (
					<h1 className='mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Dashboard de {session.user.name}
					</h1>
				) : (
					<Skeleton className='mb-8 h-10 w-80 md:w-96' />
				)}
				<p className='mb-4'>
					Bienvenido a tu dashboard, aquí podrás acceder a todas las
					funcionalidades de PDFizado
				</p>
				<UploadPDF />
			</header>
			<main className='min-h-screen md:min-h-[calc(100vh-381px)]'>
				<div className='mx-auto max-w-7xl rounded p-4'>
					<h3 className='mt-6 text-xl font-semibold'>Tus PDFs:</h3>
					<UserFiles />
				</div>
			</main>
		</>
	);
};
export default Dashboard;
