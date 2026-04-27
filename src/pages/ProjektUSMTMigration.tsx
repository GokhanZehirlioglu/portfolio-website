import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import ProjectRuler from "@/components/ProjectRuler";
import {
    Calendar, Monitor, CheckCircle2, ArrowRight,
    AlertCircle, User, Maximize2
} from "lucide-react";

const C = "#0078D4"; // Windows Blue
const BASE = "/images/microsoft/projekt2";

// ─── Reusable: Section Header ─────────────────────────────────────────────────
const SectionHeader = ({ num, title, tagline }: { num: number; title: string; tagline: string }) => (
    <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-white text-base font-bold mt-0.5" style={{ background: C }}>
            {num}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{title}</h2>
            <p className="text-sm text-[#7A8599] mt-0.5">{tagline}</p>
        </div>
    </div>
);

// ─── Reusable: Proof Figure ───────────────────────────────────────────────────
const ProofFigure = ({
    src, figNum, caption, onZoom,
}: { src: string; figNum: string; caption: string; onZoom: (src: string) => void }) => (
    <figure
        className="my-7 rounded-xl overflow-hidden border border-[#E1E5EB] bg-white shadow-md cursor-zoom-in group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        onClick={() => onZoom(src)}
    >
        <div className="relative">
            <img src={src} alt={caption} className="w-full block" loading="lazy" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 rounded-full p-1.5">
                    <Maximize2 size={14} className="text-white" />
                </div>
            </div>
        </div>
        <figcaption className="px-5 py-3 flex items-center gap-3 bg-[#F5F7FA] border-t border-[#E1E5EB]">
            <span className="flex-shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono text-white" style={{ background: C }}>
                {figNum}
            </span>
            <span className="text-[13px] text-[#4A5568] leading-snug">{caption}</span>
        </figcaption>
    </figure>
);

// ─── Reusable: Phase Label ────────────────────────────────────────────────────
const PhaseLabel = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide mt-9 mb-5 px-4 py-1.5 rounded-full" style={{ background: "#E8F4FD", color: C }}>
        {label}
    </div>
);

// ─── Reusable: Step Item ──────────────────────────────────────────────────────
const Step = ({ num, title, desc }: { num: number; title: string; desc: React.ReactNode }) => (
    <div className="flex gap-4 mb-5 items-start">
        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-white text-[13px] font-bold mt-0.5" style={{ background: C }}>
            {num}
        </div>
        <div className="flex-1">
            <p className="text-[15px] font-semibold text-[#1A1A1A] mb-1">{title}</p>
            <p className="text-sm text-[#4A5568] leading-relaxed">{desc}</p>
        </div>
    </div>
);

// ─── Reusable: Issue Card ─────────────────────────────────────────────────────
const IssueCard = ({ type, icon: Icon, title, body }: {
    type: "problem" | "solution"; icon: typeof AlertCircle; title: string; body: React.ReactNode;
}) => (
    <div className="my-6 rounded-xl overflow-hidden border border-[#E1E5EB] shadow-sm">
        <div className={`px-6 py-4 flex items-center gap-2.5 text-sm font-semibold border-b ${type === "problem" ? "bg-[#FEF2F2] text-[#C42B1C] border-[#FECACA]" : "bg-[#F0FFF4] text-[#107C10] border-[#C6F6D5]"}`}>
            <Icon size={18} className="flex-shrink-0" />
            {title}
        </div>
        <div className="px-6 py-5 bg-white text-sm text-[#4A5568] leading-relaxed">
            {body}
        </div>
    </div>
);

// ─── Reusable: Note Block ─────────────────────────────────────────────────────
const NoteBlock = ({ title, text }: { title: string; text: string }) => (
    <div className="my-4 px-5 py-4 bg-[#FFFBEB] border-l-[3px] border-[#D83B01] rounded-r-lg">
        <p className="text-[13px] font-semibold text-[#D83B01] mb-1">{title}</p>
        <p className="text-sm text-[#4A5568] leading-relaxed">{text}</p>
    </div>
);

