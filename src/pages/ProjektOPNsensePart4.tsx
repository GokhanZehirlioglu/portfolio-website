import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";

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

const sections = [
  { id: "scope", label: "Scope" },
  { id: "environment", label: "Environment" },
  { id: "implementation", label: "Implementation" },
  { id: "decisions", label: "Decisions" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

const envData = [
  { k: "OPNsense Firewall", v: "VM 100, Suricata-Dienst integriert, Syslog-Weiterleitung konfiguriert" },
  { k: "Raspberry Pi 5", v: "16 GB RAM, Debian 13 (trixie), aarch64, VLAN 40 (192.168.40.20)" },
  { k: "Docker / Compose", v: "Containerisierte Wazuh-Bereitstellung (Single-Node)" },
  { k: "Wazuh Stack", v: "Manager + Indexer + Dashboard (v4.x), Port 514 (Syslog)" },
  { k: "Syslog-Transport", v: "UDP 514, RFC 3164, OPNsense → Wazuh Manager" },
  { k: "Überwachte Interfaces", v: "LAN, Home, IoT, Server, WAN" },
];

const rulesetData = [
  { name: "mobile_malware", desc: "Erkennung von Malware-Kommunikation mobiler Geräte" },
  { name: "threatview_CS_c2", desc: "Command-and-Control-Server-Erkennung (Cobalt Strike u.a.)" },
  { name: "tor", desc: "Erkennung von Tor-Netzwerk-Verkehr" },
  { name: "test", desc: "Testregeln für Validierung (EICAR u.a.)" },
];

const decisions = [
  { title: "IDS statt IPS", reason: "Suricata läuft im reinen Erkennungsmodus, um False Positives und Verbindungsabbrüche auf legitimen Verkehr zu vermeiden." },
  { title: "Selektives Ruleset", reason: "Nur 4 von über 30 Kategorien aktiv, minimiert die CPU-Last des N150 und verringert unnötiges Alarm-Rauschen." },
  { title: "RPi 5 als SIEM-Server", reason: "16 GB Modell, vollständig ausreichend für Single-Node Wazuh. Isolierung durch Platzierung in VLAN 40." },
  { title: "Docker statt LXC", reason: "Bietet bessere Portabilität und einfaches Update-Management." },
  { title: "Syslog (agentless)", reason: "FreeBSD unterstützt nativ keinen Wazuh Agent. Agentlose Syslog-Integration mittels UDP 514 ist die logische Brücke." },
  { title: "RFC 3164 Format", reason: "Wazuh-Decoder verarbeiten RFC 3164 zuverlässig; RFC 5424 führte in Tests zu Parsing-Fehlern." },
];

const tuning = [
  { k: "Promiscuous Mode", v: "Erweitert den Blick auf den getaggten VLAN-Trunk-Verkehr, nicht nur auf native Netzwerke." },
  { k: "Eve-Syslog JSON", v: "Zusätzliche strukturierte JSON-Logs ermöglichen tiefere SIEM-Integration (zukünftige Analysen)." },
  { k: "Wazuh Heap Limit", v: "Elasticsearch Indexer Heap begrenzt auf 4-6 GB (Xms/Xmx), um Paging zu verhindern." },
  { k: "Lifecycle (30 Tage)", v: "Rotationsrichtlinie löscht ältere Indizes automatisch ab, schützt die SSD." },
];

const troubleshooting = [
  { issue: "LXC-SIEM verworfen", fix: "Der Umstieg von einem LXC direkt auf Docker (RPi5) wurde für Wartbarkeit und physische Isolation vollzogen." },
  { issue: "Log-Ziel geändert", fix: "Statt der ursprünglich geplanten LXC-IP (192.168.99.10) läuft Syslog nun sauber auf die Raspberry Pi-IP 192.168.40.20." },
  { issue: "Indexer RAM-Verbrauch", fix: "Der speicherhungrige Indexer wurde hart über Compose Limits eingefangen." },
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

const ProjektOPNsensePart4 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_4_Bedrohungserkennung_Log_Management.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 04 — IDS/IPS & Log Management | Enterprise Security Lab</title>
        <meta name="description" content="Part 4: Bedrohungserkennung mit Suricata IDS und zentrales SIEM Log-Management mit Wazuh." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-fuchsia-400/20 selection:text-fuchsia-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 04</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-10">
              <span className="text-fuchsia-400">Part 04 / 06</span>
              <span className="h-px w-12 bg-stone-700" />
              <span>Suricata · Wazuh · SIEM Pipelines</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              Bedrohungen &amp;<br />
              <span className="italic font-light text-fuchsia-400">Observability</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              Aufbau einer Deep-Packet-Inspection Pipeline (Suricata) kombiniert mit einer hochverfügbaren SIEM-Lösung (Wazuh) zur Echtzeit-Analyse.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Etappe</div><div className="text-stone-200 text-sm">04 / 06</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Layer</div><div className="text-stone-200 text-sm">L4 · L7</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Reading</div><div className="text-stone-200 text-sm">~ 11 min</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div><div className="text-fuchsia-400 text-sm">Validiert</div></div>
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
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-fuchsia-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-fuchsia-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.hero)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.hero} alt="Part 4 Cover" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            SIEM-Pipeline: Suricata-Logs wandern via UDP 514 an den Wazuh-Index auf dem Raspberry Pi.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">01 · Scope</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              <span className="italic text-fuchsia-400 font-light">Deep Packet</span> Inspection.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-fuchsia-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m vierten Teil des Security Labs konfigurieren wir OPNsense als zentralen Sensor für unser SIEM-System. Durch die Aktivierung von Suricata für Deep-Packet-Inspection durchleuchten wir den Netzwerkverkehr auf Bedrohungen und leiten sicherheitsrelevante Events sowie Syslogs automatisiert an Wazuh weiter.
            </p>
            
            <div className="mt-12 border-t border-stone-600/80 pt-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-fuchsia-400/70 font-mono mb-6">Ausgewählte ET-Signaturen</div>
              <div className="grid sm:grid-cols-2 gap-8">
                {rulesetData.map((r, i) => (
                  <div key={i}>
                    <div className="font-serif text-stone-50 text-lg mb-2">{r.name}</div>
                    <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="environment" className="px-6 py-24 md:py-32 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-12 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">02 · Environment</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Der <span className="italic text-fuchsia-400 font-light">Spec-Sheet</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-fuchsia-400/70 font-mono pt-0.5">{row.k}</dt>
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
              Netzwerk-Events ins <span className="italic text-fuchsia-400 font-light">Dashboard</span>.
            </h2>

            <div className="space-y-28">
              {/* Suricata Config */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-6 grid grid-cols-1 gap-6">
                  <Figure src={FOTO.abb2} alt="Suricata Settings" caption="FIG. 02 — IDS Einstellungen im Promiscuous-Modus." onClick={zoom(FOTO.abb2)} />
                  <Figure src={FOTO.abb3} alt="Suricata Rules" caption="FIG. 03 — ET-Signaturen über OPNsense Plugin." onClick={zoom(FOTO.abb3)} />
                </div>
                <div className="md:col-span-6">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-fuchsia-400/70 font-mono mb-3 tabular-nums">Step 01</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Suricata & Promiscuous Mode</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Die IPS/IDS-Engine ist passiv gekoppelt: Sie droppt keine Pakete (IDS-Mode, nicht IPS) und analysiert sicher über 5 Schnittstellen hinweg. Zusätzliche Eve-Syslog Parameter erzwingen saubere JSON-Ausgaben.
                  </p>
                  <p className="text-stone-400 text-base leading-relaxed font-light">
                    Wir greifen gezielt 4 ET Open Signatur-Kategorien (z.B. Mobile Malware und Cobalt Strike C2) ab, um Rauschen zu verringern.
                  </p>
                </div>
              </div>

              {/* Logs */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-5 md:order-1 order-2">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-fuchsia-400/70 font-mono mb-3 tabular-nums">Step 02</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Log Streaming via Syslog</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Weil FreeBSD (OPNsense) keinen nativ stabilen Wazuh-Agenten liefert, generiert die Firewall UDP-Syslog Streams, die an den Raspberry Pi 5 gesendet werden. Die Live-Log-Verifikation auf der OPNsense-GUI bestätigt den Datenfluss.
                  </p>
                </div>
                <div className="md:col-span-7 md:order-2 order-1">
                   <Figure src={FOTO.abb4} alt="Suricata Logs" caption="FIG. 04 — Eingehende Flowbit Logs auf der Firewall vor dem Export." onClick={zoom(FOTO.abb4)} />
                </div>
              </div>

              {/* Wazuh */}
              <div className="border-t border-stone-600/80 pt-20">
                <div className="text-[11px] tracking-[0.3em] uppercase text-fuchsia-400/70 font-mono mb-3 tabular-nums">Step 03</div>
                <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-6">Wazuh SIEM & Dashboard (RPi 5)</h3>
                <p className="text-stone-400 text-base leading-relaxed font-light max-w-3xl mb-12">
                  Die aggregierten Syslog-Nachrichten werden vom Wazuh Manager im Server-VLAN encodiert und indiziert.
                  In den Dashboards zeigt sich, wie oft Regeln gebrochen werden und welche IPs involviert sind.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <Figure src={FOTO.abb5} alt="Wazuh Overview 1" caption="FIG. 05 — OPNsense Block-Event Dashboard." onClick={zoom(FOTO.abb5)} />
                  <Figure src={FOTO.abb6} alt="Wazuh Overview 2" caption="FIG. 06 — UniFi AP Event Visualisierung." onClick={zoom(FOTO.abb6)} />
                  <Figure src={FOTO.abb7} alt="Alerts" caption="FIG. 07 — Einzelner Severity Alert im Logstore." onClick={zoom(FOTO.abb7)} />
                  <Figure src={FOTO.abb8} alt="Archives" caption="FIG. 08 — Raw Archives (61.000 Logs im Index)." onClick={zoom(FOTO.abb8)} />
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
                  <span className="italic text-fuchsia-400 font-light">Performance</span> vs. Analyse.
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-fuchsia-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
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
                  SIEM <span className="italic text-fuchsia-400 font-light">Lifecycle</span>.
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {tuning.map((t, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-4 flex items-start gap-5">
                      <ShieldCheck className="w-4 h-4 text-fuchsia-400/70 mt-1 shrink-0" />
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
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">Die IDS-Observability-Schicht loggt zuverlässig verdächtige Netzwerk-Events der Firewall in das SIEM-Dashboard.</p>
                    <p className="font-serif text-stone-200 text-lg">
                      Wir sind bereit für <strong className="text-fuchsia-400 font-medium">Part 5: DNS-Management und Nginx Reverse Proxy Logik</strong>.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense/part-3" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Part 03 · VLAN-Segmentierung
            </Link>
            <Link to="/projekt/security/opnsense/part-5" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Weiter mit</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 05 · <span className="italic text-fuchsia-400 font-light">DNS & Reverse Proxy</span>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-600 flex items-center justify-center group-hover:bg-fuchsia-400 group-hover:border-fuchsia-400 group-hover:text-stone-900 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart4;
