export type SiteConfig = typeof siteConfig

/**
 * KI-Business-Angebot (/ki-fuer-unternehmen, Banner, Nav-Links).
 * Standardmäßig AUS (z. B. auf Vercel). Lokal aktivieren mit
 * NEXT_PUBLIC_SHOW_KI_SERVICES=true in .env.local
 */
export const showKiServices = process.env.NEXT_PUBLIC_SHOW_KI_SERVICES === "true"

const kiNavItem = {title: "KI für Unternehmen", href: "/ki-fuer-unternehmen", lang: "de"}

export const siteConfig = {
    name: "Nikolas Rummel",
    description: "Portfolio of Nikolas Rummel – AI & ML Backend Engineer",
    url: "https://nikolas-rummel.de",
    contactEmail: "kontakt@nikolas-rummel.de",
    mainNav: [
        {title: "Home", href: "/", lang: "en"},
        {title: "Projects", href: "/projects", lang: "en"},
        ...(showKiServices ? [kiNavItem] : []),
    ],
    links: {
        github: "https://github.com/NikolasRummel",
        linkedin: "https://www.linkedin.com/in/nikolas-rummel-311486206/",
        instagram: "https://instagram.com/rml.nikolas",
    },
}
