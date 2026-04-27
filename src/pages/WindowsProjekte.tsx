import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { windowsModul1Projects, windowsModul2Projects } from "@/data/portfolio";
import { ArrowRight, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const WIN_BLUE = "#0078D4";

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
                            <span style={{ color: WIN_BLUE }}>
                                <Monitor size={28} />
                            </span>
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                Microsoft Enterprise IT
                            </h1>
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

                        {/* Module Label */}
                        <div
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
                            style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}
                        >
                            Modul 1: Client OS Lifecycle &amp; Deployment
                        </div>

                        {/* ── Modul 1 Projects ── */}
                        <div className="flex flex-col gap-4">
                            {windowsModul1Projects.map((project, index) => (
                                <Link
                                    key={index}
                                    to={project.path}
                                    className="group relative bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#202020] flex flex-col items-start"
                                    style={{ borderColor: undefined }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}50`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                                >
                                    <div className="p-6 flex flex-col md:flex-row items-start gap-6 w-full relative z-10">
                                        <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-32 h-24 group-hover:bg-white/10 transition-colors">
                                            {project.logos && project.logos[0] ? (
                                                <img src={project.logos[0]} alt="Tech Logo" className="w-16 h-16 object-contain" />
                                            ) : (
                                                <Monitor size={32} className="text-slate-500" />
                                            )}
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
                                            <ArrowRight size={20} className="text-slate-600 group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE } as React.CSSProperties} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${WIN_BLUE}, transparent)` }} />
                                </Link>
                            ))}

                            {/* Coming Soon — Modul 1 */}
                            {["Projekt 03: Golden Image", "Projekt 04: Deployment"].map((label) => (
                                <div key={label} className="relative bg-[#161616] border border-white/5 rounded-lg p-6 flex items-center gap-4 opacity-50">
                                    <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-32 h-24">
                                        <Monitor size={28} className="text-slate-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono text-slate-600 block mb-1">In Bearbeitung</span>
                                        <h2 className="text-base font-bold text-slate-600">{label}</h2>
                                    </div>
                                    <span className="ml-auto text-xs border border-white/10 text-slate-600 px-3 py-1 rounded-full">Bald verfügbar</span>
                                </div>
                            ))}
                        </div>

                        {/* ── Modul 2 ── */}
                        <div
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mt-12 mb-6"
                            style={{ background: `${WIN_BLUE}18`, color: WIN_BLUE, border: `1px solid ${WIN_BLUE}30` }}
                        >
                            Modul 2: Identity &amp; Server Administration
                        </div>

                        <div className="flex flex-col gap-4">
                            {windowsModul2Projects.map((project, index) => (
                                <Link
                                    key={index}
                                    to={project.path}
                                    className="group relative bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#202020] flex flex-col items-start"
                                    style={{ borderColor: undefined }}
                                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${WIN_BLUE}50`)}
                                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                                >
                                    <div className="p-6 flex flex-col md:flex-row items-start gap-6 w-full relative z-10">
                                        <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-32 h-24 group-hover:bg-white/10 transition-colors">
                                            {project.logos && project.logos[0] ? (
                                                <img src={project.logos[0]} alt="Tech Logo" className="w-16 h-16 object-contain" />
                                            ) : (
                                                <Monitor size={32} className="text-slate-500" />
                                            )}
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
                                            <ArrowRight size={20} className="text-slate-600 group-hover:translate-x-1 transition-transform" style={{ color: WIN_BLUE } as React.CSSProperties} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${WIN_BLUE}, transparent)` }} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default WindowsProjekte;
