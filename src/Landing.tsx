import { useState } from 'react'
import {
  Sparkles, ArrowRight, Brain, Mic, FileText, GraduationCap, Bot, ShieldCheck,
  Check, Quote, Play, Layers, Cpu, Wand2, Activity,
  AlertTriangle, Users, Clock, Award, Factory,
  MessageSquareText, Lightbulb, Lock, Globe,
  ArrowUpRight, Github, Linkedin, Twitter, ChevronRight,
  AlertOctagon, ShieldAlert, Hourglass,
  Star, Menu, X, Zap,
} from 'lucide-react'

/* ============================================================================
 * KnowFlow AI – Landing Page
 * Premium dark hero, Linear/Vercel/Stripe inspired, AI-Glow throughout.
 * ========================================================================== */

type LandingProps = { onEnterApp?: () => void }

export default function Landing({ onEnterApp = () => {} }: LandingProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/40 selection:text-white">
      <Nav onEnterApp={onEnterApp} />
      <Hero onEnterApp={onEnterApp} />
      <EuroCallout />
      <LogoStrip />
      <Problem />
      <Flow />
      <Features />
      <ROI />
      <Screenshots />
      <Testimonials />
      <Pricing onEnterApp={onEnterApp} />
      <FinalCTA onEnterApp={onEnterApp} />
      <Footer />
    </div>
  )
}

/* ----------------------------- NAVIGATION --------------------------------- */

function Nav({ onEnterApp }: { onEnterApp: () => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#produkt', label: 'Produkt' },
    { href: '#loesung', label: 'Lösung' },
    { href: '#preise', label: 'Preise' },
    { href: '#kunden', label: 'Kunden' },
  ]
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles size={16} className="text-white" />
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 blur-md opacity-50 group-hover:opacity-80 transition" />
          </span>
          <span className="font-semibold tracking-tight text-[15px]">KnowFlow <span className="text-indigo-300">AI</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-zinc-300 hover:text-white transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onEnterApp} className="text-sm text-zinc-300 hover:text-white transition">
            Anmelden
          </button>
          <button
            onClick={onEnterApp}
            className="text-sm font-medium px-3.5 py-2 rounded-lg bg-white text-zinc-900 hover:bg-zinc-100 transition shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]"
          >
            Demo starten
          </button>
        </div>

        <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 -mr-2 text-zinc-300">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-zinc-950/95 px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} className="block text-sm text-zinc-300">{l.label}</a>
          ))}
          <div className="pt-3 border-t border-white/5 flex gap-2">
            <button onClick={onEnterApp} className="flex-1 text-sm py-2 rounded-lg border border-white/10 text-zinc-200">Anmelden</button>
            <button onClick={onEnterApp} className="flex-1 text-sm py-2 rounded-lg bg-white text-zinc-900 font-medium">Demo</button>
          </div>
        </div>
      )}
    </header>
  )
}

/* -------------------------------- HERO ------------------------------------ */

function Hero({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-28 lg:pt-32 lg:pb-36">
      {/* Aurora glows — auf 1 reduziert (Apple-Sobriety) */}
      <div className="kf-aurora bg-indigo-700/25" style={{ top: -180, left: '50%', transform: 'translateX(-50%)', width: 720, height: 520 }} />

      {/* Grid bg with radial mask — abgesenkt */}
      <div className="absolute inset-0 kf-grid-bg kf-radial-mask opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">

        {/* Headline — 2 Zeilen. Emotional. Ein Gedanke. */}
        <h1 className="text-center font-semibold tracking-[-0.035em] text-[44px] leading-[1.04] sm:text-[64px] lg:text-[88px] lg:leading-[0.98]">
          <span className="text-white">Bevor die Erfahrung</span>
          <br />
          <span className="text-zinc-400">in Rente geht.</span>
        </h1>

        {/* Sub — 1 Satz. 14 Wörter. Keine Fachbegriffe. */}
        <p className="mt-8 max-w-xl mx-auto text-center text-[17px] lg:text-[19px] leading-relaxed text-zinc-400">
          KnowFlow dokumentiert Erfahrungswissen aus Produktion, Wartung und Qualität — bevor es das Werk verlässt.
        </p>

        {/* CTA — Eine primäre Aktion. Ein Text-Link. Keine zweite Button-Wand. */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={onEnterApp}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-900 font-medium text-[15px] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] transition"
          >
            Demo ansehen
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </button>
          <button
            onClick={onEnterApp}
            className="text-[13.5px] text-zinc-400 hover:text-white transition inline-flex items-center gap-1.5"
          >
            <Play size={12} /> Pilotgespräch
          </button>
        </div>
      </div>

      {/* Dashboard preview — viel mehr Whitespace, max-w-6xl, eigener Atemraum */}
      <div className="relative mt-24 lg:mt-32 max-w-7xl mx-auto px-6 lg:px-10">
        <DashboardMock />
      </div>
    </section>
  )
}

/* ----------------------------- HERO KPI STRIP ----------------------------- */

