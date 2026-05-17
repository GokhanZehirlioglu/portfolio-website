import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { ArrowUpRight, Calendar, Monitor, User, ChevronDown, ChevronUp, Info, AlertTriangle } from "lucide-react";

// ── Modul 5 colour theme — Violet / Purple ──────────────────────────────────
const C  = "#8B5CF6";   // violet-500
const AZ = "#C4B5FD";   // violet-300
const BG = "#1A1735";   // medium dark bg
const CARD = "#231F48"; // card bg
const BORDER = "#4A3D8A"; // subtle border

// ── Inline helpers ────────────────────────────────────────────────────────────

/** Monospace command / value */
const Cmd = ({ children }: { children: React.ReactNode }) => (
    <code style={{
        background: "#2D2660", color: AZ,
        border: `1px solid ${BORDER}`,
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: "11.5px", padding: "1px 6px", borderRadius: "4px",
        whiteSpace: "nowrap",
    }}>{children}</code>
);

/** GUI navigation path: Server-Manager → Lokaler Server → … */
const Nav = ({ steps }: { steps: string[] }) => (
    <span style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: "11.5px" }}>
        {steps.map((s, i) => (
            <span key={i}>
                <span style={{ color: AZ }}>{s}</span>
                {i < steps.length - 1 && <span style={{ color: "#6B7280", margin: "0 4px" }}>›</span>}
            </span>
        ))}
    </span>
);

/** Single numbered implementation step */
const Step = ({ num, children }: { num: number; children: React.ReactNode }) => (
    <div style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: `1px solid ${BORDER}28` }}>
        <div style={{
            flexShrink: 0, width: "28px", height: "28px", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: "700", marginTop: "1px",
            background: `${C}18`, color: C, border: `1px solid ${C}30`,
        }}>{num}</div>
        <div style={{ color: "#CBD5E1", fontSize: "13px", lineHeight: "1.65", flexGrow: 1 }}>{children}</div>
    </div>
);

