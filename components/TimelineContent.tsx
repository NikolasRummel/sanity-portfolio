'use client';

import {Timeline, TimelineItem} from './TimeLine';

const TimelineContent = () => {

    return (
        <Timeline>
            <TimelineItem logo={"/images/lehre.svg"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Dozent für Verteilte Systeme</b>&nbsp;<i>Sommersemester 2027</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Da ich schon immer gerne anderen beim Lernen geholfen und Wissen vermittelt habe, freue ich mich besonders, im Sommersemester 2027 die Vorlesung Verteilte Systeme im Studiengang Data Science und KI an der DHBW Karlsruhe übernehmen zu dürfen.
                    Aktuell bereite ich Präsentationen und Übungen dafür vor.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>AI & ML Backend Engineer @ dmTECH</b>&nbsp;<i>seit Okt. 2026</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Nach dem Abschluss meines dualen Informatikstudiums (B.Sc.) in die Vollzeitstelle als AI & ML Backend Engineer gewechselt.
                    Im Team entwickle ich bestehende Systeme im Kundenservice weiter und arbeite an neuen ML-Pipelines und Features, teils aufbauend auf meiner Bachelorarbeit, vom Proof of Concept bis in den produktiven Betrieb.
                    Da die Nutzer direkt im Haus sitzen, stimme ich im Requirements Engineering Anforderungen im agilen Umfeld direkt mit ihnen ab, was mir besonders Spaß macht.
                    Daneben betreue ich Praktikanten, leite Onboarding-Workshops und begleite neue duale Studierende.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dhbw.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Duales Informatikstudium (B.Sc.) @ DHBW & dmTECH</b>&nbsp;<i>Okt. 2023 - Sep. 2026</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Duales Bachelorstudium der Informatik mit einem Notendurchschnitt von 1,2 und einer Bachelorarbeit mit der Note 1,0 abgeschlossen.
                    In den Praxisphasen bei dmTECH habe ich mich von der Fullstack-Entwicklung hin zu AI & ML Engineering entwickelt.
                    {"Meine Bachelorarbeit zu Unsupervised Clustering, Embeddings und Temporal Anomaly Detection auf echten Kundenservice-Daten habe ich anschließend als Demo-Projekt umgesetzt: den Postfach-Radar. "}
                    Außerdem war ich Kurssprecher und habe bei einem Auslandssemester an der NTNU in Trondheim, Norwegen (Herbst 2025) internationale Erfahrung gesammelt.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Java Backend Engineer @ dmTECH</b>&nbsp;<i>Jan. 2023 - Sep. 2023</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    In der Schulzeit habe ich privat Minecraft-Server-Netzwerke entwickelt und erste REST-APIs gebaut. Dann wollte ich wissen, wie es ist, in einer richtigen Firma zu arbeiten, und bin deshalb schon neben dem Abitur als Java Backend Engineer eingestiegen.
                    Dort habe ich an Java-Spring-Boot- und Apache-Camel-Integrationen mitgearbeitet und viel über REST-APIs, Event-Driven Architectures und Backend-Microservices gelernt, bevor mein duales Studium begann.
                </TimelineItem.Description>
            </TimelineItem>

        </Timeline>
    )
}

export default TimelineContent;