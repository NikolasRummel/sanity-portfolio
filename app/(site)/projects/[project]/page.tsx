import {getProject} from "@/lib/sanity/sanity-utils";
import Image from "next/image"
import {serializeMdx} from "@/lib/mdx";
import {MdxContent} from "@/components/mdx-content";
import React from "react";

type Props = {
    params: { project: string }
}

export default async function Project({params}: Props) {
    const slug = params.project;
    const project = await getProject(slug);
    const serialized = await serializeMdx(project.content);
    const publishedOn = new Date(project._createdAt).toLocaleDateString(
        "US",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
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