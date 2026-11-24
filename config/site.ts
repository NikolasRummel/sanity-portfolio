export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "Nikolas Rummel",
    description: "Portfolio von Nikolas Rummel – AI & ML Backend Engineer",
    url: "https://nikolas-rummel.de",
    contactEmail: "kontakt@nikolas-rummel.de",
    mainNav: [
        {title: "Startseite", href: "/", lang: "de"},
        {title: "Projekte", href: "/projects", lang: "de"},
        {title: "Blog", href: "/blog", lang: "de"},
        {title: "Live-Demo", href: "/projects/postfach-radar#demo", lang: "de"},
    ],
    links: {
        github: "https://github.com/NikolasRummel",
        linkedin: "https://www.linkedin.com/in/nikolas-rummel-311486206/",
        instagram: "https://instagram.com/rml.nikolas",
    },
}
