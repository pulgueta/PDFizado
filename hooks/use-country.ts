import { useEffect, useState } from 'react';

import { env } from '~/env/client.mjs';
import { FetchCountry } from '~/types';

export const useCountry = () => {
	const [country, setCountry] = useState<FetchCountry>();

	useEffect(() => {
		fetch(
			`https://api.geoapify.com/v1/ipinfo?apiKey=${env.NEXT_PUBLIC_GEOLOCATION}`
		)
			.then((response) => response.json())
			.then((res) => setCountry(res));
	}, []);

	return country;
};
