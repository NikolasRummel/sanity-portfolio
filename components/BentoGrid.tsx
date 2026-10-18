"use client"; // Required for Framer Motion in Next.js App Router

import React from 'react';
import {motion} from 'framer-motion';
import {Cpu, Database, Layers, GraduationCap, Cloud} from "lucide-react";
import CodeWidget from "@/components/CodeWidget";

const BentoGrid = () => {
    // Container variant for staggering children
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delay between each card
                delayChildren: 0.2
            }
        }
    };

    // Individual card variant
    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.5, ease: "easeOut"}
        }
    };

    return (
        <section
            className="w-full py-24 bg-zinc-950 dark:bg-zinc-50 transition-all duration-500 border-y border-zinc-800 dark:border-zinc-200">
            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
            >
                <motion.h2
                    variants={itemVariants}
                    className="font-bold text-3xl tracking-tight mb-12 flex items-center gap-3 text-white dark:text-zinc-900"
                >
                    Technical Capabilities
                    <span
                        className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent dark:from-zinc-200 dark:to-transparent"></span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-flow-row-dense">

                    {/* AI & ML Backend Engineering Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{y: -5}}
                        className="md:col-span-2 md:row-span-2 p-8 rounded-3xl border border-zinc-800 dark:border-zinc-200 bg-zinc-900/20 dark:bg-white/50 backdrop-blur-sm flex flex-col justify-between group min-h-[400px]"
                    >
                        <div>
                            <div
                                className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-50 flex items-center justify-center text-purple-400 dark:text-purple-600 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                                <Cpu size={28}/>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white dark:text-zinc-900">AI & ML Backend Engineering</h3>
                            <p className="text-zinc-400 dark:text-zinc-500 leading-relaxed font-medium">
                                Building robust architectures for AI & data-intensive services. I combine scalable
                                <span className="text-blue-400 dark:text-blue-600"> Python (FastAPI) & Java (Spring)</span> backends with machine learning pipelines, structured LLM workflows, and cloud-native data platforms.
                            </p>
                        </div>
                        <div className="mt-8">
                            <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] mb-4">Core
                                Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {['Python', 'FastAPI', 'Java Spring', 'Google Cloud', 'PostgreSQL', 'BigQuery', 'Terraform'].map(t => (
                                    <span key={t}
                                          className="text-[10px] font-bold px-3 py-1 bg-zinc-800/50 dark:bg-zinc-100 text-zinc-400 dark:text-zinc-600 rounded-lg border border-zinc-700/50 dark:border-zinc-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 md:row-span-1 min-h-[300px] flex"
                    >
                        <div
                            className="w-full h-full overflow-hidden rounded-3xl border border-zinc-800 dark:border-zinc-200 bg-black/40 backdrop-blur-md">
                            <CodeWidget/>
                        </div>
                    </motion.div>

                    {/* Machine Learning & Cloud Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{y: -5}}
                        className="md:col-span-1 md:row-span-1 p-6 rounded-3xl border border-purple-500/20 bg-purple-500/[0.02] dark:bg-purple-50/50 flex flex-col items-center justify-center text-center group min-h-[200px]"
                    >
                        <div className="relative">
                            <div
                                className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Database
                                className="text-purple-400 dark:text-purple-600 mb-3 relative z-10 group-hover:rotate-12 transition-transform"
                                size={32}/>
                        </div>
                        <h3 className="font-bold text-lg leading-tight text-white dark:text-zinc-900">Machine Learning<br/>& Data Pipelines
                        </h3>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 italic font-mono uppercase tracking-wider">Scikit-learn, LLMs, dbt, BigQuery</p>
                    </motion.div>

                    {/* Distributed Systems Lecturer Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{y: -5}}
                        className="md:col-span-1 md:row-span-1 p-6 rounded-3xl border border-sky-500/20 bg-sky-500/[0.02] dark:bg-sky-50/50 flex flex-col justify-between group min-h-[200px]"
                    >
                        <div className="flex justify-between items-start">
                            <div className="relative">
                                <div
                                    className="absolute inset-0 bg-sky-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <GraduationCap
                                    className="text-sky-400 dark:text-sky-600 relative z-10 group-hover:scale-110 transition-transform"
                                    size={28}/>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white dark:text-zinc-900 leading-tight">Distributed Systems<br/>Lecturer
                            </h3>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-1 font-medium">
                                DHBW Karlsruhe (Summer 2027)<br/>
                                <span className="text-[9px] text-sky-400/80 uppercase tracking-wide">Data Science & AI Program</span>
                            </p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
};

export default BentoGrid;