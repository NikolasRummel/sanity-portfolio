"use client"

import {useMemo, useState, type KeyboardEvent} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {AlertTriangle, BarChart3, Layers, ScanSearch, TrendingUp} from "lucide-react"
import {MapChart, TrendChart} from "@/components/radar/RadarCharts"
import {cn} from "@/lib/utils"
import {findSpikes, formatDay, formatNumber, radar, shortTitle, topics} from "@/lib/radar"

const TABS = [
    {id: "overview", label: "Übersicht", icon: BarChart3},
    {id: "trend", label: "Verlauf", icon: TrendingUp},
    {id: "map", label: "Themenkarte", icon: Layers},
    {id: "classify", label: "Einordnen", icon: ScanSearch},
] as const
type TabId = (typeof TABS)[number]["id"]

/** Chart-Farben als Variablen, damit Light/Dark ohne JS-Wechsel funktionieren. */
const THEME_VARS =
    "[--r-surface:#ffffff] [--r-ink:#18181b] [--r-text:#52525b] [--r-grid:#e4e4e7] [--r-muted:#a1a1aa] [--r-accent:#0f766e] [--r-alert:#b45309] " +
    "dark:[--r-surface:#09090b] dark:[--r-ink:#fafafa] dark:[--r-text:#a1a1aa] dark:[--r-grid:#27272a] dark:[--r-muted:#71717a] dark:[--r-accent:#5eead4] dark:[--r-alert:#fbbf24]"

const card = "rounded-2xl border border-gray-200 dark:border-gray-800"

export default function RadarDemo() {
    const [tab, setTab] = useState<TabId>("overview")
    const [threshold, setThreshold] = useState(radar.meta.zThreshold)
    const spikes = useMemo(() => findSpikes(threshold), [threshold])
    const [clusterId, setClusterId] = useState(() => findSpikes(radar.meta.zThreshold)[0]?.clusterId ?? topics[0].id)
    const cluster = topics.find((c) => c.id === clusterId) ?? topics[0]

    const open = (id: number) => {
        setClusterId(id)
        setTab("trend")
    }

    const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
        const i = TABS.findIndex((t) => t.id === tab)
        const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null
        if (next == null) return
        e.preventDefault()
        const t = TABS[(next + TABS.length) % TABS.length]
        setTab(t.id)
        document.getElementById(`radar-tab-${t.id}`)?.focus()
    }

    return (
        <div className={cn("overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-teal-900/5 dark:border-gray-800 dark:bg-zinc-950", THEME_VARS)}>
            {/* Fensterleiste */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 bg-zinc-50 px-4 py-3 dark:border-gray-800 dark:bg-zinc-900/60">
                <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700"/>
                    <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700"/>
                    <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700"/>
                </div>
                <div role="tablist" aria-label="Ansicht wählen" className="-mb-px flex flex-1 gap-1 overflow-x-auto">
                    {TABS.map(({id, label, icon: Icon}) => (
                        <button
                            key={id} id={`radar-tab-${id}`} role="tab" aria-selected={tab === id}
                            aria-controls="radar-panel" tabIndex={tab === id ? 0 : -1}
                            onClick={() => setTab(id)} onKeyDown={onTabKey}
                            className={cn(
                                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700",
                                tab === id ? "bg-white text-teal-800 shadow-sm dark:bg-zinc-800 dark:text-teal-300" : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                            )}
                        >
                            <Icon size={16} aria-hidden="true"/>{label}
                        </button>
                    ))}
                </div>
            </div>

            <div id="radar-panel" role="tabpanel" aria-labelledby={`radar-tab-${tab}`} className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 0.18}}>
                        {tab === "overview" && <Overview spikes={spikes} onOpen={open}/>}
                        {tab === "trend" && <Trend clusterId={cluster.id} onSelect={setClusterId} threshold={threshold} onThreshold={setThreshold}/>}
                        {tab === "map" && <MapView clusterId={cluster.id} onSelect={setClusterId}/>}
                        {tab === "classify" && <Classify/>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ gemeinsame Bausteine */

function TopicChips({selected, onSelect, alerts}: { selected: number; onSelect: (id: number) => void; alerts?: Set<number> }) {
    return (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Thema wählen">
            {topics.map((t) => (
                <button
                    key={t.id} onClick={() => onSelect(t.id)} aria-pressed={selected === t.id} title={t.title}
                    className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700",
                        selected === t.id
                            ? "border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-zinc-900"
                            : "border-gray-300 text-gray-700 hover:border-teal-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-teal-300",
                    )}
                >
                    {shortTitle(t.title)}
                    {alerts?.has(t.id) && <AlertTriangle size={13} aria-label="Alarm in diesem Thema"/>}
                </button>
            ))}
        </div>
    )
}

