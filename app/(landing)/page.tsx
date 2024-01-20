import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '~/shadcn/badge';
import { buttonVariants } from '~/shadcn/button';
import { PriceCards } from '~/components/client/prices/card-details';

const Home = () => {
	return (
		<>
			<main className='min-h-dvh bg-white p-2 dark:bg-[#1C1917]'>
				<header>
					<article className='relative z-40 mx-auto mt-8 max-w-4xl animate-fade-up rounded-2xl border bg-white px-4 py-8 text-center shadow animate-once animate-ease-out md:py-8 dark:bg-[#131110]'>
						<h1
							id='landing-title'
							className='mb-4 text-5xl font-black tracking-tight text-black md:mb-8 md:text-7xl dark:text-white'
						>
							<span className='text-primary'>PDF</span>izado
						</h1>
						<p
							id='landing-description'
							className='text-base leading-5 tracking-tight md:text-lg'
						>
							Haz tu estudio más fácil interactuando con la
							Inteligencia Artificial mediante un chat para
							extraer la información más relevante de tus archivos{' '}
							<span className='font-bold'>PDF.</span>
						</p>
						<p
							id='landing-explanation'
							className='text-sm leading-5 tracking-tight md:text-base [&:not(:first-child)]:mt-6'
						>
							&iexcl;Solamente arrastra tu archivo y puedes
							empezar a preguntar lo que necesites!
						</p>
						<Badge
							className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'
							aria-label='Demostración'
						>
							En desarrollo a día de{' '}
							{new Date().toLocaleDateString()}
						</Badge>
					</article>
				</header>

				<section className='relative mt-8 w-full animate-fade-up p-4 animate-once animate-ease-in-out'>
					<h2 className='mx-auto max-w-2xl scroll-m-20 border-b pb-2 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
						Interfaz y utilidad
					</h2>
					<p className='my-4 text-center text-base leading-6 tracking-tight md:my-6 md:text-lg'>
						Contamos con una interfaz sencilla de utilizar y fácil
						de entender para una accesibilidad con alcance total
						para todo tipo de usuarios.
					</p>
					<div className='relative flex flex-col items-center justify-center md:flex-row'>
						<Image
							src='/landing.webp'
							alt='PDFizado - UI'
							width={768}
							height={768}
							priority
							className='z-40 mx-auto aspect-auto w-auto rounded-xl shadow'
						/>
						<Badge
							className='absolute -bottom-2 left-1/2 z-40 -translate-x-1/2'
							aria-label='Demostración'
						>
							Demostración
						</Badge>
					</div>
				</section>
			</main>
			<section className='bg-white px-2 pb-8 md:px-0 dark:bg-[#1C1917]'>
				<div className='container animate-fade-up py-8'>
					<h2 className='mb-4 border-b pb-4 text-center text-4xl font-extrabold tracking-tight text-black md:mb-8 lg:text-5xl dark:text-white'>
						Tenemos 3 planes para que puedas utilizar{' '}
						<span className='text-primary'>PDF</span>izado
					</h2>
					<PriceCards />
				</div>
				<section className='flex w-full flex-col items-center justify-center gap-8 bg-secondary px-2 py-8 shadow-sm md:py-12 dark:bg-[#131110]'>
					<h3 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl dark:text-white'>
						&iquest;Qué esperas para agilizar tu forma de estudiar?
					</h3>
					<Link href='/register' className={buttonVariants()}>
						Registrarme
					</Link>
				</section>
			</section>
		</>
	);
};
export default Home;
