import { useState, useCallback } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import {
    Calendar, Monitor, CheckCircle2, ArrowRight,
    AlertCircle, User, Maximize2
} from "lucide-react";

const C = "#0078D4";
const BASE = "/images/microsoft/golden-image";

// ─── Section Header ───────────────────────────────────────────────────────────
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

// ─── Proof Figure ─────────────────────────────────────────────────────────────
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
        <figcaption className="px-5 py-3.5 flex items-center gap-3 bg-[#F5F7FA] border-t border-[#E1E5EB]">
            <span className="flex-shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono text-white" style={{ background: C }}>
                {figNum}
            </span>
            <span className="text-[13px] text-[#4A5568] leading-snug">{caption}</span>
        </figcaption>
    </figure>
);

// ─── Phase Label ──────────────────────────────────────────────────────────────
const PhaseLabel = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide mt-9 mb-5 px-4 py-1.5 rounded-full" style={{ background: "#E8F4FD", color: C }}>
        {label}
    </div>
);

// ─── Step ─────────────────────────────────────────────────────────────────────
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

// ─── Issue Card ───────────────────────────────────────────────────────────────
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

// ─── Note Block ───────────────────────────────────────────────────────────────
const NoteBlock = ({ title, text }: { title: string; text: React.ReactNode }) => (
    <div className="my-4 px-5 py-4 bg-[#FFFBEB] border-l-[3px] border-[#D83B01] rounded-r-lg">
        <p className="text-[13px] font-semibold text-[#D83B01] mb-1">{title}</p>
        <div className="text-sm text-[#4A5568] leading-relaxed">{text}</div>
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
            {rows.map(([key, val], i) => (
                <tr key={i} className="transition-colors hover:bg-[#F5F7FA]">
                    <td className="px-5 py-2.5 text-[13px] font-semibold text-[#005A9E] border-b border-[#E1E5EB] whitespace-nowrap w-[220px]">{key}</td>
                    <td className="px-5 py-2.5 text-sm text-[#4A5568] border-b border-[#E1E5EB]">{val}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

// ─── Arch Card ────────────────────────────────────────────────────────────────
const ArchCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
    <div className="p-5 bg-white border border-[#E1E5EB] rounded-xl transition-all duration-200 hover:border-[#0078D4] hover:shadow-md">
        <div className="w-9 h-9 flex items-center justify-center bg-[#E8F4FD] rounded-lg mb-3 text-lg">{icon}</div>
        <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1">{title}</p>
        <p className="text-[12.5px] text-[#7A8599] leading-snug">{desc}</p>
    </div>
);

// ─── Inline Code ──────────────────────────────────────────────────────────────
const Code = ({ children }: { children: string }) => (
    <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E] font-mono">{children}</code>
);

// ═══════════════ MAIN COMPONENT ═══════════════
const ProjektGoldenImage = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const screenshotIndex = [
        [1, 'Systemsteuerung — BitLocker "Wartet auf Aktivierung" (Limbo-Status)'],
        [2, "Windows Settings — Geräteverschlüsselung (BitLocker wird über Laufwerksverschlüsselung verwaltet)"],
        [3, "BitLocker-Aktivierung — Fehler: startbarer Datenträger (CD/DVD) erkannt"],
        [4, "Systemsteuerung BitLocker entschlüsselt + CMD manage-bde -status (57,3% — Entschlüsselung läuft)"],
        [5, "PowerShell — Remove-AppxPackage löscht blockierende Appx-Pakete"],
        [6, "Windows Explorer — ReferenzRechner.avhdx (Differenzdisk, 26 GB) vor dem Merge-Vorgang"],
        [7, "Windows Explorer — ReferenzRechner.vhdx (34 GB) wird als Master-Image kopiert und archiviert"],
    ];

    const resultRows = [
        "Referenzmaschine mit Standardsoftware vorbereitet",
        "BitLocker vollständig entschlüsselt (0,0%)",
        "Blockierende Appx-Pakete identifiziert und entfernt",
        "Sysprep (/generalize /oobe /shutdown) erfolgreich durchgelaufen",
        "Checkpoint zusammengeführt (.avhdx → .vhdx)",
        "Golden Image als eigenständige VHDX archiviert",
    ];

    return (
        <Layout>
            <Helmet>
                <title>Golden Image & Sysprep — Gökhan Zehirlioglu</title>
                <meta name="description" content="Standardisiertes Windows 11 Master-Image (VHDX) erstellen, mit Sysprep generalisieren und für das Massen-Deployment vorbereiten." />
            </Helmet>
            <Lightbox src={zoomedImage} onClose={closeLightbox} />

            {/* ══════════════════════════ HERO ══════════════════════════ */}
            <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #001D3D 0%, #002B5C 50%, #005A9E 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }} />
                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/70 mb-7 flex-wrap">
                        <a href="#" className="hover:text-white transition-colors">Windows & Azure Administration</a><span className="opacity-40">&rsaquo;</span>
                        <a href="#" className="hover:text-white transition-colors">Microsoft Enterprise IT</a><span className="opacity-40">&rsaquo;</span>
                        <a href="#" className="hover:text-white transition-colors">Modul 1: Client OS Lifecycle</a><span className="opacity-40">&rsaquo;</span>
                        <span className="text-[#4EA8DE] font-medium">Projekt 03</span>
                    </nav>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Golden Image<br /><span style={{ color: "#4EA8DE" }}>&amp; Sysprep</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/70 leading-relaxed max-w-[600px] mb-8">
                        Ein standardisiertes Windows 11 Master-Image (VHDX) erstellen, von maschinenspezifischen Daten bereinigen und für das skalierbare Massen-Deployment vorbereiten.
                    </p>
                    <div className="flex flex-wrap gap-7 mb-8">
                        <div className="flex items-center gap-2 text-[13px] text-white/70">
                            <Calendar size={14} className="opacity-60" />
                            <strong className="text-white font-medium">26.03.2026 – 27.03.2026</strong>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70">
                            <Monitor size={14} className="opacity-60" />
                            <strong className="text-white font-medium">Hyper-V</strong>&nbsp;auf Remote Desktop
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70">
                            <User size={14} className="opacity-60" />
                            <strong className="text-white font-medium">Gokhan Zehirlioglu</strong>
                        </div>
                    </div>
                    <ProjectRuler currentId={3} />
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#FAFBFC] text-[#1A1A1A]">
                <div className="max-w-[820px] mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dieses Projekt simuliert die <strong>Vorbereitung eines Unternehmens-Standard-Clients</strong>. Anstatt jedes neue System manuell mit dem Betriebssystem, Updates und Standardsoftware zu bespielen, wird ein sogenannter <strong>Referenzrechner</strong> erstellt — vorinstalliert mit Google Chrome, Adobe Acrobat und VLC Media Player.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Mit dem Microsoft-Tool <strong>Sysprep</strong> (System Preparation) wird dieses System <strong>generalisiert</strong>: Maschinenspezifische Daten wie die Security Identifier (SID) und Treiber werden entfernt. Das Endprodukt ist ein sauberes <strong>Golden Image (.vhdx)</strong>, das als Vorlage für unzählige neue virtuelle Maschinen dient, ohne dass Lizenz- oder Netzwerkkonflikte entstehen.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed">
                            Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert — jeder Schritt wird durch Screenshots belegt.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration der Referenzmaschine" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde mit einer dedizierten virtuellen Maschine in Hyper-V durchgeführt, die als Referenzrechner für alle zukünftigen Client-Deployments dient:
                        </p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 11 Pro"],
                            ["VM-Name", "ReferenzRechner"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["Arbeitsspeicher", "4096 MB"],
                            ["Vorinstallierte Software", "Google Chrome, Adobe Acrobat, VLC Media Player"],
                            ["Sicherheitsstatus", "TPM aktiviert, Secure Boot aktiviert"],
                        ]} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und Sysprep-Prinzip" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Der gesamte Prozess findet auf dem Remote Desktop Server statt. Die beteiligten Komponenten:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-6">
                            <ArchCard icon="🖥️" title="Host-System" desc="Windows Server (WIN-DSQN5G5QED1) auf Remote Desktop" />
                            <ArchCard icon="💻" title="Referenz-VM" desc="Die zu generalisierende Quell-Maschine mit vorinstallierter Software" />
                            <ArchCard icon="⚙️" title="Sysprep.exe" desc="Systemeigenes Werkzeug unter C:\Windows\System32\Sysprep" />
                            <ArchCard icon="📸" title="Hyper-V Checkpoints" desc="Absicherung vor dem Sysprep-Lauf — Rollback möglich" />
                        </div>
                        <NoteBlock
                            title="Sysprep-Befehl"
                            text={<><Code>sysprep.exe /generalize /oobe /shutdown</Code> versetzt das System nach der Bereinigung in den OOBE-Status (Out-of-Box Experience). Beim nächsten Start verhält sich das Betriebssystem wie nach einer frischen Installation, behält aber alle vorinstallierten Programme.</>}
                        />
                    </section>

                    {/* ── 4. DURCHFÜHRUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={4} title="Durchführung" tagline="Schritt für Schritt — von der Bereinigung bis zum Master-Image" />

                        <PhaseLabel label="Phase 1 — Vorbereitung und BitLocker-Bereinigung" />
                        <Step
                            num={1}
                            title='BitLocker "Limbo-Status" auflösen'
                            desc={<>Windows 11 verschlüsselt das Laufwerk C: im Hintergrund (<em>„Wartet auf Aktivierung"</em>). Dieser Zustand blockiert Sysprep. In der Systemsteuerung wurde BitLocker durch das Drucken eines Recovery-Keys (als PDF) erzwungen aktiviert.</>}
                        />
                        <Step
                            num={2}
                            title="Entschlüsselung und Überwachung"
                            desc={<>Direkt nach der Aktivierung wurde BitLocker deaktiviert. Über die administrative Eingabeaufforderung (<Code>manage-bde -status</Code>) wurde der Fortschritt überwacht, bis der Status exakt <strong>0,0 % (Vollständig entschlüsselt)</strong> anzeigte.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_1.png`} figNum="Abb. 1" caption='Systemsteuerung — BitLocker "Wartet auf Aktivierung" (Limbo-Status).' onZoom={zoom} />
                        <ProofFigure src={`${BASE}/abb_2.png`} figNum="Abb. 2" caption="Windows Settings — Geräteverschlüsselung (BitLocker wird über Laufwerksverschlüsselung verwaltet)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/abb_3.png`} figNum="Abb. 3" caption='BitLocker-Aktivierung — Fehler: startbarer Datenträger (CD/DVD) erkannt, Neustart erforderlich.' onZoom={zoom} />
                        <ProofFigure src={`${BASE}/abb_4.png`} figNum="Abb. 4" caption="Systemsteuerung BitLocker entschlüsselt + CMD manage-bde -status (57,3% — Entschlüsselung läuft)." onZoom={zoom} />

                        <PhaseLabel label="Phase 2 — Sysprep-Ausführung und Fehlerbehebung" />
                        <Step
                            num={1}
                            title="Sysprep starten"
                            desc={<>In der CMD wurde der Befehl <Code>sysprep.exe /generalize /oobe /shutdown</Code> ausgeführt.</>}
                        />
                        <Step
                            num={2}
                            title="Appx-Pakete bereinigen"
                            desc="Sysprep brach mehrfach ab, da im Hintergrund aktualisierte Windows Store-Apps (z.B. Mozilla Firefox, Winget Source, Language Experience Pack) den Generalize-Prozess blockierten."
                        />
                        <Step
                            num={3}
                            title="Log-Analyse"
                            desc={<>Über den Befehl <Code>findstr /i "Error" C:\Windows\System32\Sysprep\Panther\setupact.log</Code> wurden die blockierenden Pakete identifiziert.</>}
                        />
                        <Step
                            num={4}
                            title="Entfernung und erfolgreicher Abschluss"
                            desc={<>Die fehlerhaften Pakete wurden per PowerShell (<Code>Remove-AppxPackage</Code>) gelöscht, bis Sysprep fehlerfrei durchlief und die VM automatisch herunterfuhr.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_5.png`} figNum="Abb. 5" caption="PowerShell — Remove-AppxPackage löscht blockierende Appx-Pakete (Sysprep-Fehlerbehebung)." onZoom={zoom} />

                        <PhaseLabel label="Phase 3 — Checkpoint-Zusammenführung (Merge)" />
                        <Step
                            num={1}
                            title="Prüfpunkt löschen"
                            desc={<>Vor Sysprep wurde ein Checkpoint (<em>„Vor-Sysprep"</em>) erstellt, weshalb die Daten in einer Differenzdisk (<Code>.avhdx</Code>) lagen. Im Hyper-V Manager wurde dieser Prüfpunkt gelöscht.</>}
                        />
                        <Step
                            num={2}
                            title="Zusammenführung abwarten"
                            desc={<>Hyper-V führte den Merge-Prozess im Hintergrund aus, um die <Code>.avhdx</Code> sicher in die Haupt-<Code>.vhdx</Code> zu integrieren. Im Windows Explorer war die Differenzdisk (<Code>ReferenzRechner_...avhdx</Code>, 26 GB) noch als eigene Datei sichtbar — erst nach abgeschlossenem Merge verschwindet sie und die Basis-VHDX enthält alle Änderungen.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_6.png`} figNum="Abb. 6" caption="Windows Explorer — ReferenzRechner.avhdx (Differenzdisk, 26 GB) vor dem Merge-Vorgang." onZoom={zoom} />

                        <PhaseLabel label="Phase 4 — Golden Image Archivierung" />
                        <Step
                            num={1}
                            title="VHDX isolieren und sichern"
                            desc={<>Die nun eigenständige und bereinigte <Code>ReferenzRechner.vhdx</Code> (34 GB) wurde kopiert und als Master-Image in einen dedizierten Ordner verschoben. Das Original bleibt ab sofort unangetastet — jede neue VM erhält eine Kopie.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_7.png`} figNum="Abb. 7" caption="Windows Explorer — ReferenzRechner.vhdx (34 GB) wird als Master-Image kopiert und archiviert." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LÖSUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={5} title="Probleme & Lösung" tagline="Herausforderungen im Prozess und wie sie gelöst wurden" />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: BitLocker blockiert Sysprep mit Fehler 0x80310039"
                            body={<>Windows 11 aktiviert BitLocker automatisch im Hintergrund — auch ohne expliziten Nutzereingriff. Sysprep erkennt diesen <strong>„Limbo-Status"</strong> (Wartet auf Aktivierung) und bricht mit dem Fehlercode <strong>0x80310039</strong> ab, da ein generalisiertes Image nicht verschlüsselt sein darf.</>}
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Lösung: BitLocker per Workaround aktivieren und sofort deaktivieren"
                            body={<>Um den Limbo-Status aufzulösen, muss BitLocker zunächst <strong>erzwungen aktiviert</strong> werden (Recovery-Key als PDF drucken). Danach wird es über die Eingabeaufforderung sofort wieder deaktiviert: <Code>manage-bde -off C:</Code>. Erst wenn <Code>manage-bde -status</Code> <strong>0,0 % Verschlüsselung</strong> meldet, ist Sysprep ausführbar.</>}
                        />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: Vorhandene .avhdx Differenzdisk nach Sysprep nicht direkt nutzbar"
                            body={<>Da vor Sysprep ein Hyper-V Checkpoint angelegt wurde, liegen die Änderungen in einer <Code>.avhdx</Code> Differenzdisk. Diese ist an die Basis-VHDX gebunden und <strong>nicht portierbar</strong> — ein direktes Kopieren der .avhdx würde zu einem defekten Image führen.</>}
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Lösung: Checkpoint im Hyper-V Manager löschen → automatischer Merge"
                            body={<>Der Checkpoint muss im Hyper-V Manager <strong>gelöscht</strong> (nicht „wiederhergestellt") werden. Hyper-V führt dann automatisch einen <strong>Merge-Vorgang</strong> durch und integriert die Differenzdisk in die Basis-VHDX. Erst danach ist das Image als eigenständige Datei portierbar und kann als Master-Image archiviert werden.</>}
                        />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Golden Image wurde erfolgreich erstellt. Alle definierten Erfolgskriterien wurden erfüllt:
                        </p>
                        <table className="w-full border-separate border-spacing-0 border border-[#E1E5EB] rounded-xl overflow-hidden my-6 shadow-sm">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Kriterium</th>
                                    <th className="px-5 py-3 text-center text-[11px] uppercase tracking-wider text-white font-semibold" style={{ background: C }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultRows.map((row, i) => (
                                    <tr key={row} className={`transition-colors hover:bg-[#F0F6FC] ${i % 2 === 1 ? "bg-[#F5F7FA]" : "bg-white"}`}>
                                        <td className="px-5 py-3 text-sm text-[#4A5568] border-b border-[#E1E5EB]">{row}</td>
                                        <td className="px-5 py-3 text-center border-b border-[#E1E5EB]">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-[#DCFCE7] text-[#107C10]">✓ Erfüllt</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-8 px-8 py-7 rounded-2xl border border-[rgba(0,120,212,.2)]" style={{ background: "linear-gradient(135deg, #E8F4FD, #F0F6FC)" }}>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#0078D4] mb-2.5">Fazit</p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed mb-3">
                                Ein <strong>Golden Image</strong> ist das Fundament jeder skalierbaren Windows-Deployment-Strategie. Mit Sysprep wird aus einem sorgfältig konfigurierten Referenzrechner eine universell einsetzbare Vorlage — ohne SID-Konflikte, ohne Lizenzprobleme.
                            </p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed">
                                <strong>Verbindung zu Projekt 04:</strong> Das hier erstellte <Code>ReferenzRechner.vhdx</Code> ist die direkte Eingabe für das nächste Projekt — Rapid Deployment, bei dem neue Client-VMs in unter 10 Minuten aus diesem Image bereitgestellt werden.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. SCREENSHOT-VERZEICHNIS ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Screenshot-Verzeichnis" tagline="Alle 7 Nachweise auf einen Blick" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
                            {screenshotIndex.map(([n, d]) => (
                                <div key={n as number} className="p-4 bg-white border border-[#E1E5EB] rounded-lg transition-all duration-200 hover:border-[#0078D4] hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <span className="flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full font-mono text-white" style={{ background: C }}>Abb. {n}</span>
                                        <span className="text-[13px] text-[#4A5568] leading-snug flex-1">{d}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-[#E1E5EB] mt-4">
                            <a href="/projekt/windows/deployment" style={{ textDecoration: "none", color: "inherit" }}>
                                <p className="text-xs text-[#7A8599] mb-1">Nächstes Projekt</p>
                                <p className="text-sm font-semibold text-[#4A5568] hover:text-[#0078D4]">Projekt 04: Rapid Deployment &amp; Provisioning</p>
                            </a>
                            <div className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full" style={{ border: `1px solid ${C}40`, color: C }}>
                                Mehr <ArrowRight size={14} />
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="py-10 text-center bg-[#EEF1F5] border-t border-[#E1E5EB]">
                <p className="text-[13px] text-[#7A8599]"><strong>Projekt 03</strong> — Microsoft Enterprise IT &middot; Modul 1: Client OS Lifecycle</p>
                <p className="text-[13px] text-[#7A8599] mt-1.5"><a href="https://gokhanzehirlioglu.de" className="text-[#0078D4] no-underline hover:underline">gokhanzehirlioglu.de</a> &middot; Gokhan Zehirlioglu &middot; Fachinformatiker für Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektGoldenImage;
