import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import Modul3PartRuler from "@/components/Modul3PartRuler";
import { ArrowRight, ArrowUpRight, Maximize2, Calendar, Monitor, User } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const IMG = "/images/microsoft/microsoft modül3/";
const DOC_URL = "/Microsoft/modül 3 dokumantation/Teil3_Hybrid_Cloud_Readiness.docx";

const techStack = [
    { k: "Hyper-V Checkpoint",  v: "Pre-Entra-CloudSync-Checkpoint-2026-05-06 auf allen 7 VMs" },
    { k: "Entra Tenant",        v: "Default Directory — gokhanzehirliogluhotmail.onmicrosoft.com" },
    { k: "Lizenz",              v: "Microsoft Entra ID P2 Trial (100 Lizenzen, 30 Tage)" },
    { k: "Cloud Admin",         v: "admin@gokhanzehirliogluhotmail.onmicrosoft.com (Globaler Administrator)" },
    { k: "MFA",                 v: "Microsoft Authenticator — Number Matching" },
    { k: "DC02 NIC-Konfiguration", v: "Interne NIC 10.10.1.2 + Externe NIC 10.100.15.60 (Internet)" },
    { k: "Provisioning Agent",  v: "Microsoft Entra Provisioning Agent auf DC02_MANNHEIM" },
    { k: "gMSA",               v: "provAgentgMSA — Group Managed Service Account" },
];

type FigProps = { src: string; alt: string; caption: string; onClick: () => void };
const Fig = ({ src, alt, caption, onClick }: FigProps) => (
    <figure className="mb-1">
        <div
            className="group relative cursor-zoom-in overflow-hidden rounded-xl border"
            style={{ borderColor: `${C}25`, background: "#0A1628" }}
            onClick={onClick}
        >
            <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md rounded-full p-2" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
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

const WarnBox = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-xl p-5 mb-6 border-l-4 flex gap-3" style={{ background: "#1A1200", borderColor: "#F59E0B", borderLeftColor: "#F59E0B" }}>
        <span className="text-lg mt-0.5">⚠</span>
        <div className="text-[13px] text-amber-200/80 leading-relaxed">{children}</div>
    </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="font-mono text-[12px] px-1.5 py-0.5 rounded" style={{ background: "#0078D415", color: AZ }}>{children}</code>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="rounded-lg px-5 py-4 mb-4 text-[12.5px] font-mono text-slate-300 overflow-x-auto" style={{ background: "#040C18", border: "1px solid #0078D420" }}>
        {children}
    </pre>
);

