"use client"

import {useEffect, useState} from "react"
import {AnimatePresence, motion, useReducedMotion} from "framer-motion"
import {AlertTriangle, Check, RotateCcw} from "lucide-react"
import Placeholders from "@/components/radar/Placeholders"
import {cn} from "@/lib/utils"
import type {ClassifierState} from "@/lib/radar-client"

const STEPS = ["Persönliche Daten entfernen", "Text einbetten", "Thema zuordnen"]

function LoadingSteps() {
    const [step, setStep] = useState(0)
    useEffect(() => {
        const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 700)
        return () => clearInterval(id)
    }, [])
    return (
        <>
            {STEPS.map((label, i) => (
                <li key={label} className={cn("flex items-center gap-3 transition-opacity duration-300", i > step && "opacity-40")}>
                    <span className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                        i < step ? "bg-(--color-accent) text-(--color-accent-ink)" : "bg-(--color-paper-3) text-(--color-ink)",
                        i === step && "animate-pulse",
                    )}>
                        {i < step ? <Check size={14} aria-hidden="true"/> : i + 1}
                    </span>
                    <span className={i === step ? "font-bold" : ""}>{label}{i === step ? " …" : ""}</span>
                </li>
            ))}
        </>
    )
}

/** Ergebnis der Einordnung: Ladeablauf in drei Schritten, dann Vorher/Nachher, Thema und Sicherheit. */
export default function ClassifyResult({state, onRetry, className}: {
    state: ClassifierState
    onRetry?: () => void
    className?: string
}) {
    const reduce = useReducedMotion()
    const fade = reduce ? {} : {initial: {opacity: 0, y: 8}, animate: {opacity: 1, y: 0}, exit: {opacity: 0}, transition: {duration: 0.2}}

    return (
        <div className={cn("rounded-xl bg-(--color-paper) p-5 text-sm leading-relaxed", className)} aria-live="polite" style={{minHeight: 176}}>
            <AnimatePresence mode="wait" initial={false}>
                {state.status === "idle" && (
                    <motion.p key="idle" {...fade} className="mb-0 text-(--color-muted)">
                        Das Ergebnis erscheint hier: erst werden persönliche Daten entfernt, dann wird der Text eingebettet und einem Thema zugeordnet.
                    </motion.p>
                )}

                {state.status === "loading" && (
                    <motion.ol key="loading" {...fade} className="m-0 grid list-none gap-3 p-0" aria-label="Verarbeitung läuft">
                        <LoadingSteps/>
                    </motion.ol>
                )}

                {state.status === "error" && (
                    <motion.div key="error" {...fade} className="grid gap-3">
                        <p className="mb-0 flex items-start gap-2 text-amber-800 dark:text-amber-300">
                            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true"/>{state.message}
                        </p>
                        {onRetry && (
                            <button type="button" className="chip justify-self-start" onClick={onRetry}>
                                <RotateCcw size={14} aria-hidden="true" style={{display: "inline", marginRight: 6}}/>Nochmal versuchen
                            </button>
                        )}
                    </motion.div>
                )}

                {state.status === "done" && (
                    <motion.div key="done" initial="hidden" animate="show" exit={{opacity: 0}}
                                variants={{show: {transition: {staggerChildren: reduce ? 0 : 0.14}}}} className="grid gap-5">
                        {(() => {
                            const r = state.result
                            const pct = Math.round(r.probability * 100)
                            const item = {hidden: reduce ? {} : {opacity: 0, y: 8}, show: {opacity: 1, y: 0, transition: {duration: 0.25}}}
                            return (
                                <>
                                    <motion.div variants={item}>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Eingang → anonymisiert</p>
                                        <p className="mb-1 text-(--color-muted) line-through decoration-(--color-rule)">{r.original}</p>
                                        <p className="mb-0 leading-relaxed text-(--color-ink)"><Placeholders text={r.anonymized}/></p>
                                    </motion.div>
                                    <motion.div variants={item}>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Erkanntes Thema</p>
                                        <p className="mb-0 text-lg font-bold text-(--color-accent-hi)">{r.topicId === null ? "Nicht zugeordnet" : r.title}</p>
                                    </motion.div>
                                    <motion.div variants={item}>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-(--color-muted)">Sicherheit</p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-(--color-paper-3)" role="img" aria-label={`Sicherheit ${pct} Prozent`}>
                                                <motion.div className="h-2 rounded-full bg-(--color-accent)" initial={{width: 0}} animate={{width: `${pct}%`}}
                                                            transition={reduce ? {duration: 0} : {duration: 0.7, ease: "easeOut", delay: 0.2}}/>
                                            </div>
                                            <span className="font-bold tabular-nums">{pct} %</span>
                                        </div>
                                        {r.probability < 0.6 && (
                                            <p className="mb-0 mt-2 flex items-start gap-2 text-amber-800 dark:text-amber-300">
                                                <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true"/>
                                                Eher unsicher: Die Nachricht passt zu mehreren Themen. Der Radar würde sie zur Kontrolle markieren.
                                            </p>
                                        )}
                                    </motion.div>
                                </>
                            )
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
