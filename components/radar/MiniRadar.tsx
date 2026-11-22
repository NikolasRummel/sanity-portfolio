"use client"

import {useEffect, useRef, useState} from "react"
import {AlertTriangle, RotateCcw, Send, Zap} from "lucide-react"
import {formatNumber, radar, topics} from "@/lib/radar"

/** Stichwörter je Themen-ID. Vereinfachte Zuordnung für die Mini-Demo; die echte Pipeline nutzt Embeddings. */
const KEYWORDS: Record<number, string[]> = {
    0: ["login", "einlogg", "anmeld", "passwort", "kundenkonto", "zugang", "registrier"],
    1: ["rechnung", "zahlung", "bezahl", "abbuch", "iban", "überweis", "paypal", "zweimal"],
    2: ["gutschein", "rabatt", "code", "aktion", "angebot", "newsletter", "prozent"],
    3: ["werkstatt", "termin", "reparatur", "inspektion", "wartung", "service", "platten"],
    4: ["paket", "liefer", "sendung", "versand", "unterwegs", "dhl", "tracking", "angekommen"],
    5: ["zurück", "rückgabe", "retoure", "erstatt", "widerruf", "umtausch", "rücksend"],
    6: ["passt", "kompatibel", "beratung", "empfehl", "größe", "welches", "welcher", "e-bike"],
    7: ["defekt", "kaputt", "beschädigt", "gebrochen", "mangel", "funktioniert nicht", "riss"],
}

const SAMPLES = [
    "Mein Paket mit dem Fahrradhelm ist seit einer Woche unterwegs. Erreichbar unter anna.keller@example.de.",
    "Die Abbuchung von 89 Euro kam zweimal an, IBAN DE89 3704 0044 0532 0130 00. Bitte prüfen.",
    "Habt ihr am Mittwoch einen Werkstatttermin frei? Tel. 0721 5551234.",
]

const BURST = 32

function classify(text: string): number | null {
    const t = text.toLowerCase()
    let best: number | null = null, bestScore = 0
    for (const [id, words] of Object.entries(KEYWORDS)) {
        const score = words.reduce((s, w) => s + (t.includes(w) ? 1 : 0), 0)
        if (score > bestScore) { bestScore = score; best = Number(id) }
    }
    return best
}