const ProjektModul3Part3 = () => {
    const [zoomed, setZoomed] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomed(null), []);
    const zoom = (file: string) => () => setZoomed(`${IMG}${file}`);

    return (
        <Layout>
            <Helmet>
                <title>Modul 3 — Part 3: Entra Tenant & Provisioning Agent — Gökhan Zehirlioglu</title>
                <meta name="description" content="Microsoft Entra Tenant mit Entra ID P2 vorbereiten, cloud-only Global Admin mit MFA einrichten, DC02 mit zweiter NIC ausstatten und den Provisioning Agent inkl. gMSA installieren." />
            </Helmet>
            <Lightbox src={zoomed} onClose={closeLightbox} />

            {/* ══════════ HERO ══════════ */}
            <header className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #030D1A 0%, #071628 50%, #0A2040 100%)" }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,120,212,0.15) 0%, transparent 70%)" }} />
                <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
                    <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
                        <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <a href="/projekt/windows/modul-3" className="hover:text-white transition-colors">Modul 3: Hybrid Identity & Azure</a>
                        <span className="opacity-40">&rsaquo;</span>
                        <span style={{ color: AZ }} className="font-medium">Part 3</span>
                    </nav>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>Fertig</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 3 / Part 3</span>
                    </div>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        Entra Tenant &amp;<br /><span style={{ color: AZ }}>Provisioning Agent</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[580px] mb-6">
                        Alle 7 VMs mit Hyper-V Checkpoints sichern, Microsoft Entra Tenant mit Entra ID P2 Trial vorbereiten, cloud-only Global Admin mit MFA-Pflicht einrichten, DC02 mit zweiter NIC für Internetzugang ausstatten und den Entra Provisioning Agent inkl. gMSA auf DC02 installieren.
                    </p>
                    <div className="flex flex-wrap gap-5 mb-4">
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Nisan 2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Hyper-V + Azure</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {["Microsoft Entra ID", "Entra ID P2", "Provisioning Agent", "gMSA", "MFA / Authenticator", "Multi-NIC DC", "Hyper-V Checkpoint", "Global Admin"].map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-mono" style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>{t}</span>
                        ))}
                    </div>
                    <Modul3PartRuler currentPart={3} />
                </div>
            </header>

            {/* ══════════ CONTENT ══════════ */}
            <div style={{ background: "#070E1A", color: "#E2E8F0" }} className="min-h-screen">
                <div className="max-w-[820px] mx-auto px-6 py-12">

                    {/* Download */}
                    <div className="mb-10">
                        <a
                            href={DOC_URL}
                            download
                            className="group inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: "#0D1A2D", border: `1px solid ${C}30`, color: AZ, textDecoration: "none" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.background = `${C}15`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = `${C}30`; e.currentTarget.style.background = "#0D1A2D"; }}
                        >
                            <ArrowUpRight size={16} />
                            Originaldokumentation herunterladen · DOCX
                        </a>
                    </div>

                    {/* Systemkonfiguration */}
                    <SectionTitle label="Systemkonfiguration" />
                    <table className="w-full border-separate border-spacing-0 border rounded-xl overflow-hidden mb-10" style={{ borderColor: "#0078D425" }}>
                        <thead>
                            <tr>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Eigenschaft</th>
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Details</th>
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

                    {/* 3.1 Hyper-V Checkpoints */}
                    <SectionTitle label="3.1 — Hyper-V Checkpoints vor dem Cloud-Übergang" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Vor Beginn der Entra-Integration wurden auf allen kritischen VMs <strong className="text-white">Hyper-V Checkpoints</strong> erstellt — als kontrollierbarer Rückkehrpunkt vor riskanten Änderungen:
                        </p>
                        <div className="rounded-lg px-4 py-3 mb-3 font-mono text-[13px]" style={{ background: "#040C18", border: "1px solid #0078D420", color: AZ }}>
                            Pre-Entra-CloudSync-Checkpoint-2026-05-06
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {["DC01_MANNHEIM", "DC02_MANNHEIM", "DC03_STUTTGART", "SERVER01", "MANNHEIM-CLIENT", "STUTTGART-CLIEN", "MUENCHEN-CLIENT"].map(vm => (
                                <div key={vm} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22C55E" }} />
                                    <span className="font-mono text-[11.5px] text-slate-300">{vm}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    <WarnBox>
                        <strong>DC-Checkpoints in der Produktion:</strong> In produktiven Umgebungen darf ein Domain-Controller-Checkpoint nicht als Backup verwendet werden. Ein DC-Rollback kann zu USN-Rollback und Replikationsproblemen führen. Im Labor ist diese Methode jedoch ein legitimes Mittel für kurzzeitige Rücksprungpunkte.
                    </WarnBox>

                    {/* 3.2 Entra Tenant */}
                    <SectionTitle label="3.2 — Entra-Tenant-Vorbereitung" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Der vorhandene Entra-Tenant war zu Beginn nahezu leer. Im ersten Versuch sollte <Code>rns-cloud.de</Code> als Custom Domain aufgenommen werden — jedoch setzt Microsoft Entra ID voraus, dass die Domain über einen TXT-Record im DNS-Panel verifiziert wird. Da <Code>rns-cloud.de</Code> keine real erworbene Domain ist, wurde mit der Entra-Standard-Domain weitergearbeitet:
                        </p>
                        <div className="rounded-lg px-4 py-3 font-mono text-[13px]" style={{ background: "#040C18", border: "1px solid #0078D420", color: AZ }}>
                            gokhanzehirliogluhotmail.onmicrosoft.com
                        </div>
                    </InfoBox>

                    <Fig
                        src={`${IMG}Microsfoft Entra Admin Center Entra ID übersciht.png`}
                        alt="Microsoft Entra Admin Center — Übersicht"
                        caption="Microsoft Entra Admin Center — Übersicht des Default Directory. Mandanten-ID, primäre Domäne gokhanzehirliogluhotmail.onmicrosoft.com, Microsoft Entra ID P2, 3 Benutzer."
                        onClick={zoom("Microsfoft Entra Admin Center Entra ID übersciht.png")}
                    />

                    {/* 3.3 Entra P2 */}
                    <SectionTitle label="3.3 — Entra ID P2 Trial & Lizenzierung" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Im Cloud-Sync-Konfigurationsdialog war sichtbar, dass für die Synchronisation eine <strong className="text-white">Microsoft Entra ID P1/P2 Lizenz</strong> erforderlich ist. Gewählt wurde der Trial:
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                            {[["Lizenzen", "100"], ["Zeitraum", "30 Tage"], ["Plan", "Entra ID P2"]].map(([k, v]) => (
                                <div key={k} className="text-center p-3 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D420" }}>
                                    <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1">{k}</div>
                                    <div className="font-bold text-sm" style={{ color: AZ }}>{v}</div>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    <Fig
                        src={`${IMG}Entra admin Center P2 lizenz.png`}
                        alt="Entra Admin Center — P2 Lizenz"
                        caption="Microsoft Entra Admin Center — Lizenzen: 100 Lizenzen Entra ID P1 und 100 Lizenzen ID-Schutz (Entra ID P2) aktiv. Die für Cloud Sync benötigte P2-Lizenzierung ist damit sichergestellt."
                        onClick={zoom("Entra admin Center P2 lizenz.png")}
                    />

                    <WarnBox>
                        <strong>Trial nach Projektabschluss beenden:</strong> Der 30-Tage-Trial von Microsoft Entra ID P2 kann sich automatisch in eine kostenpflichtige Lizenz umwandeln, wenn er nicht aktiv gekündigt wird.
                    </WarnBox>

                    {/* 3.4 Cloud Admin & MFA */}
                    <SectionTitle label="3.4 — Cloud-only Global Admin & MFA" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Beim ersten Agent-Setup-Versuch mit dem persönlichen Hotmail-Konto führte Microsoft den Login in den falschen Tenant-Kontext (AADSTS50020). Lösung: Ein dediziertes <strong className="text-white">cloud-only Admin-Konto</strong> wurde erstellt:
                        </p>
                        <div className="rounded-lg px-4 py-3 font-mono text-[13px] mb-3" style={{ background: "#040C18", border: "1px solid #0078D420", color: AZ }}>
                            admin@gokhanzehirliogluhotmail.onmicrosoft.com
                        </div>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Diesem Konto wurde die Rolle <strong className="text-white">Globaler Administrator</strong> zugewiesen. MFA wurde per <strong className="text-white">Microsoft Authenticator (Number Matching)</strong> aktiviert. Sämtliche Tenant-Operationen laufen ausschließlich über dieses Konto.
                        </p>
                    </InfoBox>

                    {/* 3.5 DC02 Multi-NIC */}
                    <SectionTitle label="3.5 — DC02 Multi-NIC & Internetzugriff" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
                            Damit der Provisioning Agent die Microsoft-Cloud-Endpoints erreichen kann, wurde DC02 mit einer zweiten NIC ausgestattet:
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="p-3 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: AZ }}>Interne NIC (Domain-Kommunikation)</div>
                                <div className="font-mono text-[12.5px] text-slate-300">IP: 10.10.1.2 · DNS: 10.10.1.2 / 10.10.1.1 · Register DNS: True</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: AZ }}>Externe NIC (Internetzugang)</div>
                                <div className="font-mono text-[12.5px] text-slate-300">IP: 10.100.15.60 · Gateway: 10.100.15.254 · Register DNS: False</div>
                            </div>
                        </div>
                        <p className="text-[13px] text-slate-400 mt-3 leading-relaxed">
                            Wichtig: DC02 hatte die externe IP fälschlicherweise in das interne DNS registriert. Die fehlerhaften A-Records wurden bereinigt und die DNS-Registrierung auf der externen NIC deaktiviert.
                        </p>
                    </InfoBox>

                    <Fig
                        src={`${IMG}Dns Manger rns.local .png`}
                        alt="DNS-Manager rns.local nach Bereinigung"
                        caption="DNS-Manager — rns.local Zone nach der Bereinigung. Ausschließlich die zulässigen Host-(A)-Datensätze: DC01 10.10.1.1, DC02 10.10.1.2, DC03 10.10.1.3, SERVER01 10.10.1.254 und die Standort-Clients. Der externe DC02-Record (10.100.15.60) wurde entfernt."
                        onClick={zoom("Dns Manger rns.local .png")}
                    />

                    <WarnBox>
                        <strong>Multi-NIC auf Domain Controllern — Regelwerk:</strong> Auf jedem Adapter außer der internen NIC muss „Register this connection's addresses in DNS" deaktiviert sein. Die Route-Metric muss so gewählt werden, dass Domain-Verkehr bevorzugt über die interne NIC läuft. Falsche A-Records sind sofort zu entfernen.
                    </WarnBox>

                    {/* 3.6 Provisioning Agent */}
                    <SectionTitle label="3.6 — Microsoft Entra Provisioning Agent & gMSA" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Der <strong className="text-white">Microsoft Entra Provisioning Agent</strong> wurde auf <strong className="text-white">DC02</strong> installiert. DC02 wurde bewusst gewählt: DC01 trägt die zentralen Rollen (CA, Hauptverwaltung), während DC02 als zweiter DC besser für hybride Agent-Komponenten geeignet ist.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Im Setup-Wizard wurde <strong className="text-white">Create gMSA</strong> gewählt — das Servicekonto wird damit als Group Managed Service Account verwaltet, ohne manuell vergebenes Passwort:
                        </p>
                        <div className="rounded-lg px-4 py-3 font-mono text-[13px] mb-3" style={{ background: "#040C18", border: "1px solid #0078D420", color: AZ }}>
                            pGMSA_784aba0b$
                        </div>
                        <CodeBlock>{"# Validierung des gMSA:\nTest-ADServiceAccount pGMSA_784aba0b\n\n# Ergebnis:\nTrue"}</CodeBlock>
                    </InfoBox>

                    <Fig
                        src={`${IMG}provAgentgMSA-Azure AD cloud sync service account.png`}
                        alt="gMSA — Azure AD Cloud Sync Service Account"
                        caption="Active Directory-Benutzer und -Computer — Container 'Managed Service Accounts'. Das vom Provisioning-Agent-Wizard erzeugte Konto provAgentgMSA (msDS-GroupManagedServiceAccount) mit der Beschreibung 'Azure AD cloud sync service account'."
                        onClick={zoom("provAgentgMSA-Azure AD cloud sync service account.png")}
                    />

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t mt-8" style={{ borderColor: "#0078D420" }}>
                        <a href="/projekt/windows/modul-3/part-2" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Part 2: Security & Hardening</a>
                        <a href="/projekt/windows/modul-3/part-4" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all" style={{ background: `${C}20`, color: AZ, border: `1px solid ${C}30`, textDecoration: "none" }}>
                            Part 4: Cloud Sync & Validation <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul3Part3;
