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
        "from-[#4f79ff] to-[#a8caff]/20 dark:from-[#033FFF]/20 dark:to-[#4f79ff] dark:border-[#033FFF] border-[#4f79ff]",
        "from-[#17fcf3] to-[#d4fffe]/10 dark:from-[#067d78]/20 dark:to-[#17fcf3] dark:border-[#067d78] border-[#17fcf3]",
        "from-[#6527BE] to-[#9681EB]/10 dark:from-[#330278]/20 dark:to-[#6527BE] dark:border-[#330278] border-[#6527BE]",
        "from-[#fc963d] to-[#FFCD38]/10 dark:from-[#ff7f0f]/20 dark:to-[#ffbc75] dark:border-[#ff7f0f] border-[#fc963d]"
    ];

    const borderColors: string[] = [
        "dark:via-[#4f79ff]",
        "dark:via-[#17fcf3]",
        "dark:via-[#6527BE]",
        "dark:via-[#fc963d]",
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

