import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";

const FOTO = {
  cover: "/Opnsense/Foto's/Part 2 deckel FOTO.png",
  hardware: "/Opnsense/Foto's/Proxmox Opnsense VM Hardware.png",
  dashboard: "/Opnsense/Foto's/Opnsense Lobby Dashboard.png",
  schnittstellen: "/Opnsense/Foto's/Opnsense Schnittstellen Zuweisungen.png",
  schnittstellenUebersicht: "/Opnsense/Foto's/Opnsense Schnittstellen Übersicht.png",
  verwaltung: "/Opnsense/Foto's/Opnsense System Einstellungen Verwqaltung.png",
  routen: "/Opnsense/Foto's/Opnsense  System Routen Status.png",
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "environment", label: "Environment" },
  { id: "hardware", label: "Hardware" },
  { id: "interfaces", label: "Interfaces" },
  { id: "hardening", label: "Hardening" },
  { id: "decisions", label: "Decisions" },
  { id: "validation", label: "Validation" },
  { id: "talking-points", label: "Talking Points" },
];

const envData = [
  { k: "Hypervisor", v: "Proxmox VE 9.1.1, Standalone-Node (pve)" },
  { k: "WAN-Bridge", v: "vmbr0 — Verbindung zum ISP-Modem (Bridge-Modus)" },
  { k: "LAN/Trunk-Bridge", v: "vmbr3 — VLAN-Aware, IP 192.168.99.100/24" },
  { k: "OPNsense ISO", v: "OPNsense 26.1.5 (amd64), FreeBSD 14.3-RELEASE-p9" },
  { k: "VM-ID", v: "100" },
  { k: "WAN-IP", v: "DHCP vom ISP (aktuell: 46.223.25.129/22)" },
  { k: "LAN-IP / Management", v: "192.168.99.1/24 (statisch auf vtnet1)" },
];

const interfacesData = [
  { name: "[LAN] (lan)", value: "vtnet1 (bc:24…c5) — statisch, 192.168.99.1/24" },
  { name: "[LgBeta_Home] (opt2)", value: "vlan020 (Übergeordnet vtnet1, Tag 20) — 192.168.20.1/24" },
  { name: "[LgBeta_IoT] (opt1)", value: "vlan030 (Übergeordnet vtnet1, Tag 30) — 192.168.30.1/24" },
  { name: "[LgBeta_Server] (opt4)", value: "vlan040 (Übergeordnet vtnet1, Tag 40) — 192.168.40.1/24" },
  { name: "[WAN] (wan)", value: "vtnet0 (bc:24…bb) — DHCP, 46.223.25.129/22" },
  { name: "[WireGuard_VPN]", value: "wg0 (WireGuard_Server) — 10.10.10.1/24" },
];

const adminSettings = [
  { k: "Protokoll", v: "HTTPS (HTTP deaktiviert)" },
  { k: "SSL-Zertifikat", v: "Web GUI TLS certificate (self-signed)" },
  { k: "TCP-Port", v: "8443 (vom Standard 443 geändert)" },
  { k: "HTTP-Umleitung", v: "Aktiviert (HTTP → HTTPS)" },
  { k: "Alternative Hostnamen", v: "opnsense.home.internal (für DNS-Rebind)" },
  { k: "Sitzungszeitlimit", v: "240 Minuten" },
  { k: "SSH-Server", v: "Deaktiviert (Härtung)" },
];

const hwParams = [
  { k: "Maschinentyp", v: "q35 (Moderner Chipsatz, PCIe)" },
  { k: "BIOS", v: "OVMF (UEFI)" },
  { k: "Storage", v: "VirtIO SCSI, 32 GB local-lvm, ssd=1, discard=on" },
  { k: "CPU", v: "4 Cores, Typ host (AES-NI Passthrough)" },
  { k: "RAM", v: "8.00 GiB, balloon=0" },
  { k: "NIC net0", v: "VirtIO, vmbr0, queues=4" },
  { k: "NIC net2", v: "VirtIO, vmbr3, queues=4, trunks=20;30;40" },
];

