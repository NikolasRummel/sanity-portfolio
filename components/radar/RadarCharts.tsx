"use client"

import {
    CartesianGrid, ComposedChart, Line, ReferenceArea, ReferenceLine, ResponsiveContainer,
    Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis,
} from "recharts"
import {formatDay, formatNumber, radar, type RadarCluster, type Spike} from "@/lib/radar"

const axis = {stroke: "var(--r-text)", fontSize: 12, tickLine: false, axisLine: {stroke: "var(--r-grid)"}} as const

/** Raute als Alarm-Markierung: Form + Beschriftung, nie nur Farbe. */
function Diamond({cx, cy, payload}: {cx?: number; cy?: number; payload?: { label?: boolean }}) {
    if (cx == null || cy == null) return null
    return (
        <g>
            <path d={`M${cx} ${cy - 9} L${cx + 9} ${cy} L${cx} ${cy + 9} L${cx - 9} ${cy} Z`}
                  fill="var(--r-alert)" stroke="var(--r-surface)" strokeWidth={2}/>
            {payload?.label && (
                <text x={cx} y={cy - 15} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--r-alert)">Alarm</text>
            )}
        </g>
    )
}

export function TrendChart({cluster, spikes, threshold}: { cluster: RadarCluster; spikes: Spike[]; threshold: number }) {
    const {days, meta} = radar
    const sigma = Math.max(cluster.std, meta.sigmaFloor)
    const limit = cluster.mean + threshold * sigma
    // Numerische x-Achse (Tagesindex): so sitzen Referenzflächen und Marker exakt auf dem Tag
    const data = days.map((day, i) => ({i, day, count: cluster.daily[i]}))
    const last = days.length - 1
    const trainIdx = days.indexOf(meta.trainEnd)
    const ticks = Array.from({length: Math.floor(last / 14) + 1}, (_, k) => k * 14)
    // Beschriftung nur am stärksten Alarm, sonst überlappen Labels an aufeinanderfolgenden Tagen
    const strongest = spikes.reduce((m, s) => (s.z > (m?.z ?? -1) ? s : m), undefined as Spike | undefined)
    const marks = spikes.map((s) => ({i: s.dayIndex, day: s.day, count: s.count, label: s === strongest}))
    const top = Math.max(limit, ...cluster.daily) * 1.12

    return (
        <>
        <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={data} margin={{top: 24, right: 12, bottom: 0, left: -12}}>
                <CartesianGrid stroke="var(--r-grid)" vertical={false}/>
                <XAxis dataKey="i" type="number" domain={[0, last]} ticks={ticks} {...axis} tickFormatter={(i) => formatDay(days[i])}/>
                <YAxis {...axis} domain={[0, Math.ceil(top)]} allowDecimals={false} width={44}/>
                {/* Lernphase: hier entstehen die Normalwerte, es gibt keine Alarme */}
                <ReferenceArea x1={0} x2={trainIdx} fill="var(--r-muted)" fillOpacity={0.12}
                               label={{value: "Lernphase: Normalwerte", position: "insideTopLeft", fill: "var(--r-text)", fontSize: 12}}/>
                {/* Überwachung: Normalbereich bis zur Alarmschwelle */}
                <ReferenceArea x1={trainIdx} x2={last} y1={0} y2={limit} fill="var(--r-accent)" fillOpacity={0.1}/>
                <ReferenceLine segment={[{x: trainIdx, y: limit}, {x: last, y: limit}]} stroke="var(--r-alert)" strokeDasharray="5 4"/>
                <Tooltip
                    cursor={{stroke: "var(--r-muted)"}}
                    contentStyle={{background: "var(--r-surface)", border: "1px solid var(--r-grid)", borderRadius: 12, color: "var(--r-ink)"}}
                    labelFormatter={(i) => formatDay(days[Number(i)])}
                    formatter={(v) => [formatNumber(Number(v)), "Anfragen"]}
                />
                <Line type="linear" dataKey="count" stroke="var(--r-accent)" strokeWidth={2} dot={false}
                      activeDot={{r: 4}} isAnimationActive={false}/>
                {/* Ohne Alarme gar nicht rendern: ein leerer Scatter würde sonst alle Datenpunkte markieren */}
                {marks.length > 0 && <Scatter data={marks} dataKey="count" shape={<Diamond/>} isAnimationActive={false} legendType="none"/>}
            </ComposedChart>
        </ResponsiveContainer>
        <ul className="mb-0 mt-2 flex list-none flex-wrap justify-center gap-x-6 gap-y-1 p-0 text-sm" style={{color: "var(--r-text)"}}>
            <li className="flex items-center gap-2"><span aria-hidden="true" className="h-0.5 w-5" style={{background: "var(--r-accent)"}}/>Anfragen pro Tag</li>
            <li className="flex items-center gap-2"><span aria-hidden="true" className="w-5 border-t-2 border-dashed" style={{borderColor: "var(--r-alert)"}}/>Alarmschwelle</li>
            <li className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 rotate-45" style={{background: "var(--r-alert)"}}/>Alarm</li>
        </ul>
        </>
    )
}

type Pt = { x: number; y: number; id: number; title: string }

export function MapChart({selectedId, titles}: { selectedId: number; titles: Map<number, string> }) {
    const all: Pt[] = radar.points.map(([x, y, id]) => ({x, y, id, title: titles.get(id) ?? "Noch nicht zugeordnet"}))
    const others = all.filter((p) => p.id !== selectedId)
    const picked = all.filter((p) => p.id === selectedId)
    return (
        <ResponsiveContainer width="100%" height={380}>
            <ScatterChart margin={{top: 8, right: 8, bottom: 8, left: 8}}>
                <XAxis type="number" dataKey="x" hide domain={["dataMin - 1", "dataMax + 1"]}/>
                <YAxis type="number" dataKey="y" hide domain={["dataMin - 1", "dataMax + 1"]}/>
                <ZAxis range={[26, 26]}/>
                <Tooltip
                    cursor={false}
                    content={({payload}) => {
                        const p = payload?.[0]?.payload as Pt | undefined
                        return p ? (
                            <div className="rounded-xl border px-3 py-2 text-sm shadow-md"
                                 style={{background: "var(--r-surface)", borderColor: "var(--r-grid)", color: "var(--r-ink)"}}>
                                {p.title}
                            </div>
                        ) : null
                    }}
                />
                <Scatter data={others} fill="var(--r-muted)" fillOpacity={0.35} isAnimationActive={false}/>
                <Scatter data={picked} fill="var(--r-accent)" fillOpacity={0.9} isAnimationActive={false}/>
            </ScatterChart>
        </ResponsiveContainer>
    )
}
