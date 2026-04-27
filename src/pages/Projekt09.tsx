import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useState, type ReactNode } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { Download, Server, ShieldCheck, Database, FileWarning } from "lucide-react";

const IMG = "/images/microsoft/projekt9";

const screenshots: Record<number, { file: string; desc: string }> = {
  1: { file: "Projekt9_1.png", desc: "Schattenkopien (VSS) auf dem Ziel-Laufwerk aktivieren." },
  2: { file: "Projekt9_2.png", desc: "Schattenkopien-Zeitplan: Festlegung der Snapshot-Intervalle, um regelmäßige Wiederherstellungspunkte zu garantieren." },
  3: { file: "Projekt9_3.png", desc: "Server-Manager: Hinzufügen der Rolle 'Ressourcen-Manager für Dateiserver' (FSRM)." },
  4: { file: "Projekt9_4.png", desc: "Erfolgreiche Installation der FSRM-Rolle auf dem Server." },
  5: { file: "Projekt9_5.png", desc: "Start des Ressourcen-Managers in der Verwaltungskonsole zur Konfiguration von Quotas und Dateiprüfungen." },
  6: { file: "Projekt9_6.png", desc: "Einrichten eines harten Speicherkontingents (Hard Quota) von exakt 2 GB auf C:\\Unternehmensdaten." },
  7: { file: "Projekt9_7.png", desc: "Erstellen einer neuen Dateiprüfungs-Regel (File Screen) für denselben Pfad." },
  8: { file: "Projekt9_8.png", desc: "Aktive Dateiprüfung: Audio-, Video- und Ausführbare Dateien (.exe) sind nun strikt blockiert." },
  9: { file: "Projekt9_9.png", desc: "Proof of Concept (Client): Eine ausführbare Datei (.exe) wird vom Server abgelehnt. Der Zero-Trust-Storage greift." },
  10: { file: "Projekt9_10.png", desc: "Proof of Concept (Self-Service): Client ruft die Eigenschaften des Ordners auf, um gelöschte Dateien via Vorgängerversionen abzurufen." },
  11: { file: "Projekt9_11.png", desc: "Die VSS-Schattenkopie aus der Vergangenheit wird geöffnet und der User kann seine eigenen Dateien wiederherstellen, ohne den IT-Support zu belasten." },
  12: { file: "Projekt9_12.png", desc: "Detailansicht der Vorgängerversionen auf Systemebene." },
  13: { file: "Projekt9_13.png", desc: "Erfolgreiche Testverifizierung: Die wiederhergestellte Textdatei ist wieder für den Mitarbeiter zugänglich." },
};

