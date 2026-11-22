"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
    background: string;
    border: string;
}

const ProjectCardSmall = ({ project, background, border }: ProjectCardProps) => {
    const router = useRouter();
    return (
        <div
            className="rounded-3xl hover:scale-[1.03] transition-all duration-300 group cursor-pointer h-full"
            onClick={() => {
                router.push(`/projects/${project.slug}`);
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
    );
};

export default ProjectCardSmall;