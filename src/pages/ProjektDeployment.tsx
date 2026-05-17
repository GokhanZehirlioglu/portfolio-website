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
const BASE = "/images/microsoft/deployment";

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
const ProjektDeployment = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const screenshotIndex = [
        [1, "Windows Explorer — Das originale Master-Image (ReferenzRechner.vhdx) wird geklont (kopiert)."],
        [2, 'Hyper-V Assistent — Option "Vorhandene virtuelle Festplatte verwenden" mit Pfad zur Client01.vhdx.'],
        [3, "VM-Konsole — Erfolgreicher Start direkt in den Windows 11 OOBE-Bildschirm (Region: Deutschland)."],
        [4, "Windows Desktop — Fertig bereitgestellter Client mit vorinstallierter Software (Acrobat, Chrome, VLC) nach unter 10 Minuten."],
    ];

    const resultRows = [
        "Master-Image erfolgreich kopiert (ohne das Original zu verändern)",
        "VM in Hyper-V mit vorhandener VHDX konfiguriert",
        "Erfolgreicher Boot direkt in die OOBE-Phase",
        "Lokales Administratorkonto für AD-Vorbereitung angelegt",
        "Alle vorinstallierten Programme voll funktionstüchtig",
        "Gesamte Bereitstellungszeit unter 10 Minuten",
    ];

    return (
        <Layout>
            <Helmet>
                <title>Rapid Deployment & Provisioning — Gökhan Zehirlioglu</title>
                <meta name="description" content="Skalierbare Bereitstellung neuer Windows 11 Clients aus dem Golden Image — ohne manuelle OS-Installation, in unter 10 Minuten." />
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
                        <span className="text-[#4EA8DE] font-medium">Projekt 04</span>
                    </nav>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Rapid Deployment<br /><span style={{ color: "#4EA8DE" }}>&amp; Provisioning</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/70 leading-relaxed max-w-[600px] mb-8">
                        Skalierbare Bereitstellung neuer virtueller Clients aus dem Master-Image — ohne manuelle OS-Installation, in unter 10 Minuten, direkt bereit für den Active Directory Beitritt.
                    </p>
                    <div className="flex flex-wrap gap-7 mb-8">
                        <div className="flex items-center gap-2 text-[13px] text-white/70">
                            <Calendar size={14} className="opacity-60" />
                            <strong className="text-white font-medium">27.03.2026</strong>
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
                    <ProjectRuler currentId={4} />
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#FAFBFC] text-[#1A1A1A]">
                <div className="max-w-[820px] mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Nach der Erstellung des Golden Images in <strong>Projekt 03</strong> wird nun die Effizienz der IT-Infrastruktur bewiesen. Das Ziel ist es, eine neue virtuelle Maschine (<Code>Client01</Code>) <strong>innerhalb von Minuten</strong> bereitzustellen.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Anstatt ein ISO-Image zu mounten und Windows von Grund auf neu zu installieren, wird das Master-Image <strong>geklont</strong>. Die neue Maschine startet direkt in die Out-of-Box Experience (OOBE) und ist nach der Vergabe eines lokalen Administratorkontos sofort einsatzbereit für den nächsten Schritt: den <strong>Beitritt in eine Active Directory Domäne (Projekt 05)</strong>.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Als Eingabe steht das in Projekt 03 erstellte und generalisierte Master-Image bereit:
                        </p>
                        <SpecTable rows={[
                            ["Quell-Datei", "ReferenzRechner.vhdx (Master Image, 34 GB)"],
                            ["Ziel-VM Name", "Client01"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["Ziel-Bereitstellungszeit", "< 10 Minuten"],
                        ]} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und Deployment-Prinzip" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Deployment folgt einem klaren Copy-First-Prinzip, das das Original dauerhaft schützt:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
                            <ArchCard icon="🔒" title="Read-Only Master" desc="Das originale Master-Image wird niemals direkt an eine VM gemountet — es bleibt stets unangetastet." />
                            <ArchCard icon="📋" title="Klonen" desc="Für jeden neuen Client wird eine exakte Kopie der VHDX auf Dateisystemebene erstellt." />
                            <ArchCard icon="⚡" title="Rapid Provisioning" desc="Hyper-V überspringt die Laufwerks-Erstellung und nutzt die geklonte VHDX als Boot-Medium." />
                        </div>
                        <NoteBlock
                            title="Golden Rule"
                            text={'Das originale Master-Image ist strengstens „Read-Only". Jede neue VM erhält eine eigene Kopie — niemals das Original.'}
                        />
                    </section>

                    {/* ── 4. DURCHFÜHRUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={4} title="Durchführung" tagline="Schritt für Schritt — vom Klon zur fertigen Workstation" />

                        <PhaseLabel label="Phase 1 — Klonen des Master-Images" />
                        <Step
                            num={1}
                            title="Ordnerstruktur anlegen"
                            desc={<>Ein neuer Ordner <Code>C:\VM\Client01</Code> wurde angelegt, um die VM-Dateien sauber zu organisieren.</>}
                        />
                        <Step
                            num={2}
                            title="Kopie erstellen und umbenennen"
                            desc={<>Die Datei <Code>ReferenzRechner.vhdx</Code> wurde kopiert, in den neuen Ordner eingefügt und in <Code>Client01.vhdx</Code> umbenannt, um das Original vollständig zu schützen.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_1.png`} figNum="Abb. 1" caption="Windows Explorer — Das originale Master-Image (ReferenzRechner.vhdx) wird geklont (kopiert)." onZoom={zoom} />

                        <PhaseLabel label="Phase 2 — VM-Provisionierung in Hyper-V" />
                        <Step
                            num={1}
                            title="Neuen virtuellen Computer anlegen"
                            desc="Im Hyper-V Manager wurde ein neuer virtueller Computer der Generation 2 über den Assistenten angelegt." />
                        <Step
                            num={2}
                            title="RAM und Netzwerk-Switch zuweisen"
                            desc="Arbeitsspeicher und ein virtueller Netzwerk-Switch wurden entsprechend der Zielkonfiguration zugewiesen." />
                        <Step
                            num={3}
                            title='Vorhandene Festplatte verwenden — der entscheidende Schritt'
                            desc={<>Anstelle der Erstellung einer neuen leeren Festplatte wurde die Option <strong>„Vorhandene virtuelle Festplatte verwenden"</strong> gewählt und der Pfad zur <Code>Client01.vhdx</Code> angegeben. Damit überspringt Hyper-V die komplette OS-Installation.</>}
                        />
                        <ProofFigure src={`${BASE}/abb_2.png`} figNum="Abb. 2" caption='Hyper-V Assistent — Option "Vorhandene virtuelle Festplatte verwenden" mit Pfad zur Client01.vhdx.' onZoom={zoom} />

                        <PhaseLabel label="Phase 3 — OOBE und Bereitstellung" />
                        <Step
                            num={1}
                            title="Bootvorgang"
                            desc="Die VM wurde gestartet. Das System verarbeitete kurz die Hardware-Erkennung und sprang sofort in den Windows 11 OOBE-Dialog (Regions- und Tastaturauswahl)." />
                        <Step
                            num={2}
                            title="Lokales Konto einrichten"
                            desc={<>Um Konflikte mit der zukünftigen AD-Domäne zu vermeiden, wurde die Anmeldung mit einem Microsoft-Konto umgangen und ein <strong>lokaler Administrator</strong> angelegt (<em>„Offline-Konto"</em> / <em>„Domain Join stattdessen"</em>).</>}
                        />
                        <Step
                            num={3}
                            title="Desktop-Validierung"
                            desc="Nach wenigen Klicks erschien der Windows 11 Desktop. Alle in Projekt 03 installierten Programme (Chrome, Acrobat, VLC) waren voll funktionstüchtig vorhanden — ohne erneute Installation." />
                        <ProofFigure src={`${BASE}/abb_3.png`} figNum="Abb. 3" caption="VM-Konsole — Erfolgreicher Start direkt in den Windows 11 OOBE-Bildschirm (Region: Deutschland)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/abb_4.png`} figNum="Abb. 4" caption="Windows Desktop — Fertig bereitgestellter Client mit vorinstallierter Software (Acrobat, Chrome, VLC) nach unter 10 Minuten." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LÖSUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={5} title="Probleme & Lösung" tagline="Herausforderungen im Prozess und wie sie gelöst wurden" />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: Schutz der Master-VHDX vor versehentlichem Überschreiben"
                            body="Wenn eine VM direkt auf das Original-Image zeigt und Änderungen vorgenommen werden, wird das Master-Image unwiederbringlich modifiziert — alle zukünftigen Deployments wären kompromittiert."
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Lösung: Copy-First-Prinzip konsequent einhalten"
                            body={<>Das Original bleibt dauerhaft isoliert in einem gesonderten Ordner. Hyper-V greift ausschließlich auf eine <strong>umbenannte Kopie</strong> zu. Bei Bedarf kann die Master-VHDX zusätzlich als schreibgeschützt markiert werden (<Code>attrib +R ReferenzRechner.vhdx</Code>).</>}
                        />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: Windows 11 OOBE erzwingt Microsoft-Konto"
                            body="Windows 11 versucht standardmäßig, bei der Einrichtung eine Microsoft-Konto-Anmeldung zu erzwingen. Ein Microsoft-Konto würde den späteren Domain Join (Projekt 05) erschweren, da lokale und domänengebundene Konten in Konflikt geraten können."
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title='Lösung: "Offline-Konto" / "Domain Join stattdessen" wählen'
                            body={<>Durch die Auswahl von <strong>„Eingeschränkte Erfahrung"</strong> oder <strong>„Domain Join stattdessen"</strong> im OOBE-Dialog kann die Microsoft-Konto-Pflicht umgangen werden. So wird ein klassisches lokales Administratorkonto erstellt, das für den späteren AD-Domain-Join ideal ist.</>}
                        />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Der neue Client wurde erfolgreich bereitgestellt. Alle definierten Erfolgskriterien wurden erfüllt:
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
                                Durch das Zusammenspiel von <strong>Golden Image (Projekt 03)</strong> und <strong>Rapid Deployment (Projekt 04)</strong> ist eine vollständig skalierbare Client-Deployment-Pipeline entstanden. Ein neuer Unternehmens-Client ist in unter 10 Minuten einsatzbereit — ohne manuelle OS-Installation, ohne Konfigurationsaufwand.
                            </p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed">
                                <strong>Verbindung zu Projekt 05:</strong> Der bereitgestellte <Code>Client01</Code> ist der direkte Eingangspunkt für das nächste Projekt — Active Directory Setup & Domain Join, bei dem dieser Client in eine zentrale Unternehmensdomäne integriert wird.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. SCREENSHOT-VERZEICHNIS ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Screenshot-Verzeichnis" tagline="Alle 4 Nachweise auf einen Blick" />
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
                            <a href="/projekt/windows/ad-setup" style={{ textDecoration: "none", color: "inherit" }}>
                                <p className="text-xs text-[#7A8599] mb-1">Nächstes Projekt</p>
                                <p className="text-sm font-semibold text-[#4A5568] hover:text-[#0078D4]">Projekt 05: Active Directory Setup &amp; Domain Join</p>
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
                <p className="text-[13px] text-[#7A8599]"><strong>Projekt 04</strong> — Microsoft Enterprise IT &middot; Modul 1: Client OS Lifecycle</p>
                <p className="text-[13px] text-[#7A8599] mt-1.5"><a href="https://gokhanzehirlioglu.de" className="text-[#0078D4] no-underline hover:underline">gokhanzehirlioglu.de</a> &middot; Gokhan Zehirlioglu &middot; Fachinformatiker für Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektDeployment;
