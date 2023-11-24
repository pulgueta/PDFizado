import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '~/shadcn/badge';
import { buttonVariants } from '~/shadcn/button';
import { PriceCards } from '~/components/client/prices/card-details';

const Home = () => {
	return (
		<>
			<main className='min-h-screen bg-white p-2 dark:bg-[#1C1917]'>
				<div className='relative z-40 mx-auto mt-8 max-w-4xl animate-fade-up rounded-3xl border bg-white px-4 py-8 text-center shadow animate-once animate-ease-out dark:bg-[#131110] md:py-12'>
					<h1 className='mb-4 text-5xl font-black text-black dark:text-white md:mb-8 md:text-7xl'>
						<span className='text-primary'>PDF</span>izado
					</h1>
					<p className='text-sm leading-5 md:text-lg [&:not(:first-child)]:mt-6'>
						Haz tu estudio más fácil interactuando con la
						Inteligencia Artificial mediante un chat para extraer la
						información más relevante de tus archivos{' '}
						<span className='font-bold'>PDF.</span>
					</p>
					<p className='text-base leading-5 md:text-xl [&:not(:first-child)]:mt-6'>
						&iexcl;Solamente arrastra tu archivo y puedes empezar a
						preguntar lo que necesites!
					</p>
					<div className='absolute right-0 z-10 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
					<div className='absolute -left-16 top-0 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
					<Badge
						className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'
						aria-label='Demostración'
					>
						En desarrollo a día de {new Date().toLocaleDateString()}
					</Badge>
				</div>

				<section className='relative mt-16 w-full animate-fade-up p-4 animate-once animate-ease-in-out'>
					<h1 className='scroll-m-20 border-b pb-4 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Interfaz y utilidad
					</h1>
					<p className='text-center text-lg leading-7 [&:not(:first-child)]:mt-6'>
						Contamos con una interfaz sencilla de utilizar y fácil
						de entender para una accesibilidad con alcance total
						para todo tipo de usuarios.
					</p>
					<div className='mt-8 flex flex-col items-center justify-center md:flex-row'>
						<div className='relative mt-4 w-full md:w-3/4'>
							<Image
								src='/landing.webp'
								alt='PDFizado - UI'
								width={900}
								height={500}
								quality={100}
								priority
								className='relative z-40 mx-auto h-auto w-auto rounded-xl shadow-xl'
							/>
							<Badge
								className='absolute -bottom-2 left-1/2 z-40 -translate-x-1/2'
								aria-label='Demostración'
							>
								Demostración
							</Badge>
						</div>
					</div>
				</section>
			</main>
			<section className='bg-white pb-16 dark:bg-[#1C1917]'>
				<div className='mx-auto w-full animate-fade-up px-2 py-32 md:w-11/12'>
					<h3 className='mb-4 border-b pb-4 text-center text-4xl font-black text-black dark:text-white md:mb-8'>
						Tenemos 3 planes para que puedas utilizar{' '}
						<span className='text-primary'>PDF</span>izado
					</h3>
					<PriceCards />
				</div>
				<section className='flex w-full flex-col items-center justify-center gap-8 rounded-xl bg-secondary px-2 py-8 shadow-sm dark:bg-[#131110] md:py-16'>
					<p className='text-center text-2xl font-bold dark:text-white md:text-3xl'>
						&iquest;Qué esperas para agilizar tu forma de estudiar?
					</p>
					<Link
						href='/register'
						className={buttonVariants({
							variant: 'default',
						})}
					>
						Registrarme
						<ArrowRightIcon className='ml-2 h-4 w-4' />
					</Link>
				</section>
				<div className='absolute bottom-0 left-16 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
				<div className='absolute -bottom-32 right-8 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl' />
			</section>
		</>
	);
};
export default Home;
