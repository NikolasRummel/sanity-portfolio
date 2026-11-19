/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-mdx-remote'],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: ''
            },
        ]
    }
}

module.exports = nextConfig
