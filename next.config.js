/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-mdx-remote'],
    images: {
        unoptimized: true,
    }
}

module.exports = nextConfig
