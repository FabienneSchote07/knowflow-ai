import { useMemo, useRef, useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Mic,
  MessageSquareText,
  FileText,
  GraduationCap,
  Bot,
  Search,
  Plus,
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Wrench,
  Factory,
  User,
  ChevronRight,
  PlayCircle,
  Loader2,
  Settings,
  Bell,
  ClipboardList,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Clock,
  Award,
  Filter,
  Download,
  Brain,
  Cpu,
  Wand2,
  Workflow,
  Zap,
  ScanLine,
  Target,
  XCircle,
  Layers,
  Quote,
  Save,
  RefreshCcw,
  Square,
  Activity,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Users,
  ShieldCheck,
  Timer,
  Flame,
  BarChart3,
  Calendar,
  AlertOctagon,
  Eye,
  Hourglass,
  Radar,
} from 'lucide-react'

/* ============================================================================
   KnowFlow AI – Demo App
   Wissenssicherung & Onboarding für KMUs
   Single-file React + TypeScript + Tailwind demo (mock data only)
   ========================================================================== */

// ---------- Types -----------------------------------------------------------

type Section =
  | 'dashboard'
  | 'capture'
  | 'interview'
  | 'sop'
  | 'onboarding'
  | 'assistant'

interface KnowledgeEntry {
  id: string
  title: string
  problem: string
  cause: string
  solution: string
  safety: string
  machine: string
  experienceLevel: 'Anfänger' | 'Fortgeschritten' | 'Experte'
  author: string
  createdAt: string
  tags: string[]
  // Enhanced AI output
  sopRecommendation?: string
  trainingModule?: string
  beginnerMistakes?: string[]
  confidence?: number
  sourceQuote?: string
}

interface SOP {
  id: string
  title: string
  purpose: string
  tools: string[]
  steps: string[]
  commonMistakes: string[]
  safety: string[]
  qualityCheck: string[]
  basedOn: string
}

interface OnboardingDay {
  day: number
  title: string
  description: string
  topics: string[]
  done: boolean
}

// ---------- Assistant chat types --------------------------------------------

type RiskLevel = 'low' | 'medium' | 'high'

interface SourceRef {
  expertName: string
  expertRole: string
  date: string
  entryTitle: string
}

interface RelatedRef {
  type: 'sop' | 'training' | 'entry'
  title: string
  meta?: string
}

interface StructuredAnswer {
  diagnosis: string
  cause: string
  steps: string[]
  safety: string
  sopRef?: { title: string }
  trainingHint?: string
  sources: SourceRef[]
  confidence: number
  risk: RiskLevel
  related: RelatedRef[]
  tags: string[]
}

interface AssistantThinking {
  done: number[]
  active: number | null
}

interface ChatMsg {
  id: string
  role: 'user' | 'assistant'
  content?: string // welcome / fallback / user question
  answer?: StructuredAnswer
  question?: string // mirror of the user question on assistant msg, for context header
  thinking?: AssistantThinking
  ts: string
}

interface InterviewQA {
  question: string
  answer: string
}

// ---------- Mock Data -------------------------------------------------------

const initialKnowledgeEntries: KnowledgeEntry[] = [
  {
    id: 'k1',
    title: 'Vibration an Maschine X bei Aluminium',
    problem:
      'CNC-Fräse X vibriert spürbar bei der Bearbeitung von Aluminiumwerkstücken über 200 mm.',
    cause:
      'Zu hoher Vorschub bei zu geringer Spindeldrehzahl in Kombination mit unzureichend gespanntem Werkstück.',
    solution:
      'Spindeldrehzahl auf 8.500 U/min erhöhen, Vorschub auf 1.200 mm/min reduzieren und Werkstück mit zusätzlichem Spannpratzen-Set sichern.',
    safety:
      'Maschine vor jeder Korrektur stoppen. Schutzbrille tragen. Späne nie mit der Hand entfernen.',
    machine: 'CNC-Fräse X-2000',
    experienceLevel: 'Experte',
    author: 'Heinz Müller',
    createdAt: '2026-04-12',
    tags: ['Vibration', 'Aluminium', 'Fräsen'],
  },
  {
    id: 'k2',
    title: 'Schweißnaht-Porosität bei Edelstahl',
    problem:
      'Schweißnähte an dünnem Edelstahl (1,5 mm) weisen sichtbare Poren auf.',
    cause:
      'Schutzgas-Durchfluss zu gering oder Zugluft am Arbeitsplatz beeinträchtigt die Gasabschirmung.',
    solution:
      'Schutzgas auf 12–14 l/min einstellen, Zugluftquellen abdichten, Werkstück gründlich entfetten.',
    safety:
      'Absaugung einschalten. Geeigneten Schweißerschutz tragen. Brandgefahr in 5 m Radius prüfen.',
    machine: 'WIG-Schweißanlage S-450',
    experienceLevel: 'Fortgeschritten',
    author: 'Petra Schäfer',
    createdAt: '2026-03-28',
    tags: ['Schweißen', 'Edelstahl', 'Qualität'],
  },
  {
    id: 'k3',
    title: 'Filterwechsel Lackieranlage',
    problem:
      'Lackoberfläche zeigt nach 3 Wochen Betrieb feine Partikel-Einschlüsse.',
    cause:
      'Vorfilter der Lackieranlage ist gesättigt, Hauptfilter dadurch überlastet.',
    solution:
      'Vorfilter alle 2 Wochen wechseln (Mo-Schicht), Hauptfilter alle 3 Monate. Kabinendruck-Differenz dokumentieren.',
    safety:
      'Anlage spannungsfrei schalten. Atemschutzmaske FFP3. Filter als Sondermüll entsorgen.',
    machine: 'Lackierkabine L-Pro 3',
    experienceLevel: 'Anfänger',
    author: 'Jürgen Bachmann',
    createdAt: '2026-04-30',
    tags: ['Wartung', 'Lackieren', 'Qualität'],
  },
]

const initialSOPs: SOP[] = [
  {
    id: 'sop1',
    title: 'SOP: Behebung Vibrationen an CNC-Fräse X bei Aluminium',
    purpose:
      'Stabile, vibrationsfreie Bearbeitung von Aluminiumwerkstücken über 200 mm sicherstellen.',
    tools: [
      'Drehmomentschlüssel 10–60 Nm',
      'Spannpratzen-Set (Größe M12)',
      'Maßband / Messschieber',
      'Schutzbrille & Gehörschutz',
    ],
    steps: [
      'Maschine in den sicheren Zustand versetzen (NOT-AUS bestätigen).',
      'Werkstück lösen, Auflagefläche und Spannpratzen reinigen.',
      'Werkstück neu ausrichten und mit Drehmomentschlüssel (40 Nm) spannen.',
      'Programm öffnen: Vorschub auf 1.200 mm/min, Spindeldrehzahl auf 8.500 U/min anpassen.',
      'Testlauf ohne Werkstück durchführen, Geräusche prüfen.',
      'Probelauf mit Werkstück, Maßhaltigkeit nach 50 mm Schnitt kontrollieren.',
    ],
    commonMistakes: [
      'Vorschub und Drehzahl gleichzeitig ändern, ohne Testlauf.',
      'Spannpratzen zu fest anziehen → Werkstück verformt sich.',
      'Schutzbrille während des Probelaufs nicht tragen.',
    ],
    safety: [
      'Vor jeder Anpassung Maschine stoppen.',
      'Späne nie mit der Hand entfernen – Spanhaken benutzen.',
      'Bei ungewöhnlichen Geräuschen sofort NOT-AUS.',
    ],
    qualityCheck: [
      'Oberflächenrauheit Ra < 1,6 µm prüfen.',
      'Maßtoleranz ±0,05 mm bestätigen.',
      'Visuelle Kontrolle auf Riefen oder Rattermuster.',
    ],
    basedOn: 'k1',
  },
]

const initialOnboarding: OnboardingDay[] = [
  {
    day: 1,
    title: 'Sicherheitsgrundlagen',
    description:
      'Werkschutz-Rundgang, persönliche Schutzausrüstung, NOT-AUS-Standorte, Erste-Hilfe-Stationen.',
    topics: [
      'Werksrundgang & Fluchtwege',
      'PSA – richtige Auswahl & Sitz',
      'NOT-AUS-Übung an 3 Maschinen',
      'Erste-Hilfe-Briefing',
    ],
    done: true,
  },
  {
    day: 2,
    title: 'Maschine X verstehen',
    description:
      'Aufbau, Steuerung und Sicherheitsfunktionen der CNC-Fräse X-2000.',
    topics: [
      'Hauptkomponenten & Schmierpunkte',
      'Bedienpanel-Übersicht',
      'Werkstückspannung',
      'Wartungsplan lesen',
    ],
    done: true,
  },
  {
    day: 3,
    title: 'Typische Fehler erkennen',
    description:
      'Häufige Probleme aus dem KnowFlow-Wissensschatz und wie man sie früh erkennt.',
    topics: [
      'Vibrationsmuster identifizieren',
      'Akustische Frühwarnsignale',
      'Maßabweichungen interpretieren',
      'Wann den Schichtleiter rufen',
    ],
    done: false,
  },
  {
    day: 4,
    title: 'Begleitetes Arbeiten',
    description: 'Erste Werkstücke unter Aufsicht eines erfahrenen Kollegen.',
    topics: [
      'Programm laden & überprüfen',
      'Werkstück einspannen',
      'Probelauf interpretieren',
      'Werkzeugwechsel',
    ],
    done: false,
  },
  {
    day: 5,
    title: 'Wissenstest',
    description: 'Praktische und theoretische Prüfung mit dem Schichtleiter.',
    topics: [
      'Theorie-Quiz (20 Fragen)',
      'Praxisübung an Probewerkstück',
      'Sicherheits-Szenarien',
      'Feedback-Gespräch',
    ],
    done: false,
  },
]

const interviewQuestionsLibrary: string[] = [
  'Welche Fehler machen neue Mitarbeiter an dieser Maschine am häufigsten?',
  'Woran erkennen Sie ein Problem frühzeitig – noch bevor es kritisch wird?',
  'Welche Sicherheitsregeln werden in der Praxis oft übersehen?',
  'Welche Erfahrung haben Sie gemacht, die in keinem Handbuch steht?',
  'Was würden Sie einem Kollegen am letzten Arbeitstag mitgeben?',
  'Welche Werkzeuge oder Hilfsmittel nutzen Sie, die offiziell nicht vorgeschrieben sind?',
]

// ---------- Helpers ---------------------------------------------------------

const cls = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(' ')

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

// Mocked "AI": extract a richly structured entry from free text
function mockExtractKnowledge(text: string): Omit<KnowledgeEntry, 'id' | 'createdAt' | 'author'> {
  const lower = text.toLowerCase()
  const machine =
    /maschine\s*x|cnc|fräse/i.test(lower)
      ? 'CNC-Fräse X-2000'
      : /schwei(ß|ss)/i.test(lower)
      ? 'WIG-Schweißanlage S-450'
      : /lack/i.test(lower)
      ? 'Lackierkabine L-Pro 3'
      : 'Allgemein'

  const isVibration = /vibr/i.test(lower)
  const isAluminium = /alu/i.test(lower)
  const isSpannfutter = /spannfutt|spann|aufspann/i.test(lower)
  const isKuehlung = /kühl|kuehl|coolant/i.test(lower)

  const title = text.trim().split(/[.\n]/)[0].slice(0, 80) || 'Neuer Wissenseintrag'

  // Confidence is a feel-good signal; varies slightly so it looks real
  const confidence = isVibration ? 96 : isSpannfutter ? 94 : 89

  const problem = isVibration
    ? `Spürbare Vibrationen an ${machine} während der Bearbeitung${isAluminium ? ' von Aluminiumwerkstücken' : ''}. Symptome können Maßabweichungen, Rattermuster auf der Oberfläche und erhöhter Werkzeugverschleiß sein.`
    : `Beschriebenes Phänomen: „${text.trim().slice(0, 180)}${text.length > 180 ? '…' : ''}"`

  const cause = isSpannfutter
    ? 'Spannfutter überträgt Schwingungen — vermutlich verschlissene Spannbacken oder fehlerhafte Vorspannung. Sekundärfaktor: zu hoher Vorschub in Kombination mit niedriger Drehzahl.'
    : isVibration
    ? 'Zu hoher Vorschub bei unzureichender Spindeldrehzahl, oft kombiniert mit ungenügender Werkstückspannung.'
    : 'Ursache wird auf Basis der Beschreibung vermutet — bitte im Interview-Modus präzisieren.'

  const solution = isVibration
    ? `1. Drehzahl reduzieren${isSpannfutter ? ' und Spannfutter prüfen' : ''}.\n2. ${isKuehlung ? 'Kühlung & Kühlmittelfluss überprüfen' : 'Vorschub schrittweise anpassen'}.\n3. Werkstück nachspannen, Testlauf mit reduzierter Last starten.`
    : 'Erprobte Vorgehensweise aus Erfahrung des Experten dokumentieren und in einer SOP festhalten.'

  const safety = isVibration
    ? 'Maschine vor jeder Anpassung stoppen. Sicherheitsabstand wahren — Werkstück kann sich bei Vibration lösen. Schutzbrille und Gehörschutz Pflicht. Späne nie mit der Hand entfernen.'
    : 'Maschine vor Änderungen stoppen, PSA tragen, im Zweifel Schichtleiter informieren.'

  const sopRecommendation = isVibration
    ? 'SOP "Vibrations-Diagnose bei CNC-Fräse X" — 6 Schritte, geschätzte Bearbeitungszeit: 8 Minuten. Kann auf 3 weitere Maschinen übertragen werden.'
    : 'Aus diesem Eintrag lässt sich eine 5-Schritt-SOP ableiten. Generierung im SOP-Bereich.'

  const trainingModule = isVibration
    ? 'Micro-Learning "Vibration früh erkennen" (~6 Min): akustische Signale, taktile Prüfung, Maßabweichungs-Indikatoren. Quiz mit 4 Fragen.'
    : 'Trainingsmodul auf Basis dieses Eintrags — geeignet für Tag 3 des Onboardings.'

  const beginnerMistakes = isVibration
    ? [
        'Mehrere Parameter (Vorschub & Drehzahl) gleichzeitig ändern — Fehler­ursache nicht mehr nachvollziehbar.',
        'Vibration „aussitzen" statt sofort zu stoppen — führt zu Werkzeugbruch.',
        'Spannfutter nicht prüfen, bevor die Maschinenparameter angepasst werden.',
        'Probelauf in der laufenden Serie statt mit Probewerkstück.',
      ]
    : [
        'Erfahrung nicht ins System zurückspielen.',
        'Symptome dokumentieren, aber Ursache nicht hinterfragen.',
        'Sicherheits-Check vor der Anpassung überspringen.',
      ]

  return {
    title,
    problem,
    cause,
    solution,
    safety,
    machine,
    experienceLevel: 'Experte',
    tags: [
      isVibration ? 'Vibration' : 'Allgemein',
      isAluminium ? 'Aluminium' : '',
      isSpannfutter ? 'Spannfutter' : '',
      machine.split(' ')[0],
    ].filter(Boolean) as string[],
    sopRecommendation,
    trainingModule,
    beginnerMistakes,
    confidence,
    sourceQuote: text.trim(),
  }
}

