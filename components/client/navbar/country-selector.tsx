'use client';

import { Globe2Icon } from 'lucide-react';

import { RadioGroup, RadioGroupItem } from '~/shadcn/radio-group';
import { Button } from '~/shadcn/button';
import { Label } from '~/shadcn/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/shadcn/popover';
import { useCountry } from '~/context/country-context';

export const CountrySelector = () => {
	const { country, setCountry } = useCountry();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' size='icon'>
					<Globe2Icon aria-label='Selección de país' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='max-w-xs'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>
							Selección de país
						</h4>
						<p className='text-sm text-muted-foreground'>
							Selecciona el país que deseas para ver los precios
							en tu moneda local.
						</p>
					</div>
					<div className='grid gap-2'>
						<RadioGroup
							defaultValue={country}
							onValueChange={(value) => setCountry(value as any)}
						>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									aria-label='Colombia'
									value='colombia'
									id='colombia'
								/>
								<Label htmlFor='colombia'>Colombia</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<RadioGroupItem
									aria-label='Otro'
									value='other'
									id='other'
								/>
								<Label htmlFor='other'>Otro</Label>
							</div>
						</RadioGroup>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
