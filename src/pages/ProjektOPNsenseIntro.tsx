import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  ChevronLeft,
} from "lucide-react";

const parts = [
  {
    num: 1,
    title: "Netzwerk-Aufbau & Virtualisierung",
    subtitle: "Hardware, Proxmox-Hypervisor, Bridge-Design",
    path: "/projekt/security/opnsense/part-1",
    thumb: "/Opnsense/Foto's/Part 1 deckel FOTO.png",
  },
  {
    num: 2,
    title: "Firewall-Installation & Optimierung",
    subtitle: "OPNsense als Network Virtual Appliance",
    path: "/projekt/security/opnsense/part-2",
    thumb: "/Opnsense/Foto's/Part 2 deckel FOTO.png",
  },
  {
    num: 3,
    title: "VLAN-Segmentierung & Firewall-Regeln",
    subtitle: "Zero-Trust in vier Sicherheitszonen",
    path: "/projekt/security/opnsense/part-3",
    thumb: "/Opnsense/Foto's/Part 3 deckel FOTO.png",
  },
  {
    num: 4,
    title: "Bedrohungserkennung & Log-Management",
    subtitle: "Suricata IDS · Wazuh SIEM-Pipeline",
    path: "/projekt/security/opnsense/part-4",
    thumb: "/Opnsense/Foto's/part4 .png",
  },
  {
    num: 5,
    title: "Netzwerkdienste & Reverse Proxy",
    subtitle: "Unbound DNS · Nginx als Single Entry Point",
    path: "/projekt/security/opnsense/part-5",
    thumb: "/Opnsense/Foto's/part5.png",
  },
  {
    num: 6,
    title: "Fernzugriff & Systemvalidierung",
    subtitle: "WireGuard VPN · NUC Bastion · Full Validation",
    path: "/projekt/security/opnsense/part-6",
    thumb: "/Opnsense/Foto's/part6.png",
  },
];

const HERO_FOTO = "/Opnsense/Foto's/General übersicht.png";

const stats = [
  { value: "06", label: "Implementierungs-Etappen" },
  { value: "04", label: "VLAN-Sicherheitszonen" },
  { value: "65+", label: "Dokumentations-Screenshots" },
  { value: "L1→L7", label: "Defense-in-Depth Tiefe" },
];

const skills = [
  "Netzwerk-Design & VLAN-Architektur",
  "Firewall-Konfiguration (ACL, NAT, Zero-Trust)",
  "Intrusion Detection & Prevention (Suricata)",
  "SIEM-Integration (Wazuh + Syslog Pipeline)",
  "DNS-Management (Unbound, Domain Overrides)",
  "Reverse Proxy & TLS-Terminierung (Nginx)",
  "VPN-Tunneling (WireGuard, Split-Tunneling)",
  "Infrastruktur-Monitoring (Uptime Kuma, Grafana)",
  "Docker & Container-Orchestrierung",
  "Out-of-Band Management & Disaster Recovery",
];

