import CodeWidget from "@/components/CodeWidget";
import React from "react";
import Image from "next/image";
import me from "@/public/images/hike.png"
import TimelineContent from "@/components/TimelineContent";

export default async function About() {
    return (
        <div className="mt-32">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  About
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  Explore my unique journey as a person and developer.
                </span>
            </h1>

            <CodeWidget/>
            <div className="flex flex-row items-center space-x-24 ">
                <div className="w-1/3 relative pt-[35%]">
                    <Image src={me} alt="Me" objectFit="cover" fill className="rounded-xl"/>
                </div>
                <div className="w-2/3">
                    <h2 className='font-bold text-3xl tracking-tight mb-8 text-center lg:text-start mt-24'>
                        My Journey
                    </h2>
                    <TimelineContent/>
                </div>
            </div>

        </div>
    )
}