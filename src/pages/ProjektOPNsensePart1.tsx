import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";

const FOTO = {
  cover: "/Opnsense/Foto's/Part 1 deckel FOTO.png",
  n150: "/Opnsense/Foto's/N150 intel Mini pc Hyper Visor Proxmox Firewall Router.png",
  switch: "/Opnsense/Foto's/Ubuquit Switch.png",
  ap: "/Opnsense/Foto's/Ubuquiti AccessPoint.png",
  nuc: "/Opnsense/Foto's/NUC Managment Mini PC.png",
  topology: "/Opnsense/Foto's/Unifi Controller Topology.png",
  proxmoxOverview: "/Opnsense/Foto's/Proxmox Host pve Übersicht.png",
  proxmoxNetwork: "/Opnsense/Foto's/Proxmox Host pve Netzwerk Adapter.png",
  vmOpnsense: "/Opnsense/Foto's/Proxmox Opnsense Vm Übersicht.png",
  vmUnifi: "/Opnsense/Foto's/Proxmox Unifi COntroller VM Übersicht.png",
  vmTest: "/Opnsense/Foto's/Proxmox VLAN Test VM Übersicht.png",
  vmHardware: "/Opnsense/Foto's/Proxmox Opnsense VM Hardware.png",
  pi5: "/Opnsense/Foto's/Raspberry Pi 5 Pironman Max.jpg",
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "environment", label: "Environment" },
  { id: "components", label: "Components" },
  { id: "architecture", label: "Architecture" },
  { id: "implementation", label: "Implementation" },
  { id: "decisions", label: "Decisions" },
  { id: "validation", label: "Validation" },
  { id: "talking-points", label: "Talking Points" },
];

const envData = [
  { k: "Hypervisor-Host", v: "Intel N150 Mini PC, 4× GbE NIC, 16 GB RAM, SSD" },
  { k: "Firewall-Appliance", v: "OPNsense (als VM auf Proxmox, VM-ID 100)" },
  { k: "Core-Switch", v: "UniFi Switch Ultra, 8 Port, PoE+, Layer-2-managed" },
  { k: "Access Point", v: "Ubiquiti U6+, WiFi 6, Dual-Band 2×2" },
  { k: "Server Node", v: "Raspberry Pi 5, 16 GB RAM, SSD, Docker-basiert" },
  { k: "Bastion / OOB-Host", v: "Intel NUC Mini PC, LAN-Netz (192.168.99.x)" },
  { k: "ISP-Router", v: "Vodafone Modem im Bridge-Modus" },
  { k: "Netzwerksegmente", v: "LAN: 192.168.99.0/24, VLAN 20/30/40" },
  { k: "Virtualisierung", v: "Proxmox VE 9.1.1, Standalone-Betrieb" },
];

const components = [
  { no: "01", title: "Intel N150 — Hypervisor", src: FOTO.n150, caption: "FIG. 02 — Intel N150 Mini-PC, lüfterlos, vier dedizierte Gigabit-NICs.", text: "Mit seinem lüfterlosen Gehäuse und vier dedizierten Gigabit-Netzwerkkarten ist dieser Host ideal für OPNsense. Physische Trennung von WAN, LAN und VLAN-Trunk erfolgt direkt auf Modul-Ebene." },
  { no: "02", title: "UniFi Switch Ultra", src: FOTO.switch, caption: "FIG. 03 — UniFi Switch Ultra, 8 Port PoE+, Layer-2-managed.", text: "Zentraler PoE+ Switch, verwaltet den VLAN-getaggten Verkehr zu Endgeräten, Server-Nodes und IoT-Komponenten." },
  { no: "03", title: "Ubiquiti U6+ Access Point", src: FOTO.ap, caption: "FIG. 04 — Ubiquiti U6+, WiFi 6, Dual-Band, PoE-betrieben.", text: "Strahlungsarme, performante WiFi-6 Abdeckung, via Controller ins Segmentierungskonzept integriert (SSID-VLAN Mapping)." },
  { no: "04", title: "Raspberry Pi 5 — Server Node", src: FOTO.pi5, caption: "FIG. 05 — Raspberry Pi 5 im Pironman-Max-Gehäuse, Docker-basiert.", text: "Zentraler Server Node im Netzwerk. Betreibt Docker-basierte Dienste (wie Uptime Kuma) und ist fest in die VLAN-Topologie eingebunden." },
  { no: "05", title: "Intel NUC — Bastion", src: FOTO.nuc, caption: "FIG. 06 — Intel NUC Mini-PC, isolierter Bastion-Host für OOB-Management.", text: "Isolierter OOB-Host. Übernimmt Dashboard- und Monitoring-Aufgaben und gewährt Notfallzugriff bei Ausfall des Hypervisors." },
];

