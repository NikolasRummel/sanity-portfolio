export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "Nikolas Rummel",
    description: "Portfolio of Nikolas Rummel – AI & ML Backend Engineer",
    url: "https://nikolas-rummel.de",
    contactEmail: "kontakt@nikolas-rummel.de",
    mainNav: [
        {title: "Home", href: "/", lang: "en"},
        {title: "Projects", href: "/projects", lang: "en"},
        {title: "KI für Unternehmen", href: "/ki-fuer-unternehmen", lang: "de"},
    ],
    links: {
        github: "https://github.com/NikolasRummel",
        linkedin: "https://www.linkedin.com/in/nikolas-rummel-311486206/",
        instagram: "https://instagram.com/rml.nikolas",
    },
}
