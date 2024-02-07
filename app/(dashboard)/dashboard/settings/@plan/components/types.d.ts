export type FetchCountry = {
	city: City;
	continent: Continent;
	country: Country;
	location: Location;
	subdivisions: Subdivision[];
	state: State;
	datasource: Datasource[];
	ip: string;
};

export type City = {
	names: CityNames;
	name: string;
};

export type CityNames = {
	en: string;
};

export type Continent = {
	code: string;
	geoname_id: number;
	names: ContinentNames;
	name: string;
};

export type ContinentNames = {
	de: string;
	en: string;
	es: string;
	fa: string;
	fr: string;
	ja: string;
	ko: string;
	'pt-BR': string;
	ru: string;
	'zh-CN': string;
};

export type Country = {
	geoname_id: number;
	iso_code: string;
	names: ContinentNames;
	name: string;
	name_native: string;
	phone_code: string;
	capital: string;
	currency: string;
	flag: string;
	languages: Language[];
};

export type Language = {
	iso_code: string;
	name: string;
	name_native: string;
};

export type Datasource = {
	name: string;
	attribution: string;
	license: string;
};

export type Location = {
	latitude: number;
	longitude: number;
};

export type State = {
	name: string;
};

export type Subdivision = {
	names: CityNames;
};
