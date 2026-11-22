import raw from "@/content/demo/postfach-radar.json"

export type RadarCluster = {
    id: number
    title: string
    description: string
    size: number
    mean: number
    std: number
    example: string
    daily: number[]
}

export type RadarData = {
    meta: {
        start: string
        trainEnd: string
        end: string
        zThreshold: number
        sigmaFloor: number
        nMessages: number
        nClusters: number
        noiseShare: number
    }
    days: string[]
    clusters: RadarCluster[]
    points: [number, number, number][]
    probes: { text: string; anonymized: string; cluster: number; title: string; probability: number }[]
}

export type Spike = { clusterId: number; day: string; dayIndex: number; count: number; mean: number; z: number }

export const radar = raw as RadarData

/** Themen ohne den "nicht zugeordnet"-Sammelcluster (-1). */
export const topics = radar.clusters.filter((c) => c.id >= 0)

/** Einseitiger z-Score pro Tag, wie im Backend: (x - mu) / max(sigma, floor). Nur Überwachungszeitraum. */
export function findSpikes(threshold: number, clusters: RadarCluster[] = topics): Spike[] {
    const {days, meta} = radar
    const out: Spike[] = []
    for (const c of clusters) {
        const sigma = Math.max(c.std, meta.sigmaFloor)
        days.forEach((day, i) => {
            if (day <= meta.trainEnd) return
            const z = (c.daily[i] - c.mean) / sigma
            if (z > threshold) out.push({clusterId: c.id, day, dayIndex: i, count: c.daily[i], mean: c.mean, z})
        })
    }
    return out.sort((a, b) => (a.day === b.day ? b.z - a.z : b.day.localeCompare(a.day)))
}

export const formatDay = (iso: string) =>
    new Date(iso).toLocaleDateString("de-DE", {day: "numeric", month: "short"})

export const formatNumber = (n: number, digits = 0) =>
    n.toLocaleString("de-DE", {maximumFractionDigits: digits, minimumFractionDigits: digits})

/** Kurztitel für enge Stellen (Chips, Legende). */
export const shortTitle = (t: string) => t.split(/ und | & |, /)[0]
