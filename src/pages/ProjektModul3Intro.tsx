import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Server, Cloud, Lock, Calendar, Monitor, User, Maximize2, Network, Database } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const IMG_BASE = "/images/microsoft/microsoft modül3/";

const parts = [
    {
        num: 1,
        title: "DC-Deployment & AD-Standortarchitektur",
        subtitle: "Drei Windows Server 2022 Domain Controller (Mannheim HQ × 2, Stuttgart) mit Hyper-V aufsetzen, AD Sites & Services für alle Standorte konfigurieren, DHCP-Scopes einrichten und eine unternehmenstaugliche OU-Struktur mit 65 Benutzern aufbauen.",
        path: "/projekt/windows/modul-3/part-1",
        icon: Server,
        tags: ["Active Directory DS", "Domain Controller", "AD Sites & Services", "DHCP", "OU-Struktur", "DNS", "Hyper-V"],
        comingSoon: false,
    },
    {
        num: 2,
        title: "PKI · LAPS · GPO Security Hardening",
        subtitle: "Interne Certificate Authority (AD CS) auf DC01 einrichten, LDAPS auf Port 636 aktivieren und testen, Windows LAPS für eindeutige lokale Admin-Kennwörter ausrollen, und Security-Baselines per GPO für alle Clients und Server durchsetzen.",
        path: "/projekt/windows/modul-3/part-2",
        icon: Shield,
        tags: ["AD CS / PKI", "LDAPS", "Windows LAPS", "GPO Hardening", "Audit Policy", "SMBv1 deaktiviert"],
        comingSoon: false,
    },
    {
        num: 3,
        title: "Entra Tenant & Provisioning Agent",
        subtitle: "Hyper-V Checkpoints auf allen 7 VMs sichern, Microsoft Entra Tenant mit Entra ID P2 Trial vorbereiten, cloud-only Global Admin mit MFA einrichten, DC02 mit zweiter NIC für Internetzugang ausstatten und den Entra Provisioning Agent inkl. gMSA auf DC02 installieren.",
        path: "/projekt/windows/modul-3/part-3",
        icon: Cloud,
        tags: ["Microsoft Entra ID", "Entra ID P2", "Provisioning Agent", "gMSA", "MFA", "Multi-NIC DC"],
        comingSoon: false,
    },
    {
        num: 4,
        title: "Cloud Sync & Validation",
        subtitle: "Cloud-Sync-Konfiguration für rns.local anlegen, Bereichsfilter auf die drei Benutzer-OUs eingrenzen, UPN-Suffixe auf die Entra-Default-Domain migrieren und Provisionierungstests mit/ohne Password Hash Sync durchführen.",
        path: "/projekt/windows/modul-3/part-4",
        icon: Lock,
        tags: ["Cloud Synchronization", "Bereichsfilter", "UPN-Migration", "Password Hash Sync", "Hybrid Identity"],
        comingSoon: false,
    },
    {
        num: 5,
        title: "Coming Soon",
        subtitle: "Dieser Abschnitt befindet sich noch in Planung und wird in Kürze veröffentlicht.",
        path: "/projekt/windows/modul-3/part-5",
        icon: ArrowRight,
        tags: [],
        comingSoon: true,
    },
];

const skills = [
    "Multi-Site Active Directory Architektur",
    "AD Sites & Services Replikation",
    "Public Key Infrastructure (PKI) & LDAPS",
    "Windows LAPS & Credential Management",
    "Security Baselines & GPO Hardening",
    "Microsoft Entra ID Connect Cloud Sync",
    "Hybrid Identity & SSO",
    "Group Managed Service Accounts (gMSA)",
];

// Standort-Daten
const standorte = [
    {
        name: "Mannheim",
        role: "Hauptstandort (HQ)",
        subnet: "10.10.1.0/24",
        gateway: "10.10.1.254",
        users: 25,
        dc: "DC01_MANNHEIM · DC02_MANNHEIM",
        dcIPs: "10.10.1.1 · 10.10.1.2",
        color: C,
    },
    {
        name: "Stuttgart",
        role: "Zweigstelle",
        subnet: "10.10.2.0/24",
        gateway: "10.10.2.254",
        users: 20,
        dc: "DC03_STUTTGART",
        dcIPs: "10.10.1.3",
        color: AZ,
    },
    {
        name: "München",
        role: "Zweigstelle",
        subnet: "10.10.3.0/24",
        gateway: "10.10.3.254",
        users: 20,
        dc: "— (via Replikation)",
        dcIPs: "—",
        color: "#38BDF8",
    },
];

