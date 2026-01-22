"use client";

import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
    background: string;
    border: string;
}

const ProjectCardSmall = ({ project, background, border }: ProjectCardProps) => {
    return (
        <div
            className="rounded-3xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer h-full"
            onClick={() => {
                window.location.href = `/projects/${project.slug}`;
            }}
        >
            <div className={`relative h-full w-full overflow-hidden border rounded-3xl bg-gradient-to-b ${background} flex flex-col`}>
                <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${border} to-transparent`}></div>

                <div className="relative w-full h-52 sm:h-64 overflow-hidden border-b border-white/10">
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                        {project.name}
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 line-clamp-3 mb-6 flex-grow">
                        {project.description}
                    </p>

                    <div className="mt-auto pt-4">
                        <ButtonLink
                            text="View Project"
                            href={`/projects/${project.slug}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSmall;