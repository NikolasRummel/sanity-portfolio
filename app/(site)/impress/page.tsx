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
                Wilhelm-Hausenstein-Allee 23A<br/>
                Karlsruhe, Germany<br/>
            </p>
            <p>
                E-Mail Address: <u>hello@nikolas.rummel.de</u>
            </p>

            <span
                className="mt-16 block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                Liability for Contents
            </span>
            <p>
                As a service provider, I am liable for my own contents on this website
                according to Sec. 7, paragraph 1 of the German Telemedia Act (TMG). However,
                according to Sec. 8 to 10 of the German Telemedia Act (TMG), I am not obligated
                to permanently monitor submitted or stored information or to search for evidence
                that indicates illegal activities.
            </p>
            <p>
                Legal obligations to remove information or to block the use of
                information remain unchallenged. In this case, liability is only possible
                at the time of knowledge about a specific violation of law. Illegal
                contents will be removed immediately upon my knowledge of them.
            </p>

            <span
                className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                Liability for Links
            </span>
            <p>
                My website includes links to external third-party websites. I do not
                have influence over the contents of those websites; therefore, I cannot
                guarantee their contents. Providers or administrators of linked
                websites are always responsible for their own contents.
            </p>
        </div>
    );
}
