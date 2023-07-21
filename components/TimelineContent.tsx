'use client';

import {Timeline, TimelineEvent} from './TimeLine';

const TimelineContent = () => {
    return (
        <Timeline>
            <TimelineEvent active>
                <TimelineEvent.Title>
                    <a href="">
                        <b>Studying computer science </b>&nbsp;<i> oct. 2023 - current</i>
                    </a>
                </TimelineEvent.Title>

                <TimelineEvent.Description>
                    Beschreibung
                </TimelineEvent.Description>
            </TimelineEvent>

            <TimelineEvent>
                <TimelineEvent.Title>
                    <a href="">
                        <b>Software Engineer @dmTECH </b>&nbsp;<i> jan. 2023 - jul. 2023</i>
                    </a>
                </TimelineEvent.Title>

                <TimelineEvent.Description>
                    During my 6-month tenure at dmTECH, I actively contributed to Java Springboot and Apache Camel<br/>
                    integrations, gaining valuable experience in (REST) API&apos;s, debugging and utilizing Git for
                    version
                    control. <br/>
                    Taking the initiative to independently create a service was a rewarding and enjoyable
                    experience.<br/>
                    Additionally, I familiarized myself with Scrum and project management methodologies,<br/>
                    further enhancing my software engineering skills.
                </TimelineEvent.Description>
            </TimelineEvent>

            <TimelineEvent last>
                <TimelineEvent.Title>
                    <a href="">
                        <b>School Seminar Paper </b>&nbsp;<i> aug. 2021 - aug. 2022</i>
                    </a>
                </TimelineEvent.Title>
                <TimelineEvent.Description>
                    The main idea of the Project was to develop a Minecraft server hosting platform, <br/>
                    where a user should be able to host his own server and manage it with a web interface. <br/>
                    The software was build with a microservice architecture based on REST.
                </TimelineEvent.Description>
            </TimelineEvent>

        </Timeline>
    )
}

export default TimelineContent;