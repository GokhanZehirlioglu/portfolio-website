import { useState, useCallback } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Download } from "lucide-react";
import {
    Calendar, Monitor, CheckCircle2, ArrowRight,
    AlertCircle, User, Maximize2
} from "lucide-react";

const C = "#0078D4"; // Windows Blue
const BASE = "/images/microsoft/ad-setup";

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
        <figcaption className="px-5 py-3.5 flex items-center gap-3 bg-[#F5F7FA] border-t border-[#E1E5EB]">
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
                <tr key={key} className="transition-colors hover:bg-[#F5F7FA]">
                    <td className="px-5 py-2.5 text-[13px] font-semibold text-[#005A9E] border-b border-[#E1E5EB] whitespace-nowrap w-[200px]">{key}</td>
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

// ═══════════════ MAIN COMPONENT ═══════════════
const ProjektADSetup = () => {
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomedImage(null), []);
    const zoom = (src: string) => setZoomedImage(src);

    const screenshotIndex = [
        [1, "Server Manager — Lokaler Server (AD DS-Rolle installiert)"],
        [2, "Netzwerkverbindungen öffnen (ncpa.cpl)"],
        [3, "Server — Ethernet-Eigenschaften (TCP/IPv4)"],
        [4, "Server — IPv4-Konfiguration (192.168.10.10, DNS: 127.0.0.1)"],
        [5, "AD DS — Bereitstellungskonfiguration (Neue Gesamtstruktur)"],
        [6, "AD DS — DNS-Optionen (keine Delegierung)"],
        [7, "AD DS — Pfade (NTDS, SYSVOL)"],
        [8, "AD DS — Voraussetzungsüberprüfung bestanden"],
        [9, "Server Manager — AD DS (Server Online, 192.168.10.10)"],
        [10, "W11Home — IPv4-Konfiguration (192.168.10.11, DNS: 192.168.10.10)"],
        [11, "W11Pro — IPv4-Konfiguration (192.168.10.12, DNS: 192.168.10.10)"],
        [12, "W11Enterprise — IPv4-Konfiguration (192.168.10.13, DNS: 192.168.10.10)"],
        [13, "Ping-Test — W11Home → DC (0% Verlust)"],
        [14, "Ping-Test — W11Pro → DC (0% Verlust)"],
        [15, "Domain Join — sysdm.cpl (Systemeigenschaften)"],
        [16, "W11Pro — Systemeigenschaften nach Domain Join"],
        [17, `W11Pro — „Willkommen in der Domäne gfn_lab.local"`],
        [18, `W11Enterprise — „Willkommen in der Domäne gfn_lab.local"`],
        [19, "Active Directory — Registrierte Computer (W11_PRO + WIN11_ENTERPRIS)"],
    ];

    const resultRows = [
        { kriterium: "Domain Controller konfiguriert (AD DS + DNS)", nachweis: "Abb. 1, 9" },
        { kriterium: "Server IP statisch konfiguriert", nachweis: "Abb. 4" },
        { kriterium: "Client IPs + DNS konfiguriert", nachweis: "Abb. 10, 11, 12" },
        { kriterium: "Netzwerkkommunikation (Ping) erfolgreich", nachweis: "Abb. 13, 14" },
        { kriterium: "W11Pro — Domain Join erfolgreich", nachweis: "Abb. 16, 17" },
        { kriterium: "W11Enterprise — Domain Join erfolgreich", nachweis: "Abb. 18" },
        { kriterium: "W11Home — Domain Join nicht möglich (erwartet)", nachweis: "Abschnitt 4" },
        { kriterium: "Clients in Active Directory sichtbar", nachweis: "Abb. 19" },
        { kriterium: "Editionsunterschiede dokumentiert", nachweis: "Abschnitt 5" },
    ];

    return (
        <Layout>
            <Helmet>
                <title>Active Directory Setup & Domain Join — Gökhan Zehirlioglu</title>
                <meta name="description" content="Active Directory Domain Services auf Windows Server 2019 einrichten und Windows 11 Clients in die Domäne integrieren." />
            </Helmet>
            <Lightbox src={zoomedImage} onClose={closeLightbox} />

            {/* ══════════════════════════ HERO ══════════════════════════ */}
            <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #001D3D 0%, #002B5C 50%, #005A9E 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }} />
                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/70 mb-7 flex-wrap">
                        <a href="#" className="hover:text-white transition-colors">System & Server Administration</a><span className="opacity-40">&rsaquo;</span>
                        <a href="#" className="hover:text-white transition-colors">Microsoft Enterprise IT</a><span className="opacity-40">&rsaquo;</span>
                        <a href="#" className="hover:text-white transition-colors">Modul 2: Identity & Server Admin</a><span className="opacity-40">&rsaquo;</span>
                        <span className="text-[#4EA8DE] font-medium">Projekt 05</span>
                    </nav>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Active Directory Setup<br /><span style={{ color: "#4EA8DE" }}>&amp; Domain Join</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/70 leading-relaxed max-w-[600px] mb-8">
                        Eine zentrale Active Directory-Infrastruktur auf Windows Server 2019 aufbauen und Windows 11 Clients verschiedener Editionen in die Domäne integrieren — Schritt für Schritt dokumentiert.
                    </p>
                    <div className="flex flex-wrap gap-7 mb-8">
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><Calendar size={14} className="opacity-60" /><strong className="text-white font-medium">19.03.2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><Monitor size={14} className="opacity-60" /><strong className="text-white font-medium">Hyper-V</strong>&nbsp;auf Remote Desktop</div>
                        <div className="flex items-center gap-2 text-[13px] text-white/70"><User size={14} className="opacity-60" /><strong className="text-white font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <a href="/downloads/Projekt05_AD_Setup.docx" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium no-underline transition-all backdrop-blur-sm hover:bg-white/20">
                        <Download size={16} />
                        Dokumentation (DOCX)
                      </a>
                      <a href="/downloads/Anleitung_Projekt05_AD_Setup.docx" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600/15 border border-green-600/35 rounded-lg text-green-300 text-sm font-medium no-underline transition-all backdrop-blur-sm hover:bg-green-600/25">
                        <Download size={16} />
                        Anleitung (DOCX)
                      </a>
                    </div>

                    <ProjectRuler currentId={5} />
                </div>
            </header>

            {/* ══════════════════════════ CONTENT ══════════════════════════ */}
            <div className="bg-[#FAFBFC] text-[#1A1A1A]">
                <div className="max-w-[820px] mx-auto px-6">

                    {/* ── 1. ZIEL ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={1} title="Ziel" tagline="Was wird hier gemacht und warum?" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dieses Projekt simuliert ein <strong>reales Unternehmensszenario</strong>: Ein IT-Administrator richtet eine zentrale Verzeichnisdienstumgebung auf Basis von <strong>Active Directory Domain Services (AD DS)</strong> ein und bindet Arbeitsplatzrechner verschiedener Windows-Editionen an die Domäne an.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dabei wird untersucht, welche Windows 11 Editionen (<strong>Home, Pro, Enterprise</strong>) einen Domain Join unterstützen und welche nicht. Die Netzwerk- und DNS-Voraussetzungen werden dokumentiert, da diese in der Praxis die häufigste Fehlerquelle darstellen.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed">
                            Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert — jeder Schritt wird durch Screenshots belegt. So entsteht eine vollständige Nachweiskette, wie sie in der professionellen IT-Administration erwartet wird.
                        </p>
                    </section>

                    {/* ── 2. AUSGANGSSITUATION ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={2} title="Ausgangssituation" tagline="Systemkonfiguration aller beteiligten Maschinen" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde mit insgesamt <strong>vier virtuellen Maschinen</strong> durchgeführt — einem Domain Controller und drei Windows 11 Clients unterschiedlicher Editionen.
                        </p>
                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Domain Controller (WServer2019)</p>
                        <SpecTable rows={[["Betriebssystem","Windows Server 2019 Standard Evaluation"],["Hostname","WIN-QLN9UGPDOEA"],["Virtualisierung","Hyper-V, Generation 2"],["IP-Adresse","192.168.10.10"],["Subnetzmaske","255.255.255.0"],["DNS-Server","127.0.0.1 (Loopback)"],["Rollen","AD DS, DNS"],["Domäne","gfn_lab.local"]]} />
                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Client 1 — Windows 11 Home</p>
                        <SpecTable rows={[["Betriebssystem","Windows 11 Home"],["IP-Adresse","192.168.10.11"],["Bevorzugter DNS","192.168.10.10 (Domain Controller)"],["Virtualisierung","Hyper-V, Generation 2"],["Domain Join","Nicht unterstützt (Home Edition)"]]} />
                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Client 2 — Windows 11 Pro</p>
                        <SpecTable rows={[["Betriebssystem","Windows 11 Pro"],["Computername","W1P (FQDN: W1P.gfn_lab.local)"],["IP-Adresse","192.168.10.12"],["Bevorzugter DNS","192.168.10.10 (Domain Controller)"],["Domain Join","Erfolgreich (gfn_lab.local)"]]} />
                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-2">Client 3 — Windows 11 Enterprise</p>
                        <SpecTable rows={[["Betriebssystem","Windows 11 Enterprise (Evaluation, 90 Tage)"],["Computername","DESKTOP-9TILDN0"],["IP-Adresse","192.168.10.13"],["Bevorzugter DNS","192.168.10.10 (Domain Controller)"],["Domain Join","Erfolgreich (gfn_lab.local)"]]} />
                    </section>

                    {/* ── 3. ARCHITEKTUR ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={3} title="Architektur" tagline="Infrastruktur und technischer Aufbau" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Das Projekt wurde vollständig auf einem <strong>Remote Desktop Server</strong> durchgeführt. Innerhalb dieser Umgebung wird Hyper-V als Virtualisierungsplattform genutzt:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 my-6">
                            <ArchCard icon="&#128421;&#65039;" title="Host-System" desc="Windows Server auf Remote Desktop (WIN-DSQN5G5QED1)" />
                            <ArchCard icon="&#127970;" title="Domain Controller" desc="WServer2019 — Windows Server 2019 mit AD DS + DNS" />
                            <ArchCard icon="&#128187;" title="3× Windows 11 Clients" desc="Home (.11), Pro (.12), Enterprise (.13)" />
                            <ArchCard icon="&#127760;" title="Netzwerk" desc="Privater virtueller Switch (192.168.10.0/24)" />
                            <ArchCard icon="&#128273;" title="Domäne" desc="gfn_lab.local — Zentrale Authentifizierung" />
                            <ArchCard icon="&#128225;" title="DNS" desc="Integrierter DNS-Dienst auf dem Domain Controller" />
                        </div>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-2">
                            Die folgende Abbildung zeigt den Server Manager mit der installierten <strong>AD DS-Rolle</strong> und allen konfigurierten Rollen und Features:
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_5.0.png`} figNum="Abb. 1" caption="Server Manager — Lokaler Server (AD DS-Rolle installiert, Rollen und Features)." onZoom={zoom} />
                    </section>

                    {/* ── 4. DURCHFÜHRUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={4} title="Durchführung" tagline="Schritt für Schritt — vom Server bis zum Domain Join" />

                        <PhaseLabel label="Phase 1 — Server-Konfiguration" />
                        <Step num={1} title="Netzwerkverbindungen öffnen (ncpa.cpl)" desc={<>Über die Tastenkombination <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">Win+R</code> und den Befehl <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">ncpa.cpl</code> wurden die Netzwerkverbindungen auf dem Server aufgerufen.</>} />
                        <Step num={2} title="Statische IPv4-Konfiguration" desc={<>IP-Adresse <strong>192.168.10.10</strong> mit Subnetzmaske 255.255.255.0 statisch zugewiesen. Als Bevorzugter DNS-Server wurde <strong>127.0.0.1 (Loopback)</strong> eingetragen — der Server verweist auf seinen eigenen DNS-Dienst.</>} />
                        <ProofFigure src={`${BASE}/projekt5_4.0.png`} figNum="Abb. 2" caption="Netzwerkverbindungen öffnen (ncpa.cpl)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_4.1.png`} figNum="Abb. 3" caption="Server — Ethernet-Eigenschaften (TCP/IPv4 ausgewählt)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_4.2.png`} figNum="Abb. 4" caption="Server — IPv4-Konfiguration (192.168.10.10, DNS: 127.0.0.1)." onZoom={zoom} />

                        <PhaseLabel label="Phase 2 — Active Directory Installation" />
                        <Step num={1} title="Bereitstellungskonfiguration" desc={<>Die Option <strong>„Neue Gesamtstruktur hinzufügen"</strong> wurde ausgewählt. Als Stammdomänenname wurde <strong>gfn_lab.local</strong> eingegeben.</>} />
                        <Step num={2} title="DNS-Optionen" desc="Die DNS-Delegierung wurde nicht erstellt, da keine übergeordnete Zone vorhanden war. Der DNS-Dienst wurde automatisch mit der AD DS-Rolle installiert." />
                        <Step num={3} title="Pfade (NTDS, SYSVOL)" desc={<>Die Standardpfade für die AD DS-Datenbank (<code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">C:\Windows\NTDS</code>) und SYSVOL (<code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">C:\Windows\SYSVOL</code>) wurden beibehalten.</>} />
                        <Step num={4} title="Voraussetzungsüberprüfung" desc="Alle erforderlichen Komponenten wurden erfolgreich überprüft. Es wurden zwei Warnungen angezeigt (siehe Abschnitt 5), die die Installation jedoch nicht blockierten." />
                        <ProofFigure src={`${BASE}/projekt5_5.1.png`} figNum="Abb. 5" caption="AD DS — Bereitstellungskonfiguration (Neue Gesamtstruktur, gfn_lab.local)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5.2.png`} figNum="Abb. 6" caption="AD DS — DNS-Optionen (keine Delegierung)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5.3.png`} figNum="Abb. 7" caption="AD DS — Pfade (NTDS, SYSVOL)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_5.4.png`} figNum="Abb. 8" caption="AD DS — Voraussetzungsüberprüfung bestanden." onZoom={zoom} />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mt-4 mb-2">
                            Nach dem Neustart war der Server als Domain Controller für die Domäne <strong>gfn_lab.local</strong> aktiv:
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_7.png`} figNum="Abb. 9" caption="Server Manager — AD DS (Server Online, 192.168.10.10)." onZoom={zoom} />

                        <PhaseLabel label="Phase 3 — Client-Konfiguration" />
                        <Step num={1} title="Statische IP-Adressen zuweisen" desc={<>Jeder Client erhielt eine statische IP-Adresse im Subnetz 192.168.10.0/24: Home (<strong>.11</strong>), Pro (<strong>.12</strong>), Enterprise (<strong>.13</strong>).</>} />
                        <Step num={2} title="DNS-Server konfigurieren" desc={<>Als <strong>„Bevorzugter DNS-Server"</strong> wurde auf allen Clients die IP-Adresse des Domain Controllers (<strong>192.168.10.10</strong>) eingetragen. Dies ist die wichtigste Voraussetzung für den Domain Join.</>} />
                        <Step num={3} title="Konnektivitätstest (Ping)" desc={<>Über den Befehl <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">ping 192.168.10.10</code> wurde die Netzwerkverbindung zum Domain Controller überprüft — alle Clients erreichten den Server mit <strong>0% Verlust</strong>.</>} />
                        <ProofFigure src={`${BASE}/projekt5_14.png`} figNum="Abb. 10" caption="W11Home — IPv4-Konfiguration (192.168.10.11, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_13.png`} figNum="Abb. 11" caption="W11Pro — IPv4-Konfiguration (192.168.10.12, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_10.png`} figNum="Abb. 12" caption="W11Enterprise — IPv4-Konfiguration (192.168.10.13, DNS: 192.168.10.10)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_8.png`} figNum="Abb. 13" caption="Ping-Test — W11Home → DC (0% Verlust, Erreichbarkeit bestätigt)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_9.png`} figNum="Abb. 14" caption="Ping-Test — W11Pro → DC (0% Verlust, Erreichbarkeit bestätigt)." onZoom={zoom} />

                        <PhaseLabel label="Phase 4 — Domain Join" />
                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-6 mb-3">Windows 11 Pro — Erfolgreich ✓</p>
                        <Step num={1} title="Systemeigenschaften öffnen (sysdm.cpl)" desc={<>Über <code className="text-xs bg-[#EEF1F5] px-1.5 py-0.5 rounded border border-[#E1E5EB] text-[#005A9E]">Win+R → sysdm.cpl</code> wurden die Systemeigenschaften geöffnet.</>} />
                        <Step num={2} title="Domäne beitreten" desc={<>Über den Button <strong>„Ändern"</strong> wurde das Feld „Mitglied von" auf <strong>„Domäne"</strong> gesetzt und <strong>gfn_lab.local</strong> eingetragen.</>} />
                        <Step num={3} title="Authentifizierung & Ergebnis" desc={<>Die Domain-Administrator-Anmeldedaten wurden verifiziert. Die Meldung <strong>„Willkommen in der Domäne gfn_lab.local"</strong> bestätigte den erfolgreichen Beitritt. Computername: <strong>W1P</strong> (FQDN: W1P.gfn_lab.local).</>} />
                        <ProofFigure src={`${BASE}/projekt5_6.1.png`} figNum="Abb. 15" caption="Domain Join — sysdm.cpl (Systemeigenschaften öffnen)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_6.2.png`} figNum="Abb. 16" caption="W11Pro — Systemeigenschaften nach Domain Join (W1P.gfn_lab.local)." onZoom={zoom} />
                        <ProofFigure src={`${BASE}/projekt5_6.3.png`} figNum="Abb. 17" caption='W11Pro — "Willkommen in der Domäne gfn_lab.local".' onZoom={zoom} />

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-10 mb-3">Windows 11 Home — Fehlschlag ✗</p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Windows 11 Home Edition unterstützt <strong>architekturbedingt keinen Active Directory Domain Join</strong>. Im Dialog „Ändern des Computernamens bzw. der Domäne" ist die Option „Domäne" ausgegraut und nicht anklickbar. Nur die Arbeitsgruppe (Workgroup) kann konfiguriert werden.
                        </p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Dies ist eine bewusste Einschränkung von Microsoft: Die Home-Edition ist für den Privatgebrauch konzipiert und enthält keine Unternehmensfunktionen wie Domänen-Mitgliedschaft, Gruppenrichtlinien oder BitLocker-Management.
                        </p>

                        <p className="text-[15px] font-semibold text-[#1A1A1A] mt-10 mb-3">Windows 11 Enterprise — Erfolgreich ✓</p>
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Der Domain Join verlief identisch zum Pro-Client. Nach der IP- und DNS-Konfiguration wurde über sysdm.cpl die Domäne gfn_lab.local eingetragen und die Administrator-Anmeldedaten verifiziert. Die Meldung <strong>„Willkommen in der Domäne gfn_lab.local"</strong> bestätigte den erfolgreichen Beitritt. Computername: <strong>DESKTOP-9TILDN0</strong>.
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_11.png`} figNum="Abb. 18" caption='W11Enterprise — "Willkommen in der Domäne gfn_lab.local" (DESKTOP-9TILDN0).' onZoom={zoom} />

                        <PhaseLabel label="Phase 5 — Zentrale Verifizierung" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-4">
                            Nach den erfolgreichen Domain Joins wurde auf dem Domain Controller die Konsole <strong>„Active Directory-Benutzer und -Computer"</strong> geöffnet. Im Container <strong>„Computers"</strong> waren beide erfolgreich aufgenommenen Clients sichtbar: <strong>W11_PRO</strong> und <strong>WIN11_ENTERPRIS</strong>. Der Windows 11 Home Client fehlt erwartungsgemäß, da die Home-Edition keinen Domain Join unterstützt.
                        </p>
                        <ProofFigure src={`${BASE}/projekt5_12.png`} figNum="Abb. 19" caption="Active Directory — Registrierte Computer (W11_PRO + WIN11_ENTERPRIS im Computers-Container)." onZoom={zoom} />
                    </section>

                    {/* ── 5. PROBLEME & LÖSUNG ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={5} title="Probleme & Lösung" tagline="Herausforderungen im Prozess und wie sie gelöst wurden" />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: Windows 11 Home — Kein Domain Join möglich" body={<>Die Windows 11 Home Edition bietet <strong>keine Möglichkeit</strong>, einer Active Directory-Domäne beizutreten. Die Option „Domäne" im Systemeigenschaften-Dialog ist deaktiviert (ausgegraut). Microsoft beschränkt die Domänen-Funktionalität bewusst auf die Editionen <strong>Pro, Enterprise und Education</strong>.</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: Mindestens Windows Pro einsetzen" body={<>In Unternehmensumgebungen muss mindestens <strong>Windows Pro</strong> eingesetzt werden. Ein Upgrade von Home auf Pro ist über den Microsoft Store oder per Volume-Lizenz möglich.<br /><br /><span style={{ color: C }} className="font-semibold">Praxishinweis:</span> Für Lern- und Testumgebungen eignen sich die kostenlosen <strong>Evaluation-ISOs</strong> von Microsoft ideal, da sie alle Enterprise-Funktionen ohne Einschränkungen bieten.</>} />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: Unterstrich im Domänennamen (gfn_lab.local)" body={<>Die Voraussetzungsüberprüfung zeigte eine Warnung: Der Domänenname „gfn_lab.local" enthält einen <strong>Unterstrich (_)</strong>. Microsoft DNS-Server erlauben zwar Unterstriche, andere DNS-Serverprodukte jedoch möglicherweise nicht.</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: RFC-konformen Domänennamen verwenden" body={<>Da die Umgebung ausschließlich Microsoft-Komponenten verwendet, blockiert diese Warnung die Installation nicht. In einer produktiven Umgebung sollte jedoch ein <strong>RFC-konformer Domänenname</strong> ohne Sonderzeichen verwendet werden (z. B. gfnlab.local oder gfn-lab.local).</>} />
                        <IssueCard type="problem" icon={AlertCircle} title="Problem: DNS als häufigste Fehlerquelle beim Domain Join" body={<>Ohne korrekte DNS-Konfiguration auf dem Client kann der Domain Controller nicht gefunden werden. Der Domain Join schlägt dann mit der Meldung <strong>„Die Domäne konnte nicht kontaktiert werden"</strong> fehl. Der DNS-Dienst übernimmt im Active Directory zwei zentrale Aufgaben: <strong>Namensauflösung</strong> (FQDN → IP) und <strong>Dienstidentifizierung</strong> (SRV-Records für _ldap._tcp).</>} />
                        <IssueCard type="solution" icon={CheckCircle2} title="Lösung: DNS-Server auf Domain Controller zeigen lassen" body={<>Auf jedem Client muss in der IPv4-Konfiguration als „Bevorzugter DNS-Server" die IP-Adresse des Domain Controllers (<strong>192.168.10.10</strong>) eingetragen sein. Der Client darf <strong>NICHT</strong> auf einen externen DNS-Server (z. B. 8.8.8.8) verweisen, da dieser die internen SRV-Records der Domäne nicht kennt.</>} />
                        <NoteBlock title="Kryptografie-Warnung (Windows Server 2019)" text="Die Voraussetzungsüberprüfung zeigte zusätzlich eine Warnung zu NT-4.0-kompatiblen Kryptografiealgorithmen. Da in dieser Umgebung ausschließlich moderne Betriebssysteme verwendet werden, ist diese Warnung nicht relevant." />
                        <NoteBlock title="Editionsvergleich — Lizenzdifferenzen" text="Nicht aktivierte Retail-Versionen (Home & Pro) funktionieren grundsätzlich, zeigen jedoch ein Wasserzeichen. Die Enterprise Evaluation-Version aktivierte sich nach der Internetverbindung automatisch für 90 Tage und bot vollen Funktionsumfang." />
                    </section>

                    {/* ── 6. ERGEBNIS ── */}
                    <section className="py-14 border-b border-[#E1E5EB]">
                        <SectionHeader num={6} title="Ergebnis" tagline="Alle Erfolgskriterien auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Die Active Directory-Infrastruktur wurde erfolgreich aufgebaut und die Client-Integration durchgeführt. Alle definierten Erfolgskriterien wurden erfüllt:
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
                                <strong>Active Directory</strong> ist die zentrale Verwaltungskomponente in Windows-Netzwerken. Durch die Kombination von AD DS und DNS wird eine einheitliche Authentifizierung, Autorisierung und zentrale Verwaltung aller Netzwerkressourcen ermöglicht. Für den Domain Join ist mindestens <strong>Windows Pro</strong> erforderlich — die Home-Edition ist ausschließlich für Workgroup-Umgebungen vorgesehen.
                            </p>
                            <p className="text-[15px] text-[#4A5568] leading-relaxed">
                                <strong>Wichtiger Unterschied zu Projekt 01 und 02:</strong> Während Projekt 01 (In-Place Upgrade) und Projekt 02 (USMT Migration) sich auf die Betriebssystem-Migration einzelner Maschinen konzentrierten, behandelt dieses Projekt die <strong>zentrale Netzwerk-Infrastruktur</strong>. Active Directory bildet die Grundlage, auf der Upgrade- und Migrationsprozesse in Unternehmen koordiniert werden.
                            </p>
                        </div>
                    </section>

                    {/* ── 7. SCREENSHOT-VERZEICHNIS ── */}
                    <section className="py-14">
                        <SectionHeader num={7} title="Screenshot-Verzeichnis" tagline="Alle 19 Nachweise auf einen Blick" />
                        <p className="text-[15.5px] text-[#4A5568] leading-relaxed mb-6">
                            Die folgenden Screenshots dokumentieren den gesamten Aufbauprozess und dienen als Nachweis für die erfolgreiche Durchführung:
                        </p>
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
                            <a href="/projekt/windows/netzwerk-infrastruktur" style={{textDecoration:"none",color:"inherit"}}>
                                <p className="text-xs text-[#7A8599] mb-1">Nächstes Projekt</p>
                                <p className="text-sm font-semibold text-[#4A5568] hover:text-[#0078D4]">Projekt 06: Zentrale Domäneninfrastruktur &amp; DHCP</p>
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
                <p className="text-[13px] text-[#7A8599]"><strong>Projekt 05 / 06</strong> — Microsoft Enterprise IT &middot; Modul 2: Identity &amp; Server Administration</p>
                <p className="text-[13px] text-[#7A8599] mt-1.5"><a href="https://gokhanzehirlioglu.de" className="text-[#0078D4] no-underline hover:underline">gokhanzehirlioglu.de</a> &middot; Gokhan Zehirlioglu &middot; Fachinformatiker für Systemintegration</p>
            </footer>
        </Layout>
    );
};

export default ProjektADSetup;