const anonymize = (text: string) =>
    text
        .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[EMAIL]")
        .replace(/\b[A-Z]{2}\d{2}(?:\s?\d{4}){3,6}(?:\s?\d{1,4})?\b/g, "[IBAN]")
        .replace(/(?:Tel\.?\s*)?\b0\d{2,4}[\s/-]?\d{5,9}\b/g, "[PHONE_NUMBER]")
        .replace(/#\d{4,}/g, "[ORDER_ID]")

const stats = topics.map((t) => {
    const sigma = Math.max(t.std, radar.meta.sigmaFloor)
    return {id: t.id, title: t.title, mean: t.mean, sigma, threshold: t.mean + radar.meta.zThreshold * sigma}
})
const initial = () => stats.map((s) => Math.round(s.mean * 0.8))

type Result = {anonymized: string; topic: number | null}

/** Kompakte, spielbare Version des Postfach-Radars für die Startseite. */
export default function MiniRadar() {
    const [counts, setCounts] = useState<number[]>(initial)
    const [text, setText] = useState("")
    const [result, setResult] = useState<Result | null>(null)
    const [running, setRunning] = useState(false)
    const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

    useEffect(() => () => clearInterval(timer.current), [])

    const submit = (raw: string) => {
        const value = raw.trim()
        if (!value) return
        const topic = classify(value)
        setResult({anonymized: anonymize(value), topic})
        if (topic !== null) {
            const i = stats.findIndex((s) => s.id === topic)
            setCounts((c) => c.map((n, k) => (k === i ? n + 1 : n)))
        }
        setText("")
    }

    const burst = () => {
        if (result?.topic == null || running) return
        const i = stats.findIndex((s) => s.id === result.topic)
        let added = 0
        setRunning(true)
        timer.current = setInterval(() => {
            added += 2
            setCounts((c) => c.map((n, k) => (k === i ? n + 2 : n)))
            if (added >= BURST) { clearInterval(timer.current); setRunning(false) }
        }, 70)
    }

    const reset = () => {
        clearInterval(timer.current)
        setRunning(false); setCounts(initial()); setResult(null); setText("")
    }

    const alarms = stats
        .map((s, i) => ({...s, count: counts[i], z: (counts[i] - s.mean) / s.sigma}))
        .filter((s) => s.count > s.threshold)
        .sort((a, b) => b.z - a.z)
    const matched = result?.topic != null ? stats.find((s) => s.id === result.topic) : null

    return (
        <div className="demo-card p-4 sm:p-5" lang="de">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div className="grid content-start gap-3">
                    <form onSubmit={(e) => { e.preventDefault(); submit(text) }} className="grid gap-2">
                        <label htmlFor="mini-radar-input" className="text-sm font-bold">Neue Kundenanfrage</label>
                        <textarea id="mini-radar-input" value={text} onChange={(e) => setText(e.target.value)} rows={3}
                                  placeholder="z. B. Mein Paket ist noch nicht angekommen …"
                                  className="w-full resize-none rounded-xl border border-(--color-rule) bg-(--color-paper) p-3 text-base"/>
                        <button type="submit" disabled={!text.trim()} className="btn" style={{minHeight: 44}}>
                            Eingang simulieren <Send size={16} aria-hidden="true"/>
                        </button>
                    </form>
                    <div className="flex flex-wrap gap-2" aria-label="Beispielanfragen">
                        {SAMPLES.map((s, i) => (
                            <button key={s} type="button" className="chip" onClick={() => submit(s)}>Beispiel {i + 1}</button>
                        ))}
                    </div>

                    <div aria-live="polite" className="rounded-xl bg-(--color-paper) p-3 text-sm" style={{minHeight: 92}}>
                        {result ? (
                            <>
                                <p className="mb-1 font-bold">
                                    {matched ? <>Thema erkannt: {matched.title}</> : "Kein Thema erkannt – landet in „nicht zugeordnet“"}
                                </p>
                                <p className="mb-0 text-(--color-muted)">Anonymisiert gespeichert: „{result.anonymized}“</p>
                            </>
                        ) : (
                            <p className="mb-0 text-(--color-muted)">Schreib eine Anfrage oder nimm ein Beispiel. Der Radar ordnet sie einem Thema zu und entfernt persönliche Daten.</p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn btn--clear" onClick={burst} disabled={result?.topic == null || running} style={{minHeight: 44}}>
                            Ansturm simulieren <Zap size={16} aria-hidden="true"/>
                        </button>
                        <button type="button" className="chip" onClick={reset}><RotateCcw size={14} aria-hidden="true" style={{display: "inline", marginRight: 6}}/>Zurücksetzen</button>
                    </div>
                </div>

                <div className="grid content-start gap-3">
                    <p className="mb-0 text-sm font-bold">Anfragen heute nach Thema</p>
                    <div aria-live="assertive" style={{minHeight: 56}}>
                        {alarms.length > 0 && (
                            <p className="mb-0 flex items-start gap-2 rounded-xl bg-amber-100 p-3 text-sm font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                                <AlertTriangle size={16} aria-hidden="true" style={{marginTop: 2, flexShrink: 0}}/>
                                <span>Alarm: {alarms[0].title}. {formatNumber(alarms[0].count)} Anfragen heute, üblich sind {formatNumber(alarms[0].mean)}.</span>
                            </p>
                        )}
                    </div>
                    <ul className="m-0 grid list-none gap-2 p-0">
                        {stats.map((s, i) => {
                            const max = Math.max(s.threshold * 1.15, counts[i])
                            const over = counts[i] > s.threshold
                            return (
                                <li key={s.id} className="grid gap-1">
                                    <div className="flex items-baseline justify-between gap-3 text-xs">
                                        <span className={matched?.id === s.id ? "font-bold" : ""}>{s.title}</span>
                                        <span className={over ? "font-bold text-amber-700 dark:text-amber-300" : "text-(--color-muted)"}>{formatNumber(counts[i])}</span>
                                    </div>
                                    <div className="relative h-2 rounded-full bg-(--color-paper)" role="img"
                                         aria-label={`${s.title}: ${counts[i]} Anfragen, Alarmschwelle ${Math.round(s.threshold)}`}>
                                        <div className={`h-full rounded-full transition-[width] duration-200 ${over ? "bg-amber-500" : "bg-(--color-accent)"}`}
                                             style={{width: `${(counts[i] / max) * 100}%`}}/>
                                        <span className="absolute -top-0.5 h-3 w-0.5 bg-(--color-ink)" style={{left: `${(s.threshold / max) * 100}%`}} aria-hidden="true"/>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <p className="mb-0 text-xs text-(--color-muted)">Der Strich markiert die Alarmschwelle (üblicher Wert plus {radar.meta.zThreshold} Standardabweichungen). Kennzahlen aus den Beispieldaten des Radars.</p>
                </div>
            </div>
        </div>
    )
}
