import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, CheckCircle2, AlertTriangle, Lock, Activity } from "lucide-react";

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
  abb10: "/Opnsense/Foto's/Opnsense  Firewall Protokolldatein Übersicht.png",
  abb11: "/Opnsense/Foto's/Opnsense  Firewall Protokolldatein Übersicht Schnittstellen.png",
};

const sections = [
  { id: "scope", label: "Objective" },
  { id: "environment", label: "Environment" },
  { id: "implementation", label: "Implementation" },
  { id: "validation", label: "Validation" },
  { id: "conclusion", label: "Conclusion" },
];

const envData = [
  { k: "WireGuard VPN", v: "OPNsense-integriert, wg0-Interface, UDP 51820, Tunnel: 10.10.10.0/24" },
  { k: "NUC Bastion-Host", v: "192.168.99.209, LAN-Segment, Docker (Uptime Kuma + Homepage)" },
  { k: "Uptime Kuma", v: "Port 3001, SLA / Ping-basiertes Monitoring" },
  { k: "Homepage Dashboard", v: "Port 3002, API-integrierte NOC/SOC-Übersicht" },
  { k: "Telegram-Bot", v: "Alarmierung bei Ausfallereignissen (Webhook)" },
  { k: "VLAN-Test-Container", v: "CT 102 (Alpine), 192.168.99.186, für Isolationstests" },
];

const validationResults = [
  { name: "VPN → Management", status: "Pass", desc: "Voller TCP/UDP Zugriff auf 192.168.99.0/24 durch Key-Exchange erteilt.", icon: CheckCircle2, color: "text-emerald-500" },
  { name: "Home → Server", status: "Limited", desc: "Nur explizit portbasierte Zugriffe (z.B. Media) gestattet. Rest gedroppt.", icon: AlertTriangle, color: "text-amber-500" },
  { name: "IoT → Management / Server", status: "Blocked", desc: "Harter RFC1918 Deny. Geräte können nicht abdriften.", icon: Lock, color: "text-red-500" },
  { name: "Monitoring Heartbeat", status: "Pass", desc: "Uptime Kuma checkt alle 30s. APIs pollt sekündlich in Homepage.", icon: Activity, color: "text-blue-500" },
];

