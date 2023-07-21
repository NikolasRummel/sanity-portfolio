import React from 'react';
import Link from "next/link";
import {getProjects} from "@/lib/sanity/sanity-utils";

export default async function ProjectsGrid() {
    const projects = await getProjects();

    return (
        <section className="mt-24">
            <h2 className='font-bold text-3xl tracking-tight mb-8 text-center lg:text-start'>Projects</h2>
            <div className="mt-5 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
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

