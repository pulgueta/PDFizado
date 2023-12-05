'use client';

import { HelpCircleIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/shadcn/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/shadcn/tooltip';
import { Separator } from '~/shadcn/separator';
import { Button } from '~/shadcn/button';

export const PriceCards = () => {
	const standard = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
	})
		.format(25000)
		.replace(',00', '');

	const professional = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
	})
		.format(50000)
		.replace(',00', '');

	return (
		<>
			<p className='mb-8 text-center text-muted-foreground'>
				*Precio en COP
			</p>
			<TooltipProvider>
				<div className='mx-auto flex grow flex-col gap-4 lg:flex-row'>
					<Card className='mx-auto w-80 bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
						<CardHeader className='text-center'>
							<CardTitle className='text-3xl font-bold'>
								Gratis
							</CardTitle>
							<CardDescription>
								Para documentos simples
							</CardDescription>
						</CardHeader>
						<CardContent>
							<h4 className='text-center text-5xl font-black'>
								Sin costo
							</h4>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; 8MB de tamaño límite</li>
								<li>&#9989; Respuesta estándar</li>
								<li>&#9989; Soporte estándar</li>
								<li>&#9989; Subir hasta 6 PDFs</li>
								<li>&#10060; Respuestas más claras</li>
								<li>&#10060; Soporte prioritario</li>
								<li>
									&#10060; Alojamiento de PDFs de por vida
									<Tooltip delayDuration={100}>
										<TooltipTrigger aria-label='Más información'>
											<HelpCircleIcon className='ml-2 h-4 w-4' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Se eliminarán los PDFs en 60
												días
											</p>
										</TooltipContent>
									</Tooltip>
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Adquirir</Button>
						</CardFooter>
					</Card>
					<Card className='mx-auto w-80 bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
						<CardHeader className='text-center'>
							<CardTitle className='text-3xl font-bold'>
								Estándar
							</CardTitle>
							<CardDescription>
								Para documentos más grandes
							</CardDescription>
						</CardHeader>
						<CardContent>
							<h4 className='text-center text-5xl font-black'>
								{standard}
							</h4>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; 32MB de tamaño límite</li>
								<li>&#9989; Respuesta más rápida</li>
								<li>&#9989; Subir hasta 12 PDFs</li>
								<li>&#9989; Respuestas más claras</li>
								<li>&#9989; Soporte prioritario</li>
								<li>&#9989; Alojamiento de PDFs de por vida</li>
								<li>
									&#10060; Acceso a funciones futuras con
									anticipación
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Adquirir</Button>
						</CardFooter>
					</Card>
					<Card className='mx-auto w-80 bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
						<CardHeader className='text-center'>
							<CardTitle className='text-3xl font-bold'>
								Profesional
							</CardTitle>
							<CardDescription>
								Para cualquier documento extenso
							</CardDescription>
						</CardHeader>
						<CardContent>
							<h4 className='text-center text-5xl font-black'>
								{professional}
							</h4>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; Sin límite de tamaño</li>
								<li>&#9989; Respuesta más rápida</li>
								<li>&#9989; PDFs ilimitados</li>
								<li>&#9989; Respuestas más claras</li>
								<li>
									&#9989; Soporte prioritario y personalizado
								</li>
								<li>&#9989; Alojamiento de PDFs de por vida</li>
								<li>
									&#9989; Acceso a funciones futuras con
									anticipación
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='w-full'>Adquirir</Button>
						</CardFooter>
					</Card>
				</div>
			</TooltipProvider>
		</>
	);
};
