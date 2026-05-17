import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import {
    linuxProjects,
    ciscoProjects,
    windowsModul1Projects,
    windowsModul2Projects,
    homelabProjects,
    cloudSecurityProjects,
    opnsenseParts,
} from "@/data/portfolio";

const WIN_BLUE = "#0078D4";
const AZ      = "#00BCF2";
const WIN_LOGO = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg";
const AZ_LOGO  = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg";

// ─── Windows Module Config ───────────────────────────────────────────────────
const winModules = [
    {
        num: "01",
        title: "Client OS Lifecycle",
        subtitle: "Modul 1",
        logo: WIN_LOGO,
        badge: "Abgeschlossen",
        badgeBg: "#16a34a18",
        badgeColor: "#16a34a",
        status: "done",
        projects: windowsModul1Projects,
    },
    {
        num: "02",
        title: "Windows Server Administration",
        subtitle: "Modul 2",
        logo: WIN_LOGO,
        badge: "Abgeschlossen",
        badgeBg: "#16a34a18",
        badgeColor: "#16a34a",
        status: "done",
        projects: windowsModul2Projects,
    },
    {
        num: "03",
        title: "Hybrid Identity & Azure",
        subtitle: "Modul 3",
        logo: AZ_LOGO,
        badge: "In Progress",
        badgeBg: `${AZ}18`,
        badgeColor: AZ,
        status: "active",
        projects: [
            { path: "/projekt/windows/modul-3",        label: "Modul 3 Übersicht",                      logo: AZ_LOGO },
            { path: "/projekt/windows/modul-3/part-1", label: "Part 1 — DC-Deployment & AD-Architektur", logo: WIN_LOGO },
            { path: "/projekt/windows/modul-3/part-2", label: "Part 2 — PKI · LAPS · GPO Hardening",    logo: WIN_LOGO },
            { path: "/projekt/windows/modul-3/part-3", label: "Part 3 — Entra Tenant & Prov. Agent",    logo: AZ_LOGO },
            { path: "/projekt/windows/modul-3/part-4", label: "Part 4 — Cloud Sync & Validation",        logo: AZ_LOGO },
            { path: "/projekt/windows/modul-3/part-5", label: "Part 5 — Coming Soon",                    logo: AZ_LOGO, soon: true },
        ],
    },
    {
        num: "04",
        title: "Cloud Security & Compliance",
        subtitle: "Modul 4",
        logo: AZ_LOGO,
        badge: "Coming Soon",
        badgeBg: "#ffffff08",
        badgeColor: "#94a3b8",
        status: "soon",
        projects: [
            { path: "/projekt/windows/modul-4",        label: "Modul 4 Übersicht",                  logo: AZ_LOGO },
            { path: "/projekt/windows/modul-4/part-1", label: "Part 1 — Intune & MDM",              logo: AZ_LOGO },
            { path: "/projekt/windows/modul-4/part-2", label: "Part 2 — Conditional Access",        logo: AZ_LOGO },
            { path: "/projekt/windows/modul-4/part-3", label: "Part 3 — PIM",                       logo: AZ_LOGO },
            { path: "/projekt/windows/modul-4/part-4", label: "Part 4 — Defender for Endpoint",     logo: AZ_LOGO },
            { path: "/projekt/windows/modul-4/part-5", label: "Part 5 — Sentinel & SIEM",           logo: AZ_LOGO },
        ],
    },
];

