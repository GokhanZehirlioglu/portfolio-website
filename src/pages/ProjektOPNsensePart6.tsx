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
  Radio,
  BellRing,
  PieChart,
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
  hero: "/Opnsense/Foto's/part6.png",
  abb1: "/Opnsense/Foto's/part6.png", 
  abb2: "/Opnsense/Foto's/VPN WireGuard_Instanzen.png",
  abb3: "/Opnsense/Foto's/VPN WireGuard_GegenStellen.png",
  abb4: "/Opnsense/Foto's/VPN WireGuard Status.png",
  abb5: "/Opnsense/Foto's/Opnsense  Firewall Regeln WireGuard_VPN.png",
  abb6: "/Opnsense/Foto's/Uptime Kuma Dashboard.png",
  abb7: "/Opnsense/Foto's/Uptime Kuma Benachrichtungeng einrichten.png",
  abb8: "/Opnsense/Foto's/Home Dashboard.png",
  abb9: "/Opnsense/Foto's/NUC Docker homepage Dashboard service YamL.png.png",
  abb10: "/Opnsense/Foto's/Opnsense  Firewall Protokolldatein Ãœbersicht.png",
  abb11: "/Opnsense/Foto's/Opnsense  Firewall Protokolldatein Ãœbersicht Schnittstellen.png",
};

