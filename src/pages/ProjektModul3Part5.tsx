import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Modul3PartRuler from "@/components/Modul3PartRuler";
import { Clock, Calendar, Monitor, User, ArrowRight } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const ProjektModul3Part5 = () => (
    <Layout>
        <Helmet>
            <title>Modul 3 — Part 5: Coming Soon — Gökhan Zehirlioglu</title>
            <meta name="description" content="Modul 3 Part 5 — wird in Kürze veröffentlicht." />
        </Helmet>

        <header className="relative overflow-hidden text-white"
            style={{ background: "linear-gradient(135deg, #030D1A 0%, #071628 50%, #0A2040 100%)" }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)" }} />
            <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
                    <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                    <span className="opacity-40">&rsaquo;</span>
                    <a href="/projekt/windows/modul-3" className="hover:text-white transition-colors">Modul 3: Hybrid Identity & Azure</a>
                    <span className="opacity-40">&rsaquo;</span>
                    <span style={{ color: AZ }} className="font-medium">Part 5</span>
                </nav>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                        style={{ background: "#ffffff10", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)" }}>Coming Soon</span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                        style={{ background: "#ffffff10", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 3 / Part 5</span>
                </div>
                <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3 text-white/60">
                    Part 5<br /><span style={{ color: `${AZ}60` }}>Coming Soon</span>
                </h1>
                <p className="text-[1.05rem] font-light text-white/40 leading-relaxed max-w-[580px] mb-8">
                    Dieser Abschnitt befindet sich noch in Planung und wird in Kürze veröffentlicht.
                </p>
                <div className="flex flex-wrap gap-6 mb-8 opacity-50">
                    <div className="flex items-center gap-2 text-[13px] text-white/60">
                        <Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">2026</strong>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-white/60">
                        <Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Hyper-V + Azure</strong>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-white/60">
                        <User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong>
                    </div>
                </div>
                <Modul3PartRuler currentPart={5} />
            </div>
        </header>

        <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-[60vh] flex flex-col">
            <div className="max-w-[820px] mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
                    style={{ background: "#0D1A2D", border: `1px solid ${C}20` }}>
                    <Clock size={36} style={{ color: `${C}50` }} />
                </div>
                <h2 className="text-2xl font-bold text-white/40 mb-4">Inhalt wird vorbereitet</h2>
                <p className="text-[14px] text-slate-600 leading-relaxed max-w-[480px] mb-10">
                    Part 5 von Modul 3 befindet sich derzeit in der Ausarbeitungsphase. Sobald die Dokumentation
                    abgeschlossen ist, wird dieser Abschnitt mit vollständigem Inhalt und Screenshots veröffentlicht.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <a href="/projekt/windows/modul-3/part-4"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={{ background: "#0D1A2D", color: "#7A8599", border: "1px solid #0078D420", textDecoration: "none" }}>
                        ← Part 4: Cloud Sync & Validation
                    </a>
                    <a href="/projekt/windows/modul-3"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                        style={{ background: C, color: "#fff", textDecoration: "none" }}>
                        Modul 3 Übersicht <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </div>
    </Layout>
);

export default ProjektModul3Part5;
