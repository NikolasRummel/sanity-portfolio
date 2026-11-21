import {Funnel_Display as FontDisplay, Funnel_Sans as FontBody, JetBrains_Mono as FontMono} from "next/font/google"

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-display-face",
})

export const fontSans = FontBody({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
