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
  hero: "/Opnsense/Foto's/part4 .png",
  abb1: "/Opnsense/Foto's/part4 .png", 
  abb2: "/Opnsense/Foto's/Opnsense  Dienste IDS Verwaltung.png",
  abb3: "/Opnsense/Foto's/Opnsense  Dienste IDS Regel.png",
  abb4: "/Opnsense/Foto's/Opnsense  Dienste IDS Protokoldatei.png",
  abb5: "/Opnsense/Foto's/Wazuh Dashboard.png",
  abb6: "/Opnsense/Foto's/Wazuh Dashboard2.png",
  abb7: "/Opnsense/Foto's/Wazuh Alerts.png",
  abb8: "/Opnsense/Foto's/Wazuh Archievs.png",
};

// â”€â”€â”€ Reusable clickable photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string; }) => (
  <div
    className={`group relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/10 ${className}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
    <img src={src} alt={alt} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm rounded-lg p-1.5 z-20">
      <Maximize2 className="w-4 h-4 text-emerald-400" />
    </div>
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-xs font-medium text-white/90 drop-shadow-md">{caption}</p>
      </div>
    )}
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ProjektOPNsensePart4 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_4_Bedrohungserkennung_Log_Management.docx";

  // Data Tables
  const envData = [
    { k: "OPNsense Firewall", v: "VM 100, Suricata-Dienst integriert, Syslog-Weiterleitung konfiguriert" },
    { k: "Raspberry Pi 5", v: "16 GB RAM, Debian 13 (trixie), aarch64, VLAN 40 (192.168.40.20)" },
    { k: "Docker / Docker Compose", v: "Containerisierte Wazuh-Bereitstellung (Single-Node)" },
    { k: "Wazuh Stack", v: "Manager + Indexer + Dashboard (v4.x), Port 514 (Syslog), Port 443 (Dashboard)" },
    { k: "Syslog-Transport", v: "UDP 514, RFC 3164, OPNsense â†’ Wazuh Manager" },
    { k: "Ãœberwachte Schnittstellen", v: "LAN, LgBeta_Home, LgBeta_IoT, LgBeta_Server, WAN" },
  ];

  const rulesetData = [
    { name: "mobile_malware", desc: "Erkennung von Malware-Kommunikation mobiler Geräte", icon: AlertTriangle },
    { name: "threatview_CS_c2", desc: "Command-and-Control-Server-Erkennung (Cobalt Strike u.a.)", icon: GitBranch },
    { name: "tor", desc: "Erkennung von Tor-Netzwerk-Verkehr", icon: Globe },
    { name: "test", desc: "Testregeln für Validierung (EICAR u.a.)", icon: CheckCircle2 },
  ];

  const keyDecisions = [
    { title: "IDS statt IPS", desc: "Suricata läuft im reinen Erkennungsmodus, um False Positives und Verbindungsabbrüche auf legitimen Verkehr zu vermeiden." },
    { title: "Selektives Ruleset", desc: "Nur 4 von über 30 Kategorien aktiv, minimiert die CPU-Last des N150 und verringert unnötiges Alarm-Rauschen." },
    { title: "Raspberry Pi 5 als SIEM-Server", desc: "16 GB Modell, vollständig ausreichend für Single-Node Wazuh. Isolierung durch Platzierung in VLAN 40." },
    { title: "Docker statt LXC", desc: "Bietet bessere Portabilität und einfacheres Update-Management." },
    { title: "Syslog (agentless)", desc: "FreeBSD unterstützt nativ keinen Wazuh Agent. Agentlose Syslog-Integration mittels UDP 514 ist effizient." },
    { title: "RFC 3164 Log-Format", desc: "Wazuh-Decoder verarbeiten RFC 3164 zuverlässig; RFC 5424 führte in Tests zu Parsing-Fehlern." },
  ];

  const tuning = [
    { k: "Promiscuous Mode", v: "Erweitert den Blick auf den getaggten VLAN-Trunk-Verkehr, nicht nur auf native Netzwerke." },
    { k: "Eve-Syslog", v: "Zusätzliche strukturierte JSON-Logs ermöglichen tiefere SIEM-Integration (zukünftige Analysen)." },
    { k: "Wazuh Heap Limit", v: "Elasticsearch Indexer Heap begrenzt auf 4-6 GB (Xms/Xmx), um Paging und Out-of-Memory Errors zu verhindern." },
    { k: "Index Lifecycle (30 Tage)", v: "Rotationsrichtlinie löscht ältere Indizes automatisch ab, schützt SSD." },
  ];

  const troubleshooting = [
    { issue: "LXC-SIEM-Plan verworfen", fix: "Der Umstieg von einem LXC direkt auf Docker (RPi5) wurde für Wartbarkeit und Isolation vollzogen." },
    { issue: "Log-Ziel geändert", fix: "Statt ursprünglich geplanter LXC-IP (192.168.99.10) läuft Syslog nun sauber in 192.168.40.20." },
    { issue: "RAM-Verbrauch Indexer", fix: "Der speicherhungrige Indexer wurde hart über Compose Limits eingefangen." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 4 â€” IDS/IPS & Log Management | Enterprise Security Lab</title>
        <meta name="description" content="Part 4: Bedrohungserkennung mit Suricata IDS und zentrales SIEM Log-Management mit Wazuh." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEADER / HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-emerald-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-teal-900/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-emerald-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 4</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Search className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            IDS/IPS & Log<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              Management
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Aufbau einer Deep Packet Inspection Pipeline (Suricata) kombiniert mit einer Wazuh SIEM Lösung 
            für vollständige Netzwerk-Observability.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={docUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
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
                p.num === 4
                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===4 ? 'bg-emerald-500 text-slate-950': (p.done ? 'bg-slate-800' : 'bg-slate-800/50')}`}>
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
                <span className="text-emerald-500 font-mono text-xl">01</span>
                <h2 className="text-3xl font-bold text-white">Scope & Design Goal</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Eine Firewall blockt lediglich unerlaubten Verkehr. Sie erkennt nicht, was in einem erlaubten Verkehr stattfindet.
                Das Design-Ziel für die Observability-Schicht besteht in einer Deep-Packet-Inspection Pipeline (Suricata IDS) parallel 
                zu einer SIEM-Lösung (Wazuh).
              </p>
              
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Ausgewähltes Ruleset (ET Open)</h3>
                <div className="space-y-4">
                  {rulesetData.map((z, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <z.icon className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
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
                <span className="text-emerald-500 font-mono text-xl">02</span>
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
            <span className="text-emerald-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Config & Implementation</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 1: Security Monitoring & SIEM Architektur</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Traffic flieÃŸt in OPNsense. Suricata greift den Promiscuous-Modus ab. Bei Match generiert Suricata Security Alerts, welche (inkl. nativen OPNsense Filter-Events) per UDP 514 über eine Syslog-Pipeline an Wazuh weitergeleitet werden.
                </p>
              </div>
              <div>
                <Photo src={FOTO.abb1} alt="SIEM Architektur" caption="Abb. 1: Security Monitoring & SIEM Architecture" onClick={zoom(FOTO.abb1)} />
              </div>
            </div>

            {/* Suricata Config */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 2: Suricata Parameter</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Konfiguration im passiven PCAP Live Mode ohne Paket-Dropping. Alle 5 Schnittstellen analysiert. Zusätzliche Eve-Syslog Ausgaben aktiviert, um granulare JSON Logs zu erzeugen.
                </p>
                 <Photo src={FOTO.abb2} alt="Suricata Settings" caption="Abb. 2: Suricata IDS-Einstellungen" onClick={zoom(FOTO.abb2)} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-white mb-2">Step 3: Regeln (Signatures)</h3>
                 <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                   Es sind genau über 192.188 ET Open Signaturen hochgeladen und konfiguriert.
                 </p>
                 <Photo src={FOTO.abb3} alt="Suricata Rules" caption="Abb. 3: Aktive Signatur-Kategorisierungen" onClick={zoom(FOTO.abb3)} />
              </div>
            </div>
            
            {/* Live Logs */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <h3 className="text-xl font-bold text-white mb-4">Step 4: Suricata Live Protokolldaten</h3>
               <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                 Nachweis der Live Erkennungen in der OPNsense GUI. Warnungen der letzten Woche validieren das Funktionieren des Signatur-Mappings und Syslog-Exports.
               </p>
               <Photo src={FOTO.abb4} alt="Suricata Logs" caption="Abb. 4: Suricata Flowbit Warnungen und Protokolldaten" onClick={zoom(FOTO.abb4)} />
            </div>

            {/* Dashboards */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Database className="text-emerald-500 w-6 h-6" />
                <h3 className="text-xl font-bold text-white">Step 5: Wazuh SIEM Dashboards (RPi 5)</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Die Raspberry Pi 5 Container-Landschaft fungiert als Wazuh Manager & Indexer. Eingehende Syslog NetFlows werden decodiert und im Dashboard grafisch aufbereitet.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                 <Photo src={FOTO.abb5} alt="Wazuh Overview" caption="Abb. 5: Wazuh OPNsense Security Overview â€” Block Events" onClick={zoom(FOTO.abb5)} />
                 <Photo src={FOTO.abb6} alt="Unifi Integration" caption="Abb. 6: UniFi Infrastructure Overview â€” AP Events" onClick={zoom(FOTO.abb6)} />
              </div>

               <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold text-emerald-400 mb-2">Step 6: Alert Discovery</h4>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Nachweis einer EICAR-Event Simulation und erfolgreichen Decodierung einer Suricata Test Warning (SID 2100498) im Logstore.
                    </p>
                    <Photo src={FOTO.abb7} alt="Alerts" caption="Abb. 7: Wazuh Alerts Dashboard" onClick={zoom(FOTO.abb7)} />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-400 mb-2">Step 7: Langzeitspeicherung (Compliance)</h4>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Bis zu 30 Tage Rotation sichern alle Security Events (mehr als 61.000 generierte Log-Zeilen im abgebildeten Index).
                    </p>
                    <Photo src={FOTO.abb8} alt="Archives" caption="Abb. 8: Wazuh Archives" onClick={zoom(FOTO.abb8)} />
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
                <span className="text-emerald-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Key Decisions</h2>
              </div>
              <div className="space-y-5">
                {keyDecisions.map((dec, i) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-slate-800 hover:border-emerald-500 transition-colors">
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dec.desc}</p>
                  </div>
                ))}
              </div>
            </div>

             <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-mono text-xl">05</span>
                <h2 className="text-3xl font-bold text-white">Tuning & Hardening</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {tuning.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
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
             Die Observability-Schicht (IDS/SIEM) ist funktional. Security Events von der Firewall wie auch vom Switch 
             strömen ins SIEM, um proaktives Log-Management zu belegen.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            
            <Link
              to="/projekt/security/opnsense/part-3"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Part 3 â€” VLAN & Firewall Regeln</p>
            </Link>

             <a
              href={docUrl}
              download
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group text-center"
            >
              <FileText className="w-7 h-7 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-white">Original Dokument</p>
              <p className="text-xs text-emerald-400 mt-1">Lade DOCX herunter</p>
            </a>

            <Link
              to="/projekt/security/opnsense/part-5"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Weiter zu</p>
              <p className="text-sm font-bold text-white">Part 5 â€” DNS-Filtering</p>
              <ArrowRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart4;
