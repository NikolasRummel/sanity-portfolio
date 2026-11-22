import React from "react";

export default function ButtonLink({text, href}: any) {
    return (
        <a href={href} className="btn btn--clear" style={{justifySelf: "start"}}>
            {text}
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M1 1l4 4-4 4"/>
            </svg>
        </a>
    );
}
