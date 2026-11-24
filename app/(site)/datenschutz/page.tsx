import type {Metadata} from "next"
import React from "react"
import {siteConfig} from "@/config/site"

export const metadata: Metadata = {
    title: "Datenschutzerklärung",
    robots: {index: false},
}


export default function Datenschutz() {
    return (
        <div lang="de" className="ki page container prose" style={{minHeight: "100svh"}}>
            <header><h1>Datenschutzerklärung</h1></header>

            <h2>1. Verantwortlicher</h2>
            <p>
                Nikolas Rummel, Laurentiusstr. 56, 76135 Karlsruhe<br/>
                E-Mail: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </p>

            <h2>2. Hosting, Cloudflare und Server-Logfiles</h2>
            <p>
                Diese Website wird auf einem von mir selbst betriebenen Server gehostet. Der Zugriff läuft über
                den Dienst Cloudflare (Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA), der
                als Vorschaltdienst (Reverse Proxy und Tunnel) dient. Cloudflare verarbeitet dabei technisch
                notwendige Daten wie eure IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite sowie
                Browser- und Geräteinformationen, um die Seite auszuliefern, vor Angriffen zu schützen und die
                Verbindung per HTTPS zu verschlüsseln. Cloudflare ist unter dem EU-US Data Privacy Framework
                zertifiziert. Weitere Informationen:
                {" "}<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">cloudflare.com/privacypolicy</a>.
            </p>
            <p>
                Auch auf meinem Server werden beim Aufruf der Seite technisch notwendige Daten (IP-Adresse,
                Datum und Uhrzeit, aufgerufene Seite, Browser) in Logfiles verarbeitet. Zweck ist der sichere
                und stabile Betrieb der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse am sicheren Betrieb). Die Daten werden nur so lange gespeichert, wie es dafür
                erforderlich ist, und nicht mit anderen Daten zusammengeführt.
            </p>

            <h2>3. Cookies, Tracking und externe Dienste</h2>
            <p>
                Diese Website setzt keine Tracking- oder Analyse-Dienste ein und lädt keine Schriftarten oder
                Skripte von Fremdservern nach. Schriftarten werden beim Erstellen der Seite abgerufen und
                von dieser Website selbst ausgeliefert. Bilder werden ebenfalls von dieser Website selbst
                ausgeliefert.
            </p>
            <p>
                Die Wahl zwischen hellem und dunklem Erscheinungsbild wird nur lokal in eurem Browser
                gespeichert (Local Storage) und nicht an mich übertragen. Dafür ist keine Einwilligung
                erforderlich (§ 25 Abs. 2 TDDDG).
            </p>
            <p>
                Links zu externen Seiten (zum Beispiel GitHub, LinkedIn, Instagram) werden erst bei einem Klick
                geöffnet. Ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>

            <h2>4. Kontakt per E-Mail</h2>
            <p>
                Wenn ihr mir schreibt, verarbeite ich eure Angaben (E-Mail-Adresse, Inhalt der Nachricht), um
                die Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um einen
                Vertrag oder vorvertragliche Maßnahmen geht, sonst Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald die Anfrage
                erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
            <p>
                Die Adresse {siteConfig.contactEmail} ist eine Weiterleitung über Cloudflare Email Routing
                an mein privates Postfach bei Google (Gmail). Eure Nachricht läuft deshalb über die Server
                von Cloudflare und Google, die dabei als Dienstleister für mich handeln. Beide Anbieter sind
                unter dem EU-US Data Privacy Framework zertifiziert.
            </p>

            <h2>5. Radar-Demo</h2>
                    <p>
                        Auf dieser Website könnt ihr eine Beispiel-Kundenanfrage in ein Textfeld eingeben und einem
                        Thema zuordnen lassen. Der eingegebene Text wird erst beim Klick auf den Button an meinen
                        eigenen Server gesendet (nicht an Dritte). Dort werden Namen, E-Mail-Adressen,
                        Telefonnummern, IBAN, Bestell- und Geldbeträge maskiert, der Text wird einem Thema
                        zugeordnet und das Ergebnis wird euch angezeigt. Eure Eingabe wird dabei nicht
                        gespeichert und nicht für andere Zwecke verwendet. Bitte gebt dennoch keine echten
                        personenbezogenen Daten ein, die Demo funktioniert mit erfundenen Beispielen genauso.
                    </p>
                    <p>
                        Zum Schutz vor Missbrauch begrenze ich die Anzahl der Anfragen pro IP-Adresse. Dafür wird
                        die IP-Adresse kurzzeitig im Arbeitsspeicher gehalten und nach einer Minute bzw. beim
                        Neustart des Servers verworfen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
                        (berechtigtes Interesse am sicheren Betrieb).
                    </p>

            <h2>6. Eure Rechte</h2>
            <p>
                Ihr habt das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Wendet euch dazu an die oben
                genannte E-Mail-Adresse. Außerdem könnt ihr euch bei einer Datenschutz-Aufsichtsbehörde
                beschweren. Für mich zuständig ist der Landesbeauftragte für den Datenschutz und die
                Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.
            </p>

            <p className="mt-12 text-sm text-gray-600 dark:text-gray-400">Stand: November 2026</p>
        </div>
    )
}