// Mocked SOP generator from a knowledge entry
function mockGenerateSOP(entry: KnowledgeEntry): SOP {
  return {
    id: uid('sop'),
    title: `SOP: ${entry.title}`,
    purpose: `Standardisierte Vorgehensweise zur Lösung von "${entry.title}".`,
    tools: ['Geeignete PSA', 'Werkzeugkasten Standard', 'Messmittel (Messschieber / Drehmomentschlüssel)'],
    steps: [
      'Maschine in sicheren Zustand versetzen.',
      'Aktuellen Zustand dokumentieren (Foto, Notizen).',
      entry.solution,
      'Testlauf durchführen und Ergebnis prüfen.',
      'Erkenntnisse in KnowFlow aktualisieren.',
    ],
    commonMistakes: [
      'Mehrere Parameter gleichzeitig ändern.',
      'Ohne Testlauf direkt in die Serienfertigung gehen.',
      'Erfahrungswissen nicht zurück ins System geben.',
    ],
    safety: entry.safety.split('. ').filter(Boolean),
    qualityCheck: [
      'Maßtoleranz prüfen.',
      'Oberflächenqualität visuell und ggf. messtechnisch kontrollieren.',
      'Ergebnis im Schichtbuch dokumentieren.',
    ],
    basedOn: entry.id,
  }
}

// ---------- Assistant: cluster-based mock AI --------------------------------

interface AnswerCluster {
  id: string
  patterns: RegExp[]
  build: () => StructuredAnswer
}

const ANSWER_CLUSTERS: AnswerCluster[] = [
  {
    id: 'vibration',
    patterns: [/vibr/i, /ratter/i, /unruh/i, /(alu.*fräs|fräs.*alu)/i],
    build: () => ({
      diagnosis:
        'Klassisches Ratter-/Vibrations-Phänomen bei der Aluminium-Bearbeitung. In 8 von 10 dokumentierten Fällen verantwortlich: Spannfutter-Resonanz in Kombination mit einem ungünstigen Drehzahl-Vorschub-Verhältnis.',
      cause:
        'Spannfutter überträgt Schwingungen ins Werkstück, weil die Spannbacken verschmutzt oder verschlissen sind. Sekundär: Vorschub liegt über dem material-spezifischen Optimum und die Spindeldrehzahl ist zu niedrig — der Fräser "schneidet" nicht mehr, sondern "drückt".',
      steps: [
        'Maschine stoppen. NOT-AUS bestätigen und 30 Sekunden warten, bis das Werkzeug zum Stillstand kommt.',
        'Spannfutter visuell prüfen: Spannbacken sauber, kein Span im Spannraum, Werkstück sitzt mittig und plan auf.',
        'Drehzahl um 15-20 % reduzieren, Vorschub im gleichen Verhältnis nachziehen.',
        'Bei Werkstücken > 200 mm zusätzliche Spannpratze setzen (M12, 40 Nm mit Drehmomentschlüssel).',
        'Kühlmittelzufuhr prüfen — der Strahl muss voll auf die Schnittzone treffen.',
        'Testlauf mit Probewerkstück durchführen, akustisch & messtechnisch prüfen, erst dann zurück in die Serie.',
      ],
      safety:
        'Während Vibration grundsätzlich Abstand zur Maschine halten — das Werkstück kann sich aus der Spannung lösen. Kein Probelauf am laufenden Serienteil. Späne ausschließlich mit Spanhaken entfernen, niemals mit der Hand. Schutzbrille und Gehörschutz Pflicht.',
      sopRef: { title: 'SOP: Behebung Vibrationen an CNC-Fräse X bei Aluminium' },
      trainingHint:
        'Micro-Learning "Vibration früh erkennen" (~6 Min) — akustische Signale, taktile Prüfung, Maßabweichungs-Indikatoren. Empfohlen für Tag 3 des Onboardings.',
      sources: [
        {
          expertName: 'Heinz Müller',
          expertRole: 'Senior CNC-Programmierer · 28 Jahre',
          date: '12.04.2026',
          entryTitle: 'Vibration an Maschine X bei Aluminium',
        },
      ],
      confidence: 96,
      risk: 'medium',
      related: [
        { type: 'sop', title: 'SOP: Werkzeugwechsel CNC-Fräse X', meta: 'verwandte SOP' },
        { type: 'entry', title: 'Maßabweichung bei langen Werkstücken', meta: 'ähnlicher Fall' },
        { type: 'training', title: 'Schnittwert-Tabelle Aluminium', meta: 'Referenzdokument' },
      ],
      tags: ['Vibration', 'CNC', 'Aluminium', 'Spannfutter'],
    }),
  },
  {
    id: 'tool-wear',
    patterns: [/werkzeug.*verschle|verschle.*werkzeug/i, /standzeit/i, /werkzeugverschle/i],
    build: () => ({
      diagnosis:
        'Frühindikatoren für Werkzeugverschleiß lassen sich an drei Dingen erkennen: Geräusch, Oberflächenbild und Maßdrift. Wer alle drei beobachtet, erkennt Verschleiß ~30 Min. vor dem kritischen Punkt.',
      cause:
        'Standzeit-Überschreitung ist Hauptursache (60 %). Sekundär: unpassende Schnittwerte für das Material, gefolgt von Kühlmittel-Problemen.',
      steps: [
        'Akustisch prüfen: Wechsel von gleichmäßigem Schnittgeräusch zu "rauerem", quietschendem Ton ist Verschleiß-Indikator.',
        'Oberfläche des letzten Werkstücks visuell mit Referenz vergleichen (Riefen, matte Stellen).',
        'Maßprotokoll prüfen: Drift > 0,02 mm über 10 Teile = Werkzeug am Ende der Standzeit.',
        'Werkzeug im Mikroskop kontrollieren (10×) — Schneide soll definierte Kante haben, keine Ausbrüche.',
        'Bei Bestätigung: Werkzeug wechseln, in Werkzeugbuch dokumentieren mit Datum, Standzeit, Auffälligkeit.',
      ],
      safety:
        'Werkzeug nach Ausbau ist heiß (bis 80 °C). Mit Schutzhandschuhen greifen. Verschlissene Werkzeuge separat sammeln — nicht zurück in den allgemeinen Werkzeugschrank.',
      sopRef: { title: 'SOP: Werkzeugwechsel & Standzeit-Dokumentation' },
      trainingHint:
        'Praxis-Modul "Werkzeugverschleiß erkennen" mit 8 Referenzbildern und Hörproben.',
      sources: [
        {
          expertName: 'Heinz Müller',
          expertRole: 'Senior CNC-Programmierer',
          date: '03.03.2026',
          entryTitle: 'Standzeit-Indikatoren bei VHM-Fräsern',
        },
      ],
      confidence: 92,
      risk: 'low',
      related: [
        { type: 'entry', title: 'Schnittwert-Optimierung für Aluminium' },
        { type: 'sop', title: 'SOP: Werkzeugvermessung' },
      ],
      tags: ['Werkzeug', 'Verschleiß', 'Standzeit'],
    }),
  },
  {
    id: 'when-to-stop',
    patterns: [/wann.*stopp/i, /stoppen/i, /not[- ]?aus/i, /sofort.*halt/i],
    build: () => ({
      diagnosis:
        'Es gibt fünf eindeutige Sofort-Stopp-Kriterien für die CNC-Fräse X. Wenn eines davon eintritt, ist NOT-AUS Pflicht — kein "Erst-mal-fertig-machen".',
      cause:
        'In allen fünf Fällen droht entweder Personenschaden, Werkzeugbruch mit Folgeschäden oder Maschinenschaden im fünfstelligen Bereich.',
      steps: [
        'Stoppen bei sichtbarer Vibration oder Rattergeräuschen (siehe Vibrations-SOP).',
        'Stoppen bei plötzlich auftretendem Geruch (Schmieröl, verbrannt, Kunststoff).',
        'Stoppen bei Maßabweichung > 0,1 mm gegenüber dem letzten Messpunkt.',
        'Stoppen bei sichtbarem Späne-Aufbau am Werkzeug ("Vogelnest").',
        'Stoppen bei Kühlmittel-Druckabfall oder unterbrochenem Strahl.',
        'In allen Fällen: NOT-AUS, Schichtleiter informieren, Vorfall im Schichtbuch dokumentieren — auch bei vermeintlich harmlosen Auslösern.',
      ],
      safety:
        'Nach NOT-AUS Maschine NIE alleine wieder anfahren. Schichtleiter muss freigeben. 5-Minuten-Regel: Bei Schmierölgeruch erst nach 5 Min. wieder anfahren, vorher ggf. Belüftung prüfen.',
      sopRef: { title: 'SOP: Sofort-Stopp-Kriterien CNC-Fräse X' },
      trainingHint:
        'Pflicht-Modul "NOT-AUS Szenarien" für alle neuen Mitarbeiter in Tag 1 des Onboardings.',
      sources: [
        {
          expertName: 'Heinz Müller',
          expertRole: 'Senior CNC-Programmierer',
          date: '21.03.2026',
          entryTitle: 'Sofort-Stopp-Kriterien CNC-Fräse X',
        },
        {
          expertName: 'Werksleitung',
          expertRole: 'Sicherheitsrichtlinie SR-12',
          date: '01.01.2026',
          entryTitle: 'Werks-Sicherheitsstandard 2026',
        },
      ],
      confidence: 98,
      risk: 'high',
      related: [
        { type: 'sop', title: 'SOP: Vorgehen nach NOT-AUS' },
        { type: 'training', title: 'Tag 1 Onboarding: Sicherheit' },
      ],
      tags: ['Sicherheit', 'NOT-AUS', 'CNC'],
    }),
  },
  {
    id: 'spann-safety',
    patterns: [/spann.*sicher|sicher.*spann/i, /spannprob/i, /spannbacke/i, /(aufspann|werkstückaufnahme)/i],
    build: () => ({
      diagnosis:
        'Bei Spannproblemen ist die größte Gefahr nicht das fehlerhafte Werkstück, sondern das aus der Spannung gerissene Werkstück. Die Sicherheitsregeln haben Vorrang vor Produktionsdruck.',
      cause:
        'Verschmutzte Spannbacken (40 %), falsche Drehmoment-Anwendung (25 %), ungeeignete Spannmittel für die Werkstück-Geometrie (20 %), Verschleiß der Spannbacken (15 %).',
      steps: [
        'Vor jeder Aufspannung: Spannraum mit Druckluft ausblasen, Spannbacken auf Beschädigung prüfen.',
        'Werkstück planparallel auflegen — bei langen Teilen Auflage mit Wasserwaage prüfen.',
        'Drehmomentschlüssel verwenden: Standard 40 Nm für M12, niemals "nach Gefühl".',
        'Nach dem Spannen Werkstück durch leichten Schlag mit dem Kunststoffhammer auf Sitz prüfen — darf nicht klingen, sondern muss "dumpf" klingen.',
        'Bei Werkstücken > 200 mm IMMER zweite Spannpratze einsetzen.',
      ],
      safety:
        'Niemals den Spannraum greifen, solange die Maschine unter Strom ist. Bei Korrekturen die Spindel manuell verriegeln. Sicherheitsabstand 1 m beim Hochfahren. Schutzbrille bei jedem Spannvorgang.',
      sopRef: { title: 'SOP: Werkstück-Aufspannung CNC-Fräse X' },
      trainingHint:
        'Praxis-Workshop "Sicheres Spannen" — 45 Min mit Mentor, vorzugsweise Tag 4 des Onboardings.',
      sources: [
        {
          expertName: 'Heinz Müller',
          expertRole: 'Senior CNC-Programmierer',
          date: '12.04.2026',
          entryTitle: 'Vibration an Maschine X bei Aluminium',
        },
      ],
      confidence: 94,
      risk: 'high',
      related: [
        { type: 'sop', title: 'SOP: Drehmoment-Anwendung' },
        { type: 'entry', title: 'Spannfutter-Wartungsplan' },
      ],
      tags: ['Spannen', 'Sicherheit', 'CNC'],
    }),
  },
  {
    id: 'weld-porosity',
    patterns: [/schwei(ß|ss)/i, /poro/i, /schutzgas/i, /naht/i],
    build: () => ({
      diagnosis:
        'Porosität in Schweißnähten an dünnem Edelstahl ist meist ein Schutzgas-Problem. Der zweithäufigste Grund: Verunreinigung der Schweißkante.',
      cause:
        'Schutzgas-Durchfluss zu gering (< 12 l/min) oder Zugluft am Arbeitsplatz beeinträchtigt die Gasabschirmung. Bei Edelstahl ab 1,5 mm wirken sich beide Faktoren stark aus.',
      steps: [
        'Schutzgas-Durchfluss prüfen — Soll: 12-14 l/min für 1,5 mm Edelstahl.',
        'Zugluftquellen am Arbeitsplatz schließen (Tore, Lüfter, offene Fenster).',
        'Werkstück gründlich entfetten (Aceton oder Schweißreiniger).',
        'Schweißkante metallisch blank schleifen, sichtbar bis 5 mm beidseits der Naht.',
        'Probestück schweißen, anschließend Sichtprüfung mit 5x-Lupe auf Poren.',
      ],
      safety:
        'Absaugung einschalten. Brandgefahr in 5 m Radius prüfen. Geeigneten Schweißerschutz tragen — bei 1,5 mm Edelstahl mindestens Schutzstufe DIN 10.',
      sopRef: { title: 'SOP: WIG-Schweißen Edelstahl 1,5 mm' },
      trainingHint:
        'Modul "Schutzgas-Setup" mit interaktivem Quiz zu Durchflussraten.',
      sources: [
        {
          expertName: 'Petra Schäfer',
          expertRole: 'Schweißfachkraft · 18 Jahre',
          date: '28.03.2026',
          entryTitle: 'Schweißnaht-Porosität bei Edelstahl',
        },
      ],
      confidence: 95,
      risk: 'medium',
      related: [
        { type: 'sop', title: 'SOP: Schutzgas-Wechsel' },
        { type: 'entry', title: 'Edelstahl-Vorbehandlung' },
      ],
      tags: ['Schweißen', 'Edelstahl', 'Schutzgas'],
    }),
  },
  {
    id: 'paint-filter',
    patterns: [/lack/i, /filter/i, /(kabine|spritz)/i],
    build: () => ({
      diagnosis:
        'Feine Einschlüsse in der Lackoberfläche nach ~3 Wochen Betrieb deuten auf einen gesättigten Vorfilter hin. Der Hauptfilter wird dadurch überlastet und lässt Partikel durch.',
      cause:
        'Vorfilter ist ein Verschleißteil und muss alle 2 Wochen gewechselt werden — bei der aktuellen Produktion eher 12 Tage Standzeit.',
      steps: [
        'Anlage spannungsfrei schalten und 5 Min. nachlaufen lassen, bis Druck im System abgebaut ist.',
        'Vorfilter ausbauen, gesättigten Filter als Sondermüll entsorgen.',
        'Filterrahmen reinigen, neuen Vorfilter einsetzen.',
        'Hauptfilter sichtprüfen — bei Verfärbung ebenfalls wechseln (alle 3 Monate Routine).',
        'Kabinendruck-Differenz vor/nach Wechsel dokumentieren (Soll: 50-80 Pa).',
        'Probe-Lackierung auf Referenzblech, Oberfläche unter Schräglicht prüfen.',
      ],
      safety:
        'Anlage zwingend spannungsfrei schalten. Atemschutzmaske FFP3 beim Filterwechsel. Filter als Sondermüll entsorgen — nicht in den Hausmüll.',
      sopRef: { title: 'SOP: Filterwechsel Lackieranlage L-Pro 3' },
      trainingHint:
        'Tag-3-Modul "Wartungsroutinen Lackieranlage" inkl. Druck-Differenz-Messung.',
      sources: [
        {
          expertName: 'Jürgen Bachmann',
          expertRole: 'Lackiermeister · 22 Jahre',
          date: '30.04.2026',
          entryTitle: 'Filterwechsel Lackieranlage',
        },
      ],
      confidence: 93,
      risk: 'medium',
      related: [
        { type: 'sop', title: 'SOP: Kabinendruck-Justage' },
        { type: 'training', title: 'Wartungsplan Lackieranlage' },
      ],
      tags: ['Wartung', 'Lackieren', 'Filter'],
    }),
  },
]

