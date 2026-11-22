"use client"

import {type ReactNode, useEffect, useRef, useState} from "react"
import {useReducedMotion} from "framer-motion"

export type PinnedItem = {
    id: string
    name: string
    tab: string
    result: string
    duration: string
    price: string
    demo?: {title: string; text: string; label: string; href: string}
    visual: ReactNode
}

/**
 * Links hält die Demo des gerade sichtbaren Pakets, rechts scrollen die Pakete vorbei.
 * Unter 60rem gibt es keine feste Spalte: jedes Paket trägt seine Demo selbst.
 */
export default function PinnedPackages({items, intro}: {items: PinnedItem[]; intro: string}) {
    const [active, setActive] = useState(0)
    const reduce = useReducedMotion()
    const panels = useRef<(HTMLElement | null)[]>([])

    useEffect(() => {
        const nodes = panels.current.filter(Boolean) as HTMLElement[]
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) setActive(nodes.indexOf(e.target as HTMLElement))
                }
            },
            {rootMargin: "-45% 0px -45% 0px"},
        )
        nodes.forEach((n) => io.observe(n))
        return () => io.disconnect()
    }, [])

    const go = (i: number) => panels.current[i]?.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "center"})

    return (
        <div className="pin">
            <div className="pin__stage">
                <div role="group" aria-label="Demo wechseln" className="pin__tabs">
                    {items.map((it, i) => (
                        <button key={it.id} type="button" className="pin__tab" aria-current={active === i} onClick={() => go(i)}>
                            {it.tab}
                        </button>
                    ))}
                </div>
                <div className="pin__stage-art">
                    <div key={active} className="pin__view">{items[active].visual}</div>
                    <p className="small" style={{marginTop: "var(--space-lg)"}}>{intro}</p>
                </div>
            </div>
            <div className="pin__panels">
                {items.map((it, i) => (
                    <article key={it.id} ref={(el) => {panels.current[i] = el}} className="pin__panel" aria-labelledby={`pk-${it.id}`}>
                        <h3 id={`pk-${it.id}`}>{it.name}</h3>
                        <p className="pin__result">{it.result}</p>
                        {it.demo && (
                            <div className="pin__demo-note">
                                <strong>{it.demo.title}</strong>
                                <p>{it.demo.text}</p>
                            </div>
                        )}
                        <div className="pin__visual">{it.visual}</div>
                        <dl className="pin__facts">
                            <div><dt>Dauer</dt><dd>{it.duration}</dd></div>
                            <div><dt>Preis</dt><dd className="pin__price">{it.price}</dd></div>
                        </dl>
                        {it.demo && <a className="link" href={it.demo.href}>{it.demo.label}</a>}
                    </article>
                ))}
            </div>
        </div>
    )
}
