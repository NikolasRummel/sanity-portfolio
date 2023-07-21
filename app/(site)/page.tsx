import Image from 'next/image'
import {getProjects} from "@/lib/sanity/sanity-utils";
import Link from "next/link";

export default async function Home() {

    const projects = await getProjects();

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
                <h1 className="text-7xl font-extrabold">Hello I&apos;m
                    <span
                        className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent"> Nikolas!</span>
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground">
                    Hi, this is a test sentence!
                </p>
            </div>
            <h2 className="mt-24 font-bold text-gray-700 text-3xl">My Projects</h2>
            <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{projects.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project._id}
                      className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500 transition">
                    {project.image && (
                        <Image
                            src={project.image}
                            alt={project.name}
                            width={750}
                            height={300}
                            className="object-cover rounded-lg border border-gray-500"
                        />
                    )}
                    <div
                        className="mt-2 font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                        {project.name}
                    </div>
                </Link>
            ))}
            </div>
        </section>
    )
}
