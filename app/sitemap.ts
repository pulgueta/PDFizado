import { MetadataRoute } from 'next';

import { File } from '@prisma/client';

import { db } from '~/database/db';
import { currentUser } from '~/lib/auth/currentUser';

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const url =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://www.pdfizado.com';

	const user = await currentUser();

	const data = (await db.file.findMany({
		where: {
			userId: user?.email,
		},
	})) as File[];

	const files = data.map((file) => ({
		url: `${url}/dashboard/${file.id}`,
		lastModified: new Date(file.updatedAt),
		changeFrequency: 'weekly',
		priority: 0.6,
	})) as MetadataRoute.Sitemap;

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
			url: `${url}/dashboard/pricing`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
		{
			url: `${url}/dashboard/plan`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.5,
		},
		...files,
	];
}
