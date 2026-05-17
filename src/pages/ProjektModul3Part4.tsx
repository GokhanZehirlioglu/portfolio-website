import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import Modul3PartRuler from "@/components/Modul3PartRuler";
import { ArrowRight, ArrowUpRight, Maximize2, Calendar, Monitor, User } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const IMG = "/images/microsoft/microsoft modül3/";
const DOC_URL = "/Microsoft/modül 3 dokumantation/Teil4_CloudSync_Configuration_Validation.docx";

const techStack = [
    { k: "Ziel-Domain",        v: "rns.local → gokhanzehirliogluhotmail.onmicrosoft.com" },
    { k: "Provisioning Agent", v: "DC02_Mannheim.rns.local — Status: aktiv" },
    { k: "Scope",              v: "Ausgewählte Organisationseinheiten (3 Benutzer-OUs)" },
    { k: "Sync-Richtung",      v: "AD → Microsoft Entra ID (One-Way)" },
    { k: "PHS Szenario 1",     v: "Password Hash Synchronization aktiv" },
    { k: "PHS Szenario 2",     v: "Password Hash Synchronization deaktiviert (Isolationstest)" },
    { k: "UPN-Format",         v: "vorname.nachname@gokhanzehirliogluhotmail.onmicrosoft.com" },
];

type FigProps = { src: string; alt: string; caption: string; onClick: () => void };
const Fig = ({ src, alt, caption, onClick }: FigProps) => (
    <figure className="mb-1">
        <div className="group relative cursor-zoom-in overflow-hidden rounded-xl border"
            style={{ borderColor: `${C}25`, background: "#0A1628" }} onClick={onClick}>
            <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md rounded-full p-2"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Maximize2 size={14} className="text-white" />
            </div>
        </div>
        <figcaption className="mt-2 text-[11.5px] text-slate-500 italic leading-snug">{caption}</figcaption>
    </figure>
);

const SectionTitle = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 mb-5 mt-10">
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: C }}>{label}</span>
        <div className="flex-1 h-px" style={{ background: `${C}20` }} />
    </div>
);

const InfoBox = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl p-5 mb-6 border" style={{ background: "#0D1A2D", borderColor: `${C}20` }}>
        {children}
    </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-[12px] px-1.5 py-0.5 rounded" style={{ background: "#0078D415", color: AZ }}>{children}</code>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="rounded-lg px-5 py-4 mb-4 text-[12.5px] font-mono text-slate-300 overflow-x-auto"
        style={{ background: "#040C18", border: "1px solid #0078D420" }}>{children}</pre>
);

