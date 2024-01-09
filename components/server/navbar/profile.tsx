import { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { SignOut } from '~/components/client/navbar/sign-out';
import { authRoutes } from '~/constants/navbar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/shadcn/dropdown-menu';
import { ExtendedUser } from '~/lib/auth/auth';
import { base64Img } from '~/lib/base64-image';

export const Profile: FC<ExtendedUser> = async (user) => {
	if (!user) return;

	const blurDataURL = await base64Img(user.image!);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Image
					src={
						user.image
							? user.image
							: 'https://via.placeholder.com/150'
					}
					alt='Profile picture'
					width={40}
					height={40}
					placeholder='blur'
					blurDataURL={blurDataURL}
					className='aspect-square cursor-pointer rounded-full'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel className='truncate text-lg'>
					{user.name}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{authRoutes.map(({ href, label }) => (
					<DropdownMenuItem
						key={href}
						asChild
						className='cursor-pointer'
					>
						<Link href={href} id={href.replace('/', '')}>
							{label}
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<SignOut />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
