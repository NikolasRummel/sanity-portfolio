'use client';

import {Timeline, TimelineItem} from './TimeLine';

const TimelineContent = () => {

    return (
        <Timeline>
            <TimelineItem logo={"/images/dhbw.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Dozent für Verteilte Systeme @ DHBW Karlsruhe</b>&nbsp;<i>Sommersemester 2027</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Offiziell berufen als Dozent für die Vorlesung Verteilte Systeme im Studiengang Data Science und KI an der DHBW Karlsruhe.
                    Ich bereite Vorlesungsmodule, Lehrmaterialien und praktische Python-Übungen für die kommenden Studierenden vor.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>AI & ML Backend Engineer @ dmTECH</b>&nbsp;<i>seit Okt. 2026</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Nach dem erfolgreichen Abschluss meines dualen Informatikstudiums (B.Sc.) in die Vollzeitstelle als AI & ML Backend Engineer gewechselt.
                    Schwerpunkt: skalierbare Python-(FastAPI)- und Java-Spring-Backends, Machine-Learning-Klassifikationspipelines, strukturierte NLP-Workflows und Cloud-native Datenarchitekturen auf der Google Cloud.
                    Zusätzlich betreue ich Praktikanten, leite Onboarding-Workshops und begleite neue duale Studierende.
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
                    {"Meine Bachelorarbeit zu unüberwachtem Clustering, Embeddings und zeitlicher Anomalieerkennung auf echten Kundenservice-Daten habe ich anschließend als Demo-Projekt umgesetzt: den Postfach-Radar. "}
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
                    Neben der letzten Schulphase (Abitur) als Java Backend Engineer gestartet.
                    Mitarbeit an Java-Spring-Boot- und Apache-Camel-Integrationen und viel Erfahrung mit REST-APIs, ereignisgesteuerten Architekturen und Backend-Microservices, bevor mein duales Studium begann.
                </TimelineItem.Description>
            </TimelineItem>

        </Timeline>
    )
}

export default TimelineContent;