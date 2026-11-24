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
    ai: ["LLMs", "Embeddings", "Vektordatenbanken"],
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
            <div className="code-widget__bar">
                <span className="code-widget__dots" aria-hidden="true"><i/><i/><i/></span>
                <span className="code-widget__file">nikolas.ts</span>
            </div>
            <div className="code-widget__body">
                <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers
                    lineNumberStyle={{minWidth: '2.2em', paddingRight: '1.2em', textAlign: 'right', color: 'rgba(160,175,200,0.35)', userSelect: 'none'}}
                    codeTagProps={{style: {background: 'none', padding: 0, fontFamily: 'inherit'}}}
                    customStyle={{
                        background: 'transparent',
                        padding: '0',
                        margin: '0',
                        fontSize: '0.86rem',
                        lineHeight: '1.75',
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeWidget;
