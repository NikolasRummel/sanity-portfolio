"use client";

import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeWidget = () => {
    return (
        <div className="rounded-xl max-w-[510px] bg-[#292c34] shadow-md p-3">
            <div className="flex items-center justify-start">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="m-2 text-white bg-black">
                <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {/* add better values*/}
                    {"const nikolas: Person = {\n" +
                        "  name: \"Nikolas\",\n" +
                        "  alter: 20,\n" +
                        "  experience: \"4 years\",\n" +
                        "  techstack: [\"Java\", \"SQL\"],\n" +
                        "  currentlyLearning: [\"Next.js\", \"Tailwind CSS\"],\n" +
                        "};"}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeWidget;
