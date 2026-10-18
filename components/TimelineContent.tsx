'use client';

import {Timeline, TimelineItem} from './TimeLine';

const TimelineContent = () => {

    return (
        <Timeline>
            <TimelineItem logo={"/images/dhbw.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Lecturer for Distributed Systems @ DHBW Karlsruhe</b>&nbsp;<i>Summer Semester 2027</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Appointed as an official lecturer for the Distributed Systems course in the Data Science and AI program at DHBW Karlsruhe.
                    Preparing lecture modules, syllabus materials, and practical Python-based exercises for upcoming engineering students.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>AI & ML Backend Engineer @ dmTECH</b>&nbsp;<i>Oct. 2026 - present</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Transitioned into a full-time role as an AI & ML Backend Engineer after successfully completing my dual computer science degree (B.Sc., grade 1.2).
                    Focused on building scalable Python (FastAPI) and Java Spring backends, machine learning classification pipelines, structured NLP/LLM workflows, and cloud-native data architectures on Google Cloud.
                    Additionally, I supervise interns, lead onboarding workshops, and mentor incoming dual students.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dhbw.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Dual Computer Science Studies (B.Sc.) @ DHBW & dmTECH</b>&nbsp;<i>Oct. 2023 - Sep. 2026</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Completed my dual Bachelor of Science degree in Computer Science with a 1.2 grade point average.
                    Successfully combined theoretical computer science with practical software engineering at dmTECH.
                    Authored my Bachelor&apos;s thesis focusing on unsupervised clustering, embeddings, and temporal anomaly detection on real customer service data.
                    Served as class representative and gained international experience during an academic exchange semester at NTNU in Trondheim, Norway (Autumn 2025).
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Software Engineering Intern & Working Student @ dmTECH</b>&nbsp;<i>Jan. 2023 - Sep. 2026</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Contributed to Java Spring Boot and Apache Camel integrations, gained deep experience in REST APIs, event-driven architectures, and backend microservices.
                    Gradually expanded my scope toward data engineering and machine learning, laying the groundwork for automated service center analytics and scalable data pipelines using BigQuery, dbt, and Python.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/aes.png"}>
                <TimelineItem.Title>
                    <b>Technical Highschool (Abitur)</b>&nbsp;<i>Graduated 2023</i>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Attended a technical high school with a focus on STEM subjects. Served as class representative and graduated as the top student in my year.
                    Participated in a <a className={"text-blue-500"} href={"https://nikolas-rummel.de/blog/math-camp"}>one-week mathematics camp in Belgium</a> to deepen analytical and problem-solving skills.
                    Started coding early by developing Minecraft plugins, gradually moving to more complex projects such as scaling and administrating game servers for 100+ users.
                </TimelineItem.Description>
            </TimelineItem>

        </Timeline>
    )
}

export default TimelineContent;