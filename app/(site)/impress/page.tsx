import React from "react";

export default function Impress() {
    return (
        <div className="mt-32 min-h-screen">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  Impress
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center ">
                    Information pursuant to § 5 TMG
                </span>
            </h1>
            <p>
                Nikolas Rummel<br/>
                Laurentiusstraße 56<br/>
                Karlsruhe, Germany<br/>
            </p>
            <p>
                E-Mail Address: <u>hello@nikolas.rummel.de</u>
            </p>
        </div>
    );
}