/** Collapsible implementation section */
type ImplProps = {
    num: string;
    title: string;
    theory?: React.ReactNode;
    hint?: React.ReactNode;
    scenario?: React.ReactNode;
    children: React.ReactNode;
};
const ImplSection = ({ num, title, theory, hint, scenario, children }: ImplProps) => {
    const [open, setOpen] = useState(true);
    return (
        <div style={{ border: `1px solid ${C}25`, borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
            {/* Header */}
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: "14px 20px", background: `${C}12`, cursor: "pointer",
                    borderBottom: open ? `1px solid ${C}20` : "none",
                    textAlign: "left",
                }}
            >
                <span style={{
                    fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px",
                    background: `${C}25`, color: AZ, flexShrink: 0,
                }}>{num}</span>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#F8FAFC", flexGrow: 1 }}>{title}</span>
                {open
                    ? <ChevronUp size={14} style={{ color: AZ, flexShrink: 0 }} />
                    : <ChevronDown size={14} style={{ color: `${C}80`, flexShrink: 0 }} />}
            </button>

            {open && (
                <>
                    {/* Context block */}
                    {(theory || hint || scenario) && (
                        <div style={{ background: "#201D3E", padding: "16px 20px", borderBottom: `1px solid ${BORDER}40` }}>
                            {theory && (
                                <div style={{ display: "flex", gap: "10px", marginBottom: hint || scenario ? "12px" : 0 }}>
                                    <Info size={14} style={{ color: `${C}80`, flexShrink: 0, marginTop: "2px" }} />
                                    <div style={{ fontSize: "12.5px", color: "#94A3B8", lineHeight: "1.65" }}>{theory}</div>
                                </div>
                            )}
                            {hint && (
                                <div style={{
                                    background: "#2E285A", borderRadius: "10px", padding: "12px 14px",
                                    border: `1px solid ${C}30`, marginBottom: scenario ? "12px" : 0,
                                }}>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <AlertTriangle size={13} style={{ color: "#FBBF24", flexShrink: 0, marginTop: "1px" }} />
                                        <div style={{ fontSize: "12px", color: "#DDD6FE", lineHeight: "1.6" }}>{hint}</div>
                                    </div>
                                </div>
                            )}
                            {scenario && (
                                <div style={{ marginTop: theory || hint ? "12px" : 0 }}>
                                    <div style={{ fontSize: "10px", fontWeight: "700", color: `${AZ}90`, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Szenario</div>
                                    <div style={{ fontSize: "12.5px", color: "#A5B4FC", lineHeight: "1.65" }}>{scenario}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Steps */}
                    <div style={{ background: BG, padding: "4px 20px 8px" }}>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

/** Q&A Accordion */
type QA = { q: string; a: React.ReactNode };
const QAAccordion = ({ items }: { items: QA[] }) => {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {items.map((item, i) => (
                <div key={i} style={{
                    border: `1px solid ${open === i ? `${C}45` : `${C}20`}`,
                    borderRadius: "12px", overflow: "hidden",
                }}>
                    <button
                        onClick={() => setOpen(p => p === i ? null : i)}
                        style={{
                            width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                            gap: "12px", padding: "14px 18px", textAlign: "left", cursor: "pointer",
                            background: open === i ? CARD : "#1A1735",
                        }}
                    >
                        <span style={{ fontSize: "13px", fontWeight: "600", color: "#F1F5F9", lineHeight: "1.45", flexGrow: 1 }}>{item.q}</span>
                        {open === i
                            ? <ChevronUp size={13} style={{ color: AZ, flexShrink: 0, marginTop: "2px" }} />
                            : <ChevronDown size={13} style={{ color: `${C}60`, flexShrink: 0, marginTop: "2px" }} />}
                    </button>
                    {open === i && (
                        <div style={{
                            padding: "12px 18px 16px", background: "#201D3E",
                            borderTop: `1px solid ${BORDER}50`,
                            fontSize: "13px", color: "#94A3B8", lineHeight: "1.7",
                        }}>{item.a}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

// ── Section label divider ─────────────────────────────────────────────────────
const SectionTitle = ({ label }: { label: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "36px 0 18px" }}>
        <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: C }}>{label}</span>
        <div style={{ flex: 1, height: "1px", background: `${C}20` }} />
    </div>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const techStack = [
    { k: "Stammdomänencontroller", v: "192.168.1.200  ·  gfnlab.test  ·  DNS, Bridgeheadserver" },
    { k: "Server1",                v: "192.168.1.1    ·  gfnlab.test  ·  Zusätzlicher DC, DNS" },
    { k: "Server2",                v: "192.168.2.100  ·  sub.gfnlab.test  ·  Untergeordneter DC (Standort Bern)" },
    { k: "Server3",                v: "192.168.1.3    ·  it.pro  ·  Gesamtstruktur-Stammcontroller (zweite Firma)" },
    { k: "Gesamtstruktur 1",       v: "gfnlab.test  —  Stammdomäne des Labors" },
    { k: "Untergeordnete Domäne",  v: "sub.gfnlab.test  —  Filiale / Türkei-Niederlassung (Subnetz 192.168.2.0/24)" },
    { k: "Gesamtstruktur 2",       v: "it.pro  —  eigenständige zweite Firma (Übernahmeszenario)" },
    { k: "Betriebssystem",         v: "Windows Server 2022 Datacenter Evaluation" },
    { k: "Virtualisierung",        v: "Hyper-V" },
];

const summaryRows = [
    { sec: "3.1", el: "Child Domain sub.gfnlab.test",    zweck: "Eigene Admin-Hierarchie innerhalb der Gesamtstruktur",                method: "Automatische Parent-Child-Vertrauensstellung" },
    { sec: "3.2", el: "Gesamtstruktur it.pro",           zweck: "Eigenständige zweite Firma — vollständig isolierter Forest",          method: "Neue Gesamtstruktur einrichten" },
    { sec: "3.3", el: "DNS-Zonenübertragung",            zweck: "Gegenseitige Namensauflösung (Pflicht vor Forest Trust)",             method: "Sekundäre DNS-Zonen (Secondary Zones)" },
    { sec: "3.4", el: "Forest Trust",                    zweck: "Ressourcenzugriff gesamtstrukturübergreifend (Firmenfusion)",         method: "Manuelle bidirektionale Gesamtstrukturvertrauensstellung" },
    { sec: "3.5", el: "Selective Authentication",        zweck: "Gezielter Zugriff nur auf bestimmte Server",                         method: "Berechtigung 'Authentifizierung zulassen' pro Computerobjekt" },
    { sec: "3.6", el: "UPN-Suffix + Namensuffixrouting", zweck: "Einheitliche Unternehmenskennung nach Fusion (@gfnholding.de)",       method: "Alternativer UPN-Suffix + Routing aktivieren" },
    { sec: "3.7", el: "Standorte und Subnetze",          zweck: "Physische Netzwerktopologie in AD abbilden (site-aware logon)",       method: "Sites + Subnetz-Zuweisungen in AD Sites & Services" },
    { sec: "3.8", el: "Standortverknüpfungen & Zeitplan",zweck: "WAN-Replikation zeitlich steuern, Bandbreite schonen",               method: "Site Links mit Kosten, Zeitplan und Replikationsintervall" },
    { sec: "3.9", el: "Bridgeheadserver",                zweck: "Alle WAN-Replikation auf leistungsstarken Server bündeln",           method: "Manueller Preferred Bridgehead Server" },
];

const qa: QA[] = [
    {
        q: "1 · Was ist eine Vertrauensstellung und was bewirkt sie?",
        a: <>Eine Vertrauensstellung ist eine logische Beziehung zwischen zwei AD-Strukturen. Sie ermöglicht es Benutzern der einen Seite, Berechtigungen auf Ressourcen der anderen Seite zu erhalten — <em>aber nur, wenn der Administrator diese Berechtigungen explizit erteilt</em>. Die Vertrauensstellung selbst gewährt keinen Zugriff; sie schafft lediglich die technische Grundlage dafür.</>,
    },
    {
        q: "2 · Welche drei unveränderlichen Eigenschaften hat eine automatische Parent-Child-Vertrauensstellung?",
        a: <><strong>Bidirektional</strong> — beide Seiten vertrauen einander. <strong>Transitiv</strong> — das Vertrauen vererbt sich über alle Ebenen der Gesamtstruktur. <strong>Nicht löschbar</strong> — solange die Gesamtstruktur intakt ist, kann diese Vertrauensstellung weder gelöscht noch deaktiviert werden.</>,
    },
    {
        q: "3 · Wann OU, wann untergeordnete Domäne?",
        a: <><strong>OU</strong> wenn: eine Abteilung/Standort verwaltet werden soll, alle denselben Richtlinien unterliegen, dasselbe IT-Team verwaltet, delegierte Verwaltung ausreicht — ein OU-Admin bleibt stets dem Domänenadmin unterstellt. <strong>Child Domain</strong> wenn: eigene Administratoren mit eigenen GPOs benötigt werden, eine eigene Sicherheitsgrenze erforderlich ist, eine Landesgesellschaft vollständig eigenverantwortlich verwaltet werden soll.</>,
    },
    {
        q: "4 · Wann wird ein Forest Trust eingerichtet und was ist die zwingende Voraussetzung?",
        a: <>Ein Forest Trust wird eingerichtet, wenn zwei vollständig getrennte Forests verbunden werden sollen — typischerweise nach einer Firmenfusion. <strong>Zwingende Voraussetzung:</strong> gegenseitige DNS-Namensauflösung. Beide Seiten müssen die Hostnamen der jeweils anderen Gesamtstruktur über DNS auflösen können, <em>bevor</em> die Vertrauensstellung eingerichtet werden kann.</>,
    },
    {
        q: "5 · Warum ist ein Forest Trust nicht transitiv zwischen Forests?",
        a: <>Wenn gfnlab.test der Gesamtstruktur it.pro vertraut und it.pro wiederum xyz.local vertraut, vertraut gfnlab.test der xyz.local <strong>nicht automatisch</strong>. Das Vertrauen breitet sich zwar innerhalb jeder einzelnen Gesamtstruktur transitiv aus, überschreitet aber die Forest-Grenzen nicht. Jede neue Verbindung muss explizit konfiguriert werden.</>,
    },
    {
        q: "6 · Gesamtstrukturweite vs. ausgewählte Authentifizierung — Unterschied?",
        a: <><strong>Gesamtstrukturweite Authentifizierung:</strong> Benutzer der anderen Gesamtstruktur werden automatisch auf <em>allen</em> Servern authentifiziert — wie lokale Domänenbenutzer. <strong>Ausgewählte Authentifizierung:</strong> Benutzer können sich nur mit Servern verbinden, auf denen ihnen explizit die Berechtigung <em>'Authentifizierung zulassen'</em> erteilt wurde. Alle anderen Server bleiben unerreichbar.</>,
    },
    {
        q: "7 · Was ist ein Shortcut Trust und wann ist er sinnvoll?",
        a: <>Ein Shortcut Trust ist eine manuelle, unidirektionale Vertrauensstellung <em>innerhalb</em> einer bestehenden Gesamtstruktur. Er wird eingesetzt, wenn Benutzer aus einer tief verschachtelten Domäne häufig auf eine andere tief verschachtelte Domäne zugreifen. Ohne Shortcut Trust muss die Authentifizierung den vollständigen Vertrauenspfad nach oben und wieder nach unten traversieren — das verlangsamt die Anmeldung erheblich.</>,
    },
    {
        q: "8 · Drei Methoden für gegenseitige DNS-Namensauflösung zwischen Forests?",
        a: <><strong>1. Zonenübertragung (Secondary Zone):</strong> vollständige Kopie der DNS-Zone auf dem eigenen DNS-Server. <strong>2. Bedingte Weiterleitung (Conditional Forwarder):</strong> Anfragen für bestimmte Domänennamen direkt an den DNS-Server der anderen Seite weiterleiten. <strong>3. Stubzone:</strong> nur NS- und SOA-Einträge der anderen Zone, automatisch aktuell gehalten. Alle drei Methoden sind vollwertige Lösungen.</>,
    },
    {
        q: "9 · Was ist ein UPN und warum werden alternative UPN-Suffixe benötigt?",
        a: <>Der Benutzerprinzipalname (UPN) hat das Format <Cmd>Benutzername@Domäne</Cmd>. Alternative Suffixe werden benötigt, wenn Benutzer nach einer Firmenfusion eine einheitliche, unternehmensweite Anmeldekennung verwenden sollen — z. B. <Cmd>@gfnholding.de</Cmd> statt <Cmd>@it.pro</Cmd>. Namensuffixrouting leitet die Authentifizierungsanfrage korrekt an den zuständigen Forest weiter.</>,
    },
    {
        q: "10 · Was ist ein AD-Standort und welche zwei Vorteile bietet die Standortdefinition?",
        a: <><strong>Standort (Site):</strong> logische Einheit, die eine physische Netzwerkeinheit mit schneller LAN-Verbindung repräsentiert. Jedem Standort werden IP-Subnetze zugewiesen. <strong>Vorteil 1 (site-aware logon):</strong> Benutzer werden beim Anmeldevorgang zum nächstgelegenen DC im selben Standort geleitet — kein unnötiger WAN-Verkehr. <strong>Vorteil 2 (Replikationssteuerung):</strong> Inter-Site-Replikation kann zeitlich geplant und auf bestimmte Server konzentriert werden.</>,
    },
    {
        q: "11 · Vier Parameter einer Standortverknüpfung?",
        a: <><strong>Kosten (Cost):</strong> niedrigere Kosten = bevorzugte Route bei mehreren Alternativen. <strong>Replikationsintervall:</strong> wie oft pro erlaubtem Zeitfenster repliziert wird (Standard: 180 Min). <strong>Zeitplan (Schedule):</strong> definierte Stunden, in denen Replikation erlaubt ist. <strong>Transportprotokoll:</strong> IP (synchron, Standard) oder SMTP (asynchron). Daten über 50 KB werden automatisch komprimiert.</>,
    },
    {
        q: "12 · Was ist ein Bridgeheadserver und warum manuelle Konfiguration?",
        a: <>Der Bridgeheadserver ist der DC eines Standorts, der <em>alle</em> Inter-Site-Replikation (WAN) mit anderen Standorten abwickelt. Er empfängt eingehende Replikationsdaten und verteilt sie intern per Intra-Site-Replikation. AD wählt ihn automatisch — die Wahl kann jedoch ungünstig sein (z. B. schwächerer Server). <strong>Manuelle Konfiguration</strong> stellt sicher, dass der leistungsstärkste Server diese Aufgabe übernimmt.</>,
    },
    {
        q: "13 · Vier AD-Partitionen und ihre Replikationsreichweite?",
        a: <><strong>Domänenpartition:</strong> Benutzer, Gruppen, Computer — nur innerhalb der eigenen Domäne. <strong>Konfigurationspartition:</strong> Forest-Aufbau (Domänen, Trusts, Sites) — gesamtstrukturweit. <strong>Schemapartition:</strong> Datenbankstruktur — gesamtstrukturweit. <strong>Anwendungspartition:</strong> manuell erstellt (z. B. DNS) — individuell konfigurierbarer Replikationsumfang.</>,
    },
    {
        q: "14 · Was ist der KCC (Knowledge Consistency Checker)?",
        a: <>Der KCC ist ein automatischer Dienst auf jedem DC, der die Replikationstopologie überwacht und optimiert. Bei Ausfall eines Controllers oder Hinzufügen eines neuen passt er die Verbindungen automatisch an, sodass alle DCs in einem logischen bidirektionalen Ring verbunden bleiben und Änderungen jeden DC innerhalb einer definierten Zeitspanne erreichen.</>,
    },
    {
        q: "15 · Wann werden Site Link Bridges benötigt?",
        a: <>Site Link Bridges werden benötigt, wenn das Netzwerk <strong>nicht vollständig geroutet</strong> ist — d. h. nicht jeder Standort hat direkte IP-Verbindungen zu jedem anderen. Beispiel: A↔B und B↔C, aber kein direktes A↔C. Ohne Brücke kennt AD die indirekte Route A→B→C nicht. Die Brücke macht diese transitiven Verbindungen explizit sichtbar und ermöglicht die Replikation über mehrere Hops.</>,
    },
];

// ═════════════════════════════════════════════════════════════════════════════
const ProjektModul5Part1 = () => {
    const [theoryOpen, setTheoryOpen] = useState(false);
    return (
        <Layout>
            <Helmet>
                <title>Vertrauensstellungen &amp; Standort-Topologie — Modul 5 — Gökhan Zehirlioglu</title>
                <meta name="description" content="Enterprise Active Directory — Forest Trust, Child Domain, DNS-Zonenübertragung, Selective Authentication, AD Sites & Replication, Bridgeheadserver." />
            </Helmet>

            {/* ══ HERO ══════════════════════════════════════════════════════════ */}
            <header className="relative overflow-hidden text-white"
                style={{ background: "linear-gradient(135deg, #1A1635 0%, #231E48 50%, #2A2260 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)" }} />

                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/50 mb-7 flex-wrap">
                        <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <span style={{ color: AZ }} className="font-medium">Modul 5 — Enterprise AD Administration</span>
                    </nav>

                    <div className="flex flex-wrap gap-2 mb-5">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ background: "#00C85218", color: "#00C852", border: "1px solid #00C85240" }}>Fertig</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ background: "#ffffff10", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 5 · Projekt 1</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ background: `${C}18`, color: AZ, border: `1px solid ${C}30` }}>Enterprise Active Directory</span>
                    </div>

                    <h1 className="text-[clamp(1.8rem,4vw,2.7rem)] font-bold leading-[1.15] tracking-tight mb-3">
                        Vertrauensstellungen &amp;<br />
                        <span style={{ color: AZ }}>Standort-Topologie</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/60 leading-relaxed max-w-[620px] mb-8">
                        Multi-Forest Active Directory — automatische und manuelle Vertrauensstellungen,
                        DNS-Zonenübertragung zwischen Gesamtstrukturen, Selective Authentication,
                        UPN-Suffixrouting, AD Sites &amp; Services sowie Bridgeheadserver-Konfiguration
                        in einer Labor-Umgebung mit drei Standorten.
                    </p>

                    <div className="flex flex-wrap gap-5 mb-8">
                        <div className="flex items-center gap-2 text-[13px] text-white/50"><Calendar size={13} className="opacity-60" /><strong className="text-white/80 font-medium">2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/50"><Monitor size={13} className="opacity-60" /><strong className="text-white/80 font-medium">Windows Server 2022</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/50"><User size={13} className="opacity-60" /><strong className="text-white/80 font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {["Forest Trust","Child Domain","DNS-Zonenübertragung","Selective Auth","UPN-Routing","AD Sites & Services","Site Link","Bridgeheadserver","KCC","Replikation"].map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full"
                                style={{ background: `${C}12`, color: `${AZ}cc`, border: `1px solid ${C}20`, fontFamily: "monospace" }}>{t}</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* ══ CONTENT ═══════════════════════════════════════════════════════ */}
            <div style={{ background: BG, color: "#E2E8F0", minHeight: "100vh" }}>
                <div className="max-w-[820px] mx-auto px-6 py-12">

                    {/* Download */}
                    <a href="/Microsoft/modül 5 döükmantation/Modül5-Projekt 1_Vertraungsstellung und Standortverknüpfung.docx"
                        download
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            padding: "10px 18px", borderRadius: "10px", textDecoration: "none",
                            background: CARD, border: `1px solid ${C}30`, color: AZ,
                            fontSize: "13px", fontWeight: "600", marginBottom: "36px",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.background = `${C}15`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = `${C}30`; e.currentTarget.style.background = CARD; }}
                    >
                        <ArrowUpRight size={15} />
                        Originaldokumentation herunterladen · DOCX
                    </a>

                    {/* ── Systemkonfiguration ─────────────────────────────────── */}
                    <SectionTitle label="Systemkonfiguration" />
                    <div style={{ border: `1px solid ${C}25`, borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
                        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
                            <thead>
                                <tr style={{ background: CARD }}>
                                    <th style={{ padding: "10px 18px", textAlign: "left", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B", borderBottom: `1px solid ${C}20`, fontWeight: "600" }}>Eigenschaft</th>
                                    <th style={{ padding: "10px 18px", textAlign: "left", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B", borderBottom: `1px solid ${C}20`, fontWeight: "600" }}>Wert</th>
                                </tr>
                            </thead>
                            <tbody>
                                {techStack.map(({ k, v }, i) => (
                                    <tr key={k} style={{ background: i % 2 === 0 ? "#1C1938" : "#22203E" }}>
                                        <td style={{ padding: "10px 18px", fontSize: "12.5px", fontWeight: "600", color: AZ, borderBottom: `1px solid ${C}12`, whiteSpace: "nowrap" }}>{k}</td>
                                        <td style={{ padding: "10px 18px", fontSize: "12px", color: "#94A3B8", borderBottom: `1px solid ${C}12`, fontFamily: "ui-monospace, monospace" }}>{v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Theorie (collapsible) ────────────────────────────────── */}
                    <SectionTitle label="1. Einleitung & Theorie" />
                    <button
                        onClick={() => setTheoryOpen(o => !o)}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                            gap: "10px", padding: "13px 18px", borderRadius: "12px", cursor: "pointer",
                            background: CARD, border: `1px solid ${C}25`, color: "#F1F5F9",
                            fontSize: "13px", fontWeight: "600", marginBottom: "8px", textAlign: "left",
                        }}
                    >
                        <span>Theoretische Grundlagen ein-/ausblenden</span>
                        {theoryOpen ? <ChevronUp size={14} style={{ color: AZ }} /> : <ChevronDown size={14} style={{ color: `${C}70` }} />}
                    </button>

                    {theoryOpen && (
                        <div style={{ padding: "4px 0 16px" }}>
                            {[
                                { title: "1.1 Vertrauensstellungen", body: <><p style={{ marginBottom: "10px" }}>Eine Vertrauensstellung ist eine logische Beziehung zwischen zwei AD-Strukturen. Sie ermöglicht Ressourcenzugriff — gewährt ihn aber nicht; der Admin muss Berechtigungen explizit erteilen.</p><p><strong style={{ color: AZ }}>Typen:</strong> Automatisch (Parent-Child, bidirektional, transitiv, nicht löschbar) · Forest Trust (manuell, Firmenfusion) · Shortcut Trust (Abkürzung in tiefen Hierarchien) · Externe Vertrauensstellung (NT 4.0 / nicht-AD).</p></> },
                                { title: "1.2 Replikation", body: <><p style={{ marginBottom: "8px" }}>AD repliziert nicht ganze Objekte, sondern nur einzelne geänderte Attribute (attributbasierte Replikation). Jede Änderung erhält eine USN (Update Sequence Number).</p><p style={{ marginBottom: "8px" }}><strong style={{ color: AZ }}>AD-Partitionen:</strong> Domänenpartition (nur innerhalb der Domäne) · Konfigurationspartition (Forest-weit) · Schemapartition (Forest-weit) · Anwendungspartition (individuell).</p><p><strong style={{ color: AZ }}>KCC (Knowledge Consistency Checker):</strong> Automatischer Dienst, der die Replikationstopologie überwacht und bei Änderungen (neuer/ausgefallener DC) anpasst. Intra-Site: sofort. Inter-Site: zeitgesteuert.</p></> },
                                { title: "1.3 Standorte und Standortverknüpfungen", body: <><p style={{ marginBottom: "8px" }}>Ein <strong style={{ color: AZ }}>Site</strong> repräsentiert eine physische LAN-Einheit mit schneller Verbindung. Ohne Standortdefinition behandelt AD alle DCs als gleichwertig — auch über WAN-Leitungen.</p><p style={{ marginBottom: "8px" }}><strong style={{ color: AZ }}>Vorteile:</strong> Site-aware Logon (nächster DC) · Gezielte Replikationssteuerung.</p><p><strong style={{ color: AZ }}>Site Link-Parameter:</strong> Kosten · Replikationsintervall · Zeitplan · Transportprotokoll (IP oder SMTP). Daten über 50 KB werden automatisch komprimiert.</p></> },
                            ].map(s => (
                                <div key={s.title} style={{ borderRadius: "12px", border: `1px solid ${C}20`, overflow: "hidden", marginBottom: "10px" }}>
                                    <div style={{ padding: "10px 16px", background: `${C}10`, borderBottom: `1px solid ${C}15` }}>
                                        <span style={{ fontSize: "12px", fontWeight: "700", color: AZ }}>{s.title}</span>
                                    </div>
                                    <div style={{ padding: "14px 16px", background: "#1E1B38", fontSize: "13px", color: "#94A3B8", lineHeight: "1.7" }}>{s.body}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Implementierung ─────────────────────────────────────── */}
                    <SectionTitle label="3. Implementierung" />

                    {/* 3.1 */}
                    <ImplSection
                        num="3.1"
                        title="Automatische Vertrauensstellung — Untergeordnete Domäne (Child Domain)"
                        theory={<>Beim Hinzufügen einer neuen Child Domain erzeugt Active Directory automatisch eine <strong style={{ color: AZ }}>bidirektionale, transitive und nicht löschbare Parent-Child-Vertrauensstellung</strong> zwischen gfnlab.test und sub.gfnlab.test. Diese Vertrauensstellung kann weder deaktiviert noch manuell entfernt werden.</>}
                        hint={<><strong>Wann OU, wann untergeordnete Domäne?</strong><br />
                            <span style={{ display: "block", marginTop: "8px" }}><strong style={{ color: AZ }}>OU verwenden wenn:</strong> Abteilung/Standort mit denselben Unternehmensrichtlinien · dasselbe IT-Team verwaltet · delegierte Verwaltung ausreicht (OU-Admin bleibt dem übergeordneten Admin unterstellt).</span>
                            <span style={{ display: "block", marginTop: "6px" }}><strong style={{ color: AZ }}>Child Domain verwenden wenn:</strong> eigene Administratoren mit eigenen GPOs · eigene Sicherheitsgrenze · Landesgesellschaft eigenverantwortlich (Beispiel: gfnlab.test = Zentrale, sub.gfnlab.test = Türkei-Niederlassung).</span></>}
                        scenario={<>Server2 (IP: 192.168.2.100, Subnetz 192.168.2.0/24) wird aus gfnlab.test ausgetragen und als Stammdomänencontroller der neuen Child Domain <Cmd>sub.gfnlab.test</Cmd> konfiguriert. Das Subnetz 192.168.2.0/24 simuliert praxisnah eine physisch getrennte Filiale.</>}
                    >
                        <Step num={1}><strong>Server2 aus gfnlab.test austragen:</strong><br /><Nav steps={["Server-Manager", "Lokaler Server", "Domäne (Klick auf den Domänennamen)", "Ändern"]} /> → Mitgliedschaft bei: <Cmd>Arbeitsgruppe</Cmd> → Name: <Cmd>WORKGROUP</Cmd> eingeben → OK → Gültige Admin-Zugangsdaten bestätigen → Neustart.</Step>
                        <Step num={2}>Nach dem Neustart als lokaler Administrator anmelden. <Nav steps={["Server-Manager", "Rollen und Features hinzufügen"]} /> → Weiter bis zur Rollenauswahl → <Cmd>Active Directory-Domänendienste</Cmd> auswählen → Alle erforderlichen Features bestätigen → Installieren.</Step>
                        <Step num={3}>Nach Abschluss der Installation: Im Server-Manager auf das <strong>gelbe Warnfähnchen</strong> (oben rechts) klicken → <Cmd>Server zu einem Domänencontroller heraufstufen</Cmd> auswählen.</Step>
                        <Step num={4}><strong>Bereitstellungskonfiguration:</strong> Option <Cmd>Neue Domäne zu einer vorhandenen Gesamtstruktur hinzufügen</Cmd> auswählen.</Step>
                        <Step num={5}><strong>Domänentyp:</strong> <Cmd>Untergeordnete Domäne</Cmd> wählen. <em style={{ color: "#64748B" }}>(Nicht "Neue Gesamtstruktur" — das würde einen isolierten Forest erstellen.)</em></Step>
                        <Step num={6}><strong>Übergeordnete Domäne:</strong> <Cmd>gfnlab.test</Cmd> eintragen. <strong>Neuer Domänenname</strong> (nur das neue Segment): <Cmd>sub</Cmd> → der vollständige FQDN wird automatisch zu <Cmd>sub.gfnlab.test</Cmd>.</Step>
                        <Step num={7}><strong>Anmeldeinformationen angeben:</strong> Auf <Cmd>Ändern</Cmd> klicken → Zugangsdaten des Stammdomänenadministrators eingeben: Benutzername <Cmd>gfnlab\Administrator</Cmd>, Kennwort <Cmd>Pa55w.rd</Cmd> → OK.</Step>
                        <Step num={8}><strong>Domänencontrolleroptionen:</strong> DSRM-Kennwort festlegen: <Cmd>Pa55w.rd</Cmd> → alle anderen Standardwerte belassen → Weiter.</Step>
                        <Step num={9}><strong>DNS-Optionen:</strong> Eine Delegierungswarnung erscheint — im Laborbetrieb <strong>normal</strong> und kann ignoriert werden → Weiter.</Step>
                        <Step num={10}><strong>Weitere Optionen:</strong> NetBIOS-Name wird automatisch zu <Cmd>SUB</Cmd> → Weiter durch alle restlichen Seiten → <strong>Voraussetzungsüberprüfung</strong> abwarten (kann 1–2 Minuten dauern) → <Cmd>Installieren</Cmd>. Server startet automatisch neu.</Step>
                        <Step num={11}><strong>Anmeldung nach Neustart:</strong> Als <Cmd>sub\Administrator</Cmd> anmelden → überprüfen, ob der Server als DC von sub.gfnlab.test fungiert: <Nav steps={["Server-Manager", "Tools", "Active Directory-Benutzer und -Computer"]} /> → sub.gfnlab.test sollte als Domäne sichtbar sein.</Step>
                        <Step num={12}><strong>Vertrauensstellung auf dem Stammdomänencontroller verifizieren:</strong> <Nav steps={["Server-Manager", "Tools", "Active Directory-Domänen und -Vertrauensstellungen"]} /> → <Cmd>gfnlab.test</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd> → Registerkarte <Cmd>Vertrauensstellungen</Cmd> → In der Liste der ausgehenden und eingehenden Vertrauensstellungen muss <Cmd>sub.gfnlab.test</Cmd> mit Typ "Übergeordnet-Untergeordnet" erscheinen.</Step>
                    </ImplSection>

                    {/* 3.2 */}
                    <ImplSection
                        num="3.2"
                        title="Zweite unabhängige Gesamtstruktur einrichten: it.pro"
                        theory={<>Eine Gesamtstruktur (Forest) ist die <strong style={{ color: AZ }}>höchste Verwaltungsgrenze</strong> in Active Directory. Zwei verschiedene Forests sind vollständig voneinander isoliert — es findet keinerlei automatische Kommunikation statt, solange keine manuelle Vertrauensstellung eingerichtet wird. Server3 wird aus gfnlab.test ausgetragen und als eigenständiger Forest-Root-DC konfiguriert.</>}
                        scenario={<>Server3 (IP: 192.168.1.3) repräsentiert eine eigenständige Firma, die später von gfnlab.test übernommen wird. Er wird aus gfnlab.test ausgetragen und als Stammdomänencontroller des neuen Forests <Cmd>it.pro</Cmd> konfiguriert. Nach diesem Schritt existieren zwei vollständig getrennte AD-Umgebungen.</>}
                    >
                        <Step num={13}><strong>Server3 aus gfnlab.test austragen:</strong> <Nav steps={["Server-Manager", "Lokaler Server", "Domäne", "Ändern"]} /> → Mitgliedschaft: <Cmd>Arbeitsgruppe</Cmd> → Name: <Cmd>WORKGROUP</Cmd> → Lokales Administrator-Kennwort auf <Cmd>Pa55w.rd</Cmd> setzen → OK → Neustart.</Step>
                        <Step num={14}>Nach Neustart als lokaler Administrator anmelden. AD DS-Rolle installieren: <Nav steps={["Server-Manager", "Rollen und Features hinzufügen", "Active Directory-Domänendienste"]} /> → Installieren.</Step>
                        <Step num={15}>Gelbes Fähnchen → <Cmd>Server zu einem Domänencontroller heraufstufen</Cmd>.</Step>
                        <Step num={16}><strong>Bereitstellungskonfiguration:</strong> <Cmd>Neue Gesamtstruktur hinzufügen</Cmd> auswählen. <em style={{ color: "#EF4444", fontSize: "12px" }}>Wichtig: NICHT "Untergeordnete Domäne" — das würde sub.gfnlab.test eine weitere Child Domain hinzufügen.</em></Step>
                        <Step num={17}><strong>Name der Stammdomäne:</strong> <Cmd>it.pro</Cmd> eingeben → Weiter.</Step>
                        <Step num={18}><strong>Gesamtstruktur- und Domänenfunktionsebene:</strong> <Cmd>Windows Server 2016</Cmd> belassen. <strong>DNS-Server:</strong> Haken gesetzt lassen. <strong>Globaler Katalog (GC):</strong> ebenfalls gesetzt lassen → Weiter.</Step>
                        <Step num={19}><strong>DSRM-Kennwort:</strong> <Cmd>Pa55w.rd</Cmd> festlegen → Weiter durch alle Folgeseiten → Voraussetzungsüberprüfung abwarten → <Cmd>Installieren</Cmd>. Server startet automatisch neu (kann 3–10 Minuten dauern).</Step>
                        <Step num={20}>Nach Neustart als <Cmd>it\Administrator</Cmd> mit Kennwort <Cmd>Pa55w.rd</Cmd> anmelden. <Nav steps={["Active Directory-Domänen und -Vertrauensstellungen"]} /> → <Cmd>it.pro</Cmd> muss als Stammdomäne des neuen Forests sichtbar sein.</Step>
                        <Step num={21}><strong>Netzwerkkonnektivität prüfen (Pflichtschritt vor 3.3!):</strong> Auf dem Stammdomänencontroller (gfnlab.test) eine Eingabeaufforderung öffnen → <Cmd>ping 192.168.1.3</Cmd> ausführen. Antwort muss kommen — ohne Verbindung ist DNS-Zonenübertragung nicht möglich.</Step>
                    </ImplSection>

                    {/* 3.3 */}
                    <ImplSection
                        num="3.3"
                        title="Voraussetzung: DNS-Namensauflösung zwischen den Forests (Zonenübertragung)"
                        theory={<>Kerberos-Authentifizierung und AD-Replikation arbeiten ausschließlich mit <strong style={{ color: AZ }}>FQDNs (vollqualifizierte Domänennamen)</strong> — IP-Adressen allein reichen nicht. Bevor eine Gesamtstrukturvertrauensstellung eingerichtet werden kann, müssen beide DNS-Server die Hostnamen der jeweils anderen Seite auflösen können. Drei Methoden: Zonenübertragung (dieses Projekt) · Bedingte Weiterleitung · Stubzone.</>}
                        scenario={<>Nach der Einrichtung von it.pro kann der Stammdomänencontroller <Cmd>server3.it.pro</Cmd> nicht auflösen, und Server3 kann <Cmd>dc.gfnlab.test</Cmd> nicht auflösen. <Cmd>nslookup</Cmd>-Tests auf beiden Seiten müssen erfolgreich sein, bevor mit 3.4 fortgefahren wird.</>}
                    >
                        <Step num={25}><strong>Zonenübertragung auf dem Stammdomänencontroller erlauben:</strong> <Nav steps={["Server-Manager", "Tools", "DNS-Manager"]} /> → Forward-Lookupzonen → <Cmd>gfnlab.test</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd>.</Step>
                        <Step num={26}>Registerkarte <Cmd>Zonenübertragungen</Cmd> → Haken setzen bei <Cmd>Zonenübertragungen zulassen</Cmd> → Option <Cmd>Nur an folgende Server</Cmd> wählen → <Cmd>Bearbeiten</Cmd> → IP-Adresse von Server3 eingeben: <Cmd>192.168.1.3</Cmd> → Eingabetaste → OK → Übernehmen.</Step>
                        <Step num={27}><strong>Sekundäre Zone auf Server3 erstellen:</strong> DNS-Manager auf Server3 öffnen → Forward-Lookupzonen Rechtsklick → <Cmd>Neue Zone</Cmd>.</Step>
                        <Step num={28}>Zonentyp: <Cmd>Sekundäre Zone</Cmd> → Zonenname: <Cmd>gfnlab.test</Cmd> → Master-DNS-Server: <Cmd>192.168.1.200</Cmd> eintragen → Eingabetaste → Weiter → Fertigstellen.</Step>
                        <Step num={29}><strong>Übertragung prüfen:</strong> In der Forward-Lookupzone von Server3 sollte die Zone <Cmd>gfnlab.test</Cmd> nun mit allen Einträgen (A-Records für Stammdomänencontroller, Server1 etc.) gefüllt sein. Falls leer: Zone Rechtsklick → <Cmd>Von Master übertragen</Cmd>.</Step>
                        <Step num={30}><strong>Gegenrichtung — Zonenübertragung von it.pro erlauben:</strong> DNS-Manager auf Server3 → Forward-Lookupzonen → <Cmd>it.pro</Cmd> Rechtsklick → Eigenschaften → Registerkarte Zonenübertragungen → Haken setzen → "Nur an folgende Server" → IP des Stammdomänencontrollers: <Cmd>192.168.1.200</Cmd> → OK.</Step>
                        <Step num={31}><strong>Sekundäre Zone it.pro auf dem Stammdomänencontroller erstellen:</strong> DNS-Manager → Forward-Lookupzonen Rechtsklick → Neue Zone → Sekundäre Zone → Name: <Cmd>it.pro</Cmd> → Master: <Cmd>192.168.1.3</Cmd> → Fertigstellen. Einträge von Server3 abwarten.</Step>
                        <Step num={32}><strong>Pflichtprüfung — Stammdomänencontroller:</strong> Eingabeaufforderung → <Cmd>nslookup server3.it.pro</Cmd> → Ergebnis muss die IP <Cmd>192.168.1.3</Cmd> zurückgeben.</Step>
                        <Step num={33}><strong>Pflichtprüfung — Server3:</strong> Eingabeaufforderung → <Cmd>nslookup dc.gfnlab.test</Cmd> → Ergebnis muss die IP <Cmd>192.168.1.200</Cmd> zurückgeben. <strong style={{ color: "#F87171" }}>Erst wenn beide Tests erfolgreich sind, mit 3.4 fortfahren!</strong></Step>
                    </ImplSection>

                    {/* 3.4 */}
                    <ImplSection
                        num="3.4"
                        title="Gesamtstrukturvertrauensstellung (Forest Trust) einrichten"
                        theory={<>Die Forest Trust verbindet zwei bisher vollständig isolierte Forests. Im Gegensatz zu automatischen Vertrauensstellungen muss diese <strong style={{ color: AZ }}>manuell von einem Administrator konfiguriert</strong> werden. Bei bidirektionaler Einrichtung mit der Option "Für beide Domänen" geschieht die Gegenseite automatisch (sofern Admin-Zugangsdaten der anderen Seite bekannt). Wichtig: Die Forest Trust ist innerhalb jedes Forests transitiv, aber <strong style={{ color: AZ }}>nicht zwischen Forests</strong> — eine dritte verbundene Gesamtstruktur erbt das Vertrauen nicht.</>}
                        scenario={<>Das Unternehmen gfnlab.test hat it.pro übernommen. Mitarbeiter beider Unternehmen sollen auf Ressourcen der jeweils anderen Seite zugreifen können (Dateifreigaben, interne Anwendungen). DNS-Namensauflösung wurde in 3.3 konfiguriert.</>}
                    >
                        <Step num={36}><Nav steps={["Server-Manager", "Tools", "Active Directory-Domänen und -Vertrauensstellungen"]} /> auf dem Stammdomänencontroller öffnen.</Step>
                        <Step num={37}><Cmd>gfnlab.test</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd> → Registerkarte <Cmd>Vertrauensstellungen</Cmd> → Schaltfläche <Cmd>Neue Vertrauensstellung</Cmd> klicken → Willkommen-Dialog: Weiter.</Step>
                        <Step num={38}><strong>Vertrauensstellungsname:</strong> <Cmd>it.pro</Cmd> eingeben → Weiter. <em style={{ color: "#64748B", fontSize: "12px" }}>AD prüft DNS — der Name muss auflösbar sein (Ergebnis aus 3.3).</em></Step>
                        <Step num={39}><strong>Vertrauenstyp:</strong> <Cmd>Gesamtstrukturvertrauensstellung</Cmd> auswählen. <em style={{ color: "#64748B", fontSize: "12px" }}>Dieser Eintrag erscheint nur, wenn die Gegenseite tatsächlich eine Forest-Root-Domain ist.</em> → Weiter.</Step>
                        <Step num={40}><strong>Richtung der Vertrauensstellung:</strong> <Cmd>Bidirektional</Cmd> wählen — Benutzer beider Seiten können auf Ressourcen der jeweils anderen zugreifen → Weiter.</Step>
                        <Step num={41}><strong>Vertrauensstellungsseiten:</strong> <Cmd>Für diese Domäne und die angegebene Domäne</Cmd> wählen → Weiter. <em style={{ color: "#64748B", fontSize: "12px" }}>Dies konfiguriert beide Seiten gleichzeitig.</em></Step>
                        <Step num={42}><strong>Benutzername und Kennwort der Gegenseite:</strong> <Cmd>Administrator</Cmd> / <Cmd>Pa55w.rd</Cmd> (Administrator-Konto von it.pro) eingeben → Weiter.</Step>
                        <Step num={43}><strong>Authentifizierungsebene — ausgehend:</strong> <Cmd>Gesamtstrukturweite Authentifizierung</Cmd> wählen — Benutzer der anderen Gesamtstruktur werden wie lokale Domänenbenutzer behandelt → Weiter.</Step>
                        <Step num={44}><strong>Authentifizierungsebene — eingehend:</strong> Ebenfalls <Cmd>Gesamtstrukturweite Authentifizierung</Cmd> → Weiter → Einstellungen prüfen → Weiter.</Step>
                        <Step num={45}><strong>Ausgehende Vertrauensstellung bestätigen:</strong> <Cmd>Ja, ausgehende Vertrauensstellung bestätigen</Cmd> → Weiter. <strong>Eingehende Vertrauensstellung bestätigen:</strong> <Cmd>Ja, eingehende Vertrauensstellung bestätigen</Cmd> → Weiter → Fertigstellen.</Step>
                        <Step num={46}><strong>Überprüfung:</strong> In der Vertrauensstellungsliste von gfnlab.test muss <Cmd>it.pro</Cmd> mit Typ <Cmd>Gesamtstruktur</Cmd> erscheinen. Auf Server3: <Nav steps={["Active Directory-Domänen und -Vertrauensstellungen", "it.pro", "Eigenschaften", "Vertrauensstellungen"]} /> → <Cmd>gfnlab.test</Cmd> muss ebenfalls sichtbar sein.</Step>
                    </ImplSection>

                    {/* 3.5 */}
                    <ImplSection
                        num="3.5"
                        title="Ausgewählte Authentifizierung (Selective Authentication) aktivieren"
                        theory={<>Nach Einrichtung einer Forest Trust mit gesamtstrukturweiter Authentifizierung können Benutzer der fremden Gesamtstruktur auf <strong style={{ color: AZ }}>alle</strong> Ressourcen zugreifen, auf die normale Domänenbenutzer Zugriff haben. Mit <strong style={{ color: AZ }}>Selective Authentication</strong> wird diese pauschale Berechtigung aufgehoben: Benutzer der fremden Gesamtstruktur können sich nur noch mit Servern verbinden, auf denen ihnen explizit die Berechtigung <em>'Authentifizierung zulassen'</em> an dem Computerobjekt erteilt wurde.</>}
                        scenario={<>Benutzer von it.pro sollen <strong>nur</strong> auf die Dateifreigaben von Server1 zugreifen dürfen. Der Stammdomänencontroller und alle anderen Server sollen für it.pro-Benutzer nicht erreichbar sein.</>}
                    >
                        <Step num={47}><Nav steps={["Active Directory-Domänen und -Vertrauensstellungen", "gfnlab.test", "Rechtsklick", "Eigenschaften", "Vertrauensstellungen"]} /> → <Cmd>it.pro</Cmd> in der Liste auswählen → <Cmd>Eigenschaften</Cmd>.</Step>
                        <Step num={48}>Registerkarte <Cmd>Authentifizierung</Cmd> → Option <Cmd>Ausgewählte Authentifizierung</Cmd> wählen → <Cmd>Übernehmen</Cmd> → OK. <em style={{ color: "#64748B", fontSize: "12px" }}>Ab jetzt sind alle Server für it.pro-Benutzer gesperrt, bis sie explizit berechtigt werden.</em></Step>
                        <Step num={49}><strong>Server1 explizit berechtigen:</strong> <Nav steps={["Active Directory-Benutzer und -Computer"]} /> öffnen.</Step>
                        <Step num={50}><strong>Erweiterte Features aktivieren:</strong> Menü <Cmd>Ansicht</Cmd> → <Cmd>Erweiterte Features</Cmd> einschalten. <em style={{ color: "#64748B", fontSize: "12px" }}>Ohne diesen Schritt ist die Registerkarte "Sicherheit" an Computerobjekten nicht sichtbar.</em></Step>
                        <Step num={51}>Unter <Cmd>Domain Controllers</Cmd>: <Cmd>SERVER1</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd> → Registerkarte <Cmd>Sicherheit</Cmd> → Schaltfläche <Cmd>Hinzufügen</Cmd>.</Step>
                        <Step num={52}><Cmd>Pfade</Cmd> klicken → <Cmd>it.pro</Cmd> auswählen → OK. Im Textfeld <Cmd>Domänenbenutzer</Cmd> eingeben → <Cmd>Namen überprüfen</Cmd> → <Cmd>it\Domänenbenutzer</Cmd> wird aufgelöst → OK.</Step>
                        <Step num={53}>In der Berechtigungsliste: <strong>Nur</strong> <Cmd>Authentifizierung zulassen</Cmd> auf <Cmd>Zulassen</Cmd> setzen — alle anderen Berechtigungen unverändert lassen → Übernehmen → OK.</Step>
                        <Step num={54}><strong>Verifizierung — Stammdomänencontroller gesperrt:</strong> Von Server3 aus Windows-Explorer öffnen → Adressleiste: <Cmd>\\dc.gfnlab.test\</Cmd> eingeben → <strong>Zugriff verweigert</strong> muss erscheinen ✓</Step>
                        <Step num={55}><strong>Verifizierung — Server1 erreichbar:</strong> Von Server3: <Cmd>\\server1.gfnlab.test\test-Srv1\</Cmd> → <strong>Zugriff soll möglich sein</strong> ✓ (Freigabe muss zuvor auf Server1 angelegt worden sein).</Step>
                        <Step num={56}><strong>Cache leeren:</strong> Stammdomänencontroller neu starten, um gecachte Authentifizierungsinformationen zu verwerfen. Danach Schritte 54–55 erneut prüfen.</Step>
                    </ImplSection>

                    {/* 3.6 */}
                    <ImplSection
                        num="3.6"
                        title="UPN-Suffix und Namensuffixrouting (@gfnholding.de)"
                        theory={<>Nach einer Firmenfusion ist es oft gewünscht, dass Benutzer des übernommenen Unternehmens sich unter einem <strong style={{ color: AZ }}>einheitlichen Firmennamen</strong> anmelden — z. B. <Cmd>hans@gfnholding.de</Cmd> statt <Cmd>hans@it.pro</Cmd>. Hierfür wird in it.pro ein alternativer UPN-Suffix registriert. Damit die Anmeldung auch von gfnlab.test aus funktioniert, muss das <strong style={{ color: AZ }}>Namensuffixrouting</strong> auf der Seite von gfnlab.test aktiviert werden — nur dann leitet AD eine Anfrage mit diesem Suffix korrekt an it.pro weiter.</>}
                        scenario={<>Nach der Übernahme von it.pro sollen alle it.pro-Benutzer die neue Unternehmenskennung <Cmd>@gfnholding.de</Cmd> verwenden. Die Anmeldung soll mit beiden Suffixes (<Cmd>@it.pro</Cmd> und <Cmd>@gfnholding.de</Cmd>) möglich sein.</>}
                    >
                        <Step num={57}><strong>Auf Server3 (it.pro):</strong> <Nav steps={["Server-Manager", "Tools", "Active Directory-Domänen und -Vertrauensstellungen"]} /> öffnen.</Step>
                        <Step num={58}>Ganz oben in der Konsolenstruktur auf <Cmd>Active Directory-Domänen und -Vertrauensstellungen</Cmd> Rechtsklick (nicht auf die Domäne, sondern auf den Konsolenwurzelknoten) → <Cmd>Eigenschaften</Cmd>.</Step>
                        <Step num={59}>Im Feld <Cmd>Alternative Benutzerprinzipalname-Suffixe</Cmd>: <Cmd>gfnholding.de</Cmd> eintragen → <Cmd>Hinzufügen</Cmd> → OK. Der neue Suffix erscheint in der Liste.</Step>
                        <Step num={60}><Nav steps={["Active Directory-Benutzer und -Computer"]} /> öffnen → gewünschten Benutzer auswählen → Rechtsklick → <Cmd>Eigenschaften</Cmd> → Registerkarte <Cmd>Konto</Cmd>.</Step>
                        <Step num={61}>Im UPN-Suffix-Dropdown (rechts neben dem Benutzernamen): <Cmd>gfnholding.de</Cmd> auswählen → OK. Der UPN des Benutzers lautet nun <Cmd>benutzername@gfnholding.de</Cmd>.</Step>
                        <Step num={62}><strong>Anmeldetest auf Server3:</strong> Server3 neu starten → bei der Anmeldemaske als <Cmd>administrator@gfnholding.de</Cmd> anmelden → <strong>muss erfolgreich sein</strong> ✓</Step>
                        <Step num={63}><strong>Namensuffixrouting auf dem Stammdomänencontroller aktivieren:</strong> <Nav steps={["Active Directory-Domänen und -Vertrauensstellungen", "it.pro", "Rechtsklick", "Eigenschaften"]} />.</Step>
                        <Step num={64}>Registerkarte <Cmd>Namensuffixrouting</Cmd> → Schaltfläche <Cmd>Aktualisieren</Cmd> klicken → <Cmd>gfnholding.de</Cmd> muss in der Liste erscheinen.</Step>
                        <Step num={65}>Eintrag <Cmd>gfnholding.de</Cmd> auswählen → Schaltfläche <Cmd>Aktivieren</Cmd> klicken → OK. <em style={{ color: "#64748B", fontSize: "12px" }}>Ohne diesen Schritt leitet gfnlab.test Anfragen mit @gfnholding.de nicht an it.pro weiter.</em></Step>
                        <Step num={66}><strong>Abschlusskontrolle:</strong> Von Server3 als <Cmd>administrator@gfnholding.de</Cmd> auf <Cmd>\\server1.gfnlab.test\</Cmd> zugreifen — Anmeldung und Zugriff müssen funktionieren ✓</Step>
                    </ImplSection>

                    {/* 3.7 */}
                    <ImplSection
                        num="3.7"
                        title="Standortverwaltung — Standorte und Subnetze anlegen"
                        theory={<>Ohne Standortdefinition behandelt AD alle DCs als gleichwertig — unabhängig von ihrer physischen Lage. Ein Benutzer in München könnte sich über einen DC in Bern authentifizieren, auch wenn ein lokaler DC verfügbar ist. Die Standortdefinition teilt AD mit, welche IP-Subnetze zu welchem physischen Standort gehören. Beim <strong style={{ color: AZ }}>site-aware logon</strong> sucht der Client zuerst einen DC im eigenen Subnetz — erst wenn keiner gefunden wird, kontaktiert er einen entfernten Standort.</>}
                        scenario={<>Das Unternehmen expandiert: Zur Zentrale <Cmd>München</Cmd> (192.168.1.0/24) kommen die Filialen <Cmd>Bern</Cmd> (192.168.2.0/24) und <Cmd>Wien</Cmd> (192.168.3.0/24) hinzu. Server2 arbeitet bereits im Subnetz 192.168.2.0/24 und wird dem Standort Bern zugeordnet.</>}
                    >
                        <Step num={67}><Nav steps={["Server-Manager", "Tools", "Active Directory-Standorte und -Dienste"]} /> auf dem Stammdomänencontroller öffnen.</Step>
                        <Step num={68}><strong>Standort München anlegen:</strong> In der linken Baumstruktur <Cmd>Sites</Cmd> Rechtsklick → <Cmd>Neuer Standort</Cmd> → Name: <Cmd>München</Cmd> → <Cmd>DEFAULTIPSITELINK</Cmd> auswählen → OK → Meldung bestätigen.</Step>
                        <Step num={69}><strong>Standort Bern anlegen:</strong> Gleicher Vorgang → Name: <Cmd>Bern</Cmd>. <strong>Standort Wien anlegen:</strong> Name: <Cmd>Wien</Cmd>.</Step>
                        <Step num={70}><strong>Subnetz München zuweisen:</strong> <Cmd>Subnets</Cmd> Rechtsklick → <Cmd>Neues Subnetz</Cmd> → Präfix: <Cmd>192.168.1.0/24</Cmd> → Standort: <Cmd>München</Cmd> → OK.</Step>
                        <Step num={71}><strong>Subnetz Bern:</strong> Neues Subnetz → Präfix: <Cmd>192.168.2.0/24</Cmd> → Standort: <Cmd>Bern</Cmd> → OK.</Step>
                        <Step num={72}><strong>Subnetz Wien:</strong> Neues Subnetz → Präfix: <Cmd>192.168.3.0/24</Cmd> → Standort: <Cmd>Wien</Cmd> → OK.</Step>
                        <Step num={73}><strong>Server in Standorte verschieben:</strong> <Cmd>Default-First-Site-Name</Cmd> aufklappen → <Cmd>Servers</Cmd> → <Cmd>Stammdomänencontroller</Cmd> Rechtsklick → <Cmd>Verschieben</Cmd> → <Cmd>München</Cmd> → OK.</Step>
                        <Step num={74}><Cmd>Server1</Cmd> Rechtsklick → <Cmd>Verschieben</Cmd> → <Cmd>München</Cmd> → OK.</Step>
                        <Step num={75}><Cmd>Server2</Cmd> Rechtsklick → <Cmd>Verschieben</Cmd> → <Cmd>Bern</Cmd> → OK. <em style={{ color: "#64748B", fontSize: "12px" }}>Server2 befindet sich bereits im Subnetz 192.168.2.0/24, das jetzt Bern zugewiesen ist — AD nutzt diese Information für site-aware logon.</em></Step>
                        <Step num={76}><strong>Abschlusskontrolle:</strong> Jeden Standort aufklappen → unter <Cmd>Servers</Cmd> müssen die zugehörigen Server sichtbar sein. Unter <Cmd>Subnets</Cmd> müssen alle drei Subnetze erscheinen.</Step>
                    </ImplSection>

                    {/* 3.8 */}
                    <ImplSection
                        num="3.8"
                        title="Standortverknüpfungen und Replikationszeitplan konfigurieren"
                        theory={<>Standortverknüpfungen (Site Links) sind das <strong style={{ color: AZ }}>logische Abbild physischer WAN-Verbindungen</strong>. Ohne Site Link replizieren DCs verschiedener Standorte nicht miteinander. Das <Cmd>DEFAULTIPSITELINK</Cmd> verbindet alle Standorte mit Standardwerten — für individuelle Steuerung wird für jede WAN-Verbindung eine eigene Site Link empfohlen. Wichtig: Wenn die Replikation nur in der Nacht erlaubt ist, bleibt die WAN-Verbindung tagsüber vollständig für Benutzerverkehr frei.</>}
                        scenario={<>Die WAN-Verbindung zwischen München und Wien hat begrenzte Bandbreite. Replikationsverkehr soll <strong>nur außerhalb der Geschäftszeiten</strong> (21:00–06:00 Uhr) stattfinden. Replikationsintervall: 180 Minuten.</>}
                    >
                        <Step num={77}><Nav steps={["Active Directory-Standorte und -Dienste", "Inter-Site Transports", "IP"]} /> → Rechtsklick → <Cmd>Neue Standortverknüpfung</Cmd>.</Step>
                        <Step num={78}>Name: <Cmd>München-Wien</Cmd> eingeben. In der linken Liste <Cmd>München</Cmd> markieren → <Cmd>Hinzufügen</Cmd> → <Cmd>Wien</Cmd> → <Cmd>Hinzufügen</Cmd>. Beide müssen in der rechten Liste "Standorte in dieser Standortverknüpfung" stehen → OK.</Step>
                        <Step num={79}><strong>Kosten und Zeitplan:</strong> Das neue Objekt <Cmd>München-Wien</Cmd> doppelklicken → <strong>Kosten:</strong> <Cmd>100</Cmd> eintragen (anpassbar je nach Leitungsqualität; niedrigere Kosten = bevorzugte Route).</Step>
                        <Step num={80}><Cmd>Zeitplan ändern</Cmd> klicken. Im Zeitplanraster die Spalten <strong>06:00–21:00 Uhr</strong> für alle sieben Wochentage markieren → Option <Cmd>Replikation nicht verfügbar</Cmd> setzen. Die Spalten <strong>21:00–06:00 Uhr</strong> frei lassen (Replikation erlaubt).</Step>
                        <Step num={81}><strong>Replikationsintervall:</strong> <Cmd>180</Cmd> Minuten eintragen → OK.</Step>
                        <Step num={82}><strong>Standortverknüpfung München-Bern anlegen:</strong> Gleicher Vorgang: Name <Cmd>München-Bern</Cmd>, Standorte München + Bern, Kosten nach Bedarf, Zeitplan optional → OK.</Step>
                        <Step num={83}><strong>Überprüfung:</strong> Unter <Cmd>Inter-Site Transports › IP</Cmd> müssen beide Site Links (München-Wien und München-Bern) sichtbar sein. Das DEFAULTIPSITELINK kann optional gelöscht werden, wenn alle Verbindungen explizit konfiguriert sind.</Step>
                    </ImplSection>

                    {/* 3.9 */}
                    <ImplSection
                        num="3.9"
                        title="Bridgeheadserver manuell festlegen"
                        theory={<>In einem Standort mit mehreren DCs wählt AD automatisch einen <strong style={{ color: AZ }}>Preferred Bridgehead Server</strong> für Inter-Site-Replikation. Diese Automatik kann ungünstig sein — z. B. wenn ein leistungsschwacher Server gewählt wird. Der Bridgeheadserver ist der einzige Kontaktpunkt für eingehende Replikationsdaten aus anderen Standorten; er verteilt diese dann intern per Intra-Site-Replikation an alle anderen DCs des Standorts.</>}
                        scenario={<>Im Standort München befinden sich der Stammdomänencontroller (leistungsstark: 16 Kerne) und Server1 (mittlere Leistung: 4 Kerne). Alle WAN-Replikation soll ausschließlich über den Stammdomänencontroller laufen. Server1 wird aus der Bridgeheadserver-Rolle entfernt.</>}
                    >
                        <Step num={87}><Nav steps={["Active Directory-Standorte und -Dienste", "Sites", "München", "Servers"]} /> → <Cmd>Stammdomänencontroller</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd>.</Step>
                        <Step num={88}>Im Bereich <Cmd>Transporte für standortübergreifende Datenübermittlung</Cmd>: In der <strong>linken Liste</strong> <Cmd>IP</Cmd> auswählen → Schaltfläche <Cmd>Hinzufügen</Cmd> klicken → <Cmd>IP</Cmd> erscheint in der <strong>rechten Liste</strong> → OK. <em style={{ color: "#64748B", fontSize: "12px" }}>Der Stammdomänencontroller ist jetzt manueller Bridgeheadserver für IP-Replikation.</em></Step>
                        <Step num={89}><Cmd>Server1</Cmd> Rechtsklick → <Cmd>Eigenschaften</Cmd>: Falls <Cmd>IP</Cmd> bereits in der rechten Liste steht → markieren → <Cmd>Entfernen</Cmd> → OK. <em style={{ color: "#64748B", fontSize: "12px" }}>Server1 wird aus der Bridgeheadserver-Kandidatenliste entfernt.</em></Step>
                        <Step num={90}><strong>Replikation manuell auslösen und prüfen:</strong> Eingabeaufforderung auf dem Stammdomänencontroller öffnen → <Cmd>repadmin /syncall /Ade</Cmd> ausführen.</Step>
                        <Step num={91}><Cmd>repadmin /showrepl</Cmd> ausführen → In der Ausgabe die Zeilen mit "Inter-Site" prüfen: Die Inter-Site-Verbindungen müssen <strong>ausschließlich</strong> über den Stammdomänencontroller laufen ✓</Step>
                        <Step num={92}><strong>Optionale Überprüfung im GUI:</strong> <Nav steps={["Active Directory-Standorte und -Dienste", "Sites", "München", "Servers", "Stammdomänencontroller", "NTDS Settings"]} /> → Rechtsklick → <Cmd>Alle Verbindungen jetzt replizieren</Cmd> → Kein Fehler darf erscheinen ✓</Step>
                    </ImplSection>

                    {/* ── Zusammenfassung ─────────────────────────────────────── */}
                    <SectionTitle label="4. Zusammenfassung" />
                    <div style={{ border: `1px solid ${C}25`, borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
                        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: "12px" }}>
                            <thead>
                                <tr style={{ background: CARD }}>
                                    {["Abschnitt","Element","Zweck","Methode"].map(h => (
                                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748B", borderBottom: `1px solid ${C}20`, fontWeight: "600" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {summaryRows.map((r, i) => (
                                    <tr key={r.sec} style={{ background: i % 2 === 0 ? "#1C1938" : "#22203E" }}>
                                        <td style={{ padding: "9px 14px", fontWeight: "700", color: C, borderBottom: `1px solid ${C}12` }}>{r.sec}</td>
                                        <td style={{ padding: "9px 14px", fontWeight: "600", color: "#E2E8F0", borderBottom: `1px solid ${C}12` }}>{r.el}</td>
                                        <td style={{ padding: "9px 14px", color: "#64748B", borderBottom: `1px solid ${C}12` }} className="hidden md:table-cell">{r.zweck}</td>
                                        <td style={{ padding: "9px 14px", color: "#4B5563", borderBottom: `1px solid ${C}12` }} className="hidden lg:table-cell">{r.method}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Wissenscheck ────────────────────────────────────────── */}
                    <SectionTitle label="5. Wissenscheck — 15 Fragen & Antworten" />
                    <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.65", marginBottom: "16px" }}>
                        Frage anklicken, um die Antwort einzublenden. Geeignet zur Selbstkontrolle und Prüfungsvorbereitung.
                    </p>
                    <QAAccordion items={qa} />

                    {/* Back */}
                    <div style={{ paddingTop: "32px", marginTop: "32px", borderTop: `1px solid ${C}20` }}>
                        <a href="/windows-projekte" style={{ fontSize: "13px", color: "#64748B", textDecoration: "none" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#E2E8F0"}
                            onMouseLeave={e => e.currentTarget.style.color = "#64748B"}>
                            ← Microsoft Enterprise IT Übersicht
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul5Part1;
