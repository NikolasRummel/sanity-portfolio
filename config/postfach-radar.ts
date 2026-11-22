/**
 * Inhalte der Produktseite /ki-fuer-unternehmen/postfach-radar.
 * Keine Preise: Interessenten melden sich per E-Mail.
 */
import {kiServices} from "@/config/ki-services"

export const radarPage = {
    contactEmail: kiServices.contactEmail,
    ctaLabel: "Interessiert? Schreib mir",
    mailSubject: "Interesse: Postfach-Radar",
    mailBody: "Hallo Nikolas,\n\nich interessiere mich für den Postfach-Radar.\n\nUnser Betrieb:\nWie viele Anfragen pro Woche (ca.):\nWo kommen sie an (E-Mail, Formular, Ticketsystem):\n",

    meta: {
        title: "Postfach-Radar: Kundenanfragen automatisch sortieren und Alarm bei Häufungen",
        description:
            "Der Postfach-Radar erkennt Themen in euren Kundenanfragen von selbst und warnt, wenn zu einem Thema plötzlich ungewöhnlich viele Nachrichten eintreffen. Hier direkt ausprobieren.",
    },

    hero: {
        eyebrow: "Postfach-Radar",
        title: "Euer Postfach erkennt Probleme, bevor ihr sie bemerkt.",
        text: "Der Radar sortiert eingehende Kundenanfragen von selbst nach Themen und schlägt Alarm, sobald zu einem Thema plötzlich ungewöhnlich viele Nachrichten kommen. Ohne feste Kategorien, ohne Regeln, die ihr pflegen müsst.",
        secondary: "Demo ausprobieren",
        note: "Für kleine und mittlere Betriebe in Karlsruhe und Umgebung",
    },

    problem: {
        title: "Drei Dinge, die ein volles Postfach euch kostet",
        items: [
            {icon: "layers", title: "Alles landet auf einem Stapel", text: "Lieferfragen, Reklamationen und Rechnungen liegen durcheinander. Wer was zuerst bearbeitet, entscheidet der Zufall."},
            {icon: "eye-off", title: "Häufungen fallen zu spät auf", text: "Wenn plötzlich viele Kunden dasselbe fragen, merkt ihr es oft erst nach Tagen, wenn die Beschwerden schon da sind."},
            {icon: "clock", title: "Starre Kategorien veralten", text: "Ticket-Kategorien passen irgendwann nicht mehr zu dem, was Kunden wirklich schreiben. Neue Themen bleiben unsichtbar."},
        ],
    },

    demo: {
        id: "demo",
        title: "Probiert den Radar selbst aus",
        text: "Das ist ein Beispiel-Postfach eines fiktiven Fahrradladens mit rund 10.500 Anfragen in 90 Tagen. Die Anfragen sind ausgedacht, die Auswertung stammt aus der echten Pipeline.",
        disclaimer: "Beispieldaten einer fiktiven Firma. Die Häufungen wurden absichtlich eingebaut, damit ihr sehen könnt, wie der Alarm reagiert.",
    },

    steps: {
        title: "So funktioniert der Radar",
        items: [
            {title: "Verstehen", text: "Der Radar liest eure bisherigen Anfragen und gruppiert sie nach Bedeutung. Dazu muss niemand Kategorien festlegen."},
            {title: "Benennen", text: "Jede Gruppe bekommt einen verständlichen Titel und eine Ein-Satz-Beschreibung, zum Beispiel „Lieferverzug und Sendungsverfolgung“."},
            {title: "Zuordnen", text: "Neue Nachrichten werden sofort einem Thema zugeordnet. Passt eine Nachricht zu keinem Thema, wird sie separat markiert."},
            {title: "Alarmieren", text: "Der Radar kennt pro Thema den normalen Tagesverlauf. Weicht ein Tag deutlich davon ab, bekommt ihr Bescheid."},
        ],
    },

    useCases: {
        title: "Wofür Betriebe den Radar nutzen",
        items: [
            {title: "Kundenservice im Onlineshop", text: "Eine Lieferverzögerung eines Paketdienstes fällt am ersten Tag auf, nicht erst nach 200 Beschwerden."},
            {title: "Handel und Handwerk", text: "Ihr seht, welche Fragen sich häufen, und könnt die Antwort direkt auf die Website oder in die Auftragsbestätigung schreiben."},
            {title: "Dienstleister mit Terminen", text: "Plötzlich viele Terminverschiebungen oder Rückfragen zu einem Angebot zeigen, wo etwas nicht klar kommuniziert wurde."},
        ],
    },

    privacy: {
        title: "Datenschutz von Anfang an",
        points: [
            "E-Mail-Adressen, Telefonnummern, IBAN und Bestellnummern werden durch Platzhalter ersetzt, bevor eine Nachricht analysiert wird.",
            "Die Verarbeitung findet in der EU statt, dazu schließen wir einen Auftragsverarbeitungsvertrag (AVV).",
            "Eure Daten werden nicht zum Training von KI-Modellen verwendet.",
        ],
    },

    faq: {
        title: "Häufige Fragen",
        items: [
            {q: "Brauchen wir ein bestimmtes Ticketsystem?", a: "Nein. Für den Start reicht ein Export eurer Anfragen der letzten Wochen als Tabelle (Zeitpunkt und Text). Später kann der Radar an euer Postfach angebunden werden."},
            {q: "Wie viele Nachrichten braucht der Radar?", a: "Als Faustregel reichen einige Tausend Nachrichten aus etwa drei Monaten. Je mehr Anfragen, desto feiner die Themen."},
            {q: "Wer sieht unsere Nachrichten?", a: "Nur anonymisierte Texte werden ausgewertet. Persönliche Angaben werden vorher entfernt, und es gibt einen AVV."},
            {q: "Was, wenn ein Alarm falsch ist?", a: "Die Schwelle lässt sich einstellen (probiert den Regler in der Demo). Ein Alarm ist ein Hinweis zum Nachschauen und löst keine automatische Aktion aus."},
            {q: "Ist die Demo echt?", a: "Die Anfragen sind ausgedacht, die Zuordnung, die Themenbildung und die Alarmberechnung laufen aber mit denselben Verfahren, die auch auf euren Daten laufen würden."},
        ],
    },

    finalCta: {
        title: "Interessiert?",
        text: "Schreib mir eine kurze E-Mail. Wir schauen gemeinsam, ob der Radar zu eurem Postfach passt.",
    },
} as const

export function radarCtaHref(): string {
    const {mailSubject, mailBody, contactEmail} = radarPage
    return `mailto:${contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
}
