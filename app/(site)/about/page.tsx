import CodeWidget from "@/components/CodeWidget";
import React from "react";
import Image from "next/image";
import me from "@/public/images/me.png"
import TimelineContent from "@/components/TimelineContent";

export default async function About() {
    return (
        <div className="mt-32">
            <h1 className="text-4xl md:text-7xl font-extrabold mt-16 mb-8">About
                <span className="bg-gradient-to-r from-sky-300 to-blue-800 bg-clip-text text-transparent">
                            &nbsp;Me
                        </span>
            </h1>
            <CodeWidget/>
            <div className="flex flex-row items-center space-x-24 ">
                <div className="w-1/3 relative pt-[35%]">
                    <Image src={me} alt="Me" objectFit="cover" fill className="rounded-xl"/>
                </div>
                <div className="w-2/3">
                    <h2 className='font-bold text-3xl tracking-tight mb-8 text-center lg:text-start mt-24'>
                        Experience
                    </h2>
                    <TimelineContent/>
                </div>
            </div>

        </div>
    )
}