// ─── Category definitions ────────────────────────────────────────────────────
const categories = [
    {
        id: "networking",
        label: "Networking",
        description: "Cisco Netacad Labs — Router-Konfiguration, VLANs, Trunking, IPv4/IPv6-Adressierung und Switching in Packet Tracer.",
        color: "#3B82F6",
        dotColor: "bg-blue-500",
        borderHover: "hover:border-blue-500/40",
        iconBg: "from-blue-500/20 to-blue-600/5",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg",
        ],
        projects: ciscoProjects,
        planned: ["Cisco Lab xxx", "Cisco Lab xxx"],
    },
    {
        id: "windows",
        label: "Windows & Azure Administration",
        description: "Microsoft Enterprise IT in vier Modulen: Client OS Lifecycle, Windows Server Administration, Hybrid Identity & Azure sowie Cloud Security & Compliance.",
        color: "#F97316",
        dotColor: "bg-orange-500",
        borderHover: "hover:border-orange-500/40",
        iconBg: "from-orange-500/20 to-orange-600/5",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        ],
        projects: [
            ...windowsModul1Projects,
            ...windowsModul2Projects,
            { path: "/projekt/windows/modul-3", label: "Modul 3 — Hybrid Identity & Azure", logos: [AZ_LOGO], description: "" },
        ],
        planned: [],
    },
    {
        id: "cloud",
        label: "Cloud & Security",
        description: "Enterprise-Security-Lab mit OPNsense, VLAN-Segmentierung und SIEM-Pipeline. Sichere Fernzugriffs-Architekturen, VPN-Tunneling, Firewalling und Defense-in-Depth-Modelle.",
        color: "#EF4444",
        dotColor: "bg-red-500",
        borderHover: "hover:border-red-500/40",
        iconBg: "from-red-500/20 to-red-600/5",
        logos: [
            "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/opnsense.svg",
            "https://cdn.simpleicons.org/openvpn/EA7E20",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        ],
        projects: [...opnsenseParts, ...cloudSecurityProjects],
        subcategories: [
            { label: "Enterprise Cloud & Security Lab Erstellung", projects: opnsenseParts },
            { label: "VPN Gateway & Defense-in-Depth", projects: cloudSecurityProjects },
        ],
        planned: ["Azure Cloud Security Lab"],
    },
    {
        id: "homelab",
        label: "Homelab & Linux Labs",
        description: "Raspberry Pi 5 Home-Server mit Docker, Nginx, Cloudflare und Hardware-Upgrades. Dazu Linux Challenge Labs: User Management, Bash Scripting, Log-Archivierung und Text Processing (LPIC-1 Vorbereitung).",
        color: "#22C55E",
        dotColor: "bg-green-500",
        borderHover: "hover:border-green-500/40",
        iconBg: "from-green-500/20 to-green-600/5",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        ],
        projects: [...homelabProjects, ...linuxProjects],
        subcategories: [
            { label: "Homelab Infrastruktur & Services", projects: homelabProjects },
            { label: "Linux Challenge Labs (LPIC-1 Vorbereitung)", projects: linuxProjects },
        ],
        planned: ["Local LLM", "Automation (n8n / Ansible)", "LPIC-1: [Coming Soon]"],
    },
];

// ─── Windows Module Block ────────────────────────────────────────────────────
type WinProject = { path: string; label: string; logo?: string; logos?: string[]; soon?: boolean };
type WinModule  = typeof winModules[number];

