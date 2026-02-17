import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Monitor, Shield, Cpu, Network, Download, FileText,
    Copy, Check, X, Maximize2, Terminal, Server, Laptop, Router
} from "lucide-react";

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Terminal-Style Code Block Component
const TerminalCodeBlock = ({
    title,
    code,
    prompt = "R1#",
    variant = "green"
}: {
    title: string;
    code: string;
    prompt?: string;
    variant?: "green" | "blue" | "orange" | "cyan";
}) => {
    const [copied, setCopied] = useState(false);


    const colorMap = {
        green: "text-blue-400", // User requested blue for Grundkonfiguration
        blue: "text-blue-400",
        orange: "text-orange-400",
        cyan: "text-sky-300"    // Brighter blue for show ip route
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split('\n');

    return (
        // REMOVED ANIMATION CLASS
        <div className="opacity-100 translate-y-0 text-left">
            {/* Terminal Window */}
            <div className="rounded-lg overflow-hidden shadow-2xl border border-slate-700">
                {/* Terminal Header */}
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-2">
                        {/* Window Controls */}
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors"></div>
                        </div>
                        {/* Terminal Title */}
                        <div className="flex items-center gap-2 ml-4">
                            <Terminal size={14} className="text-slate-400" />
                            <span className="text-xs text-slate-400 font-mono">{title}</span>
                        </div>
                    </div>
                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                    >
                        {copied ? (
                            <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-400">Kopiert!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={12} />
                                <span>Kopieren</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Terminal Body */}
                <div className="bg-[#0d1117] p-4 font-mono text-sm overflow-x-auto text-left">
                    {lines.map((line, index) => (
                        <div key={index} className="flex hover:bg-slate-800/50 -mx-4 px-4 py-0.5 transition-colors text-left justify-start">
                            {/* Line Number */}
                            <span className="w-8 text-slate-600 select-none text-right pr-4 flex-shrink-0">
                                {index + 1}
                            </span>
                            {/* Code Content - Fixed Visibility */}
                            <span className={`block text-left ${colorMap[variant]}`}>
                                {line.startsWith(' ') ? (
                                    <span className="text-slate-400">{line}</span> // Brighter Color
                                ) : (
                                    <>
                                        <span className="text-purple-400">{prompt}</span>
                                        <span className="text-slate-300"> </span>
                                        {line}
                                    </>
                                )}
                            </span>
                        </div>
                    ))}
                    {/* Blinking Cursor */}
                    <div className="flex -mx-4 px-4 py-0.5 text-left justify-start">
                        <span className="w-8 text-slate-600 select-none text-right pr-4 flex-shrink-0"></span>
                        <span className="text-purple-400">{prompt}</span>
                        <span className="animate-pulse text-white ml-1">▋</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Progress Bar Component
const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(100), 500);
        return () => clearTimeout(timer);
    }, []);

    const steps = [
        { label: "Part 1: Topologie", complete: true },
        { label: "Part 2: Konfiguration", complete: true },
        { label: "Part 3: Verifizierung", complete: true }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Fortschritt</span>
                <span className="text-sm font-bold text-emerald-600">{progress}%</span>
            </div>

            {/* Progress Track */}
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-gradient-to-r from-[#0288d1] to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Steps */}
            <div className="flex justify-between">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${step.complete
                            ? 'bg-emerald-500 text-white scale-100'
                            : 'bg-slate-200 text-slate-400 scale-90'
                            }`}>
                            {step.complete ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs hidden sm:inline ${step.complete ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Interactive Topology Component
const InteractiveTopology = ({ imageSrc }: { imageSrc: string }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

    // FIX: Hotspots moved to the RIGHT of the devices as requested
    const devices = [
        // Switch - Rack üst kısım
        {
            id: 'switch',
            name: 'S1 - Cisco 2960',
            x: 49,  // ← sola kaydır
            y: 19,  // ← yukarı
            icon: Network,
            info: 'VLAN 1: unassigned\nF0/5 → R1\nF0/6 → PC-A'
        },
        // Router - Rack orta kısım
        {
            id: 'router',
            name: 'R1 - Cisco 4321',
            x: 49,
            y: 25,
            icon: Router,
            info: 'G0/0/0: 192.168.0.1\nG0/0/1: 192.168.1.1\nLoopback0: 10.0.0.1'
        },
        // Server - Rack alt kısım
        {
            id: 'server',
            name: 'Server',
            x: 49,
            y: 35,
            icon: Server,
            info: 'IPv4: 192.168.0.10/24\nGateway: 192.168.0.1'
        },
        // PC - Masa üstü
        {
            id: 'pc',
            name: 'PC-A',
            x: 57,
            y: 66,
            icon: Laptop,
            info: 'IPv4: 192.168.1.10/24\nGateway: 192.168.1.1'
        },
    ];

    return (
        <div className="space-y-2">

            <div
                className={`relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group transition-all duration-700 opacity-100 translate-y-0`}
                onClick={() => setIsLightboxOpen(true)}
            >
                {/* Image */}
                <div className="relative overflow-hidden minim-h-[300px] bg-slate-200 flex items-center justify-center cursor-pointer">

                    {/* Main Image */}
                    <img
                        src={imageSrc}
                        alt="Packet Tracer Topology Lab 1.6.2"
                        className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />

                    {/* Error Placeholder */}
                    <div className="hidden absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
                        <Network size={48} className="mb-2 opacity-50" />
                        <p className="font-semibold">Bild nicht gefunden</p>
                        <p className="text-xs">Bitte lab-1.6.2.png in public/images/cisco/ ablegen</p>
                    </div>

                    {/* Zoom indicator */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 pointer-events-none">
                        <Maximize2 size={14} />
                        <span className="text-xs font-medium">Klicken zum Vergrößern</span>
                    </div>

                    {/* Device Hotspots */}
                    {devices.map((device) => (
                        <div
                            key={device.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{ left: `${device.x}%`, top: `${device.y}%` }}
                            onMouseEnter={() => setHoveredDevice(device.id)}
                            onMouseLeave={() => setHoveredDevice(null)}
                            // Stop propagation to prevent hitting lightbox when clicking info
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Pulse Ring */}
                            <div className="absolute inset-0 w-8 h-8 -m-1 rounded-full bg-[#0288d1]/30 animate-ping" />

                            {/* Device Icon */}
                            <div className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredDevice === device.id
                                ? 'bg-[#0288d1] text-white scale-125'
                                : 'bg-white/90 text-[#0288d1] hover:scale-110'
                                } shadow-lg border-2 border-white cursor-pointer`}>
                                <device.icon size={12} />
                            </div>

                            {/* Connecting Line to Device (Visual cue towards LEFT) */}
                            <div className={`absolute top-1/2 right-full w-4 h-0.5 bg-[#0288d1]/50 origin-right scale-x-0 group-hover:scale-x-100 transition-transform`} />

                            {/* Tooltip */}
                            {hoveredDevice === device.id && (
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl z-20 animate-fadeIn">
                                    <div className="font-bold text-[#4fc3f7] mb-1">{device.name}</div>
                                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[10px]">
                                        {device.info}
                                    </pre>
                                    {/* Arrow */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Caption */}
                <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                    <span className="font-medium">Abbildung 1:</span> Packet Tracer - Physische Topologie
                    <span className="text-[#0288d1] ml-1">(interaktiv)</span>
                </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors bg-white/10 rounded-full p-2"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                        <img
                            src={imageSrc}
                            alt="Packet Tracer Topology Full"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scaleIn"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Animated Section Wrapper (Disabled Animations)
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {

    return (
        <div
            // REMOVED REF
            className={`opacity-100 translate-y-0 ${className}`} // Fixed classes
        >
            {children}
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

const ProjektCiscoLab162 = () => {
    return (
        <Layout>
            <Helmet>
                <title>Lab 1.6.2: Grundlegende Router-Einstellungen | Gökhan Zehirlioglu</title>
                <meta name="description" content="Cisco Packet Tracer Lab: Router-Initialisierung, IPv4/IPv6 Adressierung, SSH-Konfiguration und Netzwerksicherheit." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 relative">

                {/* ===== TOP NAVIGATION BAR ===== */}
                <div className="bg-gradient-to-r from-[#01579b] to-[#0277bd] text-white p-3 text-sm font-sans flex justify-between items-center sticky top-0 z-50 shadow-lg">
                    <div className="flex items-center gap-4">
                        <Link to="/cisco-projekte" className="flex items-center gap-2 hover:text-cyan-300 transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Zurück zur Übersicht</span>
                        </Link>
                        <span className="opacity-30">|</span>
                        <div className="flex items-center gap-2">
                            <Terminal size={16} className="text-cyan-300" />
                            <span className="font-semibold tracking-wide">CISCO PACKET TRACER: LAB 1.6.2</span>
                        </div>
                    </div>
                    {/* Status Badge with Pulse */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-emerald-300">100% Complete</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ===== LEFT COLUMN ===== */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Progress Bar */}
                        <AnimatedSection>
                            <ProgressBar />
                        </AnimatedSection>

                        {/* Status Card */}
                        <AnimatedSection>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-[#0277bd] mb-1 font-sans">
                                            Grundlegende Router-Einstellungen
                                        </h1>
                                        <div className="text-slate-500 text-sm mb-4">Lab 1.6.2 - Physical Mode</div>
                                        <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                                            Dieses Projekt dokumentiert ein praktisches <strong>Cisco Packet Tracer Lab</strong> aus meiner CCNA-Ausbildung.
                                            Ziel dieser Übung war die vollständige Inbetriebnahme eines Cisco 4321 Routers – von der physischen Verkabelung über die
                                            Sicherheitskonfiguration bis hin zur Einrichtung von SSH für den Fernzugriff.
                                        </p>
                                    </div>
                                    <div className="p-2 bg-[#0288d1]/10 rounded-lg">
                                        <Router className="text-[#0288d1]" size={24} />
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Datum:</span>
                                        <span className="font-medium text-slate-700">9. Februar 2026</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Plattform:</span>
                                        <span className="font-medium text-slate-700">Physical Mode</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-slate-500">Status:</span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            ABGESCHLOSSEN
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Objectives */}
                        <AnimatedSection>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-[#0288d1]/10 rounded-lg">
                                        <Network className="text-[#0288d1]" size={18} />
                                    </div>
                                    Lernziele
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Topologie aufbauen & Geräte initialisieren",
                                        "Grundlegende Sicherheits- & Netzwerkkonfiguration",
                                        "IPv4- & IPv6-Adressierung",
                                        "Sicherer Fernzugriff über SSH",
                                        "Konnektivität prüfen & Infos anzeigen"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 group">
                                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                                ✓
                                            </span>
                                            <span className="group-hover:text-slate-800 transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>

                        {/* Downloads Section */}
                        <AnimatedSection>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-[#0288d1]/10 rounded-lg">
                                        <Download className="text-[#0288d1]" size={18} />
                                    </div>
                                    Downloads & Ressourcen
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { href: "/downloads/cisco/lab-1.6.2/Lab_1.6.2_Grundlegende_Router_Einstellungen.docx", icon: FileText, iconBg: "bg-blue-100", iconColor: "text-blue-700", hoverColor: "group-hover:text-blue-700", title: "Lab Dokumentation", subtitle: ".docx, Deutsch" },
                                        { href: "/downloads/cisco/lab-1.6.2/1.6.2-lab---configure-basic-router-settings.pdf", icon: FileText, iconBg: "bg-red-100", iconColor: "text-red-700", hoverColor: "group-hover:text-red-700", title: "Lab Anleitung", subtitle: ".pdf, English" },
                                        { href: "/downloads/cisco/lab-1.6.2/1.6.2-packet-tracer----configure-basic-router-settings---physical-mode.pdf", icon: FileText, iconBg: "bg-red-100", iconColor: "text-red-700", hoverColor: "group-hover:text-red-700", title: "Packet Tracer PDF", subtitle: ".pdf, English" },
                                        { href: "/downloads/cisco/lab-1.6.2/1.6.2-packet-tracer----configure-basic-router-settings---physical-mode.pka", icon: Network, iconBg: "bg-emerald-100", iconColor: "text-emerald-700", hoverColor: "group-hover:text-emerald-700", title: "Packet Tracer File", subtitle: ".pka, Lab File" }
                                    ].map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.href}
                                            download
                                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group hover:border-slate-300 hover:shadow-sm"
                                        >
                                            <div className={`p-2 ${item.iconBg} ${item.iconColor} rounded-lg transition-transform group-hover:scale-110`}>
                                                <item.icon size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-sm font-semibold text-slate-700 ${item.hoverColor} transition-colors`}>{item.title}</div>
                                                <div className="text-xs text-slate-500">{item.subtitle}</div>
                                            </div>
                                            <Download size={16} className={`text-slate-400 ${item.hoverColor} transition-colors`} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* SECTION 1: Topologie (Renumbered from 2) */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">1</span>
                                        Netzwerktopologie & Adressierung
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        Die Topologie besteht aus einem <strong className="text-[#0277bd]">Cisco 4321 ISR Router (R1)</strong> und einem <strong className="text-[#0277bd]">Cisco 2960 Switch (S1)</strong>.
                                        Endgeräte sind ein PC und ein Server, um Client-Server-Kommunikation zu simulieren.
                                    </p>

                                    {/* Interactive Topology Image */}
                                    <div className="mb-8">
                                        <InteractiveTopology imageSrc="/images/cisco/lab-1.6.2.png" />
                                    </div>

                                    <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-[#0288d1] rounded-full"></div>
                                        IP-Adressierungstabelle
                                    </h3>
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-sm text-left text-slate-600">
                                            <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold">
                                                <tr>
                                                    <th className="px-4 py-3">Gerät</th>
                                                    <th className="px-4 py-3">Interface</th>
                                                    <th className="px-4 py-3">IPv4-Adresse</th>
                                                    <th className="px-4 py-3">IPv6-Adresse</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    {
                                                        device: 'R1', rowSpan: 3, interfaces: [
                                                            { name: 'G0/0/0', ipv4: '192.168.0.1/24', ipv6: '2001:db8:acad::1/64' },
                                                            { name: 'G0/0/1', ipv4: '192.168.1.1/24', ipv6: '2001:db8:acad:1::1/64' },
                                                            { name: 'Loopback0', ipv4: '10.0.0.1/24', ipv6: '2001:db8:acad:2::1/64' }
                                                        ]
                                                    },
                                                    { device: 'PC-A', interfaces: [{ name: 'NIC', ipv4: '192.168.1.10/24', ipv6: '2001:db8:acad:1::10/64' }] },
                                                    { device: 'Server', interfaces: [{ name: 'NIC', ipv4: '192.168.0.10/24', ipv6: '2001:db8:acad::10/64' }] }
                                                ].map((row, rowIdx) => (
                                                    row.interfaces.map((iface, ifaceIdx) => (
                                                        <tr key={`${rowIdx}-${ifaceIdx}`} className="border-b hover:bg-[#0288d1]/5 transition-colors">
                                                            {ifaceIdx === 0 && (
                                                                <td className="px-4 py-3 font-medium text-[#0277bd]" rowSpan={row.rowSpan || 1}>{row.device}</td>
                                                            )}
                                                            <td className="px-4 py-3">{iface.name}</td>
                                                            <td className="px-4 py-3 font-mono text-xs bg-slate-50">{iface.ipv4}</td>
                                                            <td className="px-4 py-3 font-mono text-xs bg-slate-50">{iface.ipv6}</td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </AnimatedSection>

                        {/* SECTION 2: Konfiguration (Renumbered from 4) */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">2</span>
                                        Router-Konfiguration
                                    </h2>
                                </div>
                                <div className="p-6 space-y-8">

                                    {/* 2.1 Basic Config (Renumbered from 4.1) */}
                                    <div>
                                        {/* Console Connection Info */}
                                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="text-amber-500 mt-1">
                                                    <Monitor size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-amber-800 text-sm mb-1">Physische Verbindung</h4>
                                                    <p className="text-sm text-amber-800/90 leading-relaxed">
                                                        Für die Erstkonfiguration wurde eine direkte Verbindung über das <strong>Console-Kabel</strong> (hellblau) hergestellt:
                                                        <br />
                                                        <span className="font-mono text-xs bg-amber-100 px-2 py-0.5 rounded mt-1 inline-block border border-amber-200">
                                                            PC-A (RS232) → R1 (Console Port)
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Cpu size={18} />
                                            <h3 className="font-semibold">2.1 Grundeinstellungen</h3>
                                        </div>
                                        <TerminalCodeBlock
                                            title="R1 - Console - Grundkonfiguration"
                                            prompt="R1(config)#"
                                            variant="green"
                                            code={`enable
configure terminal
hostname R1
ip domain-name ccna-lab.com
service password-encryption
security passwords min-length 12`}
                                        />
                                    </div>

                                    {/* 2.2 SSH & User (Renumbered from 4.2) */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Shield size={18} />
                                            <h3 className="font-semibold">2.2 Benutzer- & SSH-Einstellungen</h3>
                                        </div>
                                        <TerminalCodeBlock
                                            title="R1 - Console - SSH Konfiguration"
                                            prompt="R1(config)#"
                                            variant="blue"
                                            code={`username SSHadmin secret ********
crypto key generate rsa general-keys modulus 1024
enable secret ********
line vty 0 4
transport input ssh
login local
login block-for 120 attempts 3 within 60`}
                                        />
                                        <p className="mt-3 text-xs text-slate-500 italic flex items-center gap-2">
                                            <Shield size={12} />
                                            Hinweis: SSH ersetzt Telnet für eine sichere, verschlüsselte Fernverwaltung.
                                        </p>
                                    </div>

                                    {/* 2.3 Interfaces (Renumbered from 4.4) */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Network size={18} />
                                            <h3 className="font-semibold">2.3 Schnittstellenkonfiguration (Beispiel G0/0/0)</h3>
                                        </div>
                                        <TerminalCodeBlock
                                            title="R1 - Console - Interface G0/0/0"
                                            prompt="R1(config-if)#"
                                            variant="orange"
                                            code={`interface g0/0/0
 description Connection to Server
 ip address 192.168.0.1 255.255.255.0
 ipv6 address 2001:db8:acad::1/64
 ipv6 address fe80::1 link-local
 no shutdown`}
                                        />
                                    </div>

                                </div>
                            </section>
                        </AnimatedSection>

                        {/* SECTION 3: Tests (Renumbered from 5) */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">3</span>
                                        Testergebnisse
                                    </h2>
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
                                        <Check size={12} />
                                        ALL TESTS PASSED
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                                            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                Ping Tests
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-white transition-colors">
                                                    <span className="text-slate-600">PC-A → Gateway (R1)</span>
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">✅ 4/4</span>
                                                </li>
                                                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-white transition-colors">
                                                    <span className="text-slate-600">PC-A → Server</span>
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">✅ Erfolgreich</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                                            <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                SSH Verbindung
                                            </h4>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-white transition-colors">
                                                    <span className="text-slate-600">Ziel:</span>
                                                    <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border">10.0.0.1</span>
                                                </li>
                                                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-white transition-colors">
                                                    <span className="text-slate-600">Benutzer:</span>
                                                    <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border">SSHadmin</span>
                                                </li>
                                                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-white transition-colors">
                                                    <span className="text-slate-600">Resultat:</span>
                                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">✅ Verbunden</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-[#0288d1] rounded-full"></div>
                                        Routing Tabelle (show ip route)
                                    </h4>
                                    <TerminalCodeBlock
                                        title="R1 - show ip route"
                                        prompt="R1#"
                                        variant="cyan"
                                        code={`C    10.0.0.0/24 is directly connected, Loopback0
C    192.168.0.0/24 is directly connected, GigabitEthernet0/0/0
C    192.168.1.0/24 is directly connected, GigabitEthernet0/0/1`}
                                    />
                                </div>
                            </section>
                        </AnimatedSection>

                        {/* SECTION 4: Gelernte Konzepte (Renumbered from 6) */}
                        <AnimatedSection>
                            <section className="bg-gradient-to-br from-[#0288d1]/5 to-[#0288d1]/10 rounded-xl border border-[#0288d1]/20 p-6 hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold text-[#01579b] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">4</span>
                                    Gelernte Konzepte
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "Service Password-Encryption", desc: "Verhindert das Auslesen von Passwörtern im Klartext aus der Konfiguration.", icon: Shield },
                                        { title: "RSA Keys & SSH", desc: "Ersetzung von ungesichertem Telnet durch verschlüsseltes SSH mittels RSA-Schlüsselpaaren.", icon: Terminal },
                                        { title: "Login Block-for", desc: "Effektive Maßnahme gegen Brute-Force-Attacken durch Sperren des Logins nach Fehlversuchen.", icon: Monitor },
                                        { title: "IPv6 Link-Local", desc: "Automatische Adressierung für die Kommunikation im lokalen Segment (fe80::).", icon: Network }
                                    ].map((concept, i) => (
                                        <div key={i} className="flex gap-3 p-4 bg-white/60 rounded-xl border border-white hover:bg-white hover:shadow-sm transition-all group">
                                            <div className="mt-0.5 p-2 bg-[#0288d1]/10 rounded-lg text-[#0288d1] group-hover:bg-[#0288d1] group-hover:text-white transition-colors">
                                                <concept.icon size={16} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm mb-1">{concept.title}</h4>
                                                <p className="text-sm text-slate-600 leading-relaxed">{concept.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </AnimatedSection>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektCiscoLab162;
