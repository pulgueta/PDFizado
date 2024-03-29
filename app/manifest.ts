import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		lang: 'es',
		theme_color: '#E11D48',
		background_color: '#0C0A09',
		display: 'standalone',
		display_override: ['fullscreen', 'standalone'],
		scope: '/',
		start_url: '/',
		name: 'PDFizado',
		description:
			'Una aplicaci\u00f3n para interactuar con el contenido de tus archivos PDF y poder hacer tu estudio m\u00e1s sencillo.',
		short_name: 'PDFizado',
		orientation: 'portrait',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-256x256.png',
				sizes: '256x256',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-384x384.png',
				sizes: '384x384',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
