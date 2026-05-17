import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import {
    linuxProjects,
    ciscoProjects,
    windowsModul1Projects,
    windowsModul2Projects,
    homelabProjects,
    cloudSecurityProjects,
    opnsenseParts,
} from "@/data/portfolio";

// ─── Category Colors ──────────────────────────────────────────────────────────
const DOT = {
    net: "bg-blue-500",
    sys: "bg-orange-500",
    sec: "bg-red-500",
    lab: "bg-green-500",
};

// ─── Overlay Project Link Row ────────────────────────────────────────────────
const OverlayProjectRow = ({ path, label, logo, badge, onClose }: { path: string; label: string; logo?: string; badge?: string; onClose: () => void }) => (
    <Link
        to={path}
        onClick={onClose}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all duration-200 group"
    >
        {logo ? (
            <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <img src={logo} alt="" className="w-full h-full object-contain" />
            </div>
        ) : (
            <span className="w-4 h-4 flex items-center justify-center text-muted-foreground text-[10px]">&bull;</span>
        )}
        <span className="leading-tight group-hover:translate-x-0.5 transition-transform duration-200 flex-1">{label}</span>
        {badge && (
            <span className="text-[8px] border border-white/15 px-1.5 py-0.5 rounded-full whitespace-nowrap text-muted-foreground/60 flex-shrink-0">{badge}</span>
        )}
    </Link>
);

// ─── Overlay Section Header ──────────────────────────────────────────────────
const OverlaySectionHeader = ({ label, color, dotColor }: { label: string; color: string; dotColor: string }) => (
    <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-border/20">
        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
    </div>
);

// ─── Overlay Sub Section Label ───────────────────────────────────────────────
const OverlaySubLabel = ({ label }: { label: string }) => (
    <div className="px-2 pt-2 pb-1">
        <span className="text-[10px] text-foreground/60 font-bold uppercase tracking-wider">{label}</span>
    </div>
);

