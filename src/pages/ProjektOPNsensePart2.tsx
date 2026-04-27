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

/**
 * Image Mapping based on "Part_2_Firewall_Installation_Optimierung.docx"
 */
const FOTO = {
  hero: "/Opnsense/Foto's/Part 2 deckel FOTO.png",
  abb1: "/Opnsense/Foto's/Part 2 deckel FOTO.png", // Abb. 1: OPNsense als virtuelle Firewall innerhalb der Proxmox-Architektur (Architekturdiagramm)
  abb2: "/Opnsense/Foto's/Proxmox Opnsense VM Hardware.png", // Abb. 2: OPNsense VM-Hardware
  abb3: "/Opnsense/Foto's/Opnsense Lobby Dashboard.png", // Abb. 3: OPNsense Lobby-Dashboard
  abb4: "/Opnsense/Foto's/Opnsense Schnittstellen Zuweisungen.png", // Abb. 4: Schnittstellenzuweisungen
  abb5: "/Opnsense/Foto's/Opnsense Schnittstellen Ãœbersicht.png", // Abb. 5: Schnittstellenübersicht
  abb6: "/Opnsense/Foto's/Opnsense System Einstellungen Verwqaltung.png", // Abb. 6: System-Verwaltungseinstellungen
  abb7: "/Opnsense/Foto's/Opnsense  System Routen Status.png", // Abb. 7: Routing-Tabelle
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
const ProjektOPNsensePart2 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const docUrl = "/Opnsense/Datei/Part_2_Firewall_Installation_Optimierung.docx";

  // Data Tables
  const paramData = [
    { k: "Hypervisor", v: "Proxmox VE 9.1.1, Standalone-Node (pve)" },
    { k: "WAN-Bridge", v: "vmbr0 â€” Verbindung zum ISP-Modem (Bridge-Modus)" },
    { k: "LAN/Trunk-Bridge", v: "vmbr3 â€” VLAN-Aware, IP: 192.168.99.100/24" },
    { k: "OPNsense ISO", v: "OPNsense 26.1.5 (amd64), FreeBSD 14.3-RELEASE-p9" },
    { k: "VM-ID", v: "100" },
    { k: "WAN-IP", v: "DHCP vom ISP (aktuell: 46.223.25.129/22)" },
    { k: "LAN-IP / Management", v: "192.168.99.1/24 (statisch auf vtnet1)" },
  ];

  const interfacesData = [
    { name: "[LAN] (lan)", value: "vtnet1 (bc:24...c5) â€” statisch, 192.168.99.1/24", icon: Shield },
    { name: "[LgBeta_Home] (opt2)", value: "vlan020 (Ãœbergeordnet: vtnet1, Tag: 20) â€” statisch, 192.168.20.1/24", icon: Layers },
    { name: "[LgBeta_IoT] (opt1)", value: "vlan030 (Ãœbergeordnet: vtnet1, Tag: 30) â€” statisch, 192.168.30.1/24", icon: Layers },
    { name: "[LgBeta_Server] (opt4)", value: "vlan040 (Ãœbergeordnet: vtnet1, Tag: 40) â€” statisch, 192.168.40.1/24", icon: Server },
    { name: "[WAN] (wan)", value: "vtnet0 (bc:24...bb) â€” DHCP, 46.223.25.129/22", icon: Globe },
    { name: "[WireGuard_VPN]", value: "wg0 (WireGuard_Server) â€” 10.10.10.1/24", icon: Lock },
  ];

  const adminSettings = [
    { k: "Protokoll", v: "HTTPS (HTTP deaktiviert)" },
    { k: "SSL-Zertifikat", v: "Web GUI TLS certificate (self-signed)" },
    { k: "TCP-Port", v: "8443 (vom Standard 443 geändert)" },
    { k: "HTTP-Umleitung", v: "Aktiviert (HTTP â†’ HTTPS)" },
    { k: "Alternative Hostnamen", v: "opnsense.home.internal (für DNS-Rebind)" },
    { k: "Sitzungszeitlimit", v: "240 Minuten" },
    { k: "SSH-Server", v: "Deaktiviert (Härtung)" },
  ];

  const hwParams = [
    { k: "Maschinentyp", v: "q35 (Moderner Chipsatz, PCIe)" },
    { k: "BIOS", v: "OVMF (UEFI)" },
    { k: "Storage", v: "VirtIO SCSI, 32GB local-lvm, ssd=1, discard=on" },
    { k: "CPU", v: "4 Cores, Typ: host (AES-NI Passthrough)" },
    { k: "RAM", v: "8.00 GiB, balloon=0" },
    { k: "NIC net0", v: "VirtIO, vmbr0, queues=4" },
    { k: "NIC net2", v: "VirtIO, vmbr3, queues=4, trunks=20;30;40" },
  ];

  const keyDecisions = [
    { title: "OPNsense statt pfSense", desc: "Modernere Codebasis, Updates, native Plugins (Nginx, WireGuard), intuitives Web-GUI. Ideal als FreeBSD-Fork." },
    { title: "Virtuell statt Bare-Metal", desc: "Snapshots & Backups, Koexistenz mit Controller/Testumgebung auf demselben Host." },
    { title: "Zwei NICs statt drei", desc: "LAN und MGMT laufen über eine einzige Trunk-NIC (vtnet1), was die Komplexität senkt." },
    { title: "CPU-Typ: host", desc: "Host-Passthrough aktiviert AES-NI für VPN (WireGuard) und IDS/IPS (Suricata) Analyse." },
    { title: "Ballooning deaktiviert", desc: "Firewall darf keinen schwankenden Speicher haben. Feste 8 GB verhindern Kernel-Panics." },
    { title: "Port 8443 (kein SSH)", desc: "Port 443 bleibt frei für Nginx. SSH ist deaktiviert, um die Angriffsfläche zu minimieren." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Part 2 â€” OPNsense Firewall Anwendungen - Installation & Optimierung | Enterprise Security Lab</title>
        <meta name="description" content="Part 2: Firewall-Installation, Konfiguration, Schnittstellenzuordnung und Performance-Tuning der OPNsense VM" />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HEADER / HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="py-24 px-4 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-orange-900/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-amber-900/30 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono uppercase tracking-wider">
            <Link to="/projekte" className="hover:text-orange-400 transition-colors">Projekte</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-orange-400">Cloud & CyberSec</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Part 2</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/30 border border-orange-500/20 text-orange-400 text-xs font-medium mb-6">
            <Shield className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Firewall-Installation &<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
              Optimierung
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Konfiguration der virtuellen OPNsense-Appliance, Schnittstellenzuordnung und 
            Performance-Tuning für das Enterprise Network.
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
                p.num === 2
                  ? "bg-orange-950/50 text-orange-400 border-orange-500/30 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]"
                  : p.done
                  ? "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
                  : "bg-transparent text-slate-500 border-slate-800 hover:border-slate-600"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num===2 ? 'bg-orange-500 text-slate-950': (p.done ? 'bg-slate-800' : 'bg-slate-800/50')}`}>
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
                <h2 className="text-3xl font-bold text-white">Scope & Ziel</h2>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Dieses Dokument beschreibt die Installation, Konfiguration und Optimierung der 
                OPNsense-Firewall als virtuelle Appliance (NVA) innerhalb von Proxmox.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity size={18} className="text-orange-500" />
                  Design Goals
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Die VM soll stabil und performant laufen, WAN via DHCP beziehen und als Management-Gateway dienen. 
                  Sämtlicher Netzwerkverkehr muss diese Instanz passieren, weshalb die virtuellen 
                  Interfaces (VirtIO) durch Hardware-Offloading-Deaktivierung und Multiqueue-Settings auf 
                  maximale Paketdurchsätze vorbereitet wurden.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 font-mono text-xl">02</span>
                <h2 className="text-3xl font-bold text-white">Environment</h2>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {paramData.map((row, i) => (
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
            <h2 className="text-3xl font-bold text-white">Installation & Konfiguration</h2>
          </div>

          <div className="space-y-16">
            
            {/* Architektur */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Firewall Placement Architektur (Part 2)</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  OPNsense nimmt als dediziertes Network Virtual Appliance (NVA) den zentralen 
                  Gateway-Punkt in der Infrastruktur ein. Sie regelt ab diesem Punkt den Datenverkehr 
                  zwischen dem physischen WAN-Modem und der internen VLAN-Trunk-Bridge.
                </p>
              </div>
              <div>
                <Photo src={FOTO.abb1} alt="Firewall Placement" caption="Abb. 1: OPNsense als virtuelle Firewall innerhalb der Proxmox-Architektur" onClick={zoom(FOTO.abb1)} />
              </div>
            </div>

            {/* Step 1: Hardware-Tuning */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
               <div className="order-2 md:order-1">
                <h3 className="text-xl font-bold text-white mb-2">Step 1: VM Hardware Tuning</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Bewusste Abstimmung für eine Network Virtual Appliance. AES-NI Passthrough 
                  für zukünftige VPN- & IDS-Workloads. Paravirtualisierung durch VirtIO.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                  {hwParams.map((b, i) => (
                    <div key={i} className="flex border-b border-slate-800/50 last:border-0 p-3">
                      <div className="w-24 font-mono font-bold text-orange-400 text-xs shrink-0">{b.k}</div>
                      <div className="text-xs text-slate-400 font-mono">{b.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Photo src={FOTO.abb2} alt="VM Hardware" caption="Abb. 2: OPNsense VM-Hardware â€” q35, VirtIO, balloon=0, trunks=20;30;40" onClick={zoom(FOTO.abb2)} />
              </div>
            </div>

            {/* Step 3: OPNsense Dashboard */}
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Step 2: OS Installation & System Status</h3>
                <Terminal className="text-orange-500 w-6 h-6" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                 <Photo src={FOTO.abb3} alt="OPNsense Dashboard" caption="Abb. 3: OPNsense Lobby-Dashboard â€” System, Schnittstellen, Dienste" onClick={zoom(FOTO.abb3)} />
                 <div>
                    <h4 className="font-bold text-orange-400 mb-2">Erkenntnisse aus dem Dashboard</h4>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      OPNsense 26.1.5 (FreeBSD 14.3) läuft stabil. Die WAN-Schnittstelle bezieht per 
                      DHCP die IP `46.223.25.129`. Die Management/LAN-Schnittstelle ist `192.168.99.1`.
                      Der Hostname <code>opnsense.home.internal</code> schützt vor DNS-Rebind Attacken.
                      <br/><br/>
                      Zusätzliche Interfaces wie LgBeta_Home, LgBeta_IoT und LgBeta_Server wurden bereits aktiviert.
                    </p>
                 </div>
              </div>
            </div>

            {/* Step 4 & 5: Interfaces */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Step 3: Schnittstellenzuordnung & VLAN-Trunking</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Alle virtuellen Netzwerkkarten werden logischen Interfaces zugeordnet. 
                Besonderheit: Alle VLAN-Schnittstellen (Home, IoT, Server) sind Sub-Interfaces von <code>vtnet1 (LAN)</code>. 
                Eine einzige physische Verbindung transportiert den internen Verkehr als <strong>802.1Q</strong> getaggten Trunk.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                 <Photo src={FOTO.abb4} alt="Schnittstellen Zuweisung" caption="Abb. 4: Schnittstellenzuweisungen â€” 6 aktive Interfaces" onClick={zoom(FOTO.abb4)} />
                 <Photo src={FOTO.abb5} alt="Schnittstellen Ãœbersicht" caption="Abb. 5: Schnittstellenübersicht â€” IP, VLAN-Tag, Gateway & Routen" onClick={zoom(FOTO.abb5)} />
              </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interfacesData.map((inf, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <inf.icon className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white mb-1">{inf.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono leading-relaxed">{inf.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 6 & 7: Admin & Routing */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Step 4: Verwaltung & Härtung</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Die Web-GUI von OPNsense wurde primär für Sicherheit konfiguriert.
                </p>
                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden mb-6">
                  {adminSettings.map((s, i) => (
                    <div key={i} className="flex border-b border-slate-800/50 last:border-0 p-3">
                      <div className="w-1/3 font-medium text-orange-400 text-xs shrink-0">{s.k}</div>
                      <div className="text-xs text-slate-300">{s.v}</div>
                    </div>
                  ))}
                </div>
                <Photo src={FOTO.abb6} alt="Verwaltung" caption="Abb. 6: Verwaltungseinstellungen â€” HTTPS, Port 8443, SSH deakt." onClick={zoom(FOTO.abb6)} />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Step 5: Routing-Status</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Die Routing-Tabelle bestätigt alle aktiven IPv4- & IPv6-Routen.
                  Default Route zeigt auf das ISP-Gateway `46.223.24.1`.
                </p>
                <Photo src={FOTO.abb7} alt="Routing" caption="Abb. 7: Routing-Tabelle â€” Alle Netzsegmente sind erreichbar" onClick={zoom(FOTO.abb7)} />
              </div>
            </div>
            
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• 7. KEY DECISIONS & 8. TUNING â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
           <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-orange-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Engineering Decisions</h2>
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
                <h2 className="text-3xl font-bold text-white">Performance Tuning</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { k: "Hardware Offloading Off", v: "CRC, TSO und LRO in virtualisierten Umgebungen deaktiviert, um Paketkorruption zu vermeiden." },
                  { k: "VirtIO Multiqueue", v: "Beide NICs nutzen 4 Queues zur Parallelisierung auf alle CPU-Cores." },
                  { k: "TRIM/Discard aktiv", v: "SSD-Emulation & TRIM für effizientes LVM Storage-Management." },
                  { k: "Ballooning = 0", v: "Ressourcengarantie verhindert Engpässe." },
                  { k: "DNS-Rebind-Schutz", v: "Verhindert Missbrauch der Web-GUI über alternative DNS." },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
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
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-orange-500 font-mono text-xl">06</span>
                  <h2 className="text-3xl font-bold text-white">Validation</h2>
                </div>
                <div className="space-y-2">
                  {[
                    "OPNsense VM läuft stabil (> 3 Tage Uptime)",
                    "WAN bezieht öffentliche IP per DHCP",
                    "LAN-Interface (192.168.99.1) korrekt zugewiesen",
                    "Alle 6 Schnittstellen sind grün/aktiv",
                    "Web-GUI erreichbar über HTTPS auf Port 8443",
                    "Default-Route zeigt auf das ISP-Gateway",
                    "VLAN-Routen korrekt in der Tabelle eingetragen",
                  ].map((val, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md bg-slate-900 border border-slate-800">
                      <span className="text-xs text-slate-300 font-mono">{val}</span>
                      <span className="text-xs font-bold text-green-500">âœ… PASS</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-amber-500 font-mono text-xl">07</span>
                  <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { issue: "Fehlende net1-Netzwerkkarte", fix: "Eine ursprünglich geplante 3. NIC wurde entfernt, weshalb die Proxmox-Hardware direkt von net0 auf net2 springt. Funktional irrelevant." },
                    { issue: "Qemu Guest Agent inaktiv", fix: "FreeBSD/OPNsense unterstützt den Agent nicht standardmäÃŸig. Status-Informationen werden stattdessen aus der OPNsense GUI bezogen." },
                    { issue: "Proxmox RAM Anzeige 99%", fix: "Da Ballooning=0 gesetzt ist, reserviert der Host sofort 100%. Die tatsächliche OPNsense-Verwendung liegt bei ~15%." },
                  ].map((ts, i) => (
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
        </section>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NAVIGATION / FOOTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10 text-slate-400 text-sm max-w-2xl mx-auto">
            Die Firewall Appliance ist nun als Network Virtual Appliance (NVA) optimiert.
            Die Schnittstellen und das VLAN-Trunking sind aktiv.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            
            <Link
              to="/projekt/security/opnsense/part-1"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Part 1 â€” Netzwerk & Virtualisierung</p>
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
              to="/projekt/security/opnsense/part-3"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/3 border border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Weiter zu</p>
              <p className="text-sm font-bold text-white">Part 3 â€” VLAN-Segmentierung & Firewall-Regeln</p>
              <ArrowRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsensePart2;