// ─── Spec Table ───────────────────────────────────────────────────────────────
const SpecTable = ({ rows }: { rows: string[][] }) => (
    <table className="w-full border-separate border-spacing-0 border border-[#E1E5EB] rounded-xl overflow-hidden my-6 shadow-sm">
        <thead>
            <tr>
                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider text-[#7A8599] bg-[#EEF1F5] border-b border-[#E1E5EB] font-semibold">Eigenschaft</th>
                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider text-[#7A8599] bg-[#EEF1F5] border-b border-[#E1E5EB] font-semibold">Wert</th>
            </tr>
        </thead>
        <tbody>
            {rows.map(([key, val]) => (
                <tr key={key} className="transition-colors hover:bg-[#F5F7FA]">
                    <td className="px-5 py-2.5 text-[13px] font-semibold text-[#005A9E] border-b border-[#E1E5EB] whitespace-nowrap w-[200px]">{key}</td>
                    <td className="px-5 py-2.5 text-sm text-[#4A5568] border-b border-[#E1E5EB]">{val}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

// ═══════════════ MAIN COMPONENT ═══════════════
const ProjektUSMTMigration = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const screenshotIndex = [
        [1, "Hyper-V Manager — Beide VMs (Win10 + Win11) mit winver-Dialogen"],
        [2, "Win10 Desktop — Testdaten im Ordner Meine_Projekte"],
        [3, "Windows ADK — USMT-Feature auswählen und installieren"],
        [4, "ScanState — Ausführung auf Win10 (Return Code: 0)"],
        [5, "MigStore — USMT.MIG Migrationsdatei im Speicher"],
        [6, "MigStore — Ordnerstruktur (USMT, MigLog, scan.log)"],
        [7, "LoadState — Ausführung auf Win11 (Return Code: 0)"],
        [8, "Win11 Desktop — Migrierte Daten + winver Bestätigung"],
        [9, "Migrations-Log — LoadState Detailprotokoll"],
    ];

    const resultRows = [
        { kriterium: "Windows ADK mit USMT installiert", nachweis: "Abb. 3" },
        { kriterium: "Testdaten auf Quell-VM angelegt", nachweis: "Abb. 2" },
        { kriterium: "ScanState erfolgreich (Return Code: 0)", nachweis: "Abb. 4" },
        { kriterium: "Migrationsdaten im MigStore gespeichert", nachweis: "Abb. 5, 6" },
        { kriterium: "LoadState erfolgreich (Return Code: 0)", nachweis: "Abb. 7" },
        { kriterium: "Benutzerdaten auf Ziel-VM verfügbar", nachweis: "Abb. 8" },
        { kriterium: "Migrations-Logs vollständig dokumentiert", nachweis: "Abb. 9" },
        { kriterium: "Kein Datenverlust", nachweis: "Alle" },
    ];

    return (
        <Layout>
            <Helmet>
                <title>User Data Migration (USMT) — Gökhan Zehirlioglu</title>
                <meta name="description" content="Benutzerdaten-Migration von Windows 10 auf Windows 11 mit dem User State Migration Tool (USMT) — ScanState und LoadState Schritt für Schritt dokumentiert." />
            </Helmet>
            <Lightbox src={zoomedImage} onClose={closeLightbox} />

            {/* ══════════════════════════ HERO ══════════════════════════ */}
            <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #001D3D 0%, #002B5C 50%, #005A9E 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }} />
                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-2 text-xs text-white/50 mb-7 flex-wrap">
                        <span>System &amp; Server Administration</span><span className="opacity-40">&rsaquo;</span>
                        <span>Microsoft Enterprise IT</span><span className="opacity-40">&rsaquo;</span>
                        <span>Modul 1: Client OS Lifecycle</span><span className="opacity-40">&rsaquo;</span>
                        <span style={{ color: "#4EA8DE" }} className="font-medium">Projekt 02</span>
                    </nav>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        User Data Migration<br /><span style={{ color: "#4EA8DE" }}>mit USMT</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/70 leading-relaxed max-w-[600px] mb-8">
                        Benutzerdaten und Einstellungen von Windows 10 auf Windows 11 migrieren — mit dem User State Migration Tool (USMT), Schritt für Schritt dokumentiert.
                    </p>
                    <div className="flex flex-wrap gap-7 mb-8">
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><Calendar size={14} className="opacity-60" /><strong className="text-white font-medium">18.03.2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><Monitor size={14} className="opacity-60" /><strong className="text-white font-medium">Hyper-V</strong>&nbsp;auf Remote Desktop</div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><User size={14} className="opacity-60" /><strong className="text-white font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>
                    <ProjectRuler currentId={2} />
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#FAFBFC] text-[#1A1A1A]">
                <div className="max-w-[820px] mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dieses Projekt simuliert ein <strong>reales Unternehmensszenario</strong>: Ein Mitarbeiter erh&auml;lt einen neuen Arbeitsplatzrechner mit Windows 11. Seine Benutzerdaten, Dokumente und Einstellungen m&uuml;ssen vom alten Windows-10-System auf das neue System &uuml;bertragen werden &mdash; ohne manuelles Kopieren.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Das verwendete Werkzeug ist das <strong>User State Migration Tool (USMT)</strong> aus dem Windows Assessment and Deployment Kit (ADK). USMT arbeitet mit zwei Kernbefehlen: <strong>ScanState</strong> erfasst die Daten auf dem Quellrechner, <strong>LoadState</strong> spielt sie auf dem Zielrechner ein.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed">
                            Im Gegensatz zum In-Place Upgrade (Projekt 01) wird hier <strong>kein Betriebssystem aktualisiert</strong>, sondern Benutzerdaten zwischen zwei unabh&auml;ngigen Maschinen transferiert. Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration beider Maschinen" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde mit <strong>zwei virtuellen Maschinen</strong> in Hyper-V durchgef&uuml;hrt &mdash; einer Quell-VM (Windows 10) und einer Ziel-VM (Windows 11).
                        </p>

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Quell-VM &mdash; Windows 10 Pro</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 10 Pro"],
                            ["Version / Build", "22H2 (Build 19044.1288)"],
                            ["VM-Name", "Win10_Pro_für_migration"],
                            ["Hostname", "DESKTOP-6PHFMN5"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["Arbeitsspeicher", "4096 MB"],
                            ["Benutzer", "x_mal"],
                            ["Testdaten", "Meine_Projekte (Lebenslauf, Projekt_Notizen, Wichtige_Datei)"],
                        ]} />

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Ziel-VM &mdash; Windows 11 Pro</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 11 Pro"],
                            ["Version / Build", "21H2 (Build 22000.194)"],
                            ["VM-Name", "Win11_Pro_für_migration"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["Arbeitsspeicher", "4096 MB"],
                            ["Benutzer", "x_mal_test@hotmail.com"],
                        ]} />

                        <ProofFigure src={`${BASE}/projekt2_1.png`} figNum="Abb. 1" caption="Hyper-V Manager — Beide VMs mit winver-Dialogen: Win10 Pro 22H2 (links) und Win11 Pro 21H2 (rechts)." onZoom={zoom} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und Migrationsprinzip" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde vollst&auml;ndig auf einem <strong>Remote Desktop Server</strong> (WIN-DSQN5G5QED1) durchgef&uuml;hrt. Innerhalb dieser Umgebung wird Hyper-V als Virtualisierungsplattform genutzt:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
                            {[
                                { icon: "\uD83D\uDDA5\uFE0F", title: "Host-System", desc: "Windows Server auf Remote Desktop (WIN-DSQN5G5QED1)" },
                                { icon: "\uD83D\uDCBB", title: "Quell-VM (Win10)", desc: "Win10_Pro_für_migration — Windows 10 Pro 22H2" },
                                { icon: "\uD83D\uDCBB", title: "Ziel-VM (Win11)", desc: "Win11_Pro_für_migration — Windows 11 Pro 21H2" },
                                { icon: "\uD83D\uDCE6", title: "USMT", desc: "ScanState + LoadState aus dem Windows ADK" },
                                { icon: "\uD83D\uDCC2", title: "MigStore", desc: "C:\\MigStore — Gemeinsamer Speicher für Migrationsdaten" },
                                { icon: "\uD83D\uDD04", title: "Workflow", desc: "ScanState (Win10) → MigStore → LoadState (Win11)" },
                            ].map((card) => (
                                <div key={card.title} className="p-5 bg-white border border-[#E1E5EB] rounded-xl transition-all duration-200 hover:border-[#0078D4] hover:shadow-md">
                                    <div className="w-9 h-9 flex items-center justify-center bg-[#E8F4FD] rounded-lg mb-3 text-lg">{card.icon}</div>
                                    <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1">{card.title}</p>
                                    <p className="text-[12.5px] text-[#7A8599] leading-snug">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                        <NoteBlock title="Migrationsprinzip" text="USMT arbeitet nach dem Prinzip Capture & Apply: ScanState erfasst Benutzerdaten, Anwendungseinstellungen und Dokumente auf dem Quellrechner und speichert sie in einem komprimierten Migrations-Store. LoadState liest diesen Store und wendet die Daten auf dem Zielrechner an." />
                    </section>

                    {/* ── 4. DURCHFÜHRUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={4} title="Durchführung" tagline="Schritt für Schritt — von der Vorbereitung bis zur Verifizierung" />

                        <PhaseLabel label="Phase 1 — Vorbereitung" />
                        <Step num={1} title="Testdaten auf der Quell-VM anlegen" desc={<>Auf dem Windows 10 Desktop wurde der Ordner <strong>Meine_Projekte</strong> erstellt. Darin wurden drei Testdateien angelegt: <strong>Lebenslauf</strong>, <strong>Projekt_Notizen</strong> und <strong>Wichtige_Datei</strong>. Diese dienen als Beweis: Wenn sie nach der Migration auf dem Zielrechner vorhanden sind, war die Migration erfolgreich.</>} />
                        <ProofFigure src={`${BASE}/projekt2_2.png`} figNum="Abb. 2" caption="Win10 Desktop — Testdaten im Ordner Meine_Projekte (Lebenslauf, Projekt_Notizen, Wichtige_Datei)." onZoom={zoom} />

                        <Step num={2} title="Windows ADK herunterladen und installieren" desc={<>Das <strong>Windows Assessment and Deployment Kit (ADK)</strong> wurde von der Microsoft-Website heruntergeladen (<code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">adksetup.exe</code>). Bei der Feature-Auswahl wurde ausschlie&szlig;lich das <strong>Migrationstool f&uuml;r den Benutzerstatus (USMT)</strong> ausgew&auml;hlt (501,4 MB). Das USMT enth&auml;lt drei Werkzeuge: ScanState-Tool, LoadState-Tool und USMTUtils-Tool.</>} />
                        <ProofFigure src={`${BASE}/projekt2_3.png`} figNum="Abb. 3" caption="Windows ADK — Feature-Auswahl: Migrationstool für den Benutzerstatus (USMT), 501,4 MB." onZoom={zoom} />

                        <PhaseLabel label="Phase 2 — ScanState (Daten erfassen)" />
                        <Step num={1} title="USMT-Verzeichnis aufrufen" desc={<>In einer administrativen Eingabeaufforderung wurde in das USMT-Verzeichnis gewechselt:<br /><code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">cd &quot;C:\Program Files (x86)\Windows Kits\10\Assessment and Deployment Kit\User State Migration Tool\amd64&quot;</code></>} />
                        <Step num={2} title="ScanState ausführen" desc={<>Der ScanState-Befehl wurde mit folgenden Parametern ausgef&uuml;hrt:<br /><code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">scanstate C:\MigStore /i:MigApp.xml /i:MigUser.xml /o /v:13 /l:C:\MigStore\scan.log</code><br />Die Parameter im Detail: <strong>/i:MigApp.xml</strong> und <strong>/i:MigUser.xml</strong> definieren die Migrationsregeln, <strong>/o</strong> &uuml;berschreibt vorhandene Daten, <strong>/v:13</strong> aktiviert maximales Logging und <strong>/l</strong> speichert das Protokoll.</>} />
                        <Step num={3} title="Ergebnis: Return Code 0" desc={<>ScanState durchlief alle Phasen erfolgreich: <strong>Starting the migration process</strong>, <strong>Processing the settings store</strong>, <strong>Examining the system</strong>, <strong>Selecting migration units</strong>, <strong>Gathering data</strong> und <strong>Commit</strong>. Benutzer: DESKTOP-6PHFMN5\x_mal. Ergebnis: <strong>Success. ScanState return code: 0</strong>.</>} />
                        <ProofFigure src={`${BASE}/projekt2_4.png`} figNum="Abb. 4" caption="ScanState — Erfolgreiche Ausführung auf Win10 (Return Code: 0, Benutzer: x_mal)." onZoom={zoom} />

                        <PhaseLabel label="Phase 3 — Migrationsdaten prüfen" />
                        <Step num={1} title="MigStore-Inhalt kontrollieren" desc={<>Im Ordner <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">C:\MigStore</code> wurde der Unterordner <strong>USMT</strong> erstellt. Darin befindet sich die Datei <strong>USMT.MIG</strong> (1.024 KB) &mdash; diese enth&auml;lt alle erfassten Benutzerdaten in komprimierter Form.</>} />
                        <Step num={2} title="Log-Dateien prüfen" desc={<>Neben dem USMT-Ordner wurden die Dateien <strong>MigLog</strong> (XML-Dokument, 73 KB) und <strong>scan</strong> (Textdokument) erstellt. Diese Logs dokumentieren den gesamten ScanState-Vorgang.</>} />
                        <ProofFigure src={`${BASE}/projekt2_5.png`} figNum="Abb. 5" caption="MigStore — USMT.MIG Migrationsdatei (1.024 KB) im USMT-Unterordner." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt2_6.png`} figNum="Abb. 6" caption="MigStore — Ordnerstruktur mit USMT-Ordner, MigLog.xml und scan.log." onZoom={zoom} />

                        <PhaseLabel label="Phase 4 — LoadState (Daten anwenden)" />
                        <Step num={1} title="ADK auf der Ziel-VM installieren" desc={<>Auf der Windows 11 VM wurde ebenfalls das Windows ADK mit dem USMT-Feature installiert. Die MigStore-Daten wurden &uuml;ber einen gemeinsamen Speicherort bereitgestellt.</>} />
                        <Step num={2} title="LoadState ausführen" desc={<>Der LoadState-Befehl wurde mit folgenden Parametern ausgef&uuml;hrt:<br /><code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">loadstate C:\MigStore\USMT /i:MigApp.xml /i:MigUser.xml /lac /lae /v:13 /l:C:\MigOverload.log</code><br />Die zus&auml;tzlichen Parameter: <strong>/lac</strong> erstellt lokale Benutzerkonten automatisch und <strong>/lae</strong> aktiviert diese Konten sofort.</>} />
                        <Step num={3} title="Ergebnis: Return Code 0" desc={<>LoadState durchlief alle Phasen erfolgreich und schloss mit <strong>loadstate return code: 0</strong> ab. Die Benutzerdaten wurden vollst&auml;ndig auf die Ziel-VM &uuml;bertragen.</>} />
                        <ProofFigure src={`${BASE}/projekt2_7.png`} figNum="Abb. 7" caption="LoadState — Erfolgreiche Ausführung auf Win11 (Return Code: 0)." onZoom={zoom} />

                        <PhaseLabel label="Phase 5 — Verifizierung" />
                        <Step num={1} title="Migrierte Daten prüfen" desc={<>Auf dem Windows 11 Desktop wurde der Ordner <strong>Meine_Projekte</strong> ge&ouml;ffnet. Alle drei Testdateien &mdash; <strong>Lebenslauf</strong>, <strong>Projekt_Notizen</strong> und <strong>Wichtige_Datei</strong> &mdash; waren vollst&auml;ndig vorhanden. Die Migration war erfolgreich.</>} />
                        <Step num={2} title="Betriebssystem bestätigen" desc={<>&Uuml;ber <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">winver</code> wurde best&auml;tigt: <strong>Windows 11 Pro, Version 21H2 (Build 22000.194)</strong>. Das Zielsystem ist intakt und die migrierten Daten sind verf&uuml;gbar.</>} />
                        <Step num={3} title="Migrations-Logs sichern" desc="Die vollständigen LoadState-Logs wurden im MigStore gesichert. Sie dokumentieren jeden einzelnen Schritt des Migrationsprozesses mit Zeitstempeln." />
                        <ProofFigure src={`${BASE}/projekt2_8.png`} figNum="Abb. 8" caption="Win11 Desktop — Migrierte Daten in Meine_Projekte + winver Bestätigung (Windows 11 Pro 21H2)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt2_9.png`} figNum="Abb. 9" caption="Migrations-Log — LoadState Detailprotokoll mit Zeitstempeln und Verarbeitungsdetails." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LÖSUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={5} title="Probleme & Lösung" tagline="Herausforderungen im Prozess und wie sie gelöst wurden" />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: MigStore-Pfad muss auf beiden VMs erreichbar sein"
                            body={<>ScanState speichert die Migrationsdaten in einem lokalen Ordner (<strong>C:\MigStore</strong>). Damit LoadState auf der Ziel-VM auf diese Daten zugreifen kann, muss der MigStore-Ordner entweder &uuml;ber ein <strong>Netzwerkfreigabe</strong>, einen <strong>gemeinsamen Speicher</strong> oder eine <strong>manuelle Kopie</strong> verf&uuml;gbar gemacht werden.</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: Gemeinsamer Speicherort über Hyper-V"
                            body={<>In der virtualisierten Umgebung wurde der MigStore-Ordner &uuml;ber den <strong>Hyper-V-Host</strong> als gemeinsamer Speicherort bereitgestellt. In Produktionsumgebungen w&uuml;rde ein <strong>Netzwerklaufwerk (UNC-Pfad)</strong> oder ein <strong>USB-Datentr&auml;ger</strong> verwendet werden.<br /><br /><span style={{ color: C }} className="font-semibold">Praxishinweis:</span> In gro&szlig;en Unternehmen wird USMT h&auml;ufig &uuml;ber <strong>SCCM/MECM</strong> (Microsoft Endpoint Configuration Manager) automatisiert, wodurch der MigStore zentral auf einem Server liegt.</>} />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: Benutzerkonten auf der Ziel-VM"
                            body={<>Wenn auf der Ziel-VM der urspr&uuml;ngliche Benutzer (von der Quell-VM) nicht existiert, schl&auml;gt LoadState standardm&auml;&szlig;ig fehl oder weist die Daten dem falschen Profil zu.</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: /lac und /lae Parameter verwenden"
                            body={<>Mit den Parametern <strong>/lac</strong> (Local Account Create) und <strong>/lae</strong> (Local Account Enable) erstellt LoadState automatisch fehlende lokale Benutzerkonten und aktiviert sie. So werden die migrierten Daten dem korrekten Benutzerprofil zugeordnet.</>} />

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-8 mb-3">Wichtige Hinweise:</p>
                        <NoteBlock title="USMT vs. In-Place Upgrade" text='USMT und In-Place Upgrade sind zwei v&ouml;llig unterschiedliche Ans&auml;tze. Ein In-Place Upgrade (Projekt 01) aktualisiert das Betriebssystem auf derselben Maschine. USMT migriert Benutzerdaten zwischen zwei unabh&auml;ngigen Maschinen &mdash; das Betriebssystem auf dem Zielrechner muss bereits installiert sein.' />
                        <NoteBlock title="Migrations-XML-Dateien" text="MigApp.xml definiert, welche Anwendungseinstellungen migriert werden (z. B. Office, Browser). MigUser.xml definiert, welche Benutzerdateien erfasst werden (Desktop, Dokumente, Favoriten). Beide Dateien können angepasst werden, um die Migration zu steuern." />
                        <NoteBlock title="Verbosity Level /v:13" text='Der Parameter /v:13 aktiviert das h&ouml;chste Logging-Level. Dies erzeugt umfangreiche Log-Dateien, die bei der Fehlersuche unerl&auml;sslich sind. F&uuml;r Produktionsumgebungen wird h&auml;ufig /v:5 (Standard) verwendet.' />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Die Migration der Benutzerdaten von <strong>Windows 10 Pro</strong> auf <strong>Windows 11 Pro</strong> wurde mit USMT erfolgreich abgeschlossen. Alle definierten Erfolgskriterien wurden erf&uuml;llt:
                        </p>
                        <table className="w-full border-separate border-spacing-0 border border-[#E1E5EB] rounded-xl overflow-hidden my-6 shadow-sm">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Kriterium</th>
                                    <th className="px-5 py-3 text-center text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Status</th>
                                    <th className="px-5 py-3 text-center text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Nachweis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultRows.map((row, i) => (
                                    <tr key={row.kriterium} className={`transition-colors hover:bg-[#F0F6FC] ${i % 2 === 1 ? "bg-[#F5F7FA]" : "bg-white"}`}>
                                        <td className="px-5 py-3 text-sm text-[#4A5568] border-b border-[#E1E5EB]">{row.kriterium}</td>
                                        <td className="px-5 py-3 text-center border-b border-[#E1E5EB]">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#107C10]">{"✓"} Erf&uuml;llt</span>
                                        </td>
                                        <td className="px-5 py-3 text-center border-b border-[#E1E5EB]"><span className="font-mono text-[11px] text-[#7A8599]">{row.nachweis}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-8 px-8 py-7 rounded-2xl border border-[rgba(0,120,212,.2)]" style={{ background: "linear-gradient(135deg, #E8F4FD, #F0F6FC)" }}>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#0078D4] mb-2.5">Fazit</p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed mb-3">
                                <strong>USMT</strong> ist das professionelle Werkzeug f&uuml;r die Benutzerdaten-Migration in Windows-Umgebungen. W&auml;hrend ein In-Place Upgrade (Projekt 01) das Betriebssystem auf derselben Maschine aktualisiert, erm&ouml;glicht USMT den <strong>kontrollierten Transfer</strong> von Benutzerdaten, Dokumenten und Anwendungseinstellungen zwischen zwei unabh&auml;ngigen Systemen.
                            </p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed">
                                Der Workflow <strong>ScanState &rarr; MigStore &rarr; LoadState</strong> ist skalierbar und kann in Unternehmen &uuml;ber SCCM/MECM automatisiert werden. F&uuml;r die erfolgreiche Migration sind drei Faktoren entscheidend: die <strong>korrekte ADK-Installation</strong>, ein <strong>erreichbarer MigStore</strong> und die <strong>richtige Parametrisierung</strong> der USMT-Befehle.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. SCREENSHOT-VERZEICHNIS ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Screenshot-Verzeichnis" tagline="Alle 9 Nachweise auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Die folgenden Screenshots dokumentieren den gesamten Migrationsprozess und dienen als Nachweis f&uuml;r die erfolgreiche Durchf&uuml;hrung:
                        </p>
                        <table className="w-full border-separate border-spacing-0 border border-[#E1E5EB] rounded-xl overflow-hidden my-6 shadow-sm text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2.5 text-left text-[11px] uppercase tracking-wider text-white font-semibold w-16" style={{ background: C }}>Abb.</th>
                                    <th className="px-4 py-2.5 text-left text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Beschreibung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screenshotIndex.map(([n, d], i) => (
                                    <tr key={n as number} className={`transition-colors hover:bg-[#F0F6FC] ${i % 2 === 1 ? "bg-[#F5F7FA]" : "bg-white"}`}>
                                        <td className="px-4 py-2.5 text-[13px] font-semibold text-[#005A9E] border-b border-[#E1E5EB]">{n}</td>
                                        <td className="px-4 py-2.5 text-[#4A5568] border-b border-[#E1E5EB]">{d}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center justify-between pt-6 border-t border-[#E1E5EB] mt-4">
                            <div>
                                <p className="text-xs text-[#7A8599] mb-1">N&auml;chstes Projekt</p>
                                <p className="text-sm font-semibold text-[#4A5568]">Projekt 03: Golden Image</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full opacity-50" style={{ border: `1px solid ${C}40`, color: C }}>
                                Bald verf&uuml;gbar <ArrowRight size={14} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="py-10 text-center bg-[#EEF1F5] border-t border-[#E1E5EB]">
                <p className="text-[13px] text-[#7A8599]"><strong>Projekt 02 / 04</strong> &mdash; Microsoft Enterprise IT &middot; Modul 1: Client OS Lifecycle &amp; Deployment</p>
                <p className="text-[13px] text-[#7A8599] mt-1.5"><a href="https://gokhanzehirlioglu.de" className="text-[#0078D4] no-underline hover:underline">gokhanzehirlioglu.de</a> &middot; Gokhan Zehirlioglu &middot; Fachinformatiker f&uuml;r Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektUSMTMigration;
