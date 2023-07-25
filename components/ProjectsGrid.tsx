"use client";

import React, {useState} from 'react';
import SearchBar from "@/components/SearchBar";
import {Project} from "@/types/project";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import mac from "@/public/images/macbook.png"
import Link from "next/link";

interface ProjectsGridProps {
    projects: Project[],
    showSearchBar?: boolean
}

const ProjectsGrid = ({projects, showSearchBar}: ProjectsGridProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts: Project[] = projects.filter((projects) =>
        projects.name.toLowerCase().includes(searchQuery.toString().toLowerCase()) ||
        projects.content.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
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

    // @ts-ignore
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <section className="mt-24">
            <h2 className='font-bold text-3xl tracking-tight text-center lg:text-start'>Projects</h2>

            {showSearchBar && (
                <div>
                    <p className="text-base mb-4">
                        {filteredPosts.length} project(s) matching your search
                    </p>
                    <SearchBar onSearch={handleSearch}/>
                </div>
            )}

            <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-1 gap-8">
                {filteredPosts.map((project: Project, index) => (
                    <Link href={`/projects/${project.slug}`} key={project._id}
                          className="rounded-3xl hover:scale-105 transition group">
                        <div className="space-y-12">
                            <div
                                className={`relative w-full overflow-hidden border rounded-3xl bg-gradient-to-b ${backgroundColors[index % backgroundColors.length]}`}>
                                <div
                                    className={`w-full h-[1px] bg-gradient-to-r from-transparent ${borderColors[index % borderColors.length]} to-transparent`}></div>
                                <div className="grid grid-cols-1 min-h-[500px] md:grid-cols-2 md:group-hover:grid-cols-3">
                                    <div
                                        className="md:absolute md:top-4 md:right-[-200px] md:w-[800px] md:group-hover:translate-x-[-220px] md:transition-transform">
                                        <Image
                                            src={mac}
                                            alt="project"
                                            objectFit="fill"
                                            width={900}
                                            height={552}
                                            layout="intrinsic"
                                        />
                                    </div>
                                    <div className="self-end col-span-1 m-8 text-center md:text-left">
                                        <h2 className="mt-0 text-black dark:text-white">{project.name}</h2>
                                        <p className="text-black dark:text-white">
                                            {project.description}
                                        </p>

                                        <ButtonLink
                                            text="Visit Project"
                                            href={`/projects/${project.slug}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;

