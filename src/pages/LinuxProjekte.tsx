import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { linuxProjects } from "@/data/portfolio";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const LinuxProjekte = () => {
    return (
        <Layout>
            <Helmet>
                <title>Linux Projekte - Gökhan Zehirlioglu</title>
                <meta name="description" content="Übersicht meiner Linux-Administrations- und System-Engineering-Projekte." />
            </Helmet>

            <div className="min-h-screen bg-[#111111] text-slate-300">
                <section className="py-12 px-4 md:px-6 relative overflow-hidden">
                    {/* Subtle Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-900/10 via-[#111111] to-[#111111] pointer-events-none" />

                    <div className="max-w-4xl mx-auto relative z-10">

                        {/* Header Link */}
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                            <span className="text-orange-500">
                                <Terminal size={28} />
                            </span>
                            <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                                ~/linux-projekte
                            </h1>
                        </div>

                        <div className="mb-10 text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed font-mono">
                            <p>
                                <span className="text-orange-500 mr-2">$</span>
                                Hier finden Sie eine Sammlung meiner Linux-Projekte.
                                Klicken Sie auf die jeweiligen Karten, um detaillierte Informationen, Skripte und Dokumentationen zu erhalten.
                            </p>
                        </div>

                        {/* Projects List Container (Vertical Rectangles) */}
                        <div className="flex flex-col gap-4">
                            {linuxProjects.map((project, index) => (
                                <Link
                                    key={index}
                                    to={project.path}
                                    className="group relative bg-[#1a1a1a] border border-white/5 rounded-lg overflow-hidden hover:border-orange-500/50 hover:bg-[#202020] transition-all duration-300 hover:shadow-xl flex flex-col items-start"
                                >
                                    <div className="p-6 flex flex-col md:flex-row items-start gap-6 w-full relative z-10 bg-[#1a1a1a] group-hover:bg-[#202020] transition-colors">
                                        {/* Logo Section */}
                                        <div className="flex-shrink-0 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 w-16 h-16 group-hover:bg-white/10 transition-colors">
                                            {project.logos && project.logos[0] ? (
                                                <img src={project.logos[0]} alt="Tech Logo" className="w-10 h-10 object-contain" />
                                            ) : (
                                                <Terminal size={24} className="text-slate-500" />
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-mono">
                                                    {project.label}
                                                </h3>
                                                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-orange-500 group-hover:translate-x-2 transition-all block md:hidden" />
                                            </div>

                                            <p className="text-slate-400 text-sm leading-relaxed mb-3">
                                                {project.description}
                                            </p>

                                            {/* Footer Stats */}
                                            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                                                    Active
                                                </span>
                                                <span className="text-slate-600">|</span>
                                                <span>drwx------</span>
                                                <span className="text-slate-600">|</span>
                                                <span>root:root</span>
                                            </div>
                                        </div>

                                        {/* Desktop Arrow */}
                                        <div className="hidden md:flex flex-shrink-0 self-center">
                                            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </div>

                                    {/* TERMINAL PREVIEW OVERLAY (Slide Down on Hover) */}
                                    {project.previewScript && (
                                        <div className="w-full max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden bg-[#0f111a] border-t border-white/5">
                                            <div className="p-4 font-mono text-xs">
                                                <div className="flex items-center gap-2 mb-2 text-slate-500 border-b border-white/5 pb-2">
                                                    <Terminal size={12} />
                                                    <span>quick-preview.sh</span>
                                                </div>
                                                <div className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                                                    {project.previewScript}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>

                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default LinuxProjekte;
