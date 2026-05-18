# KnowFlow AI – Demo

Klickbare React-Demo eines KI-Tools für Wissenssicherung & Onboarding in KMUs (Produktion / Handwerk, 30–300 MA).

**Stack:** React 18 · TypeScript · Tailwind CSS · Vite · lucide-react.
Kein Backend, keine Datenbank – alles läuft mit lokalen Mock-Daten in `src/App.tsx`.

## Funktionen

1. **Dashboard** – KPIs, Renteneintritts-Risiko, Live-Aktivität
2. **Wissensaufnahme** – Freitext → strukturierter Eintrag (Problem / Ursache / Lösung / Sicherheit / Maschine / Erfahrungslevel)
3. **KI-Interview-Assistent** – 6 Leitfragen, generiert daraus ein Wissensprofil
4. **SOP-Generator** – Aus jedem Eintrag entsteht eine SOP (Zweck, Werkzeuge, Schritte, Fehler, Sicherheit, Qualitätscheck)
5. **Onboarding** – 5-Tage-Lernpfad mit Fortschrittsanzeige
6. **KI-Wissensassistent** – Chat-Oberfläche mit Quellenangaben aus den Demo-Daten

## Lokal starten

Voraussetzung: **Node.js ≥ 18** und **npm**.

```bash
cd knowflow-ai
npm install
npm run dev
```

Die App öffnet sich automatisch unter http://localhost:5173.

## Build für Produktion

```bash
npm run build
npm run preview
```

## Projektstruktur

```
knowflow-ai/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── src/
    ├── main.tsx        # Einstiegspunkt
    ├── index.css       # Tailwind + Globals
    └── App.tsx         # Komplette App (alle 6 Bereiche)
```

Komplette UI-Logik, Mock-Daten und simulierte „KI"-Funktionen liegen in **`src/App.tsx`**.
