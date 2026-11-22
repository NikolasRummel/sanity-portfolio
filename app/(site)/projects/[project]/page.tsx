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
        "de-DE",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
    return (
        <section className="ki page container" style={{paddingBottom: "var(--section-gap-s)"}}>
            <header className="page-head" style={{maxWidth: "44rem", marginInline: "auto"}}>
                <h1>{project.name}</h1>
                <p className="small">{publishedOn}</p>
            </header>

            {project.image && (
                <div className="article-cover">
                    <Image
                        src={project.image}
                        alt=""
                        width={4299}
                        height={2499}
                        priority
                    />
                </div>
            )}

            <div style={{display: "flex", justifyContent: "center", marginBottom: "var(--space-2xl)"}}>
                <a target="_blank" rel="noopener noreferrer" href={project.url} className="btn">
                    Projekt auf GitHub ansehen
                </a>
            </div>

            <div className="prose">
                <MdxContent source={serialized.serialized}/>
            </div>
        </section>
    )
}
