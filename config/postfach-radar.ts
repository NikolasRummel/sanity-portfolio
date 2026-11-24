/**
 * Inhalte der Projektseite /projects/postfach-radar.
 * Portfolio-Projekt aus der Bachelorarbeit, kein Verkaufsangebot.
 */
import {siteConfig} from "@/config/site"

export const radarPage = {
    meta: {
        title: "Postfach-Radar: Topic Discovery und Anomaly Detection in Kundenservice-Nachrichten",
        description:
            "Demo-Projekt aus meiner Bachelorarbeit: unüberwachte Themenerkennung, Online-Zuordnung und Alarm bei ungewöhnlichen Häufungen in Kundenservice-Nachrichten. Live ausprobieren.",
    },

    hero: {
        eyebrow: "Bachelorarbeit als Fallstudie · Demo-Projekt",
        title: "Postfach-Radar",
        text: "Eine Pipeline, die Kundenservice-Nachrichten ohne feste Kategorien nach Themen gruppiert, neue Nachrichten live zuordnet und Alarm schlägt, wenn zu einem Thema ungewöhnlich viele eintreffen. Entstanden in meiner Bachelorarbeit, hier als lauffähige Demo mit angebundenem Backend.",
        secondary: "Demo ausprobieren",
        note: "Ein Projekt zum Zeigen, kein Produktangebot.",
    },

    problem: {
        title: "Worum es geht",
        items: [
            {title: "Keine festen Kategorien", text: "Ticket-Kategorien veralten. Die Pipeline findet Themen aus den Nachrichten selbst, ohne Labels und ohne Regeln."},
            {title: "Online-Zuordnung", text: "Neue Nachrichten werden einem bestehenden Thema zugeordnet oder als Ausreißer markiert, ohne neu zu trainieren."},
            {title: "Zeitliche Anomalien", text: "Pro Thema wird der normale Tagesverlauf gelernt. Weicht ein Tag deutlich ab, schlägt ein Z-Score-Alarm an."},
        ],
    },

    demo: {
        id: "demo",
        title: "Live-Demo",
        text: "Ein Beispiel-Postfach eines fiktiven Fahrradladens mit rund 10.500 Nachrichten in 90 Tagen. Die Nachrichten sind synthetisch, Themenbildung, Zuordnung und Alarmberechnung laufen mit der echten Pipeline.",
        disclaimer: "Beispieldaten einer fiktiven Firma. Die Häufungen wurden absichtlich eingebaut, damit der Alarm sichtbar reagiert. Die Bachelorarbeit selbst wurde auf echten Kundenservice-Daten ausgewertet, die hier nicht gezeigt werden.",
    },

    steps: {
        title: "Die Pipeline in vier Stufen",
        items: [
            {title: "Topic Discovery", text: "Embeddings mit embeddinggemma-300m, Dimensionsreduktion mit UMAP, Clustering mit HDBSCAN."},
            {title: "Benennen", text: "Jedes Cluster bekommt einen verständlichen Titel und eine Beschreibung, in der Bachelorarbeit per LLM mit zentroidnahen und zufälligen Beispielen."},
            {title: "Online-Zuordnung", text: "Neue Nachrichten werden anonymisiert, eingebettet, projiziert und per approximate_predict einem Cluster zugeordnet."},
            {title: "Anomaly Detection", text: "Cluster-spezifischer Z-Score auf den Tagesvolumen mit Schwelle 3,5, verglichen mit IQR, STL, Rolling-Z und EWMA."},
        ],
    },

    results: {
        title: "Ergebnisse der Fallstudie",
        items: [
            {title: "Themenbildung", text: "Die Cluster waren klar getrennt und inhaltlich gut interpretierbar, bei nur wenigen nicht zugeordneten Nachrichten."},
            {title: "Anomalien", text: "Der Cluster-spezifische Z-Score erkannte die untersuchten Anomalien bei sehr wenigen Fehlalarmen und schnitt besser ab als die klassischen Baselines."},
            {title: "Nutzerstudie", text: "In einer kleinen Nutzerstudie bewerteten Testpersonen die Passgenauigkeit der Themen und die Nützlichkeit durchweg positiv. Das bestätigt: Clustering und Anomaly Detection funktionieren für diesen Zweck, und der Ansatz wird nun so umgesetzt."},
        ],
    },

    stack: {
        title: "Technik",
        tags: ["Python", "FastAPI", "PostgreSQL + pgvector", "UMAP", "HDBSCAN", "Presidio + spaCy", "Next.js", "Docker", "Coolify"],
        text: "Die Demo läuft als FastAPI-Dienst auf meinem eigenen Server. Die Website ruft ihn über einen Proxy auf, Eingaben werden anonymisiert und nicht gespeichert.",
    },

    privacy: {
        title: "Datenschutz in der Demo",
        points: [
            "E-Mail-Adressen, Telefonnummern, IBAN, Bestellnummern, Beträge und Namen werden durch Platzhalter ersetzt, bevor ein Text analysiert wird.",
            "Eingaben gehen nur an meinen eigenen Server, werden nicht gespeichert und nicht für Training verwendet.",
            "Bitte trotzdem keine echten personenbezogenen Daten eingeben.",
        ],
    },

    links: {
        title: "Mehr dazu",
        text: "Fragen zur Arbeit oder zur Umsetzung? Schreib mir gern.",
        mailLabel: "Schreib mir",
        mailHref: `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Frage zum Postfach-Radar")}`,
        githubLabel: "GitHub",
        githubHref: siteConfig.links.github,
    },
} as const