function HeroKpiStrip() {
  // 3 KPIs: €-Anker · Operations-Anker · Audit-Anker. Industrial Vocabulary statt KM-Speak.
  const kpis: { value: string; unit?: string; label: string; tone: 'rose' | 'amber' | 'indigo' }[] = [
    { value: '2,4', unit: 'Mio €', label: 'Anlagen-Wissens­verlust · 14 Renten­eintritte · 36 Mo. · Werk Mainz', tone: 'rose'   },
    { value: '47 → 11',             label: 'Einarbeitungs­tage · CNC-200-Linie · vor / nach 1. Pilot-Quartal',    tone: 'amber'  },
    { value: '1.142',               label: 'auditierte Erfahrungs­regeln · ISO 9001 §7.1.6 · TÜV-rückverfolgbar',  tone: 'indigo' },
  ]
  const tone: Record<typeof kpis[number]['tone'], { val: string; chip: string; bar: string }> = {
    rose:    { val: 'text-rose-200',   chip: 'border-rose-400/30   bg-rose-500/[0.07]',   bar: 'bg-rose-400/70'   },
    amber:   { val: 'text-amber-200',  chip: 'border-amber-400/30  bg-amber-500/[0.07]',  bar: 'bg-amber-400/70'  },
    indigo:  { val: 'text-indigo-200', chip: 'border-indigo-400/30 bg-indigo-500/[0.07]', bar: 'bg-indigo-400/70' },
  }
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {kpis.map((k, i) => {
          const t = tone[k.tone]
          return (
            <div
              key={k.label}
              className={`relative rounded-xl border ${t.chip} backdrop-blur-sm p-4 overflow-hidden kf-stagger`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className={`absolute top-0 left-0 h-[2px] w-full ${t.bar}`} />
              <div className="flex items-baseline gap-1.5">
                <div className={`text-[30px] leading-none font-semibold tabular-nums tracking-tight ${t.val}`}>{k.value}</div>
                {k.unit && <div className={`text-[15px] ${t.val} opacity-80`}>{k.unit}</div>}
              </div>
              <div className="mt-2.5 text-[11.5px] text-zinc-400 leading-snug">{k.label}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-3 text-center text-[10.5px] text-zinc-500">
        Quelle: KnowFlow-Pilot · Werk Mainz-Bischofsheim · 14 Senior-Operatoren · CNC-200-Familie · 36 Monate
      </div>
    </div>
  )
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-indigo-300">{icon}</span>
      {label}
    </span>
  )
}

/* ----------------- HERO DASHBOARD MOCK (Browser frame) -------------------- */

function DashboardMock() {
  return (
    <div className="relative max-w-6xl mx-auto kf-float-soft">
      {/* Outer glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30 blur-3xl rounded-[2rem] opacity-60" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_120px_-20px_rgba(99,102,241,0.45)]">
        <BrowserBar url="knowflow.werk-mainz.lokal/ops-cockpit" />
        {/* light app body */}
        <div className="bg-zinc-50 text-zinc-900 p-5 sm:p-7">
          {/* Top row: title + kpi pill */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">Operations Cockpit · Werk Mainz-Bischofsheim · Linie&nbsp;3</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">Anlagen-Wissens­risiko · Live-Snapshot</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> MES-Sync · live
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 18.05.2026 · 09:42
              </span>
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MockKpi tone="rose"    label="Senior-Abgänge bis 2027" value="3"    delta="38 J. Ø" up={false} />
            <MockKpi tone="amber"   label="Maschinen ohne Backup"   value="7"    delta="kritisch" up={false} />
            <MockKpi tone="emerald" label="Anfänger­fehler · CNC-200" value="−47%" delta="6 Mon. Pilot" up />
            <MockKpi tone="indigo"  label="Time-to-Productivity"     value="11 T." delta="vs. 47 T." up />
          </div>

          {/* Risk + Activity row */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-5 gap-3">
            {/* Risk card */}
            <div className="lg:col-span-3 rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <AlertOctagon size={14} className="text-rose-500" />
                  Kritisches Erfahrungs­wissen vor Renten­eintritt
                </div>
                <span className="text-[10px] text-zinc-500">3 Senior-Operatoren</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <ExpertRow name="Heinz Müller"    role="Senior CNC · CNC-200 · 38 J."        cover={0}  risk="kritisch" months="4 Mon." />
                <ExpertRow name="Petra Schäfer"   role="QM-Auditorin · ISO 9001 · 22 J."     cover={64} risk="hoch"     months="13 Mon." />
                <ExpertRow name="Jürgen Bachmann" role="Schweiß­meister · Härterei · 19 J."  cover={81} risk="mittel"   months="22 Mon." />
              </div>
            </div>

            {/* Activity card */}
            <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-semibold">
                  <Activity size={14} className="text-indigo-500" />
                  KI-Extraktions-Stream
                </div>
                <span className="text-[10px] text-zinc-500">live · audit-trail</span>
              </div>
              <ul className="mt-3 space-y-2.5">
                <ActivityRow tone="rose"    text="Sicherheits­risiko erkannt · CNC-200 · §2.1" time="vor 8 Min." />
                <ActivityRow tone="indigo"  text="SOP-CNC-200 v3.1 → v3.2 · 3 neue Schritte"   time="vor 21 Min." />
                <ActivityRow tone="emerald" text="Erfahrungs­regel extrahiert · Späne-Farbe"     time="vor 1 Std." />
                <ActivityRow tone="amber"   text="Anfänger­fehler dokumentiert · Hammer­schlag" time="vor 2 Std." />
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating-Badges entfernt — wirkten wie Marketing-Pop-ups, nicht wie Operations-Software. */}
    </div>
  )
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="kf-browser-bar h-9 px-4 flex items-center gap-3 border-b border-white/5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="text-[11px] text-zinc-500 bg-zinc-900/80 border border-white/5 rounded-md px-3 py-0.5 flex items-center gap-1.5">
          <Lock size={10} className="text-zinc-600" />
          {url}
        </div>
      </div>
      <div className="h-3 w-3 rounded-full bg-zinc-800" />
    </div>
  )
}

const KPI_TONE: Record<string, { bg: string; bar: string; ico: string }> = {
  rose:    { bg: 'from-rose-50 to-white',    bar: 'from-rose-400 to-rose-500',     ico: 'text-rose-500' },
  amber:   { bg: 'from-amber-50 to-white',   bar: 'from-amber-400 to-orange-500',  ico: 'text-amber-500' },
  emerald: { bg: 'from-emerald-50 to-white', bar: 'from-emerald-400 to-teal-500',  ico: 'text-emerald-500' },
  indigo:  { bg: 'from-indigo-50 to-white',  bar: 'from-indigo-400 to-violet-500', ico: 'text-indigo-500' },
}

function MockKpi({ tone, label, value, delta, up }: { tone: keyof typeof KPI_TONE; label: string; value: string; delta: string; up: boolean }) {
  const t = KPI_TONE[tone]
  return (
    <div className={`relative overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br ${t.bg} p-3.5`}>
      <div className={`absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r ${t.bar}`} />
      <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</div>
      <div className="mt-1.5 flex items-end justify-between">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className={`text-[10px] font-medium ${up ? 'text-emerald-600' : 'text-rose-600'}`}>{delta}</div>
      </div>
      {/* sparkline */}
      <div className="mt-2 flex items-end gap-0.5 h-5">
        {[3,4,5,4,6,7,8,7,9].map((h, i) => (
          <div key={i} className={`flex-1 rounded-sm bg-gradient-to-t ${t.bar}`} style={{ height: `${h*10}%`, opacity: 0.45 + i * 0.06 }} />
        ))}
      </div>
    </div>
  )
}

function ExpertRow({ name, role, cover, risk, months }: { name: string; role: string; cover: number; risk: 'kritisch' | 'hoch' | 'mittel'; months: string }) {
  const riskClass = risk === 'kritisch' ? 'bg-rose-50 text-rose-700 border-rose-200'
    : risk === 'hoch' ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-zinc-100 text-zinc-700 border-zinc-200'
  const barFrom = risk === 'kritisch' ? 'from-rose-400' : risk === 'hoch' ? 'from-amber-400' : 'from-zinc-300'
  const barTo   = risk === 'kritisch' ? 'to-rose-600'   : risk === 'hoch' ? 'to-orange-500'  : 'to-zinc-400'
  return (
    <div className="flex items-center gap-3">
      <div className="h-7 w-7 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-[10px] font-semibold text-zinc-700 shrink-0">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-[12px] font-medium truncate">{name}</div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded border ${riskClass}`}>{risk}</span>
        </div>
        <div className="text-[10px] text-zinc-500 truncate">{role}</div>
        <div className="mt-1 h-1 rounded-full bg-zinc-100 overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${barFrom} ${barTo} rounded-full`} style={{ width: `${cover}%` }} />
        </div>
      </div>
      <div className="text-[10px] text-zinc-500 shrink-0">{months}</div>
    </div>
  )
}

function ActivityRow({ tone, text, time }: { tone: 'rose' | 'indigo' | 'emerald' | 'amber'; text: string; time: string }) {
  const dot = tone === 'rose' ? 'bg-rose-500' : tone === 'indigo' ? 'bg-indigo-500' : tone === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
  return (
    <li className="flex items-start gap-2.5">
      <span className={`mt-1 h-1.5 w-1.5 rounded-full ${dot} ring-2 ring-white shadow`} />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-zinc-700 truncate">{text}</div>
        <div className="text-[10px] text-zinc-400">{time}</div>
      </div>
    </li>
  )
}

function FloatingBadge({ className, icon, label, tone }: { className?: string; icon: React.ReactNode; label: string; tone: 'indigo' | 'emerald' }) {
  const bg = tone === 'indigo' ? 'from-indigo-500/90 to-violet-500/90 shadow-indigo-500/40' : 'from-emerald-500/90 to-teal-500/90 shadow-emerald-500/40'
  return (
    <div className={`hidden lg:flex absolute z-10 ${className} kf-float-soft items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${bg} text-white text-[11px] font-medium shadow-xl backdrop-blur`}>
      {icon} {label}
    </div>
  )
}

/* ------------------------------ EURO CALLOUT ------------------------------ */

function EuroCallout() {
  return (
    <section
      id="schaden"
      className="relative overflow-hidden bg-zinc-950 py-32 lg:py-48 border-t border-white/[0.04]"
    >
      <div
        className="absolute inset-x-0 top-[28%] mx-auto h-[460px] w-[860px] max-w-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(244,63,94,0.10) 0%, rgba(244,63,94,0) 60%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-[10.5px] tracking-[0.28em] uppercase text-zinc-500">
          Basierend auf Einarbeitung · Ausschuss · Stillstand
        </div>
        <div
          className="mt-10 font-semibold tabular-nums tracking-[-0.04em] text-white"
          style={{ fontSize: 'clamp(88px, 18vw, 196px)', lineHeight: 0.94 }}
        >
          Bis zu 380.000&nbsp;€
        </div>
        <div className="mt-7 text-[20px] lg:text-[24px] text-zinc-400 tracking-tight">
          impliziter Wissensverlust pro Senior-Abgang.
        </div>
        <div className="h-24 lg:h-32" />
        <div className="space-y-5 lg:space-y-7 text-[22px] lg:text-[28px] tracking-tight">
          <div className="text-zinc-500">Längere Einarbeitung.</div>
          <div className="text-zinc-500">Mehr Anfänger&shy;fehler.</div>
          <div className="text-zinc-500">Mehr Ausschuss.</div>
          <div className="text-zinc-200">Wissen, das niemand mehr hat.</div>
        </div>
        <div className="mt-24 text-[10.5px] text-zinc-700 leading-relaxed max-w-md mx-auto">
          Schätzwert basierend auf internen Berechnungsmodellen aus Einarbeitungszeit, Qualitätsverlusten und Produktionsrisiken.
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ LOGO STRIP -------------------------------- */

function LogoStrip() {
  const logos = [
    'STAHL & WERK', 'PRÄZISIO', 'MITTELBAU', 'GRUBER+CO',
    'NORDWERK', 'HARTMETALL', 'PLAST-X', 'KERAMICA',
  ]
  return (
    <section className="relative py-12 border-y border-white/5 bg-zinc-950/60">
      <div className="text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-6">
        Vertraut von Mittelstand & Industrie
      </div>
      <div className="overflow-hidden">
        <div className="kf-marquee-track flex items-center gap-14 px-6 whitespace-nowrap">
          {[...logos, ...logos].map((l, i) => (
            <span key={i} className="text-zinc-500/80 font-semibold tracking-[0.2em] text-sm">{l}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ PROBLEM ----------------------------------- */

function Problem() {
  const problems = [
    {
      icon: <Hourglass size={20} />,
      title: 'Renteneintritte',
      stat: '4,9 Mio.',
      desc: 'Baby-Boomer gehen bis 2035 in Deutschland in Rente – ein Großteil davon in der Industrie.',
      tone: 'rose',
    },
    {
      icon: <Users size={20} />,
      title: 'Fachkräftemangel',
      stat: '73 %',
      desc: 'der Industriebetriebe finden offene Stellen nicht zeitnah nach – jedes Jahr aufs Neue.',
      tone: 'amber',
    },
    {
      icon: <Brain size={20} />,
      title: 'Wissensverlust',
      stat: '40 %',
      desc: 'der Prozesse leben nur in Köpfen. Wenn der Experte geht, geht das Wissen mit.',
      tone: 'violet',
    },
    {
      icon: <Clock size={20} />,
      title: 'Lange Onboarding-Zeiten',
      stat: '6–9 Mon.',
      desc: 'bis ein neuer Mitarbeiter wirklich produktiv ist. Zeit, die niemand hat.',
      tone: 'indigo',
    },
    {
      icon: <ShieldAlert size={20} />,
      title: 'Sicherheitsrisiken',
      stat: '1 von 3',
      desc: 'Vorfälle sind auf fehlendes oder ungesichertes Erfahrungs­wissen zurückzuführen.',
      tone: 'rose',
    },
  ]

  return (
    <section id="loesung" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Das Problem"
          title={<>Wenn deine besten Köpfe gehen,<br /><span className="text-zinc-500">geht ihr Wissen mit.</span></>}
          sub="Der Mittelstand verliert in den nächsten 10 Jahren so viel Wissen wie nie zuvor. Klassische Dokumentation hat versagt – weil Erfahrungswissen nicht in Word-Dateien lebt."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} {...p} delay={i} />
          ))}
          <div className="hidden lg:flex sm:col-span-2 lg:col-span-1 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-6 items-center kf-glass-dark">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">Die Folge</div>
              <div className="mt-2 text-xl font-semibold tracking-tight">
                Eine ganze Generation an Wissen verlässt in den nächsten 8 Jahren unbemerkt deine Fabrik.
              </div>
              <div className="mt-3 text-sm text-zinc-400">
                Wer heute nicht beginnt, Wissen systematisch zu sichern, zahlt morgen den höchsten Preis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PROBLEM_TONES: Record<string, { ring: string; ico: string; stat: string }> = {
  rose:   { ring: 'group-hover:border-rose-400/30',   ico: 'text-rose-400 bg-rose-500/10',     stat: 'text-rose-300' },
  amber:  { ring: 'group-hover:border-amber-400/30',  ico: 'text-amber-400 bg-amber-500/10',   stat: 'text-amber-300' },
  violet: { ring: 'group-hover:border-violet-400/30', ico: 'text-violet-300 bg-violet-500/10', stat: 'text-violet-300' },
  indigo: { ring: 'group-hover:border-indigo-400/30', ico: 'text-indigo-300 bg-indigo-500/10', stat: 'text-indigo-300' },
}

function ProblemCard({ icon, title, stat, desc, tone, delay }: { icon: React.ReactNode; title: string; stat: string; desc: string; tone: string; delay: number }) {
  const t = PROBLEM_TONES[tone] || PROBLEM_TONES.indigo
  return (
    <div
      className={`group kf-stagger relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition kf-lift kf-inset-ring ${t.ring}`}
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <div className={`inline-flex items-center justify-center h-10 w-10 rounded-lg ${t.ico}`}>{icon}</div>
      <div className={`mt-5 text-3xl font-semibold tracking-tight ${t.stat}`}>{stat}</div>
      <div className="mt-1 text-base font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-zinc-400 leading-relaxed">{desc}</div>
    </div>
  )
}

/* -------------------------------- FLOW ------------------------------------ */

function Flow() {
  const steps = [
    { icon: <Mic size={20} />,           title: 'Wissen erfassen',      sub: 'Sprache, Text, Video', color: 'from-indigo-500 to-violet-500' },
    { icon: <Brain size={20} />,         title: 'KI strukturiert',      sub: 'Cluster · Risiken · Sicherheit', color: 'from-violet-500 to-fuchsia-500' },
    { icon: <FileText size={20} />,      title: 'SOP generieren',       sub: 'Versioniert · auditierbar', color: 'from-fuchsia-500 to-pink-500' },
    { icon: <GraduationCap size={20} />, title: 'Onboarding-Pfade',     sub: 'Tagespläne · Lerneinheiten', color: 'from-pink-500 to-rose-500' },
    { icon: <Bot size={20} />,           title: 'KI-Copilot',           sub: 'Antwortet aus deinem Wissen', color: 'from-rose-500 to-orange-500' },
  ]
  return (
    <section id="produkt" className="relative py-24 lg:py-32 border-t border-white/5 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Wie es funktioniert"
          title={<>Vom impliziten Wissen<br /><span className="text-zinc-500">zum operativen Asset.</span></>}
          sub="Ein durchgängiger Workflow – vom ersten Experten-Interview bis zum produktiven Copilot. KnowFlow AI orchestriert jede Stufe."
        />

        <div className="mt-16 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-px kf-flow-line" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-3">
            {steps.map((s, i) => (
              <FlowStep key={s.title} {...s} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowStep({ icon, title, sub, color, index }: { icon: React.ReactNode; title: string; sub: string; color: string; index: number }) {
  return (
    <div className="relative text-center kf-stagger" style={{ animationDelay: `${(index - 1) * 100}ms` }}>
      <div className="relative inline-flex items-center justify-center">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} blur-2xl opacity-50`} />
        <div className={`relative h-[88px] w-[88px] rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl shadow-black/40 border border-white/20`}>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
          <div className="text-white">{icon}</div>
        </div>
      </div>
      <div className="mt-4 text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-medium">Schritt {index}</div>
      <div className="mt-1 text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-xs text-zinc-400">{sub}</div>
    </div>
  )
}

/* ------------------------------ FEATURES ---------------------------------- */

function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Die Plattform"
          title={<>Eine KI. Sieben Werkzeuge.<br /><span className="text-zinc-500">Ein Operations-Backbone.</span></>}
          sub="KnowFlow AI deckt den kompletten Wissens-Lebenszyklus ab – integriert, sicher und ohne Abhängigkeit von externer Beratung."
        />

        <div className="mt-14 grid grid-cols-12 gap-4 auto-rows-[260px]">
          {/* Big card: KI-Wissensaufnahme */}
          <FeatureBig
            className="col-span-12 lg:col-span-7 row-span-2"
            icon={<Mic size={18} />}
            title="KI-Wissensaufnahme"
            desc="Experten erzählen – KnowFlow versteht. Aus 30 Minuten Gespräch entstehen automatisch strukturierte Wissens­einträge, Sicherheits­hinweise, SOP-Skelette und Anfängerfehler. Ohne Folien, ohne Templates."
            bullets={['Sprach- und Text-Input', 'KI-Cluster nach Maschine, Prozess, Risiko', '6-stufige Live-Analyse', 'Sofort versionierte Wissensbausteine']}
            mock={<FeatureMockCapture />}
          />

          {/* SOP Generator */}
          <FeatureSmall
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            icon={<FileText size={18} />}
            title="SOP-Generator"
            desc="Per Klick aus rohem Wissen eine auditierbare Standard Operating Procedure – inkl. Risiken, Schritten und QM-Hinweisen."
            tone="violet"
          />

          {/* Operations Copilot */}
          <FeatureSmall
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            icon={<Bot size={18} />}
            title="Operations Copilot"
            desc="Stelle eine Frage – bekomme strukturierte Antworten mit Kurzdiagnose, Schritten, Sicherheit, Quelle und Konfidenz."
            tone="indigo"
          />

          {/* Big: Sicherheitswissen */}
          <FeatureBig
            className="col-span-12 lg:col-span-7 row-span-2"
            icon={<ShieldCheck size={18} />}
            title="Sicherheitswissen first-class"
            desc="Sicherheitsregeln werden aus jedem Wissens­eintrag automatisch extrahiert, klassifiziert und versioniert – mit Audit-Trail, Verantwortlichen und Erinnerungen."
            bullets={['Automatische Risiko-Klassifikation', 'Verknüpfung zu Maschinen & Bereichen', 'Audit-Trail & DSGVO-konform', 'Erinnerungen an verantwortliche Rollen']}
            mock={<FeatureMockSafety />}
            tone="emerald"
          />

          {/* Expert Interviews */}
          <FeatureSmall
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            icon={<MessageSquareText size={18} />}
            title="Experten-Interviews"
            desc="Der KI-Interview-Assistent stellt die richtigen Folgefragen – wie ein erfahrener Wissens­ingenieur."
            tone="fuchsia"
          />

          {/* KI-Insights */}
          <FeatureSmall
            className="col-span-12 sm:col-span-6 lg:col-span-5"
            icon={<Lightbulb size={18} />}
            title="KI-Insights"
            desc="Sieh, welche Wissens-Cluster gefährdet sind, bevor es jemand merkt. KnowFlow erkennt Konzentrationsrisiken."
            tone="amber"
          />

          {/* Onboarding Pfade — wide */}
          <FeatureBig
            className="col-span-12 lg:col-span-7"
            icon={<GraduationCap size={18} />}
            title="Onboarding-Pfade"
            desc="Aus den gesicherten Wissens­einträgen baut KnowFlow personalisierte Onboarding-Pläne – pro Rolle, pro Schicht, pro Maschine. Time-to-Productivity sinkt um bis zu 37 %."
            bullets={['Tagespläne mit Lerneinheiten', 'Fortschritts-Tracking', 'Übergabe-Checklisten', 'Mentor-Matching']}
            mock={<FeatureMockOnboarding />}
            tone="indigo"
            row={1}
          />
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-1">
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] leading-[1.1] text-white">
        {title}
      </h2>
      {sub && <p className="mt-5 text-[15px] lg:text-base text-zinc-400 leading-relaxed">{sub}</p>}
    </div>
  )
}

const FEATURE_TONE: Record<string, { from: string; to: string; ring: string; ico: string }> = {
  indigo:  { from: 'from-indigo-500/15',  to: 'to-transparent', ring: 'border-indigo-500/20',  ico: 'text-indigo-300 bg-indigo-500/15' },
  violet:  { from: 'from-violet-500/15',  to: 'to-transparent', ring: 'border-violet-500/20',  ico: 'text-violet-300 bg-violet-500/15' },
  fuchsia: { from: 'from-fuchsia-500/15', to: 'to-transparent', ring: 'border-fuchsia-500/20', ico: 'text-fuchsia-300 bg-fuchsia-500/15' },
  amber:   { from: 'from-amber-500/15',   to: 'to-transparent', ring: 'border-amber-500/20',   ico: 'text-amber-300 bg-amber-500/15' },
  emerald: { from: 'from-emerald-500/15', to: 'to-transparent', ring: 'border-emerald-500/20', ico: 'text-emerald-300 bg-emerald-500/15' },
}

function FeatureBig({ className, icon, title, desc, bullets, mock, tone = 'indigo', row }: { className?: string; icon: React.ReactNode; title: string; desc: string; bullets?: string[]; mock?: React.ReactNode; tone?: keyof typeof FEATURE_TONE; row?: number }) {
  const t = FEATURE_TONE[tone]
  return (
    <div className={`${className} relative overflow-hidden rounded-2xl border ${t.ring} bg-gradient-to-br ${t.from} ${t.to} kf-glass-dark kf-lift p-6 lg:p-7 flex flex-col`}>
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${t.ico}`}>{icon}</div>
        <div className="text-base lg:text-lg font-semibold tracking-tight text-white">{title}</div>
      </div>
      <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{desc}</p>
      {bullets && (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-[13px] text-zinc-300">
          {bullets.map(b => (
            <li key={b} className="flex items-start gap-2"><Check size={13} className="mt-0.5 text-emerald-400 shrink-0" /> {b}</li>
          ))}
        </ul>
      )}
      {mock && (
        <div className={`${row === 1 ? 'mt-5' : 'mt-6'} flex-1 min-h-0`}>{mock}</div>
      )}
    </div>
  )
}

function FeatureSmall({ className, icon, title, desc, tone = 'indigo' }: { className?: string; icon: React.ReactNode; title: string; desc: string; tone?: keyof typeof FEATURE_TONE }) {
  const t = FEATURE_TONE[tone]
  return (
    <div className={`${className} relative overflow-hidden rounded-2xl border ${t.ring} bg-gradient-to-br ${t.from} ${t.to} kf-glass-dark kf-lift p-6 flex flex-col justify-between`}>
      <div>
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${t.ico}`}>{icon}</div>
        <div className="mt-5 text-base font-semibold text-white">{title}</div>
        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{desc}</p>
      </div>
      <a className="mt-5 inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white">
        Mehr erfahren <ArrowRight size={12} />
      </a>
    </div>
  )
}

/* Feature mocks (small visuals inside feature cards) */
function FeatureMockCapture() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-zinc-900/60 p-3 overflow-hidden">
      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2">
        <Sparkles size={12} className="text-indigo-300" /> KI-Pipeline läuft
      </div>
      <div className="space-y-1.5">
        {[
          { icon: <Cpu size={11} />, label: 'Analysiere Erfahrungswissen', done: true },
          { icon: <Layers size={11} />, label: 'Erkenne Problemtyp', done: true },
          { icon: <ShieldAlert size={11} />, label: 'Extrahiere Sicherheitsregeln', done: true },
          { icon: <Factory size={11} />, label: 'Identifiziere Maschinenkontext', done: false, active: true },
          { icon: <Wand2 size={11} />, label: 'Generiere SOP-Struktur', done: false },
        ].map((s, i) => (
          <div key={i} className={`flex items-center gap-2 text-[11px] px-2 py-1.5 rounded-md ${s.active ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/[0.02]'}`}>
            <span className={s.done ? 'text-emerald-400' : s.active ? 'text-indigo-300' : 'text-zinc-500'}>
              {s.done ? <Check size={11} /> : s.icon}
            </span>
            <span className={`flex-1 ${s.done ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>{s.label}</span>
            {s.active && <span className="kf-shimmer h-1.5 w-12 rounded-full bg-white/5" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureMockSafety() {
  return (
    <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-300">
          <ShieldCheck size={12} /> Sicherheitsregel · CNC-200
        </div>
        <span className="text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">v 2.3</span>
      </div>
      <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-300">
        <li className="flex items-start gap-2"><AlertTriangle size={11} className="mt-0.5 text-amber-400" /> Niemals Werkstück manuell prüfen während Spindel rotiert.</li>
        <li className="flex items-start gap-2"><AlertTriangle size={11} className="mt-0.5 text-amber-400" /> Kühlmittel-Druck min. 14 bar vor Schnittbeginn.</li>
        <li className="flex items-start gap-2"><AlertTriangle size={11} className="mt-0.5 text-amber-400" /> Tür-Sensor monatlich auf Funktion prüfen.</li>
      </ul>
      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
        <span>Verantwortlich · Schichtleiter Halle B</span>
        <span className="text-emerald-300">Audit-Trail ✓</span>
      </div>
    </div>
  )
}

function FeatureMockOnboarding() {
  const days = [
    { d: 'Tag 1', t: 'Werksrundgang & Sicherheit', done: true },
    { d: 'Tag 3', t: 'CNC-Grundlagen mit Heinz M.', done: true },
    { d: 'Tag 5', t: 'Erste Programm-Übung', active: true },
    { d: 'Tag 10', t: 'Schichtübergabe Theorie', },
  ]
  return (
    <div className="rounded-xl border border-indigo-500/15 bg-indigo-500/[0.04] p-3.5">
      <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-300 mb-3">
        <GraduationCap size={12} /> Onboarding-Pfad · Maschinen­bediener
      </div>
      <div className="space-y-1.5">
        {days.map((d, i) => (
          <div key={i} className={`flex items-center gap-3 text-[11px] px-2 py-1.5 rounded-md ${d.active ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/[0.02]'}`}>
            <span className="text-[10px] text-indigo-200/80 w-10 shrink-0">{d.d}</span>
            <span className={`flex-1 ${d.done ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>{d.t}</span>
            <span className={d.done ? 'text-emerald-400' : d.active ? 'text-indigo-300' : 'text-zinc-600'}>
              {d.done ? <Check size={11} /> : d.active ? <Play size={11} /> : <ChevronRight size={11} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------- ROI ------------------------------------ */

function ROI() {
  const items = [
    { value: '37 %', label: 'schnellere Einarbeitung', desc: 'neuer Mitarbeiter durch personalisierte Onboarding-Pfade', icon: <Clock size={18} />, tone: 'indigo' },
    { value: '82 %', label: 'weniger Wissensverlust', desc: 'bei Renteneintritt durch frühzeitige KI-Erfassung', icon: <Brain size={18} />, tone: 'violet' },
    { value: '64 %', label: 'schnellere SOP-Erstellung', desc: 'automatisch aus Experten­interviews generiert', icon: <FileText size={18} />, tone: 'fuchsia' },
    { value: '41 %', label: 'weniger Sicherheits­vorfälle', desc: 'durch strukturiertes & versioniertes Sicherheits­wissen', icon: <ShieldCheck size={18} />, tone: 'emerald' },
  ]
  return (
    <section className="relative py-24 lg:py-32 border-t border-white/5 bg-gradient-to-b from-zinc-950 to-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Business Impact"
          title={<>Messbar. Vom ersten<br /><span className="text-zinc-500">Pilotprojekt an.</span></>}
          sub="Reale Zahlen aus aktuellen Mittelstands-Pilotprojekten in Maschinenbau, Lebensmittel- und Kunststoffindustrie."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <RoiCard key={it.label} {...it} delay={i} />
          ))}
        </div>

        {/* Bar */}
        <div className="mt-12 relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-fuchsia-500/10 p-6 lg:p-8 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 font-semibold">Pilot-Modell</div>
              <div className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                4 Wochen Pilot. 3 kritische Wissens-Cluster gesichert. 1 messbarer ROI.
              </div>
              <div className="mt-3 text-sm text-zinc-300 max-w-2xl">
                Wir starten mit deinem dringendsten Bereich – z. B. einem Renten­eintritt in 6 Monaten – und liefern in 4 Wochen sichtbare Ergebnisse: SOPs, Onboarding-Plan und einen einsatzbereiten Operations-Copilot.
              </div>
            </div>
            <div className="flex flex-wrap lg:justify-end gap-2">
              <span className="px-3 py-1.5 text-xs rounded-full bg-white/10 border border-white/10 text-zinc-200">4 Wochen Setup</span>
              <span className="px-3 py-1.5 text-xs rounded-full bg-white/10 border border-white/10 text-zinc-200">3 Cluster</span>
              <span className="px-3 py-1.5 text-xs rounded-full bg-white/10 border border-white/10 text-zinc-200">Fix-Preis</span>
              <span className="px-3 py-1.5 text-xs rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-200">ROI-Garantie</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ROI_TONE: Record<string, string> = {
  indigo:  'from-indigo-500 to-violet-500',
  violet:  'from-violet-500 to-fuchsia-500',
  fuchsia: 'from-fuchsia-500 to-pink-500',
  emerald: 'from-emerald-500 to-teal-500',
}

function RoiCard({ value, label, desc, icon, tone, delay }: { value: string; label: string; desc: string; icon: React.ReactNode; tone: string; delay: number }) {
  return (
    <div
      className="kf-stagger relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 kf-glass-dark kf-lift"
      style={{ animationDelay: `${delay * 90}ms` }}
    >
      <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${ROI_TONE[tone]}`} />
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${ROI_TONE[tone]} text-white shadow-lg shadow-black/40`}>{icon}</div>
      <div className="mt-5 text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">{value}</div>
      <div className="mt-2 text-sm font-medium text-white">{label}</div>
      <div className="mt-1 text-xs text-zinc-400 leading-relaxed">{desc}</div>
    </div>
  )
}

/* ----------------------------- SCREENSHOTS -------------------------------- */

function Screenshots() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Im Einsatz"
          title={<>So sieht ein moderner<br /><span className="text-zinc-500">Wissens-Cockpit aus.</span></>}
          sub="Drei zentrale Module aus KnowFlow AI – Dashboard, Wissensaufnahme und Operations Copilot. Alle Daten anonymisiert aus laufenden Pilotprojekten."
        />

        <div className="mt-14 space-y-10">
          <ScreenshotRow
            title="Dashboard · Wissensrisiko-Cockpit"
            desc="Acht Executive-KPIs, kritisches Wissensrisiko mit Gesicht und strategische KI-Insights – alles auf einem Bildschirm."
            mock={<ShotDashboard />}
            align="left"
          />
          <ScreenshotRow
            title="Wissensaufnahme · Animierte KI-Analyse"
            desc="Sechs sequenzielle KI-Schritte verwandeln rohes Experten­wissen in versionierte Wissens­einträge mit SOP-Empfehlung."
            mock={<ShotCapture />}
            align="right"
          />
          <ScreenshotRow
            title="KI-Assistent · Strukturierte Antworten"
            desc="Kurzdiagnose, Ursache, Schritte, Sicherheit, Quelle und Konfidenz – wie ein erfahrener Kollege, der nie geht."
            mock={<ShotAssistant />}
            align="left"
          />
        </div>
      </div>
    </section>
  )
}

function ScreenshotRow({ title, desc, mock, align }: { title: string; desc: string; mock: React.ReactNode; align: 'left' | 'right' }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${align === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="lg:col-span-5 lg:px-2">
        <div className="text-[11px] uppercase tracking-[0.2em] text-indigo-300 font-semibold">{align === 'left' ? 'Modul 01' : align === 'right' ? 'Modul 02' : 'Modul 03'}</div>
        <h3 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-zinc-400 leading-relaxed text-[15px]">{desc}</p>
        <a className="mt-5 inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 cursor-pointer">
          In der Demo ansehen <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="lg:col-span-7 relative">
        <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl rounded-[2rem] opacity-60" />
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)]">
          {mock}
        </div>
      </div>
    </div>
  )
}

function ShotDashboard() {
  return (
    <>
      <BrowserBar url="app.knowflow.ai/dashboard" />
      <div className="bg-zinc-50 text-zinc-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Operations Cockpit</div>
            <div className="text-base font-semibold">Wissens-Risiko Übersicht</div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Sparkles size={10} /> KI-Insights bereit
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2.5">
          <MockKpi tone="rose" label="Lücken" value="7" delta="+2" up={false} />
          <MockKpi tone="amber" label="Renten" value="3" delta="2026" up={false} />
          <MockKpi tone="emerald" label="Quote" value="68%" delta="+14%" up />
          <MockKpi tone="indigo" label="Onboarding" value="-37%" delta="vs Q1" up />
        </div>
        <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-3">
          <div className="text-[11px] font-semibold flex items-center gap-1.5">
            <Lightbulb size={12} className="text-indigo-500" /> Strategische KI-Erkenntnis
          </div>
          <div className="mt-1.5 text-[11px] text-zinc-600 leading-relaxed">
            <b className="text-zinc-900">68 % des CNC-Wissens</b> hängen an 2 Mitarbeitern. Empfehlung: Notfall-Cluster anlegen, 3 SOPs priorisieren.
          </div>
        </div>
      </div>
    </>
  )
}

function ShotCapture() {
  return (
    <>
      <BrowserBar url="app.knowflow.ai/wissensaufnahme" />
      <div className="bg-zinc-50 text-zinc-900 p-5">
        <div className="text-base font-semibold">Wissens-Eintrag · CNC-200 Spindellager</div>
        <div className="mt-1 text-[11px] text-zinc-500">Heinz Müller · Senior CNC-Programmierer</div>
        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/40 p-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-700">
            <Sparkles size={12} /> KI-Analyse · Schritt 4 von 6
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-indigo-100 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-violet-500" />
          </div>
          <div className="mt-2 text-[11px] text-zinc-600">Identifiziere Maschinenkontext …</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <OutputCard icon={<FileText size={11} />} title="SOP-Empfehlung" body="Lagerwechsel CNC-200" />
          <OutputCard icon={<ShieldAlert size={11} />} title="Sicherheit" body="3 Regeln extrahiert" />
          <OutputCard icon={<AlertTriangle size={11} />} title="Anfängerfehler" body="5 typische Fehler" />
          <OutputCard icon={<GraduationCap size={11} />} title="Trainingsmodul" body="2 Lerneinheiten" />
        </div>
      </div>
    </>
  )
}

function OutputCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-700">
        <span className="text-indigo-500">{icon}</span> {title}
      </div>
      <div className="mt-1 text-[10px] text-zinc-500">{body}</div>
    </div>
  )
}

function ShotAssistant() {
  return (
    <>
      <BrowserBar url="app.knowflow.ai/copilot" />
      <div className="bg-zinc-50 text-zinc-900 p-5">
        <div className="text-base font-semibold">Operations Copilot</div>
        <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-3">
          <div className="text-[11px] text-zinc-500 mb-1">Du · vor wenigen Sekunden</div>
          <div className="text-[12px]">Was tun, wenn die CNC-200 nach Lagerwechsel ungewöhnlich vibriert?</div>
        </div>
        <div className="mt-2.5 rounded-xl border border-indigo-200 bg-white p-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-700">
            <Bot size={12} /> KnowFlow Copilot
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700">Konfidenz 92 %</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <AnsChip label="Kurzdiagnose" body="Lager nicht korrekt eingelaufen" />
            <AnsChip label="Ursache" body="Vorspannung zu hoch" />
            <AnsChip label="Schritt 1" body="Spindel abschalten" />
            <AnsChip label="Sicherheit" body="Tür-Sensor prüfen" />
          </div>
          <div className="mt-2 text-[10px] text-zinc-500">Quelle: Eintrag #142 · Heinz Müller</div>
        </div>
      </div>
    </>
  )
}

function AnsChip({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-2">
      <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">{label}</div>
      <div className="mt-0.5 text-[11px] text-zinc-800">{body}</div>
    </div>
  )
}

/* ----------------------------- TESTIMONIALS ------------------------------- */

function Testimonials() {
  const items = [
    {
      quote: 'KnowFlow hat uns in 6 Wochen gezeigt, was 20 Jahre interne Doku nicht geschafft haben: das Wissen unserer CNC-Crew ist jetzt strukturiert, suchbar und einsatzbereit für jeden neuen Kollegen.',
      name: 'Dr. Markus Reinhardt',
      role: 'COO',
      company: 'Reinhardt Präzisionsbau GmbH · Maschinenbau · 240 MA',
      avatar: 'MR',
      color: 'from-indigo-500 to-violet-500',
    },
    {
      quote: 'Wir haben drei Schichtleiter, die in 18 Monaten in Rente gehen. Vorher war das ein Albtraum, heute ist es ein Projektplan. Das ist nicht nur ein Tool – das ist Risikomanagement.',
      name: 'Sabine Hofmann',
      role: 'Head of HR',
      company: 'NordTeig Backwaren KG · Lebensmittelindustrie · 380 MA',
      avatar: 'SH',
      color: 'from-fuchsia-500 to-rose-500',
    },
    {
      quote: 'Der Copilot beantwortet Fragen, die wir vorher dem Schichtleiter per WhatsApp gestellt haben. Mit Quelle, Konfidenz und Sicherheits­hinweis. Wir sparen mindestens 6 Stunden pro Woche pro Schicht.',
      name: 'Tobias Klemmer',
      role: 'Werksleiter',
      company: 'PlastForm Industrie AG · Kunststoff · 165 MA',
      avatar: 'TK',
      color: 'from-emerald-500 to-teal-500',
    },
  ]
  return (
    <section id="kunden" className="relative py-24 lg:py-32 border-t border-white/5 bg-gradient-to-b from-zinc-900/40 to-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Stimmen aus der Industrie"
          title={<>Was Operations- und HR-Leader<br /><span className="text-zinc-500">wirklich sagen.</span></>}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <Testimonial key={t.name} {...t} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial({ quote, name, role, company, avatar, color, delay }: { quote: string; name: string; role: string; company: string; avatar: string; color: string; delay: number }) {
  return (
    <figure
      className="kf-stagger relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 kf-glass-dark kf-lift flex flex-col"
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <Quote size={22} className="text-indigo-400/70" />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-zinc-200">
        „{quote}"
      </blockquote>
      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/5">
        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-xs font-semibold text-white shadow-lg`}>
          {avatar}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{name}</div>
          <div className="text-[12px] text-zinc-400">{role}</div>
          <div className="text-[11px] text-zinc-500 truncate">{company}</div>
        </div>
      </div>
      <div className="absolute top-5 right-5 flex items-center gap-0.5 text-amber-300">
        {[0,1,2,3,4].map(i => <Star key={i} size={11} className="fill-current" />)}
      </div>
    </figure>
  )
}

/* -------------------------------- PRICING --------------------------------- */

function Pricing({ onEnterApp }: { onEnterApp: () => void }) {
  const tiers = [
    {
      name: 'Starter',
      desc: 'Pilotprojekt für einen kritischen Wissensbereich.',
      price: '990',
      unit: '€ / Monat',
      cta: 'Pilot starten',
      featured: false,
      features: [
        'Bis 30 Mitarbeiter',
        '1 Wissens-Cluster',
        'KI-Wissensaufnahme & SOP-Generator',
        'Operations Copilot (Basic)',
        'E-Mail-Support · 1 Werktag',
      ],
    },
    {
      name: 'Professional',
      desc: 'Für Mittelständler mit mehreren kritischen Wissens­bereichen.',
      price: '2.490',
      unit: '€ / Monat',
      cta: 'Demo buchen',
      featured: true,
      features: [
        'Bis 150 Mitarbeiter',
        'Unbegrenzte Wissens-Cluster',
        'Alle Plattform-Werkzeuge',
        'Sicherheitswissen + Audit-Trail',
        'Strategische KI-Insights',
        'SLA: 4 Std. Reaktionszeit',
      ],
    },
    {
      name: 'Enterprise',
      desc: 'Konzern-weiter Rollout mit Multi-Werk, Multi-Sprache, SSO.',
      price: 'Custom',
      unit: 'individuell',
      cta: 'Kontakt aufnehmen',
      featured: false,
      features: [
        'Unbegrenzte Mitarbeiter',
        'Multi-Werk / Multi-Sprache',
        'SSO · SCIM · Audit-API',
        'Dedizierter Customer Success',
        'On-Premise / Private Cloud',
        'SLA: 1 Std. · 24/7 Pager',
      ],
    },
  ]

  return (
    <section id="preise" className="relative py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          eyebrow="Preise"
          title={<>Transparent. Vom Pilot<br /><span className="text-zinc-500">bis zum Konzern-Rollout.</span></>}
          sub="Faire Preise für faire Wissens­arbeit. Alle Pläne inkl. DSGVO, EU-Hosting und Onboarding-Workshop."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <PricingCard key={t.name} {...t} onEnterApp={onEnterApp} />
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-zinc-500">
          Alle Preise zzgl. MwSt. · Mindestlaufzeit 12 Monate · Pilot 4 Wochen Fix-Preis 4.900 €
        </div>
      </div>
    </section>
  )
}

function PricingCard({ name, desc, price, unit, cta, featured, features, onEnterApp }: { name: string; desc: string; price: string; unit: string; cta: string; featured: boolean; features: string[]; onEnterApp: () => void }) {
  if (featured) {
    return (
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-95" />
        <div className="absolute inset-0 kf-grid-bg opacity-20 pointer-events-none" />
        <div className="relative p-7 lg:p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">{name}</div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur uppercase tracking-wider font-semibold">Beliebt</span>
          </div>
          <div className="mt-2 text-sm text-white/80">{desc}</div>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight">{price}</span>
            <span className="text-sm text-white/80">{unit}</span>
          </div>
          <button onClick={onEnterApp} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition">
            {cta} <ArrowRight size={14} />
          </button>
          <ul className="mt-6 space-y-2.5 text-sm">
            {features.map(f => (
              <li key={f} className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-white shrink-0" /> {f}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-8 kf-glass-dark kf-lift flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold tracking-tight text-white">{name}</div>
      </div>
      <div className="mt-2 text-sm text-zinc-400">{desc}</div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-5xl font-semibold tracking-tight text-white">{price}</span>
        <span className="text-sm text-zinc-500">{unit}</span>
      </div>
      <button onClick={onEnterApp} className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.04] text-white font-medium transition">
        {cta} <ArrowRight size={14} />
      </button>
      <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-indigo-400 shrink-0" /> {f}</li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------ FINAL CTA --------------------------------- */

function FinalCTA({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <section className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
      <div className="kf-aurora bg-indigo-600/40" style={{ top: 40, left: '20%', width: 480, height: 480 }} />
      <div className="kf-aurora bg-fuchsia-600/30" style={{ top: 80, right: '15%', width: 520, height: 520, animationDelay: '3s' }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs text-zinc-300">
          <Sparkles size={12} className="text-indigo-300" /> Bereit für deinen ersten Wissens-Cluster?
        </div>
        <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
          <span className="kf-grad-text">Bewahre das Wissen.</span>
          <br />
          <span className="text-zinc-500">Skaliere deine Operations.</span>
        </h2>
        <p className="mt-6 text-zinc-400 text-[15px] lg:text-base max-w-2xl mx-auto leading-relaxed">
          In 4 Wochen vom ersten Experten-Interview zum produktiven Copilot.
          Starte jetzt mit einem Pilotprojekt – wir liefern messbaren ROI oder du zahlst nichts.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onEnterApp}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition"
          >
            Demo buchen <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </button>
          <button
            onClick={onEnterApp}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium transition"
          >
            <Zap size={14} /> Pilotprojekt starten
          </button>
        </div>
        <div className="mt-6 text-[12px] text-zinc-500">
          Ø Antwortzeit unter 2 Stunden · Erstgespräch kostenlos · Keine Bindung
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- FOOTER ---------------------------------- */

function Footer() {
  const cols = [
    { title: 'Produkt', links: ['Features', 'Lösungen', 'Preise', 'Sicherheit', 'Roadmap'] },
    { title: 'Unternehmen', links: ['Über uns', 'Kunden', 'Karriere', 'Presse', 'Partner'] },
    { title: 'Ressourcen', links: ['Blog', 'Webinare', 'Case Studies', 'API-Docs', 'Hilfe'] },
    { title: 'Rechtliches', links: ['Impressum', 'Datenschutz', 'AGB', 'DSGVO', 'Status'] },
  ]
  return (
    <footer className="relative border-t border-white/5 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </span>
            <span className="font-semibold tracking-tight">KnowFlow <span className="text-indigo-300">AI</span></span>
          </div>
          <p className="mt-4 text-sm text-zinc-400 max-w-xs">
            Der Operations-Copilot für den industriellen Mittelstand. Wissen sichern. Onboarding beschleunigen. Sicherheit erhöhen.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a className="h-8 w-8 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition"><Linkedin size={14} /></a>
            <a className="h-8 w-8 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition"><Twitter size={14} /></a>
            <a className="h-8 w-8 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition"><Github size={14} /></a>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">{c.title}</div>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(l => (
                <li key={l}><a className="text-sm text-zinc-300 hover:text-white transition cursor-pointer">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>© {new Date().getFullYear()} KnowFlow AI GmbH · Made with ❤ in München</div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Globe size={11} /> EU-Hosting</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={11} /> ISO 27001 ready</span>
            <span className="inline-flex items-center gap-1.5"><Lock size={11} /> DSGVO-konform</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
