import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScenarioOverview from "@/components/ScenarioOverview";
import Modul4PartRuler from "@/components/Modul4PartRuler";
import { Clock, User, Monitor, Calendar } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const plannedSections = [
    { id: "scope",       label: "01 — Scope & Ziele" },
    { id: "workspace",   label: "02 — Log Analytics Workspace & Sentinel aktivieren" },
    { id: "connectors",  label: "03 — Data Connectors (Entra ID, Defender, Windows)" },
    { id: "rules",       label: "04 — Analytics Rules & Alert-Schwellwerte" },
    { id: "playbooks",   label: "05 — Automation Playbooks (Logic Apps)" },
    { id: "hunting",     label: "06 — Threat Hunting mit KQL-Queries" },
    { id: "validation",  label: "07 — Incident-Simulation, Validierung & Nachweise" },
];

const techStack = [
    { k: "Dienst",       v: "Microsoft Sentinel (Cloud-natives SIEM/SOAR)" },
    { k: "Datenquellen", v: "Entra ID, Defender for Endpoint, Windows Security Events" },
    { k: "Abfragesprache",v: "KQL — Kusto Query Language" },
    { k: "Automation",   v: "Logic Apps Playbooks — automatisierte Incident Response" },
    { k: "Hunting",      v: "Threat Hunting Queries & MITRE ATT&CK Mapping" },
    { k: "Unternehmen",  v: "Rhein-Neckar Solutions GmbH" },
];

const ProjektModul4Part5 = () => (
    <Layout>
        <Helmet>
            <title>Modul 4 — Part 5: Microsoft Sentinel & SIEM — Gökhan Zehirlioglu</title>
            <meta name="description" content="Cloud-natives SIEM mit Microsoft Sentinel aufbauen — Log Analytics, Analytics Rules, Playbooks und Threat Hunting." />
        </Helmet>

        <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #030D1A 0%, #071628 50%, #0A2040 100%)" }}>
            <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)" }} />
            <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
                    <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                    <span className="opacity-40">&rsaquo;</span>
                    <a href="/projekt/windows/modul-4" className="hover:text-white transition-colors">Modul 4: Cloud Security & Compliance</a>
                    <span className="opacity-40">&rsaquo;</span>
                    <span style={{ color: AZ }} className="font-medium">Part 5</span>
                </nav>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>In Progress</span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 4 / Part 5</span>
                </div>
                <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                    Microsoft Sentinel<br /><span style={{ color: AZ }}>&amp; SIEM</span>
                </h1>
                <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[580px] mb-8">
                    Cloud-natives SIEM aufbauen: Log Analytics Workspace, Data Connectors für alle Dienste,
                    Analytics Rules, automatisierte Playbooks und Threat Hunting mit KQL.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2 text-[13px] text-white/60"><Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">2026 — In Bearbeitung</strong></div>
                    <div className="flex items-center gap-2 text-[13px] text-white/60"><Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Sentinel</strong>&nbsp;+ Log Analytics</div>
                    <div className="flex items-center gap-2 text-[13px] text-white/60"><User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong></div>
                </div>
                <Modul4PartRuler currentPart={5} />
            </div>
        </header>

        <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
            <div className="max-w-[820px] mx-auto px-6 py-12">
                <section className="mb-10"><ScenarioOverview compact /></section>

                <div className="rounded-xl p-5 mb-10 flex items-start gap-4 border" style={{ background: "#0D1A2D", borderColor: `${C}30` }}>
                    <Clock size={20} style={{ color: AZ }} className="flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-white mb-1">Dokumentation in Bearbeitung</p>
                        <p className="text-[13px] text-slate-400 leading-relaxed">Dieses Lab befindet sich aktuell in der Durchführungsphase. Die vollständige Dokumentation wird nach Abschluss hier veröffentlicht.</p>
                    </div>
                </div>

                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Systemkonfiguration</span>
                        <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                    </div>
                    <table className="w-full border-separate border-spacing-0 border rounded-xl overflow-hidden shadow-sm" style={{ borderColor: "#0078D425" }}>
                        <thead>
                            <tr>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Eigenschaft</th>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Wert</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techStack.map(({ k, v }, i) => (
                                <tr key={k} style={{ background: i % 2 === 0 ? "#081422" : "#0A1830" }}>
                                    <td className="px-5 py-2.5 text-[13px] font-semibold" style={{ color: AZ, borderBottom: "1px solid #0078D415" }}>{k}</td>
                                    <td className="px-5 py-2.5 text-sm text-slate-300" style={{ borderBottom: "1px solid #0078D415" }}>{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>Geplante Abschnitte</span>
                        <div className="flex-1 h-px" style={{ background: `${C}20` }} />
                    </div>
                    <div className="flex flex-col gap-2">
                        {plannedSections.map((s) => (
                            <div key={s.id} className="flex items-center gap-4 px-5 py-3.5 rounded-xl border" style={{ background: "#0D1A2D", borderColor: "#0078D418" }}>
                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: `${C}40` }} />
                                <span className="text-sm text-slate-400">{s.label}</span>
                                <span className="ml-auto text-[10px] px-2.5 py-0.5 rounded-full font-medium" style={{ background: "#0078D415", color: `${C}80`, border: `1px solid ${C}20` }}>Coming Soon</span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "#0078D420" }}>
                    <a href="/projekt/windows/modul-4/part-4" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Part 4: Defender for Endpoint</a>
                    <a href="/projekt/windows/modul-4" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>Modul 4 Übersicht →</a>
                </div>
            </div>
        </div>
    </Layout>
);

export default ProjektModul4Part5;
