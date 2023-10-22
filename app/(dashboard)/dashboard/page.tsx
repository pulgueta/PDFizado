import { Button } from '@/shadcn/button';

const Dashboard = async () => {
    return (
        <main className='min-h-[calc(100vh-80px)]'>
            <div className='mx-auto max-w-7xl bg-red-50 p-4'>
                <h1 className='mb-8 text-3xl font-black'>Dashboard de</h1>

                <p>
                    Bienvenido a tu dashboard, aquí podrás acceder a todas las
                    funcionalidades de PDFizado
                </p>
                <Button className='mt-2 font-bold'>Subir PDF</Button>
            </div>
        </main>
    );
};
export default Dashboard;
