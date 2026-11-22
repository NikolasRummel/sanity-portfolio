import type {Metadata} from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Impressum",
    robots: {index: false},
}


export default function Impress() {
    return (
        <div lang="de" className="ki page container prose" style={{minHeight: "100svh"}}>
            <header><h1>Impressum</h1>
            <p className="lead" style={{color: "var(--color-muted)", fontSize: "var(--text-lead)"}}>Angaben gemäß § 5 DDG</p></header>

            <p>
                Nikolas Rummel<br/>
                Laurentiusstr. 56<br/>
                76135 Karlsruhe
            </p>

            <h2 >Kontakt</h2>
            <p>
                E-Mail: <a href="mailto:kontakt@nikolas-rummel.de">kontakt@nikolas-rummel.de</a>
            </p>

            <h2 >Haftung für Inhalte</h2>
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

            <h2 >Haftung für Links</h2>
            <p>
                Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
                Einfluss habe. Für diese fremden Inhalte kann ich keine Gewähr übernehmen. Für die Inhalte
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>
        </div>
    )
}
