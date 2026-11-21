import './globals.css'
import {Metadata, Viewport} from "next"

import {siteConfig} from "@/config/site"
import {fontDisplay, fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {TailwindIndicator} from "@/components/navbar/tailwind-indicator"
import {ThemeProvider} from "@/components/navbar/theme-provider"
import light from "@/public/images/light.png"
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
}

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
}

interface RootLayoutProps {
    children: React.ReactNode
}


export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen font-sans", fontSans.variable, fontDisplay.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="beam-wrap">
                <Image className="beam" src={light} alt="" width={924} height={718} unoptimized priority/>
            </div>

            <Navbar/>

            <main className="w-full">
                {children}
            </main>

            <TailwindIndicator/>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    )
}