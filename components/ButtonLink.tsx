import React from "react";

export default function ButtonLink({text, href}: any) {
    return (
        <a
            href={href}
            className={`group inline-flex items-center rounded-full px-6 py-2.5 font-semibold text-white dark:text-black bg-black/30 dark:bg-white/80 no-underline hover:text-white`}
        >
            {text}
            <svg
                className={`mt-0.5 ml-2 -mr-1 stroke-2 stroke-white dark:stroke-black`}
                fill="none"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
            >
                <path
                    className="transition opacity-0 group-hover:opacity-100"
                    d="M0 5h7"
                ></path>
                <path
                    className="transition group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                ></path>
            </svg>
        </a>
    );
}