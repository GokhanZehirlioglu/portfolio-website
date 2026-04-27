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

/**
 * Image Mapping based on "Part_1_Netzwerk_Aufbau_Virtualisierung.docx"
 */
const FOTO = {
  hero: "/Opnsense/Foto's/Part 1 deckel FOTO.png",
  abb1: "/Opnsense/Foto's/N150 intel Mini pc Hyper Visor Proxmox Firewall Router.png",
  abb2: "/Opnsense/Foto's/Ubuquit Switch.png",
  abb3: "/Opnsense/Foto's/Ubuquiti AccessPoint.png",
  abb4: "/Opnsense/Foto's/NUC Managment Mini PC.png",
  abb5: "/Opnsense/Foto's/Unifi Controller Topology.png", // Physische Topologie
  abb6: "/Opnsense/Foto's/Proxmox Host pve Ãœbersicht.png",
  abb7: "/Opnsense/Foto's/Proxmox Host pve Netzwerk Adapter.png",
  abb8: "/Opnsense/Foto's/Proxmox Opnsense Vm Ãœbersicht.png",
  abb9: "/Opnsense/Foto's/Proxmox Unifi COntroller VM Ãœbersicht.png",
  abb10: "/Opnsense/Foto's/Proxmox VLAN Test VM Ãœbersicht.png",
  abb11: "/Opnsense/Foto's/Proxmox Opnsense VM Hardware.png",
  abb12: "/Opnsense/Foto's/Raspberry Pi 5 Pironman Max.jpg",
};

