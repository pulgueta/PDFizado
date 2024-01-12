import million from 'million/compiler'

import './env/client.mjs'
import './env/server.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'd1fwmfi01nicf2.cloudfront.net',
				port: '',
				pathname: '/pictures/**',
			},
			{
				hostname: 'via.placeholder.com', protocol: 'https'
			},
			{
				hostname: 'lh3.googleusercontent.com',
				pathname: '/a/**',
				protocol: 'https',
				port: ''
			}
		],
	},
	experimental: {
		serverComponentsExternalPackages: ['argon2'],
	},
}

export default million.next(nextConfig, {
	auto: {
		rsc: true,
	}
})
