import './env/client.mjs'
import './env/server.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: ['argon2'],
	},
}

export default nextConfig
