import type {Metadata} from "next"
import React from "react"
import Placeholder from "@/components/legal/Placeholder"
import {siteConfig} from "@/config/site"

export const metadata: Metadata = {
    title: "Datenschutzerklärung",
    robots: {index: false},
}


export default function Datenschutz() {
    return (
        <div lang="de" className="ki page container prose" style={{minHeight: "100svh"}}>
            <header><h1>Datenschutzerklärung</h1></header>

            <p className="notice">
                <strong>Entwurf:</strong> Diese Seite enthält nur eine technische Beschreibung dessen, was die
                Website heute tut, sowie Platzhalter. Sie ist keine geprüfte Rechtsberatung. Vor
                Veröffentlichung bitte vervollständigen und prüfen lassen.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
                Nikolas Rummel, Laurentiusstr. 56, <Placeholder>PLZ</Placeholder> Karlsruhe<br/>
                E-Mail: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </p>

            <h2>2. Hosting und Server-Logfiles</h2>
            <p>
                Diese Website wird bei <Placeholder>Hosting-Anbieter, Standort der Server und Link zur Datenschutzerklärung des Anbieters</Placeholder> betrieben.
                Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Daten wie IP-Adresse,
                Datum und Uhrzeit sowie die aufgerufene Seite.
            </p>
            <p>
                <Placeholder>Zweck, Rechtsgrundlage (z. B. Art. 6 Abs. 1 lit. f DSGVO), Speicherdauer der Logfiles und Auftragsverarbeitungsvertrag mit dem Hoster</Placeholder>
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
                gespeichert (Local Storage) und nicht an mich übertragen.
            </p>
            <p>
                Links zu externen Seiten (zum Beispiel GitHub, LinkedIn, Instagram) werden erst bei einem Klick
                geöffnet. Ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>

            <h2>4. Kontakt per E-Mail</h2>
            <p>
                Wenn ihr mir schreibt, verarbeite ich eure Angaben, um die Anfrage zu beantworten.
                <Placeholder>Rechtsgrundlage, Speicherdauer</Placeholder>
            </p>

            <h2>5. Buchung eines Gesprächs</h2>
            <p>
                <Placeholder>Sobald ein Buchungsdienst eingebunden ist: Anbieter, Zweck, Datenarten, Serverstandort und Rechtsgrundlage ergänzen. Bis dahin Abschnitt streichen.</Placeholder>
            </p>

            <h2>6. Eure Rechte</h2>
            <p>
                Ihr habt das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Wendet euch dazu an die oben
                genannte E-Mail-Adresse. Außerdem könnt ihr euch bei einer Datenschutz-Aufsichtsbehörde
                beschweren. <Placeholder>Zuständige Aufsichtsbehörde bestätigen (für Karlsruhe vermutlich der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg)</Placeholder>
            </p>

            <p className="mt-12 text-sm text-gray-600 dark:text-gray-400">Stand: <Placeholder>Datum</Placeholder></p>
        </div>
    )
}
