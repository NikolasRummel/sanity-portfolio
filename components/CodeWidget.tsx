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
    academic: "Dozent für Verteilte Systeme @ DHBW",
    mentorship: "Betreuung von Praktikanten & dualen Studierenden"
  },
  hobbies: ["Motorradfahren", "Wandern & Natur", "Klavier"]
};`;

    return (
        <div className="code-widget">
            <div>
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