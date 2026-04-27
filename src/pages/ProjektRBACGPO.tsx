import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useState, type ReactNode } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { Download } from "lucide-react";

const screenshots: Record<number, { file: string; desc: string }> = {
  1: { file: "Projekt7_1.png", desc: "ADUC — Kontextmenü: Neu → Organisationseinheit auf Domänenebene" },
  2: { file: "Projekt7_1.2.png", desc: "ADUC — 4 Abteilungs-OUs erstellt: IT, Finanz, Vertrieb, Betrieb" },
  3: { file: "Projekt7_3.1.png", desc: "Neues Objekt — Benutzer: Max Finanz (m.finanz) in OU Finanz" },
  4: { file: "Projekt7_3.2.png", desc: "Neues Objekt — Benutzer: Anna IT (a.IT) in OU IT" },
  5: { file: "Projekt7_3.3.png", desc: "Neues Objekt — Benutzer: Sarah Vertrieb (s.vertrieb) in OU Vertrieb" },
  6: { file: "Projekt7_3.4.png", desc: "Neues Objekt — Benutzer: Bob Betrieb (b.betrieb) in OU Betrieb" },
  7: { file: "Projekt7_4.1.png", desc: "Neues Objekt — Gruppe: SG_Finanz (Global, Sicherheit)" },
  8: { file: "Projekt7_4.2.png", desc: "Neues Objekt — Gruppe: SG_Betrieb (in OU Vertrieb sichtbar)" },
  9: { file: "Projekt7_4.3.png", desc: "Neues Objekt — Gruppe: SG_IT (Global, Sicherheit)" },
  10: { file: "Projekt7_4.4.png", desc: "Neues Objekt — Gruppe: SG_Betrieb (Global, Sicherheit)" },
  11: { file: "Projekt7_5.png", desc: "Erweiterte Sicherheitseinstellungen — Vererbung deaktiviert (Finanz_Abteilung)" },
  12: { file: "Projekt7_6.png", desc: "Berechtigungseintrag — Auswahl der Sicherheitsgruppe im Objekt-Manager" },
  13: { file: "Projekt7_7.png", desc: "Gruppenrichtlinienverwaltung — GPO erstellen und verknüpfen" },
  14: { file: "Projekt7_7.2.png", desc: "GPO-Editor — Navigation: Laufwerkszuordnungen unter Windows-Einstellungen" },
  15: { file: "Projekt7_7.3.png", desc: "Eigenschaften von Z: — Aktion: Aktualisieren, Pfad, Buchstabe Z:" },
  16: { file: "Projekt7_7.4.png", desc: "GPO-Editor — Laufwerkszuordnungen: Z: mit Pfad \\\\FileServer\\Unternehmensdaten" },
  17: { file: "Projekt7_8.1.png", desc: "Client W11P-Vertrieb1 — Laufwerk Z: (Firmenordner) automatisch verbunden" },
  18: { file: "Projekt7_8.2.png", desc: "Client-Test — ABE-Ergebnis: Nur Gemeinsam und Vertrieb_Abteilung sichtbar" },
};

/* ─── icons ─── */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,opacity:.6,flexShrink:0}}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,opacity:.6,flexShrink:0}}>
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,opacity:.6,flexShrink:0}}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20,flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:20,height:20,flexShrink:0}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ShieldIcon = () => <span style={{fontSize:18}}>🛡️</span>;
const UsersIcon = () => <span style={{fontSize:18}}>👥</span>;
const GearIcon = () => <span style={{fontSize:18}}>⚙️</span>;
const BookIcon = () => <span style={{fontSize:18}}>📖</span>;

/* ─── sub-components ─── */
function Lightbox({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  if (!src) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:10000,cursor:"zoom-out",display:"flex",alignItems:"center",justifyContent:"center",padding:32,backdropFilter:"blur(4px)"}}>
      <img src={src} alt={alt} style={{maxWidth:"96%",maxHeight:"92vh",borderRadius:8,boxShadow:"0 16px 48px rgba(0,0,0,.4)"}} />
    </div>
  );
}

function ProofFigure({ num, data, onClick }: { num: number; data: { file: string; desc: string }; onClick: (file: string, desc: string) => void }) {
  return (
    <figure onClick={() => onClick(data.file, data.desc)} className="p07-proof" style={{margin:"28px 0",borderRadius:12,overflow:"hidden",border:"1px solid #E1E5EB",background:"#fff",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",cursor:"zoom-in",transition:"box-shadow .3s, transform .2s"}}>
      <img src={`/images/microsoft/projekt7/${data.file}`} alt={data.desc} style={{width:"100%",display:"block"}} loading="lazy" />
      <figcaption style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:12,background:"#F5F7FA",borderTop:"1px solid #E1E5EB"}}>
        <span style={{background:"#0078D4",color:"#fff",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:100,whiteSpace:"nowrap",fontFamily:"'Cascadia Code','Consolas',monospace"}}>Abb. {num}</span>
        <span style={{fontSize:13,color:"#4A5568",lineHeight:1.5}}>{data.desc}</span>
      </figcaption>
    </figure>
  );
}

function SpecTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{overflowX:"auto",margin:"24px 0"}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,border:"1px solid #E1E5EB",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <thead>
          <tr>{rows[0].map((h,i) => <th key={i} style={{padding:"10px 20px",textAlign:"left",fontSize:11,textTransform:"uppercase",letterSpacing:".8px",color:"#7A8599",background:"#EEF1F5",borderBottom:"1px solid #E1E5EB",fontWeight:600}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.slice(1).map((r,ri) => (
            <tr key={ri} style={{background: ri%2===1 ? "#F5F7FA" : "#fff"}}>
              {r.map((c,ci) => <td key={ci} style={{padding:"11px 20px",fontSize:14,borderBottom:"1px solid #E1E5EB",fontWeight:ci===0?"600":"400",color:ci===0?"#005A9E":"#4A5568",whiteSpace:ci===0?"nowrap":"normal"}}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{overflowX:"auto",margin:"24px 0"}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,border:"1px solid #E1E5EB",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
        <thead>
          <tr>{rows[0].map((h,i) => <th key={i} style={{padding:"12px 20px",fontSize:11,textTransform:"uppercase",letterSpacing:".8px",color:"#fff",background:"#0078D4",textAlign:i>0?"center":"left",fontWeight:600}}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.slice(1).map((r,ri) => (
            <tr key={ri} style={{background:ri%2===1?"#F5F7FA":"#fff"}}>
              <td style={{padding:"12px 20px",fontSize:14,color:"#4A5568",borderBottom:"1px solid #E1E5EB"}}>{r[0]}</td>
              <td style={{padding:"12px 20px",fontSize:14,textAlign:"center",borderBottom:"1px solid #E1E5EB"}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,padding:"3px 12px",borderRadius:100,background:"#DCFCE7",color:"#107C10"}}>✓ {r[1]}</span>
              </td>
              <td style={{padding:"12px 20px",textAlign:"center",borderBottom:"1px solid #E1E5EB",fontFamily:"'Cascadia Code',monospace",fontSize:11,color:"#7A8599"}}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArchCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div style={{padding:20,background:"#fff",border:"1px solid #E1E5EB",borderRadius:12,transition:"border-color .2s, box-shadow .2s"}}>
      <div style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"#E8F4FD",borderRadius:8,marginBottom:12}}>{icon}</div>
      <div style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>{title}</div>
      <div style={{fontSize:12.5,color:"#7A8599",lineHeight:1.5}}>{desc}</div>
    </div>
  );
}

function StepItem({ num, title, children }: { num: number; title: string; children: ReactNode }) {
  return (
    <div style={{display:"flex",gap:16,marginBottom:20,alignItems:"flex-start"}}>
      <div style={{flexShrink:0,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:"#0078D4",color:"#fff",borderRadius:"50%",fontSize:13,fontWeight:700,marginTop:1}}>{num}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:15,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>{title}</div>
        <div style={{fontSize:14,color:"#4A5568",lineHeight:1.7}}>{children}</div>
      </div>
    </div>
  );
}

function IssueCard({ type, title, children }: { type: "problem" | "solution"; title: string; children: ReactNode }) {
  const isProblem = type === "problem";
  return (
    <div style={{margin:"24px 0",borderRadius:12,overflow:"hidden",border:"1px solid #E1E5EB",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
      <div style={{padding:"16px 24px",display:"flex",alignItems:"center",gap:10,fontSize:14,fontWeight:600,background:isProblem?"#FEF2F2":"#F0FFF4",color:isProblem?"#C42B1C":"#107C10",borderBottom:`1px solid ${isProblem?"#FECACA":"#C6F6D5"}`}}>
        {isProblem ? <AlertIcon /> : <CheckIcon />} {title}
      </div>
      <div style={{padding:"20px 24px",background:"#fff",fontSize:14,color:"#4A5568",lineHeight:1.8}}>{children}</div>
    </div>
  );
}

function NoteBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{margin:"16px 0",padding:"16px 20px",background:"#FFFBEB",borderLeft:"3px solid #D83B01",borderRadius:"0 8px 8px 0"}}>
      <div style={{fontSize:13,fontWeight:600,color:"#D83B01",marginBottom:4}}>{title}</div>
      <div style={{fontSize:14,color:"#4A5568",lineHeight:1.7}}>{children}</div>
    </div>
  );
}

function Section({ num, title, tagline, children }: { num: string; title: string; tagline?: string; children: ReactNode }) {
  return (
    <section style={{padding:"56px 0",borderBottom:"1px solid #E1E5EB"}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:24}}>
          <div style={{flexShrink:0,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",background:"#0078D4",color:"#fff",borderRadius:10,fontSize:16,fontWeight:700,marginTop:2}}>{num}</div>
          <div>
            <h2 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-.01em",lineHeight:1.3,margin:0}}>{title}</h2>
            {tagline && <div style={{fontSize:14,color:"#7A8599",fontWeight:400,marginTop:2}}>{tagline}</div>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function PhaseLabel({ text }: { text: string }) {
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:13,fontWeight:600,color:"#0078D4",textTransform:"uppercase",letterSpacing:".5px",margin:"36px 0 20px",padding:"6px 16px",background:"#E8F4FD",borderRadius:100}}>{text}</div>
  );
}

/* ─── NEW: Anleitung-specific components ─── */
function GpoPathDisplay({ path }: { path: string }) {
  const segments = path.split(" > ");
  return (
    <div style={{margin:"8px 0 12px",padding:"10px 16px",background:"#F8F9FA",border:"1px solid #E2E8F0",borderRadius:8,fontFamily:"'Cascadia Code','Consolas',monospace",fontSize:12,color:"#4A5568",lineHeight:1.6,overflowX:"auto",whiteSpace:"nowrap"}}>
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && <span style={{color:"#107C10",margin:"0 6px",fontWeight:700}}>›</span>}
          <span style={{color: i === segments.length - 1 ? "#107C10" : "#4A5568", fontWeight: i === segments.length - 1 ? 600 : 400}}>{seg}</span>
        </span>
      ))}
    </div>
  );
}

function GpoSetting({ name, value }: { name: string; value: string }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"6px 0",flexWrap:"wrap"}}>
      <span style={{fontSize:13,color:"#1A1A1A",fontWeight:500}}>{name}</span>
      <span style={{fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:100,background:"#DCFCE7",color:"#107C10",border:"1px solid #BBF7D0"}}>{value}</span>
    </div>
  );
}