// VMs im Überblick
const vms = [
    { name: "DC01_MANNHEIM", role: "Primary DC · CA · DHCP · DNS", ip: "10.10.1.1", os: "Windows Server 2022" },
    { name: "DC02_MANNHEIM", role: "Secondary DC · Cloud Sync Agent · DHCP · DNS", ip: "10.10.1.2", os: "Windows Server 2022" },
    { name: "DC03_STUTTGART", role: "Standort-DC Stuttgart · DNS", ip: "10.10.1.3", os: "Windows Server 2022" },
    { name: "SERVER01", role: "RRAS · Routing · File Server · 3× vSwitch", ip: "10.10.x.254", os: "Windows Server 2022" },
    { name: "MANNHEIM-CLIENT", role: "Windows 11 Pro · Standort Mannheim", ip: "10.10.1.150", os: "Windows 11 Pro" },
    { name: "STUTTGART-CLIEN", role: "Windows 11 Pro · Standort Stuttgart", ip: "10.10.2.51", os: "Windows 11 Pro" },
    { name: "MUENCHEN-CLIENT", role: "Windows 11 Pro · Standort München", ip: "10.10.3.51", os: "Windows 11 Pro" },
];

// Tech-Keywords
const keywords = [
    "Windows Server 2022", "Active Directory DS", "Domain Controller",
    "Microsoft Entra ID", "Cloud Synchronization", "Hybrid Identity",
    "Hyper-V", "AD Sites & Services", "PKI / AD CS",
    "Windows LAPS", "GPO Security Baseline", "RRAS / File Server",
    "Password Hash Sync", "gMSA", "LDAPS",
];