const WinModuleBlock = ({ mod }: { mod: WinModule }) => {
    const isSoon = mod.status === "soon";
    return (
        <div
            className="rounded-xl border overflow-hidden flex flex-col"
            style={{
                borderColor: isSoon ? "rgba(255,255,255,0.06)" : `${WIN_BLUE}22`,
                background: isSoon ? "rgba(255,255,255,0.02)" : `${WIN_BLUE}06`,
            }}
        >
            {/* Module Header */}
            <div
                className="px-4 py-3 flex items-center gap-3 border-b"
                style={{ borderColor: isSoon ? "rgba(255,255,255,0.05)" : `${WIN_BLUE}18` }}
            >
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: isSoon ? "rgba(255,255,255,0.04)" : `${WIN_BLUE}15` }}
                >
                    <img src={mod.logo} alt="" className={`w-5 h-5 object-contain ${isSoon ? "opacity-40" : ""}`} />
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                            style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE }}
                        >
                            {mod.subtitle}
                        </span>
                        <span
                            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: mod.badgeBg, color: mod.badgeColor, border: `1px solid ${mod.badgeColor}25` }}
                        >
                            {mod.badge}
                        </span>
                    </div>
                    <p className={`text-xs font-semibold mt-0.5 truncate ${isSoon ? "text-muted-foreground/40" : "text-foreground/85"}`}>
                        {mod.title}
                    </p>
                </div>
            </div>

            {/* Project Links */}
            <div className="flex flex-col py-1.5 px-1.5 gap-0.5 flex-grow">
                {(mod.projects as WinProject[]).map((p) => {
                    const logoSrc = p.logo ?? p.logos?.[0];
                    if (isSoon || p.soon) {
                        return (
                            <div
                                key={p.path}
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg opacity-40"
                            >
                                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    {logoSrc
                                        ? <img src={logoSrc} alt="" className="w-4 h-4 object-contain" />
                                        : <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                    }
                                </div>
                                <span className="text-xs text-muted-foreground/60 flex-grow truncate">{p.label}</span>
                                <span className="text-[8px] border border-white/10 px-1.5 py-0.5 rounded-full text-muted-foreground/40 flex-shrink-0">Bald</span>
                            </div>
                        );
                    }
                    return (
                        <Link
                            key={p.path}
                            to={p.path}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-all duration-150 group/row"
                        >
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                {logoSrc && <img src={logoSrc} alt="" className="w-4 h-4 object-contain" />}
                            </div>
                            <span className="text-xs text-foreground/70 group-hover/row:text-foreground flex-grow truncate transition-colors">
                                {p.label}
                            </span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground/30 group-hover/row:text-primary group-hover/row:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
const Projekte = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const totalProjects = categories.reduce((sum, c) => sum + c.projects.length, 0);
    const totalPlanned  = categories.reduce((sum, c) => sum + (c.planned?.length || 0), 0);

    return (
        <Layout>
            <Helmet>
                <title>IT Portfolio & Labs — Gökhan Zehirlioglu</title>
                <meta name="description" content="Übersicht aller IT-Projekte: Networking, Linux Administration, Cloud & Cybersecurity und Homelab Architecture." />
            </Helmet>

            <section className="min-h-[calc(100vh-5rem)] py-16 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">

                    {/* ── Header ── */}
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-normal mb-4 leading-tight">
                            IT <span className="font-bold gradient-text">Portfolio & Labs</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            Eine strukturierte Übersicht meiner Projekte in den Bereichen Networking,
                            Windows & Azure Administration, Cloud Security und Homelab & Linux Labs.
                        </p>
                        <div className="flex gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{totalProjects}</span>
                                <span className="text-sm text-muted-foreground">Projekte</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">{totalPlanned}</span>
                                <span className="text-sm text-muted-foreground">In Planung</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">{categories.length}</span>
                                <span className="text-sm text-muted-foreground">Kategorien</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Category Cards ── */}
                    <div className="flex flex-col gap-6">
                        {categories.map((cat) => {
                            const isExpanded = expandedId === cat.id;
                            const isWindows  = cat.id === "windows";
                            const projectList = (cat as { subcategories?: { label: string | null; projects: { path: string; label: string; logos: string[] }[] }[] }).subcategories
                                ?? [{ label: null, projects: cat.projects as { path: string; label: string; logos: string[] }[] }];

                            return (
                                <div
                                    key={cat.id}
                                    className={`rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 ${cat.borderHover} ${isExpanded ? "shadow-lg" : ""}`}
                                    style={isExpanded ? { borderColor: `${cat.color}30` } : {}}
                                >
                                    {/* Card Header — clickable */}
                                    <button
                                        onClick={() => toggle(cat.id)}
                                        className="w-full flex items-center gap-5 p-6 md:p-7 text-left group"
                                    >
                                        {/* Logo cluster */}
                                        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${cat.iconBg} border border-border/30 flex items-center justify-center gap-2 p-3`}>
                                            {cat.logos.map((logo, i) => (
                                                <img
                                                    key={i}
                                                    src={logo}
                                                    alt=""
                                                    className="w-7 h-7 md:w-8 md:h-8 object-contain"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                />
                                            ))}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2.5 mb-1">
                                                <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                                                <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                                    {cat.label}
                                                </h2>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                                {cat.description}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs font-medium text-primary">{cat.projects.length} Projekte</span>
                                                {cat.planned && cat.planned.length > 0 && (
                                                    <span className="text-xs text-muted-foreground/50">{cat.planned.length} geplant</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex-shrink-0">
                                            <ChevronDown
                                                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                                                    isExpanded ? "rotate-180 text-primary" : "group-hover:text-primary"
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    {/* Expandable Content */}
                                    <div
                                        className="overflow-hidden transition-all duration-500 ease-in-out"
                                        style={{ maxHeight: isExpanded ? "2000px" : "0", opacity: isExpanded ? 1 : 0 }}
                                    >
                                        <div className="px-6 md:px-7 pb-6 pt-0 border-t border-border/30">

                                            {/* ── WINDOWS: 4-Module Grid ── */}
                                            {isWindows ? (
                                                <div className="mt-4">
                                                    {/* Quick-link to Windows overview */}
                                                    <Link
                                                        to="/microsoft-projekte"
                                                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors mb-4 group/ov"
                                                    >
                                                        <img src={WIN_LOGO} alt="" className="w-3.5 h-3.5 object-contain opacity-50 group-hover/ov:opacity-100" />
                                                        Alle Microsoft-Projekte anzeigen
                                                        <ArrowRight className="w-3 h-3 group-hover/ov:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                                        {winModules.map((mod) => (
                                                            <WinModuleBlock key={mod.num} mod={mod} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                /* ── GENERIC: subcategory rows ── */
                                                <>
                                                    {projectList.map((group, gi) => (
                                                        <div key={gi} className={gi > 0 ? "mt-5" : "mt-4"}>
                                                            {group.label && (
                                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2 pl-1">
                                                                    {group.label}
                                                                </h3>
                                                            )}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                {group.projects.map((project) => (
                                                                    <Link
                                                                        key={project.path}
                                                                        to={project.path}
                                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/50 border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group/link"
                                                                    >
                                                                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                                            <img src={project.logos[0]} alt="" className="w-5 h-5 object-contain" />
                                                                        </div>
                                                                        <span className="flex-grow text-sm font-medium text-foreground/80 group-hover/link:text-foreground truncate">
                                                                            {project.label}
                                                                        </span>
                                                                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/link:text-primary group-hover/link:translate-x-0.5 transition-all flex-shrink-0" />
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Planned items */}
                                                    {cat.planned && cat.planned.length > 0 && (
                                                        <div className="mt-4 pt-3 border-t border-border/20">
                                                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 pl-1">Geplant</span>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {cat.planned.map((item, i) => (
                                                                    <span key={i} className="text-xs text-muted-foreground/40 border border-border/30 px-3 py-1.5 rounded-full">
                                                                        {item}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Projekte;
