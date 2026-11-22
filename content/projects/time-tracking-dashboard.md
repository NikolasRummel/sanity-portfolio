---
title: "Time Tracking Dashboard"
slug: "time-tracking-dashboard"
description: "GitLab-Analyse-Dashboard, entwickelt für ein DHBW-Projekt im Software Engineering, um die Zeiterfassung auf Basis von Issues zu visualisieren. Der Software-Engineering-Professor nutzt das Tool inzwischen als Demonstrationswerkzeug in Vorlesungen."
image: "/images/content/time-tracking-dashboard-3456x2234.gif"
imageAlt: "Demo"
url: "https://github.com/NikolasRummel/gitlab-timetracking-analysis/tree/main"
createdAt: "2026-01-22T20:06:26Z"
updatedAt: "2026-01-22T20:06:26Z"
---

# Time Tracking Dashboard

GitLab-Analyse-Dashboard, entwickelt für ein DHBW-Projekt im Software Engineering, um die Zeiterfassung auf Basis von Issues zu visualisieren. Der Software-Engineering-Professor nutzt das Tool inzwischen als Demonstrationswerkzeug in Vorlesungen.


> [!NOTE]  
> Dieses Projekt ist in kurzer Zeit entstanden, daher ist die Codequalität nicht überragend.  
> Es ist eher ein „Hauptsache, es läuft irgendwie“-Projekt.
> 
## Funktionen

- 📊 **Projektübersicht**: Sprint-Kennzahlen, Velocity-Tracking und Kategorieverteilung
- 📈 **Zeitreihendiagramme**: Wöchentliche Leistungstrends und Vergleich der Teamaktivität
- 🎯 **Team & Kategorien**: Kreis- und Balkendiagramme zur Analyse der Zeitverteilung
- ⚡ **Produktivitätsanalyse**: Produktivitätsmuster nach Uhrzeit und Woche
- 👥 **Teamzusammenarbeit**: Netzwerkdarstellung der Zusammenarbeit im Team
- 📋 **Issue-Analyse**: Komplexität und Zeitaufwand von Issues
- 📅 **Detaillierte Aktivität**: Aktivitäts-Heatmap im GitHub-Stil

## Demo

![Dashboard Demo](public/images/dashboard-demo.gif)


## Konfiguration

### 1. GitLab-API konfigurieren

Bearbeite `config/dashboardConfig.ts` und passe die folgenden Einstellungen an:

```typescript
export const GITLAB_CONFIG = {
    API_URL: 'https://gitlab.com/api/graphql',
    GROUP_PATH: 'your-group/your-project', // Durch den Pfad deiner GitLab-Gruppe/deines Projekts ersetzen
    TOKEN: 'your-gitlab-token', // Durch deinen persönlichen GitLab-Access-Token ersetzen
    ISSUE_BASE_URL: 'https://gitlab.com/your-group/your-project/-/issues'
} as const;
```

#### GitLab-Token erstellen

1. In GitLab auf Settings → Access Tokens gehen
2. Einen neuen Token mit dem Scope `read_api` erstellen
3. Den Token kopieren und in die Konfigurationsdatei einfügen

### 2. Teammitglieder konfigurieren

Passe die Liste der Teammitglieder in `config/dashboardConfig.ts` an:

```typescript
export const TEAM_MEMBERS = [
    "username1",
    "username2", 
    "username3",
    // Alle Benutzernamen der Teammitglieder ergänzen
] as const;
```

### 3. Zeitraum konfigurieren

Passe den Zeitraum in `app/page.tsx` an:

```typescript
// Gewünschten Zeitraum festlegen
const startDate = new Date('2024-01-01'); // Startdatum
const endDate = new Date('2024-12-31');   // Enddatum
```

### 4. Kategorien konfigurieren

Das Dashboard verwendet diese Standardkategorien. Du kannst sie in `config/dashboardConfig.ts` ändern:

```typescript
export const CATEGORIES = {
    REQUIREMENTS_ENGINEERING: "Requirements Engineering",
    ENTWURF: "Entwurf", 
    IMPLEMENTATION_TEST: "Implementation & Test",
    PROJEKTMANAGEMENT: "Projektmanagement"
} as const;
```



> [!WARNING]  
> Stelle sicher, dass deine GitLab-Issues Labels haben, die zu diesen Kategorien passen.
> 

## Mitwirken

Wenn du das Projekt verbessern möchtest, erstelle gern einen Fork :)

## Support
Wenn du Hilfe bei der Einrichtung brauchst (zum Beispiel beim API-Key oder beim Hinzufügen der Labels zu den GitLab-Issues), schreib mir gern auf Discord:
[cubepixels](https://discord.com/users/cubepixels)