const decisions = [
  { title: "WireGuard statt OpenVPN", reason: "Höhere Wire-Speed Performance, geringer Overhead und einfache OPNsense-native Integration." },
  { title: "Split-Tunneling", reason: "Nur Traffic für 192.168.x.x wird in den Tunnel geroutet. Regulärer WAN Traffic des Clients bleibt beim ISP." },
  { title: "DuckDNS", reason: "Gleicht die dynamische IPv4-Zuweisung des Home-ISPs automatisch ab (DDNS)." },
  { title: "VPN Full Access", reason: "Da keine Password-Auth stattfindet (nur PKI Keys), gilt das konfiguriere Endgerät als fully-trusted im Tunnel." },
  { title: "Physischer NUC Bastion", reason: "Sorgt für Out-of-Band (OOB) Erreichbarkeit; ein Proxmox-Absturz legt nicht sofort das externe Monitoring lahm." },
  { title: "Docker-Socket-Proxy", reason: "Die Docker API wird für das Dashboard nur read-only durchgestellt. Kein Root-Risk." },
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

const ProjektOPNsensePart6 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_6_Fernzugriff_Systemvalidierung.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 06 — Bastion Host & Systemvalidierung | Enterprise Lab</title>
        <meta name="description" content="Part 6: Sicherer Fernzugriff per WireGuard, NUC als Bastion-Host, Monitoring und Testing." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-sky-500/20 selection:text-sky-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 06</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-10">
              <span className="text-sky-400">Part 06 / 06</span>
              <span className="h-px w-12 bg-stone-700" />
              <span>WireGuard · Bastion · Validation</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              Der Bastion &amp;<br />
              <span className="italic font-light text-sky-400">Fernzugriff</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              Finale Integration des Out-of-Band (OOB) Managements über WireGuard VPN. Architekturvalidierung, Dashboards und zentrales Monitoring.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Etappe</div><div className="text-stone-200 text-sm">06 / 06</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Layer</div><div className="text-stone-200 text-sm">L4 · L7</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Reading</div><div className="text-stone-200 text-sm">~ 10 min</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div><div className="text-emerald-400 text-sm">Fertiggestellt</div></div>
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
            <span className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono shrink-0 hidden md:inline">Auf dieser Seite</span>
            <ol className="flex items-center gap-1 md:gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-sky-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-sky-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.hero)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.hero} alt="Part 6 Cover" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            Remote Access Topology &amp; Out-of-Band (OOB) Dashboard Integration.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">01 · Objective</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              Der <span className="italic text-sky-400 font-light">Bastion Node</span>.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-sky-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m sechsten und chronologisch letzten Teil implementieren wir eine Notfall-Managementebene (Out-of-Band). Wir konfigurieren einen isolierten Bastion-Host für das Edge-Monitoring und errichten verschlüsselte WireGuard VPN-Tunnelbündel, um Operatoren permanenten und abhörsicheren Remote-Access auf das Kontrollzentrum zu gewähren.
            </p>
          </div>
        </section>

        <section id="environment" className="px-6 py-24 md:py-32 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">02 · Environment</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Der <span className="italic text-sky-400 font-light">Spec-Sheet</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-sky-400/70 font-mono pt-0.5">{row.k}</dt>
                      <dd className="col-span-2 text-stone-300 text-sm md:text-base font-light leading-snug">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section id="implementation" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">03 · Implementation</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-20 max-w-3xl">
              WireGuard &amp; <span className="italic text-sky-400 font-light">Observability</span>.
            </h2>

            <div className="space-y-28">
              {/* WireGuard */}
              <div>
                <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-end mb-10">
                  <div className="md:col-span-7">
                    <div className="text-[11px] tracking-[0.3em] uppercase text-sky-400/70 font-mono mb-3 tabular-nums">Step 01</div>
                    <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">WireGuard Instanzen & Peers</h3>
                    <p className="text-stone-400 text-base leading-relaxed font-light">
                      Der VPN Traffic des Notebooks wird von WAN (UDP 51820) entgegengenommen und auf den dedizierten Tunnel 10.10.10.x transferiert. Die Firewall gewährt diesen PKI-Peer-authentifizierten Endgeräten anschließend den Durchgang auf die OOB-Infrastruktur per Split-Tunneling.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Figure src={FOTO.abb2} alt="WG Server" caption="Server wg0" onClick={zoom(FOTO.abb2)} />
                  <Figure src={FOTO.abb3} alt="WG Peer" caption="Gegenstelle: Laptop" onClick={zoom(FOTO.abb3)} />
                  <Figure src={FOTO.abb4} alt="WG Status" caption="Live Handshake" onClick={zoom(FOTO.abb4)} />
                  <Figure src={FOTO.abb5} alt="WG FW" caption="WAN FW Rules" onClick={zoom(FOTO.abb5)} />
                </div>
              </div>

              {/* Uptime Kuma */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-5 md:order-1 order-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-sky-400/70 font-mono mb-3 tabular-nums">Step 02</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Uptime Kuma & Telegram Bots</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    30-Sekunden Ping Checks stellen sicher, dass alle Layer voll aktiv sind. Bei Abbrüchen (z.B. Host Isolation) werden Webhooks über die Telegram API getriggert, um den Operator via App zu verständigen.
                  </p>
                </div>
                <div className="md:col-span-7 md:order-2 order-1">
                   <div className="grid grid-cols-2 gap-4">
                     <Figure src={FOTO.abb6} alt="Uptime Kuma" caption="100% SLA auf allen Instanzen" onClick={zoom(FOTO.abb6)} />
                     <Figure src={FOTO.abb7} alt="Telegram" caption="Telegram Bot API Integration" onClick={zoom(FOTO.abb7)} />
                   </div>
                </div>
              </div>

              {/* Homepage Dashboard */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-7">
                   <div className="grid grid-cols-2 gap-4">
                     <Figure src={FOTO.abb8} alt="Dashboard UI" caption="Live Metrics Operations Dashboard" onClick={zoom(FOTO.abb8)} />
                     <Figure src={FOTO.abb9} alt="Service YAML" caption="Deklarative Configuration (services.yaml)" onClick={zoom(FOTO.abb9)} />
                   </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-sky-400/70 font-mono mb-3 tabular-nums">Step 03</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Live NOC Dashboard</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light">
                    Ein lokales, YAML-getriebenes Dashboard sammelt dank "Read-Only Socket-Proxies" Live-Metriken (CPU, RAM, Client-Count) der Hypervisoren und Firewalls ein. Alle Web-Tools sind ab hier als Single Pane of Glass verfügbar.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="validation" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">04 · Validation</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              <span className="italic text-sky-400 font-light">Isolation &amp; Security</span> Tests.
            </h2>
            <div className="grid md:grid-cols-12 gap-10 mb-16">
              <div className="md:col-span-5">
                <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                  Wir validieren nun, ob die getroffenen Zero-Trust Annahmen (Part 3) tatsächlich greifen. Wir platzieren einen Alpine-Linux Test-Container im IoT und Server-VLAN und testen Lateral Movements. 
                </p>
                <p className="text-stone-400 text-base leading-relaxed font-light">
                  Das OPNsense Firewall Protokoll gibt Auskunft: Nahezu 11% (564 Traffic Flows) wurden hart gedroppt, darunter illegale Intra-VLAN Zugriffsversuche.
                </p>
              </div>
              <div className="md:col-span-7 grid grid-cols-2 gap-4">
                <Figure src={FOTO.abb10} alt="FW Actions" caption="Event Verhältnis (89% Pass vs 11% Drop)" onClick={zoom(FOTO.abb10)} />
                <Figure src={FOTO.abb11} alt="FW Interfaces" caption="Drops per Interface (WAN & IoT)" onClick={zoom(FOTO.abb11)} />
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-700/80 rounded-xl p-8">
              <h3 className="font-serif text-stone-50 text-xl md:text-2xl mb-6">Validation Matrix: Cross-VLAN Testing</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                 {validationResults.map((z, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border border-stone-700/50 bg-stone-800/30 rounded-lg">
                      <z.icon className={`w-5 h-5 mt-0.5 shrink-0 ${z.color}`} />
                      <div>
                        <h4 className="text-stone-50 text-sm font-medium mb-1">
                          {z.name} <span className="text-[9px] uppercase ml-2 bg-stone-700 text-stone-300 font-mono px-1.5 py-0.5 rounded tracking-widest">{z.status}</span>
                        </h4>
                        <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">{z.desc}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section id="decisions" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">05 · Engineering Decisions</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Architektur-<span className="italic text-sky-400 font-light">Richtlinien</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-sky-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
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

        <section id="conclusion" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-16 gap-x-12">
              <div className="md:col-span-6 flex flex-col justify-center">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">06 · Conclusion</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Das Ende des <span className="italic text-emerald-400 font-light">Deployments</span>.
                </h2>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed font-light mb-6">
                  Mit Abschluss der Validierungsphase wurde bewiesen, dass alle L2 und L3 Segmente hermetisch arbeiten. Die Suricata Sensoren spiegeln Malware, Nginx verschleiert interne IPs hinter sicheren SSL Domains, und WireGuard sichert die Außenwelt via OOB-Host vollumfänglich ab.
                </p>
                <p className="text-stone-400 text-base leading-relaxed font-light">
                  Das Enterprise Security Lab OPNsense ist ab hier zu 100% produktionsbereit.
                </p>
              </div>
              <div className="md:col-span-6 flex items-center">
                 <div className="bg-stone-900 border border-stone-700 p-8 rounded-xl w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 animate-pulse relative">
                        <CheckCircle2 className="w-8 h-8" />
                        <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full" />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-emerald-400 mb-1">Status</div>
                        <h4 className="font-serif text-stone-50 text-xl">Projekt Abgeschlossen</h4>
                      </div>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed mt-6 border-t border-stone-800 pt-6">
                      Alle 6 Phasen wurden erfolgreich implementiert, dokumentiert und deployt. Keine offenen Schwachstellen oder Design Flaws bekannt.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense/part-5" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Part 05 · DNS &amp; Proxy Layer
            </Link>
            <Link to="/projekte" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Go back</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  <span className="italic text-stone-400 font-light">Zurück zur</span> Übersicht
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-600 flex items-center justify-center group-hover:bg-stone-200 group-hover:border-stone-200 group-hover:text-stone-900 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart6;
