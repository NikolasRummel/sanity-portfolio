"use client"

import {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion, useReducedMotion} from "framer-motion"
import {AlertTriangle, RotateCcw, Send, Zap} from "lucide-react"
import ClassifyResult from "@/components/radar/ClassifyResult"
import {formatNumber, radar, topics} from "@/lib/radar"
import {useClassifier} from "@/lib/radar-client"
import {cn} from "@/lib/utils"

const MAX_CHARS = 600

/** Beispiele mit persönlichen Daten, damit die Anonymisierung sichtbar wird. Die Zuordnung macht die API. */
const SAMPLES = [
    {label: "Paket verspätet", text: "Mein Paket mit dem Fahrradhelm ist seit einer Woche unterwegs. Erreichbar unter anna.keller@example.de."},
    {label: "Doppelt abgebucht", text: "Die Abbuchung von 89 Euro kam zweimal an, IBAN DE89 3704 0044 0532 0130 00. Bitte prüfen."},
    {label: "Werkstatt-Termin", text: "Habt ihr am Mittwoch einen Werkstatttermin frei? Tel. 0721 5551234."},
]

const BURST = 32

const sectionLabel = "text-xs font-semibold uppercase tracking-wider text-(--color-muted)"

const stats = topics.map((t) => {
    const sigma = Math.max(t.std, radar.meta.sigmaFloor)
    return {id: t.id, title: t.title, mean: t.mean, sigma, threshold: t.mean + radar.meta.zThreshold * sigma}
})
const initial = () => stats.map((s) => Math.round(s.mean * 0.8))

