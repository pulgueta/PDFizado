import type { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { ArrowLeftCircleIcon } from 'lucide-react';

import { buttonVariants } from '~/shadcn/button';

export const metadata: Metadata = {
	title: 'Términos de Servicio',
	description: 'Términos de servicio por el uso de PDFizado.',
	robots: {
		index: true,
		googleBot: {
			notranslate: false,
		},
	},
	alternates: {
		canonical: '/terms-of-service',
	},
};

const TOS: NextPage = () => {
	return (
		<section className='min-h-[calc(100vh-205px)] w-full bg-white p-4 dark:bg-[#131110]'>
			<div className='mx-auto max-w-6xl '>
				<Link
					href='/'
					className={buttonVariants({
						variant: 'ghost',
						className: 'mb-4',
					})}
				>
					<ArrowLeftCircleIcon className='mr-2 h-4 w-4' /> Volver al
					inicio
				</Link>
				<h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Términos de Servicio
				</h1>
				<div className='pb-8'>
					<p className='text-base text-muted-foreground'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Voluptatibus nesciunt provident tenetur inventore
						impedit totam vero eligendi voluptatem, dolore doloribus
						hic sapiente, vel sed dolor, quidem magnam! Harum,
						aliquam minima.
					</p>
					<br />
					<p className='text-base text-muted-foreground'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Officiis ex placeat alias atque quisquam saepe, odio
						libero nostrum eos ipsa aut quas voluptas tenetur quos
						suscipit optio tempore repellendus nihil quae autem
						repellat quibusdam quia debitis. Quam corrupti aut quae
						rerum accusamus recusandae sequi architecto ex?
						Voluptatibus eligendi iusto tempore itaque! Est
						voluptates magni vel, temporibus dolorem veniam hic,
						officia rerum sed facilis debitis in. Error suscipit
						impedit perferendis dicta?
					</p>
					<br />
					<p className='text-base text-muted-foreground'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Esse, aperiam. Ut quam consequuntur laudantium est
						itaque hic laboriosam. Deserunt, vel eaque, quas
						perspiciatis iure quod dolor iste repellat incidunt
						reiciendis nulla, asperiores laboriosam minima error.
						Delectus nihil quisquam quas harum rerum adipisci eius
						sapiente consequuntur totam accusantium voluptatem ipsa
						praesentium in perferendis eligendi, illum nesciunt
						aliquid quasi fuga similique qui magnam obcaecati.
						Reprehenderit illum enim tempora ducimus voluptas
						delectus hic eum earum recusandae deleniti dolorem
						perspiciatis voluptates pariatur aspernatur aut quis
						facilis nemo, ad iusto accusamus, repudiandae tempore
						ullam quae ipsam. Dolores aliquid porro voluptates
						saepe, eveniet ut ipsum distinctio.
					</p>
					<br />
					<p className='text-base text-muted-foreground'>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Minus explicabo deleniti reprehenderit placeat
						sint reiciendis omnis delectus! Minima ipsum blanditiis
						laborum labore exercitationem atque, consequatur, itaque
						repellat libero nesciunt nulla!
					</p>
					<br />
					<p className='text-base text-muted-foreground'>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Omnis exercitationem illum mollitia maxime. Odit
						ad nesciunt voluptas, exercitationem itaque maxime ea
						quibusdam accusamus autem dolore veritatis est error
						aliquam reprehenderit perspiciatis unde delectus cum
						nisi! Fugit sunt praesentium illo optio. Recusandae sit
						dignissimos architecto illo iste quas dolorem
						voluptatem, officiis nisi, officia at vel ipsam
						reprehenderit repudiandae praesentium quidem maxime a!
						Consectetur nobis perferendis ad nam? Odit nihil
						cupiditate at dignissimos eius recusandae quae quo
						facere saepe perspiciatis nobis reiciendis optio
						officiis cum voluptate consectetur quos fugiat, dolor
						assumenda dolorum ipsam? Modi sapiente rerum
						necessitatibus numquam voluptatibus sequi tempora id
						nisi similique commodi illum eaque ad, excepturi minima
						a. Neque magnam, vel animi non autem libero ex atque
						laborum dolorem dolorum omnis velit consequuntur
						provident officiis qui rem, quisquam consequatur culpa,
						obcaecati repudiandae accusamus voluptatibus corporis
						at. Fugiat quisquam similique, illum nihil beatae iusto
						totam atque, voluptas eos iure dolore hic reiciendis,
						nostrum voluptatum aspernatur recusandae exercitationem
						dolores suscipit consequatur! Inventore aliquid
						reprehenderit, accusantium, amet obcaecati perferendis
						ex ipsa atque nobis illum ad distinctio quo vel magni
						voluptatibus odio. Ut nemo, praesentium provident
						numquam, accusantium illo incidunt ratione veritatis, at
						quis iusto eaque placeat impedit? Quibusdam aperiam quo
						quia nobis.
					</p>
					<br />
					<p className='text-base text-muted-foreground'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Voluptatibus nesciunt provident tenetur inventore
						impedit totam vero eligendi voluptatem, dolore doloribus
						hic sapiente, vel sed dolor, quidem magnam!
					</p>
				</div>
			</div>
		</section>
	);
};
export default TOS;
