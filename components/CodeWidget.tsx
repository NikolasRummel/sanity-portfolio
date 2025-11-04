"use client";

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeWidget = () => {
    return (
        <div className="rounded-xl bg-[#292c34] shadow-md p-3 w-full inline-block relative overflow-hidden">
            <div className="flex items-center justify-start">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1">
                <div className="bg-[#9167db]/80 h-32 w-96 rounded-full absolute -top-8 blur-[190px]"></div>
                <div className="bg-[#0094FF]/70 h-32 w-96 rounded-full absolute -bottom-36 right-28 blur-[190px]"></div>
                <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {"const nikolas: Person = {\n" +
                        "   studying: \"Computer Science, 5th Semester\",\n" +
                        "   about: [\n" +
                        "        \"Passionate full-stack developer focused on backend services with Java\",\n" +
                        "        \"Frontend development with React and Next.js\",\n" +
                        "        \"Interested in scalable architectures and integrating AI in full-stack projects\"\n" +
                        "    ], \n" +
                        "    technicalExperience: [\n" +
                        "        \"Developed backend microservices with Java and Spring Boot\",\n" +
                        "        \"Built responsive UIs with React, Next.js, and Tailwind CSS\",\n" +
                        "        \"Implemented messaging systems (Pub/Sub) and monitoring with Datadog\",\n" +
                        "        \"Deployed Dockerized services to GCP using CI/CD pipelines\",\n" +
                        "        \"Optimized databases and search: SQL, MongoDB, Redis, Indexes, Fuzzy/Semantic Search\"\n" +
                        "    ],\n" +
                        "    collaborationExperience: [\n" +
                        "        \"Worked in multicultural teams: Germany, Poland, exchange semester abroad\",\n" +
                        "        \"Collaborated with non-technical teams for UI/UX feedback\",\n" +
                        "        \"Experienced in working with agile (Scrum) and collaborative tools: Git, Jira, Confluence\"\n" +
                        "    ],\n" +
                        "    stack: [\n" +
                        "        \"Java\", \"Spring Boot\", \"Maven\", \"Unit, Integration and E2E Tests\",\n" +
                        "        \"React\", \"Next.js\", \"TypeScript\", \"Tailwind CSS\",\n" +
                        "        \"SQL\", \"MongoDB\", \"Redis\", \"Indexes\", \"Fuzzy Search\", \"Semantic Search\",\n" +
                        "        \"Docker\", \"CI/CD\", \"GCP\", \"Datadog\",\n" +
                        "        \"Microservices\", \"Pub/Sub Messaging\", \"Apache Camel\",\n" +
                        "        \"Git\", \"Scrum\", \"Jira\", \"Confluence\",\n" +
                        "    ],\n" +
                        "    currentlyLearning: [\"AI/ML\", \"Data Science\", \"Python\"],\n" +
                        "};\n"}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeWidget;