const ProjektModul3Part4 = () => {
    const [zoomed, setZoomed] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomed(null), []);
    const zoom = (file: string) => () => setZoomed(`${IMG}${file}`);

    return (
        <Layout>
            <Helmet>
                <title>Modul 3 — Part 4: Cloud Sync & Validation — Gökhan Zehirlioglu</title>
                <meta name="description" content="Cloud-Sync-Konfiguration anlegen, Bereichsfilter auf Benutzer-OUs setzen, UPN prüfen und erste Provisionierungstests durchführen." />
            </Helmet>
            <Lightbox src={zoomed} onClose={closeLightbox} />

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
                        <span style={{ color: AZ }} className="font-medium">Part 4</span>
                    </nav>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>Fertig</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 3 / Part 4</span>
                    </div>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Cloud Sync<br /><span style={{ color: AZ }}>&amp; Validation</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[580px] mb-6">
                        Cloud-Sync-Konfiguration für rns.local anlegen, Bereichsfilter auf die drei Benutzer-OUs (Mannheim, Stuttgart, München) eingrenzen, UPN-Suffixe auf die Entra-Default-Domain migrieren und Provisionierungstests mit und ohne Password Hash Sync durchführen.
                    </p>
                    <div className="flex flex-wrap gap-5 mb-4">
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Nisan 2026</strong>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Hyper-V + Azure</strong>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60">
                            <User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {["Cloud Synchronization", "Entra ID Connect", "Bereichsfilter / Scope", "UPN-Migration", "Password Hash Sync", "Hybrid Identity", "Distinguished Name", "Pilot Rollout"].map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-mono" style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>{t}</span>
                        ))}
                    </div>
                    <Modul3PartRuler currentPart={4} />
                </div>
            </header>

            <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
                <div className="max-w-[820px] mx-auto px-6 py-12">

                    <div className="mb-10">
                        <a href={DOC_URL} download
                            className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: "#0D1A2D", border: `1px solid ${C}30`, color: AZ, textDecoration: "none" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.background = `${C}15`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = `${C}30`; e.currentTarget.style.background = "#0D1A2D"; }}>
                            <ArrowUpRight size={16} />
                            Originaldokumentation herunterladen · DOCX
                        </a>
                    </div>

                    <SectionTitle label="Konfigurationsübersicht" />
                    <table className="w-full border-separate border-spacing-0 border rounded-xl overflow-hidden mb-10" style={{ borderColor: "#0078D425" }}>
                        <thead>
                            <tr>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold"
                                    style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Eigenschaft</th>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold"
                                    style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techStack.map(({ k, v }, i) => (
                                <tr key={k} style={{ background: i % 2 === 0 ? "#081422" : "#0A1830" }}>
                                    <td className="px-5 py-2.5 text-[13px] font-semibold" style={{ color: AZ, borderBottom: "1px solid #0078D415" }}>{k}</td>
                                    <td className="px-5 py-2.5 text-sm text-slate-300 font-mono" style={{ borderBottom: "1px solid #0078D415" }}>{v}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <SectionTitle label="4.1 — Ziel & Designprinzip" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Statt die gesamte Domain auf einmal zu übertragen, wurde ein <strong className="text-white">kontrollierter Pilot-Ansatz (Least Privilege Rollout)</strong> verfolgt. Nur die Benutzer-OUs der drei Standorte kommen in den Cloud-Scope:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                "Nur normale Benutzer-Objekte der drei Standorte",
                                "Computer-Objekte außerhalb des Scopes",
                                "Server-Objekte außerhalb des Scopes",
                                "Admin-Konten außerhalb des Scopes",
                                "Service-Konten außerhalb des Scopes",
                                "Nach Validierung schrittweise erweitern",
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                    style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C }} />
                                    <span className="text-[12.5px] text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    <SectionTitle label="4.2 — Ausgangslage: Entra Admin Center von DC02" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Das Microsoft Entra Admin Center wurde direkt von <strong className="text-white">DC02</strong> aus aufgerufen — als Globaler Administrator. Damit wurde die Ausgangslage bestätigt: Tenant aktiv, Agent registriert, P2-Lizenz vorhanden, Entra Connect aktiviert.
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}Auf Dc02 allgemeine übersicht zu microsoft entra admin Center.png`}
                        alt="Entra Admin Center — Aufruf von DC02"
                        caption="Microsoft Entra Admin Center — aufgerufen direkt von DC02 als Globaler Administrator. Default Directory, 3 Benutzer, Entra Connect aktiviert, Microsoft Entra ID Premium P2 aktiv."
                        onClick={zoom("Auf Dc02 allgemeine übersicht zu microsoft entra admin Center.png")}
                    />

                    <SectionTitle label="4.3 — Cloud-Sync-Konfiguration anlegen" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Im Microsoft Entra Admin Center wurde eine neue Konfiguration für <Code>rns.local</Code> angelegt. Als Agent wurde der auf DC02 registrierte Provisioning Agent gewählt. Zusätzlich wurden zwei Testszenarien definiert — mit und ohne <strong className="text-white">Password Hash Synchronization (PHS)</strong> — zur gezielten Fehler-Isolation.
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}Entra Connect Cloudsynchronisierung  Konfiguration.png`}
                        alt="Cloud Sync Konfiguration rns.local"
                        caption="Microsoft Entra Admin Center — Cloudsynchronisierung | Konfiguration 'rns.local'. Synchronisierungsrichtung: AD → Microsoft Entra ID, Status: Fehlerfrei."
                        onClick={zoom("Entra Connect Cloudsynchronisierung  Konfiguration.png")}
                    />

                    <SectionTitle label="Provisioning Agent — Status" />
                    <Fig
                        src={`${IMG}auf enta admin cneter  cloudsynchronierung rns.local agents.png`}
                        alt="Cloud Sync Agents — DC02 aktiv"
                        caption="Bereich 'rns.local | Agents' — DC02_Mannheim.rns.local, Status: aktiv. Genau ein aktiver Agent — klar definierter Provisioning-Pfad ohne Konkurrenz oder Mehrdeutigkeit."
                        onClick={zoom("auf enta admin cneter  cloudsynchronierung rns.local agents.png")}
                    />

                    <SectionTitle label="4.4 — Bereichsfilter: Scope auf Benutzer-OUs" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Im ersten Versuch wurden die OUs als Friendly Names angegeben — das war falsch. Cloud Sync erwartet das vollständige <strong className="text-white">Distinguished-Name-Format (DN)</strong>:
                        </p>
                        <CodeBlock>{
`OU=Benutzer,OU=Mannheim,OU=Standorte,OU=Rhein-Neckar-Solution-gmbH,DC=rns,DC=local
OU=Benutzer,OU=Stuttgart,OU=Standorte,OU=Rhein-Neckar-Solution-gmbH,DC=rns,DC=local
OU=Benutzer,OU=München,OU=Standorte,OU=Rhein-Neckar-Solution-gmbH,DC=rns,DC=local`
                        }</CodeBlock>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Mit diesem Scope werden ausschließlich normale Benutzerobjekte der drei Standorte synchronisiert. DC-, Computer-, Server-, Servicekonto- und Admin-OUs bleiben vollständig außerhalb.
                        </p>
                    </InfoBox>
                    <Fig
                        src={`${IMG}auf enta admin cneter  cloudsynchronierung rns.local bereichsfilter.png`}
                        alt="Cloud Sync Bereichsfilter — drei Benutzer-OUs"
                        caption="Bereichsfilter der Konfiguration 'rns.local' — Ausgewählte Organisationseinheiten. Drei DNs der Mannheim-, Stuttgart- und München-Benutzer-OU. Alle anderen Objekttypen bewusst ausgeschlossen."
                        onClick={zoom("auf enta admin cneter  cloudsynchronierung rns.local bereichsfilter.png")}
                    />

                    <SectionTitle label="4.5 — UPN-Kompatibilität & Benutzerformat" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Die UPN-Suffixe aller Benutzer wurden vor der Cloud-Sync-Konfiguration per PowerShell auf die Entra-Default-Domain umgestellt:
                        </p>
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="px-4 py-2.5 rounded-lg font-mono text-[12px] line-through text-slate-500"
                                style={{ background: "#081422", border: "1px solid #ff444420" }}>
                                max.schneider@rns-cloud.de  ← nicht verifiziert
                            </div>
                            <div className="px-4 py-2.5 rounded-lg font-mono text-[12px]"
                                style={{ background: "#081422", border: "1px solid #0078D420", color: AZ }}>
                                max.schneider@gokhanzehirliogluhotmail.onmicrosoft.com  ✓
                            </div>
                        </div>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Die Identitätsräume sind damit klar getrennt: <Code>rns.local</Code> für die interne On-Premises-Authentifizierung, <Code>*.onmicrosoft.com</Code> für die Cloud-Identität in Entra ID.
                        </p>
                    </InfoBox>

                    <SectionTitle label="Ergebnis & Ausblick" />
                    <div className="rounded-xl p-6 border mb-10"
                        style={{ background: "linear-gradient(135deg, #0A1E35, #0D2040)", borderColor: `${C}30` }}>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${C}20`, border: `1px solid ${C}30` }}>
                                <span className="text-lg">✅</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-2">Cloud Sync erfolgreich konfiguriert</h3>
                                <p className="text-[13.5px] text-slate-400 leading-relaxed mb-2">
                                    Konfiguration <Code>rns.local</Code> ist fehlerfrei, Agent auf DC02 ist aktiv, Scope auf drei Benutzer-OUs eingegrenzt, UPNs cloud-kompatibel.
                                </p>
                                <p className="text-[13.5px] text-slate-400 leading-relaxed">
                                    Als nächster Schritt folgt die vollständige Provisionierungs-Runtime-Validierung — in <strong className="text-white">Part 5</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "#0078D420" }}>
                        <a href="/projekt/windows/modul-3/part-3" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Part 3: Hybrid Cloud Readiness</a>
                        <a href="/projekt/windows/modul-3/part-5" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                            style={{ background: `${C}20`, color: AZ, border: `1px solid ${C}30`, textDecoration: "none" }}>
                            Part 5: Coming Soon <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul3Part4;
