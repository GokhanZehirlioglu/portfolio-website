import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { windowsModul1Projects, windowsModul2Projects } from "@/data/portfolio";
import {
    ArrowRight, Monitor,
    Server, GitBranch, Lock, ShieldCheck, Cloud,
    Smartphone, ShieldAlert, KeyRound, Bug, Eye,
    GitMerge,
} from "lucide-react";
import { Link } from "react-router-dom";

const WIN_BLUE = "#0078D4";
const AZ = "#00BCF2";

const modul3Parts = [
    { path: "/projekt/windows/modul-3/part-1", label: "Part 1: DC-Deployment & AD-Standortarchitektur", Icon: Server },
    { path: "/projekt/windows/modul-3/part-2", label: "Part 2: PKI · LAPS · GPO Security Hardening",   Icon: Lock },
    { path: "/projekt/windows/modul-3/part-3", label: "Part 3: Entra Tenant & Provisioning Agent",      Icon: Cloud },
    { path: "/projekt/windows/modul-3/part-4", label: "Part 4: Cloud Sync & Validation",                Icon: ShieldCheck },
    { path: "/projekt/windows/modul-3/part-5", label: "Part 5: Coming Soon",                            Icon: GitBranch },
];

const modul4Parts = [
    { path: "/projekt/windows/modul-4/part-1", label: "Part 1: Microsoft Intune & MDM",               Icon: Smartphone },
    { path: "/projekt/windows/modul-4/part-2", label: "Part 2: Conditional Access & MFA",             Icon: ShieldAlert },
    { path: "/projekt/windows/modul-4/part-3", label: "Part 3: Privileged Identity Management (PIM)", Icon: KeyRound },
    { path: "/projekt/windows/modul-4/part-4", label: "Part 4: Microsoft Defender for Endpoint",      Icon: Bug },
    { path: "/projekt/windows/modul-4/part-5", label: "Part 5: Microsoft Sentinel & SIEM",            Icon: Eye },
];

const modul5Parts = [
    { path: "/projekt/windows/modul-5/part-1", label: "Part 1: Vertrauensstellungen & Standort-Topologie", Icon: GitMerge },
    { path: "/projekt/windows/modul-5/part-2", label: "Part 2: AD-Zertifikatdienste & PKI",               Icon: ShieldCheck },
];

/* ── Reusable Part Row ── */
const PartRow = ({ path, label, Icon, badge = "In Progress" }: {
    path: string; label: string; Icon: React.ElementType; badge?: string;
}) => (
    <Link
        to={path}
        className="group flex items-center gap-4 px-4 py-3 rounded-lg border transition-all duration-200"
        style={{ background: "#0A1525", borderColor: `${WIN_BLUE}18` }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}45`)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}18`)}
    >
        <span className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: `${WIN_BLUE}15` }}>
            <Icon size={14} style={{ color: AZ }} />
        </span>
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-grow">{label}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#00BCF210", color: AZ, border: "1px solid #00BCF220" }}>{badge}</span>
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" style={{ color: `${WIN_BLUE}60` }} />
    </Link>
);

