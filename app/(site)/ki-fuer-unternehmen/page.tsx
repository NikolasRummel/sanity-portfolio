import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {ArrowRight, CheckCircle2, FileText, Mail, MessageSquare, ShieldCheck} from "lucide-react"
import ChatDemo from "@/components/chat/ChatDemo"
import HeroPreview from "@/components/radar/HeroPreview"
import {handbuchChat, kundenChat} from "@/config/chat-scenarios"
import {FadeIn} from "@/components/MotionWrappers"
import {ctaHref, kiServices as c} from "@/config/ki-services"
import {showKiServices, siteConfig} from "@/config/site"

export const metadata: Metadata = {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {canonical: "/ki-fuer-unternehmen"},
    openGraph: {
        title: `${c.meta.title} – ${siteConfig.name}`,
        description: c.meta.description,
        url: `${siteConfig.url}/ki-fuer-unternehmen`,
        locale: "de_DE",
        type: "website",
    },
}

const packageIcons = {postfach: Mail, chatbot: MessageSquare, rechnungen: FileText}

function CtaButton({className = ""}: {className?: string}) {
    return (
        <a
            href={ctaHref()}
            className={`group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-3 font-bold text-white shadow-lg shadow-teal-700/25 transition-colors hover:bg-teal-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${className}`}
        >
            {c.ctaLabel}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1"/>
        </a>
    )
}

