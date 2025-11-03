'use client';

import {Timeline, TimelineItem} from './TimeLine';

const TimelineContent = () => {

    return (
        <Timeline>
            <TimelineItem logo={"/images/ntnu.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Exchange Semester at NTNU, Trondheim, Norway </b>&nbsp;<i> Aug. 2025 - current</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    I am currently attending an exchange semester at NTNU in Trondheim, Norway as part of my 5th semester.
                    This experience allows me to immerse myself in a new academic environment, broaden my cultural
                    horizons, and gain valuable international perspectives in the field of computer science.

                    See more about my exhange semester <a className={"text-blue-500"} href="https://nikolas-rummel.de/blog/exchange-semester" >here</a>.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dhbw.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Studying computer science </b>&nbsp;<i> Oct. 2023 - current</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    I am pursuing a dual degree in Computer Science at DHBW Karlsruhe while simultaneously working at
                    dmTECH. During my studies in the field of computer science at DHBW, I not only acquire solid
                    theoretical knowledge but also have the opportunity to apply it directly in practice at my
                    workplace. This unique combination of theory and practical experience is truly invaluable and allows
                    for comprehensive professional growth.
                </TimelineItem.Description>
            </TimelineItem>

            <TimelineItem logo={"/images/dmtech.png"}>
                <TimelineItem.Title>
                    <a href="">
                        <b>Software Engineer @dmTECH </b>&nbsp;<i> Jan. 2023 - jul. 2023</i>
                    </a>
                </TimelineItem.Title>

                <TimelineItem.Description>
                    During my 6-month tenure at dmTECH, I actively contributed to Java Springboot and Apache Camel
                    integrations, gaining valuable experience in (REST) API&apos;s, debugging and utilizing Git for
                    version control. Taking the initiative to independently create a service was a rewarding and
                    enjoyable experience. Additionally, I familiarized myself with Scrum and project management
                    methodologies, further enhancing my software engineering skills.
                </TimelineItem.Description>
            </TimelineItem>

        </Timeline>
    )
}

export default TimelineContent;