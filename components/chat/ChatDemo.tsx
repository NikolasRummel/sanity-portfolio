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
                <span key={i} className="h-2 w-2 rounded-full bg-zinc-400 motion-safe:animate-bounce dark:bg-zinc-500"
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
        <div ref={ref} className={cn("overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-teal-900/10 dark:border-gray-800 dark:bg-zinc-950", className)}>
            <div className="flex items-center gap-3 border-b border-gray-200 bg-zinc-50 px-4 py-3 dark:border-gray-800 dark:bg-zinc-900/60">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-white"><Bot size={18} aria-hidden="true"/></span>
                <div className="min-w-0 flex-1">
                    <p className="mb-0 truncate text-sm font-bold leading-tight">{scenario.title}</p>
                    <p className="mb-0 flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"/>{scenario.subtitle}
                    </p>
                </div>
                {!reduce && (
                    <button type="button" onClick={() => setRun((r) => r + 1)} aria-label="Demo neu abspielen"
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-zinc-200 dark:text-gray-400 dark:hover:bg-zinc-800">
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
                                m.from === "user" ? "rounded-br-md bg-teal-700 text-white" : "rounded-bl-md bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100")}>
                                {m.text}
                            </p>
                            {m.source && (
                                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-teal-700/30 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-900 dark:bg-teal-950/40 dark:text-teal-200">
                                    <FileText size={12} aria-hidden="true"/>Quelle: {m.source}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {typing && (
                    <div className={cn("rounded-2xl px-3", typing === "user" ? "self-end rounded-br-md bg-teal-700/15" : "self-start rounded-bl-md bg-zinc-100 dark:bg-zinc-800")}>
                        <Dots/>
                    </div>
                )}
            </div>
        </div>
    )
}
