import type {Metadata} from "next";
import React from "react";
import ProjectsGrid from "@/components/ProjectsGrid";
import {getProjects} from "@/lib/content";
import {Project} from "@/types/project";
import {radarPage} from "@/config/postfach-radar";
export const metadata: Metadata = {
    title: "Projekte",
    description: "Projekte von Nikolas Rummel: Semantic Search, Zeiterfassung und mehr.",
    alternates: {canonical: "/projects"},
}

export default async function Projects() {
    const radar: Project = {
        slug: "postfach-radar",
        name: "Postfach-Radar",
        image: "/images/content/postfach-radar-card.svg",
        url: "",
        description: radarPage.meta.description,
        content: "",
        createdAt: "2026-09-01T00:00:00Z",
    };
    // Reihenfolge: Radar zuerst, dann die semantische Suche, dann der Rest (neueste zuerst)
    const rest = getProjects()
    const second = rest.filter((p) => p.slug === "semantic_search")
    const others = rest.filter((p) => p.slug !== "semantic_search")
    const projects: Project[] = [radar, ...second, ...others];

    return (
        <div className="ki page">
            <div className="container" style={{paddingBottom: "var(--section-gap-s)"}}>
                <ProjectsGrid projects={projects} showSearchBar={true}/>
            </div>
        </div>
    )
}
