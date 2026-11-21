import type {ChatScenario} from "@/components/chat/ChatDemo"

/** Beispieldialoge für die Chatbot-Demo (frei erfunden, keine echten Firmendaten). */
export const handbuchChat: ChatScenario = {
    title: "Firmen-Assistent",
    subtitle: "kennt Handbuch, Verträge und Preislisten",
    messages: [
        {from: "bot", text: "Hallo! Ich kenne euer Handbuch und eure Unterlagen. Was möchtet ihr wissen?"},
        {from: "user", text: "Wie viele Urlaubstage habe ich nach 3 Jahren im Betrieb?"},
        {from: "bot", text: "Ab dem dritten Betriebsjahr habt ihr 30 Urlaubstage: 28 Tage Grundanspruch plus 2 Zusatztage.", source: "Handbuch, Kap. 4.2 Urlaub"},
        {from: "user", text: "Und wie melde ich den Urlaub an?"},
        {from: "bot", text: "Über das Formular im Intranet, mindestens 2 Wochen vorher. Die Freigabe kommt per Mail von der Teamleitung.", source: "Handbuch, Kap. 4.3"},
    ],
}

export const kundenChat: ChatScenario = {
    title: "Kunden-Chat",
    subtitle: "antwortet rund um die Uhr, nennt die Quelle",
    messages: [
        {from: "bot", text: "Guten Tag! Wie kann ich helfen?"},
        {from: "user", text: "Meine Heizung ist 18 Monate alt und macht Geräusche. Greift die Garantie?"},
        {from: "bot", text: "Ja, auf Heizgeräte gibt es 24 Monate Garantie. Soll ich einen Techniker-Termin vorschlagen: Dienstag oder Donnerstag?", source: "Garantiebedingungen, Abschnitt 2"},
        {from: "user", text: "Donnerstag bitte."},
        {from: "bot", text: "Notiert. Ein Techniker kommt Donnerstag zwischen 8 und 12 Uhr. Die Bestätigung geht gleich per Mail raus."},
    ],
}
