import { ReactNode } from 'react';

import { NextPage } from 'next';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/shadcn/tabs';

type Layout = {
	children: ReactNode;
	plan: ReactNode;
	help: ReactNode;
};

const SettingsLayout: NextPage<Layout> = ({ children, plan, help }) => {
	return (
		<div className='min-h-svh md:min-h-[calc(100vh-221px)]'>
			<div className='container'>
				<h1
					id='settings-title'
					className='mb-8 mt-4 scroll-m-20 text-pretty text-4xl font-extrabold tracking-tighter lg:text-5xl'
				>
					Ajustes de tu cuenta
				</h1>

				<Tabs
					orientation='vertical'
					defaultValue='profile'
					className='mx-auto max-w-2xl'
				>
					<TabsList className='grid grid-cols-3'>
						<TabsTrigger value='profile'>Perfil</TabsTrigger>
						<TabsTrigger value='plan'>Plan</TabsTrigger>
						<TabsTrigger value='help'>Ayuda</TabsTrigger>
					</TabsList>
					<TabsContent value='profile'>{children}</TabsContent>
					<TabsContent value='plan'>{plan}</TabsContent>
					<TabsContent value='help'>{help}</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
export default SettingsLayout;
