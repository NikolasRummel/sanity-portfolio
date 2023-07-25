import React from "react";
import ProjectsGrid from "@/components/ProjectsGrid";
import {getProjects} from "@/lib/sanity/sanity-utils";
import {Project} from "@/types/project";

export default async function Projects() {
    const projects: Project[] = await getProjects();

    return (
        <div className="mt-32">
            <ProjectsGrid projects={projects} showSearchBar={true}/>
        </div>
    )
}