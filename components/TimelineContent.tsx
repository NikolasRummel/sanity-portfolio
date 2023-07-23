'use client';

import {Timeline, TimelineItem} from './TimeLine';

const TimelineContent = () => {
    const dmTECH = 'https://cdn.discordapp.com/attachments/786618658829893642/1132688291876044890/f49c3149-3283-4ac8-bedb-89d5bcfef0ad_1_645bba976b1a4.png';
    const aes = 'https://cdn.discordapp.com/attachments/786618658829893642/1132688567764779148/AOPolaSJP1G_THpU4mzGoTu0zvntFZqV5MCgzw7XdvEs900-c-k-c0x00ffffff-no-rj.png';
    const dhbw = 'https://cdn.discordapp.com/attachments/786618658829893642/1132687854766661672/dhbw_square.png';

    return (
        <Timeline>
            <TimelineItem logo={dhbw}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Studying computer science </b>&nbsp;<i> oct. 2023 - current</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    Beschreibung
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={dmTECH}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Software Engineer @dmTECH </b>&nbsp;<i> jan. 2023 - jul. 2023</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    During my 6-month tenure at dmTECH, I actively contributed to Java Springboot and Apache Camel<br/>
                    integrations, gaining valuable experience in (REST) API&apos;s, debugging and utilizing Git for
                    version
                    control. <br/>
                    Taking the initiative to independently create a service was a rewarding and enjoyable
                    experience.<br/>
                    Additionally, I familiarized myself with Scrum and project management methodologies,<br/>
                    further enhancing my software engineering skills.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem last logo={aes}>
                <TimelineItem.Title>
                    <a href="">
                        <b>School Seminar Paper </b>&nbsp;<i> aug. 2021 - aug. 2022</i>
                    </a>
                </TimelineItem.Title>
                <TimelineItem.Description>
                    The main idea of the Project was to develop a Minecraft server hosting platform, <br/>
                    where a user should be able to host his own server and manage it with a web interface. <br/>
                    The software was build with a microservice architecture based on REST.
                </TimelineItem.Description>
            </TimelineItem>

        </Timeline>
    )
}

export default TimelineContent;