function findStructuredAnswer(question: string): StructuredAnswer {
  for (const c of ANSWER_CLUSTERS) {
    if (c.patterns.some((p) => p.test(question))) return c.build()
  }
  // Fallback
  return {
    diagnosis:
      'Zu Ihrer Frage finde ich aktuell kein passendes Erfahrungswissen im Werkswissen-Speicher. Das ist eine Wissenslücke — ein gutes Signal, dass dieses Thema noch erfasst werden sollte.',
    cause:
      'Möglich: Das Wissen ist nur "im Kopf" eines erfahrenen Kollegen, aber noch nicht im KnowFlow-System dokumentiert.',
    steps: [
      'Erfahrenen Kollegen direkt befragen — für CNC: Heinz Müller, für Schweißen: Petra Schäfer, für Lack: Jürgen Bachmann.',
      'Wechseln Sie in den KI-Interview-Bereich und starten Sie ein strukturiertes Interview mit dem Experten.',
      'Aus dem Interview entsteht automatisch ein Wissenseintrag — danach beantworte ich diese Frage zuverlässig.',
    ],
    safety:
      'Im Zweifel die Maschine in den sicheren Zustand bringen und Schichtleiter informieren. Keine Improvisation bei sicherheitsrelevanten Themen.',
    trainingHint:
      'Erwägen Sie, dieses Thema als neues Onboarding-Modul anzulegen, sobald das Wissen erfasst ist.',
    sources: [],
    confidence: 38,
    risk: 'low',
    related: [
      { type: 'entry', title: 'Im Interview-Bereich neuen Eintrag erfassen', meta: 'Empfehlung' },
    ],
    tags: ['Wissenslücke'],
  }
}

const ASSISTANT_THINKING_STEPS: { id: number; label: string; icon: React.ReactNode; duration: number }[] = [
  { id: 1, label: 'Durchsuche Werkswissen...',           icon: <Search size={13} />,      duration: 650 },
  { id: 2, label: 'Identifiziere passende Experten...',   icon: <User size={13} />,        duration: 600 },
  { id: 3, label: 'Prüfe Sicherheitskontext...',          icon: <ShieldAlert size={13} />, duration: 600 },
  { id: 4, label: 'Verknüpfe SOPs & Training...',         icon: <Workflow size={13} />,    duration: 650 },
]

// ---------- Small UI primitives --------------------------------------------

function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cls(
        'rounded-2xl bg-white border border-slate-200 shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-3.5 py-2',
    lg: 'text-base px-5 py-2.5',
  }
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  }
  return (
    <button className={cls(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}

function Badge({
  children,
  tone = 'slate',
}: {
  children: React.ReactNode
  tone?: 'slate' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky'
}) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-800',
    rose: 'bg-rose-100 text-rose-700',
    sky: 'bg-sky-100 text-sky-700',
  }
  return (
    <span
      className={cls(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

function SectionHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// ---------- Sidebar ---------------------------------------------------------

function Sidebar({
  active,
  onChange,
}: {
  active: Section
  onChange: (s: Section) => void
}) {
  const items: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'capture', label: 'Wissensaufnahme', icon: <Mic size={18} /> },
    { id: 'interview', label: 'KI-Interview', icon: <MessageSquareText size={18} /> },
    { id: 'sop', label: 'SOP-Generator', icon: <FileText size={18} /> },
    { id: 'onboarding', label: 'Onboarding', icon: <GraduationCap size={18} /> },
    { id: 'assistant', label: 'KI-Wissensassistent', icon: <Bot size={18} /> },
  ]

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow">
            <Sparkles className="text-white" size={18} />
          </div>
          <div>
            <div className="font-semibold text-slate-900 leading-tight">KnowFlow AI</div>
            <div className="text-[11px] text-slate-500 leading-tight">Wissen. Gesichert.</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const isActive = active === it.id
          return (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={cls(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              <span className={cls(isActive ? 'text-indigo-600' : 'text-slate-400')}>
                {it.icon}
              </span>
              {it.label}
              {isActive && <ChevronRight size={14} className="ml-auto text-indigo-500" />}
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 p-3">
          <div className="flex items-center gap-2 text-indigo-900 text-sm font-semibold">
            <Lightbulb size={16} /> Tipp
          </div>
          <p className="text-xs text-indigo-900/80 mt-1 leading-snug">
            Bitte erfahrene Mitarbeiter wöchentlich um 10 Minuten Interviewzeit — daraus
            entstehen automatisch SOPs.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 px-1">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User size={16} className="text-slate-600" />
          </div>
          <div className="text-xs">
            <div className="font-medium text-slate-800">Fabienne S.</div>
            <div className="text-slate-500">Werksleitung</div>
          </div>
          <button className="ml-auto text-slate-400 hover:text-slate-600">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

// ---------- Top bar ---------------------------------------------------------

function TopBar({ section }: { section: Section }) {
  const titles: Record<Section, string> = {
    dashboard: 'Übersicht',
    capture: 'Wissen erfassen',
    interview: 'KI-Interview',
    sop: 'SOPs generieren',
    onboarding: 'Onboarding-Pfade',
    assistant: 'KI-Wissensassistent',
  }
  return (
    <div className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center px-6 sticky top-0 z-10">
      <div className="text-sm text-slate-500">KnowFlow AI</div>
      <ChevronRight size={14} className="text-slate-400 mx-2" />
      <div className="text-sm font-medium text-slate-800">{titles[section]}</div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Wissen durchsuchen..."
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 w-64"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>
      </div>
    </div>
  )
}

// ---------- 1) Dashboard (Executive Operations Cockpit) --------------------

type KpiTrend = 'up' | 'down' | 'flat'
type KpiTone = 'rose' | 'amber' | 'emerald' | 'indigo' | 'violet' | 'sky' | 'fuchsia' | 'orange'

interface Kpi {
  key: string
  label: string
  value: string
  unit?: string
  delta: string
  deltaTrend: KpiTrend
  deltaPositive: boolean // is the trend a good thing?
  icon: React.ReactNode
  tone: KpiTone
  spark: number[]
  aiBadge?: string
}

const TONE_BG: Record<KpiTone, string> = {
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  violet: 'bg-violet-50 text-violet-600',
  sky: 'bg-sky-50 text-sky-600',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-600',
  orange: 'bg-orange-50 text-orange-600',
}

const TONE_BAR: Record<KpiTone, string> = {
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  sky: 'bg-sky-500',
  fuchsia: 'bg-fuchsia-500',
  orange: 'bg-orange-500',
}

function Dashboard({
  entries,
  sops,
  onboarding,
  setSection,
}: {
  entries: KnowledgeEntry[]
  sops: SOP[]
  onboarding: OnboardingDay[]
  setSection: (s: Section) => void
}) {
  const securedQuote = Math.round(64 + (entries.length - 3) * 0.5)
  const onboardingDays = onboarding.length

  const kpis: Kpi[] = [
    {
      key: 'gaps',
      label: 'Kritische Wissenslücken',
      value: '7',
      delta: '+2 diese Woche',
      deltaTrend: 'up',
      deltaPositive: false,
      icon: <AlertOctagon size={16} />,
      tone: 'rose',
      spark: [3, 4, 4, 5, 5, 6, 7],
      aiBadge: 'KI erkannt',
    },
    {
      key: 'experts',
      label: 'Experten vor Renteneintritt',
      value: '3',
      unit: '/ 24 Mon.',
      delta: '1 in < 6 Monaten',
      deltaTrend: 'flat',
      deltaPositive: false,
      icon: <Users size={16} />,
      tone: 'orange',
      spark: [3, 3, 3, 3, 3, 3, 3],
      aiBadge: 'HR-Signal',
    },
    {
      key: 'secured',
      label: 'Wissenssicherungsquote',
      value: `${Math.min(securedQuote, 100)}%`,
      delta: '+12 % ggü. Q1',
      deltaTrend: 'up',
      deltaPositive: true,
      icon: <ShieldCheck size={16} />,
      tone: 'emerald',
      spark: [42, 48, 53, 56, 58, 62, securedQuote],
      aiBadge: 'KI-Bewertung',
    },
    {
      key: 'onboarding',
      label: 'Onboarding-Zeitersparnis',
      value: '−37%',
      delta: 'von 14 auf 9 Tage',
      deltaTrend: 'down',
      deltaPositive: true,
      icon: <Timer size={16} />,
      tone: 'indigo',
      spark: [14, 13, 12, 11, 10, 9, 9],
      aiBadge: 'Hochrechnung',
    },
    {
      key: 'sops',
      label: 'Automatisch generierte SOPs',
      value: String(sops.length + 17),
      delta: '+5 diese Woche',
      deltaTrend: 'up',
      deltaPositive: true,
      icon: <Workflow size={16} />,
      tone: 'violet',
      spark: [6, 8, 10, 12, 14, 16, sops.length + 17],
      aiBadge: 'KI generiert',
    },
    {
      key: 'safety',
      label: 'Sicherheitsrisiken erkannt',
      value: '4',
      delta: '2 dringend',
      deltaTrend: 'up',
      deltaPositive: false,
      icon: <ShieldAlert size={16} />,
      tone: 'amber',
      spark: [1, 2, 2, 3, 3, 4, 4],
      aiBadge: 'Auto-Scan',
    },
    {
      key: 'unsecured',
      label: 'Ungesicherte Prozesse',
      value: '12',
      unit: '/ 73',
      delta: '−3 ggü. Vormonat',
      deltaTrend: 'down',
      deltaPositive: true,
      icon: <Eye size={16} />,
      tone: 'fuchsia',
      spark: [18, 17, 16, 15, 14, 13, 12],
      aiBadge: 'KI-Analyse',
    },
    {
      key: 'training',
      label: 'Trainingsmodule erstellt',
      value: `${onboardingDays + 19}`,
      delta: '+3 diese Woche',
      deltaTrend: 'up',
      deltaPositive: true,
      icon: <GraduationCap size={16} />,
      tone: 'sky',
      spark: [10, 12, 14, 16, 18, 22, onboardingDays + 19],
      aiBadge: 'KI generiert',
    },
  ]

  return (
    <div className="relative">
      {/* ambient decoration */}
      <div className="pointer-events-none absolute -top-16 -right-10 w-80 h-80 rounded-full bg-indigo-300/25 kf-blob" />
      <div className="pointer-events-none absolute top-40 -left-10 w-72 h-72 rounded-full bg-fuchsia-300/20 kf-blob" style={{ animationDelay: '3s' }} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge tone="indigo">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1 animate-pulse" />
                Live · Mai 2026
              </Badge>
              <Badge tone="emerald">
                <Sparkles size={11} className="mr-1" /> KnowFlow KI aktiv
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Willkommen zurück, Fabienne
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 max-w-2xl">
              Ihr Werkswissen auf einen Blick. Die KI hat seit Ihrer letzten Sitzung{' '}
              <span className="font-medium text-slate-700">5 neue SOPs</span> generiert und{' '}
              <span className="font-medium text-rose-700">2 Sicherheitsrisiken</span> erkannt.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setSection('capture')}>
              <Plus size={16} /> Wissen erfassen
            </Button>
            <button
              onClick={() => setSection('interview')}
              className={cls(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white',
                'bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600',
                'shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow',
              )}
            >
              <PlayCircle size={16} /> Interview starten
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.key} kpi={kpi} index={i} />
          ))}
        </div>

        {/* 2-col: Knowledge Risk + AI Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
          <KnowledgeRisk />
          <AIInsights />
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  )
}

// ---------- KpiCard ---------------------------------------------------------

function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const TrendIcon =
    kpi.deltaTrend === 'up'
      ? ArrowUpRight
      : kpi.deltaTrend === 'down'
      ? ArrowDownRight
      : ArrowRight
  const trendClass =
    kpi.deltaPositive
      ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
      : 'text-rose-700 bg-rose-50 border-rose-100'

  return (
    <div
      className="kf-stagger"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="group relative rounded-2xl bg-white border border-slate-200 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-300 overflow-hidden">
        {/* top accent gradient (subtle, visible on hover) */}
        <div className={cls(
          'absolute top-0 left-5 right-5 h-px bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity',
          kpi.tone === 'rose' && 'from-rose-500 to-rose-300',
          kpi.tone === 'amber' && 'from-amber-500 to-amber-300',
          kpi.tone === 'emerald' && 'from-emerald-500 to-emerald-300',
          kpi.tone === 'indigo' && 'from-indigo-500 to-indigo-300',
          kpi.tone === 'violet' && 'from-violet-500 to-violet-300',
          kpi.tone === 'sky' && 'from-sky-500 to-sky-300',
          kpi.tone === 'fuchsia' && 'from-fuchsia-500 to-fuchsia-300',
          kpi.tone === 'orange' && 'from-orange-500 to-orange-300',
        )} />

        <div className="flex items-start justify-between mb-3">
          <div className={cls('w-9 h-9 rounded-lg flex items-center justify-center', TONE_BG[kpi.tone])}>
            {kpi.icon}
          </div>
          {kpi.aiBadge && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-600">
              <Sparkles size={9} className="text-indigo-500" /> {kpi.aiBadge}
            </div>
          )}
        </div>

        <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
          {kpi.label}
        </div>

        <div className="flex items-end justify-between gap-3 mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <div className="text-[32px] leading-none font-semibold text-slate-900 tabular-nums tracking-tight">
              {kpi.value}
            </div>
            {kpi.unit && <div className="text-xs text-slate-400 font-medium">{kpi.unit}</div>}
          </div>
          <Sparkline data={kpi.spark} tone={kpi.tone} />
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <div className={cls('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border font-medium', trendClass)}>
            <TrendIcon size={10} />
            {kpi.delta}
          </div>
        </div>
      </div>
    </div>
  )
}

