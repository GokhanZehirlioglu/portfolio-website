import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Monitor, Shield, Cpu, Network, Download, FileText,
    Copy, Check, X, Maximize2, Terminal, Server, Laptop, Router, Phone, GitBranch, AlertTriangle, Info
} from "lucide-react";

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Terminal-Style Code Block Component
const TerminalCodeBlock = ({
    title,
    code,
    prompt = "S1#",
    variant = "green",
    description
}: {
    title: string;
    code: string;
    prompt?: string;
    variant?: "green" | "blue" | "orange" | "cyan";
    description?: string;
}) => {
    const [copied, setCopied] = useState(false);

    const colorMap = {
        green: "text-emerald-400",
        blue: "text-blue-400",
        orange: "text-orange-400",
        cyan: "text-cyan-400"
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split('\n');

    return (
        <div className="opacity-100 translate-y-0 text-left mb-6">
            {description && (
                <p className="text-sm text-slate-600 mb-2 font-medium">{description}</p>
            )}
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
                <div className="bg-[#0d1117] p-4 font-mono text-sm overflow-x-auto text-left text-slate-200">
                    {lines.map((line, index) => (
                        <div key={index} className="flex hover:bg-slate-800/50 -mx-4 px-4 py-0.5 transition-colors text-left justify-start">
                            {/* Line Number */}
                            <span className="w-8 text-slate-600 select-none text-right pr-4 flex-shrink-0">
                                {index + 1}
                            </span>
                            {/* Code Content */}
                            <div className="flex-1">
                                {line.startsWith(' ') || line.startsWith('!') ? (
                                    <span className="text-slate-500">{line}</span>
                                ) : (
                                    <span>
                                        <span className="text-purple-400 select-none mr-2">{prompt}</span>
                                        <span className={colorMap[variant]}>{line}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {/* Blinking Cursor */}
                    <div className="flex -mx-4 px-4 py-0.5 text-left justify-start">
                        <span className="w-8 text-slate-600 select-none text-right pr-4 flex-shrink-0"></span>
                        <span className="text-purple-400 mr-2">{prompt}</span>
                        <span className="animate-pulse text-white">▋</span>
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
        { label: "VLANs", complete: true },
        { label: "Ports Assignments", complete: true },
        { label: "Trunks (Static & Dynamic)", complete: true }
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Lab Fortschritt</span>
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

    // Note: Coordinates are approximations, update if needed after getting image
    const devices = [
        {
            id: 'swa',
            name: 'SWA - Cisco 2960 (Central)',
            x: 50, y: 30, // Approximate top center
            icon: Network,
            info: 'VLAN 99 (SVI): 192.168.99.252\nTrunk G0/1 -> Static\nTrunk G0/2 -> Dynamic'
        },
        {
            id: 'swb',
            name: 'SWB - Cisco 2960 (Left)',
            x: 25, y: 30, // Approximate left
            icon: Network,
            info: 'VLAN 99 (SVI): 192.168.99.253\nPorts: F0/1-3 to PCs\nG0/1 -> Trunk to SWA'
        },
        {
            id: 'swc',
            name: 'SWC - Cisco 2960 (Right)',
            x: 75, y: 30, // Approximate right
            icon: Network,
            info: 'VLAN 99 (SVI): 192.168.99.254\nPorts: F0/1-4 to PCs/Phone\nG0/2 -> Trunk to SWA'
        }
    ];

    const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

    return (
        <div className="space-y-2">
            <div
                className={`relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group transition-all duration-700 opacity-100 translate-y-0`}
                onClick={() => setIsLightboxOpen(true)}
            >
                {/* Image Container */}
                <div className="relative overflow-hidden min-h-[300px] bg-slate-200 flex items-center justify-center cursor-pointer">
                    <img
                        src={imageSrc}
                        alt="Lab 3.6.1 Topology"
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
                        <p className="text-xs">Bitte lab-3.6.1.png in public/images/cisco/ ablegen</p>
                    </div>

                    {/* Interactions */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <Maximize2 size={14} />
                        <span className="text-xs font-medium">Vergrößern</span>
                    </div>

                    {/* Device Hotspots */}
                    {devices.map((device) => (
                        <div
                            key={device.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{ left: `${device.x}%`, top: `${device.y}%` }}
                            onMouseEnter={() => setHoveredDevice(device.id)}
                            onMouseLeave={() => setHoveredDevice(null)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 w-8 h-8 -m-1 rounded-full bg-[#0288d1]/30 animate-ping" />
                            <div className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredDevice === device.id ? 'bg-[#0288d1] text-white scale-125' : 'bg-white/90 text-[#0288d1] hover:scale-110'} shadow-lg border-2 border-white cursor-pointer`}>
                                <device.icon size={12} />
                            </div>

                            {/* Tooltip */}
                            {hoveredDevice === device.id && (
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-slate-900 text-white text-xs rounded-lg p-3 shadow-xl z-20 animate-fadeIn">
                                    <div className="font-bold text-[#4fc3f7] mb-1">{device.name}</div>
                                    <pre className="text-slate-300 whitespace-pre-wrap font-mono text-[10px]">
                                        {device.info}
                                    </pre>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
                    <span className="font-medium">Abbildung 1:</span> Cisco 2960 Switch-Topologie mit VLANs
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
                            alt="Topology Full"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-scaleIn"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Animated Section Wrapper (Simplified)
const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`opacity-100 translate-y-0 ${className}`}>
            {children}
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

const Lab361VlansUndTrunking = () => {
    return (
        <Layout>
            <Helmet>
                <title>Lab 3.6.1: VLANs und Trunking | Gökhan Zehirlioglu</title>
                <meta name="description" content="Cisco Packet Tracer Lab 3.6.1 - VLANs implementieren & Trunking konfigurieren." />
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
                            <span className="font-semibold tracking-wide">CISCO PACKET TRACER: LAB 3.6.1</span>
                        </div>
                    </div>
                    {/* Status Badge */}
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
                                            VLANs und Trunking
                                        </h1>
                                        <div className="text-slate-500 text-sm mb-4">Lab 3.6.1 - Logical Mode</div>
                                        <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                                            Dieses Projekt demonstriert die Segmentierung eines Netzwerks zur Vorbereitung einer neuen Niederlassung. Sie konfigurieren VLANs auf 2960 Switches, weisen Ports zu (Data & Voice) und richten sichere Trunks ein (Statisch & Dynamisch).
                                        </p>
                                    </div>
                                    <div className="p-2 bg-[#0288d1]/10 rounded-lg">
                                        <Network className="text-[#0288d1]" size={24} />
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Datum:</span>
                                        <span className="font-medium text-slate-700">16. Februar 2026</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Geräte:</span>
                                        <span className="font-medium text-slate-700">3x Cisco 2960 Switches</span>
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
                                        <Shield className="text-[#0288d1]" size={18} />
                                    </div>
                                    Lernziele
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Part 1: VLANs konfigurieren (10, 20, 30, 40, 99)",
                                        "Part 2: Access & Voice Ports zuweisen",
                                        "Part 3: Statisches Trunking konfigurieren (SWA-SWB)",
                                        "Part 4: Dynamisches Trunking konfigurieren (DTP)",
                                        "Verifizierung der End-to-End Konnektivität"
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
                                    <a
                                        href="/downloads/cisco/lab-3.6.1/Lab_3_6_1_VLANs_und_Trunking.docx"
                                        download
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group hover:border-slate-300 hover:shadow-sm"
                                    >
                                        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg transition-transform group-hover:scale-110">
                                            <FileText size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">Lab Dokumentation</div>
                                            <div className="text-xs text-slate-500">.docx, Deutsch</div>
                                        </div>
                                        <Download size={16} className="text-slate-400 group-hover:text-blue-700 transition-colors" />
                                    </a>

                                    <a
                                        href="/downloads/cisco/lab-3.6.1/3.6.1-packet-tracer---implement-vlans-and-trunking.pdf"
                                        download
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group hover:border-slate-300 hover:shadow-sm"
                                    >
                                        <div className="p-2 bg-purple-100 text-purple-700 rounded-lg transition-transform group-hover:scale-110">
                                            <FileText size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-slate-700 group-hover:text-purple-700 transition-colors">Lab Anleitung</div>
                                            <div className="text-xs text-slate-500">.pdf, Englisch</div>
                                        </div>
                                        <Download size={16} className="text-slate-400 group-hover:text-purple-700 transition-colors" />
                                    </a>

                                    <a
                                        href="/downloads/cisco/lab-3.6.1/3.6.1-packet-tracer---implement-vlans-and-trunking.pka"
                                        download
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group hover:border-slate-300 hover:shadow-sm"
                                    >
                                        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg transition-transform group-hover:scale-110">
                                            <Network size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">Packet Tracer File</div>
                                            <div className="text-xs text-slate-500">.pka, Lab File</div>
                                        </div>
                                        <Download size={16} className="text-slate-400 group-hover:text-emerald-700 transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </AnimatedSection>

                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* SECTION 1: Topologie & Scenario */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">1</span>
                                        Szenario & Topologie
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-slate-700 leading-relaxed">
                                        <strong>Hintergrund:</strong> Sie arbeiten in einem Unternehmen, das die Einführung neuer Cisco 2960 Switches in einer Niederlassung plant. Ihre Aufgabe im Labor ist es, die geplanten VLAN- und Trunking-Konfigurationen zu testen, bevor sie live gehen. Es werden separate VLANs für Administration, Buchhaltung, Personalabteilung und Telefonie (Voice) benötigt.
                                    </div>

                                    {/* Interactive Topology Image */}
                                    <div className="mb-8">
                                        <InteractiveTopology imageSrc="/images/cisco/lab-3.6.1.png" />
                                    </div>

                                    <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-[#0288d1] rounded-full"></div>
                                        IP-Adressierungstabelle
                                    </h3>
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-sm text-left text-slate-600">
                                            <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                                                <tr>
                                                    <th className="px-4 py-3">Gerät</th>
                                                    <th className="px-4 py-3">Interface</th>
                                                    <th className="px-4 py-3">IP-Adresse</th>
                                                    <th className="px-4 py-3">VLAN / Port</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { dev: "PC1", iface: "NIC", ip: "192.168.10.10", vlan: "VLAN 10 @ SWB F0/1" },
                                                    { dev: "PC2", iface: "NIC", ip: "192.168.20.20", vlan: "VLAN 20 @ SWB F0/2" },
                                                    { dev: "PC3", iface: "NIC", ip: "192.168.30.30", vlan: "VLAN 30 @ SWB F0/3" },
                                                    { dev: "PC4", iface: "NIC", ip: "192.168.10.11", vlan: "VLAN 10 @ SWC F0/1" },
                                                    { dev: "PC5", iface: "NIC", ip: "192.168.20.21", vlan: "VLAN 20 @ SWC F0/2" },
                                                    { dev: "PC6", iface: "NIC", ip: "192.168.30.31", vlan: "VLAN 30 @ SWC F0/3" },
                                                    { dev: "PC7", iface: "NIC", ip: "192.168.10.12", vlan: "VLAN 10 & 40 (Voice) @ SWC F0/4" },
                                                    { dev: "SWA", iface: "VLAN 99", ip: "192.168.99.252", vlan: "Management" },
                                                    { dev: "SWB", iface: "VLAN 99", ip: "192.168.99.253", vlan: "Management" },
                                                    { dev: "SWC", iface: "VLAN 99", ip: "192.168.99.254", vlan: "Management" },
                                                ].map((row, i) => (
                                                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                                                        <td className="px-4 py-2 font-semibold text-[#0277bd]">{row.dev}</td>
                                                        <td className="px-4 py-2 font-mono text-xs">{row.iface}</td>
                                                        <td className="px-4 py-2 font-mono text-xs text-emerald-600">{row.ip}</td>
                                                        <td className="px-4 py-2 text-xs">{row.vlan}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </AnimatedSection>

                        {/* SECTION 2: Konfigurationsschritte */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">2</span>
                                        Konfiguration (Schritt für Schritt)
                                    </h2>
                                </div>
                                <div className="p-6 space-y-8">

                                    {/* Part 1 */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Network size={20} />
                                            <h3 className="font-bold text-lg">Part 1: VLANs erstellen</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Erstellen Sie die fünf erforderlichen VLANs auf allen drei Switches. Die Namen müssen exakt übereinstimmen (Case-Sensitive).
                                        </p>
                                        <TerminalCodeBlock
                                            title="SWA, SWB, SWC (Global Config)"
                                            prompt="(config)#"
                                            variant="green"
                                            code={`vlan 10
 name Admin
vlan 20
 name Accounts
vlan 30
 name HR
vlan 40
 name Voice
vlan 99
 name Management
vlan 100
 name Native`}
                                            description="Dieser Block muss auf jedem Switch ausgeführt werden."
                                        />
                                    </div>

                                    {/* Part 2 */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Laptop size={20} />
                                            <h3 className="font-bold text-lg">Part 2: Ports zuweisen</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Ports werden den VLANs zugewiesen. Ein besonderer Fall ist Port F0/4 auf SWC, der sowohl Daten (VLAN 10) als auch Voice (VLAN 40) führt.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <TerminalCodeBlock
                                                title="SWB Configuration"
                                                prompt="SWB(config)#"
                                                variant="blue"
                                                code={`interface F0/1
 switchport mode access
 switchport access vlan 10
interface F0/2
 switchport mode access
 switchport access vlan 20
interface F0/3
 switchport mode access
 switchport access vlan 30`}
                                            />
                                            <TerminalCodeBlock
                                                title="SWC Voice VLAN & Access"
                                                prompt="SWC(config)#"
                                                variant="blue"
                                                code={`interface range F0/1-3
 switchport mode access
 switchport access vlan 10,20,30

interface F0/4
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 40
 mls qos trust cos`}
                                            />
                                        </div>
                                        <TerminalCodeBlock
                                            title="Management Interface (Alle Switches)"
                                            prompt="(config)#"
                                            variant="orange"
                                            code={`interface vlan 99
 ip address 192.168.99.252 255.255.255.0
 no shutdown`}
                                            description="Ersetzen Sie die IP (.252, .253, .254) entsprechend der Tabelle für jeden Switch."
                                        />
                                    </div>

                                    {/* Part 3 */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Server size={20} />
                                            <h3 className="font-bold text-lg">Part 3: Statisches Trunking</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Die Verbindung zwischen <strong>SWA</strong> und <strong>SWB</strong> wird als statischer Trunk konfiguriert. DTP wird aus Sicherheitsgründen deaktiviert (nonegotiate), und das Native VLAN wird auf 100 geändert.
                                        </p>
                                        <TerminalCodeBlock
                                            title="SWA & SWB (G0/1)"
                                            prompt="(config-if)#"
                                            variant="green"
                                            code={`interface G0/1
 switchport mode trunk
 switchport trunk native vlan 100
 switchport nonegotiate`}
                                        />
                                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-xs text-amber-800 flex gap-2">
                                            <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                                            Hinweis: Es können "Native VLAN Mismatch" Fehler auftreten, bis beide Seiten konfiguriert sind. Dies ist normal.
                                        </div>
                                    </div>

                                    {/* Part 4 */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 text-[#0277bd]">
                                            <Monitor size={20} />
                                            <h3 className="font-bold text-lg">Part 4: Dynamisches Trunking (DTP)</h3>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Standardmäßig sind Ports am 2960 im Modus "dynamic auto". Wir konfigurieren <strong>SWA G0/2</strong> auf "dynamic desirable", damit er aktiv versucht, einen Trunk mit SWC auszuhandeln.
                                        </p>
                                        <TerminalCodeBlock
                                            title="SWA (G0/2)"
                                            prompt="SWA(config-if)#"
                                            variant="cyan"
                                            code={`interface G0/2
 switchport mode dynamic desirable
 switchport trunk native vlan 100`}
                                        />
                                        <p className="text-xs text-slate-500 mt-2 mb-2">
                                            Auf <strong>SWC</strong> muss G0/2 lediglich das Native VLAN angepasst werden, da er standardmäßig im "dynamic auto" Modus ist und den Trunk-Request von SWA akzeptiert.
                                        </p>
                                        <TerminalCodeBlock
                                            title="SWC (G0/2)"
                                            prompt="SWC(config-if)#"
                                            variant="cyan"
                                            code={`interface G0/2
 switchport trunk native vlan 100`}
                                        />
                                    </div>

                                </div>
                            </section>
                        </AnimatedSection>

                        {/* SECTION 3: Verifikation */}
                        <AnimatedSection>
                            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-[#0288d1] text-white flex items-center justify-center text-sm font-bold">3</span>
                                        Testergebnisse
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-4 mb-6">
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <h4 className="font-semibold text-slate-700">Erfolgreiche Tests (Gleiches VLAN)</h4>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">Ping zwischen PCs im selben VLAN über Switches hinweg.</p>

                                            <div className="space-y-2">
                                                {[
                                                    { test: "PC1 (VLAN 10) ping PC4 (VLAN 10)", result: "Success" },
                                                    { test: "PC2 (VLAN 20) ping PC5 (VLAN 20)", result: "Success" },
                                                    { test: "PC3 (VLAN 30) ping PC6 (VLAN 30)", result: "Success" }
                                                ].map((t, i) => (
                                                    <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                                                        <span className="text-sm font-mono text-slate-700">{t.test}</span>
                                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">SUCCESS</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <h4 className="font-semibold text-slate-700">Erwartete Fehlschläge (Inter-VLAN)</h4>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-3">Ohne Router ist keine Verbindung zwischen verschiedenen VLANs möglich.</p>

                                            <div className="space-y-2">
                                                {[
                                                    { test: "PC1 (VLAN 10) ping PC2 (VLAN 20)", result: "Failed" },
                                                    { test: "SWA (VLAN 99) ping PC1 (VLAN 10)", result: "Failed" },
                                                ].map((t, i) => (
                                                    <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100">
                                                        <span className="text-sm font-mono text-slate-700">{t.test}</span>
                                                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100">FAILED</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-[#e1f5fe] text-[#01579b] rounded-lg">
                                        <Info className="flex-shrink-0 mt-0.5" size={20} />
                                        <div className="text-sm leading-relaxed">
                                            <strong>Fazit:</strong> Die VLANs sind erfolgreich isoliert, und die Trunks leiten tagged Traffic korrekt weiter. Die Konnektivität innerhalb eines VLANs ist auch über mehrere Switches hinweg gewährleistet, während der Zugriff zwischen VLANs sicher unterbunden wird.
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </AnimatedSection>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Lab361VlansUndTrunking;
