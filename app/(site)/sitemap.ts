import type {MetadataRoute} from "next"
import {getBlogPosts, getProjects} from "@/lib/content"
import {showKiServices, siteConfig} from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
    const url = (path: string) => `${siteConfig.url}${path}`

    return [
        {url: url("/"), changeFrequency: "monthly", priority: 1},
        {url: url("/projects"), changeFrequency: "monthly", priority: 0.8},
        {url: url("/blog"), changeFrequency: "monthly", priority: 0.8},
        ...(showKiServices
            ? [
                {url: url("/ki-fuer-unternehmen"), changeFrequency: "monthly" as const, priority: 0.8},
                {url: url("/ki-fuer-unternehmen/postfach-radar"), changeFrequency: "monthly" as const, priority: 0.7},
            ]
            : []),
        ...getProjects().map((p) => ({
            url: url(`/projects/${p.slug}`),
            lastModified: new Date(p.createdAt),
            priority: 0.6,
        })),
        ...getBlogPosts().map((p) => ({
            url: url(`/blog/${p.slug}`),
            lastModified: new Date(p.createdAt),
            priority: 0.6,
        })),
    ]
}
