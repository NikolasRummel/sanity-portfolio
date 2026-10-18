"use client";

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeWidget = () => {
    const codeString = `const nikolas: Engineer = {
  role: "AI & ML Backend Engineer",
  company: "dmTECH GmbH",
  focus: ["Python", "LLM", "ML Pipelines", "Cloud & Data"],
  stack: {
    backend: ["FastAPI", "Python", "Java Spring Boot"],
    data: ["Scikit-learn", "BigQuery", "dbt", "PostgreSQL"],
    cloud: ["Google Cloud (GCP)", "Terraform", "Docker"]
  },
  teaching: {
    academic: "Distributed Systems Lecturer @ DHBW",
    mentorship: "Supervising Interns & Dual Students"
  },
  hobbies: ["Motorcycle Riding", "Hiking & Nature", "Piano"]
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