import {getProject, getProjects} from "@/lib/content";
import Image from "next/image"
import {serializeMdx} from "@/lib/mdx";
import {MdxContent} from "@/components/mdx-content";
import React from "react";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{ project: string }>
}

export function generateStaticParams() {
    return getProjects().map((x) => ({project: x.slug}));
}

export default async function Project({params}: Props) {
    const slug = (await params).project;
    const project = getProject(slug);
    if (!project) notFound();
    const serialized = await serializeMdx(project.content);
    const publishedOn = new Date(project.createdAt).toLocaleDateString(
        "US",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
    return (
        <section className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div>
                <h1 className="my-16">
                    <span className="block  mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  {project.name}
                </span>
                    <span
                        className="mt-2 block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  {publishedOn}
                </span>
                </h1>

                {project.image && (
                    <div className="items-center">
                        <Image
                            src={project.image}
                            alt={":("}
                            width={4299}
                            height={2499}
                            priority
                        />
                    </div>
                )}

                <div className="flex justify-center mt-32">
                    <a target="_blank" rel="noopener noreferrer"
                       href={project.url}
                       className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-teal-500 hover:text-teal-100 transition">
                        View project on Github
                    </a>
                </div>

                <div className={'mt-32'}>
                    <MdxContent source={serialized.serialized}/>
                </div>
            </div>
        </section>
    )
}