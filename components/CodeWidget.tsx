"use client";

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeWidget = () => {
    const codeString = `const nikolas: Developer = {
  status: "B.Sc. Computer Science Student",
  techstack: {
    backend: ["Java", "Spring Boot", "Microservices"],
    frontend: ["React", "Next.js", "TypeScript"],
    infrastructure: ["Docker", "GCP", "K8s"]
    others: ["Intern Mentorship", "Organization of school programs at dmTECH"]
  },
  learning: ["Machine Learning", "Golang", "Kubernetes"],
  passion: "Learning new things and teaching others"
};`;

    return (
        <div className="rounded-2xl bg-[#1e1e1e] shadow-2xl p-4 w-full h-full relative overflow-hidden border border-gray-800">
            <div className="flex items-center justify-start mb-4 gap-1.5">
                <div className="h-3 w-3 bg-[#ff5f56] rounded-full"></div>
                <div className="h-3 w-3 bg-[#ffbd2e] rounded-full"></div>
                <div className="h-3 w-3 bg-[#27c93f] rounded-full"></div>
            </div>

            <div className="relative">
                <div className="absolute -top-10 -left-10 bg-blue-500/20 w-40 h-40 blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 bg-purple-500/20 w-40 h-40 blur-[80px] pointer-events-none"></div>

                <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    customStyle={{
                        background: 'transparent',
                        padding: '0',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeWidget;