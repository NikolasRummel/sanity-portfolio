export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "Nikolas Rummel",
    description:
        "Portfolio website",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "About",
            href: "/about",
        },
        {
            title: "Blog",
            href: "/blog",
        },
        {
            title: "Projects",
            href: "/projects",
        },
    ],
    links: {
        twitter: "https://twitter.com/",
        github: "https://github.com/nikolasrummel",
    },
}
