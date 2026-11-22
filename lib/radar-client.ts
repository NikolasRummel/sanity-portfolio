"use client"

import {useCallback, useRef, useState} from "react"
import {topics} from "@/lib/radar"

export type Classification = {original: string; anonymized: string; title: string; probability: number; topicId: number | null}
export type ClassifierState = {status: "idle"} | {status: "loading"} | {status: "done"; result: Classification} | {status: "error"; message: string}

const MESSAGES: Record<string, string> = {
    starting: "Die Demo-API startet gerade (Modell wird geladen). Bitte in einer Minute noch einmal versuchen.",
    rate_limited: "Zu viele Anfragen in kurzer Zeit. Bitte kurz warten.",
    too_long: "Die Nachricht ist zu lang (maximal 600 Zeichen).",
}

/** Mindestdauer der Anzeige "wird verarbeitet", damit die drei Schritte lesbar bleiben (die API antwortet meist schneller). */
const MIN_PROCESSING_MS = 2000
/** Abstand zwischen den einzelnen Ergebnisblöcken beim Einblenden, in Sekunden. */
export const REVEAL_STEP = 0.5

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Ordnet einen Text über die echte Pipeline ein (Anonymisierung, Embedding, Cluster-Zuordnung). */
export async function classifyText(text: string): Promise<Classification> {
    const started = Date.now()
    const res = await fetch("/api/radar/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text}),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(MESSAGES[data?.error] ?? "Die Demo-API ist gerade nicht erreichbar.")
    const remaining = (prefersReducedMotion() ? 0 : MIN_PROCESSING_MS) - (Date.now() - started)
    if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining))
    const topic = data.noise ? undefined : topics.find((t) => t.title === data.title)
    return {original: text, anonymized: data.anonymized, title: data.title, probability: data.probability, topicId: topic?.id ?? null}
}

export function useClassifier() {
    const [state, setState] = useState<ClassifierState>({status: "idle"})
    const epoch = useRef(0)
    const run = useCallback(async (text: string) => {
        const mine = ++epoch.current
        setState({status: "loading"})
        try {
            const result = await classifyText(text)
            if (mine !== epoch.current) return null // zwischenzeitlich zurückgesetzt oder neu gestartet
            setState({status: "done", result})
            return result
        } catch (e) {
            if (mine !== epoch.current) return null
            setState({status: "error", message: e instanceof Error ? e.message : "Unbekannter Fehler"})
            return null
        }
    }, [])
    const reset = useCallback(() => { epoch.current++; setState({status: "idle"}) }, [])
    return {state, run, reset}
}
