"use client"

import {motion} from "framer-motion"
import {AlertTriangle} from "lucide-react"
import {findSpikes, formatDay, formatNumber, radar, topics} from "@/lib/radar"

/** Kleine Produktvorschau für den Hero: letzte 45 Tage des Themas mit dem stärksten Alarm. */
export default function HeroPreview() {
    const spike = findSpikes(radar.meta.zThreshold).sort((a, b) => b.z - a.z)[0]
    const topic = topics.find((t) => t.id === spike.clusterId) ?? topics[0]
    const from = Math.max(0, spike.dayIndex - 36)
    const series = topic.daily.slice(from, from + 45)
    const w = 520, h = 150, pad = 12
    const max = Math.max(...series) * 1.1
    const pts = series.map((v, i) => [pad + (i / (series.length - 1)) * (w - 2 * pad), h - pad - (v / max) * (h - 2 * pad)] as const)
    const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
    const [sx, sy] = pts[spike.dayIndex - from]

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl shadow-teal-900/10 dark:border-gray-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between gap-3">
                <p className="mb-0 text-sm font-bold">{topic.title}</p>
                <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-200">
                    <AlertTriangle size={12} aria-hidden="true"/>Alarm {formatDay(spike.day)}
                </span>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full" role="img"
                 aria-label={`Verlauf der Anfragen zu ${topic.title} mit Alarm am ${formatDay(spike.day)}`}>
                <motion.path d={path} fill="none" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"
                             className="stroke-teal-700 dark:stroke-teal-300"
                             initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 1.6, ease: "easeInOut"}}/>
                <motion.g initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5}}>
                    <circle cx={sx} cy={sy} r={14} className="fill-amber-500/30 motion-safe:animate-ping" style={{transformOrigin: `${sx}px ${sy}px`}}/>
                    <path d={`M${sx} ${sy - 8} L${sx + 8} ${sy} L${sx} ${sy + 8} L${sx - 8} ${sy} Z`} className="fill-amber-600 stroke-white dark:stroke-zinc-950" strokeWidth={2}/>
                </motion.g>
            </svg>
            <p className="mb-0 mt-3 text-sm text-gray-600 dark:text-gray-400">
                {formatNumber(spike.count)} Anfragen an einem Tag, üblich sind {formatNumber(spike.mean)}.
            </p>
        </div>
    )
}
