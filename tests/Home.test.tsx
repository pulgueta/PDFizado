import { render, screen } from '@testing-library/react';

import Landing from '~/app/(landing)/page';

describe('Landing Page', () => {
	it('Should render the Landing Page', () => {
		render(<Landing />);

		//fails
		expect(screen.getByText('PDFw')).toBeInTheDocument();
	});
});
