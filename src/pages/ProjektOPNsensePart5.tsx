import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import {
  Calendar,
  Server,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Download,
  Network,
  Shield,
  Cpu,
  Maximize2,
  ChevronRight,
  AlertTriangle,
  HardDrive,
  GitBranch,
  Settings,
  Activity,
  Layers,
  Lock,
  Globe,
  Terminal,
  Database,
  Search,
  Link as LinkIcon,
  Wifi,
} from "lucide-react";

// â”€â”€â”€ Part Navigator Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const parts = [
  { num: 0, short: "Projektübersicht", path: "/projekt/security/opnsense", done: true },
  { num: 1, short: "Netzwerk & Virtualisierung", path: "/projekt/security/opnsense/part-1", done: true },
  { num: 2, short: "OPNsense Firewall Anwendungen", path: "/projekt/security/opnsense/part-2", done: true },
  { num: 3, short: "VLAN & Firewall-Regeln", path: "/projekt/security/opnsense/part-3", done: true },
  { num: 4, short: "IDS/IPS & Suricata", path: "/projekt/security/opnsense/part-4", done: true },
  { num: 5, short: "DNS & Reverse Proxy", path: "/projekt/security/opnsense/part-5", done: true },
  { num: 6, short: "VPN & Bastion Host", path: "/projekt/security/opnsense/part-6", done: true },
];

const FOTO = {
  hero: "/Opnsense/Foto's/part5.png",
  abb1: "/Opnsense/Foto's/part5.png", 
  abb2: "/Opnsense/Foto's/Opnsense  Dienste Unbound-DNS .png",
  abb3: "/Opnsense/Foto's/Opnsense  Dienste Unbound-DNS.png",
  abb4: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server.png",
  abb5: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server Upstream.png",
  abb6: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server upstream Group.png",
  abb7: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server Locatin.png",
  abb8: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server HTTPS.png",
};

