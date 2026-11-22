"use client"

import {useEffect, useRef, useState, useSyncExternalStore} from "react"
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion"
import {Bot, FileText, RotateCcw} from "lucide-react"
import {cn} from "@/lib/utils"

export type ChatMessage = {from: "bot" | "user"; text: string; source?: string}
export type ChatScenario = {title: string; subtitle: string; messages: readonly ChatMessage[]}

/** Tipp-Dauer je Nachricht in ms, abhängig von der Länge (begrenzt). */
const typingMs = (m: ChatMessage) => Math.min(2200, 700 + m.text.length * 22)

function Dots() {
    return (
        <span className="inline-flex items-center gap-1 px-1 py-1.5" aria-label="schreibt gerade">
            {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-(--color-muted) motion-safe:animate-bounce"
                      style={{animationDelay: `${i * 150}ms`}}/>
            ))}
        </span>
    )
}

/**
 * Animierte Chat-Demo: Bot und Person schreiben abwechselnd (mit "..."-Anzeige).
 * Startet erst im Sichtfeld, läuft in Schleife, zeigt bei reduzierter Bewegung alles statisch.
 */
export default function ChatDemo({scenario, className, minHeight = "h-[26rem]"}: {scenario: ChatScenario; className?: string; minHeight?: string}) {
    const prefersReduced = useReducedMotion()
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
    // erst nach dem Mounten auswerten, sonst weicht das Client-HTML vom Server-HTML ab
    const reduce = mounted && !!prefersReduced
    const ref = useRef<HTMLDivElement>(null)
    const scroller = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, {amount: 0.4})
    const [shown, setShown] = useState(0)
    const [typing, setTyping] = useState<ChatMessage["from"] | null>(null)
    const [run, setRun] = useState(0)
    const msgs = scenario.messages
    const visible = reduce ? msgs.length : shown

    useEffect(() => {
        if (reduce || !inView) return
        let cancelled = false
        const timers: ReturnType<typeof setTimeout>[] = []
        const later = (fn: () => void, ms: number) => timers.push(setTimeout(() => !cancelled && fn(), ms))

        const play = (i: number) => {
            if (i >= msgs.length) {
                later(() => {setShown(0); play(0)}, 6000) // Pause, dann von vorn
                return
            }
            setTyping(msgs[i].from)
            later(() => {
                setTyping(null)
                setShown(i + 1)
                later(() => play(i + 1), 1100)
            }, typingMs(msgs[i]))
        }
        later(() => {setShown(0); play(0)}, 500)
        return () => {
            cancelled = true
            timers.forEach(clearTimeout)
            setTyping(null)
        }
    }, [inView, reduce, msgs, run])

    // Nur im Chatfenster scrollen, nicht die Seite
    useEffect(() => {
        scroller.current?.scrollTo({top: scroller.current.scrollHeight, behavior: reduce ? "auto" : "smooth"})
    }, [visible, typing, reduce])

    return (
        <div ref={ref} className={cn("demo-card", className)}>
            <div className="demo-card__head flex items-center gap-3 px-4 py-3">
                <span className="demo-card__avatar flex h-9 w-9 items-center justify-center"><Bot size={18} aria-hidden="true"/></span>
                <div className="min-w-0 flex-1">
                    <p className="mb-0 truncate text-sm font-bold leading-tight">{scenario.title}</p>
                    <p className="mb-0 flex items-center gap-1.5 text-xs text-(--color-muted)">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--color-success)" aria-hidden="true"/>{scenario.subtitle}
                    </p>
                </div>
                {!reduce && (
                    <button type="button" onClick={() => setRun((r) => r + 1)} aria-label="Demo neu abspielen"
                            className="rounded-lg p-2 text-(--color-ink-2) transition-colors hover:bg-(--color-accent-soft)">
                        <RotateCcw size={16} aria-hidden="true"/>
                    </button>
                )}
            </div>

            <div ref={scroller} role="log" aria-label={`Beispielchat: ${scenario.title}`} className={cn("flex flex-col gap-3 overflow-y-auto p-4", minHeight)}>
                <AnimatePresence initial={false}>
                    {msgs.slice(0, visible).map((m, i) => (
                        <motion.div key={`${run}-${i}`} initial={reduce ? false : {opacity: 0, y: 10, scale: 0.97}} animate={{opacity: 1, y: 0, scale: 1}}
                                    transition={{duration: 0.3}} className={cn("flex max-w-[85%] flex-col", m.from === "user" ? "self-end items-end" : "self-start items-start")}>
                            <p className={cn("mb-0 rounded-2xl px-4 py-2.5 text-[0.95rem] leading-snug",
                                m.from === "user" ? "rounded-br-md bg-(--color-ink) text-(--color-paper)" : "rounded-bl-md bg-(--color-paper-2) text-(--color-ink)")}>
                                {m.text}
                            </p>
                            {m.source && (
                                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-(--color-shade) px-2.5 py-1 text-xs font-medium text-(--color-ink)">
                                    <FileText size={12} aria-hidden="true"/>Quelle: {m.source}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {typing && (
                    <div className={cn("rounded-2xl px-3", typing === "user" ? "self-end rounded-br-md bg-(--color-paper-3)" : "self-start rounded-bl-md bg-(--color-paper-2)")}>
                        <Dots/>
                    </div>
                )}
            </div>
        </div>
    )
}
