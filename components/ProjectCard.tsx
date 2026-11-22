"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {Project} from "@/types/project";

interface ProjectCardProps {
    project: Project,
    background: string,
    border: string
}

const ProjectCard = ({project, background, border}: ProjectCardProps) => {
    const router = useRouter();
    return (
        <div
            className="rounded-3xl hover:scale-105 transition group cursor-pointer"
            onClick={() => {
                router.push(`/projects/${project.slug}`);
            }}
        >
            <div className="space-y-12">
                <div className={`relative w-full overflow-hidden border rounded-3xl bg-gradient-to-b ${background}`}>
                    <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${border} to-transparent`}></div>
                    <div className="grid grid-cols-1 min-h-[500px] grid-cols-1 md:grid-cols-2 lg:group-hover:grid-cols-3">
                        <div
                            className="md:absolute md:top-4 md:right-[-240px] md:w-[800px] lg:group-hover:translate-x-[-220px] md:transition-transform ">
                            <Image
                                src={project.image}
                                alt={project.name}
                                width={4299}
                                height={2499}
                            />
                        </div>
                        <div className="self-end col-span-1 m-8 text-center md:text-left">
                            <h2 className="mt-0 text-black dark:text-white">{project.name}</h2>
                            <p className="text-black dark:text-white">
                                {project.description}
                            </p>

                            <a
                                href={`/projects/${project.slug}`}
                                className="group/btn inline-flex items-center rounded-full px-6 py-2.5 font-semibold text-white dark:text-black bg-black/30 dark:bg-white/80 no-underline hover:text-white"
                            >
                                Projekt ansehen
                                <svg className="mt-0.5 ml-2 -mr-1 stroke-2 stroke-white dark:stroke-black" fill="none"
                                     width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                    <path className="transition opacity-0 group-hover/btn:opacity-100" d="M0 5h7"></path>
                                    <path className="transition group-hover/btn:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProjectCard;
