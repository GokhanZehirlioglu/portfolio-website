import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import {
    linuxProjects,
    ciscoProjects,
    windowsModul1Projects,
    windowsModul2Projects,
    homelabProjects,
    cloudSecurityProjects,
} from "@/data/portfolio";

// ─── Category Colors ──────────────────────────────────────────────────────────
const DOT = {
    net: "bg-blue-500",
    sys: "bg-orange-500",
    sec: "bg-red-500",
    lab: "bg-green-500",
};

// ─── Planned Item Row ─────────────────────────────────────────────────────────
const PlannedRow = ({ label }: { label: string }) => (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-muted-foreground/40">
        <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px]">·</span>
        <span className="flex-1 truncate">{label}</span>
        <span className="text-[9px] border border-border/40 px-1.5 py-0.5 rounded-full whitespace-nowrap">Bald</span>
    </div>
);

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel = ({ label, color, dotColor }: { label: string; color?: string; dotColor?: string }) => (
    <div className="px-3 pt-2 pb-1 flex items-center gap-2">
        {dotColor && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />}
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
    </div>
);

// ─── Sub Section Label ────────────────────────────────────────────────────────
const SubLabel = ({ label }: { label: string }) => (
    <div className="px-3 pt-1.5 pb-0.5">
        <span className="text-[10px] text-muted-foreground/50 font-medium">{label}</span>
    </div>
);

const Divider = () => <div className="border-t border-border/30 my-1 mx-3" />;

// ─── Project Link Row ─────────────────────────────────────────────────────────
const ProjectRow = ({ path, label, logo }: { path: string; label: string; logo?: string }) => (
    <Link
        to={path}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors"
    >
        {logo ? (
            <img src={logo} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
        ) : (
            <span className="w-3.5 h-3.5 flex items-center justify-center text-muted-foreground text-[10px]">&bull;</span>
        )}
        <span className="truncate">{label}</span>
    </Link>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN NAVIGATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark");
        }
        return true;
    });
    const location = useLocation();

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
                            <span className="text-[10px] md:text-xs font-normal text-primary tracking-wide">Fachinformatiker für Systemintegration</span>
                        </div>
                    </Link>

                    {/* ════════════════ DESKTOP NAV ════════════════ */}
                    <div className="hidden lg:flex items-center gap-5 ml-auto mr-7">
                        <Link to="/" className={linkCls("/")}>Home</Link>
                        <Link to="/ueber-mich" className={linkCls("/ueber-mich")}>Über mich</Link>

                        {/* ── PROJEKTE MEGA-MENU ── */}
                        <div className="relative group">
                            <Link to="/projekte" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                                Projekte
                                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                            </Link>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-card border border-border rounded-xl shadow-xl" style={{ width: "780px" }}>
                                    <div className="grid grid-cols-4 divide-x divide-border/30">

                                        {/* ── Col 1: Networking ── */}
                                        <div className="p-2">
                                            <SectionLabel label="Networking" color="#3B82F6" dotColor={DOT.net} />
                                            <SubLabel label="Cisco Netacad Labs" />
                                            {ciscoProjects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                            <Divider />
                                            <PlannedRow label="Cisco Lab xxx" />
                                            <PlannedRow label="Cisco Lab xxx" />
                                        </div>

                                        {/* ── Col 2: System & Server ── */}
                                        <div className="p-2 col-span-2">
                                            <SectionLabel label="System & Server" color="#F97316" dotColor={DOT.sys} />
                                            <div className="grid grid-cols-2 divide-x divide-border/20">
                                                {/* Left: Linux */}
                                                <div className="pr-2">
                                                    <SubLabel label="Linux Ecosystem (LPIC-1 & Bash)" />
                                                    {linuxProjects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                                    <Divider />
                                                    <PlannedRow label="LPIC-1: [Coming Soon]" />
                                                </div>
                                                {/* Right: Microsoft */}
                                                <div className="pl-2">
                                                    <SubLabel label="Microsoft Enterprise IT" />
                                                    <div className="px-3 pt-1 pb-0.5">
                                                        <span className="text-[9px] text-muted-foreground/40 font-medium">Modul 1: Client OS Lifecycle</span>
                                                    </div>
                                                    {windowsModul1Projects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                                    <PlannedRow label="Projekt 02: Migration (USMT)" />
                                                    <PlannedRow label="Projekt 03: Golden Image" />
                                                    <PlannedRow label="Projekt 04: Deployment" />
                                                    <Divider />
                                                    <div className="px-3 pt-1 pb-0.5">
                                                        <span className="text-[9px] text-muted-foreground/40 font-medium">Modul 2: Identity & Server Admin</span>
                                                    </div>
                                                    {windowsModul2Projects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                                    <PlannedRow label="Projekt 06: GPO & OU-Design" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Col 3: Cloud & Security + Homelab ── */}
                                        <div className="p-2">
                                            <SectionLabel label="Cloud & Security" color="#EF4444" dotColor={DOT.sec} />
                                            {cloudSecurityProjects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                            <Divider />
                                            <SubLabel label="Enterprise Security Lab: OPNsense" />
                                            <PlannedRow label="Part 1-6 (Geplant)" />
                                            <PlannedRow label="Azure Cloud Security Lab" />

                                            <div className="border-t border-border/30 my-2 mx-3" />

                                            <SectionLabel label="Homelab" color="#22C55E" dotColor={DOT.lab} />
                                            {homelabProjects.map(p => <ProjectRow key={p.path} path={p.path} label={p.label} logo={p.logos[0]} />)}
                                            <Divider />
                                            <PlannedRow label="Local LLM" />
                                            <PlannedRow label="Automation (n8n / Ansible)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
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

            {/* ══════════════════════ MOBILE MENU ══════════════════════ */}
            {isMobileMenuOpen && (
                <nav className="fixed top-[73px] left-0 right-0 bg-card border-b border-border p-4 z-40 lg:hidden max-h-[calc(100vh-73px)] overflow-y-auto" aria-label="Mobile Navigation">
                    <Link to="/" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Home</Link>
                    <Link to="/ueber-mich" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Über mich</Link>
                    <Link to="/kontakt" onClick={close} className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors">Kontakt</Link>

                    {/* ── Projekte section ── */}
                    <div className="border-t border-border my-2" />
                    <div className="px-4 py-2">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">Projekte</span>
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

                    {/* System & Server */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.sys}`} />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">System & Server</span>
                    </div>
                    <div className="px-6 py-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Linux Ecosystem</span></div>
                    {linuxProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    <div className="px-6 py-1 mt-1"><span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Microsoft Enterprise IT</span></div>
                    {windowsModul1Projects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}
                    {windowsModul2Projects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}

                    {/* Cloud & Security */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.sec}`} />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">Cloud & Security</span>
                    </div>
                    {cloudSecurityProjects.map(p => (
                        <Link key={p.path} to={p.path} onClick={close} className="flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                            <img src={p.logos[0]} alt="" className="w-4 h-4 object-contain" />{p.label}
                        </Link>
                    ))}

                    {/* Homelab */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${DOT.lab}`} />
                        <Link to="/projekte" onClick={close} className="text-[10px] font-semibold text-muted-foreground uppercase hover:text-primary">Homelab</Link>
                    </div>
                    {homelabProjects.map(p => (
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