/** Kompakte, spielbare Version des Postfach-Radars für die Startseite. */
export default function MiniRadar() {
    const reduce = useReducedMotion()
    const [counts, setCounts] = useState<number[]>(initial)
    const [text, setText] = useState("")
    const [lastInput, setLastInput] = useState("")
    const [hit, setHit] = useState<{id: number; n: number} | null>(null)
    const {state: api, run: classify, reset: resetApi} = useClassifier()
    const [running, setRunning] = useState(false)
    const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
    const input = useRef<HTMLTextAreaElement>(null)

    useEffect(() => () => clearInterval(timer.current), [])

    const loading = api.status === "loading"
    const result = api.status === "done" ? api.result : null
    const topicId = result?.topicId ?? null

    const submit = async (raw: string) => {
        const value = raw.trim()
        if (!value || loading) return
        setLastInput(value)
        const r = await classify(value)
        if (!r) return
        if (r.topicId !== null) {
            const i = stats.findIndex((s) => s.id === r.topicId)
            setCounts((c) => c.map((n, k) => (k === i ? n + 1 : n)))
            setHit((h) => ({id: r.topicId as number, n: (h?.n ?? 0) + 1}))
        }
        setText("")
    }

    /** Beispiel in das Textfeld übernehmen (nicht senden), damit man es noch anpassen kann. */
    const fill = (value: string) => {
        setText(value)
        requestAnimationFrame(() => {
            const el = input.current
            if (!el) return
            el.focus()
            el.setSelectionRange(value.length, value.length)
        })
    }

    const burst = () => {
        if (topicId === null || running) return
        const i = stats.findIndex((s) => s.id === topicId)
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
        setRunning(false); setCounts(initial()); setText(""); setHit(null); resetApi()
    }

    const alarms = stats
        .map((s, i) => ({...s, count: counts[i], z: (counts[i] - s.mean) / s.sigma}))
        .filter((s) => s.count > s.threshold)
        .sort((a, b) => b.z - a.z)
    const matched = topicId !== null ? stats.find((s) => s.id === topicId) : null
    const spring = reduce ? {duration: 0} : {type: "spring" as const, stiffness: 140, damping: 20}

    return (
        <div className="demo-card p-6 sm:p-8" lang="de">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
                {/* Linke Spalte: Anfrage eingeben und Ergebnis ansehen */}
                <div className="grid content-start gap-6">
                    <form onSubmit={(e) => { e.preventDefault(); void submit(text) }} className="grid gap-4">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            <label htmlFor="mini-radar-input" className={sectionLabel}>Neue Kundenanfrage</label>
                            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Beispielanfragen einfügen">
                                <span className="text-xs text-(--color-muted)">Beispiel:</span>
                                {SAMPLES.map((s) => (
                                    <button key={s.label} type="button" className="chip" aria-pressed={text === s.text} onClick={() => fill(s.text)}>{s.label}</button>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <textarea id="mini-radar-input" ref={input} value={text} rows={4} maxLength={MAX_CHARS}
                                      onChange={(e) => setText(e.target.value)}
                                      onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); void submit(text) } }}
                                      placeholder="z. B. Mein Paket ist noch nicht angekommen …"
                                      className="w-full resize-none rounded-xl border border-(--color-rule) bg-(--color-paper) p-4 pb-8 text-base leading-relaxed transition-shadow focus:border-(--color-accent) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30"/>
                            <span className={cn("pointer-events-none absolute bottom-3 right-4 text-xs tabular-nums", text.length > MAX_CHARS * 0.9 ? "text-amber-700 dark:text-amber-300" : "text-(--color-muted)")}>
                                {text.length}/{MAX_CHARS}
                            </span>
                        </div>
                        <button type="submit" disabled={!text.trim() || loading} className="btn justify-self-start" style={{minHeight: 48}}>
                            {loading ? "Wird eingeordnet …" : "Eingang simulieren"} <Send size={16} aria-hidden="true"/>
                        </button>
                    </form>

                    <div className="grid gap-3">
                        <p className={cn(sectionLabel, "mb-0")}>Ergebnis</p>
                        <ClassifyResult state={api} onRetry={() => void submit(lastInput)}/>
                    </div>
                </div>

                {/* Rechte Spalte: Auswirkung auf die Themenübersicht und Alarm */}
                <div className="grid content-start gap-5 border-t border-(--color-rule) pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                    <div className="flex items-center justify-between gap-3">
                        <p className={cn(sectionLabel, "mb-0")}>Anfragen heute nach Thema</p>
                        <button type="button" className="chip" onClick={reset}>
                            <RotateCcw size={14} aria-hidden="true" style={{display: "inline", marginRight: 6}}/>Zurücksetzen
                        </button>
                    </div>

                    <div aria-live="assertive">
                        <AnimatePresence initial={false}>
                            {alarms.length > 0 && (
                                <motion.div key="alarm" initial={reduce ? false : {opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}} exit={{opacity: 0, height: 0}}
                                            className="overflow-hidden">
                                    <p className="mb-0 flex items-start gap-3 rounded-xl bg-amber-100 p-4 text-sm font-bold leading-snug text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                                        <AlertTriangle size={18} aria-hidden="true" className="mt-0.5 shrink-0 animate-pulse"/>
                                        <span>Alarm: {alarms[0].title}. {formatNumber(alarms[0].count)} Anfragen heute, üblich sind {formatNumber(alarms[0].mean)}.</span>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <ul className="m-0 grid list-none gap-1 p-0">
                        {stats.map((s, i) => {
                            const max = Math.max(s.threshold * 1.15, counts[i])
                            const over = counts[i] > s.threshold
                            const isHit = hit?.id === s.id
                            return (
                                <li key={isHit ? `${s.id}-${hit?.n}` : s.id} className={cn("-mx-3 grid gap-2 rounded-lg px-3 py-2", isHit && "radar-hit")}>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <span className={matched?.id === s.id ? "font-bold" : ""}>{s.title}</span>
                                        <motion.span key={counts[i]} initial={reduce ? false : {scale: 1.35}} animate={{scale: 1}}
                                                     className={cn("tabular-nums", over ? "font-bold text-amber-700 dark:text-amber-300" : "text-(--color-muted)")}>
                                            {formatNumber(counts[i])}
                                        </motion.span>
                                    </div>
                                    <div className="relative h-2 rounded-full bg-(--color-paper)" role="img"
                                         aria-label={`${s.title}: ${counts[i]} Anfragen, Alarmschwelle ${Math.round(s.threshold)}`}>
                                        <motion.div className={cn("h-full rounded-full", over ? "bg-amber-500" : "bg-(--color-accent)")}
                                                    initial={false} animate={{width: `${(counts[i] / max) * 100}%`}} transition={spring}/>
                                        <span className="absolute -top-0.5 h-3 w-0.5 bg-(--color-ink)" style={{left: `${(s.threshold / max) * 100}%`}} aria-hidden="true"/>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="grid gap-3 border-t border-(--color-rule) pt-5">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <button type="button" className="btn btn--clear" onClick={burst} disabled={topicId === null || running} style={{minHeight: 48}}>
                                Ansturm simulieren <Zap size={16} aria-hidden="true"/>
                            </button>
                            {topicId === null && (
                                <p className="mb-0 max-w-[26ch] text-xs leading-snug text-(--color-muted)">Erst eine Anfrage einordnen, dann geht der Ansturm auf dieses Thema.</p>
                            )}
                        </div>
                        <p className="mb-0 text-xs leading-relaxed text-(--color-muted)">
                            Der Strich markiert die Alarmschwelle (üblicher Wert plus {radar.meta.zThreshold} Standardabweichungen). Kennzahlen aus den Beispieldaten des Radars.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
