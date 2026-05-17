import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import Modul3PartRuler from "@/components/Modul3PartRuler";
import { ArrowRight, ArrowUpRight, Maximize2, Calendar, Monitor, User } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const IMG = "/images/microsoft/microsoft modül3/";
const DOC_URL = "/Microsoft/modül 3 dokumantation/Teil1_Foundation_Identity_Architecture.docx";

const techStack = [
    { k: "Domain",          v: "rns.local (On-Premises AD)" },
    { k: "Betriebssystem",  v: "Windows Server 2022 Datacenter Evaluation" },
    { k: "Virtualisierung", v: "Hyper-V (Windows)" },
    { k: "Domain Controller", v: "DC01_MANNHEIM · DC02_MANNHEIM · DC03_STUTTGART" },
    { k: "Clients",         v: "MANNHEIM-CLIENT · STUTTGART-CLIEN · MUENCHEN-CLIENT" },
    { k: "RRAS/Fileserver", v: "SERVER01 — drei vSwitches, Gateway aller Subnetze" },
    { k: "Subnetz Mannheim",v: "10.10.1.0/24  — Gateway 10.10.1.254" },
    { k: "Subnetz Stuttgart",v: "10.10.2.0/24 — Gateway 10.10.2.254" },
    { k: "Subnetz München", v: "10.10.3.0/24  — Gateway 10.10.3.254" },
];

type FigProps = { src: string; alt: string; caption: string; onClick: () => void };
const Fig = ({ src, alt, caption, onClick }: FigProps) => (
    <figure className="mb-1">
        <div
            className="group relative cursor-zoom-in overflow-hidden rounded-xl border"
            style={{ borderColor: `${C}25`, background: "#0A1628" }}
            onClick={onClick}
        >
            <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md rounded-full p-2" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Maximize2 size={14} className="text-white" />
            </div>
        </div>
        <figcaption className="mt-2 text-[11.5px] text-slate-500 italic leading-snug">{caption}</figcaption>
    </figure>
);

const SectionTitle = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 mb-5 mt-10">
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>{label}</span>
        <div className="flex-1 h-px" style={{ background: `${C}20` }} />
    </div>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl p-5 mb-6 border" style={{ background: "#0D1A2D", borderColor: `${C}20` }}>
        {children}
    </div>
);

const WarnBox = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl p-5 mb-6 border-l-4 flex gap-3" style={{ background: "#1A1200", borderColor: "#F59E0B", borderLeftColor: "#F59E0B" }}>
        <span className="text-lg mt-0.5">⚠</span>
        <div className="text-[13px] text-amber-200/80 leading-relaxed">{children}</div>
    </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-[12px] px-1.5 py-0.5 rounded" style={{ background: "#0078D415", color: AZ }}>{children}</code>
);

