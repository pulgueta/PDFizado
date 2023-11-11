import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    }),
    distDir: 'build',
}

export default nextConfig