const WindowsProjekte = () => {
    return (
        <Layout>
            <Helmet>
                <title>Microsoft Windows Projekte – Gökhan Zehirlioglu</title>
                <meta name="description" content="Microsoft Enterprise IT – Client OS Lifecycle, Deployment und Administration Projekte." />
            </Helmet>

            <div className="min-h-screen bg-[#111111] text-slate-300">
                <section className="py-12 px-4 md:px-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#111111] to-[#111111] pointer-events-none" />

                    <div className="max-w-4xl mx-auto relative z-10">

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2 pb-4 border-b border-white/5">
                            <span style={{ color: WIN_BLUE }}><Monitor size={28} /></span>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Microsoft Enterprise IT</h1>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 mt-3">
                            <span>System & Server Administration</span>
                            <span className="opacity-40">›</span>
                            <span style={{ color: WIN_BLUE }} className="font-medium">Microsoft Enterprise IT</span>
                        </div>

                        <div className="mb-10 text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
                            <p>
                                Dokumentation von Windows-Administrationsprojekten im Schulungsumfeld –
                                Client OS Lifecycle, Deployment und Enterprise-Management mit Hyper-V.
                            </p>
                        </div>

                        {/* ══ Modul 1 ══ */}
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
                            style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}>
                            Modul 1: Client OS Lifecycle &amp; Deployment
                        </div>

                        <div className="flex flex-col gap-4">
                            {windowsModul1Projects.map((project, index) => (
                                <Link key={index} to={project.path}
                                    className="group relative bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#202020] flex flex-col items-start"
                                    style={{ borderColor: undefined }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}50`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                                >
                                    <div className="p-6 flex flex-col md:flex-row items-start gap-6 w-full relative z-10">
                                        <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-32 h-24 group-hover:bg-white/10 transition-colors">
                                            {project.logos?.[0] ? <img src={project.logos[0]} alt="Tech Logo" className="w-16 h-16 object-contain" /> : <Monitor size={32} className="text-slate-500" />}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${WIN_BLUE}20`, color: WIN_BLUE }}>
                                                    {`Projekt ${String(index + 1).padStart(2, "0")}`}
                                                </span>
                                            </div>
                                            <h2 className="text-lg font-bold text-white mb-2 truncate group-hover:text-blue-300 transition-colors">{project.label}</h2>
                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{project.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 self-center">
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE }} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${WIN_BLUE}, transparent)` }} />
                                </Link>
                            ))}
                        </div>

                        {/* ══ Modul 2 ══ */}
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mt-12 mb-6"
                            style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}>
                            Modul 2: Identity &amp; Server Administration
                        </div>

                        <div className="flex flex-col gap-4">
                            {windowsModul2Projects.map((project, index) => (
                                <Link key={index} to={project.path}
                                    className="group relative bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#202020] flex flex-col items-start"
                                    style={{ borderColor: undefined }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}50`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                                >
                                    <div className="p-6 flex flex-col md:flex-row items-start gap-6 w-full relative z-10">
                                        <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-32 h-24 group-hover:bg-white/10 transition-colors">
                                            {project.logos?.[0] ? <img src={project.logos[0]} alt="Tech Logo" className="w-16 h-16 object-contain" /> : <Monitor size={32} className="text-slate-500" />}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${WIN_BLUE}20`, color: WIN_BLUE }}>
                                                    {`Projekt ${String(index + 5).padStart(2, "0")}`}
                                                </span>
                                            </div>
                                            <h2 className="text-lg font-bold text-white mb-2 truncate group-hover:text-blue-300 transition-colors">{project.label}</h2>
                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{project.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 self-center">
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE }} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${WIN_BLUE}, transparent)` }} />
                                </Link>
                            ))}
                        </div>

                        {/* ══ Modul 3 & 4 — Side by Side ══ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">


                            {/* ── Modul 3 ── */}
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-3"
                                    style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}>
                                    Modul 3: Hybrid Identity &amp; Azure
                                </div>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                    Enterprise Hybrid-Identity mit Entra ID, AD CS, LAPS und Cloud Sync — aktuell in Bearbeitung.
                                </p>

                                {/* Modul 3 Overview Card */}
                                <Link to="/projekt/windows/modul-3"
                                    className="group relative bg-[#0D1A2D] border rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#0F1F35] flex flex-col items-start mb-3"
                                    style={{ borderColor: `${WIN_BLUE}30` }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}60`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}30`)}
                                >
                                    <div className="p-4 flex items-start gap-4 w-full">
                                        <div className="flex-shrink-0 flex items-center justify-center rounded-lg border w-14 h-12" style={{ background: `${WIN_BLUE}10`, borderColor: `${WIN_BLUE}25` }}>
                                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure" className="w-8 h-8 object-contain" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${WIN_BLUE}20`, color: WIN_BLUE }}>Übersicht</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#00BCF220", color: AZ }}>In Progress</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-400">5 Parts</span>
                                            </div>
                                            <h2 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Modul 3 — Hybrid Identity & Azure</h2>
                                            <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">DC-Deployment, PKI, Entra Tenant, Cloud Sync</p>
                                        </div>
                                        <div className="flex-shrink-0 self-center">
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE }} />
                                        </div>
                                    </div>
                                </Link>

                                {/* Modul 3 Part Rows */}
                                <div className="flex flex-col gap-2 pl-4 border-l-2" style={{ borderColor: `${WIN_BLUE}25` }}>
                                    {modul3Parts.map(p => <PartRow key={p.path} {...p} />)}
                                </div>
                            </div>

                            {/* ── Modul 4 ── */}
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-3"
                                    style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}>
                                    Modul 4: Cloud Security &amp; Compliance
                                </div>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                    Zero-Trust in Microsoft 365 & Azure — Intune, Defender, Sentinel, PIM und Conditional Access.
                                </p>

                                {/* Modul 4 Overview Card */}
                                <Link to="/projekt/windows/modul-4"
                                    className="group relative bg-[#0D1A2D] border rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#0F1F35] flex flex-col items-start mb-3"
                                    style={{ borderColor: `${WIN_BLUE}30` }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}60`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}30`)}
                                >
                                    <div className="p-4 flex items-start gap-4 w-full">
                                        <div className="flex-shrink-0 flex items-center justify-center rounded-lg border w-14 h-12" style={{ background: `${WIN_BLUE}10`, borderColor: `${WIN_BLUE}25` }}>
                                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure Security" className="w-8 h-8 object-contain" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${WIN_BLUE}20`, color: WIN_BLUE }}>Übersicht</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-400">Coming Soon</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-400">5 Parts</span>
                                            </div>
                                            <h2 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Modul 4 — Cloud Security & Compliance</h2>
                                            <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">Intune, Conditional Access, PIM, Defender & Sentinel</p>
                                        </div>
                                        <div className="flex-shrink-0 self-center">
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE }} />
                                        </div>
                                    </div>
                                </Link>

                                {/* Modul 4 Part Rows — Coming Soon */}
                                <div className="flex flex-col gap-2 pl-4 border-l-2" style={{ borderColor: `${WIN_BLUE}25` }}>
                                    {modul4Parts.map(p => <PartRow key={p.path} {...p} badge="Coming Soon" />)}
                                </div>
                            </div>

                        </div>

                        {/* ══ Modul 5 — Single Independent Projects ══ */}
                        <div className="mt-10">
                            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-3"
                                style={{ background: "#8B5CF618", color: "#8B5CF6", border: "1px solid #8B5CF630" }}>
                                Modul 5: Enterprise AD Administration
                            </div>
                            <p className="text-sm text-slate-500 mb-4 leading-relaxed max-w-xl">
                                Eigenständige Themen-Projekte — fortgeschrittene Active Directory Administration,
                                Multi-Forest Trusts, Sites &amp; Replication und mehr.
                            </p>
                            <div className="flex flex-col gap-2 pl-4 border-l-2 max-w-xl" style={{ borderColor: "#8B5CF625" }}>
                                {modul5Parts.map(p => (
                                    <Link
                                        key={p.path}
                                        to={p.path}
                                        className="group flex items-center gap-4 px-4 py-3 rounded-lg border transition-all duration-200"
                                        style={{ background: "#1A1735", borderColor: "#8B5CF625" }}
                                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#8B5CF645")}
                                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#8B5CF618")}
                                    >
                                        <span className="w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: "#8B5CF615" }}>
                                            <p.Icon size={14} style={{ color: "#C4B5FD" }} />
                                        </span>
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-grow">{p.label}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#00C85210", color: "#00C852", border: "1px solid #00C85220" }}>Fertig</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" style={{ color: "#8B5CF660" }} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default WindowsProjekte;