// â”€â”€â”€ Reusable clickable photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string; }) => (
  <div
    className={`group relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/10 ${className}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
    <img src={src} alt={alt} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm rounded-lg p-1.5 z-20">
      <Maximize2 className="w-4 h-4 text-orange-400" />
    </div>
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-xs font-medium text-white/90 drop-shadow-md">{caption}</p>
      </div>
    )}
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ProjektOPNsensePart6 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_6_Fernzugriff_Systemvalidierung.docx";

  // Data Tables
  const envData = [
    { k: "WireGuard VPN", v: "OPNsense-integriert, wg0-Interface, UDP 51820, Tunnel: 10.10.10.0/24" },
    { k: "NUC Bastion-Host", v: "192.168.99.209, LAN-Segment, Docker (Uptime Kuma + Homepage)" },
    { k: "Uptime Kuma", v: "Port 3001, SLA / Ping-basiertes Monitoring" },
    { k: "Homepage Dashboard", v: "Port 3002, API-integrierte NOC/SOC-Ãœbersicht" },
    { k: "Telegram-Bot", v: "Alarmierung bei Ausfallereignissen (Webhook)" },
    { k: "VLAN-Test-Container", v: "CT 102 (Alpine), 192.168.99.186, für Isolationstests" },
  ];

  const validationResults = [
    { name: "VPN â†’ Management", status: "Pass", desc: "Voller TCP/UDP Zugriff auf 192.168.99.0/24 durch Key-Exchange erteilt.", icon: CheckCircle2, color: "text-emerald-500" },
    { name: "Home â†’ Server", status: "Limited", desc: "Nur explizit portbasierte Zugriffe (z.B. Media) gestattet. Rest gedroppt.", icon: AlertTriangle, color: "text-amber-500" },
    { name: "IoT â†’ Management / Server", status: "Blocked", desc: "Harter RFC1918 Deny. Geräte können nicht abdriften.", icon: Lock, color: "text-red-500" },
    { name: "Monitoring Heartbeat", status: "Pass", desc: "Uptime Kuma checkt alle 30s. APIs pollt sekündlich in Homepage.", icon: Activity, color: "text-blue-500" },
  ];

  const keyDecisions = [
    { title: "WireGuard statt OpenVPN", desc: "Höhere Wire-Speed Performance, geringer Overhead und einfache OPNsense-native Integration." },
    { title: "Split-Tunneling", desc: "Nur Traffic für 192.x.x.x wird geroutet. Regulärer WAN Traffic des Clients bleibt beim ISP." },
    { title: "DuckDNS", desc: "Gleicht die dynamische IPv4-Zuweisung des Home-ISPs automatisch ab (DDNS)." },
    { title: "VPN Full Access", desc: "Da keine Password-Auth stattfindet (nur PKI Keys), gilt das Endgerät als fully-trusted im Tunnel." },
    { title: "Physischer NUC als Bastion", desc: "Sorgt für Out-of-Band (OOB) Erreichbarkeit; ein Proxmox-Absturz legt nicht das Monitoring lahm." },
    { title: "Docker-Socket-Proxy", desc: "Die API wird für das Homepage Dashboard nur read-only durchgestellt. Kein Root-Risk für Container." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 6 â€” Bastion Host & Systemvalidierung | Enterprise Lab</title>
        <meta name="description" content="Part 6: Sicherer Fernzugriff per WireGuard, NUC als Bastion-Host, Monitoring und Testing." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEADER / HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-orange-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-rose-900/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-orange-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-orange-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 6 (Final)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/30 border border-orange-500/20 text-orange-400 text-xs font-medium mb-6">
            <Radio className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Fernzugriff &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500">
              Systemvalidierung
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Finale Integration des Out-of-Band (OOB) Managements über WireGuard VPN. 
            Architekturvalidierung, Dashboards und zentrales Monitoring mit automatisierter Alarmierung.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={docUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]"
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
                p.num === 6
                  ? "bg-orange-950/50 text-orange-400 border-orange-500/30 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===6 ? 'bg-orange-500 text-slate-950': (p.done ? 'bg-slate-800' : 'bg-slate-800/50')}`}>
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
                <span className="text-orange-500 font-mono text-xl">01</span>
                <h2 className="text-3xl font-bold text-white">Objective & Goals</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Ein physischer Bastion Knoten am Edge ermöglicht als Out-of-Band (OOB) Instanz stets die Herrschaft 
                über interne Services (selbst wenn Proxmox fällt). Per WireGuard erhalten Operatoren Remote-Access 
                auf dieses NOC (Network Operations Center).
              </p>
              
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Validation Matrices</h3>
                <div className="space-y-4">
                  {validationResults.map((z, i) => (
                    <div key={i} className="flex items-start gap-4 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                      <z.icon className={`w-5 h-5 mt-0.5 shrink-0 ${z.color}`} />
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">
                          {z.name} <span className="text-[10px] uppercase ml-2 bg-slate-800 px-2 py-0.5 rounded">{z.status}</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{z.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 font-mono text-xl">02</span>
                <h2 className="text-3xl font-bold text-white">Environment Details</h2>
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
            <span className="text-orange-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Config & Validation</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Gesamte Security Architektur (Part 6)</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Remote WireGuard Tunnel (UDP 51820) reicht tief in das Management-Segment. 
                  Innerhalb dessen agiert der NUC Bastion-Host als Monitoring Instanz, welcher die komplette OPNsense, 
                  Proxmox und UniFi Hardware überwacht. Isolationstests garantieren Unantastbarkeit zwischen VLANs.
                </p>
              </div>
              <div>
                <Photo src={FOTO.abb1} alt="Remote Access Topology" caption="Abb. 1: Secure Remote Access & Validation Architecture" onClick={zoom(FOTO.abb1)} />
              </div>
            </div>

            {/* WireGuard */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 1: WireGuard Instanz & Tunnel</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                 <Photo src={FOTO.abb2} alt="WG Instanzen" caption="Server wg0 (UDP 51820)" onClick={zoom(FOTO.abb2)} />
                 <Photo src={FOTO.abb3} alt="WG Peer" caption="Gegenstelle: Acer_Laptop" onClick={zoom(FOTO.abb3)} />
                 <Photo src={FOTO.abb4} alt="WG Status" caption="Handshake & Live Traffic" onClick={zoom(FOTO.abb4)} />
                 <Photo src={FOTO.abb5} alt="WG Firewall" caption="VPN WAN Erlaubnis (Rules)" onClick={zoom(FOTO.abb5)} />
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Der VPN Traffic des Notebooks wird von WAN entgegengenommen und auf `10.10.10.x` transferiert. 
                Die Firewall gewährt diesen Peer-authentifizierten Clients den Durchgang in die interne Infrastruktur 
                (Split-Tunneling).
              </p>
            </div>

            {/* Kuma & Telegram */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
               <div>
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="text-orange-500 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Step 2: Uptime Kuma</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  30-Sekunden Ping Checks stellen sicher, dass alle Layer aktiv sind. Liegen Abbrüche vor, 
                  werden Webhooks über die Telegram API getriggert, um den Admin mobil zu verständigen.
                </p>
                 <Photo src={FOTO.abb7} alt="Telegram" caption="Abb. 7: Telegram Bot API Integration" onClick={zoom(FOTO.abb7)} />
              </div>
              <div>
                 <Photo src={FOTO.abb6} alt="Uptime Kuma Dashboard" caption="Abb. 6: Uptime Kuma (100% SLA auf Nodes)" onClick={zoom(FOTO.abb6)} />
              </div>
            </div>

            {/* NOC Dashboard */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 3: NOC "Homepage" Dashboard</h3>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Ein dediziertes, YAML getriebenes (declarative) Dashboard generiert dank Read-Only Socket-Proxies 
                  Live-Metriken (CPU, RAM, Client-Count) der Hypervisoren und Firewalls. 
                  Alle Web-Tools sind ab hier als Single Pane of Glass verfügbar.
               </p>
               <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                 <Photo src={FOTO.abb9} alt="Service YAML" caption="Abb. 9: Deklarative Configuration (services.yaml)" onClick={zoom(FOTO.abb9)} />
                 <Photo src={FOTO.abb8} alt="Dashboard UI" caption="Abb. 8: NOC Operations Dashboard (Live Metrics)" onClick={zoom(FOTO.abb8)} />
               </div>
            </div>

             {/* Firewall Validierung */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
               <div className="flex items-center gap-3 mb-4">
                  <PieChart className="text-rose-500 w-5 h-5" />
                  <h3 className="text-xl font-bold text-white">Step 4: Architekturprüfung & Zonen Drop (Statistik)</h3>
               </div>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Ein Blick auf die Firewall-Metriken liefert den finalen Beweis: Die Zero-Trust Architektur arbeitet. 
                  11% (564 Traffic Flows) wurden hart abgewiesen, gröÃŸtenteils vom WAN, aber auch aus isolierten VLANs (IoT).
               </p>
               <div className="grid md:grid-cols-2 gap-6">
                 <Photo src={FOTO.abb10} alt="FW Actions" caption="Abb. 10: Event Verhältnis (89% Pass vs 11% Drop)" onClick={zoom(FOTO.abb10)} />
                 <Photo src={FOTO.abb11} alt="FW Interfaces" caption="Abb. 11: Drops per Interface (WAN dominierend)" onClick={zoom(FOTO.abb11)} />
               </div>
            </div>

          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 7. KEY DECISIONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Key Decisions</h2>
              </div>
              <div className="space-y-5">
                {keyDecisions.map((dec, i) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-slate-800 hover:border-orange-500 transition-colors">
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

             <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 font-mono text-xl">05</span>
                <h2 className="text-3xl font-bold text-white">Fazit / Conclusion</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Mit Abschluss der Validierungsphase wurde bewiesen, dass Segmente hermetisch arbeiten. 
                Die Suricata Sensoren spiegeln Malware, Nginx verschleiert IP-Adressen hinter sicheren SSL/TLS Domains, 
                und WireGuard sichert die AuÃŸenwelt via OOB-Host. Das <strong>Enterprise Security Lab OPNsense</strong> 
                ist produktionsbereit.
              </p>

               <div className="mt-8">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="text-emerald-500 font-mono text-xl">06</span>
                    <h2 className="text-3xl font-bold text-white">Deployment Status</h2>
                  </div>
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500 rounded-full text-white animate-pulse">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Projekt Abgeschlossen</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Alle 6 Phasen implementiert, dokumentiert und deployt. Keine offenen Vulnerabilities bekannt.
                        </p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
           </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVIGATION / FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10 text-slate-400 text-sm max-w-2xl mx-auto">
             Dies markiert das Ende der sechsteiligen Artikelserie zum Enterprise Security Lab OPNsense. 
             Vielen Dank für das Interesse am Netzwerk-Setup und Security Design.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            
            <Link
              to="/projekt/security/opnsense/part-5"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Part 5 â€” DNS & Proxy Layer</p>
            </Link>

             <a
              href={docUrl}
              download
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 transition-all group text-center"
            >
              <FileText className="w-7 h-7 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-white">Original Dokument</p>
              <p className="text-xs text-orange-400 mt-1">Lade DOCX herunter</p>
            </a>

            <Link
              to="/projekte"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Abschluss</p>
              <p className="text-sm font-bold text-white">Alle Projekte</p>
              <ArrowRight className="w-5 h-5 text-emerald-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart6;
