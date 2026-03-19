import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import {
    Calendar, Monitor, CheckCircle2, ArrowRight,
    AlertCircle, User, Maximize2
} from "lucide-react";

const C = "#0078D4"; // Windows Blue
const BASE = "/images/microsoft/ad-setup";

// ─── Reusable: Section Header ─────────────────────────────────────────────────
const SectionHeader = ({ num, title, tagline }: { num: number; title: string; tagline: string }) => (
    <div className="flex items-start gap-4 mb-6">
        <div
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-white text-base font-bold mt-0.5"
            style={{ background: C }}
        >
            {num}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <p className="text-sm mt-0.5" style={{ color: `${C}aa` }}>{tagline}</p>
        </div>
    </div>
);

// ─── Reusable: Proof Figure ───────────────────────────────────────────────────
const ProofFigure = ({
    src, figNum, caption, onZoom,
}: { src: string; figNum: string; caption: string; onZoom: (src: string) => void }) => (
    <figure
        className="my-7 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-lg cursor-zoom-in group transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
        onClick={() => onZoom(src)}
    >
        <div className="relative">
            <img src={src} alt={caption} className="w-full block opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/60 rounded-full p-1.5">
                    <Maximize2 size={14} className="text-white" />
                </div>
            </div>
        </div>
        <figcaption className="px-5 py-3 flex items-center gap-3 bg-[#161616] border-t border-white/5">
            <span
                className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full font-mono"
                style={{ background: `${C}22`, color: C }}
            >
                {figNum}
            </span>
            <span className="text-xs text-slate-400 leading-relaxed">{caption}</span>
        </figcaption>
    </figure>
);

// ─── Reusable: Phase Label ────────────────────────────────────────────────────
const PhaseLabel = ({ label }: { label: string }) => (
    <div
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mt-8 mb-5"
        style={{ background: `${C}15`, color: C, border: `1px solid ${C}30` }}
    >
        {label}
    </div>
);

// ─── Reusable: Step Item ──────────────────────────────────────────────────────
const Step = ({ num, title, desc }: { num: number; title: string; desc: React.ReactNode }) => (
    <div className="flex gap-4 mb-5 items-start">
        <div
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-white text-xs font-bold mt-0.5"
            style={{ background: C }}
        >
            {num}
        </div>
        <div>
            <p className="text-sm font-semibold text-white mb-1">{title}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        </div>
    </div>
);

// ─── Reusable: Issue Card ─────────────────────────────────────────────────────
const IssueCard = ({ type, icon: Icon, title, body }: {
    type: "problem" | "solution"; icon: typeof AlertCircle; title: string; body: React.ReactNode;
}) => (
    <div className="my-5 rounded-xl overflow-hidden border border-white/10 shadow">
        <div className={`px-5 py-3 flex items-center gap-3 text-sm font-semibold border-b border-white/5 ${type === "problem" ? "bg-red-950/40 text-red-400" : "bg-green-950/40 text-green-400"}`}>
            <Icon size={18} className="flex-shrink-0" />
            {title}
        </div>
        <div className="px-5 py-4 bg-[#1a1a1a] text-sm text-slate-400 leading-relaxed">
            {body}
        </div>
    </div>
);

// ─── Reusable: Note Block ─────────────────────────────────────────────────────
const NoteBlock = ({ title, text }: { title: string; text: React.ReactNode }) => (
    <div className="my-4 pl-4 py-3 pr-4 rounded-r-xl border-l-2 bg-amber-950/20 border-amber-500/60">
        <p className="text-xs font-bold text-amber-400 mb-1">{title}</p>
        <div className="text-sm text-slate-400 leading-relaxed">{text}</div>
    </div>
);

// ─── Reusable: Arch Card ─────────────────────────────────────────────────────
const ArchCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
    <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/5 hover:border-blue-500/30 transition-colors">
        <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3"
            style={{ background: `${C}15` }}
        >
            {icon}
        </div>
        <p className="text-xs font-semibold text-white mb-1">{title}</p>
        <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

