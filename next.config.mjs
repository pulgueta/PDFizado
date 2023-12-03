import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: ['argon2'],
	},
}

export default nextConfig