/* ─── icons ─── */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,opacity:.6,flexShrink:0}}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:16,height:16,opacity:.6,flexShrink:0}}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

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
    <figure onClick={() => onClick(data.file, data.desc)} className="p09-proof" style={{margin:"28px 0",borderRadius:12,overflow:"hidden",border:"1px solid #E1E5EB",background:"#fff",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",cursor:"zoom-in",transition:"box-shadow .3s, transform .2s"}}>
      <img src={`${IMG}/${data.file}`} alt={data.desc} style={{width:"100%",display:"block"}} loading="lazy" />
      <figcaption style={{padding:"14px 20px",display:"flex",flexDirection:"column",gap:8,background:"#F5F7FA",borderTop:"1px solid #E1E5EB"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{background:"#0078D4",color:"#fff",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:100,whiteSpace:"nowrap",fontFamily:"'Cascadia Code','Consolas',monospace"}}>Abb. {num}</span>
          <span style={{fontSize:13,fontWeight:600,color:"#1A1A1A"}}>Nachweis zur Erklärung</span>
        </div>
        <span style={{fontSize:14,color:"#4A5568",lineHeight:1.6,marginLeft:4}}>{data.desc}</span>
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

function Section({ num, title, tagline, children }: { num: string; title: string; tagline?: string; children: ReactNode }) {
  return (
    <section style={{padding:"56px 0",borderBottom:"1px solid #E1E5EB"}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:24}}>
          <div style={{flexShrink:0,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",background:"#0078D4",color:"#fff",borderRadius:10,fontSize:16,fontWeight:700,marginTop:2}}>{num}</div>
          <div>
            <h2 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-.01em",lineHeight:1.3,margin:0,color:"#1A1A1A"}}>{title}</h2>
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

function ArchCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div style={{padding:20,background:"#fff",border:"1px solid #E1E5EB",borderRadius:12,transition:"box-shadow .2s, border-color .2s"}} className="p09-arch">
      <div style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"#E8F4FD",borderRadius:8,marginBottom:12,color:"#0078D4"}}>{icon}</div>
      <div style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>{title}</div>
      <div style={{fontSize:12.5,color:"#7A8599",lineHeight:1.5}}>{desc}</div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Projekt09() {
  const [lbSrc, setLbSrc] = useState<string | null>(null);
  const [lbAlt, setLbAlt] = useState("");

  const openLb = (file: string, alt: string) => { setLbSrc(`${IMG}/${file}`); setLbAlt(alt); };
  const closeLb = () => { setLbSrc(null); };

  return (
    <Layout>
      <Helmet>
        <title>Projekt 09: Enterprise Storage Management & Data Protection (FSRM & VSS)</title>
        <meta name="description" content="Implementierung intelligenter Speicherrichtlinien auf dem Dateiserver zur Verhinderung von Datenmüll und Durchsetzung von Quotas inkl. VSS Schattenkopien." />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;600&family=Inter:wght@300;400;500;600;700;800&display=swap');
        .p09-root { font-family:'Inter','Segoe UI',system-ui,sans-serif; background:#FAFBFC; color:#1A1A1A; line-height:1.75; font-size:16px; -webkit-font-smoothing:antialiased; }
        .p09-root ::selection { background:#0078D4; color:#fff; }
        .p09-root img { max-width:100%; height:auto; }
        .p09-root code { font-family:'Cascadia Code','Consolas',monospace; font-size:12.5px; background:#EEF1F5; padding:2px 8px; border-radius:4px; color:#005A9E; border:1px solid #E1E5EB; }
        .p09-root p { margin:0 0 16px; font-size:15.5px; color:#4A5568; line-height:1.8; }
        .p09-root p strong { color:#1A1A1A; font-weight:600; }
        .p09-proof:hover { box-shadow:0 8px 32px rgba(0,0,0,.1); transform:translateY(-2px); }
        .p09-arch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
        .p09-arch:hover { border-color:#0078D4 !important; box-shadow:0 2px 12px rgba(0,120,212,.1) !important; }
        @media(max-width:768px) { .p09-arch-grid { grid-template-columns: 1fr; } }
      `}</style>

      <Lightbox src={lbSrc} alt={lbAlt} onClose={closeLb} />

      <div className="p09-root">
        {/* ═══ HERO ═══ */}
        {/* Angepasst an das Blaue Farbschema von Projekt 06, 07, 08 (Corporate Identity der Projektkette) */}
        <header className="p09-hero" style={{background:"linear-gradient(135deg,#001D3D 0%,#002B5C 50%,#005A9E 100%)",color:"#fff",padding:"60px 0 56px",position:"relative",overflow:"hidden"}}>
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
              <span style={{color:"#4EA8DE",fontWeight:500}}>Projekt 09</span>
            </nav>

            <h1 style={{fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:700,lineHeight:1.2,letterSpacing:"-.02em",marginBottom:12}}>
              Enterprise Storage Management<br/>& Data Protection (FSRM & VSS)
            </h1>
            <p style={{fontSize:"1.05rem",fontWeight:300,color:"rgba(255,255,255,0.7)",lineHeight:1.6,maxWidth:600,marginBottom:32}}>
              Dieses Projekt erweitert die Netzlaufwerke aus Projekt 07 um intelligente Richtlinien. Ziel: Datenmüll durch unerlaubte Dateiformate verhindern, Speicherkontingente (Quotas) überwachen und Mitarbeitern eine einfache Rücksicherung gelöschter Dateien per VSS ermöglichen.
            </p>

            <div style={{display:"flex",flexWrap:"wrap",gap:28,marginBottom:24}}>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><CalendarIcon /><strong style={{color:"#fff",fontWeight:500}}>2026</strong></div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)"}}><UserIcon /><strong style={{color:"#fff",fontWeight:500}}>Gokhan Zehirlioglu</strong></div>
            </div>

            {/* Zwei getrennte Download-Buttons wie gewünscht */}
            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:8}}>
              <a
                href="/downloads/Projekt09_Enterprise_Storage_Management.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,color:"#fff",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Dokumentation (DOCX)
              </a>
              <a
                href="/downloads/Anleitung_Projekt09_Storage_Management.docx"
                download
                style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:"rgba(0,120,212,.3)",border:"1px solid rgba(0,120,212,.5)",borderRadius:8,color:"#fff",fontSize:13,fontWeight:500,textDecoration:"none",transition:"all .2s",backdropFilter:"blur(8px)"}}
              >
                <Download size={16} />
                Schritt-für-Schritt Anleitung (DOCX)
              </a>
            </div>

            <ProjectRuler currentId={9} />
          </div>
        </header>

        {/* ═══ 1. MANAGEMENT SUMMARY & ARCHITEKTUR ═══ */}
        <Section num="1" title="Management Summary & Architektur-Entscheidung" tagline="Der Hintergrund des Projekts – Warum FSRM und VSS?">
          <p>
            In Unternehmensnetzwerken werden Netzlaufwerke oft als "Abladeplatz" missbraucht. Videos, illegale MP3s, Installationsdateien (.exe) müllen extrem teuren IT-Storage-Platz voll. Gleichzeitig ist das IT-Support-Team permanent damit beschäftigt, "aus Versehen gelöschte Dateien" aus komplexen Backups wiederherzustellen.
          </p>
          <p>
            Die <strong>Lösung</strong>, die in diesem Projekt als Erweiterung zu den Fileserver-Strukturen konfiguriert wird: Implementierung des <strong>Ressourcen-Managers für Dateiserver (FSRM)</strong> sowie <strong>Volumeschattenkopien (VSS)</strong>.
          </p>
          <p>
            Dadurch erzwingen wir ein „Zero-Trust“ Paradigma auf Dateiebene. Das Speichern von ausführbaren Programmen oder Mediendateien wird sofort blockiert. Ein Limit (Quota) sichert den Plattenplatz. Für gelöschte Dateien gibt es jetzt eine "Zeitmaschine", auf die der Benutzer selbst ohne Admin-Rechte zugreifen kann. Das reduziert Support-Tickets massiv und stärkt unsere Abwehr gegen Ransomware.
          </p>

          <div className="p09-arch-grid">
            <ArchCard icon={<Database />} title="Quota Management (FSRM)" desc="Ein hartes 2 GB Limit erzwingt Datensparsamkeit. Bei Überschreiten wird der Schreibzugriff strikt verweigert." />
            <ArchCard icon={<ShieldCheck />} title="File Screening (FSRM)" desc="Intelligente Dateiprüfung, die unerwünschte Formate (z.B. .mp3, .exe, .mp4, Ransomware-Endungen) aktiv abblockt." />
            <ArchCard icon={<Server />} title="Schattenkopien (VSS)" desc="Zweimal täglich erstellte System-Snapshots ermöglichen Endbenutzern eine Self-Service-Wiederherstellung." />
          </div>
        </Section>

        {/* ═══ 2. SCOPE / PARAMETER ═══ */}
        <Section num="2" title="Technische Parameter (Scope)" tagline="Die konfigurierten Detail-Variablen">
          <SpecTable rows={[
            ["Parameter","Details"],
            ["Zielverzeichnis", "C:\\Unternehmensdaten (Zentrales Client-Mapping auf Z:)"],
            ["Quota-Limit (Datenträgerkontingent)", "2 GB (Hard Quota – Administrativ hart blockiert bei Erreichen)"],
            ["File Screening Policies", "Aktive Blockierung von Audio-, Video- & Ausführbaren Dateien"],
            ["Data Protection (Self-Service)", "VSS (Volume Shadow Copy Service) aktiviert auf C:, Snapshot-Plan: 07:00 & 12:00 Uhr"],
          ]} />
        </Section>

        {/* ═══ 3. IMPLEMENTIERUNG ═══ */}
        <Section num="3" title="Schritt-für-Schritt Implementierung" tagline="So wurden die Speicherrichtlinien umgesetzt (Ansicht aus Admin-Perspektive)">

          <PhaseLabel text="Phase A: VSS (Schattenkopien) aktivieren – Die Zeitmaschine" />
          <p>
            Zuerst sichern wir ab, dass der Server regelmäßig den „Zustand“ der Dateien speichert (Snapshots). In den Laufwerkseigenschaften wurde VSS unter dem Reiter „Schattenkopien“ für Laufwerk C: aktiviert.
            Hier ist es wichtig, die Speichergröße der Schattenkopien sowie den regelmäßigen Zeitplan (z. B. morgens und mittags) zu definieren, damit für die Benutzer immer sinnvolle Rückkehrpunkte existieren.
          </p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={1} data={screenshots[1]} onClick={openLb} /></div>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={2} data={screenshots[2]} onClick={openLb} /></div>
          </div>

          <PhaseLabel text="Phase B: FSRM-Rolle installieren und vorbereiten" />
          <p>
            Um Quotas und File-Screening-Richtlinien durchsetzen zu können, reicht das Standard-Windows nicht aus. Über den Server-Manager musste der <strong>Ressourcen-Manager für Dateiserver (FSRM)</strong> als zusätzliche Server-Rolle installiert werden. Anschließend steht uns die FSRM-Konsole als mächtiges Werkzeug zur Verfügung.
          </p>
          <ProofFigure num={3} data={screenshots[3]} onClick={openLb} />
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={4} data={screenshots[4]} onClick={openLb} /></div>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={5} data={screenshots[5]} onClick={openLb} /></div>
          </div>

          <PhaseLabel text="Phase C: Speicher-Quota (Kontingent) einrichten" />
          <p>
            In der nun verfügbaren FSRM-Konsole (wie in Abb. 5 geöffnet) wurde unter der <strong>Kontingentverwaltung</strong> eine harte Beschränkung erstellt. Für unseren zentralen Speicher-Ordner <code>C:\Unternehmensdaten</code> darf nicht mehr als <strong>2 GB</strong> Platz verbraucht werden. Dieses „Harte Kontingent“ schützt den Server vor Volllaufen und zwingt Mitarbeiter zum Aufräumen.
          </p>
          <ProofFigure num={6} data={screenshots[6]} onClick={openLb} />

          <PhaseLabel text="Phase D: Dateiprüfung (File Screening) aktivieren" />
          <p>
            Das wichtigste Schutzschild gegen Ransomware und Datenmangel auf Fileservern. Wieder über den FSRM wurde eine neue <strong>Dateiprüfungs-Aktion</strong> definiert. Durch die aktivierte Blockliste kann kein Benutzer (nicht einmal der Administrator über das Netzwerk) Audio- oder ausführbare Dateien hochladen.
          </p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={7} data={screenshots[7]} onClick={openLb} /></div>
            <div style={{flex:1,minWidth:300}}><ProofFigure num={8} data={screenshots[8]} onClick={openLb} /></div>
          </div>

        </Section>

        {/* ═══ 4. PROOF OF CONCEPT ═══ */}
        <Section num="4" title="Proof of Concept (Client-Test & Verifizierung)" tagline="Wurde die Sicherheit erfolgreich erhöht? Der Test vom Windows-Client">
          
          <div style={{marginBottom:48}}>
            <h3 style={{fontSize:"1.1rem",fontWeight:600,color:"#1A1A1A",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
              <FileWarning size={20} color="#0078D4" /> 1. Test FSRM: Blockierung der Dateierweiterungen
            </h3>
            <p>
              Als Test-Benutzer melden wir uns am Client an (Netzlaufwerk Z: ist verbunden). Wir versuchen absichtlich, eine ausführbare Programmdatei (z.B. Chrome-Installer) und eine Mediendatei (MP3) auf den Server zu speichern bzw. zu verschieben.
            </p>
            <p>
              <strong>Ergebnis (Erfolgreich):</strong> Der Windows Server lehnt den Vorgang sofort ab. Es erscheint auf Client-Seite ein Zugriffsfehler. Die FSRM Engine auf dem Server fängt die IO-Operation in Echtzeit ab. 
            </p>
            <ProofFigure num={9} data={screenshots[9]} onClick={openLb} />
          </div>

          <div>
            <h3 style={{fontSize:"1.1rem",fontWeight:600,color:"#1A1A1A",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
              <Server size={20} color="#0078D4" /> 2. Test VSS: Die Self-Service Wiederherstellung
            </h3>
            <p>
              Hier wird simuliert, dass ein Mitarbeiter ein wichtiges Dokument aus der Unternehmensablage gelöscht hat. Anstatt sofort den Support-Desk anzurufen (Kostenfaktor!), kann er einfach einen <strong>Rechtsklick auf den Ordner</strong> machen und unter <strong>Eigenschaften -{">"} Vorgängerversionen</strong> seine Schattenkopien abfragen (Abb. 10 & 11).
            </p>
            <p>
              Wie Screenshot 12 zeigt, sind auf Dateisystem-Ebene nun verschiedene Versionen des Ordners als reine Shadow-Copies gemounted. Klickt der User auf „Öffnen“ einer alten Version, sieht er den Ordner im Zustand der Vergangenheit und kann per Copy-Paste selbst recovern (Abb. 13).
            </p>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:20}}>
              <div style={{flex:1,minWidth:300}}><ProofFigure num={10} data={screenshots[10]} onClick={openLb} /></div>
              <div style={{flex:1,minWidth:300}}><ProofFigure num={11} data={screenshots[11]} onClick={openLb} /></div>
            </div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:20}}>
              <div style={{flex:1,minWidth:300}}><ProofFigure num={12} data={screenshots[12]} onClick={openLb} /></div>
              <div style={{flex:1,minWidth:300}}><ProofFigure num={13} data={screenshots[13]} onClick={openLb} /></div>
            </div>
          </div>

          <div style={{margin:"48px 0 32px",padding:"28px 32px",background:"linear-gradient(135deg,#E8F4FD,#F0F6FC)",border:"1px solid rgba(0,120,212,.2)",borderRadius:16}}>
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"#0078D4",marginBottom:10}}>Fazit des Projektes</div>
            <p style={{marginBottom:0}}>
              Dieses Projekt demonstriert fortgeschrittene Windows Server 2019 Dateisystem-Kenntnisse. Ein nackter Dateiserver (wie in Projekt 07) ist anfällig. Durch <strong>FSRM</strong> kontrollieren wir nun aktiv die <em>Integrität und Beschaffenheit</em> der Netzwerkdaten, während <strong>VSS</strong> der Belegschaft eine moderne, IT-entlastende Möglichkeit bietet, eigene operative Missgeschicke (Löschen, Überschreiben) selbstständig rückgängig zu machen.
            </p>
          </div>

        </Section>

        {/* ═══ PROJEKT NAVIGATION ═══ */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:32,paddingBottom:16,borderTop:"1px solid #E1E5EB",marginTop:32}}>
          <a href="/projekt/windows/client-hardening" style={{textDecoration:"none",color:"inherit"}}>
            <p style={{fontSize:12,color:"#7A8599",marginBottom:4}}>← Vorheriges Projekt</p>
            <p style={{fontSize:14,fontWeight:600,color:"#4A5568"}}>Projekt 08: Client-Hardening (GPO)</p>
          </a>
        </div>

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