function AnleitungStep({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div style={{display:"flex",gap:16,marginBottom:28,alignItems:"flex-start"}}>
      <div style={{flexShrink:0,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"#107C10",color:"#fff",borderRadius:"50%",fontSize:12,fontWeight:700,marginTop:1}}>{num}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:15,fontWeight:600,color:"#1A1A1A",marginBottom:6}}>{title}</div>
        <div style={{fontSize:14,color:"#4A5568",lineHeight:1.8}}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ProjektRBACGPO() {
  const [lbSrc, setLbSrc] = useState<string | null>(null);
  const [lbAlt, setLbAlt] = useState("");

  const openLb = (file: string, alt: string) => { setLbSrc(`/images/microsoft/projekt7/${file}`); setLbAlt(alt); };
  const closeLb = () => { setLbSrc(null); };

  return (
    <Layout>
      <Helmet>
        <title>Projekt 07: Identitätsmanagement, RBAC & automatisierte Netzlaufwerke \u2013 G\u00F6khan Zehirlioglu</title>
        <meta name="description" content="Active Directory Organisationsstruktur, rollenbasierte Zugriffskontrolle nach AGDLP und GPO-gesteuerte Laufwerkszuordnung — vollständig dokumentiert." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;600&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .p07-root { font-family: 'Inter','Segoe UI',system-ui,sans-serif; background:#FAFBFC; color:#1A1A1A; line-height:1.75; font-size:16px; -webkit-font-smoothing:antialiased; }
        .p07-root ::selection { background:#0078D4; color:#fff; }
        .p07-root img { max-width:100%; height:auto; }
        .p07-root code { font-family:'Cascadia Code','Consolas',monospace; font-size:12.5px; background:#EEF1F5; padding:2px 8px; border-radius:4px; color:#005A9E; border:1px solid #E1E5EB; }
        .p07-root p { margin:0 0 16px; font-size:15.5px; color:#4A5568; line-height:1.8; }
        .p07-root p strong { color:#1A1A1A; font-weight:600; }
        .p07-proof:hover { box-shadow:0 8px 32px rgba(0,0,0,.1); transform:translateY(-2px); }
        .p07-arch:hover { border-color:#0078D4 !important; box-shadow:0 2px 12px rgba(0,120,212,.1) !important; }
        @media(max-width:768px) { .p07-arch-grid { grid-template-columns:1fr 1fr !important; } }
        @media(max-width:560px) { .p07-arch-grid { grid-template-columns:1fr !important; } .p07-hero { padding:40px 0 !important; } }
      `}</style>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={closeLb} />

      <div className="p07-root">
        {/* ═══ HERO ═══ */}
        <header className="p07-hero" style={{background:"linear-gradient(135deg,#001D3D 0%,#002B5C 50%,#005A9E 100%)",color:"#fff",padding:"60px 0 56px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}} />
          <div style={{position:"absolute",top:-120,right:-80,width:400,height:400,background:"radial-gradient(circle,rgba(0,120,212,.2) 0%,transparent 70%)",pointerEvents:"none"}} />

          <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px",position:"relative",zIndex:2}}>
            <nav style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:28,flexWrap:"wrap"}}>
              <a href="/" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>System & Server Administration</a>
              <span style={{opacity:.4}}>{"\u203A"}</span>
              <a href="/windows-projekte" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Microsoft Enterprise IT</a>
              <span style={{opacity:.4}}>{"\u203A"}</span>
              <a href="/windows-projekte" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Modul 2: Identity & Server</a>
              <span style={{opacity:.4}}>{"\u203A"}</span>
              <span style={{color:"#4EA8DE",fontWeight:500}}>Projekt 07</span>
            </nav>

            <h1 style={{fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:700,lineHeight:1.2,letterSpacing:"-.02em",marginBottom:12}}>
              Identity &amp; Access Management (IAM)<br/>im Active Directory
            </h1>
            <p style={{fontSize:"1.05rem",fontWeight:300,color:"rgba(255,255,255,0.7)",lineHeight:1.6,maxWidth:600,marginBottom:32}}>
              Active Directory Organisationsstruktur, rollenbasierte Zugriffskontrolle nach AGDLP und GPO-gesteuerte Laufwerkszuordnung — vollständig dokumentiert.
            </p>

            <div style={{display:"flex",flexWrap:"wrap",gap:28,marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><CalendarIcon /><strong style={{color:"#fff",fontWeight:500}}>24.03.2026</strong></div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><MonitorIcon /><strong style={{color:"#fff",fontWeight:500}}>Hyper-V</strong>&nbsp;auf Remote Desktop</div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><UserIcon /><strong style={{color:"#fff",fontWeight:500}}>Gokhan Zehirlioglu</strong></div>
            </div>

            {/* Download Buttons */}
            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:8}}>
              <a
                href="/downloads/Projekt07_RBAC_GPO.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,color:"#fff",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Dokumentation (DOCX)
              </a>
              <a
                href="/downloads/Anleitung_IAM_Active_Directory.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(16,124,16,.15)",border:"1px solid rgba(16,124,16,.35)",borderRadius:8,color:"#7CFC7C",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Anleitung (DOCX)
              </a>
            </div>

            <ProjectRuler currentId={7} />
          </div>
        </header>

        {/* ═══ 1. ZIEL ═══ */}
        <Section num="1" title="Ziel" tagline="Was wird hier gemacht und warum?">
          <p>Dieses Projekt bildet die <strong>logische IT-Struktur</strong> eines Unternehmens im Active Directory ab. Das Ziel ist eine <strong>Zero-Touch-Umgebung</strong> für Endbenutzer: Durch rollenbasierte Zugriffskontrolle (<strong>RBAC</strong>) auf Dateiserverebene und Gruppenrichtlinien (<strong>GPOs</strong>) erhalten alle 6 Mitarbeiter vollautomatisch ein pers\u00F6nliches Netzlaufwerk.</p>
          <p>Dank <strong>Access-Based Enumeration (ABE)</strong> — bereits in Projekt 06 aktiviert — ist die Sichtbarkeit strikt nach Abteilungszugeh\u00F6rigkeit isoliert. Das Berechtigungsmodell folgt dem <strong>AGDLP-Prinzip</strong> (Account → Global Group → Domain Local Group → Permission): Benutzern werden niemals direkte Berechtigungen erteilt.</p>
          <p>Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert — jeder Konfigurationsschritt wird durch Screenshots belegt.</p>
        </Section>

        {/* ═══ 2. AUSGANGSSITUATION ═══ */}
        <Section num="2" title="Ausgangssituation" tagline="Was existiert bereits und was fehlt noch?">
          <p>Das Projekt baut auf der in <strong>Projekt 06</strong> erstellten Infrastruktur auf. Der Domain Controller mit DHCP, DNS und File Server ist bereits konfiguriert. Die SMB-Freigabe <code>\\FileServer\Unternehmensdaten</code> existiert mit 5 Abteilungsordnern und aktivierter ABE.</p>
          <SpecTable rows={[
            ["Komponente","Details"],
            ["Domain Controller","Windows Server 2019 Std. Eval. (WIN-QLN9UGPDOEA)"],
            ["Server-IP (statisch)","192.168.10.10 / 24"],
            ["Domäne","gfn_lab.local"],
            ["Virtualisierung","Hyper-V auf Remote Desktop (WIN-DSQN5G5QED1)"],
            ["Clients","6\u00D7 Windows 11 Pro / Enterprise (Domain Joined)"],
            ["File Server","SMB-Freigabe: \\\\FileServer\\Unternehmensdaten"],
            ["ABE","Aktiviert (Projekt 06)"],
            ["Benutzerkonten","Noch nicht vorhanden"],
            ["Sicherheitsgruppen","Noch nicht vorhanden"],
            ["Netzlaufwerk","Nicht zugeordnet — keine GPO vorhanden"],
          ]} />
        </Section>

        {/* ═══ 3. ARCHITEKTUR ═══ */}
        <Section num="3" title="Architektur" tagline="Welche Komponenten und Schichten werden aufgebaut?">
          <p>In diesem Projekt werden drei zusätzliche logische Schichten auf die bestehende Infrastruktur aufgesetzt:</p>
          <div className="p07-arch-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,margin:"24px 0"}}>
            <div className="p07-arch"><ArchCard icon={<UsersIcon />} title="Identitätsmanagement" desc="OUs, Benutzerkonten, Computer-Zuordnung in ADUC" /></div>
            <div className="p07-arch"><ArchCard icon={<ShieldIcon />} title="Zugriffskontrolle (RBAC)" desc="Sicherheitsgruppen, NTFS-Berechtigungen nach AGDLP" /></div>
            <div className="p07-arch"><ArchCard icon={<GearIcon />} title="Automatisierung (GPO)" desc="Laufwerkszuordnung Z: via Gruppenrichtlinie" /></div>
          </div>
          <SpecTable rows={[
            ["Abteilung","Computer","Benutzer","Sicherheitsgruppe"],
            ["IT","W11ENT-IT","Anna IT (a.IT)","SG_IT"],
            ["Finanz","W11P-FINANZ1/2","Max Finanz (m.finanz)","SG_Finanz"],
            ["Vertrieb","W11P-VERTRIEB1/2","Sarah Vertrieb (s.vertrieb)","SG_Vertrieb"],
            ["Betrieb","W11P-BETRIEB","Bob Betrieb (b.betrieb)","SG_Betrieb"],
          ]} />
        </Section>

        {/* ═══ 4. DURCHFÜHRUNG ═══ */}
        <Section num="4" title="Durchführung" tagline="Schritt für Schritt — mit Beweisen">

          {/* Phase 1 */}
          <PhaseLabel text="Phase 1 — Organisationsstruktur & Identitätsmanagement" />
          <p>Um die Verwaltung von Benutzern und Computern zu strukturieren, wird die Unternehmenshierarchie im Active Directory abgebildet.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="Organisationseinheiten (OUs) erstellen">
              Im „Active Directory-Benutzer und -Computer" (ADUC) werden unterhalb der Domäne (<code>gfn_lab.local</code>) vier neue OUs erstellt: <strong>IT</strong>, <strong>Finanz</strong>, <strong>Vertrieb</strong> und <strong>Betrieb</strong>. Per Rechtsklick auf die Domäne → Neu → Organisationseinheit.
            </StepItem>
          </div>
          <ProofFigure num={1} data={screenshots[1]} onClick={openLb} />
          <ProofFigure num={2} data={screenshots[2]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={2} title="Computer in Abteilungs-OUs verschieben">
              Die 6 Domänen-Computer werden aus dem Standard-Container „Computers" in die entsprechenden Abteilungs-OUs verschoben.
            </StepItem>
            <StepItem num={3} title="Testbenutzer anlegen">
              Für jede Abteilung wird ein Testbenutzer erstellt. Die Benennung folgt dem Schema <code>vorname.abteilung</code> (z.B. <strong>m.finanz</strong> für Max Finanz).
            </StepItem>
          </div>
          <ProofFigure num={3} data={screenshots[3]} onClick={openLb} />
          <ProofFigure num={4} data={screenshots[4]} onClick={openLb} />
          <ProofFigure num={5} data={screenshots[5]} onClick={openLb} />
          <ProofFigure num={6} data={screenshots[6]} onClick={openLb} />

          {/* Phase 2 */}
          <PhaseLabel text="Phase 2 — Rollenbasierte Zugriffskontrolle (RBAC)" />
          <p>Die Dateiberechtigungen werden nach dem <strong>AGDLP-Prinzip</strong> strukturiert. Benutzern werden niemals direkte Berechtigungen erteilt — stattdessen werden globale Sicherheitsgruppen verwendet.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="Globale Sicherheitsgruppen erstellen">
              In jeder Abteilungs-OU wird eine globale Sicherheitsgruppe erstellt: <strong>SG_Finanz</strong>, <strong>SG_IT</strong>, <strong>SG_Vertrieb</strong>, <strong>SG_Betrieb</strong>. Gruppenbereich: Global, Gruppentyp: Sicherheit.
            </StepItem>
          </div>
          <ProofFigure num={7} data={screenshots[7]} onClick={openLb} />
          <ProofFigure num={8} data={screenshots[8]} onClick={openLb} />
          <ProofFigure num={9} data={screenshots[9]} onClick={openLb} />
          <ProofFigure num={10} data={screenshots[10]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={2} title="NTFS-Vererbung deaktivieren">
              Für jeden Abteilungsordner wird die NTFS-Vererbung unterbrochen: Eigenschaften → Sicherheit → Erweitert → „Vererbung deaktivieren". Standardbenutzer (Users) werden entfernt.
            </StepItem>
          </div>
          <ProofFigure num={11} data={screenshots[11]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={3} title={`Sicherheitsgruppen mit „Ändern" zuweisen`}>
              Die jeweilige Sicherheitsgruppe (z.B. SG_Finanz) wird dem Abteilungsordner mit der Berechtigung „Ändern" (Modify) hinzugefügt. Der Ordner „Gemeinsam" erhält „Ändern" für alle Domänen-Benutzer.
            </StepItem>
          </div>
          <ProofFigure num={12} data={screenshots[12]} onClick={openLb} />

          {/* Phase 3 */}
          <PhaseLabel text="Phase 3 — Automatisierte Bereitstellung via GPO" />
          <p>Um manuelle Konfigurationen an den Clients zu vermeiden, wird das Netzlaufwerk über eine zentrale Gruppenrichtlinie (GPO) automatisch verteilt.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="GPO erstellen und verknüpfen">
              In der Gruppenrichtlinienverwaltung wird auf Domänenebene das GPO <strong>GPO_Netzlaufwerk_Z</strong> erstellt und verknüpft.
            </StepItem>
          </div>
          <ProofFigure num={13} data={screenshots[13]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={2} title="Laufwerkszuordnung konfigurieren">
              Unter <strong>Benutzerkonfiguration → Einstellungen → Windows-Einstellungen → Laufwerkszuordnungen</strong> wird eine neue Zuordnung angelegt.
            </StepItem>
          </div>
          <ProofFigure num={14} data={screenshots[14]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={3} title="Laufwerkseigenschaften festlegen">
              Aktion: <strong>Aktualisieren</strong>. Speicherort: <code>\\FileServer\Unternehmensdaten</code>. Laufwerksbuchstabe: <strong>Z:</strong>. Beschriftung: <strong>Firmenordner</strong>. Verbindung wiederherstellen: aktiviert.
            </StepItem>
          </div>
          <ProofFigure num={15} data={screenshots[15]} onClick={openLb} />
          <ProofFigure num={16} data={screenshots[16]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={4} title="Client-Test und ABE-Validierung">
              Nach Anmeldung als Vertriebsmitarbeiter (s.vertrieb) wird Laufwerk Z: automatisch verbunden. Dank ABE sind nur <strong>Gemeinsam</strong> und <strong>Vertrieb_Abteilung</strong> sichtbar.
            </StepItem>
          </div>
          <ProofFigure num={17} data={screenshots[17]} onClick={openLb} />
          <ProofFigure num={18} data={screenshots[18]} onClick={openLb} />
        </Section>

        {/* ═══ 5. PROBLEME & LÖSUNGEN ═══ */}
        <Section num="5" title="Probleme & L\u00F6sungen" tagline="Was ist schiefgelaufen und wie wurde es behoben?">
          <IssueCard type="problem" title="Problem: GPO wird nach Anmeldung nicht sofort angewendet">
            <p style={{margin:0}}>Nach dem Erstellen der GPO und der ersten Benutzeranmeldung am Client wurde das Laufwerk Z: nicht sofort sichtbar. Gruppenrichtlinien werden standardmä\u00DFig nicht in Echtzeit angewendet, sondern beim nächsten Anmeldezyklus oder nach dem Aktualisierungsintervall (90 Min. \u00B1 30 Min.).</p>
          </IssueCard>
          <IssueCard type="solution" title="L\u00F6sung: gpupdate /force und Neuanmeldung">
            <p style={{margin:0}}>Auf dem Client wurde <code>gpupdate /force</code> ausgeführt, um die sofortige Aktualisierung aller Richtlinien zu erzwingen. Nach Ab- und Neuanmeldung war das Laufwerk Z: sofort verfügbar.</p>
          </IssueCard>
          <NoteBlock title="Praxishinweis">
            In einer Produktionsumgebung sollten GPOs vor dem Rollout an einem Testclient validiert werden. Der Befehl <code>gpresult /r</code> zeigt an, welche GPOs tatsächlich angewendet wurden — ein unverzichtbares Diagnosetool.
          </NoteBlock>
          <NoteBlock title="Abweichung: NTFS vs. Freigabe">
            Auf Freigabe-Ebene wurde „Jeder = Vollzugriff" beibehalten (aus Projekt 06). Die granulare Steuerung erfolgt ausschlie\u00DFlich über NTFS-Berechtigungen — entspricht der Microsoft Best Practice.
          </NoteBlock>
        </Section>

        {/* ═══ 6. ERGEBNIS ═══ */}
        <Section num="6" title="Ergebnis" tagline="Zusammenfassung und Nachweis">
          <p>Das Identitätsmanagement, die rollenbasierte Zugriffskontrolle und die automatisierte Laufwerkszuordnung wurden erfolgreich implementiert:</p>
          <ResultTable rows={[
            ["Kriterium","Status","Nachweis"],
            ["OUs erstellt (IT, Finanz, Vertrieb, Betrieb)","Erfüllt","Abb. 1\u20132"],
            ["Computer in Abteilungs-OUs verschoben","Erfüllt","Abb. 2"],
            ["6 Testbenutzer angelegt","Erfüllt","Abb. 3\u20136"],
            ["4 Sicherheitsgruppen erstellt (SG_*)","Erfüllt","Abb. 7\u201310"],
            ["NTFS-Vererbung deaktiviert","Erfüllt","Abb. 11"],
            ["Sicherheitsgruppen mit 'Ändern' zugewiesen","Erfüllt","Abb. 12"],
            ["GPO erstellt und verknüpft","Erfüllt","Abb. 13\u201314"],
            ["Laufwerk Z: konfiguriert","Erfüllt","Abb. 15\u201316"],
            ["Client-Test: Laufwerk verbunden","Erfüllt","Abb. 17"],
            ["ABE-Test: Nur autorisierte Ordner sichtbar","Erfüllt","Abb. 18"],
          ]} />

          <div style={{margin:"32px 0",padding:"28px 32px",background:"linear-gradient(135deg,#E8F4FD,#F0F6FC)",border:"1px solid rgba(0,120,212,.2)",borderRadius:16}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"#0078D4",marginBottom:10}}>Fazit</div>
            <p>Dieses Projekt vervollständigt die in Projekt 06 begonnene Infrastruktur um die entscheidende Ebene der <strong>Identitäts- und Zugriffsverwaltung</strong>. Die Kombination aus ADUC-Struktur, AGDLP-basierter Rechtevergabe und GPO-gesteuerter Laufwerkszuordnung bildet ein praxisnahes Modell, wie es in realen Unternehmensumgebungen eingesetzt wird.</p>
            <p style={{marginBottom:0}}><strong>Projektkette:</strong> Projekt 01 (Upgrade) → Projekt 02 (USMT) → Projekt 05 (AD) → Projekt 06 (Domänen-Infrastruktur) → <strong>Projekt 07 (Identity & Access Management)</strong>. Die IT-Infrastruktur ist nun vollständig aufgebaut — von der Systemmigration bis zur automatisierten Bereitstellung.</p>
          </div>
        </Section>

        {/* ═══ PROJEKT NAVIGATION ═══ */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:32,paddingBottom:16,borderTop:"1px solid #E1E5EB",marginTop:32}}>
          <a href="/projekt/windows/netzwerk-infrastruktur" style={{textDecoration:"none",color:"inherit"}}>
            <p style={{fontSize:12,color:"#7A8599",marginBottom:4}}>← Vorheriges Projekt</p>
            <p style={{fontSize:14,fontWeight:600,color:"#4A5568"}}>Projekt 06: Zentrale Domäneninfrastruktur & DHCP</p>
          </a>
          <a href="/projekt/windows/client-hardening" style={{textDecoration:"none",color:"inherit",textAlign:"right"}}>
            <p style={{fontSize:12,color:"#7A8599",marginBottom:4}}>Nächstes Projekt →</p>
            <p style={{fontSize:14,fontWeight:600,color:"#4A5568"}}>Projekt 08: Zentrales Endpoint Hardening</p>
          </a>
        </div>

        {/* ═══ 7. SCREENSHOTS ═══ */}
        <Section num="7" title="Screenshots (Proof)" tagline="Alle Nachweise auf einen Blick">
          <SpecTable rows={[
            ["Abb.","Beschreibung"],
            ...Object.entries(screenshots).map(([num, data]) => [`Abb. ${num}`, data.desc])
          ]} />
        </Section>

        {/* ═══ 4. SCHRITT-FÜR-SCHRITT ANLEITUNG ═══ */}
        <section style={{padding:"56px 0",borderBottom:"1px solid #E1E5EB",background:"linear-gradient(135deg, #F0FFF4 0%, #F7FFFB 50%, #FAFBFC 100%)"}}>
          <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px"}}>
            {/* Section Header */}
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:24}}>
              <div style={{flexShrink:0,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",background:"#107C10",color:"#fff",borderRadius:10,fontSize:16,fontWeight:700,marginTop:2}}>4</div>
              <div>
                <h2 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-.01em",lineHeight:1.3,margin:0}}>Schritt-für-Schritt Anleitung</h2>
                <div style={{fontSize:14,color:"#107C10",fontWeight:500,marginTop:2}}>Zum Nachmachen — So konfigurierst du es selbst</div>
              </div>
            </div>

            {/* Intro Callout */}
            <div style={{margin:"0 0 32px",padding:"20px 24px",background:"#fff",border:"1px solid #C6F6D5",borderLeft:"4px solid #107C10",borderRadius:"0 12px 12px 0",display:"flex",alignItems:"center",gap:14}}>
              <BookIcon />
              <div style={{fontSize:14,color:"#2D3748",lineHeight:1.6}}>
                <strong>Diese Anleitung zeigt dir Schritt für Schritt, wie du dieses Projekt selbst nachbauen kannst.</strong> Folge den exakten Klickpfaden, um die Identity & Access Management Struktur in deiner eigenen Active-Directory-Umgebung einzurichten.
              </div>
            </div>

            {/* Step 1: OUs erstellen */}
            <AnleitungStep num="1" title="Organisationseinheiten (OUs) erstellen">
              <p style={{margin:"0 0 8px"}}>Öffne den <strong>Server-Manager</strong> und navigiere zu:</p>
              <GpoPathDisplay path="Server-Manager > Tools > Active Directory-Benutzer und -Computer" />
              <p style={{margin:"8px 0"}}>Rechtsklick auf die Domäne <code>gfn_lab.local</code> → <strong>Neu</strong> → <strong>Organisationseinheit</strong></p>
              <p style={{margin:"8px 0"}}>Erstelle vier OUs nacheinander:</p>
              <div style={{margin:"8px 0",paddingLeft:20}}>
                <div style={{margin:"4px 0"}}>1. <strong>IT</strong></div>
                <div style={{margin:"4px 0"}}>2. <strong>Finanz</strong></div>
                <div style={{margin:"4px 0"}}>3. <strong>Vertrieb</strong></div>
                <div style={{margin:"4px 0"}}>4. <strong>Betrieb</strong></div>
              </div>
              <p style={{margin:"8px 0 0"}}>Bestätige jede Eingabe mit <strong>OK</strong>.</p>
            </AnleitungStep>

            {/* Step 2: Computer in OUs verschieben */}
            <AnleitungStep num="2" title="Computer in Abteilungs-OUs verschieben">
              <p style={{margin:"0 0 8px"}}>Im Fenster <strong>Active Directory-Benutzer und -Computer</strong> findest du alle Domänen-Computer unter <code>Computers</code>.</p>
              <p style={{margin:"8px 0"}}>Für jeden Computer: Rechtsklick → <strong>Verschieben</strong> und wähle die entsprechende Abteilungs-OU:</p>
              <div style={{margin:"8px 0",paddingLeft:20}}>
                <div style={{margin:"4px 0"}}>- <strong>W11ENT-IT</strong> → OU IT</div>
                <div style={{margin:"4px 0"}}>- <strong>W11P-FINANZ1</strong>, <strong>W11P-FINANZ2</strong> → OU Finanz</div>
                <div style={{margin:"4px 0"}}>- <strong>W11P-VERTRIEB1</strong>, <strong>W11P-VERTRIEB2</strong> → OU Vertrieb</div>
                <div style={{margin:"4px 0"}}>- <strong>W11P-BETRIEB</strong> → OU Betrieb</div>
              </div>
            </AnleitungStep>

            {/* Step 3: Benutzer erstellen */}
            <AnleitungStep num="3" title="Testbenutzer anlegen">
              <p style={{margin:"0 0 8px"}}>Für jede Abteilung wird ein Testbenutzer erstellt. Navigiere in die entsprechende OU.</p>
              <p style={{margin:"8px 0"}}>Rechtsklick → <strong>Neu</strong> → <strong>Benutzer</strong></p>
              <p style={{margin:"8px 0"}}>Verwende das Namensmuster <code>vorname.abteilung</code>:</p>
              <div style={{margin:"8px 0",paddingLeft:20}}>
                <div style={{margin:"4px 0"}}>- <strong>a.IT</strong> (Anna IT) in OU IT</div>
                <div style={{margin:"4px 0"}}>- <strong>m.finanz</strong> (Max Finanz) in OU Finanz</div>
                <div style={{margin:"4px 0"}}>- <strong>s.vertrieb</strong> (Sarah Vertrieb) in OU Vertrieb</div>
                <div style={{margin:"4px 0"}}>- <strong>b.betrieb</strong> (Bob Betrieb) in OU Betrieb</div>
              </div>
              <p style={{margin:"8px 0"}}>Setze ein Passwort (z.B. <code>Test@1234</code>) und deaktiviere „Benutzer muss Passwort bei der nächsten Anmeldung ändern".</p>
            </AnleitungStep>

            {/* Step 4: Sicherheitsgruppen erstellen */}
            <AnleitungStep num="4" title="Globale Sicherheitsgruppen erstellen">
              <p style={{margin:"0 0 8px"}}>Navigiere in jede Abteilungs-OU und erstelle eine globale Sicherheitsgruppe.</p>
              <p style={{margin:"8px 0"}}>Rechtsklick in der OU → <strong>Neu</strong> → <strong>Gruppe</strong></p>
              <p style={{margin:"8px 0"}}>Einstellungen:</p>
              <div style={{margin:"8px 0"}}>
                <GpoSetting name="Gruppenname" value="SG_IT / SG_Finanz / SG_Vertrieb / SG_Betrieb" />
                <GpoSetting name="Gruppenbereich" value="Global" />
                <GpoSetting name="Gruppentyp" value="Sicherheit" />
              </div>
              <p style={{margin:"8px 0"}}>Füge die entsprechenden Benutzer in jede Gruppe ein: Rechtsklick auf Gruppe → <strong>Mitglieder</strong> → <strong>Hinzufügen</strong>.</p>
            </AnleitungStep>

            {/* Step 5: NTFS-Berechtigungen */}
            <AnleitungStep num="5" title="NTFS-Berechtigungen nach AGDLP konfigurieren">
              <p style={{margin:"0 0 8px"}}>Öffne auf dem File Server die Ordner <code>\\FileServer\Unternehmensdaten</code> auf dem Dateisystem.</p>
              <p style={{margin:"8px 0"}}>Für jeden Abteilungsordner (z.B. <code>Finanz_Abteilung</code>):</p>
              <p style={{margin:"8px 0"}}>1. <strong>Vererbung deaktivieren:</strong></p>
              <div style={{margin:"8px 0",paddingLeft:20}}>
                <div style={{fontSize:13,color:"#4A5568"}}>Eigenschaften → Sicherheit → Erweitert → „Vererbung deaktivieren"</div>
                <div style={{margin:"4px 0"}}>Bestätige die Warnung mit „Alle ererbten Berechtigungen in explizite Berechtigungen konvertieren"</div>
              </div>
              <p style={{margin:"8px 0"}}>2. <strong>Standardbenutzer entfernen:</strong> Wähle „Users" aus und klicke <strong>Entfernen</strong>.</p>
              <p style={{margin:"8px 0"}}>3. <strong>Sicherheitsgruppe hinzufügen:</strong> Klicke <strong>Bearbeiten</strong> → <strong>Hinzufügen</strong> → gib die Sicherheitsgruppe ein (z.B. <code>SG_Finanz</code>) → Berechtigung: <strong>Ändern</strong> (Modify)</p>
              <p style={{margin:"8px 0 0"}}>Der Ordner <code>Gemeinsam</code> erhält Rechte für alle Domänen-Benutzer mit <strong>Ändern</strong>-Berechtigung.</p>
            </AnleitungStep>

            {/* Step 6: GPO erstellen */}
            <AnleitungStep num="6" title="Gruppenrichtlinienobjekt (GPO) für Laufwerkszuordnung erstellen">
              <p style={{margin:"0 0 8px"}}>Öffne den Server-Manager:</p>
              <GpoPathDisplay path="Server-Manager > Tools > Gruppenrichtlinienverwaltung" />
              <p style={{margin:"8px 0"}}>Navigiere zu <strong>Gesamtstruktur › Domänen › gfn_lab.local</strong>.</p>
              <p style={{margin:"8px 0"}}>Rechtsklick auf die Domäne → <strong>Gruppenrichtlinienobjekt hier erstellen und verknüpfen...</strong></p>
              <p style={{margin:"8px 0"}}>Name: <code>GPO_Netzlaufwerk_Z</code> → <strong>OK</strong></p>
            </AnleitungStep>

            {/* Step 7: Laufwerkszuordnung konfigurieren */}
            <AnleitungStep num="7" title="Laufwerkszuordnung in der GPO konfigurieren">
              <p style={{margin:"0 0 8px"}}>Rechtsklick auf <strong>GPO_Netzlaufwerk_Z</strong> → <strong>Bearbeiten</strong> (Der Editor öffnet sich)</p>
              <GpoPathDisplay path="Benutzerkonfiguration > Einstellungen > Windows-Einstellungen > Laufwerkszuordnungen" />
              <p style={{margin:"8px 0"}}>Rechtsklick im leeren Bereich → <strong>Neu</strong> → <strong>Zugeordnetes Laufwerk</strong></p>
              <p style={{margin:"8px 0"}}>Gib folgende Werte ein:</p>
              <div style={{margin:"8px 0"}}>
                <GpoSetting name="Aktion" value="Aktualisieren" />
                <GpoSetting name="Speicherort" value="\\FileServer\Unternehmensdaten" />
                <GpoSetting name="Laufwerksbuchstabe" value="Z:" />
                <GpoSetting name="Beschriftung" value="Firmenordner" />
                <GpoSetting name="Verbindung wiederherstellen" value="Ja" />
              </div>
              <p style={{margin:"8px 0 0"}}>Klicke <strong>OK</strong>.</p>
            </AnleitungStep>

            {/* Step 8: Test */}
            <AnleitungStep num="8" title="Richtlinien anwenden und testen">
              <p style={{margin:"0 0 8px"}}>Melde dich an einem Client-PC an (z.B. als <strong>s.vertrieb</strong> in der Vertrieb-OU).</p>
              <p style={{margin:"0 0 8px"}}>Öffne das Terminal und führe folgende Befehle aus:</p>
              <div style={{margin:"8px 0",padding:"8px 14px",background:"#EEF1F5",borderRadius:6,fontFamily:"'Cascadia Code',monospace",fontSize:12,color:"#005A9E"}}>
                gpupdate /force
              </div>
              <p style={{margin:"8px 0"}}>Nach dem Neustart sollte das Laufwerk <strong>Z:</strong> automatisch verbunden sein.</p>
              <p style={{margin:"8px 0"}}>Öffne den <strong>Datei-Explorer</strong> → <strong>Dieser PC</strong> → Laufwerk Z: sollte sichtbar sein.</p>
              <p style={{margin:"8px 0 0"}}>Dank Access-Based Enumeration (ABE) siehst du nur Ordner, auf die deine Gruppe Zugriff hat (z.B. als Vertriebsmitarbeiter: nur <strong>Gemeinsam</strong> und <strong>Vertrieb_Abteilung</strong>).</p>
            </AnleitungStep>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{padding:"40px 0",textAlign:"center",background:"#EEF1F5",borderTop:"1px solid #E1E5EB"}}>
          <p style={{fontSize:13,color:"#7A8599",margin:0}}>
            © 2026 <a href="https://gokhanzehirlioglu.de" style={{color:"#0078D4",textDecoration:"none"}}>gokhanzehirlioglu.de</a> — Fachinformatiker Systemintegration
          </p>
        </footer>
      </div>
    </Layout>
  );
}