// ─── Spec Table ───────────────────────────────────────────────────────────────
const SpecTable = ({ rows }: { rows: string[][] }) => (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow mb-6">
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-4 py-2.5 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Eigenschaft</th>
                    <th className="px-4 py-2.5 text-left text-xs uppercase tracking-wider text-slate-500 font-semibold">Wert</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#161616]"}>
                        <td className="px-4 py-2.5 text-xs font-semibold whitespace-nowrap" style={{ color: `${C}cc` }}>{key}</td>
                        <td className="px-4 py-2.5 text-xs text-slate-400">{val}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// ═══════════════ MAIN COMPONENT ═══════════════
const ProjektADSetup = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const screenshotIndex = [
        [1, "Server Manager -- Lokaler Server (AD DS-Rolle installiert)"],
        [2, "Netzwerkverbindungen offnen (ncpa.cpl)"],
        [3, "Server -- Ethernet-Eigenschaften (TCP/IPv4)"],
        [4, "Server -- IPv4-Konfiguration (192.168.10.10, DNS: 127.0.0.1)"],
        [5, "AD DS -- Bereitstellungskonfiguration (Neue Gesamtstruktur)"],
        [6, "AD DS -- DNS-Optionen (keine Delegierung)"],
        [7, "AD DS -- Pfade (NTDS, SYSVOL)"],
        [8, "AD DS -- Voraussetzungsuberprufung bestanden"],
        [9, "Server Manager -- AD DS (Server Online, 192.168.10.10)"],
        [10, "W11Home -- IPv4-Konfiguration (192.168.10.11, DNS: 192.168.10.10)"],
        [11, "W11Pro -- IPv4-Konfiguration (192.168.10.12, DNS: 192.168.10.10)"],
        [12, "W11Enterprise -- IPv4-Konfiguration (192.168.10.13, DNS: 192.168.10.10)"],
        [13, "Ping-Test -- W11Home -> DC (0% Verlust)"],
        [14, "Ping-Test -- W11Pro -> DC (0% Verlust)"],
        [15, "Domain Join -- sysdm.cpl (Systemeigenschaften)"],
        [16, "W11Pro -- Systemeigenschaften nach Domain Join"],
        [17, 'W11Pro -- "Willkommen in der Domane gfn_lab.local"'],
        [18, 'W11Enterprise -- "Willkommen in der Domane gfn_lab.local"'],
        [19, "Active Directory -- Registrierte Computer (W11_PRO + WIN11_ENTERPRIS)"],
    ];

    const resultRows = [
        { kriterium: "Domain Controller konfiguriert (AD DS + DNS)", nachweis: "Abb. 1, 9" },
        { kriterium: "Server IP statisch konfiguriert", nachweis: "Abb. 4" },
        { kriterium: "Client IPs + DNS konfiguriert", nachweis: "Abb. 10, 11, 12" },
        { kriterium: "Netzwerkkommunikation (Ping) erfolgreich", nachweis: "Abb. 13, 14" },
        { kriterium: "W11Pro -- Domain Join erfolgreich", nachweis: "Abb. 16, 17" },
        { kriterium: "W11Enterprise -- Domain Join erfolgreich", nachweis: "Abb. 18" },
        { kriterium: "W11Home -- Domain Join nicht moglich (erwartet)", nachweis: "Abschnitt 4" },
        { kriterium: "Clients in Active Directory sichtbar", nachweis: "Abb. 19" },
        { kriterium: "Editionsunterschiede dokumentiert", nachweis: "Abschnitt 5" },
    ];

    return (
        <Layout>
            <Helmet>
                <title>Active Directory Setup & Domain Join -- Gokhan Zehirlioglu</title>
                <meta name="description" content="Active Directory Domain Services auf Windows Server 2019 einrichten und Windows 11 Clients in die Domane integrieren." />
            </Helmet>
            <Lightbox src={zoomedImage} onClose={closeLightbox} />

            {/* ══════════════════════════ HERO ══════════════════════════ */}
            <header
                className="relative overflow-hidden text-white"
                style={{ background: "linear-gradient(135deg, #001D3D 0%, #002B5C 50%, #005A9E 100%)" }}
            >
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Glow */}
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }} />

                <div className="relative z-10 max-w-3xl mx-auto px-6 py-14">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-white/50 mb-7 flex-wrap">
                        <span>System &amp; Server Administration</span>
                        <span className="opacity-40">&#8250;</span>
                        <span>Microsoft Enterprise IT</span>
                        <span className="opacity-40">&#8250;</span>
                        <span>Modul 2: Identity &amp; Server Administration</span>
                        <span className="opacity-40">&#8250;</span>
                        <span style={{ color: "#4EA8DE" }} className="font-medium">Projekt 05</span>
                    </nav>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
                        Active Directory Setup<br />
                        <span style={{ color: "#4EA8DE" }}>&amp; Client Domain Join</span>
                    </h1>
                    <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
                        Eine zentrale Active Directory-Infrastruktur auf Windows Server 2019 aufbauen
                        und Windows 11 Clients verschiedener Editionen in die Domane integrieren --
                        Schritt fur Schritt dokumentiert.
                    </p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-5 mb-8">
                        {[
                            { Icon: Calendar, label: "19.03.2026" },
                            { Icon: Monitor, label: "Hyper-V auf Remote Desktop" },
                            { Icon: User, label: "Gokhan Zehirlioglu" },
                        ].map(({ Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-xs text-white/50">
                                <Icon size={14} className="opacity-60" />
                                <span className="text-white/80 font-medium">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Project nav pills */}
                    <nav className="flex flex-wrap gap-2">
                        {[
                            { label: "01 Upgrade", active: false },
                            { label: "02 Migration", active: false },
                            { label: "03 Golden Image", active: false },
                            { label: "04 Deployment", active: false },
                            { label: "05 Active Directory", active: true },
                            { label: "06 GPO (Geplant)", active: false, disabled: true },
                        ].map(({ label, active, disabled }) => (
                            <span
                                key={label}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${disabled ? "opacity-50" : ""}`}
                                style={active
                                    ? { background: C, borderColor: C, color: "#fff" }
                                    : { background: "transparent", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }
                                }
                            >
                                {label}
                            </span>
                        ))}
                    </nav>
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#111111] text-slate-300">
                <div className="max-w-3xl mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-sm leading-relaxed text-slate-400 mb-4">
                            Dieses Projekt simuliert ein <strong className="text-white">reales Unternehmensszenario</strong>:
                            Ein IT-Administrator richtet eine zentrale Verzeichnisdienstumgebung auf Basis von{" "}
                            <strong className="text-white">Active Directory Domain Services (AD DS)</strong> ein und bindet
                            Arbeitsplatzrechner verschiedener Windows-Editionen an die Domane an.
                        </p>
                        <p className="text-sm leading-relaxed text-slate-400 mb-4">
                            Dabei wird untersucht, welche Windows 11 Editionen (<strong className="text-white">Home, Pro, Enterprise</strong>)
                            einen Domain Join unterstutzen und welche nicht. Die Netzwerk- und DNS-Voraussetzungen werden dokumentiert,
                            da diese in der Praxis die haufigste Fehlerquelle darstellen.
                        </p>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Der gesamte Prozess wird nach dem <strong className="text-white">Proof-Driven-Prinzip</strong> dokumentiert --
                            jeder Schritt wird durch Screenshots belegt. So entsteht eine vollstandige Nachweiskette, wie sie in der
                            professionellen IT-Administration erwartet wird.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration aller beteiligten Maschinen" />
                        <p className="text-sm leading-relaxed text-slate-400 mb-6">
                            Das Projekt wurde mit insgesamt <strong className="text-white">vier virtuellen Maschinen</strong> durchgefuhrt --
                            einem Domain Controller und drei Windows 11 Clients unterschiedlicher Editionen.
                        </p>

                        <p className="text-sm font-semibold text-white mt-6 mb-2">Domain Controller (WServer2019)</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows Server 2019 Standard Evaluation"],
                            ["Hostname", "WIN-QLN9UGPDOEA"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["IP-Adresse", "192.168.10.10"],
                            ["Subnetzmaske", "255.255.255.0"],
                            ["DNS-Server", "127.0.0.1 (Loopback)"],
                            ["Rollen", "AD DS, DNS"],
                            ["Domane", "gfn_lab.local"],
                        ]} />

                        <p className="text-sm font-semibold text-white mt-6 mb-2">Client 1 -- Windows 11 Home</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 11 Home"],
                            ["IP-Adresse", "192.168.10.11"],
                            ["Bevorzugter DNS", "192.168.10.10 (Domain Controller)"],
                            ["Virtualisierung", "Hyper-V, Generation 2"],
                            ["Domain Join", "Nicht unterstutzt (Home Edition)"],
                        ]} />

                        <p className="text-sm font-semibold text-white mt-6 mb-2">Client 2 -- Windows 11 Pro</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 11 Pro"],
                            ["Computername", "W1P (FQDN: W1P.gfn_lab.local)"],
                            ["IP-Adresse", "192.168.10.12"],
                            ["Bevorzugter DNS", "192.168.10.10 (Domain Controller)"],
                            ["Domain Join", "Erfolgreich (gfn_lab.local)"],
                        ]} />

                        <p className="text-sm font-semibold text-white mt-6 mb-2">Client 3 -- Windows 11 Enterprise</p>
                        <SpecTable rows={[
                            ["Betriebssystem", "Windows 11 Enterprise (Evaluation, 90 Tage)"],
                            ["Computername", "DESKTOP-9TILDN0"],
                            ["IP-Adresse", "192.168.10.13"],
                            ["Bevorzugter DNS", "192.168.10.10 (Domain Controller)"],
                            ["Domain Join", "Erfolgreich (gfn_lab.local)"],
                        ]} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und technischer Aufbau" />
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Das Projekt wurde vollstandig auf einem <strong className="text-white">Remote Desktop Server</strong> durchgefuhrt.
                            Innerhalb dieser Umgebung wird Hyper-V als Virtualisierungsplattform genutzt:
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            <ArchCard icon="&#128421;&#65039;" title="Host-System" desc="Windows Server auf Remote Desktop (WIN-DSQN5G5QED1)" />
                            <ArchCard icon="&#127970;" title="Domain Controller" desc="WServer2019 -- Windows Server 2019 mit AD DS + DNS" />
                            <ArchCard icon="&#128187;" title="3x Windows 11 Clients" desc="Home (.11), Pro (.12), Enterprise (.13)" />
                            <ArchCard icon="&#127760;" title="Netzwerk" desc="Privater virtueller Switch (192.168.10.0/24)" />
                            <ArchCard icon="&#128273;" title="Domane" desc="gfn_lab.local -- Zentrale Authentifizierung" />
                            <ArchCard icon="&#128225;" title="DNS" desc="Integrierter DNS-Dienst auf dem Domain Controller" />
                        </div>

                        <p className="text-sm text-slate-400 mb-2 leading-relaxed">
                            Die folgende Abbildung zeigt den Server Manager mit der installierten <strong className="text-white">AD DS-Rolle</strong> und
                            allen konfigurierten Rollen und Features:
                        </p>
                        <ProofFigure
                            src={`${BASE}/projekt5_5_0.png`}
                            figNum="Abb. 1"
                            caption="Server Manager -- Lokaler Server (AD DS-Rolle installiert, Rollen und Features)."
                            onZoom={zoom}
                        />
                    </section>

                    {/* ── 4. DURCHFUHRUNG ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={4} title="Durchfuhrung" tagline="Schritt fur Schritt -- vom Server bis zum Domain Join" />

                        {/* Phase 1: Server */}
                        <PhaseLabel label="Phase 1 -- Server-Konfiguration" />
                        <Step num={1} title="Netzwerkverbindungen offnen (ncpa.cpl)"
                            desc={<>Uber die Tastenkombination <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">Win+R</code> und den Befehl <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">ncpa.cpl</code> wurden die Netzwerkverbindungen auf dem Server aufgerufen.</>}
                        />
                        <Step num={2} title="Statische IPv4-Konfiguration"
                            desc={<>IP-Adresse <strong className="text-white">192.168.10.10</strong> mit Subnetzmaske 255.255.255.0 statisch zugewiesen. Als Bevorzugter DNS-Server wurde <strong className="text-white">127.0.0.1 (Loopback)</strong> eingetragen -- der Server verweist auf seinen eigenen DNS-Dienst.</>}
                        />
                        <ProofFigure src={`${BASE}/projekt5_4_0.png`} figNum="Abb. 2" caption="Netzwerkverbindungen offnen (ncpa.cpl)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_4_1.png`} figNum="Abb. 3" caption="Server -- Ethernet-Eigenschaften (TCP/IPv4 ausgewahlt)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_4_2.png`} figNum="Abb. 4" caption="Server -- IPv4-Konfiguration (192.168.10.10, DNS: 127.0.0.1)." onZoom={zoom} />

                        {/* Phase 2: AD DS */}
                        <PhaseLabel label="Phase 2 -- Active Directory Installation" />
                        <Step num={1} title="Bereitstellungskonfiguration"
                            desc={<>Die Option <strong className="text-white">&bdquo;Neue Gesamtstruktur hinzufugen&ldquo;</strong> wurde ausgewahlt. Als Stammdomanenname wurde <strong className="text-white">gfn_lab.local</strong> eingegeben.</>}
                        />
                        <Step num={2} title="DNS-Optionen"
                            desc="Die DNS-Delegierung wurde nicht erstellt, da keine ubergeordnete Zone vorhanden war. Der DNS-Dienst wurde automatisch mit der AD DS-Rolle installiert."
                        />
                        <Step num={3} title="Pfade (NTDS, SYSVOL)"
                            desc={<>Die Standardpfade fur die AD DS-Datenbank (<code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Windows\NTDS</code>) und SYSVOL (<code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">C:\Windows\SYSVOL</code>) wurden beibehalten.</>}
                        />
                        <Step num={4} title="Voraussetzungsuberprufung"
                            desc="Alle erforderlichen Komponenten wurden erfolgreich uberpruft. Es wurden zwei Warnungen angezeigt (siehe Abschnitt 5), die die Installation jedoch nicht blockierten."
                        />
                        <ProofFigure src={`${BASE}/projekt5_5_1.png`} figNum="Abb. 5" caption="AD DS -- Bereitstellungskonfiguration (Neue Gesamtstruktur, gfn_lab.local)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5_2.png`} figNum="Abb. 6" caption="AD DS -- DNS-Optionen (keine Delegierung)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5_3.png`} figNum="Abb. 7" caption="AD DS -- Pfade (NTDS, SYSVOL)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5_4.png`} figNum="Abb. 8" caption="AD DS -- Voraussetzungsuberprufung bestanden." onZoom={zoom} />

                        <p className="text-sm text-slate-400 mb-2 mt-4 leading-relaxed">
                            Nach dem Neustart war der Server als Domain Controller fur die Domane <strong className="text-white">gfn_lab.local</strong> aktiv:
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_7.png`} figNum="Abb. 9" caption="Server Manager -- AD DS (Server Online, 192.168.10.10)." onZoom={zoom} />

                        {/* Phase 3: Clients */}
                        <PhaseLabel label="Phase 3 -- Client-Konfiguration" />
                        <Step num={1} title="Statische IP-Adressen zuweisen"
                            desc={<>Jeder Client erhielt eine statische IP-Adresse im Subnetz 192.168.10.0/24: Home (<strong className="text-white">.11</strong>), Pro (<strong className="text-white">.12</strong>), Enterprise (<strong className="text-white">.13</strong>).</>}
                        />
                        <Step num={2} title="DNS-Server konfigurieren"
                            desc={<>Als <strong className="text-white">&bdquo;Bevorzugter DNS-Server&ldquo;</strong> wurde auf allen Clients die IP-Adresse des Domain Controllers (<strong className="text-white">192.168.10.10</strong>) eingetragen. Dies ist die wichtigste Voraussetzung fur den Domain Join.</>}
                        />
                        <Step num={3} title="Konnektivitatstest (Ping)"
                            desc={<>Uber den Befehl <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">ping 192.168.10.10</code> wurde die Netzwerkverbindung zum Domain Controller uberpruft -- alle Clients erreichten den Server mit <strong className="text-white">0% Verlust</strong>.</>}
                        />
                        <ProofFigure src={`${BASE}/projekt5_14.png`} figNum="Abb. 10" caption="W11Home -- IPv4-Konfiguration (192.168.10.11, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_13.png`} figNum="Abb. 11" caption="W11Pro -- IPv4-Konfiguration (192.168.10.12, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_10.png`} figNum="Abb. 12" caption="W11Enterprise -- IPv4-Konfiguration (192.168.10.13, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_8.png`} figNum="Abb. 13" caption="Ping-Test -- W11Home -> DC (0% Verlust, Erreichbarkeit bestatigt)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_9.png`} figNum="Abb. 14" caption="Ping-Test -- W11Pro -> DC (0% Verlust, Erreichbarkeit bestatigt)." onZoom={zoom} />

                        {/* Phase 4: Domain Join */}
                        <PhaseLabel label="Phase 4 -- Domain Join" />

                        {/* Pro */}
                        <p className="text-sm font-semibold text-white mt-6 mb-3">Windows 11 Pro -- Erfolgreich &#10003;</p>
                        <Step num={1} title="Systemeigenschaften offnen (sysdm.cpl)"
                            desc={<>Uber <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">Win+R &#8594; sysdm.cpl</code> wurden die Systemeigenschaften geoffnet.</>}
                        />
                        <Step num={2} title="Domane beitreten"
                            desc={<>Uber den Button <strong className="text-white">&bdquo;Andern&ldquo;</strong> wurde das Feld &bdquo;Mitglied von&ldquo; auf <strong className="text-white">&bdquo;Domane&ldquo;</strong> gesetzt und <strong className="text-white">gfn_lab.local</strong> eingetragen.</>}
                        />
                        <Step num={3} title="Authentifizierung & Ergebnis"
                            desc={<>Die Domain-Administrator-Anmeldedaten wurden verifiziert. Die Meldung <strong className="text-white">&bdquo;Willkommen in der Domane gfn_lab.local&ldquo;</strong> bestatigte den erfolgreichen Beitritt. Computername: <strong className="text-white">W1P</strong> (FQDN: W1P.gfn_lab.local).</>}
                        />
                        <ProofFigure src={`${BASE}/projekt5_6_1.png`} figNum="Abb. 15" caption="Domain Join -- sysdm.cpl (Systemeigenschaften offnen)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_6_2.png`} figNum="Abb. 16" caption="W11Pro -- Systemeigenschaften nach Domain Join (W1P.gfn_lab.local)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_6_3.png`} figNum="Abb. 17" caption='W11Pro -- "Willkommen in der Domane gfn_lab.local".' onZoom={zoom} />

                        {/* Home */}
                        <p className="text-sm font-semibold text-white mt-10 mb-3">Windows 11 Home -- Fehlschlag &#10007;</p>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Windows 11 Home Edition unterstutzt <strong className="text-white">architekturbedingt keinen Active Directory Domain Join</strong>.
                            Im Dialog &bdquo;Andern des Computernamens bzw. der Domane&ldquo; ist die Option &bdquo;Domane&ldquo; ausgegraut und nicht anklickbar.
                            Nur die Arbeitsgruppe (Workgroup) kann konfiguriert werden.
                        </p>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Dies ist eine bewusste Einschrankung von Microsoft: Die Home-Edition ist fur den Privatgebrauch konzipiert und
                            enthalt keine Unternehmensfunktionen wie Domanen-Mitgliedschaft, Gruppenrichtlinien oder BitLocker-Management.
                        </p>

                        {/* Enterprise */}
                        <p className="text-sm font-semibold text-white mt-10 mb-3">Windows 11 Enterprise -- Erfolgreich &#10003;</p>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Der Domain Join verlief identisch zum Pro-Client. Nach der IP- und DNS-Konfiguration wurde uber sysdm.cpl
                            die Domane gfn_lab.local eingetragen und die Administrator-Anmeldedaten verifiziert. Die Meldung{" "}
                            <strong className="text-white">&bdquo;Willkommen in der Domane gfn_lab.local&ldquo;</strong> bestatigte den
                            erfolgreichen Beitritt. Computername: <strong className="text-white">DESKTOP-9TILDN0</strong>.
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_11.png`} figNum="Abb. 18" caption='W11Enterprise -- "Willkommen in der Domane gfn_lab.local" (DESKTOP-9TILDN0).' onZoom={zoom} />

                        {/* Phase 5: Verification */}
                        <PhaseLabel label="Phase 5 -- Zentrale Verifizierung" />
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Nach den erfolgreichen Domain Joins wurde auf dem Domain Controller die Konsole{" "}
                            <strong className="text-white">&bdquo;Active Directory-Benutzer und -Computer&ldquo;</strong> geoffnet.
                            Im Container <strong className="text-white">&bdquo;Computers&ldquo;</strong> waren beide erfolgreich
                            aufgenommenen Clients sichtbar: <strong className="text-white">W11_PRO</strong> und{" "}
                            <strong className="text-white">WIN11_ENTERPRIS</strong>. Der Windows 11 Home Client fehlt
                            erwartungsgemas, da die Home-Edition keinen Domain Join unterstutzt.
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_12.png`} figNum="Abb. 19" caption="Active Directory -- Registrierte Computer (W11_PRO + WIN11_ENTERPRIS im Computers-Container)." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LOSUNG ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={5} title="Probleme & Losung" tagline="Herausforderungen im Prozess und wie sie gelost wurden" />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: Windows 11 Home -- Kein Domain Join moglich"
                            body={
                                <>Die Windows 11 Home Edition bietet <strong className="text-slate-300">keine Moglichkeit</strong>, einer
                                Active Directory-Domane beizutreten. Die Option &bdquo;Domane&ldquo; im Systemeigenschaften-Dialog ist
                                deaktiviert (ausgegraut). Microsoft beschrankt die Domanen-Funktionalitat bewusst auf die Editionen{" "}
                                <strong className="text-slate-300">Pro, Enterprise und Education</strong>.</>
                            }
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Losung: Mindestens Windows Pro einsetzen"
                            body={
                                <>In Unternehmensumgebungen muss mindestens <strong className="text-slate-300">Windows Pro</strong> eingesetzt
                                werden. Ein Upgrade von Home auf Pro ist uber den Microsoft Store oder per Volume-Lizenz moglich.
                                <br /><br />
                                <span style={{ color: C }} className="font-semibold">Praxishinweis:</span> Fur Lern- und Testumgebungen eignen
                                sich die kostenlosen <strong className="text-slate-300">Evaluation-ISOs</strong> von Microsoft ideal, da sie
                                alle Enterprise-Funktionen ohne Einschrankungen bieten.</>
                            }
                        />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: Unterstrich im Domanennamen (gfn_lab.local)"
                            body={
                                <>Die Voraussetzungsuberprufung zeigte eine Warnung: Der Domanenname &bdquo;gfn_lab.local&ldquo; enthalt
                                einen <strong className="text-slate-300">Unterstrich (_)</strong>. Microsoft DNS-Server erlauben zwar
                                Unterstriche, andere DNS-Serverprodukte jedoch moglicherweise nicht.</>
                            }
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Losung: RFC-konformen Domanennamen verwenden"
                            body={
                                <>Da die Umgebung ausschliesslich Microsoft-Komponenten verwendet, blockiert diese Warnung die Installation
                                nicht. In einer produktiven Umgebung sollte jedoch ein <strong className="text-slate-300">RFC-konformer
                                Domanenname</strong> ohne Sonderzeichen verwendet werden (z. B. gfnlab.local oder gfn-lab.local).</>
                            }
                        />

                        <IssueCard
                            type="problem"
                            icon={AlertCircle}
                            title="Problem: DNS als haufigste Fehlerquelle beim Domain Join"
                            body={
                                <>Ohne korrekte DNS-Konfiguration auf dem Client kann der Domain Controller nicht gefunden werden.
                                Der Domain Join schlagt dann mit der Meldung <strong className="text-slate-300">&bdquo;Die Domane konnte
                                nicht kontaktiert werden&ldquo;</strong> fehl. Der DNS-Dienst ubernimmt im Active Directory zwei zentrale
                                Aufgaben: <strong className="text-slate-300">Namensauflosung</strong> (FQDN &#8594; IP) und{" "}
                                <strong className="text-slate-300">Dienstidentifizierung</strong> (SRV-Records fur _ldap._tcp).</>
                            }
                        />
                        <IssueCard
                            type="solution"
                            icon={CheckCircle2}
                            title="Losung: DNS-Server auf Domain Controller zeigen lassen"
                            body={
                                <>Auf jedem Client muss in der IPv4-Konfiguration als &bdquo;Bevorzugter DNS-Server&ldquo; die IP-Adresse
                                des Domain Controllers (<strong className="text-slate-300">192.168.10.10</strong>) eingetragen sein.
                                Der Client darf <strong className="text-slate-300">NICHT</strong> auf einen externen DNS-Server (z. B. 8.8.8.8)
                                verweisen, da dieser die internen SRV-Records der Domane nicht kennt.</>
                            }
                        />

                        <NoteBlock title="Kryptografie-Warnung (Windows Server 2019)"
                            text="Die Voraussetzungsuberprufung zeigte zusatzlich eine Warnung zu NT-4.0-kompatiblen Kryptografiealgorithmen. Da in dieser Umgebung ausschliesslich moderne Betriebssysteme verwendet werden, ist diese Warnung nicht relevant. In einer produktiven Umgebung sollte diese Einstellung nach Abschluss der Migration auf 'Nicht zulassen' gesetzt werden."
                        />
                        <NoteBlock title="Editionsvergleich -- Lizenzdifferenzen"
                            text="Nicht aktivierte Retail-Versionen (Home & Pro) funktionieren grundsatzlich, zeigen jedoch ein Wasserzeichen. Die Enterprise Evaluation-Version aktivierte sich nach der Internetverbindung automatisch fur 90 Tage und bot vollen Funktionsumfang."
                        />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-white/5">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Die Active Directory-Infrastruktur wurde erfolgreich aufgebaut und die Client-Integration
                            durchgefuhrt. Alle definierten Erfolgskriterien wurden erfullt:
                        </p>

                        {/* Result Table */}
                        <div className="rounded-xl overflow-hidden border border-white/10 shadow mb-8">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr style={{ background: C }}>
                                        <th className="px-4 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Kriterium</th>
                                        <th className="px-4 py-3 text-center text-xs text-white font-semibold uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-center text-xs text-white font-semibold uppercase tracking-wider">Nachweis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultRows.map((row, i) => (
                                        <tr key={row.kriterium} className={i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#161616]"}>
                                            <td className="px-4 py-2.5 text-xs text-slate-300">{row.kriterium}</td>
                                            <td className="px-4 py-2.5 text-center">
                                                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-green-900/40 text-green-400">
                                                    &#10003; Erfullt
                                                </span>
                                            </td>
                                            <td className="px-4 py-2.5 text-center text-xs font-mono text-slate-500">{row.nachweis}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Fazit */}
                        <div
                            className="rounded-2xl p-6"
                            style={{ background: `linear-gradient(135deg, ${C}12, ${C}06)`, border: `1px solid ${C}25` }}
                        >
                            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C }}>Fazit</p>
                            <p className="text-sm text-slate-400 leading-relaxed mb-3">
                                <strong className="text-white">Active Directory</strong> ist die zentrale Verwaltungskomponente in
                                Windows-Netzwerken. Durch die Kombination von AD DS und DNS wird eine einheitliche Authentifizierung,
                                Autorisierung und zentrale Verwaltung aller Netzwerkressourcen ermoglicht. Fur den Domain Join ist
                                mindestens <strong className="text-white">Windows Pro</strong> erforderlich -- die Home-Edition ist
                                ausschliesslich fur Workgroup-Umgebungen vorgesehen.
                            </p>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                <strong className="text-white">Wichtiger Unterschied zu Projekt 01 und 02:</strong> Wahrend Projekt 01
                                (In-Place Upgrade) und Projekt 02 (USMT Migration) sich auf die Betriebssystem-Migration einzelner
                                Maschinen konzentrierten, behandelt dieses Projekt die <strong className="text-white">zentrale
                                Netzwerk-Infrastruktur</strong>. Active Directory bildet die Grundlage, auf der Upgrade- und
                                Migrationsprozesse in Unternehmen koordiniert werden.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. SCREENSHOT-VERZEICHNIS ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Screenshot-Verzeichnis" tagline="Alle 19 Nachweise auf einen Blick" />
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Die folgenden Screenshots dokumentieren den gesamten Aufbauprozess und dienen als Nachweis
                            fur die erfolgreiche Durchfuhrung:
                        </p>

                        <div className="rounded-xl overflow-hidden border border-white/10 shadow mb-8">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr style={{ background: C }}>
                                        <th className="px-4 py-2.5 text-left text-xs text-white font-semibold uppercase tracking-wider w-16">Abb.</th>
                                        <th className="px-4 py-2.5 text-left text-xs text-white font-semibold uppercase tracking-wider">Beschreibung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {screenshotIndex.map(([n, d], i) => (
                                        <tr key={n as number} className={`transition-colors hover:bg-white/5 ${i % 2 === 1 ? "bg-[#161616]" : "bg-[#1a1a1a]"}`}>
                                            <td className="px-4 py-2.5 text-xs font-semibold" style={{ color: `${C}cc` }}>{n}</td>
                                            <td className="px-4 py-2.5 text-xs text-slate-400">{d}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Next Project Arrow */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
                            <div>
                                <p className="text-xs text-slate-600 mb-1">Nachstes Projekt</p>
                                <p className="text-sm font-semibold text-slate-400">Projekt 06: GPO &amp; OU-Design</p>
                            </div>
                            <div
                                className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full opacity-40"
                                style={{ border: `1px solid ${C}40`, color: C }}
                            >
                                Bald verfugbar
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="py-10 text-center bg-[#0d0d0d] border-t border-white/5">
                <p className="text-xs text-slate-600">
                    <strong className="text-slate-500">Projekt 05 / 06</strong> -- Microsoft Enterprise IT &middot; Modul 2: Identity &amp; Server Administration
                </p>
                <p className="text-xs text-slate-700 mt-1">gokhanzehirlioglu.de &middot; Gokhan Zehirlioglu &middot; Fachinformatiker fur Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektADSetup;