// â”€â”€â”€ Reusable clickable photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string; }) => (
  <div
    className={`group relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 ${className}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
    <img src={src} alt={alt} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm rounded-lg p-1.5 z-20">
      <Maximize2 className="w-4 h-4 text-indigo-400" />
    </div>
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-xs font-medium text-white/90 drop-shadow-md">{caption}</p>
      </div>
    )}
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ProjektOPNsensePart5 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_5_Netzwerkdienste_Reverse_Proxy.docx";

  // Data Tables
  const envData = [
    { k: "OPNsense Firewall", v: "VM 100, Unbound DNS aktiv, Nginx-Plugin installiert" },
    { k: "Interne Domain", v: "*.home.internal (kein öffentliches DNS)" },
    { k: "DNS-Server", v: "Unbound DNS auf OPNsense (Port 53, alle Schnittstellen)" },
    { k: "Reverse Proxy", v: "OPNsense Nginx-Plugin (nicht NPM auf Docker)" },
    { k: "TLS-Zertifikat", v: "Web GUI TLS certificate (self-signed, OPNsense-intern)" },
    { k: "Backend-Dienste", v: "Wazuh, Proxmox, UniFi, Uptime Kuma" },
  ];

  const routingSteps = [
    { name: "Stufe 1 â€” DNS-Auflösung", desc: "Client fragt Unbound DNS nach Hostnamen (z.B. wazuh.home.internal). Unbound löst alle diese Einträge auf die IP der Firewall auf.", icon: Globe },
    { name: "Stufe 2 â€” Reverse Proxy", desc: "Anfrage erreicht das Nginx-Plugin (Port 443). Nginx identifiziert anhand des SNI den virtuellen Server.", icon: LinkIcon },
    { name: "Stufe 3 â€” Backend-Weiterleitung", desc: "Nginx leitet Anfrage an den konfigurierten Upstream-Server weiter (z.B. Wazuh IP).", icon: Server },
  ];

  const keyDecisions = [
    { title: "OPNsense Nginx-Plugin statt Docker NPM", desc: "Die Verlagerung auf OPNsense zentralisiert DNS und Reverse Proxy auf einem einzigen Kontrollpunkt." },
    { title: "Einzelne A-Records statt Wildcard", desc: "Wildcard würde unkontrolliert alle Subdomains auflösen. Einzeleinträge geben volle Kontrolle und Sichtbarkeit." },
    { title: "Alle DNS-Einträge auf 192.168.99.1", desc: "Alle internen Domainnamen zeigen auf die Firewall selbst. Routing erfolgt hostbasiert im Reverse Proxy." },
    { title: "Self-Signed TLS-Zertifikat", desc: "Ausreichend für internes Netzwerk, um End-to-End-Verschlüsselung zu garantieren (kein Klartext)." },
    { title: "Zwei getrennte Reverse Proxies", desc: "OPNsense bedient *.home.internal. Docker Nginx + Cloudflare bedient externe öffentliche Domains." },
    { title: "TTL = 1 Sekunde", desc: "Extrem kurze DNS-Cache-Zeit ermöglicht sofortige Ã„nderungen." },
  ];

  const tuning = [
    { k: "DNS-Zwang", v: "Regel 1 jeder Schnittstelle erzwingt DNS via OPNsense. Alle Ãœberschreibungen greifen verlässlich." },
    { k: "Backend-TLS", v: "Wazuh, Proxmox, UniFi werden über TLS-verschlüsselte Backend-Verbindungen adressiert." },
    { k: "WAF (Web Application Firewall) deaktiviert", v: "Web Application Firewall ist auf internen Netzen deaktiviert, da Backend Dienste eigene Autentifizierung leisten (False-Positive Reduktion)." },
    { k: "DNS-Rebind-Schutz", v: "opnsense.home.internal als White-Label Hostname eingepflegt." },
  ];

  const troubleshooting = [
    { issue: "NPM auf Docker verworfen", fix: "Der ursprünglich geplante externe Nginx Proxy Manager wurde zugunsten von OPNsense verworfen (weniger Komplexität)." },
    { issue: "Port 443 Konflikt", fix: "Die OPNsense Web-GUI wurde in Part 2 auf Port 8443 gelegt, um Port 443 für den Nginx Proxy freizuhalten." },
    { issue: "Kuma TLS-Pass", fix: "Uptime Kuma bietet Backendseitig kein HTTPS. Front-to-Proxy ist verschlüsselt, Backend ist es nicht." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 5 â€” DNS & Reverse Proxy | Enterprise Security Lab</title>
        <meta name="description" content="Part 5: Interne DNS-Architektur und zentrales Service-Routing über Reverse Proxy." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEADER / HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-900/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-indigo-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 5</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
            <Wifi className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            DNS-Filtering &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500">
              Reverse Proxy
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Aufbau einer zentralen Namensauflösung mit Unbound DNS und Service-Routing via Nginx 
            für eine professionelle Single-Entry-Point Architektur.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={docUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]"
            >
              <Download className="w-5 h-5" />
              Dokumentation Herunterladen
            </a>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• PART-NAVIGATOR (STICKY) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="sticky top-[73px] z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold hidden md:block">Navigator</span>
          {parts.map((p) => (
            <Link
              key={p.num === 0 ? "\u2605" : p.num}
              to={p.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all whitespace-nowrap ${
                p.num === 5
                  ? "bg-indigo-950/50 text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===5 ? 'bg-indigo-500 text-slate-950': (p.done ? 'bg-slate-800' : 'bg-slate-800/50')}`}>
                {p.num === 0 ? "\u2605" : p.num}
              </div>
              <span className="hidden sm:inline-block opacity-90">{p.short}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-300 min-h-screen">
        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 1. SCOPE & 2. ENVIRONMENT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-500 font-mono text-xl">01</span>
                <h2 className="text-3xl font-bold text-white">Scope & Design Goal</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Anstatt sich unübersichtliche IP:Port-Kombinationen zu merken, sollen alle netzwerk-internen Services 
                über saubere Domainnamen erreichbar sein. Die OPNsense dient als "Single Entry Point" für DNS und HTTP-Traffic-Steuerung (Reverse Proxy), um Zero-Trust Konformität zu wahren.
              </p>
              
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Service Routing (Dreistufig)</h3>
                <div className="space-y-4">
                  {routingSteps.map((z, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <z.icon className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">{z.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{z.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-500 font-mono text-xl">02</span>
                <h2 className="text-3xl font-bold text-white">Environment Matrix</h2>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {envData.map((row, i) => (
                      <tr key={i} className={`border-b border-slate-800/50 ${i % 2 === 0 ? "bg-slate-900" : "bg-slate-800/20"}`}>
                        <td className="py-3 px-4 font-semibold text-slate-300 w-1/3 align-top">{row.k}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-xs">{row.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 6. IMPLEMENTATION STEPS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-indigo-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Config & Implementation</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div className="order-2 md:order-1">
                <Photo src={FOTO.abb1} alt="DNS Proxy Architektur" caption="Abb. 1: DNS & Reverse Proxy Architecture" onClick={zoom(FOTO.abb1)} />
              </div>
               <div className="order-1 md:order-2">
                <h3 className="text-xl font-bold text-white mb-2">Architectural Logic</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Lokaler Client-Traffic steuert zunächst `Unbound DNS` (Port 53) an, welcher dedizierte *.home.internal Auflösungen direkt an die `Nginx Plugin` Instanz weiterleitet. 
                  Die SNI-Analyse (Server Name Identification) ordnet die HTTP-Pakete sodann den korrekten Backend Locations zu.
                </p>
              </div>
            </div>

            {/* Unbound DNS */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 1 & 2: Unbound DNS Konfiguration</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                 <div>
                   <p className="text-sm text-slate-400 leading-relaxed mb-4">
                     Unbound DNS leitet keine Wildcards unkontrolliert weiter, sondern löst nur harte Einzel-Records (`A-Record` Ãœberschreibungen) auf die Firewall IP auf.
                   </p>
                 </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <Photo src={FOTO.abb2} alt="Unbound General" caption="Abb. 2: Unbound DNS â€” Port 53, Alle Interfaces" onClick={zoom(FOTO.abb2)} />
                 <Photo src={FOTO.abb3} alt="Unbound Overrides" caption="Abb. 3: Ãœberschreibungen â€” 5 A-Records (192.168.99.1)" onClick={zoom(FOTO.abb3)} />
              </div>
            </div>

            {/* Nginx Plugin */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 3 & 4: Nginx Plugin & Upstreams</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Nach der Aktivierung definieren die Upstream-Server die physikalischen Backends (z.B. Wazuh VM, Unifi Controller), 
                  inklusive ihrer IP-Adressen und Ports.
                </p>
                 <Photo src={FOTO.abb4} alt="Nginx Service" caption="Abb. 4: Nginx-Plugin gestartet" onClick={zoom(FOTO.abb4)} />
              </div>
              <div>
                 <Photo src={FOTO.abb5} alt="Upstream Servers" caption="Abb. 5: Nginx Upstream-Server (4 Backends)" onClick={zoom(FOTO.abb5)} />
              </div>
            </div>

            {/* Nginx Locations */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 5 - 7: SSL-Binding & Routing-Mechanik</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Die logischen Upstream-Gruppen bündeln Backends mit SSL/TLS Zertifikaten und verbinden sie im Location-Modus auf dem Root `/` Path. 
                Die HTTP(S) Server schlussendlich verknüpfen den TLS-Handshake (Hostname Binding) auf dem 443 Listen-Port.
              </p>
              
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                 <Photo src={FOTO.abb6} alt="Groups" caption="Abb. 6: TLS-Status pro Backend (Gruppen)" onClick={zoom(FOTO.abb6)} />
                 <Photo src={FOTO.abb7} alt="Locations" caption="Abb. 7: Routing Paths auf Root (/)" onClick={zoom(FOTO.abb7)} />
                 <Photo src={FOTO.abb8} alt="Bind" caption="Abb. 8: HTTP(S) Server Hostname Binding" onClick={zoom(FOTO.abb8)} />
              </div>
            </div>

          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 7. KEY DECISIONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Key Decisions</h2>
              </div>
              <div className="space-y-5">
                {keyDecisions.map((dec, i) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-slate-800 hover:border-indigo-500 transition-colors">
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

             <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-indigo-500 font-mono text-xl">05</span>
                <h2 className="text-3xl font-bold text-white">Tuning & Hardening</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {tuning.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">{t.k}</div>
                      <div className="text-xs text-slate-400">{t.v}</div>
                    </div>
                  </div>
                ))}
              </div>

               <div className="mt-8">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="text-amber-500 font-mono text-xl">06</span>
                    <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
                  </div>
                  <div className="space-y-4">
                    {troubleshooting.map((ts, i) => (
                      <div key={i} className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-start gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <span className="text-sm font-bold text-amber-500">{ts.issue}</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-6 leading-relaxed">{ts.fix}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
           </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVIGATION / FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10 text-slate-400 text-sm max-w-2xl mx-auto">
             Das interne DNS and Service Routing Modell funktioniert einwandfrei. OPNsense vermittelt Anfragen 
             auf allen virtuellen Hostnames (`.home.internal`) elegant an die isolierten Backends.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            
            <Link
              to="/projekt/security/opnsense/part-4"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Part 4 â€” IDS/IPS & SIEM</p>
            </Link>

             <a
              href={docUrl}
              download
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all group text-center"
            >
              <FileText className="w-7 h-7 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-white">Original Dokument</p>
              <p className="text-xs text-indigo-400 mt-1">Lade DOCX herunter</p>
            </a>

            <Link
              to="/projekt/security/opnsense/part-6"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Weiter zu</p>
              <p className="text-sm font-bold text-white">Part 6 â€” Bastion Host & OOB</p>
              <ArrowRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart5;
