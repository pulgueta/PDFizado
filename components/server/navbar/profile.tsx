import { FC } from 'react';

import Link from 'next/link';

import { LoaderIcon, User2Icon } from 'lucide-react';

import { SignOut } from '~/components/client/navbar/sign-out';
import { authRoutes } from '~/constants/navbar';
import { Avatar, AvatarFallback, AvatarImage } from '~/shadcn/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '~/shadcn/dropdown-menu';
import { ExtendedUser } from '~/lib/auth/auth';

export const Profile: FC<ExtendedUser> = (user) => {
	if (!user) return;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage
						src={user.image ?? ''}
						alt={`Profile picture of ${user.name}`}
					/>
					<AvatarFallback>
						{user.image ? (
							<LoaderIcon className='animate-spin' />
						) : (
							<User2Icon />
						)}
					</AvatarFallback>
				</Avatar>
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