function ThresholdSlider({value, onChange}: { value: number; onChange: (v: number) => void }) {
    return (
        <label className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Empfindlichkeit</span>
            <input type="range" min={2} max={6} step={0.5} value={value} onChange={(e) => onChange(Number(e.target.value))}
                   className="w-48 accent-teal-700" aria-valuetext={`Alarm ab ${formatNumber(value, 1)} Standardabweichungen`}/>
            <span>Alarm ab {formatNumber(value, 1)} Standardabweichungen über dem Normalwert
                <span className="text-gray-500"> (niedriger = mehr Alarme)</span></span>
        </label>
    )
}

function Placeholders({text}: { text: string }) {
    return (
        <>
            {text.split(/(\[[A-Z_]+\])/).map((part, i) =>
                /^\[[A-Z_]+\]$/.test(part)
                    ? <span key={i} className="mx-0.5 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs font-bold text-teal-900 dark:bg-teal-900/50 dark:text-teal-200">{part}</span>
                    : <span key={i}>{part}</span>,
            )}
        </>
    )
}

/* ------------------------------------------------------------------ Tabs */

function Overview({spikes, onOpen}: { spikes: ReturnType<typeof findSpikes>; onOpen: (id: number) => void }) {
    const byId = new Map(topics.map((t) => [t.id, t]))
    const kpis = [
        {label: "Anfragen", value: formatNumber(radar.meta.nMessages)},
        {label: "Erkannte Themen", value: String(radar.meta.nClusters)},
        {label: "Alarme im Zeitraum", value: String(spikes.length)},
        {label: "Nicht zugeordnet", value: `${formatNumber(radar.meta.noiseShare * 100, 1)} %`},
    ]
    const max = Math.max(...topics.map((t) => t.size))
    return (
        <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {kpis.map((k) => (
                    <div key={k.label} className={cn(card, "p-4")}>
                        <dt className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">{k.label}</dt>
                        <dd className="mt-1 text-3xl font-extrabold tracking-tight">{k.value}</dd>
                    </div>
                ))}
            </dl>
            <div className="grid gap-6 lg:grid-cols-5">
                <section className="lg:col-span-2" aria-labelledby="alarme">
                    <h3 id="alarme" className="mb-3 text-base font-bold">Aktuelle Alarme</h3>
                    {spikes.length === 0 && <p className="mb-0 text-sm text-gray-600 dark:text-gray-400">Bei dieser Empfindlichkeit gibt es keine Alarme. Stellt sie im Tab „Verlauf“ niedriger.</p>}
                    <ul className="space-y-2">
                        {spikes.slice(0, 6).map((s) => (
                            <li key={`${s.clusterId}-${s.day}`}>
                                <button onClick={() => onOpen(s.clusterId)}
                                        className={cn(card, "w-full p-3 text-left transition-colors hover:border-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700")}>
                                    <span className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-300">
                                        <AlertTriangle size={15} aria-hidden="true"/>{formatDay(s.day)}
                                    </span>
                                    <span className="mt-1 block text-sm font-semibold">{byId.get(s.clusterId)?.title}</span>
                                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                                        {formatNumber(s.count)} Anfragen statt üblich {formatNumber(s.mean)} ({formatNumber(s.count / s.mean, 1)}×)
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="lg:col-span-3" aria-labelledby="themen">
                    <h3 id="themen" className="mb-3 text-base font-bold">Erkannte Themen</h3>
                    <ul className="space-y-2">
                        {[...topics].sort((a, b) => b.size - a.size).map((t) => (
                            <li key={t.id}>
                                <button onClick={() => onOpen(t.id)}
                                        className={cn(card, "w-full p-3 text-left transition-colors hover:border-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700")}>
                                    <span className="flex items-baseline justify-between gap-3">
                                        <span className="text-sm font-semibold">{t.title}</span>
                                        <span className="shrink-0 text-sm tabular-nums text-gray-600 dark:text-gray-400">{formatNumber(t.size)}</span>
                                    </span>
                                    <span className="mt-1.5 block h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                                        <span className="block h-1.5 rounded-full bg-teal-700 dark:bg-teal-300" style={{width: `${(t.size / max) * 100}%`}}/>
                                    </span>
                                    <span className="mt-1.5 block text-sm text-gray-600 dark:text-gray-400">{t.description}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

function Trend({clusterId, onSelect, threshold, onThreshold}: {
    clusterId: number; onSelect: (id: number) => void; threshold: number; onThreshold: (v: number) => void
}) {
    const cluster = topics.find((t) => t.id === clusterId) ?? topics[0]
    const all = useMemo(() => findSpikes(threshold), [threshold])
    const mine = all.filter((s) => s.clusterId === cluster.id)
    const alerts = new Set(all.map((s) => s.clusterId))
    return (
        <div className="space-y-5">
            <TopicChips selected={cluster.id} onSelect={onSelect} alerts={alerts}/>
            <div>
                <h3 className="mb-1 text-lg font-bold">{cluster.title}</h3>
                <p className="mb-0 text-sm text-gray-600 dark:text-gray-400">{cluster.description}</p>
            </div>
            <div className={cn(card, "p-2 sm:p-4")}>
                <TrendChart cluster={cluster} spikes={mine} threshold={threshold}/>
            </div>
            <ThresholdSlider value={threshold} onChange={onThreshold}/>
            <p className="mb-0 text-sm text-gray-700 dark:text-gray-300" aria-live="polite">
                {mine.length === 0
                    ? "In diesem Thema gibt es bei dieser Empfindlichkeit keinen Alarm."
                    : `${mine.length} Alarm${mine.length > 1 ? "e" : ""}: ${mine.map((s) => `${formatDay(s.day)} (${formatNumber(s.count)} Anfragen, normal ${formatNumber(s.mean)})`).join(", ")}.`}
            </p>
        </div>
    )
}

function MapView({clusterId, onSelect}: { clusterId: number; onSelect: (id: number) => void }) {
    const titles = useMemo(() => new Map(radar.clusters.map((c) => [c.id, c.title])), [])
    const cluster = topics.find((t) => t.id === clusterId) ?? topics[0]
    return (
        <div className="space-y-5">
            <p className="mb-0 text-sm text-gray-700 dark:text-gray-300">
                Jeder Punkt ist eine Kundenanfrage. Anfragen mit ähnlicher Bedeutung liegen nah beieinander. Wählt ein Thema, um seine Anfragen hervorzuheben.
            </p>
            <TopicChips selected={cluster.id} onSelect={onSelect}/>
            <div className={cn(card, "p-2 sm:p-4")}>
                <MapChart selectedId={cluster.id} titles={titles}/>
            </div>
            <div className={cn(card, "p-4")}>
                <h3 className="mb-1 text-base font-bold">{cluster.title}</h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{cluster.description}</p>
                <p className="mb-0 text-sm italic text-gray-700 dark:text-gray-300">Beispiel: „<Placeholders text={cluster.example}/>“</p>
            </div>
        </div>
    )
}

function Classify() {
    const [index, setIndex] = useState(0)
    const probe = radar.probes[index]
    const unsure = probe.probability < 0.6
    return (
        <div className="space-y-5">
            <p className="mb-0 text-sm text-gray-700 dark:text-gray-300">
                Wählt eine Beispiel-Anfrage. Der Radar entfernt persönliche Angaben und ordnet sie einem Thema zu, so wie jede neue Nachricht im Postfach.
            </p>
            <div className="grid gap-5 lg:grid-cols-2">
                <ul className="space-y-2" aria-label="Beispiel-Anfragen">
                    {radar.probes.map((p, i) => (
                        <li key={p.text}>
                            <button onClick={() => setIndex(i)} aria-pressed={i === index}
                                    className={cn(
                                        "w-full rounded-xl border p-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700",
                                        i === index ? "border-teal-700 bg-teal-50 dark:border-teal-300 dark:bg-teal-950/40" : "border-gray-200 hover:border-teal-700 dark:border-gray-800 dark:hover:border-teal-300",
                                    )}>
                                {p.text}
                            </button>
                        </li>
                    ))}
                </ul>
                <AnimatePresence mode="wait">
                    <motion.div key={index} initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 0.18}}
                                className={cn(card, "space-y-4 p-5 lg:sticky lg:top-24 lg:self-start")} aria-live="polite">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">1. Anonymisiert</p>
                            <p className="mb-0 text-sm leading-relaxed text-gray-800 dark:text-gray-200"><Placeholders text={probe.anonymized}/></p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">2. Thema</p>
                            <p className="mb-0 text-xl font-bold text-teal-800 dark:text-teal-300">{probe.title}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">3. Sicherheit</p>
                            <div className="flex items-center gap-3">
                                <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-800" role="img" aria-label={`Sicherheit ${Math.round(probe.probability * 100)} Prozent`}>
                                    <div className="h-2 rounded-full bg-teal-700 dark:bg-teal-300" style={{width: `${probe.probability * 100}%`}}/>
                                </div>
                                <span className="text-sm font-bold tabular-nums">{Math.round(probe.probability * 100)} %</span>
                            </div>
                            {unsure && (
                                <p className="mb-0 mt-2 flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                                    <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true"/>
                                    Eher unsicher: Die Nachricht passt zu mehreren Themen. Der Radar würde sie zur Kontrolle markieren.
                                </p>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
