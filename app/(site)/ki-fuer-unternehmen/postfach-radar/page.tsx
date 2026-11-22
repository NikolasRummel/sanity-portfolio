import type {Metadata} from "next"
import dynamic from "next/dynamic"
import {ArrowRight} from "lucide-react"
import {FadeIn} from "@/components/MotionWrappers"
import HeroPreview from "@/components/radar/HeroPreview"
import {radarCtaHref, radarPage as c} from "@/config/postfach-radar"
import {siteConfig} from "@/config/site"

const RadarDemo = dynamic(() => import("@/components/radar/RadarDemo"), {
    loading: () => <div className="demo-card" style={{height: 600}} aria-hidden="true"/>,
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

function CtaButton() {
    return (
        <a href={radarCtaHref()} className="btn">
            {c.ctaLabel}
            <ArrowRight size={18} aria-hidden="true"/>
        </a>
    )
}

export default function PostfachRadar() {
    return (
        <div lang="de" className="ki">
            <section className="ki-hero" aria-labelledby="hero-titel">
                <div className="container">
                    <div className="ki-hero__grid">
                        <div className="ki-hero__text">
                            <h1 id="hero-titel">{c.hero.title}</h1>
                            <p className="lead">{c.hero.text}</p>
                            <div className="ki-hero__actions">
                                <CtaButton/>
                                <a href={`#${c.demo.id}`} className="btn btn--clear">{c.hero.secondary}</a>
                            </div>
                            <p className="small">{c.hero.eyebrow}. {c.hero.note}</p>
                        </div>
                        <div className="ki-hero__stage"><HeroPreview/></div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="problem" className="band" style={{background: "var(--color-paper-2)"}}>
                <div className="container">
                    <div className="head"><h2 id="problem">{c.problem.title}</h2></div>
                    <ul className="cols cols--3">
                        {c.problem.items.map(({title, text}) => (
                            <li key={title} className="cols__item">
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id={c.demo.id} aria-labelledby="demo-titel" className="band" style={{scrollMarginTop: "var(--space-3xl)"}}>
                <div className="container">
                    <div className="head">
                        <h2 id="demo-titel">{c.demo.title}</h2>
                        <p className="lead">{c.demo.text}</p>
                    </div>
                    <RadarDemo/>
                    <p className="small" style={{marginTop: "var(--space-md)"}}>{c.demo.disclaimer}</p>
                </div>
            </section>

            <section aria-labelledby="ablauf" className="band" style={{background: "var(--color-paper-2)"}}>
                <div className="container">
                    <div className="head"><h2 id="ablauf">{c.steps.title}</h2></div>
                    <ol className="steps">
                        {c.steps.items.map((s) => (
                            <li key={s.title} className="steps__item">
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section aria-labelledby="einsatz" className="band">
                <div className="container">
                    <div className="head"><h2 id="einsatz">{c.useCases.title}</h2></div>
                    <ul className="cols cols--3">
                        {c.useCases.items.map((u) => (
                            <li key={u.title} className="cols__item">
                                <h3>{u.title}</h3>
                                <p>{u.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="datenschutz" className="band" style={{background: "var(--color-paper-2)"}}>
                <div className="container privacy">
                    <h2 id="datenschutz">{c.privacy.title}</h2>
                    <ul className="points">
                        {c.privacy.points.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="faq" className="band">
                <div className="container">
                    <div className="head"><h2 id="faq">{c.faq.title}</h2></div>
                    <div className="faq">
                        {c.faq.items.map((f) => (
                            <details key={f.q}>
                                <summary>{f.q}<span aria-hidden="true">+</span></summary>
                                <p>{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-labelledby="kontakt" className="close">
                <div className="container">
                    <div className="close__inner">
                        <h2 id="kontakt">{c.finalCta.title}</h2>
                        <p className="lead">{c.finalCta.text}</p>
                        <CtaButton/>
                    </div>
                </div>
            </section>
        </div>
    )
}