const ProjektOPNsenseIntro = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);

  return (
    <Layout>
      <Helmet>
        <title>Enterprise Security Lab — OPNsense | Gokhan Zehirlioglu</title>
        <meta name="description" content="Editorial-Studie: Aufbau eines sechsteiligen Cloud-Security-Labs mit OPNsense, Proxmox, Suricata, Wazuh und WireGuard." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      <article className="bg-stone-800 text-stone-200 selection:bg-emerald-400/20 selection:text-emerald-50">

        <header className="relative px-6 pt-20 pb-28 md:pt-28 md:pb-40">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-3 text-[13px] tracking-[0.3em] uppercase text-stone-300 font-mono mb-16">
              <Link to="/projekte" className="hover:text-stone-200 transition-colors">Projekte</Link>
              <span className="text-stone-700">/</span>
              <span className="text-stone-300">Cloud &amp; CyberSec</span>
            </nav>

            <div className="flex items-center gap-4 text-[13px] tracking-[0.3em] uppercase text-stone-300 font-mono mb-10">
              <span className="text-emerald-400">№ 01</span>
              <span className="h-px w-12 bg-stone-800" />
              <span>Case Study · Enterprise Security Lab</span>
            </div>

            <h1 className="font-serif text-stone-50 text-[44px] sm:text-[64px] md:text-[88px] lg:text-[120px] leading-[0.92] tracking-[-0.03em] mb-12">
              Enterprise<br />
              Security <span className="italic font-light text-emerald-400">Lab</span><span className="text-stone-50">.</span>
            </h1>

            <p className="font-serif italic text-stone-300 text-xl md:text-2xl leading-snug max-w-3xl mb-16">
              Vom Homelab zur Enterprise Cloud: Die On-Premise Simulation einer vollständigen Cloud-Security-Architektur — vom Hypervisor bis zum SIEM.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl">
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Author</div>
                <div className="text-stone-200 text-sm">Gokhan Zehirlioglu</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Date</div>
                <div className="text-stone-200 text-sm">April 2026</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Role</div>
                <div className="text-stone-200 text-sm">FISI · Cloud &amp; Sec</div>
              </div>
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-2">Status</div>
                <div className="text-emerald-400 text-sm">Abgeschlossen</div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6"><div className="max-w-5xl mx-auto h-px bg-stone-800/80" /></div>

        <section className="px-6 py-24 md:py-32">
          <div className="max-w-2xl mx-auto">
            <p className="font-serif text-stone-100 text-2xl md:text-[28px] leading-[1.45] mb-10">
              <span className="float-left font-serif font-light text-emerald-400 text-[88px] leading-[0.85] mr-4 mt-1">M</span>
              ein Ziel war es nicht, ein weiteres theoretisches Cloud-Zertifikat zu bestehen. Die Intention war es, die komplexe Sicherheitsarchitektur moderner Cloud-Umgebungen wie Microsoft Azure physisch und greifbar auf meinem Schreibtisch zu simulieren.
            </p>
            <p className="text-stone-400 leading-[1.85] text-base md:text-lg mb-6">
              Dieses Homelab ist die On-Premise Rekonstruktion eines Enterprise Datacenters. Wo in der Cloud virtuelle Netzwerke (<em className="not-italic text-stone-200">VNets</em>) und Security Groups (<em className="not-italic text-stone-200">NSGs</em>) per Klick generiert werden, habe ich die zugrundeliegende Mechanik selbst entworfen: Von der Hypervisor-Isolierung mit <em className="not-italic text-stone-200">Proxmox</em> über L3-Mikrosegmentierung via <em className="not-italic text-stone-200">VLANs</em> bis hin zur Deep Packet Inspection mit <em className="not-italic text-stone-200">Suricata</em> und einem zentralen SIEM (<em className="not-italic text-stone-200">Wazuh</em>).
            </p>
            <p className="text-stone-400 leading-[1.85] text-base md:text-lg mb-6">
              Das Ergebnis ist eine Zero-Trust-Architektur mit vollständiger VLAN-Isolation, Echtzeit-Monitoring (Uptime Kuma, Homepage Dashboard), IDS/IPS-Analyse und einem physisch getrennten Bastion-Host für Out-of-Band Management.
            </p>
            <p className="text-stone-400 leading-[1.85] text-base md:text-lg">
              Das Ergebnis ist kein gewöhnliches Heimnetzwerk, sondern eine validierte Zero-Trust-Infrastruktur. Es beweist das tiefe Verständnis dafür, wie Traffic Flow, Isolation und Threat Detection auf Enterprise-Level tatsächlich funktionieren — unabhängig davon, ob die Server im eigenen Rack oder im Azure-Rechenzentrum stehen.
            </p>
          </div>
        </section>

        <figure className="px-6">
          <div onClick={() => setZoomedImage(HERO_FOTO)} className="group relative max-w-6xl mx-auto cursor-zoom-in overflow-hidden border border-stone-600/60 bg-stone-800">
            <img src={HERO_FOTO} alt="Enterprise Security Lab — Gesamtarchitektur" className="w-full h-auto block" loading="lazy" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-800/70 backdrop-blur-md border border-stone-600 rounded-full p-2.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </div>
          </div>
          <figcaption className="max-w-6xl mx-auto mt-5 font-serif italic text-stone-500 text-sm md:text-base">
            <span className="text-stone-600 not-italic font-mono text-xs tracking-widest mr-3">FIG. 01</span>
            Gesamtarchitektur des Enterprise Security Labs — Proxmox-Hypervisor, OPNsense-VM, vier VLAN-Zonen und Bastion-Host.
          </figcaption>
        </figure>

        <section className="px-6 py-28 md:py-40">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-14">By the numbers</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8">
              {stats.map((s, i) => (
                <div key={i} className="border-t border-stone-600 pt-7">
                  <div className="font-serif text-stone-50 text-5xl md:text-6xl lg:text-7xl leading-none mb-4 tracking-[-0.02em]">{s.value}</div>
                  <div className="text-[13px] tracking-[0.2em] uppercase text-stone-300 font-mono leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-4">Inhalt · Index</div>
                <h2 className="font-serif text-stone-50 text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
                  Die sechs <span className="italic text-emerald-400 font-light">Stationen</span>.
                </h2>
              </div>
              <p className="text-stone-500 text-sm md:text-base max-w-sm font-light leading-relaxed">
                Jeder Teil ist eigenständig dokumentiert — von Hardware bis Application Layer.
              </p>
            </div>

            <ol className="border-t border-stone-600/80">
              {parts.map((p) => (
                <li key={p.num} className="border-b border-stone-600/80">
                  <Link to={p.path} className="grid grid-cols-12 items-center gap-4 py-7 md:py-9 group transition-colors hover:bg-stone-800/30 px-2 -mx-2">
                    <div className="col-span-2 md:col-span-1 font-serif text-stone-500 group-hover:text-emerald-400 text-3xl md:text-5xl tabular-nums tracking-tight leading-none transition-colors">
                      {String(p.num).padStart(2, "0")}
                    </div>
                    <div className="col-span-2 md:col-span-2 hidden md:block">
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-sm border border-stone-600/60 bg-stone-800">
                        <img src={p.thumb} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" />
                      </div>
                    </div>
                    <div className="col-span-9 md:col-span-8">
                      <div className="font-serif text-stone-50 text-lg md:text-3xl leading-[1.15] tracking-[-0.01em] group-hover:text-emerald-50 transition-colors">{p.title}</div>
                      <div className="text-stone-500 text-xs md:text-sm mt-2 font-light tracking-wide">{p.subtitle}</div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-stone-600 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-32 md:py-44">
          <div className="max-w-4xl mx-auto text-center">
            <div className="font-serif text-emerald-400/40 text-[120px] md:text-[180px] leading-none mb-2 select-none -mt-12">&ldquo;</div>
            <blockquote className="font-serif text-stone-100 text-3xl md:text-5xl lg:text-[56px] leading-[1.15] tracking-[-0.02em]">
              Eine komplette Sicherheitsinfrastruktur — eigenständig <span className="italic text-emerald-400">geplant</span>, <span className="italic text-emerald-400">implementiert</span> und <span className="italic text-emerald-400">validiert</span>. Von Layer 1 bis Layer 7.
            </blockquote>
            <div className="mt-14 text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono">— Projektziel</div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-y-14 gap-x-12">
              <div className="md:col-span-4">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-5">Erworbene Kompetenzen</div>
                <h2 className="font-serif text-stone-50 text-3xl md:text-4xl leading-[1.1] tracking-[-0.02em]">
                  Was ich auf jedem <span className="italic text-emerald-400 font-light">Layer</span> gelernt habe.
                </h2>
                <p className="text-stone-500 text-sm mt-6 leading-relaxed font-light">
                  Zehn konkrete Skill-Domänen, die in den sechs Parts hands-on durchgearbeitet wurden.
                </p>
              </div>
              <div className="md:col-span-8">
                <ul className="grid sm:grid-cols-2 gap-x-10">
                  {skills.map((s, i) => (
                    <li key={i} className="border-t border-stone-600/60 py-4 flex items-baseline gap-4">
                      <span className="text-emerald-400/60 text-[13px] font-mono tabular-nums tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-stone-300 text-sm md:text-base leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-28 md:py-40 border-t border-stone-600/80">
          <div className="max-w-2xl mx-auto">
            <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-8">Schlusswort</div>
            <p className="font-serif text-stone-100 text-2xl md:text-[28px] leading-[1.45]">
              Als angehender Fachinformatiker für Systemintegration mit Fokus auf Cloud &amp; Cybersecurity wollte ich kein Tutorial nachbauen — sondern eine Infrastruktur entwerfen, die reale Enterprise-Szenarien abbildet. Dieses Projekt demonstriert die Fähigkeit, eine komplette Sicherheitsinfrastruktur eigenständig zu planen, zu implementieren und zu validieren.
            </p>
            <div className="mt-14 pt-8 border-t border-stone-600/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-serif text-stone-50 text-xl">Gokhan Zehirlioglu</div>
                <div className="text-[13px] uppercase tracking-[0.3em] text-stone-300 font-mono mt-2">FISI · Cloud &amp; Cybersecurity · April 2026</div>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[13px] uppercase tracking-[0.3em] font-mono">Status: Abgeschlossen</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24 border-t border-stone-600/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <Link to="/projekte" className="text-[13px] tracking-[0.3em] uppercase text-stone-500 hover:text-stone-100 font-mono transition-colors flex items-center gap-2 group">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              Zurück zu allen Projekten
            </Link>
            <Link to="/projekt/security/opnsense/part-1" className="group flex items-center gap-5 hover:gap-7 transition-all">
              <div className="text-right">
                <div className="text-[13px] tracking-[0.3em] uppercase text-stone-400 font-mono mb-1.5">Beginnen mit</div>
                <div className="font-serif text-stone-50 text-2xl md:text-3xl tracking-[-0.01em]">
                  Part 01 · <span className="italic text-emerald-400 font-light">Netzwerk-Aufbau</span>
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

export default ProjektOPNsenseIntro;
