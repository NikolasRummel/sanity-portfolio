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

    const filteredPosts: Project[] = projects.filter((projects) =>
        projects.name.toLowerCase().includes(searchQuery.toString().toLowerCase()) ||
        projects.description.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
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

    const handleSearch = (query : string) => {
        setSearchQuery(query);
    };

    return (
        <section className="mt-24">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  Projects
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  Discover some of my beloved creations.
                </span>
            </h1>

            {showSearchBar && (
                <div>
                    <SearchBar onSearch={handleSearch}/>
                </div>
            )}

            <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-1 gap-8 ">
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

