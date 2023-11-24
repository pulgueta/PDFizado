'use client';

import {
	PropsWithChildren,
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react';

type Country = 'colombia' | 'other';

type CountryContextType = {
	country: Country;
	// eslint-disable-next-line no-unused-vars
	setCountry: (country: Country) => void;
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: PropsWithChildren) => {
	const [country, setCountry] = useState<Country>(() => {
		const storedCountry = localStorage.getItem('country');
		return storedCountry ? (storedCountry as Country) : 'colombia';
	});

	useEffect(() => {
		localStorage.setItem('country', country);
	}, [country]);

	return (
		<CountryContext.Provider value={{ country, setCountry }}>
			{children}
		</CountryContext.Provider>
	);
};

export const useCountry = (): CountryContextType => {
	const context = useContext(CountryContext);

	if (!context) {
		throw new Error('useCountry must be used within a CountryProvider');
	}

	return context;
};
