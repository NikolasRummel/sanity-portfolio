import type {Metadata} from "next"
import dynamic from "next/dynamic"
import {notFound} from "next/navigation"
import {ArrowRight, CheckCircle2, Clock, EyeOff, Layers, ShieldCheck} from "lucide-react"
import {FadeIn} from "@/components/MotionWrappers"
import HeroPreview from "@/components/radar/HeroPreview"
import {radarCtaHref, radarPage as c} from "@/config/postfach-radar"
import {showKiServices, siteConfig} from "@/config/site"

const RadarDemo = dynamic(() => import("@/components/radar/RadarDemo"), {
    loading: () => <div className="h-[600px] animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-900" aria-hidden="true"/>,
})

export const metadata: Metadata = {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {canonical: "/ki-fuer-unternehmen/postfach-radar"},
    openGraph: {
        title: `${c.meta.title} – ${siteConfig.name}`,
        description: c.meta.description,
        url: `${siteConfig.url}/ki-fuer-unternehmen/postfach-radar`,
        locale: "de_DE",
        type: "website",
    },
}

const icons = {layers: Layers, "eye-off": EyeOff, clock: Clock}
const wrap = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
const h2 = "font-bold text-3xl md:text-4xl tracking-tight"

function CtaButton({className = ""}: { className?: string }) {
    return (
        <a href={radarCtaHref()}
           className={`group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-3 font-bold text-white shadow-lg shadow-teal-700/25 transition-colors hover:bg-teal-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${className}`}>
            {c.ctaLabel}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1"/>
        </a>
    )
}

export default function PostfachRadar() {
    if (!showKiServices) notFound()
    return (
        <div lang="de" className="overflow-x-hidden">
            {/* Hero */}
            <section className={`${wrap} pt-32 pb-20 md:pt-44 md:pb-28`}>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <FadeIn>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">{c.hero.eyebrow}</p>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{c.hero.title}</h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{c.hero.text}</p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <CtaButton/>
                            <a href={`#${c.demo.id}`} className="font-bold underline underline-offset-4">{c.hero.secondary}</a>
                        </div>
                        <p className="mt-6 mb-0 text-sm text-gray-600 dark:text-gray-400">{c.hero.note}</p>
                    </FadeIn>
                    <FadeIn delay={0.15}><HeroPreview/></FadeIn>
                </div>
            </section>

            {/* Problem */}
            <section aria-labelledby="problem" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                <div className={wrap}>
                    <h2 id="problem" className={h2}>{c.problem.title}</h2>
                    <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {c.problem.items.map(({icon, title, text}) => {
                            const Icon = icons[icon]
                            return (
                                <li key={title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                                        <Icon size={24} aria-hidden="true"/>
                                    </span>
                                    <h3 className="mt-4 text-xl font-bold">{title}</h3>
                                    <p className="mt-2 mb-0 text-base text-gray-700 dark:text-gray-300">{text}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>

            {/* Interaktive Demo */}
            <section id={c.demo.id} aria-labelledby="demo-titel" className={`${wrap} py-20 scroll-mt-24`}>
                <h2 id="demo-titel" className={h2}>{c.demo.title}</h2>
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">{c.demo.text}</p>
                <div className="mt-8"><RadarDemo/></div>
                <p className="mt-4 mb-0 text-sm text-gray-600 dark:text-gray-400">{c.demo.disclaimer}</p>
            </section>

            {/* Ablauf */}
            <section aria-labelledby="ablauf" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                <div className={wrap}>
                    <h2 id="ablauf" className={h2}>{c.steps.title}</h2>
                    <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {c.steps.items.map((s, i) => (
                            <li key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-zinc-950">
                                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 font-bold text-white">{i + 1}</span>
                                <h3 className="mt-4 text-xl font-bold"><span className="sr-only">Schritt {i + 1}: </span>{s.title}</h3>
                                <p className="mt-2 mb-0 text-base text-gray-700 dark:text-gray-300">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Anwendungsfälle */}
            <section aria-labelledby="einsatz" className={`${wrap} py-20`}>
                <h2 id="einsatz" className={h2}>{c.useCases.title}</h2>
                <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {c.useCases.items.map((u) => (
                        <li key={u.title} className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                            <h3 className="text-xl font-bold">{u.title}</h3>
                            <p className="mt-2 mb-0 text-base text-gray-700 dark:text-gray-300">{u.text}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Datenschutz */}
            <section aria-labelledby="datenschutz" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                <div className={wrap}>
                    <h2 id="datenschutz" className={`flex items-center gap-3 ${h2}`}>
                        <ShieldCheck aria-hidden="true" className="text-teal-700 dark:text-teal-300" size={32}/>{c.privacy.title}
                    </h2>
                    <ul className="mt-8 space-y-3">
                        {c.privacy.points.map((t) => (
                            <li key={t} className="flex items-start gap-3 text-lg text-gray-800 dark:text-gray-200">
                                <CheckCircle2 aria-hidden="true" size={22} className="mt-1 shrink-0 text-teal-700 dark:text-teal-300"/>{t}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq" className={`${wrap} py-20`}>
                <h2 id="faq" className={h2}>{c.faq.title}</h2>
                <div className="mt-8 max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                    {c.faq.items.map((f) => (
                        <details key={f.q} className="group p-5">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                                {f.q}
                                <span aria-hidden="true" className="text-2xl text-teal-700 transition-transform group-open:rotate-45 dark:text-teal-300">+</span>
                            </summary>
                            <p className="mt-3 mb-0 text-base text-gray-700 dark:text-gray-300">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Abschluss-CTA */}
            <section aria-labelledby="kontakt" className={`${wrap} pb-24`}>
                <div className="rounded-3xl bg-zinc-950 p-8 text-center md:p-14 dark:bg-zinc-100">
                    <h2 id="kontakt" className="text-3xl font-bold text-white dark:text-zinc-900">{c.finalCta.title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300 dark:text-zinc-700">{c.finalCta.text}</p>
                    <div className="mt-8"><CtaButton/></div>
                </div>
            </section>
        </div>
    )
}
