/**
 * Zentrale Inhalte für die Seite /ki-fuer-unternehmen.
 * Alle Texte, Preise und Pakete lassen sich hier ändern.
 */

export const kiServices = {
    // TODO: Buchungslink eintragen (z. B. Cal.com / Calendly). Solange leer, wird ein mailto-Link verwendet.
    bookingUrl: "",
    contactEmail: "kontakt@nikolas-rummel.de",
    ctaLabel: "20 Minuten Kennenlernen",
    mailSubject: "Kennenlernen: KI für unseren Betrieb",

    meta: {
        title: "KI für Unternehmen in Karlsruhe",
        description:
            "KI-Lösungen für kleine und mittlere Betriebe in Karlsruhe und Umgebung: Postfach sortieren, Chatbot für eure Unterlagen, Rechnungen automatisch auslesen. Feste Pakete, klare Preise.",
    },

    hero: {
        eyebrow: "Für Betriebe in Karlsruhe und Umgebung",
        title: "Weniger Routine im Büro. Mehr Zeit für euer Geschäft.",
        text: "Ich richte KI-Helfer ein, die euch Mail-, Such- und Schreibarbeit abnehmen – verständlich erklärt, mit festem Preis und ohne Technik-Wissen auf eurer Seite.",
    },

    // Zwei Demos direkt unter dem Hero
    demos: {
        title: "Zwei Demos zum Anschauen",
        intro: "Beide laufen mit erfundenen Beispieldaten. So seht ihr in einer Minute, was möglich ist.",
        radar: {
            eyebrow: "Postfach-Radar",
            title: "Auffälligkeiten im Postfach sofort sehen",
            text: "Themen entdecken, Verläufe mit Alarmen ansehen und neue Anfragen live einordnen lassen.",
            label: "Interaktive Demo öffnen",
            href: "/ki-fuer-unternehmen/postfach-radar",
        },
        chat: {
            eyebrow: "Chatbot für eure Unterlagen",
            title: "Fragen stellen, Antworten mit Quelle bekommen",
            text: "Der Bot kennt eure Dokumente, antwortet in normaler Sprache und sagt dazu, wo es steht.",
            label: "Das möchte ich für meinen Betrieb",
        },
    },

    packages: {
        title: "Drei Pakete mit festem Rahmen",
        intro: "Jedes Paket löst eine konkrete Aufgabe. Der genaue Preis steht im Angebot nach unserem Gespräch.",
        priceNote: "Der Endpreis hängt vom Umfang ab und steht im Angebot.",
        items: [
            {
                id: "postfach",
                name: "Postfach sortieren",
                result: "Eingehende E-Mails werden automatisch nach Thema und Dringlichkeit eingeordnet. Ihr seht sofort, was zuerst beantwortet werden muss.",
                duration: "ca. 2 Wochen",
                price: "ab 1.500 €",
            },
            {
                id: "chatbot",
                name: "Chatbot für eure Unterlagen",
                result: "Mitarbeiter oder Kunden stellen Fragen in normaler Sprache. Die KI antwortet und nennt dazu die Quelle in euren Unterlagen.",
                duration: "ca. 2–3 Wochen",
                price: "ab 2.500 €",
            },
            {
                id: "rechnungen",
                name: "Rechnungen und Lieferscheine auslesen",
                result: "Die Daten aus Rechnungen und Lieferscheinen landen automatisch in Excel oder in eurem System. Kein Abtippen mehr.",
                duration: "ca. 2 Wochen",
                price: "ab 1.500 €",
            },
        ],
    },

    process: {
        title: "So läuft es ab",
        steps: [
            {title: "Gespräch", text: "Wir sprechen 20 Minuten darüber, was bei euch Zeit kostet. Das Gespräch ist kostenlos und unverbindlich."},
            {title: "Angebot", text: "Ihr bekommt ein schriftliches Angebot mit Leistung, Zeitplan und Preis."},
            {title: "Umsetzung", text: "Ich baue die Lösung und zeige euch zwischendurch den Stand. Ihr gebt Rückmeldung."},
            {title: "Übergabe", text: "Ich erkläre euch alles in einfachen Worten und bleibe für Fragen erreichbar."},
        ],
    },

    privacy: {
        title: "Datenschutz: Eure Daten bleiben bei euch",
        points: [
            "Eure Daten werden in der EU verarbeitet.",
            "Wir schließen einen Auftragsverarbeitungsvertrag (AVV) ab.",
            "Eure Daten werden nicht zum Training von KI-Modellen verwendet.",
        ],
    },

    about: {
        title: "Wer hinter dem Angebot steckt",
        text: [
            "Ich bin Nikolas Rummel, Informatiker aus Karlsruhe. Beruflich entwickle ich KI- und Datenlösungen mit Python, Java und in der Cloud und unterrichte als Dozent an der DHBW Karlsruhe.",
            "Ihr habt einen festen Ansprechpartner, ohne Agentur dazwischen. Ich komme bei Bedarf gern vorbei, ihr sitzt ja um die Ecke.",
        ],
    },

    // Platzhalter für ein späteres Demo-Projekt. Auf `enabled: true` setzen, sobald die Demo fertig ist.
    demo: {
        enabled: false,
        title: "Probiert es selbst aus",
        text: "Hier entsteht eine Demo, mit der ihr eine Lösung direkt ausprobieren könnt.",
        href: "",
    },

    finalCta: {
        title: "Neugierig geworden?",
        text: "Erzählt mir in 20 Minuten, wo es bei euch hakt. Ich sage euch ehrlich, ob und wie KI helfen kann.",
    },
} as const

export function ctaHref(): string {
    if (kiServices.bookingUrl) return kiServices.bookingUrl
    return `mailto:${kiServices.contactEmail}?subject=${encodeURIComponent(kiServices.mailSubject)}`
}
