import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import Modul3PartRuler from "@/components/Modul3PartRuler";
import { ArrowRight, ArrowUpRight, Maximize2, Calendar, Monitor, User } from "lucide-react";

const C = "#0078D4";
const AZ = "#00BCF2";

const IMG = "/images/microsoft/microsoft modül3/";
const DOC_URL = "/Microsoft/modül 3 dokumantation/Teil2_OnPrem_Security_Hardening.docx";

const techStack = [
    { k: "PKI / CA",         v: "Active Directory Certificate Services (AD CS) — Root CA auf DC01" },
    { k: "LDAPS",            v: "Port 636 — TLS-verschlüsselte LDAP-Kommunikation" },
    { k: "Windows LAPS",     v: "Lokale Admin-Kennwörter zentral & verschlüsselt in AD" },
    { k: "GPO Hardening",    v: "SMBv1 deaktiviert · Guest-Konto deaktiviert · Defender aktiv" },
    { k: "Audit Policy",     v: "Logon Success/Failure · Object Access · Account Management" },
    { k: "Scope",            v: "Clients & Server aller drei Standorte" },
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

const ProjektModul3Part2 = () => {
    const [zoomed, setZoomed] = useState<string | null>(null);
    const closeLightbox = useCallback(() => setZoomed(null), []);
    const zoom = (file: string) => () => setZoomed(`${IMG}${file}`);

    return (
        <Layout>
            <Helmet>
                <title>Modul 3 — Part 2: PKI · LAPS · GPO Security Hardening — Gökhan Zehirlioglu</title>
                <meta name="description" content="AD CS Root CA aufbauen, LDAPS aktivieren, Windows LAPS für lokale Admin-Kennwörter einrichten und Security-Baselines per GPO für alle Clients und Server durchsetzen." />
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
                        <span style={{ color: AZ }} className="font-medium">Part 2</span>
                    </nav>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#0078D420", color: AZ, border: `1px solid ${C}40` }}>Fertig</span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: "#ffffff10", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Modul 3 / Part 2</span>
                    </div>
                    <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-3">
                        PKI · LAPS ·<br /><span style={{ color: AZ }}>GPO Security Hardening</span>
                    </h1>
                    <p className="text-[1.05rem] font-light text-white/65 leading-relaxed max-w-[580px] mb-6">
                        Interne Certificate Authority (AD CS) aufbauen, LDAPS auf Port 636 aktivieren, Windows LAPS für eindeutige lokale Admin-Kennwörter ausrollen und Security-Baselines per GPO für alle Clients und Server im Zero-Trust-Prinzip durchsetzen.
                    </p>
                    <div className="flex flex-wrap gap-5 mb-4">
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Calendar size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Nisan 2026</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><Monitor size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Hyper-V</strong></div>
                        <div className="flex items-center gap-2 text-[13px] text-white/60"><User size={14} className="opacity-60" /><strong className="text-white/90 font-medium">Gokhan Zehirlioglu</strong></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                        {["AD CS / PKI", "Root CA", "LDAPS (Port 636)", "Windows LAPS", "GPO Hardening", "SMBv1 deaktiviert", "Security Baseline", "Audit Policy", "Zero Trust"].map(t => (
                            <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-mono" style={{ background: "#0078D412", color: `${C}cc`, border: `1px solid ${C}20` }}>{t}</span>
                        ))}
                    </div>
                    <Modul3PartRuler currentPart={2} />
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
                                <th className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider font-semibold" style={{ background: "#0D1A2D", color: "#7A8599", borderBottom: "1px solid #0078D420" }}>Bereich</th>
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

                    {/* 2.1 Sicherheitsziel */}
                    <SectionTitle label="2.1 — Sicherheitsziel & Zero-Trust-Ansatz" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Ziel dieses Abschnitts war, die in Part 1 aufgebaute AD-Infrastruktur nicht nur funktionsfähig, sondern <strong className="text-white">sicher</strong> zu machen. Der Ansatz folgt dem <strong className="text-white">Zero-Trust-Prinzip</strong>: kein System im internen Netzwerk wird als vertrauenswürdig vorausgesetzt.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {["SMBv1 deaktiviert", "Guest-Konto abgeschaltet", "Windows Defender aktiv", "Firewall aktiv", "LAPS für lokale Admins", "Audit Policy aktiviert"].map(item => (
                                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22C55E" }} />
                                    <span className="text-[12px] text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    {/* GPO Überblick */}
                    <SectionTitle label="GPO-Überblick" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
                            Folgende Gruppenrichtlinienobjekte wurden im Rahmen dieses Abschnitts erstellt und bilden die Grundlage der Härtungs- und Sicherheitskonfiguration:
                        </p>
                        <div className="flex flex-col gap-2">
                            {[
                                "GPO-Audit-Policy-Baseline",
                                "GPO-Baseline-Client-Hardening",
                                "GPO-Baseline-Server-Hardening",
                                "GPO-Map-Network-Drives",
                                "GPO-Restrict-Local-Admins-Clients",
                                "GPO-Restrict-Local-Admins-Servers",
                                "GPO-Windows-LAPS",
                            ].map(gpo => (
                                <div key={gpo} className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C }} />
                                    <span className="font-mono text-[13px]" style={{ color: AZ }}>{gpo}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    <Fig
                        src={`${IMG}Gruppenrichtlinienverwaltung objekte.png`}
                        alt="Gruppenrichtlinienverwaltung — alle GPOs"
                        caption="Gruppenrichtlinienverwaltung — Container 'Gruppenrichtlinienobjekte' in rns.local. Neben den Standard-GPOs sind alle projektspezifischen Richtlinien sichtbar."
                        onClick={zoom("Gruppenrichtlinienverwaltung objekte.png")}
                    />

                    {/* 2.2 AD CS */}
                    <SectionTitle label="2.2 — AD CS — Interne Zertifizierungsinfrastruktur" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Die <strong className="text-white">Active Directory Certificate Services (AD CS)</strong> wurden auf DC01 installiert. Damit wurde eine interne <strong className="text-white">Root Certification Authority</strong> eingerichtet — die zentrale Stelle, über die Systeme innerhalb der Domain vertrauenswürdige Zertifikate beziehen können.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Die AD CS-Installation war Voraussetzung für LDAPS: LDAPS setzt voraus, dass auf dem Domain Controller ein passendes Server-Authentication-Zertifikat vorhanden ist. Ohne Zertifikatsinfrastruktur läuft LDAP-Kommunikation unverschlüsselt über Port 389.
                        </p>
                    </InfoBox>

                    {/* 2.3 LDAPS */}
                    <SectionTitle label="2.3 — LDAPS — Verschlüsselter Verzeichniszugriff" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Nach der AD CS-Installation wurde LDAPS auf DC01 aktiviert und validiert. LDAPS ist die per SSL/TLS verschlüsselte Variante von LDAP und nutzt <strong className="text-white">Port 636</strong>.
                        </p>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Saubere DNS-Auflösung ist Grundvoraussetzung für den LDAPS-Test:
                        </p>
                    </InfoBox>

                    <Fig
                        src={`${IMG}DNS Manger DomainDnsZone.png`}
                        alt="DNS-Manager DomainDnsZones"
                        caption="DNS-Manager von DC01_MANNHEIM — DomainDnsZones. Die replizierten Host-(A)-Datensätze 10.10.1.1, 10.10.1.2 und 10.10.1.3 entsprechen DC01, DC02 und DC03. Grundvoraussetzung für LDAPS, GPO-Verarbeitung und LAPS."
                        onClick={zoom("DNS Manger DomainDnsZone.png")}
                    />

                    <InfoBox>
                        <p className="text-[13px] text-slate-400 mb-2">PowerShell-Test der LDAPS-Erreichbarkeit:</p>
                        <CodeBlock>Test-NetConnection DC01_Mannheim.rns.local -Port 636{"\n\n"}# Ergebnis:{"\n"}TcpTestSucceeded : True</CodeBlock>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Zusätzlich wurde mit dem <strong className="text-white">LDP-Tool</strong> verifiziert, dass die SSL-Verbindung tatsächlich aufgebaut und der RootDSE ausgelesen werden kann.
                        </p>
                    </InfoBox>

                    {/* 2.4 Windows LAPS */}
                    <SectionTitle label="2.4 — Windows LAPS — Installation & Schema-Update" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Für die sichere Verwaltung der lokalen Administrator-Kennwörter wurde <strong className="text-white">Windows LAPS</strong> in Betrieb genommen. Das AD-Schema wurde um die LAPS-Attribute erweitert:
                        </p>
                        <CodeBlock>Update-LapsADSchema{"\n\n"}# Ergänzt das Schema um:{"\n"}# ms-LAPS-Password{"\n"}# ms-LAPS-EncryptedPassword</CodeBlock>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Anschließend wurde den Computerobjekten die Berechtigung gegeben, ihre eigenen Kennwörter in AD zu schreiben:
                        </p>
                        <CodeBlock>{"Set-LapsADComputerSelfPermission -Identity \\\n  \"OU=Standorte,OU=Rhein-Neckar-Solution-gmbH,DC=rns,DC=local\""}</CodeBlock>
                    </InfoBox>

                    {/* 2.5 LAPS GPO */}
                    <SectionTitle label="2.5 — Windows LAPS — GPO & Validierung" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Das GPO <Code>GPO-Windows-LAPS</Code> wurde erstellt und mit der Haupt-OU verknüpft, sodass es Client- und Server-OUs aller Standorte erreicht. Kennwortabruf von DC01 aus:
                        </p>
                        <CodeBlock>{"Get-LapsADPassword -Identity MANNHEIM-CLIENT -AsPlainText\n\n# Ergebnis:\nComputerName     : MANNHEIM-CLIENT\nAccount          : Administrator\nSource           : EncryptedPassword\nDecryptionStatus : Success\nAuthorizedDecryptor: RNS\\Domänen-Admins"}</CodeBlock>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            LAPS wurde für alle drei Standort-Clients (MANNHEIM-CLIENT, MUENCHEN-CLIENT, STUTTGART-CLIEN) erfolgreich validiert. Das Ergebnis: lokale Admin-Kennwörter sind jetzt <strong className="text-white">zentral, eindeutig und verschlüsselt</strong> in Active Directory verwaltet — Lateral-Movement-Risiko erheblich reduziert.
                        </p>
                    </InfoBox>

                    <Fig
                        src={`${IMG}Gruppenrichtlinienverwaltung rns-gmbH.png`}
                        alt="LAPS GPO verknüpft mit Rhein-Neckar-Solution-gmbH OU"
                        caption="Gruppenrichtlinienverwaltung — OU 'Rhein-Neckar-Solution-gmbH' mit verknüpften GPOs: GPO-Map-Network-Drives und GPO-Windows-LAPS. Beide sind aktiv und erreichen alle untergeordneten Computer-/Server-OUs."
                        onClick={zoom("Gruppenrichtlinienverwaltung rns-gmbH.png")}
                    />

                    {/* 2.6 Client Hardening */}
                    <SectionTitle label="2.6 — Client Hardening Baseline" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Das GPO <Code>GPO-Baseline-Client-Hardening</Code> wurde mit den Computer-OUs unter allen drei Standorten verknüpft. Folgende Sicherheitsmaßnahmen wurden damit erzwungen:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                "SMBv1 deaktiviert",
                                "Guest-Konto deaktiviert",
                                "Windows Firewall aktiv (alle Profile)",
                                "Microsoft Defender aktiv",
                                "Real-Time Protection aktiv",
                                "Behavior Monitoring aktiv",
                                "IOAV-Protection aktiv",
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="text-green-400 text-xs">✓</span>
                                    <span className="text-[12.5px] text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    {/* 2.7 Server Hardening */}
                    <SectionTitle label="2.7 — Server Hardening Baseline" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed">
                            Das GPO <Code>GPO-Baseline-Server-Hardening</Code> wurde aus dem Client-Baseline-GPO kopiert, um identische Sicherheitsprinzipien konsistent auf Server-Systeme zu übertragen. Es wurde ausschließlich mit der Server-OU unter Mannheim verknüpft. Validiert wurde, dass das Guest-Konto deaktiviert und SMB1 nicht mehr verfügbar ist.
                        </p>
                    </InfoBox>

                    {/* 2.8 Audit Policy */}
                    <SectionTitle label="2.8 — Audit Policy Baseline" />
                    <InfoBox>
                        <p className="text-[14px] text-slate-300 leading-relaxed mb-3">
                            Das GPO <Code>GPO-Audit-Policy-Baseline</Code> wurde mit den Client-Computer-OUs und der Mannheim-Server-OU verknüpft. Folgende Ereigniskategorien wurden aktiviert:
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {[
                                "Logon Success / Failure",
                                "Account Logon Success / Failure",
                                "Account Management Success / Failure",
                                "Object Access Success / Failure",
                                "Policy Change Success / Failure",
                                "Privilege Use Success / Failure",
                                "System Success / Failure",
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#081422", border: "1px solid #0078D415" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C }} />
                                    <span className="text-[12.5px] text-slate-300 font-mono">{item}</span>
                                </div>
                            ))}
                        </div>
                    </InfoBox>

                    {/* DNS rns.local */}
                    <SectionTitle label="DNS-Zone rns.local" />
                    <Fig
                        src={`${IMG}Dns Manger rns.local .png`}
                        alt="DNS Manager — rns.local Zone"
                        caption="DNS-Manager — Zone rns.local. Alle Host-(A)-Records der DCs und Clients. Grundlage für saubere Namensauflösung in der gesamten Infrastruktur."
                        onClick={zoom("Dns Manger rns.local .png")}
                    />

                    <WarnBox>
                        <strong>Bedeutung von LAPS:</strong> Lokale Administrator-Kennwörter sind auf jedem Client und Server jetzt eindeutig, zentral und verschlüsselt in AD gespeichert. Ein kompromittierter lokaler Admin-Hash auf einem Rechner öffnet keine Türen mehr auf anderen Maschinen — Lateral Movement erheblich erschwert.
                    </WarnBox>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t mt-8" style={{ borderColor: "#0078D420" }}>
                        <a href="/projekt/windows/modul-3/part-1" className="text-sm text-slate-500 hover:text-white transition-colors" style={{ textDecoration: "none" }}>← Part 1: Foundation & Identity</a>
                        <a href="/projekt/windows/modul-3/part-3" className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all" style={{ background: `${C}20`, color: AZ, border: `1px solid ${C}30`, textDecoration: "none" }}>
                            Part 3: Hybrid Cloud Readiness <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProjektModul3Part2;
