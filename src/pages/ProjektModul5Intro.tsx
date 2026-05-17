import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { ArrowRight, Network, GitMerge, Shield, Users, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const C = "#0078D4";
const AZ = "#00BCF2";

const parts = [
    {
        id: 1,
        path: "/projekt/windows/modul-5/part-1",
        title: "Vertrauensstellungen & Standort-Topologie",
        sub: "Forest Trusts, Child Domains, DNS-Zonenübertragung, Selective Authentication, Sites & Replication — Enterprise AD Multi-Forest-Architektur.",
        Icon: GitMerge,
        tags: ["Forest Trust", "AD Sites", "Replikation"],
        status: "Fertig",
    },
    {
        id: 2,
        path: "#",
        title: "Coming Soon",
        sub: "Weitere Themen werden ergänzt.",
        Icon: Shield,
        tags: ["Demnächst"],
        status: "Coming Soon",
    },
    {
        id: 3,
        path: "#",
        title: "Coming Soon",
        sub: "Weitere Themen werden ergänzt.",
        Icon: Users,
        tags: ["Demnächst"],
        status: "Coming Soon",
    },
    {
        id: 4,
        path: "#",
        title: "Coming Soon",
        sub: "Weitere Themen werden ergänzt.",
        Icon: Network,
        tags: ["Demnächst"],
        status: "Coming Soon",
    },
    {
        id: 5,
        path: "#",
        title: "Coming Soon",
        sub: "Weitere Themen werden ergänzt.",
        Icon: Layers,
        tags: ["Demnächst"],
        status: "Coming Soon",
    },
];

const ProjektModul5Intro = () => (
    <Layout>
        <Helmet>
            <title>Modul 5 — Enterprise Active Directory Administration — Gökhan Zehirlioglu</title>
            <meta name="description" content="Enterprise AD Administration — Multi-Forest Trusts, Standorttopologie, Replikation und Single-Administrator-Szenarien." />
        </Helmet>

        {/* ══════════ HERO ══════════ */}
        <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #020C18 0%, #061525 50%, #091E3A 100%)" }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.18) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-40px] left-[-40px] w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,188,242,0.08) 0%, transparent 70%)" }} />

            <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
                    <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                    <span className="opacity-40">&rsaquo;</span>
                    <span style={{ color: AZ }} className="font-medium">Modul 5: Enterprise AD Administration</span>
                </nav>

                <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>In Progress</span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>5 Parts</span>
                </div>

                <h1 className="text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-tight mb-3">
                    Enterprise AD<br /><span style={{ color: AZ }}>Administration</span>
                </h1>
                <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[620px] mb-8">
                    Fortgeschrittene Active Directory Administration — Multi-Forest Vertrauensstellungen,
                    DNS-Namensauflösung zwischen Gesamtstrukturen, Standorttopologie, Replikationssteuerung
                    und Single-Administrator-Szenarien in komplexen Unternehmensumgebungen.
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {["Forest Trust", "Child Domain", "DNS-Zonenübertragung", "Selective Auth", "AD Sites & Services", "Replikation", "Bridgeheadserver", "UPN-Routing"].map(tag => (
                        <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "#ffffff08", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>{tag}</span>
                    ))}
                </div>
            </div>
        </header>

        {/* ══════════ CONTENT ══════════ */}
        <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
            <div className="max-w-[820px] mx-auto px-6 py-12">

                {/* Parts Grid */}
                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Projektstruktur — 5 Parts</span>
                        <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                    </div>

                    <div className="flex flex-col gap-4">
                        {parts.map((p) => {
                            const inner = (
                                <div className="group flex items-start gap-5 p-5 rounded-xl border transition-all duration-300"
                                    style={{ background: "#0D1A2D", borderColor: p.status === "Fertig" ? `${C}40` : `${C}18`, opacity: p.status === "Coming Soon" ? 0.55 : 1 }}>
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg mt-0.5" style={{ background: `${C}15` }}>
                                        <p.Icon size={18} style={{ color: AZ }} />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${C}18`, color: C }}>Part {p.id}</span>
                                            {p.tags.map(t => (
                                                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "#ffffff08", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                                            ))}
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto"
                                                style={p.status === "Fertig"
                                                    ? { background: "#00C85210", color: "#00C852", border: "1px solid #00C85230" }
                                                    : { background: "#00BCF210", color: AZ, border: "1px solid #00BCF220" }}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{p.title}</h3>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">{p.sub}</p>
                                    </div>
                                    <ArrowRight size={16} className="flex-shrink-0 self-center group-hover:translate-x-1 transition-transform" style={{ color: `${C}60` }} />
                                </div>
                            );

                            return p.status === "Coming Soon" ? (
                                <div key={p.id} className="cursor-default select-none">{inner}</div>
                            ) : (
                                <Link
                                    key={p.id}
                                    to={p.path}
                                    style={{ textDecoration: "none" }}
                                    onMouseEnter={e => { const card = e.currentTarget.querySelector<HTMLElement>(".group"); if (card) card.style.borderColor = `${C}55`; }}
                                    onMouseLeave={e => { const card = e.currentTarget.querySelector<HTMLElement>(".group"); if (card) card.style.borderColor = `${C}40`; }}
                                >
                                    {inner}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Back */}
                <div className="pt-6 border-t" style={{ borderColor: `${C}20` }}>
                    <a href="/windows-projekte" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Microsoft Enterprise IT Übersicht</a>
                </div>
            </div>
        </div>
    </Layout>
);

export default ProjektModul5Intro;