const decisions = [
  { title: "OPNsense statt pfSense", reason: "Modernere Codebasis, regelmäßige Updates, native Plugins (Nginx, WireGuard), intuitives Web-GUI. Ideal als FreeBSD-Fork." },
  { title: "Virtuell statt Bare-Metal", reason: "Snapshots & Backups, Koexistenz mit Controller/Testumgebung auf demselben Host, schnellere Recovery." },
  { title: "Zwei NICs statt drei", reason: "LAN und MGMT laufen über eine einzige Trunk-NIC (vtnet1), was die Komplexität senkt." },
  { title: "CPU-Typ host", reason: "Host-Passthrough aktiviert AES-NI für VPN (WireGuard) und IDS/IPS (Suricata) Analyse." },
  { title: "Ballooning deaktiviert", reason: "Firewall darf keinen schwankenden Speicher haben. Feste 8 GB verhindern Kernel-Panics." },
  { title: "Port 8443, kein SSH", reason: "Port 443 bleibt frei für Nginx. SSH ist deaktiviert, um die Angriffsfläche zu minimieren." },
];

const tuning = [
  { k: "Hardware Offloading Off", v: "CRC, TSO und LRO in virtualisierten Umgebungen deaktiviert, um Paketkorruption zu vermeiden." },
  { k: "VirtIO Multiqueue", v: "Beide NICs nutzen 4 Queues zur Parallelisierung auf alle CPU-Cores." },
  { k: "TRIM/Discard aktiv", v: "SSD-Emulation & TRIM für effizientes LVM Storage-Management." },
  { k: "Ballooning = 0", v: "Ressourcengarantie verhindert Engpässe." },
  { k: "DNS-Rebind-Schutz", v: "Verhindert Missbrauch der Web-GUI über alternative DNS-Einträge." },
];

const validation = [
  "OPNsense VM läuft stabil (> 3 Tage Uptime)",
  "WAN bezieht öffentliche IP per DHCP",
  "LAN-Interface (192.168.99.1) korrekt zugewiesen",
  "Alle 6 Schnittstellen sind grün/aktiv",
  "Web-GUI erreichbar über HTTPS auf Port 8443",
  "Default-Route zeigt auf das ISP-Gateway",
  "VLAN-Routen korrekt in der Tabelle eingetragen",
];

const troubleshooting = [
  { issue: "Fehlende net1-Netzwerkkarte", fix: "Eine ursprünglich geplante 3. NIC wurde entfernt, weshalb die Proxmox-Hardware direkt von net0 auf net2 springt. Funktional irrelevant." },
  { issue: "Qemu Guest Agent inaktiv", fix: "FreeBSD/OPNsense unterstützt den Agent nicht standardmäßig. Status-Informationen werden stattdessen aus der OPNsense-GUI bezogen." },
  { issue: "Proxmox RAM-Anzeige 99%", fix: "Da Ballooning=0 gesetzt ist, reserviert der Host sofort 100%. Die tatsächliche OPNsense-Verwendung liegt bei ~15%." },
];

const talkingPoints = [
  { title: "OPNsense vs pfSense", text: "Ich habe OPNsense statt pfSense gewählt — modernere Codebasis, regelmäßige Updates, native Plugins für Nginx und WireGuard. Beide sind FreeBSD-Forks; OPNsense fühlt sich für mich aktueller an." },
  { title: "Virtuelle Appliance", text: "Statt Bare-Metal läuft die Firewall als VM auf Proxmox. Das gibt mir Snapshots, Backups und die Möglichkeit, parallel Test-VMs auf demselben Host zu betreiben — ohne Sicherheitsverlust, weil die NICs physisch getrennt sind." },
  { title: "AES-NI Passthrough", text: "Die VM nutzt CPU-Typ host, damit AES-NI direkt durchgereicht wird. Das ist später kritisch für WireGuard-VPN und Suricata IDS — ohne Hardware-Beschleunigung würden beide spürbar langsamer." },
  { title: "HTTP-Härtung", text: "Web-GUI nur über HTTPS auf Port 8443, HTTP umgeleitet, SSH komplett deaktiviert. Port 443 bleibt frei für den Nginx Reverse Proxy später. Angriffsfläche minimiert." },
  { title: "Schnittstellen-Zuordnung", text: "Eine einzige physische NIC trägt LAN plus drei VLAN-Sub-Interfaces (Home, IoT, Server) als 802.1Q getaggter Trunk. Saubere Trennung in Software, eine einzige Leitung in Hardware." },
  { title: "DNS-Rebind-Schutz", text: "Alternative Hostnamen wie opnsense.home.internal sind eingetragen. Damit kann die Web-GUI nicht über DNS-Rebind-Angriffe missbraucht werden, falls jemand einen DNS-Eintrag manipuliert." },
];