// ─── Overlay Planned Row ─────────────────────────────────────────────────────
const OverlayPlannedRow = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg text-xs text-muted-foreground/30">
        <span className="w-4 h-4 flex items-center justify-center text-[10px]">·</span>
        <span className="flex-1 leading-tight">{label}</span>
        <span className="text-[8px] border border-white/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">Bald</span>
    </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark");
        }
        return true;
    });
    const location = useLocation();

    // Close overlay on route change
    useEffect(() => {
        setIsOverlayOpen(false);
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isOverlayOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOverlayOpen]);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const isActive = (p: string) => location.pathname === p;
    const close = () => setIsMobileMenuOpen(false);

    const linkCls = (p: string) =>
        `text-sm font-medium transition-all pb-1 border-b-2 ${
            isActive(p) ? "text-primary border-primary" : "text-muted-foreground hover:text-primary border-transparent hover:border-primary/30"
        }`;

    return (
        <>
            {/* ══════════════════════ TOP BAR ══════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-card/80 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <Logo className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg md:text-xl font-semibold text-foreground">gökhan zehirlioglu</span>
                            <span className="text-[10px] md:text-xs font-normal text-primary tracking-wide">Angehender Fachinformatiker für Systemintegration</span>
                        </div>
                    </Link>

                    {/* ════════════════ DESKTOP NAV ════════════════ */}
                    <div className="hidden lg:flex items-center gap-5 ml-auto mr-7">
                        <Link to="/" className={linkCls("/")}>Home</Link>
                        <Link to="/ueber-mich" className={linkCls("/ueber-mich")}>Über mich</Link>

                        {/* ── PROJEKTE: Link + Overlay Trigger ── */}
                        <div className="flex items-center gap-0.5">
                            <Link
                                to="/projekte"
                                className={`text-sm font-medium border px-4 py-1.5 rounded-full transition-all duration-300 ${
                                    isActive("/projekte")
                                        ? "text-orange-400 border-orange-400 bg-orange-400/10"
                                        : "text-orange-400 border-orange-400/50 hover:bg-orange-400/10 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                                }`}
                            >
                                Projekte
                            </Link>
                            <button
                                onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                                className="p-1 text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Projekt-Übersicht öffnen"
                            >
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOverlayOpen ? "rotate-180" : ""}`} />
                            </button>
                        </div>

                        <Link to="/kontakt" className={linkCls("/kontakt")}>Kontakt</Link>
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            aria-label={isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
                            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:bg-secondary transition-all"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                            aria-expanded={isMobileMenuOpen}
                            className="lg:hidden w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ══════════════════════ FULL-PAGE OVERLAY ══════════════════════ */}
            <div
                className={`fixed inset-0 z-[60] transition-all duration-500 ${
                    isOverlayOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-background/97 backdrop-blur-2xl"
                    onClick={() => setIsOverlayOpen(false)}
                />

                {/* Content */}
                <div className={`relative h-full overflow-y-auto transition-all duration-500 ${
                    isOverlayOpen ? "scale-100 translate-y-0" : "scale-[0.97] -translate-y-4"
                }`}>
                    {/* Close Button */}
                    <div className="sticky top-0 z-10 flex justify-end px-6 pt-6 md:px-12 md:pt-8">
                        <button
                            onClick={() => setIsOverlayOpen(false)}
                            className="w-12 h-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center hover:bg-card hover:border-primary/50 hover:scale-110 transition-all duration-300 group"
                            aria-label="Menü schließen"
                        >
                            <X className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                    </div>

                    {/* Header */}
                    <div className="px-6 md:px-12 lg:px-24 pt-4 pb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Projekte</h2>
                        <p className="text-muted-foreground text-sm md:text-base max-w-xl">
                            Alle Projekte — nach Kategorie sortiert.
                        </p>
                    </div>

                    {/* Grid — 5 columns on xl */}
                    <div className="px-6 md:px-12 lg:px-24 pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 lg:gap-6">

                            {/* ── Col 1: Networking ── */}
                            <div className="bg-card/30 border border-border/30 rounded-2xl p-4 hover:border-blue-500/20 transition-colors duration-300">
                                <OverlaySectionHeader label="Networking" color="#3B82F6" dotColor={DOT.net} />
                                <OverlaySubLabel label="Cisco Netacad Labs" />
                                {ciscoProjects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                <div className="border-t border-border/20 my-2 mx-2" />
                                <OverlayPlannedRow label="Cisco Lab xxx" />
                                <OverlayPlannedRow label="Cisco Lab xxx" />
                            </div>

                            {/* ── Col 2-3: Windows & Azure Administration ── */}
                            <div className="bg-card/30 border border-border/30 rounded-2xl p-4 hover:border-orange-500/20 transition-colors duration-300 md:col-span-1 xl:col-span-2">
                                <OverlaySectionHeader label="Windows & Azure Administration" color="#F97316" dotColor={DOT.sys} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Left: Modul 1 + Modul 3 */}
                                    <div>
                                        <OverlaySubLabel label="Modul 1: Client OS Lifecycle" />
                                        {windowsModul1Projects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                        <div className="border-t border-border/20 my-2 mx-2" />
                                        <OverlaySubLabel label="Modul 3: Hybrid Identity & Azure" />
                                        <OverlayProjectRow path="/projekt/windows/modul-3" label="Modul 3 Übersicht (5 Parts)" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-3/part-1" label="Part 1: DC-Deployment & AD-Architektur" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-3/part-2" label="Part 2: PKI · LAPS · GPO Hardening" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-3/part-3" label="Part 3: Entra Tenant & Prov. Agent" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-3/part-4" label="Part 4: Cloud Sync & Validation" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-3/part-5" label="Part 5: Coming Soon" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Bald" onClose={() => setIsOverlayOpen(false)} />
                                    </div>
                                    {/* Right: Modul 2 + Modul 4 */}
                                    <div>
                                        <OverlaySubLabel label="Modul 2: Windows Server Administration" />
                                        {windowsModul2Projects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                        <div className="border-t border-border/20 my-2 mx-2" />
                                        <OverlaySubLabel label="Modul 4: Cloud Security & Compliance" />
                                        <OverlayProjectRow path="/projekt/windows/modul-4" label="Modul 4 Übersicht (5 Parts)" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-4/part-1" label="Part 1: Intune & MDM" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-4/part-2" label="Part 2: Conditional Access" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-4/part-3" label="Part 3: PIM" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-4/part-4" label="Part 4: Defender for Endpoint" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-4/part-5" label="Part 5: Sentinel & SIEM" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" badge="Soon" onClose={() => setIsOverlayOpen(false)} />
                                        <div className="border-t border-border/20 my-2 mx-2" />
                                        <OverlaySubLabel label="Modul 5: Enterprise AD Administration" />
                                        <OverlayProjectRow path="/projekt/windows/modul-5/part-1" label="Vertrauensstellungen & Standort-Topologie" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" badge="Fertig" onClose={() => setIsOverlayOpen(false)} />
                                        <OverlayProjectRow path="/projekt/windows/modul-5/part-2" label="AD-Zertifikatdienste & PKI" logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" badge="Fertig" onClose={() => setIsOverlayOpen(false)} />
                                    </div>
                                </div>
                            </div>

                            {/* ── Col 4: Cloud & Security ── */}
                            <div className="bg-card/30 border border-border/30 rounded-2xl p-4 hover:border-red-500/20 transition-colors duration-300">
                                <OverlaySectionHeader label="Cloud & Security" color="#EF4444" dotColor={DOT.sec} />
                                <OverlaySubLabel label="Enterprise Cloud & Security Lab Erstellung" />
                                {opnsenseParts.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                <div className="border-t border-border/20 my-1 mx-2" />
                                <OverlaySubLabel label="VPN Gateway & Defense-in-Depth" />
                                {cloudSecurityProjects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                <div className="border-t border-border/20 my-1 mx-2" />
                                <OverlayPlannedRow label="Azure Cloud Security Lab" />
                            </div>

                            {/* ── Col 5: Homelab & Linux Labs ── */}
                            <div className="bg-card/30 border border-border/30 rounded-2xl p-4 hover:border-green-500/20 transition-colors duration-300">
                                <OverlaySectionHeader label="Homelab & Linux Labs" color="#22C55E" dotColor={DOT.lab} />
                                <OverlaySubLabel label="Homelab Infrastruktur & Services" />
                                {homelabProjects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                <div className="border-t border-border/20 my-1 mx-2" />
                                <OverlaySubLabel label="Linux Challenge Labs (LPIC-1)" />
                                {linuxProjects.map(p => <OverlayProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} onClose={() => setIsOverlayOpen(false)} />)}
                                <div className="border-t border-border/20 my-1 mx-2" />
                                <OverlayPlannedRow label="Local LLM" />
                                <OverlayPlannedRow label="Automation (n8n / Ansible)" />
                                <OverlayPlannedRow label="LPIC-1: [Coming Soon]" />
                            </div>
                        </div>

                        {/* Footer Link */}
                        <div className="mt-10 flex justify-center">
                            <Link
                                to="/projekte"
                                onClick={() => setIsOverlayOpen(false)}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-card border border-border/50 rounded-xl text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                            >
                                Alle Projekte anzeigen
                                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════ MOBILE MENU ══════════════════════ */}
            {isMobileMenuOpen && (
                <nav className="fixed top-[73px] left-0 right-0 bg-card border-b border-border p-4 z-40 lg:hidden max-h-[calc(100vh-73px)] overflow-y-auto" aria-label="Mobile Navigation">
                    <Link to="/" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Home</Link>
                    <Link to="/ueber-mich" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Über mich</Link>
                    <Link to="/projekte" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Projekte</Link>
                    <Link to="/kontakt" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Kontakt</Link>

                    {/* ── Projekte section ── */}
                    <div className="border-t border-border my-2" />
                    <div className="px-4 py-2">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Alle Projekte</span>
                    </div>

                    {/* Networking */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.net}`} />
                        <Link to="/cisco-projekte" onClick={close} className="text-[10px] font-semibold text-muted-foreground uppercase hover:text-primary">Networking</Link>
                    </div>
                    {ciscoProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}

                    {/* Windows & Azure Administration */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.sys}`} />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">Windows & Azure Administration</span>
                    </div>
                    <div className="px-6 py-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Modul 1: Client OS Lifecycle</span></div>
                    {windowsModul1Projects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Modul 2: Windows Server Administration</span></div>
                    {windowsModul2Projects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Modul 3: Hybrid Identity & Azure</span></div>
                    {[
                        { path: "/projekt/windows/modul-3",        label: "Modul 3 Übersicht (5 Parts)",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
                        { path: "/projekt/windows/modul-3/part-1", label: "Part 1: DC-Deployment & AD-Architektur", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg" },
                        { path: "/projekt/windows/modul-3/part-2", label: "Part 2: PKI · LAPS · GPO Hardening",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg" },
                        { path: "/projekt/windows/modul-3/part-3", label: "Part 3: Entra Tenant & Prov. Agent",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
                        { path: "/projekt/windows/modul-3/part-4", label: "Part 4: Cloud Sync & Validation",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
                        { path: "/projekt/windows/modul-3/part-5", label: "Part 5: Coming Soon",                  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
                    ].map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logo} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Modul 4: Cloud Security & Compliance</span></div>
                    {[
                        { path: "/projekt/windows/modul-4",        label: "Modul 4 Übersicht (5 Parts)" },
                        { path: "/projekt/windows/modul-4/part-1", label: "Part 1: Intune & MDM" },
                        { path: "/projekt/windows/modul-4/part-2", label: "Part 2: Conditional Access" },
                        { path: "/projekt/windows/modul-4/part-3", label: "Part 3: PIM" },
                        { path: "/projekt/windows/modul-4/part-4", label: "Part 4: Defender for Endpoint" },
                        { path: "/projekt/windows/modul-4/part-5", label: "Part 5: Sentinel & SIEM" },
                    ].map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Modul 5: Enterprise AD Administration</span></div>
                    <Link to="/projekt/windows/modul-5/part-1" onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="" className="w-4 h-4 object-contain" />Vertrauensstellungen &amp; Standort-Topologie
                    </Link>
                    <Link to="/projekt/windows/modul-5/part-2" onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="" className="w-4 h-4 object-contain" />AD-Zertifikatdienste &amp; PKI
                    </Link>

                    {/* Cloud & Security */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.sec}`} />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">Cloud & Security</span>
                    </div>
                    <div className="px-6 py-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Enterprise Cloud & Security Lab Erstellung</span></div>
                    {opnsenseParts.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center text-muted-foreground text-[10px]">•</span>{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">VPN Gateway & Defense-in-Depth</span></div>
                    {cloudSecurityProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}

                    {/* Homelab & Linux Labs */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.lab}`} />
                        <Link to="/projekte" onClick={close} className="text-[10px] font-semibold text-muted-foreground uppercase hover:text-primary">Homelab & Linux Labs</Link>
                    </div>
                    <div className="px-6 py-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Homelab Infrastruktur & Services</span></div>
                    {homelabProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Linux Challenge Labs (LPIC-1)</span></div>
                    {linuxProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
};

export default Navigation;
