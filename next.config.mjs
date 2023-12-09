import dns from 'dns'

import './env/client.mjs'
import './env/server.mjs'

dns.setDefaultResultOrder('ipv4first')

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: ['argon2'],
	},
}

export default nextConfig