const bridgeData = [
  { k: "vmbr0", v: "nic0 — WAN-Bridge, Verbindung zum ISP-Modem" },
  { k: "vmbr1", v: "nic1 — LAN-Bridge (derzeit nicht aktiv genutzt)" },
  { k: "vmbr2", v: "nic2 — Reserve-Bridge (keine IP, kein VLAN-Aware)" },
  { k: "vmbr3", v: "nic3 — LAN/Trunk-Bridge, VLAN-Aware, IP 192.168.99.100/24, Gateway 192.168.99.1" },
];

const vmData = [
  { title: "VM 100 — OPNsense", text: "Zentrale Firewall und Router; verarbeitet sämtlichen Netzwerkverkehr, VLANs 20/30/40, WireGuard VPN, Suricata IDS, Unbound DNS und Nginx Reverse Proxy." },
  { title: "CT 101 — UniFi-Controller", text: "Debian-basierter LXC-Container zur zentralen Verwaltung des UniFi Switch Ultra und des U6+ Access Points; IP 192.168.99.10." },
  { title: "CT 102 — VLAN-Test", text: "Alpine-basierter LXC-Container für Netzwerk-Validierungstests (Ping, Traceroute, VLAN-Isolationsprüfungen); IP 192.168.99.186." },
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

const decisions = [
  { title: "Proxmox statt ESXi", reason: "Open-Source, KVM/QEMU-basiert, native LXC-Unterstützung, kein Lizenzmodell, VLAN-aware Bridges nativ verfügbar." },
  { title: "Standalone statt Cluster", reason: "Einzelner physischer Host vorhanden; Cluster-Overhead unnötig für Homelab-Szenario." },
  { title: "4 separate Bridges", reason: "Jeder NIC erhält seinen eigenen Bridge, um Verkehrsdomänen physisch zu isolieren und eine klare Zuordnung zu gewährleisten." },
  { title: "vmbr3 als VLAN-Trunk", reason: "Zentraler Bridge für internen Verkehr; VLAN-Aware ermöglicht getaggten Transport in einer einzigen Leitung." },
  { title: "trunks=20;30;40 auf VM-NIC", reason: "Proxmox-seitige VLAN-Restriktion verhindert, dass OPNsense unerwartete VLAN-Tags injiziert oder empfängt." },
  { title: "NUC als separater Bastion-Host", reason: "Out-of-Band-Zugriff: Selbst bei Ausfall von Proxmox oder OPNsense bleibt Überwachung und SSH-Zugang verfügbar." },
];

const tuning = [
  { k: "ASPM-Optimierung", v: "Energieverwaltung der PCIe-Geräte via GRUB stabilisiert." },
  { k: "VT-x / IOMMU", v: "Im BIOS aktiviert für Host-CPU-Passthrough Funktionalität." },
  { k: "VLAN-Restriktion", v: "trunks=20;30;40 auf net2 erzwingt Proxmox-seitige Paketfilterung." },
  { k: "RAM Ballooning=0", v: "Feste 8 GB RAM für OPNsense zur Vermeidung von Kernel-Panics." },
  { k: "LXC Unprivileged", v: "Container laufen ohne Root-Rechte zur Ausbruchsminderung." },
];

const validation = [
  "Proxmox Host bootet im EFI-Modus",
  "Alle 4 GbE NICs erkannt und aktiv",
  "Bridge vmbr3 ist VLAN-Aware markiert",
  "OPNsense VM läuft stabil (> 4 Tage Uptime)",
  "UniFi-CT aktiv & Controller erreichbar",
  "Trunks (20;30;40) auf VM-Interface durchgesetzt",
];

const troubleshooting = [
  { issue: "Proxmox Repo Warnung", fix: "Kostenloses 'No-Subscription'-Repo aktiviert (Homelab Standard)." },
  { issue: "Unklare NIC-Zuordnung", fix: "Generische Namen (enx00…) durch schrittweises physisches Einstecken ermittelt (Cable-Tracer Methode)." },
  { issue: "ASPM Kernel Logs", fix: "PCIe-Energie-Fehler traten auf. Fix: 'quiet hw.pci.enable_aspm=0' in GRUB." },
  { issue: "vmbr2 ungenutzt", fix: "Ist als Reserve vorkonfiguriert, beeinträchtigt die Hostleistung nicht." },
];

const talkingPoints = [
  { title: "Hardware-Wahl", text: "Ich habe einen Intel N150 Mini-PC mit vier dedizierten Gigabit-NICs als Proxmox-Hypervisor gewählt. Vier physische NICs erlauben mir, WAN, LAN und VLAN-Trunk wirklich physisch zu trennen — nicht nur logisch." },
  { title: "Hypervisor-Wahl", text: "Proxmox statt ESXi, weil es Open-Source ist, native LXC-Container unterstützt und VLAN-aware Bridges direkt mitliefert. Für ein Homelab kein Lizenz-Overhead, aber für Enterprise produktionstauglich." },
  { title: "Bridge-Design", text: "Jeder physische Port hat seine eigene Linux-Bridge — vmbr0 bis vmbr3. Das gibt mir saubere Verkehrsdomänen-Trennung. vmbr3 ist als VLAN-Aware konfiguriert; das ist der Trunk-Punkt für die internen VLANs 20, 30 und 40." },
  { title: "VM-Härtung", text: "Die OPNsense-VM hat dediziertes 8 GB RAM mit deaktiviertem Ballooning, q35-Maschinentyp mit OVMF-UEFI, und CPU-Typ host für AES-NI-Passthrough — kritisch für VPN- und IDS-Performance später." },
  { title: "Defense-in-Depth", text: "Auf Proxmox-Ebene habe ich trunks=20;30;40 an der VM-NIC gesetzt — eine zweite Verteidigungslinie, falls OPNsense kompromittiert wäre. Der Hypervisor lässt nur diese drei VLAN-Tags durch." },
  { title: "OOB-Management", text: "Der NUC ist bewusst getrennt vom Hypervisor — das ist mein Bastion-Host. Wenn Proxmox oder OPNsense ausfällt, kann ich immer noch ins Management-Netz und das System retten." },
];

const Figure = ({ src, alt, caption, onClick, className = "", isShowcase = false }: { src: string; alt: string; caption?: string; onClick?: () => void; className?: string; isShowcase?: boolean; }) => (
  <figure className={className}>
    <div onClick={onClick} className={`group relative cursor-zoom-in overflow-hidden ${
      isShowcase 
        ? "bg-white rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-stone-200 p-8 flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.06)]" 
        : "border border-stone-600/60 bg-stone-800"
    }`}>
      <img src={src} alt={alt} className={`w-full h-auto block ${isShowcase ? "mix-blend-multiply object-contain scale-95 group-hover:scale-100 transition-transform duration-500" : ""}`} loading="lazy" />
      <div className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md rounded-full p-2 ${isShowcase ? "bg-stone-50/80 border border-stone-300 shadow-sm" : "bg-stone-800/70 border border-stone-600"}`}>
        <Maximize2 className={`w-3 h-3 ${isShowcase ? "text-stone-700" : "text-stone-200"}`} />
      </div>
    </div>
    {caption && <figcaption className="mt-3 font-serif italic text-stone-500 text-xs md:text-sm leading-snug">{caption}</figcaption>}
  </figure>
);

const ProjektOPNsensePart1 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_1_Netzwerk_Aufbau_Virtualisierung.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 01 — Netzwerk-Aufbau & Virtualisierung | Enterprise Security Lab</title>
        <meta name="description" content="Part 1: Hardware, Proxmox-Hypervisor und Bridge-Design als Fundament des Enterprise Security Labs." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-cyan-400/20 selection:text-cyan-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-300 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 01</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-300 font-mono mb-10">
              <span className="text-cyan-400">Part 01 / 06</span>
              <span className="h-px w-12 bg-stone-800" />
              <span>Hardware · Hypervisor · Bridge-Design</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              Netzwerk-Aufbau<br />
              &amp; <span className="italic font-light text-cyan-400">Virtualisierung</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              Das physische Fundament der Sicherheitsarchitektur — vom Mini-PC und vier Netzwerkkarten bis zur VLAN-fähigen Linux-Bridge.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Etappe</div>
                  <div className="text-stone-200 text-sm">01 / 06</div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Layer</div>
                  <div className="text-stone-200 text-sm">L1 · L2</div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Reading</div>
                  <div className="text-stone-200 text-sm">~ 8 min</div>
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div>
                  <div className="text-cyan-400 text-sm">Validiert</div>
                </div>
              </div>
              <a href={docUrl} download className="group inline-flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-900 bg-stone-200 hover:bg-white font-mono px-5 py-3 transition-all">
                <span>Originaldokument · DOCX</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </header>

        <nav className="sticky top-20 z-30 bg-stone-800/85 backdrop-blur-xl border-y border-stone-600/80">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6 overflow-x-auto no-scrollbar">
            <span className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono shrink-0 hidden md:inline">Auf dieser Seite</span>
            <ol className="flex items-center gap-1 md:gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[13px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-cyan-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-cyan-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.cover)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.cover} alt="Part 1" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-800/70 backdrop-blur-md border border-stone-600 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            Architekturüberblick — Konvergenz von physischer Hardware und virtueller Infrastruktur auf einem einzigen Hypervisor.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">01 · Scope</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              Vom Kabel zum <span className="italic text-cyan-400 font-light">Hypervisor</span>.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-cyan-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m ersten Teil dieses Labs etablieren wir das physische und virtuelle Fundament der Sicherheitsarchitektur. Wir konfigurieren die dedizierte Netzwerkhardware, setzen Proxmox als Hypervisor auf und implementieren ein stringentes Bridge-Design zur sauberen Trennung von Netzwerksegmenten.
            </p>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 border-t border-stone-600/80 pt-10">
              {[
                { k: "Zentralisierung", v: "Alle Netz-Dienste konsolidiert auf einem Hypervisor." },
                { k: "Segmentierung", v: "Sichere Trennung durch getrennte Linux-Bridges und VLAN-Awareness." },
                { k: "OOB-Management", v: "Separater NUC-Host, der greift, falls Proxmox ausfällt." },
              ].map((g, i) => (
                <div key={i}>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3">Design Goal {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-serif text-stone-50 text-lg mb-2">{g.k}</div>
                  <p className="text-stone-400 text-sm leading-relaxed">{g.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="environment" className="px-6 py-24 md:py-32 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">02 · Environment</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Der <span className="italic text-cyan-400 font-light">Spec-Sheet</span>.
                </h2>
                <p className="text-stone-500 text-sm mt-6 leading-relaxed font-light">Hardware, Topologie und Versionsstand des Labs auf einen Blick.</p>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/80">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[13px] tracking-[0.2em] uppercase text-cyan-400/70 font-mono pt-0.5">{row.k}</dt>
                      <dd className="col-span-2 text-stone-300 text-sm md:text-base font-light leading-snug">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="components" className="px-6 py-28 md:py-36 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
              <div>
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-4">03 · Components</div>
                <h2 className="font-serif text-stone-50 text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
                  Fünf <span className="italic text-cyan-400 font-light">Bausteine</span>.
                </h2>
              </div>
              <p className="text-stone-500 text-sm md:text-base max-w-sm font-light leading-relaxed">Jede Komponente erfüllt eine eindeutige Rolle im Defense-in-Depth-Stack.</p>
            </div>
            <div className="space-y-24 md:space-y-32">
              {components.map((c, i) => {
                const reverse = i % 2 === 1;
                return (
                  <div key={c.no} className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                    <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
                      <Figure src={c.src} alt={c.title} caption={c.caption} onClick={zoom(c.src)} isShowcase={true} />
                    </div>
                    <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
                      <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3 tabular-nums">№ {c.no}</div>
                      <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">{c.title}</h3>
                      <p className="text-stone-400 text-base leading-relaxed font-light">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="architecture" className="px-6 py-28 md:py-36 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">04 · Architecture Logic</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-16 max-w-3xl">
              Drei <span className="italic text-cyan-400 font-light">Schichten</span>, ein <span className="italic text-cyan-400 font-light">Torwächter</span>.
            </h2>
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-5 space-y-6 text-stone-400 text-base md:text-lg leading-[1.85] font-light">
                <p>
                  Das Design gliedert sich in <em className="not-italic text-stone-200">physische Schicht</em>, <em className="not-italic text-stone-200">Virtualisierungsschicht</em> und <em className="not-italic text-stone-200">logische Netzwerkschicht</em>. Das Modem liefert WAN an Port 1 (nic0). Port 3 (nic3) führt als VLAN-Trunk zum UniFi Switch.
                </p>
                <p>
                  <em className="not-italic text-stone-200">Datenfluss:</em> OPNsense agiert als Torwächter. Nach NAT/Firewallung geht der interne Verkehr über die VLAN-fähige Bridge <code className="text-cyan-300/90 font-mono text-[0.92em]">vmbr3</code> an den Switch. So erfolgt eine strikte Trennung selbst innerhalb eines physikalischen Kabels — durch 802.1Q Tags.
                </p>
              </div>
              <div className="md:col-span-7">
                <Figure src={FOTO.proxmoxNetwork} alt="Bridge Architektur" caption="FIG. 07 — Architektur-Logik: Übersetzung der nic-Ports zu vmbr-Bridges." onClick={zoom(FOTO.proxmoxNetwork)} />
              </div>
            </div>
          </div>
        </section>

        <section id="implementation" className="px-6 py-28 md:py-36 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">05 · Implementation</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-20 max-w-3xl">
              Vier <span className="italic text-cyan-400 font-light">Schritte</span>, vom Bare-Metal zum Trunk.
            </h2>

            <div className="space-y-28">
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                <div className="md:col-span-7">
                  <Figure src={FOTO.proxmoxOverview} alt="Proxmox Übersicht" caption="FIG. 08 — Proxmox Host pve, Ressourcen und Uptime." onClick={zoom(FOTO.proxmoxOverview)} />
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3 tabular-nums">Step 01</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Proxmox VE Installation</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light">Bare-Metal-Installation auf dem Intel N150. EFI-Boot-Modus mit Linux Kernel 6. Die ASPM PCIe-Energieverwaltung wurde via GRUB optimiert. Die Nodes-Übersicht zeigt stabile Last auch bei mehreren VMs.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                <div className="md:col-span-5 md:order-1 order-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3 tabular-nums">Step 02</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Bridge-Design (Network)</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Jeder physische Port wird auf eine eigene Linux-Bridge durchgeschleift. Der zentrale Knoten ist <code className="text-cyan-300/90 font-mono text-[0.92em]">vmbr3</code> — hier liegen die Management-IP (192.168.99.100) und das VLAN-Trunking ist aktiviert.
                  </p>
                  <dl className="border-t border-stone-600/80">
                    {bridgeData.map((b, i) => (
                      <div key={i} className="grid grid-cols-4 gap-3 py-2.5 border-b border-stone-600/60">
                        <dt className="text-[13px] tracking-widest text-cyan-400/70 font-mono pt-0.5">{b.k}</dt>
                        <dd className="col-span-3 text-stone-400 text-xs md:text-sm font-light leading-snug">{b.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="md:col-span-7 md:order-2 order-1">
                  <Figure src={FOTO.proxmoxNetwork} alt="Proxmox Network" caption="FIG. 09 — Proxmox Netzwerkkonfiguration, vier Linux-Bridges." onClick={zoom(FOTO.proxmoxNetwork)} />
                </div>
              </div>

              <div>
                <div className="mb-10">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3 tabular-nums">Step 03</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-3">Virtuelle Maschinen &amp; Container</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light max-w-3xl">Eine VM für die Firewall, zwei LXC-Container für Verwaltung und Tests — minimaler Overhead, klare Verantwortungen.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Figure src={FOTO.vmOpnsense} alt="OPNsense VM" caption="FIG. 10 — OPNsense VM 100." onClick={zoom(FOTO.vmOpnsense)} />
                  <Figure src={FOTO.vmUnifi} alt="UniFi CT" caption="FIG. 11 — UniFi-Controller CT 101." onClick={zoom(FOTO.vmUnifi)} />
                  <Figure src={FOTO.vmTest} alt="VLAN Test CT" caption="FIG. 12 — VLAN-Test CT 102." onClick={zoom(FOTO.vmTest)} />
                </div>
                <div className="grid md:grid-cols-3 gap-x-10 gap-y-6 border-t border-stone-600/80 pt-8">
                  {vmData.map((v, i) => (
                    <div key={i}>
                      <div className="text-[13px] tracking-[0.2em] uppercase text-cyan-400/70 font-mono mb-2">{v.title}</div>
                      <p className="text-stone-400 text-sm leading-relaxed font-light">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                <div className="md:col-span-7">
                  <Figure src={FOTO.vmHardware} alt="VM Hardware" caption="FIG. 13 — OPNsense VM Hardware: q35, OVMF UEFI, VirtIO Multiqueue." onClick={zoom(FOTO.vmHardware)} />
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-cyan-400/70 font-mono mb-3 tabular-nums">Step 04</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">OPNsense VM Hardware-Härtung</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">Die Zuweisung der Hardware für die Firewall ist kritisch. Q35-Maschinentyp, OVMF UEFI und VirtIO für optimale Netzwerkdurchsätze.</p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-stone-600/80 pt-4">
                    {hwData.map((h, i) => (
                      <div key={i} className="border-b border-stone-600/60 pb-3">
                        <dt className="text-[11px] tracking-[0.2em] uppercase text-cyan-400/70 font-mono mb-1.5">{h.k}</dt>
                        <dd className="text-stone-300 text-xs font-mono leading-snug">{h.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="decisions" className="px-6 py-28 md:py-36 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">06 · Engineering Decisions</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Sechs <span className="italic text-cyan-400 font-light">bewusste Wahlen</span>.
                </h2>
                <p className="text-stone-500 text-sm mt-6 leading-relaxed font-light">Jede Entscheidung mit klarer Begründung — keine Default-Settings.</p>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-cyan-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
                      <div className="col-span-11">
                        <h3 className="font-serif text-stone-50 text-lg md:text-xl leading-tight mb-2">{d.title}</h3>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{d.reason}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-24 grid md:grid-cols-12 gap-y-10 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">Tuning &amp; Hardening</div>
                <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.1] tracking-[-0.02em]">
                  Fünf <span className="italic text-cyan-400 font-light">Stellschrauben</span>.
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {tuning.map((t, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-4 flex items-start gap-5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400/70 mt-1 shrink-0" />
                      <div>
                        <div className="text-stone-100 text-sm md:text-base font-medium leading-snug mb-1">{t.k}</div>
                        <div className="text-stone-400 text-xs md:text-sm font-light leading-snug">{t.v}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="validation" className="px-6 py-28 md:py-36 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-16 gap-x-12">
              <div className="md:col-span-6">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">07 · Validation</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Was nachweislich <span className="italic text-cyan-400 font-light">funktioniert</span>.
                </h2>
                <ol className="border-t border-stone-600/80">
                  {validation.map((v, i) => (
                    <li key={i} className="grid grid-cols-12 gap-4 py-4 border-b border-stone-600/60 items-baseline">
                      <span className="col-span-1 font-mono text-cyan-400/70 text-[13px] tabular-nums tracking-widest pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="col-span-10 text-stone-300 text-sm md:text-base leading-snug font-light">{v}</span>
                      <span className="col-span-1 text-right text-cyan-400 text-[13px] uppercase tracking-widest font-mono">Pass</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="md:col-span-6">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">Troubleshooting</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Was <span className="italic text-amber-400 font-light">schiefging</span> — und wie behoben.
                </h2>
                <ul className="space-y-5">
                  {troubleshooting.map((t, i) => (
                    <li key={i} className="border-l-2 border-amber-500/40 pl-5 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
                        <span className="text-amber-400 text-[13px] uppercase tracking-[0.2em] font-mono">{t.issue}</span>
                      </div>
                      <p className="text-stone-300 text-sm md:text-base leading-snug font-light">{t.fix}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="talking-points" className="px-6 py-28 md:py-36 border-t border-stone-600/80 bg-gradient-to-b from-stone-950 via-stone-950 to-cyan-950/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12 mb-16">
              <div className="md:col-span-5">
                <div className="text-[13px] tracking-[0.3em] uppercase text-cyan-400/80 font-mono mb-5">08 · Bewerbungsgespräch</div>
                <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  Wie ich diesen <span className="italic text-cyan-400 font-light">Part</span> erkläre.
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-stone-400 text-base md:text-lg leading-relaxed font-light">
                  Sechs vorformulierte Sätze auf Deutsch — direkt aus dem Maschinenraum. Im Gespräch kannst du davon ablesen oder als Stichwort-Gerüst verwenden. Jeder Satz beantwortet eine typische Rückfrage.
                </p>
              </div>
            </div>
            <ol className="border-t border-stone-600/80">
              {talkingPoints.map((tp, i) => (
                <li key={i} className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-stone-600/60">
                  <div className="md:col-span-3">
                    <div className="font-serif text-cyan-400/80 text-4xl md:text-5xl tabular-nums leading-none mb-2">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-[13px] tracking-[0.2em] uppercase text-stone-300 font-mono">{tp.title}</div>
                  </div>
                  <blockquote className="md:col-span-9 font-serif italic text-stone-100 text-xl md:text-2xl leading-[1.45]">&ldquo;{tp.text}&rdquo;</blockquote>
                </li>
              ))}
            </ol>
            <p className="mt-12 text-stone-500 text-xs md:text-sm font-light max-w-3xl leading-relaxed">
              Tipp: Lies vorher die <em className="not-italic text-stone-300">Engineering Decisions</em> · Abschnitt 06 noch einmal durch — die Sätze hier verweisen direkt auf diese Begründungen.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Zurück zur Projektübersicht
            </Link>
            <Link to="/projekt/security/opnsense/part-2" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Weiter mit</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 02 · <span className="italic text-cyan-400 font-light">Firewall-Installation</span>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-600 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-stone-900 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart1;