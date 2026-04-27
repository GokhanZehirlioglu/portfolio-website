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
  hero: "/Opnsense/Foto's/Part 3 deckel FOTO.png",
  abb2: "/Opnsense/Foto's/Opnsense Schnittstellen Geräte Vlan.png",
  abb3: "/Opnsense/Foto's/Unifi Controller Networks.png",
  abb4: "/Opnsense/Foto's/Unifi Controller Port Vlans.png",
  abb5: "/Opnsense/Foto's/Opnsense  Firewall DNS & DHCP.png", // Or maybe Opnsense  Dienste DNS & DHCP.png
  abb6: "/Opnsense/Foto's/Opnsense  Dienste DNS & DHCP Leases.png",
  abb7: "/Opnsense/Foto's/Opnsense Firewall Regeln LAN.png",
  abb8: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Home.png",
  abb9: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Iot.png",
  abb10: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Server.png",
  abb11: "/Opnsense/Foto's/Opnsense  Firewall Regeln Wan.png",
};

// â”€â”€â”€ Reusable clickable photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string; }) => (
  <div
    className={`group relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/10 ${className}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
    <img src={src} alt={alt} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm rounded-lg p-1.5 z-20">
      <Maximize2 className="w-4 h-4 text-red-400" />
    </div>
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-xs font-medium text-white/90 drop-shadow-md">{caption}</p>
      </div>
    )}
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ProjektOPNsensePart3 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_3_Netzwerksegmentierung_Firewall_Regeln.docx";

  // Data Tables
  const envData = [
    { k: "Firewall", v: "OPNsense 26.1.5, VM 100 auf Proxmox" },
    { k: "Core-Switch", v: "UniFi Switch Ultra, 8 Port PoE+, Controller: CT 101" },
    { k: "LAN / Management", v: "192.168.99.0/24 â€” Gateway: 192.168.99.1 (vtnet1)" },
    { k: "VLAN 20 â€” Home", v: "192.168.20.0/24 â€” Gateway: 192.168.20.1 (vlan020)" },
    { k: "VLAN 30 â€” IoT", v: "192.168.30.0/24 â€” Gateway: 192.168.30.1 (vlan030)" },
    { k: "VLAN 40 â€” Server", v: "192.168.40.0/24 â€” Gateway: 192.168.40.1 (vlan040)" },
    { k: "Trunk", v: "vtnet1 â†’ vmbr3 â†’ UniFi Switch Port 1, trunks=20;30;40" },
  ];

  const zoneData = [
    { name: "Zone 1 â€” LAN/Management", desc: "Höchste Vertrauensstufe. Enthält Proxmox, OPNsense-GUI, NUC-Bastion, UniFi-Controller. Vollzugriff auf alle anderen Zonen.", icon: Shield },
    { name: "Zone 2 â€” Home (VLAN 20)", desc: "Mittlere Vertrauensstufe. Normale Benutzergeräte. Internetzugang erlaubt, Zugriff auf Server-Zone eingeschränkt, kein Zugriff auf Management.", icon: Activity },
    { name: "Zone 3 â€” IoT (VLAN 30)", desc: "Niedrigste Vertrauensstufe. Smart-TV, PS5, Alexa. Nur Internetzugang, kein Zugriff auf interne Netzwerke (RFC1918-Block).", icon: Layers },
    { name: "Zone 4 â€” Server (VLAN 40)", desc: "Hohe Vertrauensstufe. Raspberry Pi 5, Server-Container. Kontrollierter Zugang zu Management und Internet.", icon: Server },
  ];

  const keyDecisions = [
    { title: "RFC1918_Private als Alias", desc: "Ein einziger Alias für alle privaten IP-Bereiche vereinfacht das Regelwerk erheblich und verhindert Lücken." },
    { title: "DNS-Zwang", desc: "Regel 1 jeder Schnittstelle erzwingt den OPNsense Unbound-DNS, um DNS-Ãœber-HTTPS-Bypass zu erschweren." },
    { title: "Server-Zugriff vor RFC-Block", desc: "Das Home-Netz erhält gezielten Zugriff auf Server-Segmente, bevor der generische Block greift." },
    { title: "Kein Server-Zugriff für IoT", desc: "IoT-Geräte erhalten absolutes Zero-Trust und dürfen keine lateralen Bewegungen durchführen." },
    { title: "Third-party Gateway", desc: "Switch führt kein Routing durch, OPNsense behält die alleinige Kontrolle." },
    { title: "Kleine DHCP-Bereiche", desc: "Reduziert Angriffsfläche. Begrenzt auf 10-20 IPs für Server und IoT, um unautorisierte Geräte auszuschlieÃŸen." },
  ];

  const tuning = [
    { k: "DNS Enforcement (Port 53)", v: "Alle Segmente werden gezwungen, den internen OPNsense DNS als einzigen Resolver zu nutzen." },
    { k: "RFC1918-Alias-Block", v: "Blockiert 10.0.0.0/8, 172.16.0.0/12 und 192.168.0.0/16 auf allen Client-Interfaces pragmatisch." },
    { k: "VLAN-Trunk-Restriktion", v: "Doppelte Kontrolle: Auf Proxmox-Ebene (trunks=20;30;40) und portbasiertes Tagging am Switch." },
    { k: "DHCP Snooping", v: "Aufgeschaltet auf dem UniFi Switch, um gefälschte DHCP-Antworten zu unterbinden." },
  ];

  const troubleshooting = [
    { issue: "Ã„nderung der IP-Bereiche", fix: "Die ursprüngliche Planung 10.0.x.x wurde in 192.168.x.x geändert, um Routing-Konflikte mit VPN zu vermeiden." },
    { issue: "VLAN 10 entfallen", fix: "Das Management-VLAN (früher 10) läuft nun direkt ungetaggt auf vtnet1 zur Vereinfachung." },
    { issue: "Server-Regel 1 sehr offen", fix: "Any->Any inbound in Zone 4 ist gewollt für Verwaltung; generischer Outbound-Block schützt das Backend." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 3 â€” VLAN & Firewall Regeln | Enterprise Security Lab</title>
        <meta name="description" content="Part 3: Netzwerksegmentierung, VLANs, Zero-Trust und Firewall-Regeln auf der OPNsense." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEADER / HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-red-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-slate-800/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-red-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-red-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 3</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
            <Network className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            VLAN-Segmentierung &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-500">
              Firewall-Regeln
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Design und Implementierung einer Zero-Trust-Netzwerkarchitektur. Isolation in Sicherheitszonen, 
            Switch-Konfiguration und Firewall-Policy-Rules.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={docUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]"
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
                p.num === 3
                  ? "bg-red-950/50 text-red-400 border-red-500/30 shadow-[0_0_15px_-3px_rgba(239,68,68,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===3 ? 'bg-red-500 text-slate-950': (p.done ? 'bg-slate-800' : 'bg-slate-800/50')}`}>
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
                <span className="text-red-500 font-mono text-xl">01</span>
                <h2 className="text-3xl font-bold text-white">Scope & Design Goal</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Umsetzung einer <strong>Zero-Trust</strong>-Netzwerkarchitektur. Anstatt alle Geräte in einem flachen Netzwerk zu betreiben,
                wird der Datenverkehr in vier isolierte Sicherheitszonen aufgeteilt. Jede Zone erhält nur die minimal notwendigen Zugriffsrechte.
              </p>
              
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Zonierungskonzept</h3>
                <div className="space-y-4">
                  {zoneData.map((z, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <z.icon className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
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
                <span className="text-red-500 font-mono text-xl">02</span>
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
            <span className="text-red-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Config & Implementation</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Zero-Trust Routing Architektur (Part 3)</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Basierend auf der zentralen Firewall-Architektur veranschaulicht diese Grafik den 
                  VLAN-zentrierten Datenfluss. Die Netzwerke (Home, IoT, Server) werden durch 
                  strikte Default-Deny-Regelwerke isoliert; unautorisierte laterale Zugriffe sind ausgeschlossen.
                </p>
              </div>
              <div>
                <Photo src={FOTO.hero} alt="Segmentation Architecture" caption="Architektur: VLAN-Segmentierung & Access-Control" onClick={zoom(FOTO.hero)} />
              </div>
            </div>

            {/* Step 1: OPNsense VLAN */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
               <div className="order-2 md:order-1">
                <h3 className="text-xl font-bold text-white mb-2">Step 1: OPNsense VLAN Interfaces</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Drei VLAN-Sub-Interfaces wurden auf der LAN-Trunkkarte (vtnet1) konfiguriert. 
                  Alle VLAN-Interfaces sind mit `802.1Q` priorisiert und verarbeiten die Pakete des Switches.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <Photo src={FOTO.abb2} alt="VLAN Geräte" caption="Abb. 2: OPNsense VLAN-Geräte â€” Drei Sub-Interfaces auf vtnet1 (20,30,40)" onClick={zoom(FOTO.abb2)} />
              </div>
            </div>

            {/* Step 2: Switch Config */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Step 2: Switch-seitige Zuweisung</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                 <div>
                   <p className="text-sm text-slate-400 leading-relaxed mb-4">
                     Im UniFi Controller wurden vier Netzwerke angelegt, gemappt auf die VLAN-Tags. 
                     Alle verwenden "Third-party Gateway" (OPNsense). 
                     Die Port-Zuweisung regelt explizit "NativeVLAN" für das jeweilige Gerät und tagged VLANs für die APs/Trunks.
                   </p>
                 </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <Photo src={FOTO.abb3} alt="UniFi Networks" caption="Abb. 3: UniFi Networks (Third-party GW)" onClick={zoom(FOTO.abb3)} />
                 <Photo src={FOTO.abb4} alt="UniFi Ports" caption="Abb. 4: UniFi Port-VLAN-Matrix" onClick={zoom(FOTO.abb4)} />
              </div>
            </div>

            {/* Step 3: DHCP */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 3: DHCP Areas & Leases</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Jedes Segment erhält einen DHCP-Server mit sehr eingeschränkten IP-Bereichen. 
                  IoT und Server erhalten jeweils nur 10 DHCP-Adressen. Die Bestätigung zeigt, dass Geräte in ihren Segmenten landen (z.B. IoT-Geräte in 192.168.30.x).
                </p>
                 <Photo src={FOTO.abb6} alt="DHCP Leases" caption="Abb. 6: Aktive DHCP-Leases über 4 Segmente" onClick={zoom(FOTO.abb6)} />
              </div>
              <div>
                 <Photo src={FOTO.abb5} alt="DHCP Pools" caption="Abb. 5: DHCP IPv4 Pools (DNS & DHCP)" onClick={zoom(FOTO.abb5)} />
              </div>
            </div>

            {/* Step 4-6: Firewall Rules Matrix */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 4: Firewall ACL (Zero Trust Rules)</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Die Regeln arbeiten im First-Match-Prinzip (Default Deny). Zentrale Komponente ist der `RFC1918_Private`-Alias, 
                welcher alle privaten IP-Fragmente im Voraus sperrt, um laterale Ausbreitungen auszuschlieÃŸen.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                 <Photo src={FOTO.abb7} alt="LAN Rules" caption="Regeln LAN: Default Allow (Trusted)" onClick={zoom(FOTO.abb7)} />
                 <Photo src={FOTO.abb8} alt="Home Rules" caption="Regeln Home: Server Access, dann RFC-Block" onClick={zoom(FOTO.abb8)} />
                 <Photo src={FOTO.abb9} alt="IoT Rules" caption="Regeln IoT: Harter RFC-Block (Isolation)" onClick={zoom(FOTO.abb9)} />
                 <Photo src={FOTO.abb10} alt="Server Rules" caption="Regeln Server: Global Pass mit RFC-Ausgangssperre" onClick={zoom(FOTO.abb10)} />
              </div>

               <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                 <h4 className="text-lg font-bold text-white mb-4">VPN: WAN-Interface</h4>
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Die WAN-Schnittstelle blockiert via Default Deny jeglichen eingehenden Verkehr. 
                        Es existiert nur eine Ausnahme: UDP auf Port 51820 für WireGuard Remote Access VPN.
                      </p>
                    </div>
                    <div className="md:w-1/2">
                       <Photo src={FOTO.abb11} alt="WAN Rules" caption="Regeln WAN: VPN UDP Pass" onClick={zoom(FOTO.abb11)} />
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 7. KEY DECISIONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-red-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Key Decisions</h2>
              </div>
              <div className="space-y-5">
                {keyDecisions.map((dec, i) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-slate-800 hover:border-red-500 transition-colors">
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

             <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-red-500 font-mono text-xl">05</span>
                <h2 className="text-3xl font-bold text-white">Tuning & Hardening</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {tuning.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
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
             Das Netzwerk ist nun vollständig segmentiert und durch Firewall-Regeln (Zero-Trust) gesichert. 
             Die Sicherheitsarchitektur ist bereit für Part 4: Bedrohungserkennung und Log-Management (Suricata & Wazuh).
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            
            <Link
              to="/projekt/security/opnsense/part-2"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Part 2 â€” Firewall Installation</p>
            </Link>

             <a
              href={docUrl}
              download
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-all group text-center"
            >
              <FileText className="w-7 h-7 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-white">Original Dokument</p>
              <p className="text-xs text-red-400 mt-1">Lade DOCX herunter</p>
            </a>

            <Link
              to="/projekt/security/opnsense/part-4"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Weiter zu</p>
              <p className="text-sm font-bold text-white">Part 4 â€” IDS/IPS & Suricata</p>
              <ArrowRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart3;
