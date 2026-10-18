import Image from 'next/image'
import TimelineContent from "@/components/TimelineContent";
import React from "react";
import {getProject} from "@/lib/sanity/sanity-utils";
import {Github, Linkedin, Mail, ExternalLink, Download} from "lucide-react";
import BentoGrid from "@/components/BentoGrid";
import {FadeIn, Float} from "@/components/MotionWrappers";
import FeaturedProjectsGrid from "@/components/FeaturedProjectsGrid";

export default async function Home() {

    const projectSlugs = [
        "venade-cloud-distributed-game-infrastructure",
        "algoexplorer",
        "time-tracking-dashboard",
        "semantic_search",
    ];

    const projects = await Promise.all(
        projectSlugs.map((slug) => getProject(slug))
    );

    return (
        <div className="overflow-x-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="relative pt-32 pb-32 md:pt-48 md:pb-56">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        <FadeIn className="w-full md:w-3/5 text-center md:text-left order-2 md:order-1">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                                Hi, I&apos;m
                                <span
                                    className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-sky-300 dark:to-teal-400 bg-clip-text text-transparent">
                                    &nbsp;Nikolas
                                </span>
                            </h1>
                            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                <span className="text-black dark:text-white font-semibold">AI & ML Backend Engineer</span> focused
                                on building robust <span className="italic">Python and Java architectures</span>, scalable machine learning pipelines, and intelligent NLP systems. Beyond software engineering, I am passionate about mentoring dual students at work and sharing knowledge as a <span className="text-black dark:text-white font-semibold">DHBW Lecturer for Distributed Systems</span>. When I&apos;m not coding, you&apos;ll likely find me out exploring nature on my motorcycle, hiking, or playing the piano.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-4 justify-center md:justify-start">
                                <a href="mailto:rml.nikolas@gmail.com"
                                   className="group px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2">
                                    Contact Me <Mail size={18}
                                                     className="group-hover:translate-x-1 transition-transform"/>
                                </a>
                                <a href="/cv.pdf"
                                   className="px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 font-bold rounded-xl transition-all flex items-center gap-2 hover:border-gray-400 dark:hover:border-gray-600">
                                    Resume <Download size={18}/>
                                </a>
                                <div className="flex items-center gap-5 ml-2">
                                    <a href="https://github.com/NikolasRummel/"
                                       className="text-gray-400 hover:text-black dark:hover:text-white transition-colors hover:scale-110 transform">
                                        <Github size={24}/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/nikolas-rummel-311486206/"
                                       className="text-gray-400 hover:text-blue-600 transition-colors hover:scale-110 transform">
                                        <Linkedin size={24}/>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>

                        <div className="w-full md:w-2/5 flex justify-center order-1 md:order-2">
                            <FadeIn>
                                <div className="relative group">
                                    <div
                                        className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <Image
                                        priority
                                        className="relative object-cover rounded-full shadow-2xl aspect-square"
                                        src="/images/hike2.png"
                                        alt="Nikolas Rummel"
                                        width={350}
                                        height={350}
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>
            </div>

            <BentoGrid/>

            <section className="w-full py-48 bg-zinc-50 dark:bg-zinc-900/40 transition-colors duration-500">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn delay={0.2}>
                        <h2 className='font-bold text-4xl tracking-tight mb-20 flex items-center gap-4 text-black dark:text-white'>
                            My Journey <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
                        </h2>
                        <div className="w-full lg:w-4/5 mx-auto">
                            <TimelineContent/>
                        </div>
                    </FadeIn>
                </div>
            </section>


            <FadeIn delay={0.4}>
                <section className="w-full py-24 bg-zinc-950 dark:bg-zinc-50 transition-all duration-500 border-y border-zinc-800 dark:border-zinc-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="flex justify-between items-end mb-12">
                            <h2 className="font-bold text-3xl tracking-tight flex items-center gap-3 text-white dark:text-zinc-900">
                                Featured Projects
                                <span className="hidden md:block h-px w-32 bg-gradient-to-r from-zinc-800 to-transparent dark:from-zinc-200 dark:to-transparent"></span>
                            </h2>

                            <a href="/projects"
                               className="text-zinc-400 dark:text-zinc-500 hover:text-blue-400 dark:hover:text-blue-600 transition-colors text-sm font-bold flex items-center gap-1 group">
                                View All Projects
                                <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"/>
                            </a>
                        </div>

                        {/* The Grid */}
                        <FeaturedProjectsGrid projects={projects} />
                    </div>
                </section>
            </FadeIn>
        </div>
    )
}