const Figure = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick?: () => void; className?: string; }) => (
  <figure className={className}>
    <div onClick={onClick} className="group relative cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2">
        <Maximize2 className="w-3 h-3 text-stone-200" />
      </div>
    </div>
    {caption && <figcaption className="mt-3 font-serif italic text-stone-500 text-xs md:text-sm leading-snug">{caption}</figcaption>}
  </figure>
);

const ProjektOPNsensePart2 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_2_Firewall_Installation_Optimierung.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 02 — Firewall-Installation & Optimierung | Enterprise Security Lab</title>
        <meta name="description" content="Part 2: Installation und Optimierung der OPNsense als Network Virtual Appliance." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-orange-400/20 selection:text-orange-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-500 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 02</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-500 font-mono mb-10">
              <span className="text-orange-400">Part 02 / 06</span>
              <span className="h-px w-12 bg-stone-700" />
              <span>Installation · Hardening · Routing</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              Firewall-Installation<br />
              &amp; <span className="italic font-light text-orange-400">Optimierung</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              OPNsense als Network Virtual Appliance — VirtIO-Multiqueue, AES-NI-Passthrough und ein gehärtetes Web-GUI auf Port 8443.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-2">Etappe</div><div className="text-stone-200 text-sm">02 / 06</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-2">Layer</div><div className="text-stone-200 text-sm">L3 · L4</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-2">Reading</div><div className="text-stone-200 text-sm">~ 7 min</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-2">Status</div><div className="text-orange-400 text-sm">Validiert</div></div>
              </div>
              <a href={docUrl} download className="group inline-flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-900 bg-stone-200 hover:bg-white font-mono px-5 py-3 transition-all">
                <span>Originaldokument · DOCX</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </header>

        <nav className="sticky top-20 z-30 bg-stone-800/85 backdrop-blur-xl border-y border-stone-700/80">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6 overflow-x-auto no-scrollbar">
            <span className="text-[11px] tracking-[0.3em] uppercase text-stone-600 font-mono shrink-0 hidden md:inline">Auf dieser Seite</span>
            <ol className="flex items-center gap-1 md:gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-orange-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-orange-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.cover)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.cover} alt="Part 2" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            OPNsense als Network Virtual Appliance innerhalb der Proxmox-Architektur.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">01 · Scope</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              Eine Firewall, <span className="italic text-orange-400 font-light">virtualisiert</span>.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-orange-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m zweiten Teil widmen wir uns der reibungslosen Bereitstellung von OPNsense als virtuelle Firewall-Appliance (NVA). Ziel dieser Phase ist es, die VM-Parameter in Proxmox zu härten, initiale WAN/LAN-Zuordnungen vorzunehmen und OPNsense als primäres Tor für das gesamte Netzwerk-Gateway zu verankern.
            </p>
            <p className="text-stone-400 leading-[1.85] text-base md:text-lg">
              Sämtlicher Netzwerkverkehr muss diese Instanz passieren, weshalb die virtuellen Interfaces (VirtIO) durch Hardware-Offloading-Deaktivierung und Multiqueue-Settings auf maximale Paketdurchsätze vorbereitet wurden.
            </p>
          </div>
        </section>

        <section id="environment" className="px-6 py-24 md:py-32 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">02 · Environment</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Der <span className="italic text-orange-400 font-light">Spec-Sheet</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-orange-400/70 font-mono pt-0.5">{row.k}</dt>
                      <dd className="col-span-2 text-stone-300 text-sm md:text-base font-light leading-snug">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="hardware" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">03 · VM Hardware Tuning</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-16 max-w-3xl">
              Bewusste Abstimmung für eine <span className="italic text-orange-400 font-light">NVA</span>.
            </h2>

            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              <div className="md:col-span-7">
                <Figure src={FOTO.hardware} alt="VM Hardware" caption="FIG. 02 — OPNsense VM Hardware: q35, OVMF, VirtIO Multiqueue, balloon=0, trunks=20;30;40." onClick={zoom(FOTO.hardware)} />
              </div>
              <div className="md:col-span-5">
                <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                  AES-NI Passthrough für zukünftige VPN- &amp; IDS-Workloads. Paravirtualisierung durch VirtIO. Festes RAM ohne Ballooning, damit die Firewall keine Kernel-Panics durch Speicherentzug erlebt.
                </p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-stone-600/60 pt-4">
                  {hwParams.map((h, i) => (
                    <div key={i} className="border-b border-stone-600/60 pb-3">
                      <dt className="text-[11px] tracking-[0.2em] uppercase text-orange-400/70 font-mono mb-1.5">{h.k}</dt>
                      <dd className="text-stone-300 text-xs font-mono leading-snug">{h.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="interfaces" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">04 · Interfaces &amp; Routing</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-16 max-w-3xl">
              Sechs <span className="italic text-orange-400 font-light">Schnittstellen</span>, ein Trunk.
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-14">
              <Figure src={FOTO.dashboard} alt="Dashboard" caption="FIG. 03 — OPNsense Lobby-Dashboard: System, Schnittstellen, Dienste." onClick={zoom(FOTO.dashboard)} />
              <Figure src={FOTO.schnittstellen} alt="Zuweisungen" caption="FIG. 04 — Schnittstellenzuweisungen: 6 aktive Interfaces auf vtnet0/vtnet1." onClick={zoom(FOTO.schnittstellen)} />
            </div>

            <p className="text-stone-400 leading-[1.85] text-base md:text-lg max-w-3xl mb-10 font-light">
              Alle VLAN-Schnittstellen (Home, IoT, Server) sind Sub-Interfaces von <em className="not-italic text-stone-200">vtnet1 (LAN)</em>. Eine einzige physische Verbindung transportiert den internen Verkehr als <em className="not-italic text-stone-200">802.1Q</em>-getaggter Trunk.
            </p>

            <ol className="grid md:grid-cols-2 gap-x-10 border-t border-stone-600/60">
              {interfacesData.map((inf, i) => (
                <li key={i} className="grid grid-cols-12 gap-3 py-4 border-b border-stone-600/60">
                  <span className="col-span-1 text-orange-400/70 text-[11px] font-mono tabular-nums tracking-widest pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="col-span-11">
                    <div className="text-stone-100 text-sm font-medium mb-1">{inf.name}</div>
                    <div className="text-stone-400 text-xs font-mono leading-snug">{inf.value}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid md:grid-cols-2 gap-6 mt-14">
              <Figure src={FOTO.schnittstellenUebersicht} alt="Übersicht" caption="FIG. 05 — Schnittstellenübersicht: IP, VLAN-Tag, Gateway &amp; Routen." onClick={zoom(FOTO.schnittstellenUebersicht)} />
              <Figure src={FOTO.routen} alt="Routen" caption="FIG. 06 — Routing-Tabelle: alle Netzsegmente erreichbar, Default-Route 46.223.24.1." onClick={zoom(FOTO.routen)} />
            </div>
          </div>
        </section>

        <section id="hardening" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">05 · Verwaltung &amp; Härtung</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Web-GUI auf <span className="italic text-orange-400 font-light">Port 8443</span>.
                </h2>
                <p className="text-stone-500 text-sm mt-6 leading-relaxed font-light">
                  HTTPS-only, Port aus dem Standard verschoben, SSH deaktiviert.
                </p>
                <Figure src={FOTO.verwaltung} alt="Verwaltung" caption="FIG. 07 — Verwaltungseinstellungen, HTTPS auf Port 8443, SSH deaktiviert." onClick={zoom(FOTO.verwaltung)} className="mt-8" />
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {adminSettings.map((s, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-orange-400/70 font-mono pt-0.5">{s.k}</dt>
                      <dd className="col-span-2 text-stone-300 text-sm md:text-base font-light leading-snug">{s.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-12">
                  <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">Performance Tuning</div>
                  <ul className="border-t border-stone-600/60">
                    {tuning.map((t, i) => (
                      <li key={i} className="border-b border-stone-600/60 py-4 flex items-start gap-5">
                        <ShieldCheck className="w-4 h-4 text-orange-400/70 mt-1 shrink-0" />
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
          </div>
        </section>

        <section id="decisions" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">06 · Engineering Decisions</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Sechs <span className="italic text-orange-400 font-light">bewusste Wahlen</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/60">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-orange-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
                      <div className="col-span-11">
                        <h3 className="font-serif text-stone-50 text-lg md:text-xl leading-tight mb-2">{d.title}</h3>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{d.reason}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="validation" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-16 gap-x-12">
              <div className="md:col-span-6">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">07 · Validation</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Was nachweislich <span className="italic text-orange-400 font-light">funktioniert</span>.
                </h2>
                <ol className="border-t border-stone-600/60">
                  {validation.map((v, i) => (
                    <li key={i} className="grid grid-cols-12 gap-4 py-4 border-b border-stone-600/60 items-baseline">
                      <span className="col-span-1 font-mono text-orange-400/70 text-[11px] tabular-nums tracking-widest pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="col-span-10 text-stone-300 text-sm md:text-base leading-snug font-light">{v}</span>
                      <span className="col-span-1 text-right text-orange-400 text-[11px] uppercase tracking-widest font-mono">Pass</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="md:col-span-6">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-5">Troubleshooting</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Was <span className="italic text-amber-400 font-light">schiefging</span>.
                </h2>
                <ul className="space-y-5">
                  {troubleshooting.map((t, i) => (
                    <li key={i} className="border-l-2 border-amber-500/40 pl-5 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
                        <span className="text-amber-400 text-[11px] uppercase tracking-[0.2em] font-mono">{t.issue}</span>
                      </div>
                      <p className="text-stone-300 text-sm md:text-base leading-snug font-light">{t.fix}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="talking-points" className="px-6 py-28 md:py-36 border-t border-stone-700/80 bg-gradient-to-b from-stone-800 via-stone-800 to-orange-950/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12 mb-16">
              <div className="md:col-span-5">
                <div className="text-[13px] tracking-[0.3em] uppercase text-orange-400/80 font-mono mb-5">08 · Bewerbungsgespräch</div>
                <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
                  Wie ich diesen <span className="italic text-orange-400 font-light">Part</span> erkläre.
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-stone-400 text-base md:text-lg leading-relaxed font-light">
                  Sechs vorformulierte Sätze auf Deutsch — direkt ablesbar. Jeder Satz beantwortet eine typische Rückfrage zur Firewall-Installation und Härtung.
                </p>
              </div>
            </div>
            <ol className="border-t border-stone-600/60">
              {talkingPoints.map((tp, i) => (
                <li key={i} className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-stone-600/60">
                  <div className="md:col-span-3">
                    <div className="font-serif text-orange-400/80 text-4xl md:text-5xl tabular-nums leading-none mb-2">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-stone-500 font-mono">{tp.title}</div>
                  </div>
                  <blockquote className="md:col-span-9 font-serif italic text-stone-100 text-xl md:text-2xl leading-[1.45]">&ldquo;{tp.text}&rdquo;</blockquote>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense/part-1" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Part 01 · Netzwerk-Aufbau
            </Link>
            <Link to="/projekt/security/opnsense/part-3" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-600 font-mono mb-1.5">Weiter mit</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 03 · <span className="italic text-orange-400 font-light">VLAN &amp; Zero-Trust</span>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-orange-400 group-hover:border-orange-400 group-hover:text-stone-950 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart2;
