import './globals.css'
import {Metadata} from "next"

import {siteConfig} from "@/config/site"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {TailwindIndicator} from "@/components/navbar/tailwind-indicator"
import {ThemeProvider} from "@/components/navbar/theme-provider"
import { Analytics } from "@vercel/analytics/next"
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
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
}

interface RootLayoutProps {
    children: React.ReactNode
}


export default function RootLayout({children}: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans",
                    fontSans.variable,
                    "overflow-x-hidden"
                )}
            >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative z-[-1]">
                    <Image
                        className="absolute -top-80 left-20"
                        src={light}
                        alt=""
                        width={924}
                        height={718}
                        unoptimized
                    />
                </div>

                <Navbar/>

                <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                    <Analytics />
                </div>
                <TailwindIndicator/>
                <Footer/>
            </ThemeProvider>
            </body>
            </html>
        </>
    )
}
