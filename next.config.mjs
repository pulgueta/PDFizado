import './env/client.mjs'
import './env/server.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		}
	},
	eslint: {
		ignoreDuringBuilds: !!process.env.CI,
	},
	typescript: {
		ignoreBuildErrors: !!process.env.CI,
	},
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "script-src 'none';",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'd1fwmfi01nicf2.cloudfront.net',
				port: '',
				pathname: '/pictures/**',
			},
			{
				hostname: 'lh3.googleusercontent.com',
				pathname: '/a/**',
				protocol: 'https',
				port: ''
			},
			{
				hostname: 'source.boringavatars.com',
				pathname: '/marble',
				protocol: 'https',
				port: ''
			}
		],
	},
	experimental: {
		serverComponentsExternalPackages: ['@node-rs/argon2'],
	}
}

export default nextConfig
