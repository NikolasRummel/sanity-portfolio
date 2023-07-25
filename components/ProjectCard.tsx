"use client";

import Image from "next/image";
import mac from "@/public/images/macbook.png";
import ButtonLink from "@/components/ButtonLink";
import {Project} from "@/types/project";

interface ProjectCardProps {
    project: Project,
    background: string,
    border: string
}

const ProjectCard = ({project, background, border}: ProjectCardProps) => {
    return (
        <div
            className="rounded-3xl hover:scale-105 transition group cursor-pointer"
            onClick={() => {
                window.location.href = `/projects/${project.slug}`;
            }}
        >
            <div className="space-y-12">
                <div className={`relative w-full overflow-hidden border rounded-3xl bg-gradient-to-b ${background}`}>
                    <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${border} to-transparent`}></div>
                    <div className="grid grid-cols-1 min-h-[500px] md:grid-cols-2 lg:group-hover:grid-cols-3">
                        <div className="md:absolute md:top-4 md:right-[-200px] md:w-[800px] lg:group-hover:translate-x-[-220px] md:transition-transform">
                            <Image
                                src={mac}
                                alt="project"
                                width={900}
                                height={552}
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
        </div>
    )
}


export default ProjectCard;
