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
                    {" const nikolas: Person = {\n" +
                        "        name: \"Nikolas\",\n" +
                        "        age: 22,\n" +
                        "        skills: [\n" +
                        "            \"Design and implementation of libraries or API's in Java\",\n" +
                        "            \"Good knowledge of Git and project management (scrum, kanban)\",\n" +
                        "            \"Software architectures such as microservices or messaging via pub/sub\",\n" +
                        "        ],\n" +
                        "        stack: [\n" +
                        "            \"Java\", \"REST\", \"Unit Tests\", \"Integration Tests\", \"Git\", \"Maven\",\n" +
                        "            \"Apache Camel\", \"XML\", \"JSON\", \"MongoDB\", \"SQL\", \"Jira\", \"Confluence\"\n" +
                        "        ],\n" +
                        "        currentlyLearning: [\"AI/ML\", \"Data Science\", \"Python\"],\n" +
                        "    };"}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeWidget;
