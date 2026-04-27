import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import ProjectRuler from "@/components/ProjectRuler";
import {
    Calendar, Monitor, CheckCircle2, ArrowRight,
    Shield, Cpu, Server, Maximize2, AlertCircle
} from "lucide-react";

const C = "#0078D4"; // Windows Blue

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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ProjektWin10Upgrade = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const BASE = "/images/microsoft/win10-upgrade";

    const specRows = [
        ["Betriebssystem", "Microsoft Windows 10 Pro"],
        ["Version / Build", "22H2 (Build 19045.6456)"],
        ["Virtualisierung", "Hyper-V, Generation 2"],
        ["Prozessor", "Intel Xeon Gold 6442Y, 2 Kerne, 4 logische Prozessoren"],
        ["Arbeitsspeicher", "8 192 MB"],
        ["BIOS-Modus", "UEFI"],
        ["Secure Boot", "Aktiviert (Ein)"],
        ["TPM", "Version 2.0, einsatzbereit"],
        ["Netzwerk", "R-LAB_Internet (Virtueller Switch)"],
        ["Testdaten", 'Desktop-Ordner: "test datei", "test datei 2"'],
        ["Testanwendungen", "Firefox, Spotify (in der Taskleiste fixiert)"],
    ];

    const archCards = [
        { icon: "\uD83D\uDDA5\uFE0F", title: "Host-System", desc: "Windows Server auf Remote Desktop (WIN-DSQN5G5QED1)" },
        { icon: "\uD83D\uDCBB", title: "Virtuelle Maschine", desc: '"win10" — Generation 2 mit UEFI und TPM 2.0' },
        { icon: "\uD83D\uDD12", title: "Sicherheit", desc: "Secure Boot mit Microsoft-Windows-Vorlage aktiviert" },
        { icon: "\uD83C\uDF10", title: "Netzwerk", desc: 'Virtueller Switch "R-LAB_Internet"' },
        { icon: "\uD83D\uDCBF", title: "Upgrade-Medium", desc: "Win11 Multi-Edition ISO als DVD eingebunden" },
        { icon: "\uD83D\uDCCC", title: "Sicherheitsnetz", desc: "Checkpoint vor dem Upgrade als Rückfallsicherung" },
    ];

    const resultRows = [
        { kriterium: "Betriebssystem auf Windows 11 aktualisiert", nachweis: "Abb. 7" },
        { kriterium: "Benutzerdaten (Desktop-Ordner) erhalten", nachweis: "Abb. 7" },
        { kriterium: "Anwendungen (Firefox, Spotify) funktionsfähig", nachweis: "Abb. 7" },
        { kriterium: "TPM 2.0 und Secure Boot aktiv", nachweis: "Abb. 3, 4" },
        { kriterium: "Checkpoint vor Upgrade erstellt", nachweis: "Abb. 5" },
        { kriterium: "Checkpoint nach Upgrade erstellt", nachweis: "Abb. 8" },
        { kriterium: "Log-Dateien gesichert (setupact, setuperr)", nachweis: "Abb. 9" },
        { kriterium: "Kein Datenverlust", nachweis: "Alle" },
    ];

    return (
        <Layout>
            <Helmet>
                <title>Upgrade Windows 10 → Windows 11 – Gökhan Zehirlioglu</title>
                <meta name="description" content="In-Place Upgrade Windows 10 → Windows 11 in Hyper-V. Schritt-für-Schritt mit Screenshots und Logs." />
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
                        <span style={{ color: "#4EA8DE" }} className="font-medium">Projekt 01</span>
                    </nav>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Upgrade<br /><span style={{ color: "#4EA8DE" }}>Windows 10 → Windows 11</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/70 leading-relaxed max-w-[600px] mb-8">
                        Ein bestehendes Betriebssystem ohne Datenverlust und ohne Neuinstallation direkt auf Windows 11 aktualisieren — Schritt für Schritt dokumentiert.
                    </p>
                    <div className="flex flex-wrap gap-7 mb-8">
                        {[ { Icon: Calendar, label: "18.03.2026" }, { Icon: Monitor, label: "Hyper-V auf Remote Desktop" }, { Icon: Server, label: "Gokhan Zehirlioglu" } ].map(({ Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-[13px] text-white/70"><Icon size={14} className="opacity-60" /><strong className="text-white font-medium">{label}</strong></div>
                        ))}
                    </div>
                    <ProjectRuler currentId={1} />
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#FAFBFC] text-[#1A1A1A]">
                <div className="max-w-[820px] mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dieses Projekt simuliert ein <strong>reales Unternehmensszenario</strong>:
                            Ein Arbeitsplatzrechner mit Windows 10 muss auf Windows 11 migriert werden — ohne Datenverlust,
                            ohne Neuinstallation und ohne Unterbrechung der installierten Anwendungen.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Das Verfahren heißt <strong>In-Place Upgrade</strong>. Im Gegensatz zu einer
                            sauberen Neuinstallation oder einer USMT-Migration bleiben beim In-Place Upgrade alle Programme,
                            Benutzereinstellungen und Dateien vollständig erhalten.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed">
                            Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert —
                            jeder Schritt wird durch Screenshots und Log-Dateien belegt.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration vor dem Upgrade" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Die virtuelle Maschine wurde in Hyper-V als <strong>Generation 2</strong> erstellt —
                            mit allen für Windows 11 erforderlichen Sicherheitsfeatures. Vor dem Upgrade wurden Testdaten
                            und Anwendungen angelegt, um nach dem Upgrade die Datenintegrität überprüfen zu können.
                        </p>
                        <table className="w-full border-separate border-spacing-0 border border-[#E1E5EB] rounded-xl overflow-hidden my-6 shadow-sm">
                            <thead>
                                <tr>
                                    <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider text-[#7A8599] bg-[#EEF1F5] border-b border-[#E1E5EB] font-semibold">Eigenschaft</th>
                                    <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider text-[#7A8599] bg-[#EEF1F5] border-b border-[#E1E5EB] font-semibold">Wert</th>
                                </tr>
                            </thead>
                            <tbody>
                                {specRows.map(([key, val], i) => (
                                    <tr key={key} className="transition-colors hover:bg-[#F5F7FA]">
                                        <td className="px-5 py-2.5 text-[13px] font-semibold text-[#005A9E] border-b border-[#E1E5EB] whitespace-nowrap w-[200px]">{key}</td>
                                        <td className="px-5 py-2.5 text-sm text-[#4A5568] border-b border-[#E1E5EB]">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ProofFigure src={`${BASE}/projekt1_2.png`} figNum="Abb. 1" caption="winver — Windows 10 Pro, Version 22H2 (Build 19045.6456). Testdaten und Anwendungen auf dem Desktop sichtbar." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt1_5.png`} figNum="Abb. 2" caption="msinfo32 — UEFI-Modus, Sicherer Startzustand: Ein, Systemmodell: Virtual Machine." onZoom={zoom} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und technischer Aufbau" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde vollständig auf einem <strong>Remote Desktop Server</strong> durchgeführt.
                            Innerhalb dieser Umgebung wird Hyper-V als Virtualisierungsplattform genutzt:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
                            {archCards.map((card) => (
                                <div key={card.title} className="p-5 bg-white border border-[#E1E5EB] rounded-xl transition-all duration-200 hover:border-[#0078D4] hover:shadow-md">
                                    <div className="w-9 h-9 flex items-center justify-center bg-[#E8F4FD] rounded-lg mb-3 text-lg">{card.icon}</div>
                                    <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1">{card.title}</p>
                                    <p className="text-[12.5px] text-[#7A8599] leading-snug">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                        <ProofFigure src={`${BASE}/projekt1_1.png`} figNum="Abb. 3" caption="VM-Einstellungen — Sicherheit: Secure Boot aktiviert, TPM eingeschaltet. DVD-Laufwerk: Win11 ISO eingebunden." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt1_4.png`} figNum="Abb. 4" caption={'tpm.msc \u2014 Status: "Das TPM ist einsatzbereit", Spezifikationsversion: 2.0, Hersteller: MSFT.'} onZoom={zoom} />
                    </section>

                    {/* ── 4. DURCHFÜHRUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={4} title="Durchführung" tagline="Schritt für Schritt — vom Check bis zur Verifizierung" />

                        <PhaseLabel label="Phase 1 — Vorbereitung" />
                        <Step num={1} title="Systemvoraussetzungen prüfen" desc={<>Über <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">tpm.msc</code> wurde der TPM-Status geprüft (Version 2.0, einsatzbereit). Mit <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">msinfo32</code> wurde bestätigt, dass Secure Boot aktiviert ist und das System im UEFI-Modus läuft.</>} />
                        <Step num={2} title="Testdaten auf dem Desktop anlegen" desc='Zwei Ordner — "test datei" und "test datei 2" — wurden auf dem Desktop erstellt. Diese dienen als Beweis: Wenn sie nach dem Upgrade noch vorhanden sind, ist kein Datenverlust eingetreten.' />
                        <Step num={3} title="Testanwendungen installieren und fixieren" desc="Firefox und Spotify wurden installiert und in der Taskleiste fixiert. Fixierte Taskleisten-Icons bieten einen sofort sichtbaren visuellen Beweis für die erfolgreiche Anwendungsmigration." />
                        <Step num={4} title="Hyper-V Checkpoint erstellen" desc="Vor dem Upgrade wurde in Hyper-V ein Prüfpunkt erstellt (Zeitstempel: 17.03.2026, 12:37:24). Falls das Upgrade fehlschlägt, kann jederzeit zum vorherigen Zustand zurückgekehrt werden." />
                        <ProofFigure src={`${BASE}/projekt1_3.png`} figNum="Abb. 5" caption="Hyper-V Prüfpunkt — Erstellt am 17.03.2026, 12:37:24 als Rückfallsicherung vor dem Upgrade." onZoom={zoom} />

                        <PhaseLabel label="Phase 2 — Upgrade-Prozess" />
                        <Step num={1} title="Windows 11 ISO einbinden" desc={<>Die Datei <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">MS-Win11_German_x64-Multi.iso</code> wurde in den Hyper-V-Einstellungen als DVD-Laufwerk in die VM eingebunden.</>} />
                        <Step num={2} title="setup.exe starten" desc={<>Die Datei <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">setup.exe</code> wurde direkt aus dem eingebundenen DVD-Laufwerk gestartet — <strong>innerhalb der laufenden Windows-10-Umgebung</strong>. Das ist das Kernprinzip des In-Place Upgrades.</>} />
                        <Step num={3} title="Upgrade-Option auswählen" desc='Im Setup-Dialog wurde die Option "Persönliche Dateien und Apps behalten" ausgewählt.' />
                        <Step num={4} title="Installation bestätigen und durchführen" desc='Die Bestätigungsseite zeigt: "Windows 11 Pro installieren" und "Persönliche Dateien und Apps behalten". Der gesamte Prozess dauert je nach Hardware 30–60 Minuten.' />
                        <ProofFigure src={`${BASE}/projekt1_6.png`} figNum="Abb. 6" caption='Setup-Bestätigung — "Windows 11 Pro installieren" mit der Option "Persönliche Dateien und Apps behalten".' onZoom={zoom} />

                        <PhaseLabel label="Phase 3 — Nachbereitung & Verifizierung" />
                        <Step num={1} title="winver ausführen — Upgrade-Erfolg bestätigen" desc={<>Nach dem Upgrade wurde <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">winver</code> ausgeführt. Das Ergebnis: <strong>Windows 11 Pro, Version 21H2 (Build 22000.3260)</strong>.</>} />
                        <Step num={2} title="Desktop-Dateien prüfen" desc='Die Ordner "test datei" und "test datei 2" sind weiterhin auf dem Desktop vorhanden. Es ist kein Datenverlust eingetreten.' />
                        <Step num={3} title="Anwendungen prüfen" desc="Firefox und Spotify sind weiterhin in der Taskleiste sichtbar und funktionsfähig." />
                        <Step num={4} title="Upgrade-Logs sichern" desc={<>Die Log-Dateien <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">setupact.log</code> (152 MB) und <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">setuperr.log</code> (100 KB) wurden in den Ordner <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">C:\Proof</code> kopiert.</>} />
                        <Step num={5} title="Neuen Checkpoint erstellen" desc="Nach dem erfolgreichen Upgrade wurde ein neuer Hyper-V Prüfpunkt erstellt (18.03.2026, 13:33:31)." />
                        <ProofFigure src={`${BASE}/projekt1_7.png`} figNum="Abb. 7" caption="winver nach dem Upgrade — Windows 11 Pro, Version 21H2. Desktop-Ordner und Taskleisten-Apps sind erhalten geblieben." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LÖSUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={5} title="Probleme & Lösung" tagline="Herausforderungen im Prozess und wie sie gelöst wurden" />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: Update-Schleife beim Setup-Start"
                            body={<>Während des Starts der Installation versuchte das Setup, im Hintergrund Updates herunterzuladen. Aufgrund eines <strong>Netzwerk-Engpasses in der virtualisierten Umgebung</strong> blieb der Installationsassistent über längere Zeit im Ladebildschirm hängen.</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: Netzwerkverbindung temporär trennen"
                            body={<>Der virtuelle Switch wurde während der Installation in den Hyper-V-Einstellungen kurzzeitig auf <strong>&quot;Nicht verbunden&quot;</strong> gesetzt. Dadurch wurde die Update-Suche übersprungen und die Offline-Installation konnte ungehindert fortgesetzt werden.<br /><br /><span style={{ color: C }} className="font-semibold">Praxishinweis:</span> Dieses Vorgehen ist auch in realen IT-Umgebungen ein bewährter Ansatz bei instabilen Netzwerkverbindungen.</>} />

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-8 mb-3">Abweichungen vom Standardvorgehen:</p>
                        <NoteBlock title="Edition: Pro statt Enterprise" text="Statt Windows 10 Enterprise wurde Windows 10 Pro verwendet. Das Upgrade auf Windows 11 Pro verlief problemlos — die Upgrade-Architektur arbeitet editionsübergreifend identisch." />
                        <NoteBlock title="Checkpoint-Benennung" text='Statt einer manuellen Benennung (z. B. "VOR-UPGRADE") wurde die automatische Hyper-V-Zeitstempel-Bezeichnung beibehalten. Die Funktion als Rückfallsicherung ist identisch.' />
                        <NoteBlock title="Testanwendungen" text="Statt 7-Zip oder Notepad++ wurden Firefox und Spotify gewählt und in der Taskleiste fixiert — die Beweiskraft ist visuell stärker und sofort erkennbar." />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Upgrade von <strong>Windows 10 Pro (22H2)</strong> auf <strong>Windows 11 Pro (21H2)</strong> wurde erfolgreich abgeschlossen. Alle definierten Erfolgskriterien wurden erfüllt:
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
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#107C10]">✓ Erfüllt</span>
                                        </td>
                                        <td className="px-5 py-3 text-center border-b border-[#E1E5EB]"><span className="font-mono text-[11px] text-[#7A8599]">{row.nachweis}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-8 px-8 py-7 rounded-2xl border border-[rgba(0,120,212,.2)]" style={{ background: "linear-gradient(135deg, #E8F4FD, #F0F6FC)" }}>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#0078D4] mb-2.5">Fazit</p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed mb-3">
                                Das <strong>Upgrade</strong> ist die effizienteste Methode, um ein bestehendes System ohne Datenverlust auf eine neue Windows-Version zu aktualisieren. Im Gegensatz zur Migration (USMT) oder zum Clean Install bleiben alle Programme, Einstellungen und Benutzerdaten vollständig erhalten.
                            </p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed">
                                Das Projekt zeigt, dass ein Upgrade auch in <strong>virtualisierten Umgebungen</strong> zuverlässig funktioniert, sofern TPM 2.0, Secure Boot und UEFI erfüllt sind.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. WEITERE NACHWEISE ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Weitere Nachweise" tagline="Checkpoint nach dem Upgrade und Log-Dateien" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-2">
                            Nach dem erfolgreichen Upgrade wurde ein neuer Checkpoint in Hyper-V erstellt. Das Thumbnail zeigt bereits das Windows-11-Design:
                        </p>
                        <ProofFigure src={`${BASE}/projekt1_8.png`} figNum="Abb. 8" caption="Hyper-V nach dem Upgrade — Neuer Checkpoint (18.03.2026, 13:33). Windows 11 Thumbnail sichtbar." onZoom={zoom} />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-2">
                            Die Upgrade-Logs wurden im Ordner <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">C:\Proof</code> gesichert. <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">setupact.log</code> dokumentiert den gesamten Ablauf, <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">setuperr.log</code> enthält nicht-kritische Fehler:
                        </p>
                        <ProofFigure src={`${BASE}/projekt1_9.png`} figNum="Abb. 9" caption="setupact.log (152 MB) und setuperr.log (100 KB) — vollständige Dokumentation des Upgrade-Vorgangs im Proof-Ordner." onZoom={zoom} />
                        <div className="flex items-center justify-between pt-6 border-t border-[#E1E5EB] mt-8">
                            <div>
                                <p className="text-xs text-[#7A8599] mb-1">Nächstes Projekt</p>
                                <p className="text-sm font-semibold text-[#4A5568]">Projekt 02: Migration (USMT)</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full opacity-50" style={{ border: `1px solid ${C}40`, color: C }}>
                                Bald verfügbar <ArrowRight size={14} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="py-10 text-center bg-[#EEF1F5] border-t border-[#E1E5EB]">
                <p className="text-[13px] text-[#7A8599]"><strong>Projekt 01 / 04</strong> — Microsoft Enterprise IT &middot; Modul 1: Client OS Lifecycle &amp; Deployment</p>
                <p className="text-[13px] text-[#7A8599] mt-1.5"><a href="https://gokhanzehirlioglu.de" className="text-[#0078D4] no-underline hover:underline">gokhanzehirlioglu.de</a> &middot; Gokhan Zehirlioglu &middot; Fachinformatiker für Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektWin10Upgrade;