export default function KiFuerUnternehmen() {
    if (!showKiServices) notFound()
    return (
        <div lang="de" className="overflow-x-hidden">
            {/* 1. Hero mit Live-Chat-Demo */}
            <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-44 md:pb-24">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_70%_20%,rgba(20,184,166,0.18),transparent_60%)]"/>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <FadeIn>
                        <p className="mb-4 inline-block rounded-full border border-teal-700/30 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-900 dark:bg-teal-950/40 dark:text-teal-200">{c.hero.eyebrow}</p>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{c.hero.title}</h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{c.hero.text}</p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <CtaButton/>
                            <a href="#demos" className="font-bold underline underline-offset-4">Demos ansehen</a>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.15}><ChatDemo scenario={handbuchChat}/></FadeIn>
                </div>
            </section>

            {/* Zwei Demos */}
            <section id="demos" aria-labelledby="demos-titel" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
                <h2 id="demos-titel" className="font-bold text-3xl md:text-4xl tracking-tight">{c.demos.title}</h2>
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">{c.demos.intro}</p>
                <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <article className="flex flex-col rounded-3xl border border-gray-200 bg-zinc-50 p-6 dark:border-gray-800 dark:bg-zinc-900/40">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">{c.demos.radar.eyebrow}</p>
                        <h3 className="text-2xl font-bold tracking-tight">{c.demos.radar.title}</h3>
                        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">{c.demos.radar.text}</p>
                        <div className="my-4 flex-1"><HeroPreview/></div>
                        <a href={c.demos.radar.href} className="group inline-flex items-center gap-2 font-bold text-teal-800 hover:text-teal-900 dark:text-teal-300">
                            {c.demos.radar.label}
                            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1"/>
                        </a>
                    </article>
                    <article className="flex flex-col rounded-3xl border border-gray-200 bg-zinc-50 p-6 dark:border-gray-800 dark:bg-zinc-900/40">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-300">{c.demos.chat.eyebrow}</p>
                        <h3 className="text-2xl font-bold tracking-tight">{c.demos.chat.title}</h3>
                        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">{c.demos.chat.text}</p>
                        <div className="my-4 flex-1"><ChatDemo scenario={kundenChat} minHeight="h-[19rem]"/></div>
                        <a href={ctaHref()} className="group inline-flex items-center gap-2 font-bold text-teal-800 hover:text-teal-900 dark:text-teal-300">
                            {c.demos.chat.label}
                            <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1"/>
                        </a>
                    </article>
                </div>
            </section>

            {/* 2. Pakete */}
            <section aria-labelledby="pakete" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="pakete" className="font-bold text-3xl md:text-4xl tracking-tight">{c.packages.title}</h2>
                    <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">{c.packages.intro}</p>
                    <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {c.packages.items.map((p) => (
                            <li key={p.id}
                                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-teal-900/10 dark:border-gray-800 dark:bg-zinc-950">
                                {(() => {
                                    const Icon = packageIcons[p.id]
                                    return (
                                        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300">
                                            <Icon size={24} aria-hidden="true"/>
                                        </span>
                                    )
                                })()}
                                <h3 className="text-xl font-bold text-black dark:text-white">{p.name}</h3>
                                <p className="mt-3 mb-6 flex-1 text-base text-gray-700 dark:text-gray-300">{p.result}</p>
                                <dl className="flex items-end justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
                                    <div>
                                        <dt className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Dauer</dt>
                                        <dd className="font-semibold">{p.duration}</dd>
                                    </div>
                                    <div className="text-right">
                                        <dt className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Preis</dt>
                                        <dd className="text-xl font-bold text-teal-800 dark:text-teal-300">{p.price}</dd>
                                    </div>
                                </dl>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 mb-0 text-sm text-gray-600 dark:text-gray-400">{c.packages.priceNote}</p>
                </div>
            </section>

            {/* 3. Ablauf */}
            <section aria-labelledby="ablauf" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 id="ablauf" className="font-bold text-3xl md:text-4xl tracking-tight">{c.process.title}</h2>
                <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {c.process.steps.map((s, i) => (
                        <li key={s.title} className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                            <span aria-hidden="true"
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 font-bold text-white">{i + 1}</span>
                            <h3 className="mt-4 text-xl font-bold">
                                <span className="sr-only">Schritt {i + 1}: </span>{s.title}
                            </h3>
                            <p className="mt-2 mb-0 text-base text-gray-700 dark:text-gray-300">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* 4. Datenschutz */}
            <section aria-labelledby="datenschutz" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="datenschutz" className="flex items-center gap-3 font-bold text-3xl md:text-4xl tracking-tight">
                        <ShieldCheck aria-hidden="true" className="text-teal-700 dark:text-teal-300" size={32}/>
                        {c.privacy.title}
                    </h2>
                    <ul className="mt-8 space-y-3">
                        {c.privacy.points.map((t) => (
                            <li key={t} className="flex items-start gap-3 text-lg text-gray-800 dark:text-gray-200">
                                <CheckCircle2 aria-hidden="true" size={22} className="mt-1 shrink-0 text-teal-700 dark:text-teal-300"/>
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 5. Über mich */}
            <section aria-labelledby="ueber-mich" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 id="ueber-mich" className="font-bold text-3xl md:text-4xl tracking-tight">{c.about.title}</h2>
                <div className="mt-6 max-w-3xl">
                    {c.about.text.map((t) => (
                        <p key={t} className="text-lg text-gray-700 dark:text-gray-300">{t}</p>
                    ))}
                </div>
            </section>

            {/* 6. Demo (Platzhalter, erst sichtbar wenn kiServices.demo.enabled = true) */}
            {c.demo.enabled && (
                <section aria-labelledby="demo" className="w-full py-20 bg-zinc-50 dark:bg-zinc-900/40">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="demo" className="font-bold text-3xl md:text-4xl tracking-tight">{c.demo.title}</h2>
                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{c.demo.text}</p>
                        {c.demo.href && (
                            <a href={c.demo.href} className="font-bold underline">Zur Demo</a>
                        )}
                    </div>
                </section>
            )}

            {/* 7. Abschluss-CTA */}
            <section aria-labelledby="kontakt" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="rounded-3xl bg-zinc-950 p-8 text-center md:p-14 dark:bg-zinc-100">
                    <h2 id="kontakt" className="text-3xl font-bold text-white dark:text-zinc-900">{c.finalCta.title}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300 dark:text-zinc-700">{c.finalCta.text}</p>
                    <div className="mt-8"><CtaButton/></div>
                </div>
            </section>
        </div>
    )
}
