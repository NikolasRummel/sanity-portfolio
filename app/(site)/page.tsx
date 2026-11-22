import Image from 'next/image'
import Link from "next/link";
import TimelineContent from "@/components/TimelineContent";
import React from "react";
import {getProject} from "@/lib/content";
import {Mail, ExternalLink, Download, ArrowRight} from "lucide-react";
import {Github, Linkedin} from "@/components/icons";
import BentoGrid from "@/components/BentoGrid";
import {FadeIn} from "@/components/MotionWrappers";
import FeaturedProjectsGrid from "@/components/FeaturedProjectsGrid";
import {Project} from "@/types/project";

export default async function Home() {

    const projectSlugs = [
        "venade-cloud-distributed-game-infrastructure",
        "time-tracking-dashboard",
        "semantic_search",
    ];

    const projects = projectSlugs
        .map((slug) => getProject(slug))
        .filter((p): p is Project => !!p);

    return (
        <div className="ki">
            <section className="home-hero" aria-labelledby="hallo">
                <div className="container">
                    <div className="home-hero__grid">
                        <div className="home-hero__text">
                            <h1 id="hallo">Hi, ich bin Nikolas</h1>
                            <p className="about">
                                <strong>AI & ML Backend Engineer</strong> mit Fokus
                                auf robuste Python- und Java-Architekturen, skalierbare Machine-Learning-Pipelines und intelligente NLP-Systeme. Neben der Softwareentwicklung begleite ich gern duale Studierende bei der Arbeit und gebe mein Wissen als <strong>DHBW-Dozent für Verteilte Systeme</strong> weiter. Wenn ich nicht programmiere, bin ich meist mit dem Motorrad in der Natur unterwegs, wandere oder spiele Klavier.
                            </p>
                            <div className="home-hero__actions">
                                <a href="mailto:kontakt@nikolas-rummel.de" className="btn">
                                    Kontakt <Mail size={18} aria-hidden="true"/>
                                </a>
                                <a href="/cv.pdf" className="btn btn--clear">
                                    Lebenslauf <Download size={18} aria-hidden="true"/>
                                </a>
                                <Link href="/ki-fuer-unternehmen/postfach-radar#demo" className="btn btn--clear" lang="de">
                                    Live-Demo <ArrowRight size={18} aria-hidden="true"/>
                                </Link>
                                <div className="socials">
                                    <a href="https://github.com/NikolasRummel/" aria-label="GitHub"><Github size={24}/></a>
                                    <a href="https://www.linkedin.com/in/nikolas-rummel-311486206/" aria-label="LinkedIn"><Linkedin size={24}/></a>
                                </div>
                            </div>
                        </div>

                        <FadeIn className="home-hero__photo">
                            <Image
                                priority
                                src="/images/hike2.png"
                                alt="Nikolas Rummel"
                                width={480}
                                height={480}
                            />
                            <p className="small">Lofoten, Norwegen</p>
                        </FadeIn>
                    </div>
                </div>
            </section>


            <BentoGrid/>

            <section className="band" aria-labelledby="journey">
                <div className="container">
                    <FadeIn>
                        <div className="head"><h2 id="journey">Mein Werdegang</h2></div>
                        <div className="journey">
                            <TimelineContent/>
                            <aside className="journey__product" aria-label="Bachelorarbeit als Produkt">
                                <p className="small">Von der Bachelorarbeit zum Produkt</p>
                                <h3>Postfach-Radar</h3>
                                <p>
                                    Aus meiner Bachelorarbeit ist ein Produkt entstanden: Es sortiert Kundenanfragen
                                    automatisch nach Themen und meldet sich, wenn zu einem Thema plötzlich ungewöhnlich
                                    viele E-Mails eintreffen – eine Anomalieerkennung für das Postfach.
                                </p>
                                <Link href="/ki-fuer-unternehmen/postfach-radar#demo" className="link" lang="de">
                                        Zur Demo <ArrowRight size={16} aria-hidden="true" style={{display: "inline", marginLeft: 4}}/>
                                    </Link>
                            </aside>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="band" aria-labelledby="featured" style={{background: "var(--color-paper-2)"}}>
                <div className="container">
                    <div className="head head--row">
                        <h2 id="featured">Ausgewählte Projekte</h2>
                        <Link href="/projects" className="link">
                            Alle Projekte ansehen <ExternalLink size={14} aria-hidden="true" style={{display: "inline", marginLeft: 4}}/>
                        </Link>
                    </div>
                    <FeaturedProjectsGrid projects={projects}/>
                </div>
            </section>
        </div>
    )
}
