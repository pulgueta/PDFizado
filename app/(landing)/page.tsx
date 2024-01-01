import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Badge } from '~/shadcn/badge';
import { buttonVariants } from '~/shadcn/button';
import { PriceCards } from '~/components/client/prices/card-details';

import landing from '~/public/landing.webp';

const Home = () => {
	return (
		<>
			<main className='min-h-screen bg-white p-2 dark:bg-[#1C1917]'>
				<div className='relative z-40 mx-auto mt-8 max-w-4xl animate-fade-up rounded-3xl border bg-white px-4 py-8 text-center shadow animate-once animate-ease-out md:py-12 dark:bg-[#131110]'>
					<h1
						id='landing-title'
						className='mb-4 text-5xl font-black tracking-tight text-black md:mb-8 md:text-7xl dark:text-white'
					>
						<span className='text-primary'>PDF</span>izado
					</h1>
					<p
						id='landing-description'
						className='text-sm leading-5 md:text-lg [&:not(:first-child)]:mt-6'
					>
						Haz tu estudio más fácil interactuando con la
						Inteligencia Artificial mediante un chat para extraer la
						información más relevante de tus archivos{' '}
						<span className='font-bold'>PDF.</span>
					</p>
					<p
						id='landing-explanation'
						className='text-base leading-5 md:text-xl [&:not(:first-child)]:mt-6'
					>
						&iexcl;Solamente arrastra tu archivo y puedes empezar a
						preguntar lo que necesites!
					</p>
					<div
						className='absolute right-0 z-10 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl'
						aria-hidden
					/>
					<div
						className='absolute -left-16 top-0 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl'
						aria-hidden
					/>
					<Badge
						className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'
						aria-label='Demostración'
					>
						En desarrollo a día de {new Date().toLocaleDateString()}
					</Badge>
				</div>

				<section className='relative mt-16 w-full animate-fade-up p-4 animate-once animate-ease-in-out'>
					<h2 className='mx-auto max-w-2xl scroll-m-20 border-b pb-4 text-center text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl'>
						Interfaz y utilidad
					</h2>
					<p className='text-center text-lg leading-7 [&:not(:first-child)]:mt-6'>
						Contamos con una interfaz sencilla de utilizar y fácil
						de entender para una accesibilidad con alcance total
						para todo tipo de usuarios.
					</p>
					<div className='mt-8 flex flex-col items-center justify-center md:flex-row'>
						<div className='relative mt-4 w-full'>
							<Image
								src={landing}
								alt='PDFizado - UI'
								width={850}
								height={850}
								quality={100}
								placeholder='blur'
								priority
								className='relative z-40 mx-auto aspect-auto rounded-xl shadow-xl'
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
				<div className='mx-auto max-w-7xl animate-fade-up py-16'>
					<h2 className='mb-4 border-b pb-4 text-center text-3xl font-black leading-snug text-black md:mb-8 md:text-4xl dark:text-white'>
						Tenemos 3 planes para que puedas utilizar{' '}
						<span className='text-primary'>PDF</span>izado
					</h2>
					<PriceCards />
				</div>
				<section className='flex w-full flex-col items-center justify-center gap-8 bg-secondary px-2 py-8 shadow-sm md:py-16 dark:bg-[#131110]'>
					<h3 className='text-center text-2xl font-extrabold md:text-3xl dark:text-white'>
						&iquest;Qué esperas para agilizar tu forma de estudiar?
					</h3>
					<Link href='/register' className={buttonVariants()}>
						Registrarme
						<ArrowRightIcon className='ml-2 h-4 w-4' />
					</Link>
				</section>
				<div
					className='absolute bottom-0 left-16 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl'
					aria-hidden
				/>
				<div
					className='absolute -bottom-32 right-8 h-48 w-48 animate-pulse rounded-full bg-primary/20 blur-xl'
					aria-hidden
				/>
			</section>
		</>
	);
};
export default Home;
