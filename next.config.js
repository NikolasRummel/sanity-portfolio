/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
            }
        ]
    }
}

module.exports = nextConfig
