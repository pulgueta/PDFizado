import { MetadataRoute } from 'next';

import { auth } from '~/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const url =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://www.pdfizado.com';

	const user = await auth();

	return [
		{
			url,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${url}/pricing`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${url}/terms-of-service`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${url}/login`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/register`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/reset-password`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/forgot-password`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/verify`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: `${url}/dashboard`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${url}/dashboard/${user?.user.id ?? ':id'}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${url}/dashboard/${user?.user.id ?? ':id'}/:fileId`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${url}/dashboard/${user?.user.id ?? ':id'}/plan`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];
}
