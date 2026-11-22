"use client";

import React, {useState} from 'react';
import SearchBar from "@/components/SearchBar";
import {Project} from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsGridProps {
    projects: Project[],
    showSearchBar?: boolean
}

const ProjectsGrid = ({projects, showSearchBar}: ProjectsGridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts: Project[] = projects.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    const backgroundColors: string[] = [
        "from-[#4f79ff] to-[#a8caff]/20 dark:from-[#1b4dff]/20 dark:to-[#4f79ff] dark:border-[#1b4dff] border-[#4f79ff]",
        "from-[#2bd5f8] to-[#c5f4ff]/20 dark:from-[#0a6f8e]/20 dark:to-[#2bd5f8] dark:border-[#0a6f8e] border-[#2bd5f8]",
        "from-[#1eeabf] to-[#b6fff0]/20 dark:from-[#068d6d]/20 dark:to-[#1eeabf] dark:border-[#068d6d] border-[#1eeabf]",
        "from-[#37ff8a] to-[#c9ffe0]/20 dark:from-[#057c43]/20 dark:to-[#37ff8a] dark:border-[#057c43] border-[#37ff8a]",

    ];

    const borderColors: string[] = [
        "dark:via-[#4f79ff]",
        "dark:via-[#2bd5f8]",
        "dark:via-[#1eeabf]",
        "dark:via-[#37ff8a]",
    ];

    return (
        <section>
            <header className="page-head">
                <h1>Projekte</h1>
                <p className="lead">Einige meiner liebsten Projekte.</p>
            </header>

            {showSearchBar && <SearchBar onSearch={setSearchQuery}/>}

            <div className="pcards">
                {filteredPosts.map((project: Project, index) => (
                    <ProjectCard key={project.name} project={project}
                                 background={backgroundColors[index % backgroundColors.length]}
                                 border={borderColors[index % borderColors.length]}/>
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;
