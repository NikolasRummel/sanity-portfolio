import type {Metadata} from "next";
import React from "react";
import ProjectsGrid from "@/components/ProjectsGrid";
import {getProjects} from "@/lib/content";
import {Project} from "@/types/project";
export const metadata: Metadata = {
    title: "Projekte",
    description: "Projekte von Nikolas Rummel: Semantic Search, verteilte Spielinfrastruktur, Zeiterfassung und mehr.",
    alternates: {canonical: "/projects"},
}

export default async function Projects() {
    const projects: Project[] = getProjects();

    return (
        <div className="ki page">
            <div className="container" style={{paddingBottom: "var(--section-gap-s)"}}>
                <ProjectsGrid projects={projects} showSearchBar={true}/>
            </div>
        </div>
    )
}