const ProjektModul3Intro = () => {
    const [zoomed, setZoomed] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomed(null), []);

    return (
        <Layout>
            <Helmet>
                <title>Modul 3: Hybrid Identity & Azure — Gökhan Zehirlioglu</title>
                <meta name="description" content="Enterprise Windows Server 2022 Infrastruktur mit Multi-Site AD DS, PKI, LAPS, Microsoft Entra ID Cloud Sync und Hybrid Identity — Rhein-Neckar Solutions GmbH, 65 Benutzer, 3 Standorte." />
            </Helmet>
            <Lightbox src={zoomed} onClose={closeLightbox} />

            {/* ══════════ HERO ══════════ */}
            <header className="relative overflow-hidden text-white"
                style={{ background: "linear-gradient(135deg, #030D1A 0%, #071628 50%, #0A2040 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-100px] right-[-80px] w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)" }} />
                <div className="absolute bottom-[-60px] left-[-40px] w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,188,242,0.08) 0%, transparent 70%)" }} />

                <div className="relative z-10 max-w-[900px] mx-auto px-6 py-16">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-8 flex-wrap">
                        <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <span style={{ color: AZ }} className="font-medium">Modul 3</span>
                    </nav>

                    <div className="flex flex-wrap items-start gap-2 mb-5">
                        <span className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                            style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>In Progress</span>
                        <span className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                            style={{ background: "#0078D415", color: "#ffffff60", border: "1px solid #ffffff15" }}>5 Parts</span>
                        <span className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                            style={{ background: "#0078D415", color: "#ffffff60", border: "1px solid #ffffff15" }}>3 Standorte</span>
                        <span className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                            style={{ background: "#0078D415", color: "#ffffff60", border: "1px solid #ffffff15" }}>65 Benutzer</span>
                    </div>

                    <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.15] tracking-tight mb-4">
                        Modul 3:<br />
                        <span style={{ color: AZ }}>Hybrid Identity &amp; Azure</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[640px] mb-8">
                        Enterprise Windows Server 2022 Infrastruktur in einem Multi-Site Szenario —
                        von Domain Controllern, PKI und LAPS bis zur Hybrid Identity mit Microsoft Entra ID Cloud Synchronization.
                        Fiktives Unternehmen <strong className="text-white/90">Rhein-Neckar Solutions GmbH</strong> mit
                        65 Benutzern an drei Standorten.
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <Calendar size={14} className="opacity-60" />
                            <strong className="text-white/90 font-medium">April 2026</strong>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <Monitor size={14} className="opacity-60" />
                            <strong className="text-white/90 font-medium">Hyper-V</strong>&nbsp;+ Microsoft Entra ID
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <User size={14} className="opacity-60" />
                            <strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong>
                        </div>
                    </div>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {keywords.map(kw => (
                            <span key={kw} className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                                style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* ══════════ CONTENT ══════════ */}
            <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
                <div className="max-w-[900px] mx-auto px-6 py-12">

                    {/* Übersicht Foto */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Projektübersicht</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="group relative cursor-zoom-in overflow-hidden rounded-xl border"
                            style={{ borderColor: `${C}25` }}
                            onClick={() => setZoomed(`${IMG_BASE}modül 3übersicht.png`)}>
                            <img
                                src={`${IMG_BASE}modül 3übersicht.png`}
                                alt="Modul 3 — Gesamtübersicht der Hybrid Identity Laborumgebung"
                                className="w-full h-auto block"
                                loading="lazy"
                            />
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md rounded-full p-2"
                                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                                <Maximize2 size={14} className="text-white" />
                            </div>
                        </div>
                        <p className="mt-3 text-[12px] text-slate-500 italic">
                            Gesamtübersicht der Laborumgebung — Hyper-V mit 7 virtuellen Maschinen: drei Domain Controller (Windows Server 2022), RRAS/File Server, drei Windows 11 Clients und Microsoft Entra ID Cloud Sync.
                        </p>
                    </section>

                    {/* Szenario */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Unternehmensszenario</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="rounded-xl p-6 border" style={{ background: "#0D1A2D", borderColor: `${C}20` }}>
                            <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
                                Die <strong className="text-white">Rhein-Neckar Solutions GmbH</strong> ist ein mittelständisches Unternehmen
                                mit drei Standorten und <strong className="text-white">65 Benutzern</strong>. Jeder Standort besitzt ein eigenes
                                Subnetz, eigene OU-Struktur und standortbezogene Domain Controller.
                                Ziel des Projekts ist der vollständige Aufbau einer
                                <strong className="text-white"> Hybrid-Identity-Architektur</strong> — von der On-Premises Windows Server 2022
                                Infrastruktur bis zur Cloud-Integration über <strong className="text-white">Microsoft Entra ID Connect Cloud Synchronization</strong>.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: "Standorte", value: "3" },
                                    { label: "Benutzer gesamt", value: "65" },
                                    { label: "Domain Controller", value: "3 × WS2022" },
                                    { label: "VMs gesamt", value: "7" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="text-center p-3 rounded-xl" style={{ background: "#081422", border: "1px solid #0078D420" }}>
                                        <div className="text-xl font-bold mb-1" style={{ color: AZ }}>{value}</div>
                                        <div className="text-[11px] text-slate-500 uppercase tracking-wider">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Standorte & Netzwerk */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Standorte &amp; Netzwerk-Architektur</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            {standorte.map(s => (
                                <div key={s.name} className="rounded-xl border overflow-hidden" style={{ background: "#0D1A2D", borderColor: "#0078D420" }}>
                                    <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: "#0078D415", background: "#081422" }}>
                                        <Network size={15} style={{ color: s.color }} />
                                        <span className="font-bold text-white">{s.name}</span>
                                        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>{s.role}</span>
                                        <span className="ml-auto text-[12px] font-bold" style={{ color: s.color }}>{s.users} Benutzer</span>
                                    </div>
                                    <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-[12.5px]">
                                        <div>
                                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Subnetz</div>
                                            <div className="font-mono text-slate-200">{s.subnet}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Gateway</div>
                                            <div className="font-mono text-slate-200">{s.gateway}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Domain Controller</div>
                                            <div className="font-mono text-slate-200">{s.dc}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">DC-IPs</div>
                                            <div className="font-mono text-slate-200">{s.dcIPs}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Virtuelle Maschinen */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Virtuelle Maschinen (Hyper-V)</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#0078D425" }}>
                            <table className="w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {["VM-Name", "Rolle", "IP", "OS"].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-[11px] uppercase tracking-wider font-semibold"
                                                style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {vms.map(({ name, role, ip, os }, i) => (
                                        <tr key={name} style={{ background: i % 2 === 0 ? "#081422" : "#0A1830" }}>
                                            <td className="px-4 py-3 font-mono text-[12.5px] font-bold" style={{ color: AZ, borderBottom: "1px solid #0078D410" }}>{name}</td>
                                            <td className="px-4 py-3 text-[12.5px] text-slate-300" style={{ borderBottom: "1px solid #0078D410" }}>{role}</td>
                                            <td className="px-4 py-3 font-mono text-[12px] text-slate-400" style={{ borderBottom: "1px solid #0078D410" }}>{ip}</td>
                                            <td className="px-4 py-3 text-[12px] text-slate-500" style={{ borderBottom: "1px solid #0078D410" }}>{os}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-3 text-[12px] text-slate-600 italic">
                            SERVER01 ist mit drei vSwitches verbunden und fungiert als L3-Routing-Instanz (RRAS) zwischen allen Standort-Subnetzen sowie als File Server.
                        </p>
                    </section>

                    {/* Benutzerverteilung */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Benutzerverteilung — 65 Konten gesamt</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { standort: "Mannheim", count: 25, ou: "OU=Benutzer,OU=Mannheim,OU=Standorte,…", color: C },
                                { standort: "Stuttgart", count: 20, ou: "OU=Benutzer,OU=Stuttgart,OU=Standorte,…", color: AZ },
                                { standort: "München",  count: 20, ou: "OU=Benutzer,OU=München,OU=Standorte,…",  color: "#38BDF8" },
                            ].map(({ standort, count, ou, color }) => (
                                <div key={standort} className="rounded-xl p-5 border text-center" style={{ background: "#0D1A2D", borderColor: "#0078D420" }}>
                                    <div className="text-3xl font-bold mb-1" style={{ color }}>{count}</div>
                                    <div className="font-semibold text-white text-sm mb-2">{standort}</div>
                                    <div className="font-mono text-[10px] text-slate-600 break-all leading-relaxed">{ou}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 rounded-xl p-4 border flex items-start gap-3" style={{ background: "#0D1A2D", borderColor: "#0078D415" }}>
                            <Database size={16} style={{ color: AZ }} className="flex-shrink-0 mt-0.5" />
                            <p className="text-[13px] text-slate-400 leading-relaxed">
                                Alle 65 Benutzer wurden mit dem UPN-Suffix <span className="font-mono text-[12px]" style={{ color: AZ }}>@gokhanzehirliogluhotmail.onmicrosoft.com</span> für
                                die Cloud Synchronization vorbereitet und via Microsoft Entra ID Connect Cloud Sync in den Entra-Tenant provisioniert.
                            </p>
                        </div>
                    </section>

                    {/* Parts Grid */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Implementierungs-Etappen</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            {parts.map((part) => {
                                const Icon = part.icon;
                                if (part.comingSoon) {
                                    return (
                                        <div key={part.num} className="rounded-xl border overflow-hidden opacity-45"
                                            style={{ background: "#0D1A2D", borderColor: "#0078D415" }}>
                                            <div className="p-5 flex items-start gap-4">
                                                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0078D410", border: "1px solid #0078D420" }}>
                                                        <Icon size={18} style={{ color: "#0078D450" }} />
                                                    </div>
                                                    <span className="text-[10px] font-mono font-bold" style={{ color: "#0078D450" }}>P{String(part.num).padStart(2, "0")}</span>
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <h3 className="text-base font-bold text-slate-500">Part {part.num}: {part.title}</h3>
                                                        <span className="flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ml-3"
                                                            style={{ background: "#ffffff08", color: "#ffffff35", border: "1px solid #ffffff12" }}>Coming Soon</span>
                                                    </div>
                                                    <p className="text-[13.5px] text-slate-600 leading-relaxed">{part.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Link key={part.num} to={part.path}
                                        className="group rounded-xl border overflow-hidden transition-all duration-300"
                                        style={{ background: "#0D1A2D", borderColor: "#0078D420", textDecoration: "none" }}
                                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${C}60`)}
                                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#0078D420")}>
                                        <div className="p-5 flex items-start gap-4">
                                            <div className="flex-shrink-0 flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C}18`, border: `1px solid ${C}30` }}>
                                                    <Icon size={18} style={{ color: C }} />
                                                </div>
                                                <span className="text-[10px] font-mono font-bold" style={{ color: `${C}80` }}>P{String(part.num).padStart(2, "0")}</span>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <h3 className="text-base font-bold text-white group-hover:text-[#00BCF2] transition-colors">
                                                        Part {part.num}: {part.title}
                                                    </h3>
                                                    <span className="flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ml-3"
                                                        style={{ background: "#0078D418", color: "#00BCF2", border: "1px solid #0078D430" }}>Fertig</span>
                                                </div>
                                                <p className="text-[13.5px] text-slate-400 leading-relaxed mb-3">{part.subtitle}</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {part.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono"
                                                            style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <ArrowRight size={16} className="flex-shrink-0 self-center text-slate-600 group-hover:text-[#0078D4] group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                                            style={{ background: `linear-gradient(90deg, ${C}, ${AZ}, transparent)` }} />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="mb-12">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Abgedeckte Kompetenzen</span>
                            <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {skills.map((skill) => (
                                <div key={skill} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "#0D1A2D", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C }} />
                                    <span className="text-[13px] text-slate-300">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Bottom Nav */}
                    <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "#0078D420" }}>
                        <Link to="/windows-projekte" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors" style={{ textDecoration: "none" }}>
                            ← Zurück zu Microsoft Enterprise IT
                        </Link>
                        <Link to="/projekt/windows/modul-3/part-1" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: C, color: "#fff", textDecoration: "none" }}>
                            Mit Part 1 starten <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul3Intro;
