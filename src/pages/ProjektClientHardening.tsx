import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useState, type ReactNode } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { Download } from "lucide-react";

const IMG = "/images/microsoft/projekt8";

const screenshots: Record<number, { file: string; desc: string }> = {
  1: { file: "projekt8_1.png", desc: "Gruppenrichtlinienverwaltung — GPO_Client_Hardening erstellt und mit Domäne verknüpft" },
  2: { file: "projekt8_3.png", desc: "USB-Sperre — Alle Wechselmedienklassen: Jeglichen Zugriff verweigern = Aktiviert" },
  3: { file: "projekt8_4.png", desc: "Bildschirmschoner aktivieren — Richtlinie auf Aktiviert gesetzt" },
  4: { file: "projekt8_5.png", desc: "Kennwortschutz für Bildschirmschoner — Aktiviert" },
  5: { file: "projekt8_6.png", desc: "Zeitlimit für Bildschirmschoner — 300 Sekunden (5 Minuten)" },
  6: { file: "projekt8_7.png", desc: "Zugriff auf Eingabeaufforderung verhindern — Aktiviert" },
  7: { file: "projekt8_8.png", desc: "Zugriff auf Registrierungs-Editor verhindern — Aktiviert" },
  8: { file: "projekt8_2.png", desc: "Desktophintergrund — UNC-Pfad zum Firmenlogo konfiguriert" },
  9: { file: "projekt8_9.png", desc: "Client-Test — CMD blockiert: Die Eingabeaufforderung ist vom Administrator deaktiviert worden" },
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
const LockIcon = () => <span style={{fontSize:18}}>🔒</span>;
const TerminalIcon = () => <span style={{fontSize:18}}>💻</span>;
const PaletteIcon = () => <span style={{fontSize:18}}>🎨</span>;
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
    <figure onClick={() => onClick(data.file, data.desc)} className="p08-proof" style={{margin:"28px 0",borderRadius:12,overflow:"hidden",border:"1px solid #E1E5EB",background:"#fff",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",cursor:"zoom-in",transition:"box-shadow .3s, transform .2s"}}>
      <img src={`${IMG}/${data.file}`} alt={data.desc} style={{width:"100%",display:"block"}} loading="lazy" />
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
export default function ProjektClientHardening() {
  const [lbSrc, setLbSrc] = useState<string | null>(null);
  const [lbAlt, setLbAlt] = useState("");

  const openLb = (file: string, alt: string) => { setLbSrc(`${IMG}/${file}`); setLbAlt(alt); };
  const closeLb = () => { setLbSrc(null); };

  return (
    <Layout>
      <Helmet>
        <title>Projekt 08: Client-Hardening & Corporate Identity – Gökhan Zehirlioglu</title>
        <meta name="description" content="GPO-basiertes Endpoint Hardening: USB-Sperre, Bildschirmsperre, CMD/Regedit-Blockierung und Corporate Identity — mit eingebetteter Schritt-für-Schritt Anleitung." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;600&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .p08-root { font-family:'Inter','Segoe UI',system-ui,sans-serif; background:#FAFBFC; color:#1A1A1A; line-height:1.75; font-size:16px; -webkit-font-smoothing:antialiased; }
        .p08-root ::selection { background:#0078D4; color:#fff; }
        .p08-root img { max-width:100%; height:auto; }
        .p08-root code { font-family:'Cascadia Code','Consolas',monospace; font-size:12.5px; background:#EEF1F5; padding:2px 8px; border-radius:4px; color:#005A9E; border:1px solid #E1E5EB; }
        .p08-root p { margin:0 0 16px; font-size:15.5px; color:#4A5568; line-height:1.8; }
        .p08-root p strong { color:#1A1A1A; font-weight:600; }
        .p08-proof:hover { box-shadow:0 8px 32px rgba(0,0,0,.1); transform:translateY(-2px); }
        .p08-arch:hover { border-color:#0078D4 !important; box-shadow:0 2px 12px rgba(0,120,212,.1) !important; }
        @media(max-width:768px) { .p08-arch-grid { grid-template-columns:1fr 1fr !important; } }
        @media(max-width:560px) { .p08-arch-grid { grid-template-columns:1fr !important; } .p08-hero { padding:40px 0 !important; } }
      `}</style>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={closeLb} />

      <div className="p08-root">
        {/* ═══ HERO ═══ */}
        <header className="p08-hero" style={{background:"linear-gradient(135deg,#001D3D 0%,#002B5C 50%,#005A9E 100%)",color:"#fff",padding:"60px 0 56px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}} />
          <div style={{position:"absolute",top:-120,right:-80,width:400,height:400,background:"radial-gradient(circle,rgba(0,120,212,.2) 0%,transparent 70%)",pointerEvents:"none"}} />

          <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px",position:"relative",zIndex:2}}>
            <nav style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:28,flexWrap:"wrap"}}>
              <a href="/" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>System & Server Administration</a>
              <span style={{opacity:.4}}>›</span>
              <a href="/windows-projekte" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Microsoft Enterprise IT</a>
              <span style={{opacity:.4}}>›</span>
              <a href="/windows-projekte" style={{color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>Modul 2: Identity & Server</a>
              <span style={{opacity:.4}}>›</span>
              <span style={{color:"#4EA8DE",fontWeight:500}}>Projekt 08</span>
            </nav>

            <h1 style={{fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:700,lineHeight:1.2,letterSpacing:"-.02em",marginBottom:12}}>
              Zentrales Endpoint Hardening<br/>& Security Management
            </h1>
            <p style={{fontSize:"1.05rem",fontWeight:300,color:"rgba(255,255,255,0.7)",lineHeight:1.6,maxWidth:600,marginBottom:32}}>
              Vier kritische Quick Wins in einem GPO: USB-Sperre, Bildschirmsperre, CMD/Regedit-Blockierung und zentrales Firmen-Hintergrundbild — inklusive Schritt-für-Schritt Anleitung zum Nachbauen.
            </p>

            <div style={{display:"flex",flexWrap:"wrap",gap:28,marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><CalendarIcon /><strong style={{color:"#fff",fontWeight:500}}>26.03.2026</strong></div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><MonitorIcon /><strong style={{color:"#fff",fontWeight:500}}>Hyper-V</strong>&nbsp;auf Remote Desktop</div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><UserIcon /><strong style={{color:"#fff",fontWeight:500}}>Gokhan Zehirlioglu</strong></div>
            </div>

            {/* Download Buttons */}
            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:8}}>
              <a
                href="/downloads/Projekt08_Client_Hardening.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,color:"#fff",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Dokumentation (DOCX)
              </a>
              <a
                href="/downloads/Anleitung_Client_Hardening_GPO.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(16,124,16,.15)",border:"1px solid rgba(16,124,16,.35)",borderRadius:8,color:"#7CFC7C",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Anleitung (DOCX)
              </a>
            </div>

            <ProjectRuler currentId={8} />
          </div>
        </header>

        {/* ═══ 1. ZIEL ═══ */}
        <Section num="1" title="Ziel" tagline="Was wird hier gemacht und warum?">
          <p>In diesem Projekt wird die <strong>Sicherheit der Endgeräte (Endpoint Hardening)</strong> drastisch erhöht und gleichzeitig die <strong>Corporate Identity</strong> (Unternehmensidentität) zentral durchgesetzt. Anstatt jeden Client-PC einzeln zu konfigurieren, werden vier kritische „Quick Wins" in einem einzigen <strong>Gruppenrichtlinienobjekt (GPO)</strong> gebündelt:</p>
          <div className="p08-arch-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,margin:"24px 0"}}>
            <div className="p08-arch"><ArchCard icon={<ShieldIcon />} title="USB-Sperre" desc="Zero-Trust Data Loss Prevention — kein Zugriff auf Wechselmedien" /></div>
            <div className="p08-arch"><ArchCard icon={<LockIcon />} title="Bildschirmsperre" desc="Automatisches Timeout nach 5 Min. — DSGVO-konform" /></div>
            <div className="p08-arch"><ArchCard icon={<TerminalIcon />} title="CMD & Regedit" desc="Systemwerkzeuge für Endbenutzer gesperrt — Ransomware-Schutz" /></div>
            <div className="p08-arch"><ArchCard icon={<PaletteIcon />} title="Corporate Identity" desc="Firmen-Hintergrundbild zentral auf allen Clients erzwungen" /></div>
          </div>
          <p>Das Ergebnis ist eine <strong>zentral gesteuerte, DSGVO-konforme Endpunkt-Sicherheit</strong>, die ohne manuelle Konfiguration auf jedem Domänen-Client automatisch greift.</p>
        </Section>

        {/* ═══ 2. AUSGANGSSITUATION ═══ */}
        <Section num="2" title="Ausgangssituation" tagline="Was existiert bereits und was fehlt noch?">
          <p>Das Projekt baut auf der in <strong>Projekt 05–07</strong> aufgebauten Infrastruktur auf. Active Directory, DHCP, DNS, File Server mit ABE und RBAC-basierte Berechtigungen sind bereits konfiguriert.</p>
          <SpecTable rows={[
            ["Komponente","Details"],
            ["Domain Controller","Windows Server 2019 Std. Eval."],
            ["Domäne","gfn_lab.local"],
            ["Clients","6× Windows 11 Pro / Enterprise (Domain Joined)"],
            ["Vorhandene GPOs","GPO_Netzlaufwerk_Z (Projekt 07)"],
            ["Endpoint Security","Nicht vorhanden — keine Hardening-Richtlinien"],
            ["Corporate Identity","Nicht vorhanden — kein einheitliches Erscheinungsbild"],
          ]} />
        </Section>

        {/* ═══ 3. DURCHFÜHRUNG ═══ */}
        <Section num="3" title="Durchführung" tagline="Schritt für Schritt — mit Beweisen">

          {/* Phase 1 */}
          <PhaseLabel text="Phase 1 — Erstellung des zentralen Sicherheits-GPOs" />
          <p>Um alle Sicherheitsrichtlinien zentral zu verwalten, wird eine neue GPO auf Domänenebene erstellt.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="GPO erstellen und verknüpfen">
              In der Gruppenrichtlinienverwaltung wird unter der Domäne <code>gfn_lab.local</code> ein neues GPO mit dem Namen <strong>GPO_Client_Hardening</strong> erstellt und verknüpft.
            </StepItem>
          </div>
          <ProofFigure num={1} data={screenshots[1]} onClick={openLb} />

          {/* Phase 2 */}
          <PhaseLabel text="Phase 2 — Data Loss Prevention & Endpoint Hardening" />
          <p>Die folgenden Richtlinien werden im Editor unter <strong>Benutzerkonfiguration › Richtlinien › Administrative Vorlagen</strong> konfiguriert:</p>

          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="USB-Sperre (Zero-Trust DLP)">
              Um Datendiebstahl oder das Einschleusen von Malware zu verhindern, wird der Zugriff auf alle Wechseldatenträger (z.B. USB-Sticks) komplett untersagt.<br/>
              <strong>Pfad:</strong> System › Wechselmedienzugriff<br/>
              <strong>Einstellung:</strong> „Alle Wechselmedienklassen: Jeglichen Zugriff verweigern" → <strong>Aktiviert</strong>
            </StepItem>
          </div>
          <ProofFigure num={2} data={screenshots[2]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={2} title="Automatische Bildschirmsperre (Inaktivitäts-Timeout)">
              Zur Einhaltung von Sicherheitsstandards (und DSGVO/KVKK Vorgaben) wird der Bildschirm gesperrt, wenn der Mitarbeiter seinen Arbeitsplatz verlässt.<br/>
              <strong>Pfad:</strong> Systemsteuerung › Anpassung<br/>
              <strong>Einstellungen:</strong> „Bildschirmschoner aktivieren" (Aktiviert), „Kennwortschutz für den Bildschirmschoner verwenden" (Aktiviert). Das „Zeitlimit für Bildschirmschoner" wird auf <strong>300 Sekunden</strong> (5 Minuten) festgelegt.
            </StepItem>
          </div>
          <ProofFigure num={3} data={screenshots[3]} onClick={openLb} />
          <ProofFigure num={4} data={screenshots[4]} onClick={openLb} />
          <ProofFigure num={5} data={screenshots[5]} onClick={openLb} />

          <div style={{margin:"20px 0"}}>
            <StepItem num={3} title="Sperrung von Systemwerkzeugen (CMD & Regedit)">
              Endbenutzer benötigen keinen Zugriff auf tiefgreifende Systemwerkzeuge. Diese sind oft Einfallstore für Ransomware.<br/>
              <strong>Pfad:</strong> System<br/>
              <strong>Einstellung 1:</strong> „Zugriff auf Eingabeaufforderung verhindern" → <strong>Aktiviert</strong><br/>
              <strong>Einstellung 2:</strong> „Zugriff auf Programme zum Bearbeiten der Registrierung verhindern" → <strong>Aktiviert</strong>
            </StepItem>
          </div>
          <ProofFigure num={6} data={screenshots[6]} onClick={openLb} />
          <ProofFigure num={7} data={screenshots[7]} onClick={openLb} />

          {/* Phase 3: Corporate Identity */}
          <PhaseLabel text="Phase 3 — Corporate Identity (Zentrales Hintergrundbild)" />
          <p>Das Firmenlogo wird als standardisiertes Hintergrundbild auf allen Clients erzwungen. Das Bild (<code>gfn-logo.jpg</code>) wird vorab zentral auf dem FileServer unter <code>\\Gemeinsam</code> abgelegt.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="Desktophintergrund per GPO erzwingen">
              Die Richtlinie „Desktophintergrund" wird auf <strong>Aktiviert</strong> gesetzt. Als Hintergrundname wird der UNC-Pfad eingetragen: <code>\\FileServer\Unternehmensdaten\Gemeinsam\gfn-logo.jpg</code> (Stil: Zentriert/Ausfüllen).
            </StepItem>
          </div>
          <ProofFigure num={8} data={screenshots[8]} onClick={openLb} />
          <NoteBlock title="Hinweis: Netzwerk beim Start abwarten">
            Um sicherzustellen, dass das Bild auch bei langsamen Netzwerkverbindungen beim Booten geladen wird, wurde zusätzlich die Computerrichtlinie „Beim Neustart des Computers und bei der Anmeldung immer auf das Netzwerk warten" aktiviert.
          </NoteBlock>

          {/* Phase 4: Test */}
          <PhaseLabel text="Phase 4 — Client-Test und Verifizierung" />
          <p>Nachdem die GPO aktiv ist, wird ein Client-Test auf dem Windows 11 Rechner (<strong>W11P-Vertrieb2</strong>) durchgeführt.</p>
          <div style={{margin:"20px 0"}}>
            <StepItem num={1} title="CMD-Sperrung verifizieren">
              Der Mitarbeiter versucht, die Eingabeaufforderung (CMD) zu öffnen. <strong>Ergebnis:</strong> Die GPO greift sofort. Das System blockiert die Ausführung mit der Meldung: „Die Eingabeaufforderung ist vom Administrator deaktiviert worden." Die System-Härtung ist somit zu <strong>100 %</strong> erfolgreich abgeschlossen.
            </StepItem>
          </div>
          <ProofFigure num={9} data={screenshots[9]} onClick={openLb} />
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
                <strong>Diese Anleitung zeigt dir Schritt für Schritt, wie du dieses Projekt selbst nachbauen kannst.</strong> Folge den exakten Klickpfaden, um alle vier Sicherheitsrichtlinien in deiner eigenen Active-Directory-Umgebung einzurichten.
              </div>
            </div>

            {/* Step 1 */}
            <AnleitungStep num="1" title="Vorbereitung: Firmenlogo bereitstellen">
              <p style={{margin:"0 0 8px"}}>Speichere das Firmenlogo als JPEG-Datei (z.B. <code>gfn-logo.jpg</code>).</p>
              <p style={{margin:0}}>Kopiere die Datei auf den zentralen FileServer in einen freigegebenen Ordner, auf den alle Domänen-Benutzer <strong>Leserechte</strong> haben:</p>
              <div style={{margin:"8px 0",padding:"8px 14px",background:"#EEF1F5",borderRadius:6,fontFamily:"'Cascadia Code',monospace",fontSize:12,color:"#005A9E"}}>\\FileServer\Unternehmensdaten\Gemeinsam\gfn-logo.jpg</div>
            </AnleitungStep>

            {/* Step 2 */}
            <AnleitungStep num="2" title="Gruppenrichtlinienobjekt (GPO) erstellen">
              <p style={{margin:"0 0 8px"}}>Öffne den <strong>Server-Manager</strong> und navigiere zu:</p>
              <GpoPathDisplay path="Server-Manager > Tools > Gruppenrichtlinienverwaltung" />
              <p style={{margin:"8px 0"}}>Navigiere zu <strong>Gesamtstruktur › Domänen › gfn_lab.local</strong>.</p>
              <p style={{margin:"8px 0"}}>Rechtsklick auf den Domänennamen → „Gruppenrichtlinienobjekt hier erstellen und verknüpfen..."</p>
              <p style={{margin:"8px 0"}}>Name: <code>GPO_Client_Hardening</code> → <strong>OK</strong></p>
              <p style={{margin:"8px 0"}}>Rechtsklick auf die neue GPO → <strong>Bearbeiten...</strong> (Der Editor öffnet sich)</p>
            </AnleitungStep>

            {/* Step 3A */}
            <AnleitungStep num="3A" title="USB-Sperre (Data Loss Prevention) aktivieren">
              <GpoPathDisplay path="Benutzerkonfiguration > Richtlinien > Administrative Vorlagen > System > Wechselmedienzugriff" />
              <p style={{margin:"8px 0"}}>Doppelklick auf:</p>
              <GpoSetting name={`„Alle Wechselmedienklassen: Jeglichen Zugriff verweigern"`} value="Aktiviert" />
              <p style={{margin:"8px 0 0"}}>Klicke <strong>OK</strong>.</p>
            </AnleitungStep>

            {/* Step 3B */}
            <AnleitungStep num="3B" title="Automatische Bildschirmsperre einrichten">
              <GpoPathDisplay path="Benutzerkonfiguration > Richtlinien > Administrative Vorlagen > Systemsteuerung > Anpassung" />
              <p style={{margin:"8px 0"}}>Drei Einstellungen nacheinander konfigurieren:</p>
              <div style={{margin:"8px 0 4px"}}>
                <GpoSetting name={`Aktion 1: „Bildschirmschoner aktivieren"`} value="Aktiviert" />
                <GpoSetting name={`Aktion 2: „Kennwortschutz für den Bildschirmschoner verwenden"`} value="Aktiviert" />
                <GpoSetting name={`Aktion 3: „Zeitlimit für Bildschirmschoner"`} value="300 Sekunden" />
              </div>
              <p style={{margin:"8px 0 0"}}>Unter <strong>Optionen</strong> die Sekunden auf <strong>300</strong> (für 5 Minuten) setzen → <strong>OK</strong>.</p>
            </AnleitungStep>

            {/* Step 3C */}
            <AnleitungStep num="3C" title="Systemwerkzeuge blockieren (CMD & Regedit)">
              <GpoPathDisplay path="Benutzerkonfiguration > Richtlinien > Administrative Vorlagen > System" />
              <div style={{margin:"8px 0"}}>
                <GpoSetting name={`Aktion 1: „Zugriff auf Eingabeaufforderung verhindern"`} value="Aktiviert" />
                <GpoSetting name={`Aktion 2: „Zugriff auf Programme zum Bearbeiten der Registrierung verhindern"`} value="Aktiviert" />
              </div>
            </AnleitungStep>

            {/* Step 3D */}
            <AnleitungStep num="3D" title="Firmen-Hintergrundbild erzwingen">
              <GpoPathDisplay path="Benutzerkonfiguration > Richtlinien > Administrative Vorlagen > Desktop > Desktop" />
              <p style={{margin:"8px 0"}}>Doppelklick auf „Desktophintergrund":</p>
              <GpoSetting name="Einstellung" value="Aktiviert" />
              <p style={{margin:"8px 0"}}><strong>Optionen:</strong></p>
              <div style={{margin:"4px 0",padding:"8px 14px",background:"#EEF1F5",borderRadius:6,fontFamily:"'Cascadia Code',monospace",fontSize:12,color:"#005A9E"}}>
                Hintergrundname: \\FileServer\Unternehmensdaten\Gemeinsam\gfn-logo.jpg
              </div>
              <p style={{margin:"8px 0 0"}}><strong>Hintergrundstil:</strong> Zentriert oder Ausfüllen → <strong>OK</strong></p>
            </AnleitungStep>

            {/* Step 3E */}
            <AnleitungStep num="3E" title={`„Black-Screen" Fix — Netzwerk beim Start abwarten`}>
              <NoteBlock title="Warum ist das nötig?">
                Damit das Hintergrundbild beim Systemstart vom Netzwerkserver geladen werden kann, muss der Client auf das Netzwerk warten. Ohne diese Einstellung erscheint beim ersten Start ein schwarzer Desktop.
              </NoteBlock>
              <GpoPathDisplay path="Computerkonfiguration > Richtlinien > Administrative Vorlagen > System > Anmelden" />
              <GpoSetting name={`„Beim Neustart des Computers und bei der Anmeldung immer auf das Netzwerk warten"`} value="Aktiviert" />
            </AnleitungStep>

            {/* Step 4 */}
            <AnleitungStep num="4" title="Richtlinien anwenden und testen">
              <p style={{margin:"0 0 8px"}}>Melde dich an einem Client-PC der Domäne an (z.B. als Standardbenutzer).</p>
              <p style={{margin:"0 0 8px"}}>Da die CMD gesperrt ist, drücke <strong>Windows-Taste + R</strong>, um den „Ausführen"-Dialog zu öffnen.</p>
              <div style={{margin:"8px 0",padding:"8px 14px",background:"#EEF1F5",borderRadius:6,fontFamily:"'Cascadia Code',monospace",fontSize:12,color:"#005A9E"}}>gpupdate /force</div>
              <p style={{margin:"8px 0"}}><strong>Neustart</strong> des Client-PCs.</p>
              <p style={{margin:"8px 0 0"}}><strong>Verifizierung:</strong> Nach der Anmeldung ist das Firmenlogo sichtbar, USB-Sticks werden blockiert und der Aufruf von <code>cmd</code> wird mit einer Administratoren-Sperrmeldung abgewiesen.</p>
            </AnleitungStep>
          </div>
        </section>

        {/* ═══ 5. PROBLEME & LÖSUNGEN ═══ */}
        <Section num="5" title="Probleme & Lösungen" tagline="Was ist schiefgelaufen und wie wurde es behoben?">
          <IssueCard type="problem" title="Problem: Schwarzer Desktop nach Neustart (Black Screen)">
            <p style={{margin:0}}>Nach dem Erstellen der GPO mit dem Firmen-Hintergrundbild erschien beim Client-Neustart zunächst ein schwarzer Desktop. Das Hintergrundbild konnte nicht geladen werden, da der Netzwerkserver beim Systemstart noch nicht erreichbar war.</p>
          </IssueCard>
          <IssueCard type="solution" title={`Lösung: „Immer auf das Netzwerk warten" aktivieren`}>
            <p style={{margin:0}}>Unter <strong>Computerkonfiguration › Administrative Vorlagen › System › Anmelden</strong> wurde die Richtlinie „Beim Neustart des Computers und bei der Anmeldung immer auf das Netzwerk warten" aktiviert. Nach einem weiteren Neustart wurde das Hintergrundbild sofort geladen.</p>
          </IssueCard>
          <NoteBlock title="Praxishinweis">
            Der Befehl <code>gpresult /r</code> zeigt an, welche GPOs tatsächlich auf dem Client angewendet wurden. <code>gpupdate /force</code> erzwingt die sofortige Aktualisierung aller Richtlinien.
          </NoteBlock>
        </Section>

        {/* ═══ 6. ERGEBNIS ═══ */}
        <Section num="6" title="Ergebnis" tagline="Zusammenfassung und Nachweis">
          <p>Alle vier Sicherheitsmaßnahmen wurden erfolgreich implementiert und auf dem Client verifiziert:</p>
          <ResultTable rows={[
            ["Maßnahme","Status","Nachweis"],
            ["GPO_Client_Hardening erstellt und verknüpft","Erfüllt","Abb. 1"],
            ["USB-Sperre (Wechselmedien verweigert)","Erfüllt","Abb. 2"],
            ["Bildschirmschoner aktiviert","Erfüllt","Abb. 3"],
            ["Kennwortschutz für Bildschirmschoner","Erfüllt","Abb. 4"],
            ["Zeitlimit auf 300 Sekunden gesetzt","Erfüllt","Abb. 5"],
            ["CMD gesperrt","Erfüllt","Abb. 6"],
            ["Regedit gesperrt","Erfüllt","Abb. 7"],
            ["Firmen-Hintergrundbild erzwungen","Erfüllt","Abb. 8"],
            ["Client-Test: CMD blockiert","Erfüllt","Abb. 9"],
          ]} />

          <div style={{margin:"32px 0",padding:"28px 32px",background:"linear-gradient(135deg,#E8F4FD,#F0F6FC)",border:"1px solid rgba(0,120,212,.2)",borderRadius:16}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"#0078D4",marginBottom:10}}>Fazit</div>
            <p>Dieses Projekt schließt die Projektkette <strong>Modul 2</strong> ab und erweitert die bestehende Infrastruktur um die entscheidende Ebene der <strong>Endpunkt-Sicherheit</strong>. Vier kritische „Quick Wins" wurden in einem einzigen GPO gebündelt: USB-Sperre, Bildschirmsperre, CMD/Regedit-Blockierung und Corporate Identity.</p>
            <p style={{marginBottom:0}}><strong>Projektkette:</strong> Projekt 01 (Upgrade) → Projekt 02 (USMT) → Projekt 05 (AD) → Projekt 06 (Netzwerk) → Projekt 07 (RBAC & GPO) → <strong>Projekt 08 (Client-Hardening)</strong>. Die IT-Infrastruktur ist nun vollständig aufgebaut und gehärtet.</p>
          </div>
        </Section>

        {/* ═══ PROJEKT NAVIGATION ═══ */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",paddingTop:32,paddingBottom:16,borderTop:"1px solid rgba(16,185,129,.2)",marginTop:32}}>
          <a href="/projekt/windows/rbac-gpo" style={{textDecoration:"none",color:"inherit"}}>
            <p style={{fontSize:12,color:"#7A8599",marginBottom:4}}>← Vorheriges Projekt</p>
            <p style={{fontSize:14,fontWeight:600,color:"#4A5568"}}>Projekt 07: Identity & Access Management (IAM)</p>
          </a>
        </div>

        {/* ═══ 7. SCREENSHOTS ═══ */}
        <Section num="7" title="Screenshots (Proof)" tagline="Alle Nachweise auf einen Blick">
          <SpecTable rows={[
            ["Abb.","Beschreibung"],
            ...Object.entries(screenshots).map(([num, data]) => [`Abb. ${num}`, data.desc])
          ]} />
        </Section>

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
