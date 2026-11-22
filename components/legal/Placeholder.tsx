/** Deutlich sichtbarer Platzhalter für rechtliche Angaben, die noch nachgetragen werden müssen. */
export default function Placeholder({children}: {children: React.ReactNode}) {
    return (
        <mark className="rounded bg-yellow-200 px-1 font-semibold text-black">
            [PLATZHALTER: {children}]
        </mark>
    )
}
