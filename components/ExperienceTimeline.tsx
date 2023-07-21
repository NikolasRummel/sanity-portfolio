'use client';

import {Timeline, TimelineEvent} from './TimeLineExp';

const ExperienceTimeline = () => {
    return (
        <div className="">
            <Timeline>
                <TimelineEvent active>
                    <TimelineEvent.Title>studying computer science | oct. 2023 - current</TimelineEvent.Title>

                    <TimelineEvent.Description>
                        Beschreibung
                    </TimelineEvent.Description>
                </TimelineEvent>

                <TimelineEvent>
                    <TimelineEvent.Title>Software Engineer @dmTECH | jan. 2023 - jul. 2023</TimelineEvent.Title>

                    <TimelineEvent.Description>
                        During my 6-month tenure at dmTECH, I actively contributed to Java Springboot and Apache Camel
                        integrations, <br/>
                        gaining valuable experience in (REST) API&apos;s, debugging and utilizing Git for version
                        control. <br/>
                        Taking the initiative to independently create a service was a rewarding and enjoyable
                        experience.
                        Additionally, I familiarized myself with Scrum and project management methodologies,<br/>
                        further enhancing my software engineering skills.
                    </TimelineEvent.Description>
                </TimelineEvent>

                <TimelineEvent last>
                    <TimelineEvent.Title>Seminar Paper | aug. 2021 - aug. 2022</TimelineEvent.Title>
                    <TimelineEvent.Description>
                        The main idea of the Project was to develop a Minecraft server hosting platform, <br/>
                        where a user should be able to host his own server and manage it with a web interface. <br/>
                        The software was build with a microservice architecture based on REST.
                    </TimelineEvent.Description>
                </TimelineEvent>

            </Timeline>
        </div>
    )
}

export default ExperienceTimeline;