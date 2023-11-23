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
import { Badge } from '~/shadcn/badge';
import { useCountry, usePrice } from '~/hooks';

export const PriceCards = () => {
	const country = useCountry();
	const standard = usePrice(25000);
	const professional = usePrice(50000);

	return (
		<>
			<p className='mb-8 text-center text-muted-foreground'>
				*Precio en {country === 'CO' ? 'COP' : 'USD'}
			</p>
			<TooltipProvider>
				<div className='mx-auto flex w-full flex-col gap-8 md:flex-row md:flex-wrap'>
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
							<p className='text-center text-5xl font-black'>
								Sin costo
							</p>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; 12 páginas por PDF</li>
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

					<Card className='relative mx-auto w-80 border-2 border-primary bg-neutral-50 dark:bg-[#131110] md:w-[25rem]'>
						<CardHeader className='text-center'>
							<CardTitle className='text-3xl font-bold'>
								Estándar
							</CardTitle>
							<CardDescription>
								Para documentos más grandes
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-center text-5xl font-black'>
								{standard}
							</p>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; 32 páginas por PDF</li>
								<li>&#9989; 16MB de tamaño límite</li>
								<li>&#9989; Respuesta más rápida</li>
								<li>&#9989; Soporte estáandar</li>
								<li>&#9989; Subir hasta 18 PDFs</li>
								<li>&#9989; Respuestas más claras</li>
								<li>&#9989; Soporte prioritario</li>
								<li>
									&#10060; Alojamiento de PDFs de por vida
									<Tooltip delayDuration={100}>
										<TooltipTrigger aria-label='Más información'>
											<HelpCircleIcon className='ml-2 h-4 w-4' />
										</TooltipTrigger>
										<TooltipContent>
											<p>
												Se eliminarán los PDFs en 90
												días
											</p>
										</TooltipContent>
									</Tooltip>
								</li>{' '}
							</ul>
						</CardContent>
						<Badge
							className='absolute left-1/2 top-0 z-40 -translate-x-1/2 -translate-y-1/2'
							aria-label='Más popular'
						>
							Más popular
						</Badge>
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
							<p className='text-center text-5xl font-black'>
								{professional}
							</p>
							<Separator className='my-4' />
							<ul className='text-muted-foreground'>
								<li>&#9989; 64 páginas por PDF</li>
								<li>&#9989; 32MB de tamaño límite</li>
								<li>&#9989; Respuesta más rápida</li>
								<li>&#9989; Soporte estándar</li>
								<li>&#9989; PDFs ilimitados</li>
								<li>&#9989; Respuestas más claras</li>
								<li>&#9989; Soporte personalizado</li>
								<li>&#9989; Alojamiento de PDFs de por vida</li>
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
