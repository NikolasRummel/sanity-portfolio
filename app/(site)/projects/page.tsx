import React from "react";
import ProjectsGrid from "@/components/ProjectsGrid";
import {getProjects} from "@/lib/content";
import {Project} from "@/types/project";
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