const ProjektModul3Part1 = () => {
    const [zoomed, setZoomed] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomed(null), []);
    const zoom = (file: string) => () => setZoomed(`${IMG}${file}`);

    return (
        <Layout>
            <Helmet>
                <title>Modul 3 — Part 1: DC-Deployment & AD-Standortarchitektur — Gökhan Zehirlioglu</title>
                <meta name="description" content="Drei Windows Server 2022 Domain Controller mit Hyper-V aufsetzen, AD Sites & Services konfigurieren, DHCP und OU-Struktur für Rhein-Neckar Solutions GmbH aufbauen." />
            </Helmet>
            <Lightbox src={zoomed} onClose={closeLightbox} />

            {/* ══════════ HERO ══════════ */}
            <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #030D1A 0%, #071628 50%, #0A2040 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)" }} />
                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
                        <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <a href="/projekt/windows/modul-3" className="hover:text-white transition-colors">Modul 3: Hybrid Identity & Azure</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <span style={{ color: AZ }} className="font-medium">Part 1</span>
                    </nav>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>Fertig</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 3 / Part 1</span>
                    </div>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        DC-Deployment &amp;<br /><span style={{ color: AZ }}>AD-Standortarchitektur</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[580px] mb-6">
                        Drei Windows Server 2022 Domain Controller mit Hyper-V aufsetzen, AD Sites & Services für Mannheim, Stuttgart und München konfigurieren, DHCP einrichten und eine unternehmenstaugliche OU-Struktur mit 65 Benutzern aufbauen.
                    </p>
                    <div className="flex flex-wrap gap-5 mb-4">
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Nisan 2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Hyper-V</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {["Windows Server 2022", "Active Directory DS", "Domain Controller", "AD Sites & Services", "DNS", "DHCP", "OU-Struktur", "Hyper-V", "RRAS / File Server"].map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-mono" style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>{t}</span>
                        ))}
                    </div>
                    <Modul3PartRuler currentPart={1} />
                </div>
            </header>

            {/* ══════════ CONTENT ══════════ */}
            <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
                <div className="max-w-[820px] mx-auto px-6 py-12">

                    {/* Download */}
                    <div className="mb-10">
                        <a
                            href={DOC_URL}
                            download
                            className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: "#0D1A2D", border: `1px solid ${C}30`, color: AZ, textDecoration: "none" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.background = `${C}15`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = `${C}30`; e.currentTarget.style.background = "#0D1A2D"; }}
                        >
                            <ArrowUpRight size={16} />
                            Originaldokumentation herunterladen · DOCX
                        </a>
                    </div>

                    {/* Systemkonfiguration */}
                    <SectionTitle label="Systemkonfiguration" />
                    <table className="w-full border-separate border-spacing-0 border rounded-xl overflow-hidden mb-10" style={{ borderColor: "#0078D425" }}>
                        <thead>
                            <tr>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Eigenschaft</th>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Wert</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techStack.map(({ k, v }, i) => (
                                <tr key={k} style={{ background: i % 2 === 0 ? "#081422" : "#0A1830" }}>
                                    <td className="px-5 py-2.5 text-[13px] font-semibold" style={{ color: AZ, borderBottom: "1px solid #0078D415" }}>{k}</td>
                                    <td className="px-5 py-2.5 text-sm text-slate-300 font-mono" style={{ borderBottom: "1px solid #0078D415" }}>{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 1.1 Laborumgebung */}
                    <SectionTitle label="1.1 — Laborumgebung & Hyper-V" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Die gesamte Laborumgebung läuft auf <strong className="text-white">Hyper-V</strong>. Das Unternehmen wurde von Anfang an als mehrstandörtige Architektur mit den Standorten Mannheim, Stuttgart und München konzipiert.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Mannheim ist der zentrale Hauptstandort mit DC01, DC02 und der Certification Authority. Stuttgart wird durch DC03 repräsentiert. München ist als dritter Standort mit eigenem Subnetz und OU-Logik abgebildet.
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}Hyper-V allgemein übersicht.png`}
                        alt="Hyper-V Manager — vollständige Laborlandschaft"
                        caption="Hyper-V Manager mit der vollständigen Laborlandschaft: DC01_MANNHEIM, DC02_MANNHEIM, DC03_STUTTGART, SERVER01, drei Standort-Clients und ADMIN_Mannheim."
                        onClick={zoom("Hyper-V allgemein übersicht.png")}
                    />

                    {/* 1.2 Domain Design */}
                    <SectionTitle label="1.2 — Domain-Design" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Als On-Premises-AD-Domain wurde <Code>rns.local</Code> festgelegt — ein privater Namensraum, der ausschließlich intern verwendet wird. Für die Cloud-Seite war zunächst <Code>rns-cloud.de</Code> als Custom Domain geplant, jedoch setzt Microsoft Entra ID eine verifizierte Domain voraus.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Da <Code>rns-cloud.de</Code> keine real erworbene Domain ist, wurde mit der Entra-Standard-Domain weitergearbeitet: <Code>gokhanzehirliogluhotmail.onmicrosoft.com</Code>. Die UPN-Suffixe aller Benutzer wurden per PowerShell entsprechend aktualisiert.
                        </p>
                    </InfoBox>

                    {/* 1.3 DC-Hierarchie */}
                    <SectionTitle label="1.3 — Domain Controller Hierarchie" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
                            Im Rahmen des Projekts wurden drei Domain Controller eingerichtet. Die Namensgebung ermöglicht eine direkte Standortzuordnung:
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: "DC01_MANNHEIM", ip: "10.10.1.1", role: "Zentraler Verwaltungsknoten, CA, DHCP, DNS, AD DS" },
                                { name: "DC02_MANNHEIM", ip: "10.10.1.2", role: "Zweiter DC, Host des Cloud-Sync-Agents, DHCP, DNS, AD DS" },
                                { name: "DC03_STUTTGART", ip: "10.10.1.3", role: "Standort-DC Stuttgart, AD DS, DNS, Replikationsendpunkt" },
                            ].map(dc => (
                                <div key={dc.name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: AZ }} />
                                    <div>
                                        <span className="font-mono text-[13px] font-bold" style={{ color: AZ }}>{dc.name}</span>
                                        <span className="text-[12px] text-slate-500 ml-2">({dc.ip})</span>
                                        <p className="text-[12.5px] text-slate-400 mt-0.5">{dc.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Fig
                            src={`${IMG}DomainControllers.png`}
                            alt="Active Directory — Domain Controllers Container"
                            caption="AD-Benutzer und -Computer: Container 'Domain Controllers' mit DC01_MANNHEIM, DC02_MANNHEIM und DC03_STUTTGART. Alle drei sind Global Catalog (GC)."
                            onClick={zoom("DomainControllers.png")}
                        />
                        <Fig
                            src={`${IMG}DC01 allgemein übersicht.png`}
                            alt="Server Manager DC01_MANNHEIM"
                            caption="Server Manager DC01_MANNHEIM — IP 10.10.1.1. Installierte Rollen: AD DS, AD-Zertifikatdienste, DHCP und DNS."
                            onClick={zoom("DC01 allgemein übersicht.png")}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Fig
                            src={`${IMG}DC02 allgemein übersicht.png`}
                            alt="Server Manager DC02_MANNHEIM"
                            caption="Server Manager DC02_MANNHEIM — Interne NIC 10.10.1.2 plus zweite NIC für Internetzugang. Rollen: AD DS, DHCP und DNS. Cloud Sync Agent wird hier installiert."
                            onClick={zoom("DC02 allgemein übersicht.png")}
                        />
                        <Fig
                            src={`${IMG}DC03 allgemein übersciht.png`}
                            alt="Server Manager DC03_STUTTGART"
                            caption="Server Manager DC03_STUTTGART — Interne IP 10.10.1.3. Rollen: AD DS und DNS. Lokaler Authentifizierungs- und Replikationsendpunkt der Stuttgart-Site."
                            onClick={zoom("DC03 allgemein übersciht.png")}
                        />
                    </div>

                    {/* 1.4 AD Sites & Subnets */}
                    <SectionTitle label="1.4 — AD Sites & Subnets Design" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Jeder Standort wird durch ein eigenes Subnetz repräsentiert. Clients werden anhand ihrer IP-Adresse der korrekten Site zugeordnet, sodass sie immer mit dem nächstgelegenen Domain Controller kommunizieren.
                        </p>
                        <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid #0078D420" }}>
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {["Standort", "Subnetz", "Gateway"].map(h => (
                                            <th key={h} className="px-4 py-2 text-left text-[11px] uppercase tracking-wider" style={{ background: "#0A1628", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Mannheim", "10.10.1.0/24", "10.10.1.254"],
                                        ["Stuttgart", "10.10.2.0/24", "10.10.2.254"],
                                        ["München",  "10.10.3.0/24", "10.10.3.254"],
                                    ].map(([s, n, g]) => (
                                        <tr key={s} style={{ background: "#081422" }}>
                                            <td className="px-4 py-2 text-[13px] font-semibold" style={{ color: AZ, borderBottom: "1px solid #0078D415" }}>{s}</td>
                                            <td className="px-4 py-2 text-sm text-slate-300 font-mono" style={{ borderBottom: "1px solid #0078D415" }}>{n}</td>
                                            <td className="px-4 py-2 text-sm text-slate-300 font-mono" style={{ borderBottom: "1px solid #0078D415" }}>{g}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[13px] text-slate-400 mt-3 leading-relaxed">
                            Zwischen den Sites wurden zusätzlich Site Links definiert: Mannheim–Stuttgart (Cost 100), Stuttgart–München (Cost 100), Mannheim–München (Cost 200). Replikationsintervall: 30 Minuten.
                        </p>
                    </InfoBox>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Fig
                            src={`${IMG}Active Direcotory Standorte und Dienste Subnets.png`}
                            alt="AD Sites & Services — Subnetz-Zuordnung"
                            caption="Active Directory-Standorte und -Dienste: Subnetz-Zuordnung. Die Subnetze 10.10.1.0/24, 10.10.2.0/24 und 10.10.3.0/24 sind den Standorten Mannheim, Stuttgart und München zugewiesen."
                            onClick={zoom("Active Direcotory Standorte und Dienste Subnets.png")}
                        />
                        <Fig
                            src={`${IMG}Active Directory Standorte und Diesnte IP.png`}
                            alt="AD Sites — Site Links und IP-Konfiguration"
                            caption="Site Links und Serverplatzierung: In Mannheim DC01 und DC02, in Stuttgart DC03. Drei Site Links mit Cost-Werten und Replikationsintervall 30 Minuten."
                            onClick={zoom("Active Directory Standorte und Diesnte IP.png")}
                        />
                    </div>

                    {/* 1.5 DHCP */}
                    <SectionTitle label="1.5 — DHCP & Routing" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Die DHCP-Dienste wurden auf DC01 und DC02 konfiguriert. Zwischen DC01 und DC02 wurde ein DHCP-Failover für den Mannheim-Scope eingerichtet. SERVER01 trägt die RRAS-Rolle und verbindet alle drei Standort-Subnetze über separate vSwitches.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            SERVER01 ist an drei vSwitches angeschlossen und fungiert als L3-Routing-Instanz zwischen den Subnetzen.
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}Dc01 DHCP Bereichsoptionen.png`}
                        alt="DHCP Bereichsoptionen DC01 Mannheim"
                        caption="Bereichsoptionen des Scopes [10.10.1.0] DHCP-MA-Clients auf DC01: Router (003) → 10.10.1.254, DNS-Server (006) → 10.10.1.1 und 10.10.1.2, DNS-Domänenname (015) → rns.local."
                        onClick={zoom("Dc01 DHCP Bereichsoptionen.png")}
                    />

                    {/* 1.6 OU-Struktur */}
                    <SectionTitle label="1.6 — OU-Struktur & Active Directory Design" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Innerhalb von Active Directory wurde eine saubere, unternehmenstaugliche OU-Struktur aufgebaut. Haupt-OU:
                        </p>
                        <Code>OU=Rhein-Neckar-Solution-gmbH,DC=rns,DC=local</Code>
                        <p className="text-[14px] text-slate-300 leading-relaxed mt-3">
                            Darunter werden Standorte (<Code>OU=Standorte</Code>), Abteilungen, Benutzer, Computer, Server, Service-Konten und Admin-Konten strukturiert getrennt. Diese Trennung stellt sicher, dass GPOs gezielt auf bestimmte Objekttypen angewendet werden können.
                        </p>
                    </InfoBox>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <Fig
                            src={`${IMG}Rhein-Neckar-Solition-gmbH Standorte.png`}
                            alt="OU-Struktur — Standorte"
                            caption="OU-Struktur: Standorte-Hierarchie mit Mannheim, Stuttgart und München."
                            onClick={zoom("Rhein-Neckar-Solition-gmbH Standorte.png")}
                        />
                        <Fig
                            src={`${IMG}Rhein-Neckar-Solition-gmbH Abteilungen.png`}
                            alt="OU-Struktur — Abteilungen"
                            caption="OU-Struktur: Abteilungen unter den Standorten."
                            onClick={zoom("Rhein-Neckar-Solition-gmbH Abteilungen.png")}
                        />
                        <Fig
                            src={`${IMG}Rhein-Neckar-Solition-gmbH Gruppen.png`}
                            alt="OU-Struktur — Gruppen"
                            caption="OU-Struktur: Sicherheitsgruppen der Rhein-Neckar Solutions GmbH."
                            onClick={zoom("Rhein-Neckar-Solition-gmbH Gruppen.png")}
                        />
                    </div>

                    {/* Benutzer & Clients */}
                    <SectionTitle label="Benutzer & Clients je Standort" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <Fig
                            src={`${IMG}Mannheim Benutzer.png`}
                            alt="Mannheim Benutzer"
                            caption="Benutzer-OU Mannheim mit angelegten AD-Konten."
                            onClick={zoom("Mannheim Benutzer.png")}
                        />
                        <Fig
                            src={`${IMG}Stuttgart Benutzer.png`}
                            alt="Stuttgart Benutzer"
                            caption="Benutzer-OU Stuttgart mit angelegten AD-Konten."
                            onClick={zoom("Stuttgart Benutzer.png")}
                        />
                        <Fig
                            src={`${IMG}München Benutzer.png`}
                            alt="München Benutzer"
                            caption="Benutzer-OU München mit angelegten AD-Konten."
                            onClick={zoom("München Benutzer.png")}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <Fig
                            src={`${IMG}Mannheim Client.png`}
                            alt="Mannheim Client"
                            caption="MANNHEIM-CLIENT — Windows 11 Pro, Standort Mannheim."
                            onClick={zoom("Mannheim Client.png")}
                        />
                        <Fig
                            src={`${IMG}Stuttgart Client.png`}
                            alt="Stuttgart Client"
                            caption="STUTTGART-CLIEN — Windows 11 Pro, Standort Stuttgart."
                            onClick={zoom("Stuttgart Client.png")}
                        />
                        <Fig
                            src={`${IMG}München Client.png`}
                            alt="München Client"
                            caption="MUENCHEN-CLIENT — Windows 11 Pro, Standort München."
                            onClick={zoom("München Client.png")}
                        />
                    </div>

                    {/* DNS */}
                    <SectionTitle label="DNS-Infrastruktur" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Die DNS-Infrastruktur wird von allen drei Domain Controllern verwaltet. Die DomainDnsZones-Partition repliziert die Hostadressen aller DCs. Saubere DNS-Auflösung ist Grundvoraussetzung für LDAPS, GPO-Verarbeitung und LAPS (behandelt in Part 2).
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}DNS Manger DomainDnsZone.png`}
                        alt="DNS Manager — DomainDnsZones"
                        caption="DNS-Manager von DC01_MANNHEIM — Container 'DomainDnsZones'. Die drei replizierten Host-(A)-Datensätze 10.10.1.1, 10.10.1.2 und 10.10.1.3 entsprechen DC01, DC02 und DC03."
                        onClick={zoom("DNS Manger DomainDnsZone.png")}
                    />

                    <WarnBox>
                        <strong>Multi-NIC auf Domain Controllern:</strong> Sobald auf einem DC mehr als eine NIC vorhanden ist, muss die DNS-Registrierung auf allen Adaptern außer der internen NIC deaktiviert werden. Andernfalls löst der Hostname des DCs auch auf externe IPs auf. Dieses Thema wird in Part 3 im Kontext von DC02 ausführlich behandelt.
                    </WarnBox>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t mt-8" style={{ borderColor: "#0078D420" }}>
                        <a href="/projekt/windows/modul-3" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Modul 3 Übersicht</a>
                        <a href="/projekt/windows/modul-3/part-2" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all" style={{ background: `${C}20`, color: AZ, border: `1px solid ${C}30`, textDecoration: "none" }}>
                            Part 2: Security & Hardening <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul3Part1;
