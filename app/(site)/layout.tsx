import './globals.css'
import {Metadata} from "next"

import {siteConfig} from "@/config/site"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {SiteHeader} from "@/components/navbar/site-header"
import {TailwindIndicator} from "@/components/navbar/tailwind-indicator"
import {ThemeProvider} from "@/components/navbar/theme-provider"
import SiteFooter from "@/components/site-footer";
import light from "@/public/images/light.png"
import Image from "next/image";

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
                    fontSans.variable
                )}
            >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col max-w-6xl mx-auto">
                    <SiteHeader/>
                    <div className="flex-1 ">
                        <div className="top-0 ">
                            <Image
                                className="absolute -top-80 left-20"
                                src={light}
                                alt=""
                                width={924}
                                height={718}
                                unoptimized
                            />
                        </div>
                        {children}
                    </div>
                    <SiteFooter/>
                </div>
                <TailwindIndicator/>
            </ThemeProvider>
            </body>
            </html>
        </>
    )
}
