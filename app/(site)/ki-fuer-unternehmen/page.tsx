import type React from "react"
import type {Metadata} from "next"
import {notFound} from "next/navigation"
import {ArrowRight} from "lucide-react"
import ChatDemo from "@/components/chat/ChatDemo"
import HeroPreview from "@/components/radar/HeroPreview"
import {handbuchChat, kundenChat} from "@/config/chat-scenarios"
import PinnedPackages, {type PinnedItem} from "@/components/ki/PinnedPackages"
import InvoiceSample from "@/components/ki/InvoiceSample"
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

function CtaButton() {
    return (
        <a href={ctaHref()} className="btn">
            {c.ctaLabel}
            <ArrowRight size={18} aria-hidden="true"/>
        </a>
    )
}

export default function KiFuerUnternehmen() {
    if (!showKiServices) notFound()

    const visuals: Record<string, React.ReactNode> = {
        postfach: <HeroPreview/>,
        chatbot: <ChatDemo scenario={kundenChat} minHeight="h-[19rem]"/>,
        rechnungen: <InvoiceSample/>,
    }
    const demoFor = {
        postfach: {...c.demos.radar},
        chatbot: {...c.demos.chat, href: ctaHref()},
    } as Record<string, PinnedItem["demo"]>
    const tabs: Record<string, string> = {postfach: "Postfach", chatbot: "Chatbot", rechnungen: "Rechnungen"}
    const items: PinnedItem[] = c.packages.items.map((p) => ({
        id: p.id, name: p.name, tab: tabs[p.id], result: p.result, duration: p.duration, price: p.price,
        demo: demoFor[p.id], visual: visuals[p.id],
    }))

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
                                <a href="#pakete" className="btn btn--clear">Demos ansehen</a>
                            </div>
                            <p className="small">{c.hero.note}</p>
                        </div>
                        <div className="ki-hero__stage">
                            <ChatDemo scenario={handbuchChat} minHeight="h-[33rem]"/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pakete" aria-labelledby="pakete-titel" className="band">
                <div className="container">
                    <div className="head">
                        <h2 id="pakete-titel">{c.packages.title}</h2>
                        <p className="lead">{c.packages.intro}</p>
                    </div>
                    <PinnedPackages items={items} intro={c.demos.intro}/>
                    <p className="small" style={{marginTop: "var(--space-lg)"}}>{c.packages.priceNote}</p>
                </div>
            </section>

            <section aria-labelledby="ablauf" className="band">
                <div className="container">
                    <div className="head"><h2 id="ablauf">{c.process.title}</h2></div>
                    <ol className="steps">
                        {c.process.steps.map((s) => (
                            <li key={s.title} className="steps__item">
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section aria-labelledby="datenschutz" className="band">
                <div className="container">
                    <div className="privacy">
                        <h2 id="datenschutz">{c.privacy.title}</h2>
                        <ul className="points">
                            {c.privacy.points.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                </div>
            </section>

            <section aria-labelledby="ueber-mich" className="band">
                <div className="container">
                    <div className="statement">
                        <h2 id="ueber-mich" className="statement__label" style={{fontFamily: "var(--font-body)", fontSize: "var(--text-md)", letterSpacing: 0}}>{c.about.title}</h2>
                        <p className="statement__main">{c.about.text[0]}</p>
                        <p className="statement__aside">{c.about.text[1]}</p>
                    </div>
                </div>
            </section>

            {c.demo.enabled && (
                <section aria-labelledby="demo" className="band">
                    <div className="container">
                        <h2 id="demo">{c.demo.title}</h2>
                        <p className="lead">{c.demo.text}</p>
                        {c.demo.href && <a href={c.demo.href} className="link">Zur Demo</a>}
                    </div>
                </section>
            )}

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
