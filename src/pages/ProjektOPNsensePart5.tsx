import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Maximize2, ChevronLeft, ShieldCheck, AlertTriangle } from "lucide-react";

const FOTO = {
  hero: "/Opnsense/Foto's/part5.png",
  abb1: "/Opnsense/Foto's/part5.png", 
  abb2: "/Opnsense/Foto's/Opnsense  Dienste Unbound-DNS .png",
  abb3: "/Opnsense/Foto's/Opnsense  Dienste Unbound-DNS.png",
  abb4: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server.png",
  abb5: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server Upstream.png",
  abb6: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server upstream Group.png",
  abb7: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server Locatin.png",
  abb8: "/Opnsense/Foto's/Opnsense  Dienste Nginx Proxy Server HTTPS.png",
};

const sections = [
  { id: "scope", label: "Scope" },
  { id: "environment", label: "Environment" },
  { id: "implementation", label: "Implementation" },
  { id: "decisions", label: "Decisions" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

const envData = [
  { k: "OPNsense Firewall", v: "VM 100, Unbound DNS aktiv, Nginx-Plugin installiert" },
  { k: "Interne Domain", v: "*.home.internal (kein öffentliches DNS)" },
  { k: "DNS-Server", v: "Unbound DNS auf OPNsense (Port 53, alle Interfaces)" },
  { k: "Reverse Proxy", v: "OPNsense Nginx-Plugin (nicht NPM auf Docker)" },
  { k: "TLS-Zertifikat", v: "Web GUI TLS certificate (self-signed, intern)" },
  { k: "Backend-Dienste", v: "Wazuh, Proxmox, UniFi, Uptime Kuma" },
];

const routingSteps = [
  { name: "DNS-Auflösung", desc: "Client fragt Unbound DNS nach Hostnamen (z.B. wazuh.home.internal). Unbound löst alle auf 192.168.99.1 auf." },
  { name: "Reverse Proxy", desc: "Anfrage erreicht das Nginx-Plugin (Port 443). Nginx identifiziert anhand des SNI den virtuellen Server." },
  { name: "Backend-Weiterleitung", desc: "Nginx leitet Anfrage an den konfigurierten TLS-Upstream-Server weiter (z.B. Wazuh IP)." },
];

const decisions = [
  { title: "OPNsense Nginx Plugin", reason: "Die Verlagerung auf OPNsense zentralisiert DNS und Reverse Proxy auf einem einzigen Management Layer." },
  { title: "Einzelne A-Records", reason: "Wildcard würde unkontrolliert alle Subdomains auflösen. Einzeleinträge geben volle Kontrolle und Transparenz." },
  { title: "Zentrale DNS IPs", reason: "Alle internen Domainnamen zeigen auf die 192.168.99.1. Routing ins Backend erfolgt erst L7 hostbasiert im Reverse Proxy." },
  { title: "Self-Signed TLS", reason: "Ausreichend für internes Netzwerk, um End-to-End-Verschlüsselung (statt Klartext) zu garantieren." },
  { title: "Zwei Proxies", reason: "OPNsense bedient strikt `.home.internal`. Docker Nginx bedient nach außen gerichtete Cloudflare Domains." },
  { title: "TTL = 1 Sekunde", reason: "Extrem kurze DNS-Cache-Zeit in der Entwicklungsphase ermöglicht sofortige Propagierung." },
];

const tuning = [
  { k: "DNS-Zwang", v: "Regel 1 jeder Schnittstelle erzwingt DNS via OPNsense. Alle Überschreibungen greifen verlässlich." },
  { k: "Backend-TLS", v: "Wazuh, Proxmox, UniFi werden über TLS-verschlüsselte Backend-Verbindungen adressiert." },
  { k: "DNS-Rebind-Schutz", v: "opnsense.home.internal als dedizierter White-Label Hostname eingepflegt." },
];

const troubleshooting = [
  { issue: "NPM auf Docker verworfen", fix: "Nginx Proxy Manager eliminiert, OPNsense Nginx Plugin übernimmt." },
  { issue: "Port 443 Konflikt", fix: "OPNsense Web-GUI umgezogen auf Port 8443 für den Nginx Proxy." },
  { issue: "Kuma TLS-Pass", fix: "Front-to-Proxy ist verschlüsselt, Backend zum Kuma unverschlüsselt (Kuma Default)." },
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

const ProjektOPNsensePart5 = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);
  const docUrl = "/Opnsense/Datei/Part_5_Netzwerkdienste_Reverse_Proxy.docx";

  return (
    <Layout>
      <Helmet>
        <title>Part 05 — DNS & Reverse Proxy | Enterprise Security Lab</title>
        <meta name="description" content="Part 5: Interne DNS-Architektur und zentrales Service-Routing über Reverse Proxy." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-emerald-400/20 selection:text-emerald-50 [&_section]:scroll-mt-32">

        <header className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-14">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <Link to="/projekt/security/opnsense" className="hover:text-stone-200 transition-colors">Enterprise Security Lab</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Part 05</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-10">
              <span className="text-emerald-400">Part 05 / 06</span>
              <span className="h-px w-12 bg-stone-700" />
              <span>Unbound · DNS · Nginx Plugin</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] tracking-[-0.03em] mb-12">
              Namespaces &amp;<br />
              <span className="italic font-light text-emerald-400">Routing</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-14">
              Aufbau einer zentralen Namensauflösung mit Unbound DNS und Service-Routing via Nginx für eine Single-Entry-Point Architektur.
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Etappe</div><div className="text-stone-200 text-sm">05 / 06</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Layer</div><div className="text-stone-200 text-sm">L7</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Reading</div><div className="text-stone-200 text-sm">~ 8 min</div></div>
                <div><div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div><div className="text-emerald-400 text-sm">Validiert</div></div>
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
                  <a href={`#${s.id}`} className="group flex items-center gap-2 px-3 py-1.5 text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-mono text-stone-500 hover:text-emerald-400 transition-colors">
                    <span className="text-stone-700 group-hover:text-emerald-500/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <figure className="px-6 pt-20 md:pt-28">
          <div onClick={() => setZoomedImage(FOTO.hero)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={FOTO.hero} alt="Part 5 Cover" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/70 backdrop-blur-md border border-stone-700 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            DNS &amp; Reverse Proxy Architecture: Alle Routen laufen über den Nginx Single-Entry-Point.
          </figcaption>
        </figure>

        <section id="scope" className="px-6 py-28 md:py-36">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">01 · Scope</div>
            <h2 className="font-serif text-stone-50 text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-12">
              <span className="italic text-emerald-400 font-light">Single</span> Entry Point.
            </h2>
            <p className="font-serif text-stone-100 text-2xl md:text-[26px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-emerald-400 text-[88px] leading-[0.85] mr-4 mt-1">I</span>
              m fünften Teil sichern wir die Veröffentlichung interner Dienste vor direktem externen Zugriff ab. Wir konfigurieren Unbound DNS für die interne Zonenverwaltung und etablieren einen Nginx Reverse Proxy, der als einziger autorisierter HTTPS-Zugangsknoten agiert und Traffic sicher zu den Docker-Containern lenkt.
            </p>
            
            <div className="mt-12 grid sm:grid-cols-3 gap-8 border-t border-stone-600/80 pt-10">
              {routingSteps.map((r, i) => (
                <div key={i}>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/70 font-mono mb-3">Stufe {i + 1}</div>
                  <div className="font-serif text-stone-50 text-lg mb-2">{r.name}</div>
                  <p className="text-stone-400 text-sm leading-relaxed">{r.desc}</p>
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
                  Der <span className="italic text-emerald-400 font-light">Spec-Sheet</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <dl className="border-t border-stone-600/60">
                  {envData.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-stone-600/60">
                      <dt className="col-span-1 text-[11px] tracking-[0.2em] uppercase text-emerald-400/70 font-mono pt-0.5">{row.k}</dt>
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
              Nginx &amp; <span className="italic text-emerald-400 font-light">Resolver</span>.
            </h2>

            <div className="space-y-28">
              {/* Unbound DNS */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-4">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/70 font-mono mb-3 tabular-nums">Step 01 &amp; 02</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Unbound DNS overrides</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Unbound DNS leitet keine Wildcards unkontrolliert weiter, sondern löst nur harte Einzel-Records (A-Record Überschreibungen) aus dem `.home.internal` Raum zwingend auf die Firewall IP auf.
                  </p>
                </div>
                <div className="md:col-span-8 grid grid-cols-2 gap-4">
                  <Figure src={FOTO.abb2} alt="Unbound General" caption="Port 53 Resolving" onClick={zoom(FOTO.abb2)} />
                  <Figure src={FOTO.abb3} alt="Unbound Overrides" caption="A-Records auf 192.168.99.1" onClick={zoom(FOTO.abb3)} />
                </div>
              </div>

              {/* Nginx Upstreams */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                <div className="md:col-span-7">
                   <div className="grid grid-cols-2 gap-4">
                     <Figure src={FOTO.abb4} alt="Nginx Service" caption="Nginx Engine Live" onClick={zoom(FOTO.abb4)} />
                     <Figure src={FOTO.abb5} alt="Upstream Servers" caption="Server Definitions" onClick={zoom(FOTO.abb5)} />
                   </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/70 font-mono mb-3 tabular-nums">Step 03 &amp; 04</div>
                  <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-4">Nginx &amp; Upstreams</h3>
                  <p className="text-stone-400 text-base leading-relaxed font-light mb-6">
                    Ist der DNS resolved, greift das native OPNsense Nginx-Plugin. Als erstes definieren Upstream-Server die physikalischen Backends und deren IP-Adressen sowie Ports in der Zone.
                  </p>
                </div>
              </div>

              {/* SNI / Binding */}
              <div className="border-t border-stone-600/80 pt-20">
                <div className="text-[11px] tracking-[0.3em] uppercase text-emerald-400/70 font-mono mb-3 tabular-nums">Step 05 - 07</div>
                <h3 className="font-serif text-stone-50 text-2xl md:text-3xl leading-[1.15] tracking-[-0.01em] mb-6">Routing Mechaniken &amp; SSL</h3>
                <p className="text-stone-400 text-base leading-relaxed font-light max-w-3xl mb-12">
                  Die logischen Upstream-Gruppen bündeln Backends mit SSL/TLS Zertifikaten und verbinden sie im Location-Modus auf dem Root `/` Path. Die HTTP(S) Server verknüpfen sodann das Hostname-SNI auf dem 443 Listen-Port.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Figure src={FOTO.abb6} alt="Groups" caption="TLS-Status (Upstream Gruppen)" onClick={zoom(FOTO.abb6)} />
                  <Figure src={FOTO.abb7} alt="Locations" caption="Root Location Paths (/)" onClick={zoom(FOTO.abb7)} />
                  <Figure src={FOTO.abb8} alt="Bind" caption="SNI Server Hostname Binding" onClick={zoom(FOTO.abb8)} />
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
                  Architektur-<span className="italic text-emerald-400 font-light">Richtlinien</span>.
                </h2>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {decisions.map((d, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-6 grid grid-cols-12 gap-4">
                      <div className="col-span-1 font-serif text-emerald-400/70 text-2xl tabular-nums leading-none">{String(i + 1).padStart(2, "0")}</div>
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
                  Spoofing <span className="italic text-emerald-400 font-light">Protection</span>.
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="border-t border-stone-600/80">
                  {tuning.map((t, i) => (
                    <li key={i} className="border-b border-stone-600/60 py-4 flex items-start gap-5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400/70 mt-1 shrink-0" />
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
                    <p className="text-stone-400 text-sm leading-relaxed mb-4">Das interne DNS and Service Routing Modell funktioniert einwandfrei. OPNsense vermittelt L7 Anfragen auf allen Subdomains elegant an die isolierten Backends.</p>
                    <p className="font-serif text-stone-200 text-lg">
                      Wir sind bereit für <strong className="text-emerald-400 font-medium">Part 6: OOB Remote Access via WireGuard VPN</strong>.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-700/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekt/security/opnsense/part-4" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Part 04 · IDS/IPS &amp; SIEM
            </Link>
            <Link to="/projekt/security/opnsense/part-6" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Weiter (Finale)</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 06 · <span className="italic text-emerald-400 font-light">VPN &amp; Bastion Host</span>
                </div>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-600 flex items-center justify-center group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-stone-900 transition-all shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </section>

      </article>
    </Layout>
  );
};

export default ProjektOPNsensePart5;