function Sparkline({ data, tone }: { data: number[]; tone: KpiTone }) {
  const max = Math.max(...data) || 1
  return (
    <div className="flex items-end gap-0.5 h-7" aria-hidden>
      {data.map((d, i) => (
        <div
          key={i}
          className={cls('w-1 rounded-sm transition-all', TONE_BAR[tone], i < data.length - 1 ? 'opacity-50' : 'opacity-100')}
          style={{ height: `${Math.max((d / max) * 100, 14)}%` }}
        />
      ))}
    </div>
  )
}

// ---------- KnowledgeRisk ---------------------------------------------------

interface ExpertRisk {
  name: string
  role: string
  yearsExp: number
  retireDate: string // e.g. "09/2026"
  monthsLeft: number
  coverage: number // 0-100
  criticality: number // 0-100
  knowledgeLoss: string[]
  riskLabel: 'kritisch' | 'hoch' | 'mittel'
  avatarFrom: string
  avatarTo: string
}

const EXPERTS: ExpertRisk[] = [
  {
    name: 'Heinz Müller',
    role: 'Senior CNC-Programmierer',
    yearsExp: 28,
    retireDate: '09/2026',
    monthsLeft: 4,
    coverage: 42,
    criticality: 96,
    knowledgeLoss: ['8 ungesicherte CNC-Prozesse', '14 Experten-Kniffe', '3 Maschinen ohne Backup'],
    riskLabel: 'kritisch',
    avatarFrom: 'from-rose-400',
    avatarTo: 'to-orange-500',
  },
  {
    name: 'Petra Schäfer',
    role: 'Schweißfachkraft',
    yearsExp: 18,
    retireDate: '06/2027',
    monthsLeft: 13,
    coverage: 67,
    criticality: 71,
    knowledgeLoss: ['5 spezielle Schweißverfahren', 'Qualitäts-Heuristiken Edelstahl'],
    riskLabel: 'hoch',
    avatarFrom: 'from-amber-400',
    avatarTo: 'to-orange-500',
  },
  {
    name: 'Jürgen Bachmann',
    role: 'Lackiermeister',
    yearsExp: 22,
    retireDate: '03/2028',
    monthsLeft: 22,
    coverage: 84,
    criticality: 38,
    knowledgeLoss: ['Wartungs-Heuristiken Lackieranlage'],
    riskLabel: 'mittel',
    avatarFrom: 'from-emerald-400',
    avatarTo: 'to-teal-500',
  },
]

function KnowledgeRisk() {
  return (
    <Card className="p-5 xl:col-span-2 relative overflow-hidden">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow">
              <Flame className="text-white" size={16} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Kritisches Wissensrisiko</h2>
            <Badge tone="rose">1 kritisch · 1 hoch · 1 mittel</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Experten, deren Erfahrungswissen in den nächsten 24 Monaten verloren gehen könnte
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Calendar size={14} /> Interview-Plan
        </Button>
      </div>

      <div className="space-y-3">
        {EXPERTS.map((e, i) => (
          <ExpertCard key={e.name} expert={e} index={i} />
        ))}
      </div>
    </Card>
  )
}

