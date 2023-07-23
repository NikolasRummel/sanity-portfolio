"use client";

import React, {useState} from 'react';
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import {Project} from "@/types/project";

interface ProjectsGridProps {
    projects: Project[],
    showSearchBar?: boolean
}

const ProjectsGrid = ({projects, showSearchBar}: ProjectsGridProps) => {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = projects.filter((projects) =>
        projects.name.toLowerCase().includes(searchQuery.toString().toLowerCase()) ||
        projects.content.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
    );

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

            <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPosts.map((project) => (
                    <Link href={`/projects/${project.slug}`} key={project._id}
                          className="rounded-3xl hover:scale-105 transition">
                        <div className="rounded-3xl bg-no-repeat bg-center bg-cover"
                             style={{
                                 backgroundImage: `url(${project.image})`,
                                 width: '100%',
                                 height: '20rem',
                                 backgroundPosition: 'center',
                                 backdropFilter: "blur(2px)"
                             }}
                        >
                            <p className="ml-10 pt-10 text-white font-bold ">{project.name}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProjectsGrid;

