/** @type {import('next').NextConfig} */
const nextConfig = {
    // Projektordner als Wurzel, sonst beobachtet Turbopack wegen einer package-lock.json im Home-Verzeichnis alles darunter
    turbopack: {root: __dirname},
    transpilePackages: ['next-mdx-remote'],
    images: {
        unoptimized: true,
    }
}

module.exports = nextConfig
