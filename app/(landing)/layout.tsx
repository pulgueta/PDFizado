import { PropsWithChildren } from 'react';

import { Navbar } from '~/components/client/navbar/navbar';

const LandingLayout = ({ children }: PropsWithChildren) => (
	<>
		<Navbar />
		{children}
	</>
);

export default LandingLayout;
