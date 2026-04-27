import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";

const FOTO = {
  hero: "/Opnsense/Foto's/Part 3 deckel FOTO.png",
  abb2: "/Opnsense/Foto's/Opnsense Schnittstellen Geräte Vlan.png",
  abb3: "/Opnsense/Foto's/Unifi Controller Networks.png",
  abb4: "/Opnsense/Foto's/Unifi Controller Port Vlans.png",
  abb5: "/Opnsense/Foto's/Opnsense  Firewall DNS & DHCP.png",
  abb6: "/Opnsense/Foto's/Opnsense  Dienste DNS & DHCP Leases.png",
  abb7: "/Opnsense/Foto's/Opnsense Firewall Regeln LAN.png",
  abb8: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Home.png",
  abb9: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Iot.png",
  abb10: "/Opnsense/Foto's/Opnsense  Firewall Regeln LgBeta_Server.png",
  abb11: "/Opnsense/Foto's/Opnsense  Firewall Regeln Wan.png",
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "environment", label: "Environment" },
  { id: "implementation", label: "Implementation" },
  { id: "decisions", label: "Decisions" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

const envData = [
  { k: "Firewall", v: "OPNsense 26.1.5, VM 100 auf Proxmox" },
  { k: "Core-Switch", v: "UniFi Switch Ultra, 8 Port PoE+, Controller: CT 101" },
  { k: "LAN / Management", v: "192.168.99.0/24 — Gateway: 192.168.99.1 (vtnet1)" },
  { k: "VLAN 20 — Home", v: "192.168.20.0/24 — Gateway: 192.168.20.1 (vlan020)" },
  { k: "VLAN 30 — IoT", v: "192.168.30.0/24 — Gateway: 192.168.30.1 (vlan030)" },
  { k: "VLAN 40 — Server", v: "192.168.40.0/24 — Gateway: 192.168.40.1 (vlan040)" },
  { k: "Trunk", v: "vtnet1 → vmbr3 → UniFi Switch Port 1, trunks=20;30;40" },
];

const zoneData = [
  { name: "Zone 1 — LAN/Management", desc: "Höchste Vertrauensstufe. Enthält Proxmox, OPNsense-GUI, NUC-Bastion, UniFi-Controller. Vollzugriff auf alle anderen Zonen." },
  { name: "Zone 2 — Home (VLAN 20)", desc: "Mittlere Vertrauensstufe. Normale Benutzergeräte. Internetzugang erlaubt, Zugriff auf Server-Zone eingeschränkt, kein Zugriff auf Management." },
  { name: "Zone 3 — IoT (VLAN 30)", desc: "Niedrigste Vertrauensstufe. Smart-TV, PS5, Alexa. Nur Internetzugang, kein Zugriff auf interne Netzwerke (RFC1918-Block)." },
  { name: "Zone 4 — Server (VLAN 40)", desc: "Hohe Vertrauensstufe. Raspberry Pi 5, Server-Container. Kontrollierter Zugang zu Management und Internet." },
];

const decisions = [
  { title: "RFC1918_Private als Alias", reason: "Ein einziger Alias für alle privaten IP-Bereiche vereinfacht das Regelwerk erheblich und verhindert Lücken." },
  { title: "DNS-Zwang", reason: "Regel 1 jeder Schnittstelle erzwingt den OPNsense Unbound-DNS, um DNS-Über-HTTPS-Bypass zu erschweren." },
  { title: "Server-Zugriff vor RFC-Block", reason: "Das Home-Netz erhält gezielten Zugriff auf Server-Segmente, bevor der generische Block greift." },
  { title: "Kein Server-Zugriff für IoT", reason: "IoT-Geräte erhalten absolutes Zero-Trust und dürfen keine lateralen Bewegungen durchführen." },
  { title: "Third-party Gateway", reason: "Switch führt kein Routing durch, OPNsense behält die alleinige Kontrolle." },
  { title: "Kleine DHCP-Bereiche", reason: "Reduziert Angriffsfläche. Begrenzt auf 10-20 IPs für Server und IoT, um unautorisierte Geräte auszuschließen." },
];

const tuning = [
  { k: "DNS Enforcement (Port 53)", v: "Alle Segmente werden gezwungen, den internen OPNsense DNS als einzigen Resolver zu nutzen." },
  { k: "RFC1918-Alias-Block", v: "Blockiert 10.0.0.0/8, 172.16.0.0/12 und 192.168.0.0/16 auf allen Client-Interfaces pragmatisch." },
  { k: "VLAN-Trunk-Restriktion", v: "Doppelte Kontrolle: Auf Proxmox-Ebene (trunks=20;30;40) und portbasiertes Tagging am Switch." },
  { k: "DHCP Snooping", v: "Aufgeschaltet auf dem UniFi Switch, um gefälschte DHCP-Antworten zu unterbinden." },
];

const troubleshooting = [
  { issue: "Änderung der IP-Bereiche", fix: "Die ursprüngliche Planung 10.0.x.x wurde in 192.168.x.x geändert, um Routing-Konflikte mit VPN zu vermeiden." },
  { issue: "VLAN 10 entfallen", fix: "Das Management-VLAN (früher 10) läuft nun direkt ungetaggt auf vtnet1 zur Vereinfachung." },
  { issue: "Server-Regel 1 sehr offen", fix: "Any->Any inbound in Zone 4 ist gewollt für Verwaltung; generischer Outbound-Block schützt das Backend." },
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

const ProjektOPNsensePart3 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_3_Netzwerksegmentierung_Firewall_Regeln.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 03 — VLAN & Firewall Regeln | Enterprise Security Lab</title>
        <meta name="description" content="Part 3: Netzwerksegmentierung, VLANs, Zero-Trust und Firewall-Regeln auf der OPNsense." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-rose-400/20 selection:text-rose-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 03</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-10">
              <span className="text-rose-400">Part 03 / 06</span>
              <span className="h-px w-12 bg-stone-700" />
              <span>Segmentierung · Isolation · ACLs</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              VLAN-Segmente <br />
              &amp; <span className="italic font-light text-rose-400">Zero-Trust</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              Design und Implementierung einer Zero-Trust-Architektur — Aufteilung in isolierte Sicherheitszonen und strenge Access Control Lists.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Etappe</div><div className="text-stone-200 text-sm">03 / 06</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Layer</div><div className="text-stone-200 text-sm">L2 · L3</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Reading</div><div className="text-stone-200 text-sm">~ 9 min</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div><div className="text-rose-400 text-sm">Validiert</div></div>
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
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-rose-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-rose-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.hero)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.hero} alt="Part 3 Cover" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            Die Zero-Trust Netzwerkarchitektur: Datenfluss strikt nach Sicherheitszonen getrennt.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">01 · Scope</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              <span className="italic text-rose-400 font-light">Zero-Trust</span> Routing.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-rose-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m dritten Teil überführen wir die flache Netzwerkstruktur in isolierte Zonen nach dem Zero-Trust-Prinzip. Wir implementieren dedizierte VLANs auf dem UniFi-Switch, binden diese via Trunk-Ports in OPNsense ein und definieren granulare Firewall-Regeln, die jeglichen Lateralverkehr strikt unterbinden.
            </p>
            
            <div className="mt-12 grid sm:grid-cols-2 gap-8 border-t border-stone-600/80 pt-10">
              {zoneData.map((z, i) => (
                <div key={i}>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-rose-400/70 font-mono mb-3">Zone {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-serif text-stone-50 text-lg mb-2">{z.name.split("—")[0]}</div>
                  <p className="text-stone-400 text-sm leading-relaxed">{z.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="environment" className="px-6 py-24 md:py-32 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">02 · Environment</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Der <span className="italic text-rose-400 font-light">Spec-Sheet</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-rose-400/70 font-mono pt-0.5">{row.k}</dt>
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
              Drei Schritte ins <span className="italic text-rose-400 font-light">VLAN</span>.
            </h2>

            <div className="space-y-28">
              {/* Step 1 */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-7">
                  <Figure src={FOTO.abb2} alt="VLAN Geräte" caption="FIG. 02 — OPNsense VLAN-Geräte: Drei Sub-Interfaces (20,30,40) auf vtnet1." onClick={zoom(FOTO.abb2)} />
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-rose-400/70 font-mono mb-3 tabular-nums">Step 01</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">OPNsense VLAN Interfaces</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light">
                    Drei VLAN-Sub-Interfaces wurden auf der LAN-Trunkkarte (vtnet1) konfiguriert. Alle Interfaces sind mit 802.1Q priorisiert und verarbeiten die Tags des UniFi Switches.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-5 md:order-1 order-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-rose-400/70 font-mono mb-3 tabular-nums">Step 02</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Switch-seitige Trunk-Zuweisung</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Mithilfe des UniFi Controllers wurden Third-party Gateways (OPNsense) definiert. Die Port-Zuweisung regelt explizit "Native VLAN" für Endgeräte und aggregierte Tags für die Trunks.
                  </p>
                </div>
                <div className="md:col-span-7 md:order-2 order-1 grid grid-cols-2 gap-4">
                  <Figure src={FOTO.abb3} alt="UniFi Networks" caption="Third-party GW" onClick={zoom(FOTO.abb3)} />
                  <Figure src={FOTO.abb4} alt="UniFi Ports" caption="Port-VLAN-Matrix" onClick={zoom(FOTO.abb4)} />
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                 <div className="md:col-span-7">
                  <div className="grid grid-cols-2 gap-4">
                    <Figure src={FOTO.abb6} alt="DHCP Leases" caption="DHCP Leases" onClick={zoom(FOTO.abb6)} />
                    <Figure src={FOTO.abb5} alt="DHCP Pools" caption="IPv4 Pools" onClick={zoom(FOTO.abb5)} />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-rose-400/70 font-mono mb-3 tabular-nums">Step 03</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Eingeschränkte DHCP Areas</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light">
                    Jedes Segment erhält einen eigenen OPNsense DHCP-Server-Pool. Um das Angriffsfenster klein zu halten, wurden die Pools für IoT und Server auf lediglich 10 IP-Adressen beschränkt.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-t border-stone-600/80 pt-20">
                <div className="text-[11px] tracking-[0.3em] uppercase text-rose-400/70 font-mono mb-3 tabular-nums">Step 04</div>
                <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-6">First-Match Firewall ACLs</h3>
                <p className="text-stone-400 text-base leading-relaxed font-light max-w-3xl mb-12">
                  Die Regeln arbeiten im First-Match-Prinzip (Default Deny). Zentrale Komponente ist der `RFC1918_Private`-Alias, 
                  welcher alle privaten IPs pauschal sperrt, um laterale Ausbreitungen auszuschließen.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <Figure src={FOTO.abb7} alt="LAN Rules" caption="Regeln LAN: Default Allow (Trusted)" onClick={zoom(FOTO.abb7)} />
                  <Figure src={FOTO.abb8} alt="Home Rules" caption="Regeln Home: Server Access, dann RFC-Block" onClick={zoom(FOTO.abb8)} />
                  <Figure src={FOTO.abb9} alt="IoT Rules" caption="Regeln IoT: Harter RFC-Block (Absolute Isolation)" onClick={zoom(FOTO.abb9)} />
                  <Figure src={FOTO.abb10} alt="Server Rules" caption="Regeln Server: Global Pass mit RFC-Ausgangssperre" onClick={zoom(FOTO.abb10)} />
                </div>
                
                <div className="bg-stone-900 border border-stone-700/50 p-8 rounded-xl max-w-3xl">
                  <h4 className="font-serif text-stone-50 text-xl md:text-2xl mb-4">VPN: WAN-Rule Exception</h4>
                  <p className="text-sm text-stone-400 leading-relaxed mb-6">
                    Die WAN-Schnittstelle blockiert jeglichen eingehenden Verkehr per Default Deny. 
                    Es existiert exakt eine Ausnahme: Der Pass-Filter für UDP auf Port 51820 für den WireGuard Remote Access Tunnel.
                  </p>
                  <Figure src={FOTO.abb11} alt="WAN Rules" caption="Regeln WAN: WireGuard UDP Pass" onClick={zoom(FOTO.abb11)} />
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="decisions" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">04 · Engineering Decisions</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Strikte <span className="italic text-rose-400 font-light">Restriktionen</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-rose-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
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
                  <span className="italic text-rose-400 font-light">Zero-Trust</span> Enforcements.
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {tuning.map((t, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-4 flex items-start gap-5">
                      <ShieldCheck className="w-4 h-4 text-rose-400/70 mt-1 shrink-0" />
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

        <section id="troubleshooting" className="px-6 py-28 md:py-36 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-16 gap-x-12">
              <div className="md:col-span-6">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">Troubleshooting</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em] mb-10">
                  Was <span className="italic text-amber-400 font-light">schiefging</span>.
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
              <div className="md:col-span-6 flex items-center">
                 <div className="bg-stone-900 border border-stone-700 p-8 rounded-xl w-full">
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">Das Netzwerk ist nun vollständig segmentiert und durch Firewall-Regeln (Zero-Trust) gesichert.</p>
                    <p className="font-serif text-stone-200 text-lg">
                      Die Architektur ist bereit für <strong className="text-rose-400 font-medium">Part 4: Bedrohungserkennung und Log-Management (Suricata & Wazuh)</strong>.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense/part-2" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Part 02 · Firewall-Installation
            </Link>
            <Link to="/projekt/security/opnsense/part-4" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Weiter mit</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 04 · <span className="italic text-rose-400 font-light">IDS/IPS & Suricata</span>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-600 flex items-center justify-center group-hover:bg-rose-400 group-hover:border-rose-400 group-hover:text-stone-900 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart3;
