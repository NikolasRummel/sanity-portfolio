import CodeWidget from "@/components/CodeWidget";
import React from "react";

export default async function About() {
    return (
        <div className="mt-32">
            <h2 className='font-bold text-3xl tracking-tight mb-8 text-center lg:text-start'>About Me</h2>
            <CodeWidget/>
        </div>
    )
}