// â”€â”€â”€ Reusable clickable photo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string; }) => (
  <div
    className={`group relative cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10 ${className}`}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
    <img src={src} alt={alt} className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm rounded-lg p-1.5 z-20">
      <Maximize2 className="w-4 h-4 text-cyan-400" />
    </div>
    {caption && (
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-xs font-medium text-white/90 drop-shadow-md">{caption}</p>
      </div>
    )}
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ProjektOPNsensePart1 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_1_Netzwerk_Aufbau_Virtualisierung.docx";

  // Data Tables
  const envData = [
    { k: "Hypervisor-Host", v: "Intel N150 Mini PC, 4x GbE NIC, 16 GB RAM, SSD" },
    { k: "Firewall-Appliance", v: "OPNsense (als VM auf Proxmox, VM-ID 100)" },
    { k: "Core-Switch", v: "UniFi Switch Ultra, 8 Port, PoE+, Layer-2-managed" },
    { k: "Access Point", v: "Ubiquiti U6+, WiFi 6, Dual-Band 2x2" },
    { k: "Server Node", v: "Raspberry Pi 5, 16 GB RAM, SSD, Docker-basiert" },
    { k: "Bastion / OOB-Host", v: "Intel NUC Mini PC, LAN-Netz (192.168.99.x)" },
    { k: "ISP-Router", v: "Vodafone Modem im Bridge-Modus" },
    { k: "Netzwerksegmente", v: "LAN: 192.168.99.0/24, VLAN 20/30/40" },
    { k: "Virtualisierung", v: "Proxmox VE 9.1.1, Standalone-Betrieb" },
  ];

  const bridgeData = [
    { k: "vmbr0", v: "nic0 â€” WAN-Bridge, Verbindung zum ISP-Modem" },
    { k: "vmbr1", v: "nic1 â€” LAN-Bridge (derzeit nicht aktiv genutzt)" },
    { k: "vmbr2", v: "nic2 â€” Reserve-Bridge (keine IP, kein VLAN-Aware)" },
    { k: "vmbr3", v: "nic3 â€” LAN/Trunk-Bridge, VLAN-Aware, IP: 192.168.99.100/24, Gateway: 192.168.99.1, Kommentar: LAN" },
  ];

  const vmData = [
    { k: "VM 100 â€” OPNsense", v: "Zentrale Firewall und Router; verarbeitet sÃ¤mtlichen Netzwerkverkehr, VLANs 20/30/40, WireGuard VPN, Suricata IDS, Unbound DNS und Nginx Reverse Proxy" },
    { k: "CT 101 â€” UniFi-Controller", v: "Debian-basierter LXC-Container zur zentralen Verwaltung des UniFi Switch Ultra und des U6+ Access Points; IP: 192.168.99.10" },
    { k: "CT 102 â€” VLAN-Test", v: "Alpine-basierter LXC-Container fÃ¼r Netzwerk-Validierungstests (Ping, Traceroute, VLAN-IsolationsprÃ¼fungen); IP: 192.168.99.186" },
  ];

  const hwData = [
    { k: "VM-ID / Name", v: "100 / OpnSense" },
    { k: "Maschinentyp", v: "q35" },
    { k: "BIOS", v: "OVMF (UEFI)" },
    { k: "CPU", v: "4 Cores, 1 Socket, Typ: host" },
    { k: "RAM", v: "8 GB (Ballooning deaktiviert, balloon=0)" },
    { k: "Disk", v: "32 GB, VirtIO SCSI, discard=on, ssd=1" },
    { k: "NIC net0 (WAN)", v: "VirtIO, vmbr0, queues=4" },
    { k: "NIC net2 (LAN/Trunk)", v: "VirtIO, vmbr3, queues=4, trunks=20;30;40" },
  ];

  const configDecisions = [
    { title: "Proxmox statt ESXi", reason: "Open-Source, KVM/QEMU-basiert, native LXC-UnterstÃ¼tzung, kein Lizenzmodell, VLAN-aware Bridges nativ verfÃ¼gbar" },
    { title: "Standalone statt Cluster", reason: "Einzelner physischer Host vorhanden; Cluster-Overhead unnÃ¶tig fÃ¼r Homelab-Szenario" },
    { title: "4 separate Bridges", reason: "Jeder NIC erhÃ¤lt seinen eigenen Bridge, um VerkehrsdomÃ¤nen physisch zu isolieren und eine klare Zuordnung zu gewÃ¤hrleisten" },
    { title: "vmbr3 als VLAN-Trunk", reason: "Zentraler Bridge fÃ¼r internen Verkehr; VLAN-Aware ermÃ¶glicht getaggten Transport in einer einzigen Leitung" },
    { title: "trunks=20;30;40 auf VM-NIC", reason: "Proxmox-seitige VLAN-Restriktion verhindert, dass OPNsense unerwartete VLAN-Tags injiziert oder empfÃ¤ngt" },
    { title: "NUC als separater Bastion-Host", reason: "Out-of-Band-Zugriff: Selbst bei Ausfall von Proxmox oder OPNsense bleibt Ãœberwachung und SSH-Zugang verfÃ¼gbar" },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 1 — Netzwerk-Aufbau & Virtualisierung | Enterprise Security Lab</title>
        <meta name="description" content="Part 1: Netzwerk-Aufbau & Virtualisierung (Proxmox) für das Enterprise Security Lab" />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  HEADER / HERO â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-cyan-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-900/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-cyan-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 1</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            <Activity className="w-3 h-3 animate-pulse" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Netzwerk-Aufbau &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Virtualisierung
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Hardwarebasis, physische Topologie und Hypervisor-Infrastruktur. Das Fundament der Sicherheitsarchitektur.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={docUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]"
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
                p.num === 1
                  ? "bg-cyan-950/50 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===1 ? 'bg-cyan-500 text-slate-950': 'bg-slate-800'}`}>
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
                <span className="text-cyan-500 font-mono text-xl">01</span>
                <h2 className="text-3xl font-bold text-white">Scope & Ziel</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Dieses Dokument beschreibt den physischen und virtuellen Infrastrukturaufbau des Enterprise Security Labs.
                Es umfasst die eingesetzte Hardware, die physische Netzwerktopologie, die Proxmox-Virtualisierungsplattform sowie
                das Bridge-Design als Grundlage fÃ¼r die gesamte Sicherheitsarchitektur.
              </p>
              
              {/* 3. Design Goal */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity size={18} className="text-cyan-500" />
                  Design Goals
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                    <span className="text-sm"><strong>Zentralisierung:</strong> Alle Netz-Dienste konsolidiert auf einem Hypervisor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                    <span className="text-sm"><strong>Segmentierung:</strong> Sichere Trennung durch getrennte Linux Bridges und VLAN-Awareness.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
                    <span className="text-sm"><strong>OOB-Management:</strong> Separater NUC-Host, der greift, falls Proxmox ausfÃ¤llt.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-cyan-500 font-mono text-xl">02</span>
                <h2 className="text-3xl font-bold text-white">Environment</h2>
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

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 4. COMPONENTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-cyan-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Components Involved</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Photo src={FOTO.abb1} alt="Intel N150 Mini PC" caption="Abb. 1: Intel N150 Mini PC â€” 4x GbE, lÃ¼fterlos, Proxmox-Host" onClick={zoom(FOTO.abb1)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4.1 Intel N150 â€” Hypervisor</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Mit seinem lÃ¼fterlosen GehÃ¤use und vier dedizierten Gigabit-Netzwerkkarten ist dieser Host ideal fÃ¼r OPNsense. 
                  Physische Trennung von WAN, LAN und VLAN-Trunk erfolgt direkt auf Modul-Ebene.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo src={FOTO.abb2} alt="UniFi Switch Ultra" caption="Abb. 2: UniFi Switch Ultra â€” 8 Port PoE+, Layer-2-managed" onClick={zoom(FOTO.abb2)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4.2 UniFi Switch Ultra</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Zentraler PoE+ Switch, verwaltet den VLAN-getaggten Verkehr zu EndgerÃ¤ten, Server-Nodes und IoT-Komponenten.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo src={FOTO.abb3} alt="Ubiquiti U6+" caption="Abb. 3: Ubiquiti U6+ â€” WiFi 6, Dual-Band, PoE-betrieben" onClick={zoom(FOTO.abb3)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4.3 Ubiquiti U6+ Access Point</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Strahlungsarme, performante WiFi-6 Abdeckung, via Controller ins Segmentierungskonzept integriert (SSID-VLAN Mapping).
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo src={FOTO.abb12} alt="Raspberry Pi 5 Pironman" caption="Abb. 4: Raspberry Pi 5 â€” Pironman Max Case" onClick={zoom(FOTO.abb12)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4.4 Raspberry Pi 5 â€” Server Node</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Zentraler Server Node im Netzwerk. Betreibt Docker-basierte Dienste (wie Uptime Kuma) und ist fest in die VLAN-Topologie eingebunden.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Photo src={FOTO.abb4} alt="Intel NUC" caption="Abb. 4: Intel NUC Mini PC â€” Bastion-Host und OOB-Management" onClick={zoom(FOTO.abb4)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4.5 Intel NUC â€” Bastion</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Isolierter OOB-Host. Ãœbernimmt Dashboard- und Monitoring-Aufgaben und gewÃ¤hrt Notfallzugriff bei Ausfall des Hypervisors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 5. ARCHITECTURE LOGIC â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-cyan-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Architecture Logic</h2>
              </div>
              <div className="prose prose-invert prose-p:text-sm prose-p:text-slate-400 prose-p:leading-relaxed max-w-none">
                <p>
                  Das Design gliedert sich in physische Schicht, Virtualisierungsschicht und logische Netzwerkschicht.
                  Das Modem liefert WAN an <strong>Port 1 (nic0)</strong>. <strong>Port 3 (nic3)</strong> fÃ¼hrt als VLAN-Trunk zum UniFi Switch.
                </p>
                <p>
                  <strong>Datenfluss:</strong> OPNsense agiert als TorwÃ¤chter. Nach NAT/Firewallung geht der interne Verkehr Ã¼ber die 
                  VLAN-fÃ¤hige Bridge (`vmbr3`) an den Switch.
                </p>
                <p>
                  So erfolgt eine strikte Trennung selbst innerhalb eines physikalischen Kabels durch 802.1Q Tags.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <Photo src={FOTO.abb5} alt="Topologie" caption="Abb. 5: Physische Topologie â€” Gesamte Infrastruktur" onClick={zoom(FOTO.abb5)} />
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 6. IMPLEMENTATION STEPS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-cyan-500 font-mono text-xl">05</span>
            <h2 className="text-3xl font-bold text-white">Implementation Steps</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Gesamte Netzwerk- & Virtualisierungsarchitektur (Part 1)</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Die Abbildung visualisiert die Konvergenz von physischer Hardware und logischer Virtualisierung. 
                  SÃ¤mtliche internen Knoten (Switch, APs, Server) sind Ã¼ber isolierte Pfade auf dem Proxmox-Hypervisor 
                  konsolidiert.
                </p>
              </div>
              <div>
                <Photo src={FOTO.hero} alt="Infrastructure Topology" caption="Architektur: Virtualisierung & Hardware Basis" onClick={zoom(FOTO.hero)} />
              </div>
            </div>

            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
              <div className="order-2 md:order-1">
                <Photo src={FOTO.abb6} alt="Proxmox Ãœbersicht" caption="Abb. 6: Proxmox Host-Ãœbersicht â€” pve, Ressourcen und Uptime" onClick={zoom(FOTO.abb6)} />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-xl font-bold text-white mb-2">Step 1: Proxmox VE Installation</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Bare-Metal-Installation auf dem Intel N150. EFI-Boot Modus mit Linux Kernel 6.
                  Die ASPM Pcie Energieverwaltung wurde via GRUB optimiert.
                  Die Nodes Ãœbersicht zeigt stabile Last auch bei mehreren VMs.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 2: Bridge-Design (Network)</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Jeder physische Port wird auf eine eigene Linux-Bridge durchgeschleift.
                  Der zentrale Knoten ist <code>vmbr3</code> â€” hier liegen die Management-IP (192.168.99.100) 
                  und das VLAN-Trunking ist aktiviert.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                  {bridgeData.map((b, i) => (
                    <div key={i} className="flex border-b border-slate-800/50 last:border-0 p-3">
                      <div className="w-16 font-mono font-bold text-cyan-400 text-xs shrink-0">{b.k}</div>
                      <div className="text-xs text-slate-400 font-mono">{b.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Photo src={FOTO.abb7} alt="Network Adapters" caption="Abb. 7: Proxmox Netzwerkkonfiguration â€” Linux Bridges" onClick={zoom(FOTO.abb7)} />
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Step 3: Virtuelle Maschinen & Container</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                 <Photo src={FOTO.abb8} alt="OPNsense VM" caption="Abb. 8: OPNsense VM 100 â€” StatusÃ¼bersicht" onClick={zoom(FOTO.abb8)} />
                 <Photo src={FOTO.abb9} alt="UniFi CT" caption="Abb. 9: UniFi-Controller CT 101" onClick={zoom(FOTO.abb9)} />
                 <Photo src={FOTO.abb10} alt="Test CT" caption="Abb. 10: VLAN-Test CT 102" onClick={zoom(FOTO.abb10)} />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {vmData.map((vm, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-bold text-cyan-400 mb-1">{vm.k}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{vm.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Photo src={FOTO.abb11} alt="VM Hardware" caption="Abb. 11: OPNsense VM Hardware â€” Detaillierte Konfiguration" onClick={zoom(FOTO.abb11)} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Step 4: OPNsense VM Hardware-HÃ¤rtung</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Die Zuweisung der Hardware fÃ¼r die Firewall ist kritisch. Q35 Maschinentyp,
                  OVMF UEFI, und VirtIO fÃ¼r optimale NetzwerkdurchsÃ¤tze.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {hwData.map((h, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                      <div className="text-[10px] uppercase text-cyan-500 font-bold mb-1 tracking-wider">{h.k}</div>
                      <div className="text-xs text-white font-mono">{h.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 7. KEY DECISIONS & 8. TUNING â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
            {/* Key Decisions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-cyan-500 font-mono text-xl">06</span>
                <h2 className="text-3xl font-bold text-white">Engineering Decisions</h2>
              </div>
              <div className="space-y-4">
                {configDecisions.map((dec, i) => (
                  <div key={i} className="group relative pl-4 border-l-2 border-slate-800 hover:border-cyan-500 transition-colors">
                    <h4 className="text-sm font-bold text-white">{dec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{dec.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tuning / Hardening */}
             <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-cyan-500 font-mono text-xl">07</span>
                <h2 className="text-3xl font-bold text-white">Tuning & Hardening</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { k: "ASPM-Optimierung", v: "Energieverwaltung der PCIe-GerÃ¤te via GRUB stabilisiert" },
                  { k: "VT-x / IOMMU", v: "Im BIOS aktiviert fÃ¼r Host-CPU-Passthrough FunktionalitÃ¤t" },
                  { k: "VLAN-Restriktion", v: "trunks=20;30;40 auf net2 erzwingt Proxmox-seitige Paketfilterung" },
                  { k: "RAM Ballooning=0", v: "Feste 8 GB RAM fÃ¼r OPNsense zur Vermeidung von Kernel-Panics" },
                  { k: "LXC Unprivileged", v: "Container laufen ohne Root-Rechte zur Ausbruchsminderung" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-cyan-500 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">{t.k}</div>
                      <div className="text-xs text-slate-400">{t.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 9. VALIDATION & 11. ISSUES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
              {/* Validation */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-cyan-500 font-mono text-xl">08</span>
                  <h2 className="text-3xl font-bold text-white">Validation</h2>
                </div>
                <div className="space-y-2">
                  {[
                    "Proxmox Host bootet im EFI-Modus",
                    "Alle 4 GbE NICs erkannt und aktiv",
                    "Bridge vmbr3 ist VLAN-Aware markiert",
                    "OPNsense VM lÃ¤uft stabil (> 4 Tage Uptime)",
                    "UniFi-CT aktiv & Controller erreichbar",
                    "Trunks (20;30;40) auf VM-Interface durchgesetzt",
                  ].map((val, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-300 font-mono">{val}</span>
                      <span className="text-xs font-bold text-green-500">âœ… PASS</span>
                    </div>
                  ))}
                </div>
              </div>

               {/* Troubleshooting */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-amber-500 font-mono text-xl">09</span>
                  <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { issue: "Proxmox Repo Warnung", fix: "Kostenloses 'No-Subscription'-Repo aktiviert (Homelab Standard)." },
                    { issue: "Unklare NIC-Zuordnung", fix: "Generische Namen (enx00...) durch schrittweises Physisches Einstecken ermittelt (Cable-Tracer Methode)." },
                    { issue: "ASPM Kernel Logs", fix: "PCIe Energie-Fehler traten auf. Fix: 'quiet hw.pci.enable_aspm=0' in GRUB." },
                    { issue: "vmbr2 ungenutzt", fix: "Ist als Reserve vorkonfiguriert, beeintrÃ¤chtigt die Hostleistung nicht." },
                  ].map((ts, i) => (
                    <div key={i} className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold text-amber-500">{ts.issue}</span>
                      </div>
                      <p className="text-xs text-slate-400 pl-6 leading-relaxed">{ts.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVIGATION / FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10 text-slate-400 text-sm max-w-2xl mx-auto">
            Die Infrastruktur ist nun betriebsbereit. Das Fundament ist gelegt, um im kommenden Schritt
            die eigentliche Firewall-Architektur in der VM auszurollen.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
             <a
              href={docUrl}
              download
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all group text-center"
            >
              <FileText className="w-7 h-7 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-bold text-white">Original Dokument</p>
              <p className="text-xs text-cyan-400 mt-1">Lade DOCX herunter</p>
            </a>

            <Link
              to="/projekt/security/opnsense/part-2"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Weiter zu</p>
              <p className="text-sm font-bold text-white">Part 2 â€” Firewall Optimierung</p>
              <ArrowRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart1;
