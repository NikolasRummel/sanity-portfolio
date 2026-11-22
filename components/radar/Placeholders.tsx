/** Hebt Platzhalter wie [EMAIL] oder [PERSON] im anonymisierten Text als kleine Marken hervor. */
export default function Placeholders({text}: { text: string }) {
    return (
        <>
            {text.split(/(\[[A-Z_]+\])/).map((part, i) =>
                /^\[[A-Z_]+\]$/.test(part)
                    ? <span key={i} className="mx-0.5 rounded-md bg-(--color-accent-soft) px-1.5 py-0.5 text-xs font-bold text-(--color-ink)">{part}</span>
                    : <span key={i}>{part}</span>,
            )}
        </>
    )
}
