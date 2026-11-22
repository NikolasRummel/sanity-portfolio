"use client"

import {useCallback, useState} from "react"
import {topics} from "@/lib/radar"

export type Classification = {original: string; anonymized: string; title: string; probability: number; topicId: number | null}
export type ClassifierState = {status: "idle"} | {status: "loading"} | {status: "done"; result: Classification} | {status: "error"; message: string}

const MESSAGES: Record<string, string> = {
    starting: "Die Demo-API startet gerade (Modell wird geladen). Bitte in einer Minute noch einmal versuchen.",
    rate_limited: "Zu viele Anfragen in kurzer Zeit. Bitte kurz warten.",
    too_long: "Die Nachricht ist zu lang (maximal 600 Zeichen).",
}

/** Ordnet einen Text über die echte Pipeline ein (Anonymisierung, Embedding, Cluster-Zuordnung). */
export async function classifyText(text: string): Promise<Classification> {
    const res = await fetch("/api/radar/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text}),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(MESSAGES[data?.error] ?? "Die Demo-API ist gerade nicht erreichbar.")
    const topic = data.noise ? undefined : topics.find((t) => t.title === data.title)
    return {original: text, anonymized: data.anonymized, title: data.title, probability: data.probability, topicId: topic?.id ?? null}
}

export function useClassifier() {
    const [state, setState] = useState<ClassifierState>({status: "idle"})
    const run = useCallback(async (text: string) => {
        setState({status: "loading"})
        try {
            const result = await classifyText(text)
            setState({status: "done", result})
            return result
        } catch (e) {
            setState({status: "error", message: e instanceof Error ? e.message : "Unbekannter Fehler"})
            return null
        }
    }, [])
    const reset = useCallback(() => setState({status: "idle"}), [])
    return {state, run, reset}
}