function ExpertCard({ expert, index }: { expert: ExpertRisk; index: number }) {
  const isCritical = expert.riskLabel === 'kritisch'
  const isHigh = expert.riskLabel === 'hoch'
  const riskColor = isCritical ? 'rose' : isHigh ? 'amber' : 'emerald'

  // Knowledge loss prognosis: 100 - coverage = % at risk
  const lossPct = 100 - expert.coverage

  return (
    <div
      className="kf-stagger"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={cls(
          'relative rounded-2xl border p-4 overflow-hidden transition-all hover:shadow-md',
          isCritical && 'bg-gradient-to-r from-rose-50 via-rose-50/40 to-white border-rose-200',
          isHigh && 'bg-gradient-to-r from-amber-50 via-amber-50/30 to-white border-amber-200',
          !isCritical && !isHigh && 'bg-white border-slate-200',
        )}
      >
        {/* Pulsing ring for critical */}
        {isCritical && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold text-rose-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            Dringend sichern
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className={cls(
            'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-sm font-semibold shadow-md shrink-0',
            expert.avatarFrom,
            expert.avatarTo,
          )}>
            {expert.name.split(' ').map((n) => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="font-semibold text-slate-900">{expert.name}</div>
              <Badge tone={riskColor as 'rose' | 'amber' | 'emerald'}>
                Risiko: {expert.riskLabel}
              </Badge>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {expert.role} · {expert.yearsExp} Jahre Erfahrung · Renteneintritt {expert.retireDate}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              <Stat
                label="Verbleibend"
                value={`${expert.monthsLeft}`}
                unit="Mon."
                icon={<Hourglass size={11} />}
                accent={isCritical ? 'text-rose-700' : 'text-slate-900'}
              />
              <Stat
                label="Abgedeckt"
                value={`${expert.coverage}%`}
                icon={<ShieldCheck size={11} />}
                accent="text-slate-900"
              />
              <Stat
                label="Kritikalität"
                value={String(expert.criticality)}
                unit="/100"
                icon={<Radar size={11} />}
                accent={isCritical ? 'text-rose-700' : isHigh ? 'text-amber-700' : 'text-slate-900'}
              />
            </div>

            {/* Coverage bar with gradient */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-500">Wissensabdeckung</span>
                <span className="text-slate-700 font-medium">{expert.coverage}% gesichert · {lossPct}% Risiko</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cls(
                    'h-full rounded-full transition-all',
                    isCritical && 'bg-gradient-to-r from-rose-500 to-orange-500',
                    isHigh && 'bg-gradient-to-r from-amber-500 to-yellow-500',
                    !isCritical && !isHigh && 'bg-gradient-to-r from-emerald-500 to-teal-500',
                  )}
                  style={{ width: `${expert.coverage}%` }}
                />
              </div>
            </div>

            {/* Knowledge loss prognosis */}
            <div className="mt-3 p-2.5 rounded-lg bg-white/60 border border-slate-100">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                <Eye size={10} /> Wissensverlust-Prognose bei Renteneintritt
              </div>
              <div className="flex flex-wrap gap-1.5">
                {expert.knowledgeLoss.map((l) => (
                  <span
                    key={l}
                    className={cls(
                      'inline-flex items-center text-[11px] px-2 py-0.5 rounded-full border',
                      isCritical && 'bg-rose-50 border-rose-100 text-rose-800',
                      isHigh && 'bg-amber-50 border-amber-100 text-amber-800',
                      !isCritical && !isHigh && 'bg-slate-50 border-slate-100 text-slate-700',
                    )}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              className={cls(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all',
                isCritical
                  ? 'text-white bg-gradient-to-r from-rose-600 to-orange-500 shadow-md shadow-rose-500/30 hover:shadow-rose-500/50'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200',
              )}
            >
              {isCritical ? <Flame size={12} /> : <Calendar size={12} />}
              {isCritical ? 'Dringend sichern' : 'Interview planen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  unit,
  icon,
  accent,
}: {
  label: string
  value: string
  unit?: string
  icon?: React.ReactNode
  accent?: string
}) {
  return (
    <div className="rounded-lg bg-white/70 border border-slate-100 p-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
        {icon} {label}
      </div>
      <div className={cls('mt-0.5 flex items-baseline gap-1', accent ?? 'text-slate-900')}>
        <span className="text-base font-semibold tabular-nums">{value}</span>
        {unit && <span className="text-[10px] text-slate-400 font-medium">{unit}</span>}
      </div>
    </div>
  )
}

// ---------- AI Insights -----------------------------------------------------

interface Insight {
  headline: string
  detail: string
  impact: 'Hoch' | 'Mittel' | 'Niedrig'
  category: string
  icon: React.ReactNode
  toneAccent: string // gradient classes for the icon
}

const INSIGHTS: Insight[] = [
  {
    headline: '68 % des CNC-Wissens hängen an 2 Mitarbeitern',
    detail: 'Heinz M. und ein weiterer CNC-Programmierer halten gemeinsam den Großteil des kritischen Spezialwissens. Konzentrationsrisiko vor Renteneintritt.',
    impact: 'Hoch',
    category: 'Konzentrationsrisiko',
    icon: <Users size={14} />,
    toneAccent: 'from-rose-500 to-orange-500',
  },
  {
    headline: 'Schweißbereich hat höchste Wissensdichte',
    detail: '47 Einträge auf 9 Personen — sehr robust gegen Personalausfall, aber Wachstumspotenzial für Cross-Training mit CNC.',
    impact: 'Mittel',
    category: 'Wissensverteilung',
    icon: <BarChart3 size={14} />,
    toneAccent: 'from-violet-500 to-fuchsia-500',
  },
  {
    headline: 'Onboarding-Dauer reduzierbar um 37 %',
    detail: 'Hochrechnung über die letzten 6 Onboardings: bei voller Nutzung der KI-generierten Module sinkt die Time-to-Productivity von 14 auf 9 Tage.',
    impact: 'Hoch',
    category: 'Effizienzpotenzial',
    icon: <Timer size={14} />,
    toneAccent: 'from-indigo-500 to-violet-500',
  },
  {
    headline: '3 sicherheitskritische Prozesse noch ungesichert',
    detail: 'WIG-Notfall, Spannfutter-Diagnose und Filter-Wechsel haben dokumentierte Risiken, aber keine vollständige SOP. Compliance-Empfehlung.',
    impact: 'Hoch',
    category: 'Sicherheit & Compliance',
    icon: <ShieldAlert size={14} />,
    toneAccent: 'from-amber-500 to-rose-500',
  },
]

function AIInsights() {
  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow">
              <Brain className="text-white" size={16} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Strategische KI-Erkenntnisse</h2>
          </div>
          <p className="text-xs text-slate-500">
            Was die KI aus Ihrem Werkswissen ableitet
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {INSIGHTS.map((ins, i) => (
          <InsightCard key={ins.headline} insight={ins} index={i} />
        ))}
      </div>

      <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs font-medium text-indigo-700 hover:text-indigo-900 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
        Alle Erkenntnisse ansehen <ArrowRight size={12} />
      </button>
    </Card>
  )
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const impactTone =
    insight.impact === 'Hoch' ? 'rose' :
    insight.impact === 'Mittel' ? 'amber' : 'emerald'

  return (
    <div
      className="kf-stagger group relative p-3 rounded-xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={cls('absolute top-0 left-3 right-3 h-px bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity', insight.toneAccent)} />

      <div className="flex items-start gap-2.5">
        <div className={cls('w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0', insight.toneAccent)}>
          {insight.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              {insight.category}
            </span>
            <Badge tone={impactTone as 'rose' | 'amber' | 'emerald'}>Impact: {insight.impact}</Badge>
          </div>
          <div className="text-sm font-semibold text-slate-900 leading-snug">
            {insight.headline}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.detail}
          </div>
          <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Aktion vorschlagen <ChevronRight size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- ActivityFeed ----------------------------------------------------

type ActivityCategory = 'Sicherheit' | 'Automation' | 'Erfassung' | 'Onboarding' | 'Risiko' | 'Mustererkennung' | 'Training'

interface ActivityEvent {
  text: React.ReactNode
  category: ActivityCategory
  time: string
  status: 'success' | 'warning' | 'info' | 'critical'
}

const ACTIVITY_EVENTS: ActivityEvent[] = [
  {
    text: (<><span className="font-medium">KI hat Sicherheitslücke erkannt:</span> WIG-Schweißen ohne dokumentierten Notfall-Plan</>),
    category: 'Sicherheit',
    time: 'vor 8 Min.',
    status: 'critical',
  },
  {
    text: (<><span className="font-medium">SOP automatisch generiert:</span> "Vibrations-Diagnose CNC-Fräse X"</>),
    category: 'Automation',
    time: 'vor 23 Min.',
    status: 'success',
  },
  {
    text: (<><span className="font-medium">Wissensprofil erstellt</span> für Heinz Müller (CNC-Senior) — 14 Einträge konsolidiert</>),
    category: 'Erfassung',
    time: 'vor 1 Std.',
    status: 'info',
  },
  {
    text: (<><span className="font-medium">Onboarding-Pfad generiert</span> für Tom Krüger (Maschinenbediener) — 5 Tage</>),
    category: 'Onboarding',
    time: 'vor 2 Std.',
    status: 'info',
  },
  {
    text: (<><span className="font-medium">Expertenwissen als kritisch markiert:</span> Spannfutter-Justage CNC-Fräse X</>),
    category: 'Risiko',
    time: 'vor 3 Std.',
    status: 'warning',
  },
  {
    text: (<><span className="font-medium">Werkzeugverschleiß-Muster erkannt:</span> VHM-Fräser Standzeit aktuell −22 % unter Referenz</>),
    category: 'Mustererkennung',
    time: 'vor 4 Std.',
    status: 'warning',
  },
  {
    text: (<><span className="font-medium">5 neue Wissens-Einträge</span> aus Interview mit Petra Schäfer</>),
    category: 'Erfassung',
    time: 'gestern, 16:42',
    status: 'success',
  },
  {
    text: (<><span className="font-medium">Trainingsmodul aktualisiert:</span> "Sichere Spannung CNC" — Version 2.1</>),
    category: 'Training',
    time: 'gestern, 14:08',
    status: 'info',
  },
]

const CAT_STYLE: Record<ActivityCategory, { bg: string; text: string; icon: React.ReactNode }> = {
  Sicherheit:       { bg: 'bg-rose-100',    text: 'text-rose-700',    icon: <ShieldAlert size={11} /> },
  Automation:       { bg: 'bg-violet-100',  text: 'text-violet-700',  icon: <Workflow size={11} /> },
  Erfassung:        { bg: 'bg-indigo-100',  text: 'text-indigo-700',  icon: <Mic size={11} /> },
  Onboarding:       { bg: 'bg-sky-100',     text: 'text-sky-700',     icon: <GraduationCap size={11} /> },
  Risiko:           { bg: 'bg-amber-100',   text: 'text-amber-700',   icon: <Flame size={11} /> },
  Mustererkennung:  { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', icon: <Radar size={11} /> },
  Training:         { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <BookOpen size={11} /> },
}

const STATUS_DOT: Record<ActivityEvent['status'], string> = {
  success:  'bg-emerald-500',
  warning:  'bg-amber-500',
  info:     'bg-indigo-500',
  critical: 'bg-rose-500',
}

function ActivityFeed() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <Activity className="text-white" size={16} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">KI-Aktivitätsfeed</h2>
            <p className="text-[11px] text-slate-500">Was die KI gerade in Ihrem Werk tut</p>
          </div>
          <Badge tone="emerald">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Filter size={13} /> Alle Kategorien
        </div>
      </div>

      <ul className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" aria-hidden />
        {ACTIVITY_EVENTS.map((evt, i) => {
          const cat = CAT_STYLE[evt.category]
          return (
            <li
              key={i}
              className="kf-stagger relative flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Timeline dot */}
              <div className="relative z-10 mt-1 shrink-0">
                <span className={cls('block w-[15px] h-[15px] rounded-full ring-4 ring-white', STATUS_DOT[evt.status])} />
              </div>
              <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                    <span className={cls('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold', cat.bg, cat.text)}>
                      {cat.icon} {evt.category}
                    </span>
                    {evt.status === 'critical' && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-rose-100 text-rose-700">
                        <AlertOctagon size={10} /> Sofort prüfen
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-800 leading-snug">{evt.text}</div>
                </div>
                <div className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5">{evt.time}</div>
              </div>
            </li>
          )
        })}
      </ul>

      <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 py-2 rounded-lg hover:bg-slate-50 transition-colors">
        Vollständiges Aktivitätsprotokoll <ArrowRight size={12} />
      </button>
    </Card>
  )
}

// ---------- 2) Wissensaufnahme (Enhanced AI Capture) -----------------------

type Phase = 'idle' | 'recording' | 'processing' | 'result'

interface ProcessingStep {
  id: number
  label: string
  icon: React.ReactNode
  duration: number
}

const PROCESSING_STEPS: ProcessingStep[] = [
  { id: 1, label: 'Analysiere Erfahrungswissen...', icon: <Brain size={14} />, duration: 900 },
  { id: 2, label: 'Erkenne Problemtyp...', icon: <ScanLine size={14} />, duration: 800 },
  { id: 3, label: 'Extrahiere Sicherheitsregeln...', icon: <ShieldAlert size={14} />, duration: 700 },
  { id: 4, label: 'Identifiziere Maschinenkontext...', icon: <Factory size={14} />, duration: 800 },
  { id: 5, label: 'Generiere SOP-Struktur...', icon: <Workflow size={14} />, duration: 900 },
  { id: 6, label: 'Erstelle Trainingswissen...', icon: <GraduationCap size={14} />, duration: 700 },
]

const EXAMPLE_PROMPTS = [
  'Wenn Maschine X bei Aluminium vibriert, liegt es meistens am Spannfutter. Erst Drehzahl reduzieren, dann Kühlung prüfen.',
  'Bei Edelstahl mit 1,5 mm Stärke entstehen Poren in der Schweißnaht, wenn der Schutzgasdurchfluss unter 12 l/min fällt.',
  'Lackoberfläche bekommt nach ~3 Wochen feine Einschlüsse — Vorfilter der Lackieranlage ist dann meistens gesättigt.',
]

function Capture({
  entries,
  onSave,
}: {
  entries: KnowledgeEntry[]
  onSave: (entry: KnowledgeEntry) => void
}) {
  const [text, setText] = useState(EXAMPLE_PROMPTS[0])
  const [phase, setPhase] = useState<Phase>('idle')
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [preview, setPreview] = useState<KnowledgeEntry | null>(null)
  const timersRef = useRef<number[]>([])

  function clearTimers() {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
  }

  useEffect(() => () => clearTimers(), [])

  function startAnalysis() {
    if (!text.trim()) return
    clearTimers()
    setPreview(null)
    setDoneSteps([])
    setActiveStep(PROCESSING_STEPS[0].id)
    setPhase('processing')

    let cumulative = 0
    PROCESSING_STEPS.forEach((step, idx) => {
      cumulative += step.duration
      const t = window.setTimeout(() => {
        setDoneSteps((prev) => [...prev, step.id])
        const next = PROCESSING_STEPS[idx + 1]
        setActiveStep(next ? next.id : null)
        if (!next) {
          const t2 = window.setTimeout(() => {
            const extracted = mockExtractKnowledge(text)
            const entry: KnowledgeEntry = {
              ...extracted,
              id: uid('k'),
              createdAt: new Date().toISOString().slice(0, 10),
              author: 'Fabienne Schote',
            }
            setPreview(entry)
            setPhase('result')
          }, 400)
          timersRef.current.push(t2)
        }
      }, cumulative)
      timersRef.current.push(t)
    })
  }

  function abort() {
    clearTimers()
    setPhase('idle')
    setDoneSteps([])
    setActiveStep(null)
  }

  function reset() {
    clearTimers()
    setPreview(null)
    setPhase('idle')
    setDoneSteps([])
    setActiveStep(null)
  }

  function confirmSave() {
    if (preview) {
      onSave(preview)
      reset()
      setText('')
    }
  }

  const progressPct = Math.round((doneSteps.length / PROCESSING_STEPS.length) * 100)
  const isProcessing = phase === 'processing'
  const isResult = phase === 'result'

  return (
    <div className="relative">
      {/* decorative ambient blobs */}
      <div className="pointer-events-none absolute -top-20 -left-10 w-72 h-72 rounded-full bg-indigo-400/40 kf-blob" />
      <div className="pointer-events-none absolute -top-10 right-10 w-80 h-80 rounded-full bg-violet-400/30 kf-blob" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute top-40 left-1/2 w-72 h-72 rounded-full bg-fuchsia-300/20 kf-blob" style={{ animationDelay: '4s' }} />

      <div className="relative">
        <SectionHeader
          title="Wissensaufnahme"
          subtitle="Sprechen oder schreiben Sie frei – die KI versteht und strukturiert echtes Erfahrungswissen automatisch."
          actions={
            <div className="flex items-center gap-2">
              <Badge tone="indigo">
                <Sparkles size={11} className="mr-1" /> KI-Modell: KnowFlow v2.4
              </Badge>
            </div>
          }
        />

        {/* ───────── Input Card ───────── */}
        <div
          className={cls(
            'kf-grad-border p-[1px] rounded-2xl transition-all',
            isProcessing && 'kf-glow-pulse',
          )}
        >
          <Card className="p-6 relative overflow-hidden border-0 shadow-none rounded-2xl">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <Brain className="text-white" size={20} />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    KnowFlow KI-Copilot
                    <Badge tone="emerald">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    Was möchten Sie der KI erklären? Ihre Worte werden zu strukturiertem Wissen.
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                ⌘ + Enter zum Speichern
              </div>
            </div>

            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    e.preventDefault()
                    startAnalysis()
                  }
                }}
                disabled={isProcessing}
                rows={5}
                placeholder='Beispiel: "Wenn Maschine X bei Aluminium vibriert, liegt es meistens am Spannfutter..."'
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-[15px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
              <div className="absolute bottom-3 right-3 text-[11px] text-slate-400">
                {text.length} Zeichen
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={startAnalysis}
                disabled={isProcessing || !text.trim()}
                className={cls(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white',
                  'bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600',
                  'shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
                )}
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Wand2 size={16} />
                )}
                {isProcessing ? 'KI analysiert...' : 'Wissen mit KI strukturieren'}
              </button>

              <Button variant="secondary">
                <Mic size={16} /> Sprachaufnahme
              </Button>

              {(isResult || isProcessing) && (
                <Button variant="ghost" size="sm" onClick={isProcessing ? abort : reset}>
                  {isProcessing ? <Square size={14} /> : <RefreshCcw size={14} />}
                  {isProcessing ? 'Abbrechen' : 'Neu starten'}
                </Button>
              )}

              <div className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-500">
                <Cpu size={12} /> Verarbeitung lokal · Demo-Modus
              </div>
            </div>

            {/* Example chips */}
            {phase === 'idle' && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 mb-2 font-medium flex items-center gap-1.5">
                  <Lightbulb size={12} /> Beispiele aus der Praxis
                </div>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setText(p)}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 text-slate-700 transition-colors max-w-md line-clamp-2"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* scan-line overlay while processing */}
            {isProcessing && <div className="kf-scan" />}
          </Card>
        </div>

        {/* ───────── Processing State ───────── */}
        {isProcessing && (
          <Card className="mt-4 p-6 relative overflow-hidden kf-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center kf-ring relative">
                  <Activity className="text-white" size={18} />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  KI-Pipeline läuft
                  <span className="inline-flex gap-0.5">
                    <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Sechs spezialisierte Modelle arbeiten parallel an Ihrem Eintrag.
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-slate-900 tabular-nums">{progressPct}%</div>
                <div className="text-[11px] text-slate-500">{doneSteps.length} / {PROCESSING_STEPS.length} Schritte</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Step list */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {PROCESSING_STEPS.map((step) => {
                const done = doneSteps.includes(step.id)
                const active = activeStep === step.id
                return (
                  <li
                    key={step.id}
                    className={cls(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all',
                      done && 'bg-emerald-50/60 border-emerald-200',
                      active && 'bg-indigo-50 border-indigo-200 relative overflow-hidden',
                      !done && !active && 'bg-slate-50 border-slate-100 opacity-60',
                    )}
                  >
                    <div
                      className={cls(
                        'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                        done && 'bg-emerald-500 text-white',
                        active && 'bg-indigo-600 text-white',
                        !done && !active && 'bg-slate-200 text-slate-500',
                      )}
                    >
                      {done ? <CheckCircle2 size={14} /> : active ? <Loader2 className="animate-spin" size={14} /> : step.icon}
                    </div>
                    <span className={cls(
                      'text-sm',
                      done ? 'text-emerald-900 line-through decoration-emerald-400/60' : 'text-slate-700',
                      active && 'font-medium text-indigo-900',
                    )}>
                      {step.label}
                    </span>
                    {active && <div className="absolute inset-0 kf-shimmer pointer-events-none" />}
                  </li>
                )
              })}
            </ul>
          </Card>
        )}

        {/* ───────── Result State ───────── */}
        {isResult && preview && (
          <ResultView preview={preview} onSave={confirmSave} onReset={reset} />
        )}

        {/* ───────── Recent entries (idle only, compact) ───────── */}
        {phase === 'idle' && (
          <Card className="mt-4 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-slate-900 flex items-center gap-2">
                <BookOpen size={16} className="text-indigo-600" />
                Zuletzt gesicherte Einträge
              </div>
              <Button variant="ghost" size="sm">
                <Filter size={14} /> Filter
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {entries.slice(0, 6).map((e) => (
                <div
                  key={e.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Badge tone="indigo">{e.machine.split(' ')[0]}</Badge>
                    <Badge tone="slate">{e.experienceLevel}</Badge>
                  </div>
                  <div className="font-medium text-sm text-slate-900 line-clamp-2">{e.title}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {e.author} · {e.createdAt}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

// ---------- Result View (premium output cards) -----------------------------

interface ResultCardTone {
  ring: string
  badge: string
  iconBg: string
  iconColor: string
  accent: string
}

const TONE: Record<string, ResultCardTone> = {
  rose:    { ring: 'hover:ring-rose-200',    badge: 'bg-rose-50 text-rose-700',       iconBg: 'bg-rose-100',    iconColor: 'text-rose-600',    accent: 'from-rose-500 to-rose-400' },
  amber:   { ring: 'hover:ring-amber-200',   badge: 'bg-amber-50 text-amber-800',     iconBg: 'bg-amber-100',   iconColor: 'text-amber-600',   accent: 'from-amber-500 to-amber-400' },
  emerald: { ring: 'hover:ring-emerald-200', badge: 'bg-emerald-50 text-emerald-700', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', accent: 'from-emerald-500 to-emerald-400' },
  red:     { ring: 'hover:ring-red-200',     badge: 'bg-red-50 text-red-700',         iconBg: 'bg-red-100',     iconColor: 'text-red-600',     accent: 'from-red-500 to-red-400' },
  violet:  { ring: 'hover:ring-violet-200',  badge: 'bg-violet-50 text-violet-700',   iconBg: 'bg-violet-100',  iconColor: 'text-violet-600',  accent: 'from-violet-500 to-violet-400' },
  sky:     { ring: 'hover:ring-sky-200',     badge: 'bg-sky-50 text-sky-700',         iconBg: 'bg-sky-100',     iconColor: 'text-sky-600',     accent: 'from-sky-500 to-sky-400' },
  indigo:  { ring: 'hover:ring-indigo-200',  badge: 'bg-indigo-50 text-indigo-700',   iconBg: 'bg-indigo-100',  iconColor: 'text-indigo-600',  accent: 'from-indigo-500 to-indigo-400' },
  fuchsia: { ring: 'hover:ring-fuchsia-200', badge: 'bg-fuchsia-50 text-fuchsia-700', iconBg: 'bg-fuchsia-100', iconColor: 'text-fuchsia-600', accent: 'from-fuchsia-500 to-fuchsia-400' },
  orange:  { ring: 'hover:ring-orange-200',  badge: 'bg-orange-50 text-orange-700',   iconBg: 'bg-orange-100',  iconColor: 'text-orange-600',  accent: 'from-orange-500 to-orange-400' },
}

function ResultView({
  preview,
  onSave,
  onReset,
}: {
  preview: KnowledgeEntry
  onSave: () => void
  onReset: () => void
}) {
  const cards: {
    key: string
    label: string
    tone: keyof typeof TONE
    icon: React.ReactNode
    content: React.ReactNode
  }[] = [
    {
      key: 'problem',
      label: 'Problem',
      tone: 'rose',
      icon: <AlertTriangle size={16} />,
      content: <p className="text-slate-700 leading-relaxed">{preview.problem}</p>,
    },
    {
      key: 'cause',
      label: 'Ursache',
      tone: 'amber',
      icon: <Target size={16} />,
      content: <p className="text-slate-700 leading-relaxed">{preview.cause}</p>,
    },
    {
      key: 'solution',
      label: 'Lösung',
      tone: 'emerald',
      icon: <CheckCircle2 size={16} />,
      content: <p className="text-slate-700 leading-relaxed whitespace-pre-line">{preview.solution}</p>,
    },
    {
      key: 'safety',
      label: 'Sicherheitswarnung',
      tone: 'red',
      icon: <ShieldAlert size={16} />,
      content: <p className="text-slate-700 leading-relaxed">{preview.safety}</p>,
    },
    {
      key: 'level',
      label: 'Erfahrungslevel',
      tone: 'violet',
      icon: <Award size={16} />,
      content: (
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-slate-900">{preview.experienceLevel}</div>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
          </div>
        </div>
      ),
    },
    {
      key: 'machine',
      label: 'Relevante Maschine',
      tone: 'sky',
      icon: <Factory size={16} />,
      content: (
        <div>
          <div className="font-semibold text-slate-900">{preview.machine}</div>
          <div className="text-xs text-slate-500 mt-1">Erkannt via Kontextanalyse</div>
        </div>
      ),
    },
    {
      key: 'sop',
      label: 'SOP-Empfehlung',
      tone: 'indigo',
      icon: <Workflow size={16} />,
      content: (
        <div>
          <p className="text-slate-700 leading-relaxed">{preview.sopRecommendation}</p>
          <Button size="sm" variant="secondary" className="mt-3">
            <FileText size={13} /> SOP generieren
          </Button>
        </div>
      ),
    },
    {
      key: 'training',
      label: 'Trainingsmodul',
      tone: 'fuchsia',
      icon: <GraduationCap size={16} />,
      content: (
        <div>
          <p className="text-slate-700 leading-relaxed">{preview.trainingModule}</p>
          <Button size="sm" variant="secondary" className="mt-3">
            <Layers size={13} /> Modul vorschauen
          </Button>
        </div>
      ),
    },
    {
      key: 'mistakes',
      label: 'Häufige Anfängerfehler',
      tone: 'orange',
      icon: <XCircle size={16} />,
      content: (
        <ul className="space-y-1.5">
          {preview.beginnerMistakes?.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="mt-5 kf-fade-in">
      {/* Result header */}
      <Card className="p-5 mb-4 relative overflow-hidden border-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-violet-50/30 to-transparent pointer-events-none" />
        <div className="relative flex items-start gap-4 flex-wrap">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white" size={22} />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500/40 to-fuchsia-500/40 blur-md -z-10" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-slate-900">KI-Wissensprofil generiert</h2>
              <Badge tone="emerald">
                <CheckCircle2 size={11} className="mr-1" /> Bereit zum Speichern
              </Badge>
              <Badge tone="indigo">
                <Zap size={11} className="mr-1" /> Konfidenz: {preview.confidence ?? 92}%
              </Badge>
            </div>
            <div className="text-sm text-slate-600 mt-1 line-clamp-1">
              <span className="font-medium text-slate-900">{preview.title}</span>
            </div>
            {preview.sourceQuote && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-white/70 border border-slate-100 max-w-3xl">
                <Quote size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span className="text-xs text-slate-600 italic line-clamp-2">{preview.sourceQuote}</span>
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {preview.tags.map((t) => (
                <Badge key={t} tone="slate">
                  #{t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onReset}>
              <RefreshCcw size={13} /> Verwerfen
            </Button>
            <button
              onClick={onSave}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
            >
              <Save size={14} />
              In Bibliothek speichern
            </button>
          </div>
        </div>
      </Card>

      {/* Result cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <ResultCard
            key={c.key}
            label={c.label}
            icon={c.icon}
            tone={c.tone}
            index={i}
          >
            {c.content}
          </ResultCard>
        ))}
      </div>
    </div>
  )
}

function ResultCard({
  label,
  icon,
  tone,
  children,
  index,
}: {
  label: string
  icon: React.ReactNode
  tone: keyof typeof TONE
  children: React.ReactNode
  index: number
}) {
  const t = TONE[tone]
  return (
    <div
      className="kf-stagger"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className={cls(
          'group relative rounded-2xl bg-white border border-slate-200 p-5 transition-all',
          'hover:shadow-lg hover:-translate-y-0.5 hover:ring-4',
          t.ring,
        )}
      >
        {/* top accent bar */}
        <div className={cls('absolute top-0 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r opacity-70', t.accent)} />

        <div className="flex items-center gap-2.5 mb-3">
          <div className={cls('w-9 h-9 rounded-xl flex items-center justify-center', t.iconBg, t.iconColor)}>
            {icon}
          </div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
            {label}
          </div>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles size={12} className="text-slate-300" />
          </div>
        </div>

        <div className="text-sm">{children}</div>
      </div>
    </div>
  )
}

// ---------- 3) Interview ----------------------------------------------------

function Interview({
  onCreateEntry,
}: {
  onCreateEntry: (entry: KnowledgeEntry) => void
}) {
  const [askedIdx, setAskedIdx] = useState(0)
  const [history, setHistory] = useState<InterviewQA[]>([])
  const [draftAnswer, setDraftAnswer] = useState('')
  const [profile, setProfile] = useState<{
    machine: string
    expert: string
    role: string
  }>({ machine: 'CNC-Fräse X-2000', expert: 'Heinz Müller', role: 'Senior CNC-Programmierer' })

  const currentQuestion = interviewQuestionsLibrary[askedIdx]
  const finished = askedIdx >= interviewQuestionsLibrary.length

  function submitAnswer() {
    if (!draftAnswer.trim()) return
    setHistory((h) => [...h, { question: currentQuestion, answer: draftAnswer.trim() }])
    setDraftAnswer('')
    setAskedIdx((i) => i + 1)
  }

  function generateProfile() {
    const summaryProblem = history.map((q) => q.answer).join(' • ').slice(0, 220)
    const entry: KnowledgeEntry = {
      id: uid('k'),
      title: `Wissensprofil: ${profile.expert} (${profile.machine})`,
      problem:
        history[0]?.answer ||
        'Häufige Anfängerfehler an dieser Maschine, basierend auf dem Interview.',
      cause:
        history[1]?.answer ||
        'Frühindikatoren, die nur erfahrene Mitarbeiter erkennen.',
      solution:
        history.slice(2).map((q) => q.answer).join(' ') ||
        'Aus dem Interview abgeleitete bewährte Vorgehensweise.',
      safety:
        history.find((q) => /sicherheit/i.test(q.question))?.answer ||
        'Standard-PSA, klare Kommunikation im Team, Maschine bei Unsicherheit stoppen.',
      machine: profile.machine,
      experienceLevel: 'Experte',
      author: profile.expert,
      createdAt: new Date().toISOString().slice(0, 10),
      tags: ['Interview', profile.machine.split(' ')[0], 'Erfahrungswissen'],
    }
    onCreateEntry(entry)
    setHistory([])
    setAskedIdx(0)
    alert('Wissensprofil wurde gespeichert und als neuer Eintrag in die Bibliothek übernommen.\n\nKurz-Zusammenfassung:\n' + summaryProblem)
  }

  return (
    <div>
      <SectionHeader
        title="KI-Interview-Assistent"
        subtitle="Die KI führt strukturierte Interviews mit erfahrenen Mitarbeitern. Aus den Antworten entsteht ein Wissensprofil."
        actions={
          finished ? (
            <Button onClick={generateProfile}>
              <Sparkles size={16} /> Wissensprofil generieren
            </Button>
          ) : (
            <Badge tone="indigo">
              Frage {Math.min(askedIdx + 1, interviewQuestionsLibrary.length)} /{' '}
              {interviewQuestionsLibrary.length}
            </Badge>
          )
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <User size={18} className="text-slate-500" />
            </div>
            <div className="flex-1">
              <input
                className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
                value={profile.expert}
                onChange={(e) => setProfile((p) => ({ ...p, expert: e.target.value }))}
              />
              <input
                className="w-full bg-transparent text-xs text-slate-500 focus:outline-none"
                value={profile.role}
                onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
              />
            </div>
            <select
              value={profile.machine}
              onChange={(e) => setProfile((p) => ({ ...p, machine: e.target.value }))}
              className="text-sm rounded-lg border border-slate-200 px-2 py-1.5"
            >
              <option>CNC-Fräse X-2000</option>
              <option>WIG-Schweißanlage S-450</option>
              <option>Lackierkabine L-Pro 3</option>
            </select>
          </div>

          <div className="space-y-4">
            {history.map((qa, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-indigo-600" />
                  </div>
                  <div className="rounded-xl bg-indigo-50/70 px-3 py-2 text-sm text-slate-800">
                    {qa.question}
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-end">
                  <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-800 max-w-[80%]">
                    {qa.answer}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User size={14} className="text-slate-600" />
                  </div>
                </div>
              </div>
            ))}

            {!finished && (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-indigo-600" />
                  </div>
                  <div className="rounded-xl bg-indigo-50/70 px-3 py-2 text-sm text-slate-800">
                    {currentQuestion}
                  </div>
                </div>

                <div className="flex items-end gap-2">
                  <textarea
                    rows={3}
                    value={draftAnswer}
                    onChange={(e) => setDraftAnswer(e.target.value)}
                    placeholder="Ihre Antwort..."
                    className="flex-1 rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <Button onClick={submitAnswer} size="lg">
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            )}

            {finished && (
              <div className="text-center py-6 rounded-xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                <div className="font-medium text-emerald-900 mt-2">
                  Interview abgeschlossen
                </div>
                <div className="text-sm text-emerald-800/80">
                  {history.length} Antworten erfasst – bereit, ein Wissensprofil zu generieren.
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="font-semibold text-slate-900 mb-3">Interview-Leitfaden</div>
          <ul className="space-y-2 text-sm">
            {interviewQuestionsLibrary.map((q, i) => (
              <li
                key={q}
                className={cls(
                  'flex items-start gap-2 p-2 rounded-lg',
                  i < askedIdx && 'opacity-50',
                  i === askedIdx && 'bg-indigo-50 ring-1 ring-indigo-100',
                )}
              >
                <div
                  className={cls(
                    'w-5 h-5 rounded-full text-xs flex items-center justify-center mt-0.5 shrink-0',
                    i < askedIdx
                      ? 'bg-emerald-500 text-white'
                      : i === askedIdx
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-200 text-slate-600',
                  )}
                >
                  {i < askedIdx ? '✓' : i + 1}
                </div>
                <span className="text-slate-700">{q}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

// ---------- 4) SOP Generator -----------------------------------------------

function SOPGenerator({
  entries,
  sops,
  onCreate,
}: {
  entries: KnowledgeEntry[]
  sops: SOP[]
  onCreate: (sop: SOP) => void
}) {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(entries[0]?.id ?? '')
  const [selectedSopId, setSelectedSopId] = useState<string>(sops[0]?.id ?? '')
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!selectedSopId && sops.length > 0) setSelectedSopId(sops[0].id)
  }, [sops, selectedSopId])

  const selectedEntry = entries.find((e) => e.id === selectedEntryId)
  const selectedSOP = sops.find((s) => s.id === selectedSopId)

  function handleGenerate() {
    if (!selectedEntry) return
    setGenerating(true)
    setTimeout(() => {
      const sop = mockGenerateSOP(selectedEntry)
      onCreate(sop)
      setSelectedSopId(sop.id)
      setGenerating(false)
    }, 1000)
  }

  return (
    <div>
      <SectionHeader
        title="SOP-Generator"
        subtitle="Aus jedem Wissenseintrag erzeugt die KI eine sofort einsetzbare Standard Operating Procedure."
        actions={
          <>
            <Button variant="secondary">
              <Download size={16} /> Als PDF exportieren
            </Button>
            <Button onClick={handleGenerate} disabled={generating || !selectedEntry}>
              {generating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {generating ? 'Generiere SOP...' : 'SOP aus Eintrag generieren'}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="p-4 xl:col-span-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Wissenseintrag wählen
          </div>
          <div className="space-y-2 mb-5">
            {entries.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedEntryId(e.id)}
                className={cls(
                  'w-full text-left p-3 rounded-xl border transition-colors',
                  selectedEntryId === e.id
                    ? 'border-indigo-300 bg-indigo-50/60'
                    : 'border-slate-100 hover:border-slate-200',
                )}
              >
                <div className="text-sm font-medium text-slate-900 line-clamp-1">
                  {e.title}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <Badge tone="indigo">{e.machine.split(' ')[0]}</Badge>
                  <Badge tone="slate">{e.experienceLevel}</Badge>
                </div>
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Vorhandene SOPs
          </div>
          <div className="space-y-2">
            {sops.length === 0 && (
              <div className="text-sm text-slate-500 py-4 text-center">
                Noch keine SOPs erzeugt.
              </div>
            )}
            {sops.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSopId(s.id)}
                className={cls(
                  'w-full text-left p-3 rounded-xl border transition-colors',
                  selectedSopId === s.id
                    ? 'border-emerald-300 bg-emerald-50/60'
                    : 'border-slate-100 hover:border-slate-200',
                )}
              >
                <div className="text-sm font-medium text-slate-900 line-clamp-2">
                  {s.title}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  basierend auf Wissenseintrag #{s.basedOn}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 xl:col-span-2">
          {!selectedSOP ? (
            <div className="text-center text-slate-500 py-12">
              Wählen Sie eine SOP oder generieren Sie eine neue aus einem Wissenseintrag.
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <Badge tone="emerald">SOP · v1.0</Badge>
                  <h2 className="text-xl font-semibold text-slate-900 mt-2">
                    {selectedSOP.title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{selectedSOP.purpose}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Erstellt: heute</div>
                  <div>Quelle: KnowFlow KI</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <SOPBlock icon={<Wrench size={14} />} title="Benötigte Werkzeuge">
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedSOP.tools.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </SOPBlock>

                <SOPBlock icon={<ShieldAlert size={14} className="text-rose-600" />} title="Sicherheitswarnungen">
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedSOP.safety.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </SOPBlock>

                <SOPBlock
                  icon={<ClipboardList size={14} />}
                  title="Schritt-für-Schritt"
                  className="md:col-span-2"
                >
                  <ol className="space-y-2">
                    {selectedSOP.steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-slate-800">{s}</span>
                      </li>
                    ))}
                  </ol>
                </SOPBlock>

                <SOPBlock icon={<AlertTriangle size={14} className="text-amber-600" />} title="Häufige Fehler">
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedSOP.commonMistakes.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </SOPBlock>

                <SOPBlock icon={<CheckCircle2 size={14} className="text-emerald-600" />} title="Qualitätscheck">
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedSOP.qualityCheck.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </SOPBlock>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function SOPBlock({
  icon,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cls('rounded-xl border border-slate-100 bg-slate-50/60 p-4', className)}>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
        {icon} {title}
      </div>
      <div className="text-sm text-slate-800 leading-relaxed">{children}</div>
    </div>
  )
}

// ---------- 5) Onboarding ---------------------------------------------------

function Onboarding({
  days,
  setDays,
}: {
  days: OnboardingDay[]
  setDays: (d: OnboardingDay[]) => void
}) {
  const progress = Math.round(
    (days.filter((d) => d.done).length / days.length) * 100,
  )

  function toggleDay(day: number) {
    setDays(days.map((d) => (d.day === day ? { ...d, done: !d.done } : d)))
  }

  return (
    <div>
      <SectionHeader
        title="Onboarding-Lernpfad"
        subtitle="Strukturierter 5-Tage-Plan für neue Mitarbeiter – generiert aus Ihrem KnowFlow-Wissen."
        actions={
          <Button variant="secondary">
            <Plus size={16} /> Neuen Mitarbeiter anlegen
          </Button>
        }
      />

      <Card className="p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
            <User size={22} className="text-sky-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900">Tom Krüger</div>
            <div className="text-sm text-slate-500">
              Maschinenbediener · Start: 11.05.2026 · Mentor: Heinz Müller
            </div>
            <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-slate-900">{progress}%</div>
            <div className="text-xs text-slate-500">Fortschritt</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
        {days.map((d) => (
          <Card
            key={d.day}
            className={cls(
              'p-4 transition-shadow',
              d.done ? 'bg-emerald-50/50 border-emerald-200' : 'hover:shadow-md',
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge tone={d.done ? 'emerald' : 'indigo'}>Tag {d.day}</Badge>
              {d.done ? (
                <CheckCircle2 size={18} className="text-emerald-600" />
              ) : (
                <Clock size={18} className="text-slate-400" />
              )}
            </div>
            <div className="font-semibold text-slate-900 leading-tight">{d.title}</div>
            <div className="text-xs text-slate-500 mt-1 leading-snug">{d.description}</div>

            <ul className="mt-3 space-y-1.5">
              {d.topics.map((t) => (
                <li key={t} className="text-xs flex items-start gap-1.5">
                  <ChevronRight size={12} className="text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{t}</span>
                </li>
              ))}
            </ul>

            <Button
              size="sm"
              variant={d.done ? 'secondary' : 'primary'}
              className="w-full mt-3"
              onClick={() => toggleDay(d.day)}
            >
              {d.done ? 'Abgeschlossen' : 'Als erledigt markieren'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ---------- 6) KI-Wissensassistent (AI Operations Copilot) -----------------

const SUGGESTED_QUESTIONS = [
  {
    text: 'Warum entstehen Rattermuster bei Aluminium?',
    icon: <Activity size={14} />,
    category: 'CNC · Qualität',
  },
  {
    text: 'Wann muss die CNC-Fräse gestoppt werden?',
    icon: <ShieldAlert size={14} />,
    category: 'Sicherheit · NOT-AUS',
  },
  {
    text: 'Welche Sicherheitsregeln gelten bei Spannproblemen?',
    icon: <ClipboardList size={14} />,
    category: 'Sicherheit · CNC',
  },
  {
    text: 'Wie erkennt man Werkzeugverschleiß frühzeitig?',
    icon: <Target size={14} />,
    category: 'Wartung · Standzeit',
  },
]

function nowTime() {
  return new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

function Assistant({ entries }: { entries: KnowledgeEntry[] }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: uid('m'),
      role: 'assistant',
      content:
        'Hallo Fabienne! Ich bin Ihr KnowFlow-Copilot. Stellen Sie mir eine Frage zum Werkswissen — ich antworte ausschließlich auf Basis dokumentierter Experten-Einträge, verlinke passende SOPs und kennzeichne Risiken.',
      ts: nowTime(),
    },
  ])
  const [input, setInput] = useState('Warum entstehen Rattermuster bei Aluminium?')
  const [busy, setBusy] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
    },
    [],
  )

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  function ask(question: string) {
    const q = question.trim()
    if (!q || busy) return
    setInput('')
    setBusy(true)

    const userMsg: ChatMsg = { id: uid('m'), role: 'user', content: q, ts: nowTime() }
    const placeholderId = uid('m')
    const placeholder: ChatMsg = {
      id: placeholderId,
      role: 'assistant',
      thinking: { done: [], active: ASSISTANT_THINKING_STEPS[0].id },
      question: q,
      ts: nowTime(),
    }
    setMessages((m) => [...m, userMsg, placeholder])

    // Schedule sequential thinking step updates
    let cumul = 0
    ASSISTANT_THINKING_STEPS.forEach((step, i) => {
      cumul += step.duration
      const at = cumul
      const t = window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id !== placeholderId || !msg.thinking) return msg
            const next = ASSISTANT_THINKING_STEPS[i + 1]
            return {
              ...msg,
              thinking: {
                done: [...msg.thinking.done, step.id],
                active: next ? next.id : null,
              },
            }
          }),
        )
      }, at)
      timersRef.current.push(t)
    })

    // Finalize answer after all steps complete
    const finalAt = cumul + 400
    const t = window.setTimeout(() => {
      const answer = findStructuredAnswer(q)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholderId
            ? {
                id: msg.id,
                role: 'assistant',
                answer,
                question: q,
                ts: nowTime(),
              }
            : msg,
        ),
      )
      setBusy(false)
    }, finalAt)
    timersRef.current.push(t)
  }

  return (
    <div className="relative">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-16 -left-10 w-64 h-64 rounded-full bg-indigo-400/30 kf-blob" />
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-fuchsia-300/20 kf-blob" style={{ animationDelay: '3s' }} />

      <div className="relative">
        <SectionHeader
          title="KI-Wissensassistent"
          subtitle="Ihr Operations-Copilot — antwortet ausschließlich auf Basis von Experten-Einträgen, verlinkt SOPs und kennzeichnet Sicherheitsrisiken."
          actions={
            <div className="flex items-center gap-2">
              <Badge tone="indigo">
                <Sparkles size={11} className="mr-1" /> KnowFlow v2.4
              </Badge>
              <Badge tone="emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                {entries.length} Quellen indexiert
              </Badge>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Chat column */}
          <div className="xl:col-span-2">
            <Card className="flex flex-col h-[78vh] overflow-hidden">
              {/* chat header */}
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-white via-indigo-50/30 to-violet-50/30">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow">
                  <Bot className="text-white" size={18} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">KnowFlow Copilot</div>
                  <div className="text-[11px] text-slate-500">
                    Antwortet aus internem Erfahrungswissen · Quellen werden mitgeliefert
                  </div>
                </div>
                <Badge tone="slate">Demo-Modell</Badge>
              </div>

              {/* messages */}
              <div ref={scrollerRef} className="flex-1 overflow-y-auto p-5 space-y-5">
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
              </div>

              {/* input bar */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/40">
                <div className="kf-grad-border rounded-xl">
                  <div className="flex items-end gap-2 p-2 bg-white rounded-xl">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          ask(input)
                        }
                      }}
                      rows={1}
                      placeholder="Frage an das Werkswissen — z.B. Warum vibriert die Fräse?"
                      className="flex-1 resize-none rounded-lg px-3 py-2 text-sm focus:outline-none placeholder:text-slate-400"
                    />
                    <button
                      onClick={() => ask(input)}
                      disabled={busy || !input.trim()}
                      className={cls(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white shrink-0',
                        'bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600',
                        'shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                      )}
                    >
                      {busy ? <Loader2 className="animate-spin" size={15} /> : <Send size={15} />}
                      Senden
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Cpu size={11} /> Verarbeitung lokal</span>
                  <span className="flex items-center gap-1"><ShieldAlert size={11} /> Sicherheits-Check aktiv</span>
                  <span className="flex items-center gap-1"><BookOpen size={11} /> Antworten mit Quellenangabe</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-indigo-600" />
                <div className="font-semibold text-slate-900">Vorschlagsfragen</div>
              </div>
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => ask(s.text)}
                    disabled={busy}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      <span className="text-indigo-500">{s.icon}</span>
                      {s.category}
                    </div>
                    <div className="text-sm text-slate-800 group-hover:text-indigo-700 leading-snug">
                      {s.text}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <User size={16} className="text-violet-600" />
                <div className="font-semibold text-slate-900">Top-Experten</div>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: 'Heinz Müller', role: 'CNC · 28 J.', entries: 14, color: 'from-indigo-400 to-violet-500' },
                  { name: 'Petra Schäfer', role: 'Schweißen · 18 J.', entries: 9, color: 'from-fuchsia-400 to-pink-500' },
                  { name: 'Jürgen Bachmann', role: 'Lackieren · 22 J.', entries: 7, color: 'from-sky-400 to-cyan-500' },
                ].map((e) => (
                  <div
                    key={e.name}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className={cls('w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-semibold', e.color)}>
                      {e.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{e.name}</div>
                      <div className="text-[11px] text-slate-500">{e.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">{e.entries}</div>
                      <div className="text-[10px] text-slate-500">Einträge</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-indigo-50 via-violet-50/50 to-fuchsia-50/30 border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-indigo-600" />
                <div className="font-semibold text-slate-900">So funktioniert's</div>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">1.</span> Frage stellen — frei formuliert.</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">2.</span> Copilot durchsucht Werkswissen, prüft Sicherheitskontext.</li>
                <li className="flex gap-2"><span className="text-indigo-600 font-semibold">3.</span> Strukturierte Antwort mit SOP, Training, Quellen und Konfidenz.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- MessageBubble ---------------------------------------------------

function MessageBubble({ msg }: { msg: ChatMsg }) {
  if (msg.role === 'user') {
    return (
      <div className="flex items-start gap-3 justify-end kf-fade-in">
        <div className="max-w-[78%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
          {msg.content}
          <div className="text-[10px] text-indigo-100/80 mt-1 text-right">{msg.ts}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
          <User size={16} className="text-slate-600" />
        </div>
      </div>
    )
  }

  // Assistant message
  return (
    <div className="flex items-start gap-3 kf-fade-in">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow shrink-0">
        <Bot className="text-white" size={17} />
      </div>
      <div className="flex-1 min-w-0">
        {msg.thinking && <ThinkingBubble thinking={msg.thinking} />}
        {msg.answer && msg.question && <AnswerView question={msg.question} answer={msg.answer} ts={msg.ts} />}
        {!msg.thinking && !msg.answer && msg.content && (
          <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-slate-100 text-slate-800 max-w-[90%] leading-relaxed">
            {msg.content}
            <div className="text-[10px] text-slate-400 mt-1.5">{msg.ts}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- ThinkingBubble --------------------------------------------------

function ThinkingBubble({ thinking }: { thinking: AssistantThinking }) {
  const pct = Math.round((thinking.done.length / ASSISTANT_THINKING_STEPS.length) * 100)
  return (
    <div className="rounded-2xl rounded-tl-sm p-4 bg-white border border-indigo-100 relative overflow-hidden max-w-[92%] kf-glow-pulse">
      <div className="absolute inset-0 kf-shimmer pointer-events-none" />
      <div className="relative flex items-center gap-2 mb-3">
        <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Activity className="text-white" size={14} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            Copilot denkt nach
            <span className="inline-flex gap-0.5">
              <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="kf-dot w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </span>
          </div>
          <div className="text-[11px] text-slate-500">{pct}% · {thinking.done.length} / {ASSISTANT_THINKING_STEPS.length} Schritte</div>
        </div>
      </div>

      <div className="relative h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="relative space-y-1.5">
        {ASSISTANT_THINKING_STEPS.map((s) => {
          const done = thinking.done.includes(s.id)
          const active = thinking.active === s.id
          return (
            <li
              key={s.id}
              className={cls(
                'flex items-center gap-2 px-2 py-1 rounded-md text-xs transition-all',
                done && 'text-emerald-700',
                active && 'text-indigo-700 font-medium',
                !done && !active && 'text-slate-400',
              )}
            >
              <span
                className={cls(
                  'w-5 h-5 rounded flex items-center justify-center shrink-0',
                  done && 'bg-emerald-100',
                  active && 'bg-indigo-100',
                  !done && !active && 'bg-slate-100',
                )}
              >
                {done ? <CheckCircle2 size={11} className="text-emerald-600" /> : active ? <Loader2 className="animate-spin text-indigo-600" size={11} /> : s.icon}
              </span>
              <span>{s.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ---------- AnswerView ------------------------------------------------------

function AnswerView({ question, answer, ts }: { question: string; answer: StructuredAnswer; ts: string }) {
  const riskTone: Record<RiskLevel, { label: string; tone: 'emerald' | 'amber' | 'rose'; icon: React.ReactNode }> = {
    low:    { label: 'Niedriges Risiko',   tone: 'emerald', icon: <CheckCircle2 size={11} /> },
    medium: { label: 'Mittleres Risiko',   tone: 'amber',   icon: <AlertTriangle size={11} /> },
    high:   { label: 'Hohes Sicherheits­risiko', tone: 'rose',  icon: <ShieldAlert size={11} /> },
  }
  const risk = riskTone[answer.risk]

  // Stagger blocks
  const blocks: { key: string; render: React.ReactNode }[] = [
    {
      key: 'diagnosis',
      render: (
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 via-violet-50/40 to-transparent border border-indigo-100">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-indigo-700 mb-2">
            <Sparkles size={12} /> Kurzdiagnose
          </div>
          <p className="text-[15px] text-slate-800 leading-relaxed font-medium">{answer.diagnosis}</p>
        </div>
      ),
    },
    {
      key: 'cause',
      render: (
        <AnswerBlock icon={<Target size={14} />} label="Wahrscheinliche Ursache" tone="amber">
          <p className="text-slate-700 leading-relaxed">{answer.cause}</p>
        </AnswerBlock>
      ),
    },
    {
      key: 'steps',
      render: (
        <AnswerBlock icon={<ClipboardList size={14} />} label="Schritt-für-Schritt-Lösung" tone="indigo">
          <ol className="space-y-2">
            {answer.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-slate-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </AnswerBlock>
      ),
    },
    {
      key: 'safety',
      render: (
        <div className={cls(
          'p-4 rounded-xl border-l-4 relative overflow-hidden',
          answer.risk === 'high'
            ? 'bg-rose-50 border-rose-500'
            : answer.risk === 'medium'
            ? 'bg-amber-50 border-amber-500'
            : 'bg-emerald-50 border-emerald-500',
        )}>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold mb-2">
            <ShieldAlert size={12} className={
              answer.risk === 'high' ? 'text-rose-700' : answer.risk === 'medium' ? 'text-amber-700' : 'text-emerald-700'
            } />
            <span className={
              answer.risk === 'high' ? 'text-rose-700' : answer.risk === 'medium' ? 'text-amber-700' : 'text-emerald-700'
            }>
              Sicherheitswarnung
            </span>
          </div>
          <p className="text-slate-800 leading-relaxed">{answer.safety}</p>
        </div>
      ),
    },
    {
      key: 'cards',
      render: (
        <div className={cls('grid gap-3', (answer.sopRef && answer.trainingHint) ? 'md:grid-cols-2' : 'grid-cols-1')}>
          {answer.sopRef && (
            <div className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-60" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-indigo-600">Relevante SOP</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-tight">{answer.sopRef.title}</div>
                  <div className="text-xs text-indigo-600 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                    SOP öffnen <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {answer.trainingHint && (
            <div className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-fuchsia-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-60" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center text-fuchsia-600 shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-fuchsia-600">Trainingshinweis</div>
                  <div className="text-sm text-slate-800 mt-0.5 leading-snug">{answer.trainingHint}</div>
                  <div className="text-xs text-fuchsia-600 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Modul öffnen <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'sources',
      render: answer.sources.length > 0 ? (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-3">
            <Quote size={12} /> Quellen & Experten
          </div>
          <div className="space-y-2">
            {answer.sources.map((src, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
                  {src.expertName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">{src.expertName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{src.expertRole}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11px] text-slate-700 font-medium truncate max-w-[180px]">{src.entryTitle}</div>
                  <div className="text-[10px] text-slate-400">{src.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null,
    },
    {
      key: 'related',
      render: answer.related.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">Weiter:</span>
          {answer.related.map((r, i) => (
            <button
              key={i}
              className={cls(
                'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                r.type === 'sop' && 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100',
                r.type === 'training' && 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100',
                r.type === 'entry' && 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100',
              )}
            >
              {r.type === 'sop' && <FileText size={11} />}
              {r.type === 'training' && <GraduationCap size={11} />}
              {r.type === 'entry' && <BookOpen size={11} />}
              {r.title}
            </button>
          ))}
        </div>
      ) : null,
    },
  ].filter((b) => b.render !== null)

  return (
    <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 max-w-[96%] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50/40 via-violet-50/20 to-transparent">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-slate-500 mb-1">Antwort auf</div>
            <div className="text-sm font-semibold text-slate-900 line-clamp-2">{question}</div>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            <Badge tone="indigo">
              <Zap size={10} className="mr-0.5" />
              {answer.confidence}% Konfidenz
            </Badge>
            <Badge tone={risk.tone}>
              <span className="mr-0.5">{risk.icon}</span>
              {risk.label}
            </Badge>
          </div>
        </div>
        {answer.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {answer.tags.map((t) => (
              <span key={t} className="text-[10px] text-slate-500">
                #{t}{' '}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {blocks.map((b, i) => (
          <div key={b.key} className="kf-stagger" style={{ animationDelay: `${i * 90}ms` }}>
            {b.render}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1"><Clock size={11} /> {ts}</span>
        <span>·</span>
        <span className="flex items-center gap-1"><Cpu size={11} /> KnowFlow v2.4</span>
        <span className="ml-auto flex items-center gap-1.5">
          <button className="hover:text-indigo-600">War das hilfreich?</button>
          <span>·</span>
          <button className="hover:text-indigo-600">Im Interview erfassen</button>
        </span>
      </div>
    </div>
  )
}

function AnswerBlock({
  icon,
  label,
  tone,
  children,
}: {
  icon: React.ReactNode
  label: string
  tone: 'amber' | 'indigo'
  children: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-white">
      <div className={cls(
        'flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold mb-2',
        tone === 'amber' && 'text-amber-700',
        tone === 'indigo' && 'text-indigo-700',
      )}>
        {icon} {label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  )
}

// ---------- App Shell -------------------------------------------------------

export default function App() {
  const [section, setSection] = useState<Section>('dashboard')
  const [entries, setEntries] = useState<KnowledgeEntry[]>(initialKnowledgeEntries)
  const [sops, setSops] = useState<SOP[]>(initialSOPs)
  const [onboarding, setOnboarding] = useState<OnboardingDay[]>(initialOnboarding)

  const view = useMemo(() => {
    switch (section) {
      case 'dashboard':
        return (
          <Dashboard
            entries={entries}
            sops={sops}
            onboarding={onboarding}
            setSection={setSection}
          />
        )
      case 'capture':
        return (
          <Capture
            entries={entries}
            onSave={(e) => setEntries((arr) => [e, ...arr])}
          />
        )
      case 'interview':
        return (
          <Interview onCreateEntry={(e) => setEntries((arr) => [e, ...arr])} />
        )
      case 'sop':
        return (
          <SOPGenerator
            entries={entries}
            sops={sops}
            onCreate={(s) => setSops((arr) => [s, ...arr])}
          />
        )
      case 'onboarding':
        return <Onboarding days={onboarding} setDays={setOnboarding} />
      case 'assistant':
        return <Assistant entries={entries} />
    }
  }, [section, entries, sops, onboarding])

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar active={section} onChange={setSection} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar section={section} />
        <main className="p-6 max-w-7xl w-full mx-auto">{view}</main>
      </div>
    </div>
  )
}
