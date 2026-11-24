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
                                Bei dmTECH arbeite ich an der Automatisierung im Kundenservice. Dafür baue ich skalierbare Python-(FastAPI)- und Java-(Spring)-Backends, Machine-Learning-Pipelines und strukturierte NLP-Workflows auf der Google Cloud.
                                {" Aus meiner Bachelorarbeit zu Embeddings, Clustering und Anomalieerkennung auf Kundenservice-Daten habe ich eine lauffähige Demo gebaut: den Postfach-Radar, den du weiter unten direkt ausprobieren kannst."}
                            </p>
                        </div>
                        <div>
                            <p className="small" style={{marginBottom: "var(--space-sm)"}}>Kern-Stack</p>
                            <div className="tags">
                                {['Python', 'FastAPI', 'Java Spring', 'LLMs', 'Embeddings', 'Vektordatenbanken', 'PostgreSQL', 'BigQuery', 'Google Cloud', 'Terraform'].map(t => (
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
                                    Demo-Projekt aus meiner Bachelorarbeit: Der Radar ordnet Kundenanfragen automatisch Themen zu und schlägt Alarm, wenn zu einem Thema ungewöhnlich viele eintreffen. Probier es hier direkt aus.
                                </p>
                                <Link href="/projects/postfach-radar#demo" className="link"
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
