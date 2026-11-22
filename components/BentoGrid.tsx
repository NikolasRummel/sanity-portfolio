"use client";

import React from 'react';
import {motion, type Variants} from 'framer-motion';
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import CodeWidget from "@/components/CodeWidget";
import MiniRadar from "@/components/radar/MiniRadar";

const BentoGrid = () => {
    const containerVariants: Variants = {
        hidden: {opacity: 1},
        visible: {opacity: 1, transition: {staggerChildren: 0.1, delayChildren: 0.1}},
    };
    const itemVariants: Variants = {
        hidden: {y: 16},
        visible: {y: 0, transition: {duration: 0.5, ease: "easeOut"}},
    };

    return (
        <section className="band" aria-labelledby="capabilities" style={{background: "var(--color-paper-2)"}}>
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
            >
                <div className="head"><h2 id="capabilities">Technische Fähigkeiten</h2></div>

                <div className="cap">
                    <motion.div variants={itemVariants} className="cap__tile cap__lead">
                        <div>
                            <h3>AI & ML Backend Engineering</h3>
                            <p style={{marginTop: "var(--space-md)"}}>
                                Ich baue robuste Architekturen für KI- und datenintensive Dienste und kombiniere skalierbare Python-(FastAPI)- und Java-(Spring)-Backends mit Machine-Learning-Pipelines, strukturierten LLM-Workflows und Cloud-nativen Datenplattformen.
                            </p>
                        </div>
                        <div>
                            <p className="small" style={{marginBottom: "var(--space-sm)"}}>Kern-Stack</p>
                            <div className="tags">
                                {['Python', 'FastAPI', 'Java Spring', 'Google Cloud', 'PostgreSQL', 'BigQuery', 'Terraform'].map(t => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="cap__tile cap__code">
                        <CodeWidget/>
                    </motion.div>

                    <motion.div variants={itemVariants} className="cap__tile">
                        <h3>Machine Learning & Datenpipelines</h3>
                        <p className="small">Scikit-learn, LLMs, dbt, BigQuery</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="cap__tile">
                        <h3>Dozent für Verteilte Systeme</h3>
                        <p className="small">
                            DHBW Karlsruhe (Sommersemester 2027)<br/>
                            Studiengang Data Science & KI
                        </p>
                    </motion.div>
                    <motion.div variants={itemVariants} className="cap__tile cap__demo" lang="de">
                            <div>
                                <p className="small">Live-Demo</p>
                                <h3>Postfach-Radar</h3>
                                <p style={{marginTop: "var(--space-sm)"}}>
                                    Aus meiner Bachelorarbeit entstanden: Der Radar ordnet Kundenanfragen automatisch Themen zu und schlägt Alarm, wenn zu einem Thema ungewöhnlich viele eintreffen. Probier es hier direkt aus.
                                </p>
                                <Link href="/ki-fuer-unternehmen/postfach-radar#demo" className="link"
                                      style={{display: "inline-flex", alignItems: "center", gap: 6, marginTop: "var(--space-md)"}}>
                                    Zur vollständigen Demo <ArrowRight size={16} aria-hidden="true"/>
                                </Link>
                            </div>
                            <MiniRadar/>
                        </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default BentoGrid;
