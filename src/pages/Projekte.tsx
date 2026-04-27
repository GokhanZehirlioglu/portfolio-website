import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
    linuxProjects,
    ciscoProjects,
    windowsModul1Projects,
    windowsModul2Projects,
    homelabProjects,
    cloudSecurityProjects,
} from "@/data/portfolio";

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
        id: "sysadmin",
        label: "System & Server Administration",
        description: "Linux-Ökosystem (LPIC-1, Bash Scripting, User-Management, Log-Archivierung) und Microsoft Enterprise IT (Active Directory, GPO, DHCP, Endpoint Hardening).",
        color: "#F97316",
        dotColor: "bg-orange-500",
        borderHover: "hover:border-orange-500/40",
        iconBg: "from-orange-500/20 to-orange-600/5",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
        ],
        projects: [...linuxProjects, ...windowsModul1Projects, ...windowsModul2Projects],
        subcategories: [
            { label: "Linux Ecosystem (LPIC-1 & Bash)", projects: linuxProjects },
            { label: "Microsoft — Modul 1: Client OS Lifecycle", projects: windowsModul1Projects },
            { label: "Microsoft — Modul 2: Identity & Server Admin", projects: windowsModul2Projects },
        ],
        planned: ["LPIC-1: [Coming Soon]", "Projekt 03: Golden Image", "Projekt 04: Deployment"],
    },
    {
        id: "cloud",
        label: "Cloud & Security",
        description: "Sichere Fernzugriffs-Architekturen, VPN-Tunneling, Firewalling und Defense-in-Depth-Modelle. Zukünftig: OPNsense Enterprise Lab und Azure Cloud Security.",
        color: "#EF4444",
        dotColor: "bg-red-500",
        borderHover: "hover:border-red-500/40",
        iconBg: "from-red-500/20 to-red-600/5",
        logos: [
            "https://cdn.simpleicons.org/openvpn/EA7E20",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        ],
        projects: cloudSecurityProjects,
        planned: ["OPNsense Enterprise Security Lab Part 1-6", "Azure Cloud Security Lab"],
    },
    {
        id: "homelab",
        label: "Homelab Architecture",
        description: "Raspberry Pi 5 basiertes Home-Server-Setup mit Docker-Containern, Smart Home Automation, Nginx Web-Server, Cloudflare Tunneling und Hardware-Upgrades.",
        color: "#22C55E",
        dotColor: "bg-green-500",
        borderHover: "hover:border-green-500/40",
        iconBg: "from-green-500/20 to-green-600/5",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        ],
        projects: homelabProjects,
        planned: ["Local LLM", "Automation (n8n / Ansible)"],
    },
];

// ═══════════════════════════════════════════════════════════════════════════════
const Projekte = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const totalProjects = categories.reduce((sum, c) => sum + c.projects.length, 0);
    const totalPlanned = categories.reduce((sum, c) => sum + (c.planned?.length || 0), 0);

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
                            Eine strukturierte Übersicht meiner Projekte in den Bereichen Netzwerk,
                            Linux, Cloud-Sicherheit und Homelab-Infrastruktur.
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
                                <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">4</span>
                                <span className="text-sm text-muted-foreground">Kategorien</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Category Cards ── */}
                    <div className="flex flex-col gap-6">
                        {categories.map((cat) => {
                            const isExpanded = expandedId === cat.id;
                            const projectList = cat.subcategories || [{ label: null, projects: cat.projects }];

                            return (
                                <div
                                    key={cat.id}
                                    className={`rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 ${cat.borderHover} ${
                                        isExpanded ? "shadow-lg" : ""
                                    }`}
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
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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
                                        style={{
                                            maxHeight: isExpanded ? "2000px" : "0",
                                            opacity: isExpanded ? 1 : 0,
                                        }}
                                    >
                                        <div className="px-6 md:px-7 pb-6 pt-0 border-t border-border/30">
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
                                                            <span
                                                                key={i}
                                                                className="text-xs text-muted-foreground/40 border border-border/30 px-3 py-1.5 rounded-full"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
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
