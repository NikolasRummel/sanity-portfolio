import type {Metadata} from "next"
import React from "react"
import Placeholder from "@/components/legal/Placeholder"
import {siteConfig} from "@/config/site"

export const metadata: Metadata = {
    title: "Impressum",
    robots: {index: false},
}

const heading = "mt-12 mb-2 block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase"

export default function Impress() {
    return (
        <div lang="de" className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-32 min-h-screen">
            <h1 className="mb-16 text-center">
                <span className="block text-base font-semibold tracking-wide text-sky-600 dark:text-teal-400 uppercase">
                    Impressum
                </span>
                <span className="block mt-2 text-4xl font-bold leading-10">
                    Angaben gemäß § 5 DDG
                </span>
            </h1>

            <p>
                Nikolas Rummel<br/>
                Laurentiusstr. 56<br/>
                <Placeholder>PLZ</Placeholder> Karlsruhe<br/>
            </p>

            <h2 className={heading}>Kontakt</h2>
            <p>
                E-Mail: <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><br/>
                Telefon: <Placeholder>Telefonnummer (oder anderer schneller Kontaktweg)</Placeholder>
            </p>

            <h2 className={heading}>Umsatzsteuer</h2>
            <p>
                <Placeholder>Umsatzsteuer-ID nach § 27a UStG, falls vorhanden. Andernfalls Hinweis zur Kleinunternehmerregelung (§ 19 UStG) falls zutreffend. Bitte mit Steuerberatung klären.</Placeholder>
            </p>

            <h2 className={heading}>Haftung für Inhalte</h2>
            <p>
                Als Diensteanbieter bin ich nach den allgemeinen Gesetzen für eigene Inhalte auf diesen
                Seiten verantwortlich (§ 7 Abs. 1 DDG). Nach den §§ 8 bis 10 DDG bin ich jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben unberührt. Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis
                einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen
                werde ich diese Inhalte umgehend entfernen.
            </p>

            <h2 className={heading}>Haftung für Links</h2>
            <p>
                Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
                Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen. Für die Inhalte
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>

            <p className="mt-12 text-sm text-gray-600 dark:text-gray-400">
                Hinweis: Die Haftungshinweise sind aus der bisherigen englischen Fassung übernommen und von
                TMG auf DDG angepasst. Bitte rechtlich prüfen lassen.
            </p>
        </div>
    )
}
