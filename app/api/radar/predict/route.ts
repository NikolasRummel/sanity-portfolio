import {NextResponse} from "next/server"

/**
 * Proxy zur Service-Radar-API (FastAPI): Die Seite ruft nur diesen Endpunkt auf, die API-URL und der
 * Schlüssel bleiben auf dem Server. Eingaben werden nicht gespeichert, nur an die API weitergereicht.
 */
export const dynamic = "force-dynamic"

const MAX_CHARS = 600
const LIMIT = {requests: 20, windowMs: 60_000}
const hits = new Map<string, {count: number; resetAt: number}>()

function tooMany(ip: string) {
    const now = Date.now()
    const entry = hits.get(ip)
    if (!entry || entry.resetAt < now) {
        hits.set(ip, {count: 1, resetAt: now + LIMIT.windowMs})
        if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k)
        return false
    }
    entry.count += 1
    return entry.count > LIMIT.requests
}

const fail = (error: string, status: number) => NextResponse.json({error}, {status})

export async function POST(request: Request) {
    const base = process.env.RADAR_API_URL
    if (!base) return fail("not_configured", 503)

    const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (tooMany(ip)) return fail("rate_limited", 429)

    let text = ""
    try {
        text = String((await request.json())?.text ?? "").trim()
    } catch {
        return fail("bad_request", 400)
    }
    if (!text) return fail("empty", 400)
    if (text.length > MAX_CHARS) return fail("too_long", 413)

    try {
        const res = await fetch(`${base.replace(/\/$/, "")}/predict`, {
            method: "POST",
            headers: {"Content-Type": "application/json", ...(process.env.RADAR_API_KEY ? {"X-API-Key": process.env.RADAR_API_KEY} : {})},
            body: JSON.stringify({text}),
            signal: AbortSignal.timeout(20_000),
            cache: "no-store",
        })
        if (res.status === 503) return fail("starting", 503)
        if (!res.ok) return fail("upstream_error", 502)
        const data = await res.json()
        return NextResponse.json({
            anonymized: data.anonymized_text,
            title: data.title,
            probability: data.probability,
            noise: data.is_noise,
        })
    } catch {
        return fail("unreachable", 502)
    }
}
