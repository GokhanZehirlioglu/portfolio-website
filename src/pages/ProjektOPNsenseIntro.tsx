import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Download,
  Network,
  Shield,
  Maximize2,
  ChevronRight,
  Activity,
  Layers,
  Lock,
  Globe,
  Server,
  Cpu,
  Radio,
  Eye,
} from "lucide-react";

// ─── Part Navigator Data ───────────────────────────────────────────────────────
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
  hero: "/Opnsense/Foto's/General übersicht.png",
};

// ─── Reusable clickable photo ──────────────────────────────────────────────────
const Photo = ({ src, alt, caption, onClick, className = "" }: { src: string; alt: string; caption?: string; onClick: () => void; className?: string }) => (
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

// ─── Main Component ────────────────────────────────────────────────────────────
const ProjektOPNsenseIntro = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const zoom = (src: string) => () => setZoomedImage(src);

  const milestones = [
    { icon: Server,      title: "Hardware & Virtualisierung", desc: "Proxmox-Hypervisor, 4-NIC Host, NUC Bastion, Raspberry Pi 5 Server" },
    { icon: Shield,      title: "OPNsense Firewall", desc: "Virtuelle NVA mit UEFI, AES-NI Passthrough, VirtIO Multiqueue" },
    { icon: Network,     title: "VLAN-Segmentierung", desc: "4 Zonen (LAN, Home, IoT, Server) mit 802.1Q Trunking und Zero-Trust" },
    { icon: Eye,         title: "IDS/IPS — Suricata & Wazuh", desc: "Deep Packet Inspection, SIEM-Korrelation, automatisierte Alerts" },
    { icon: Globe,       title: "DNS & Reverse Proxy", desc: "Unbound DNS (*.home.internal), Nginx Plugin als Single Entry Point" },
    { icon: Lock,        title: "VPN & Bastion Host", desc: "WireGuard Road-Warrior, NUC OOB-Monitoring, Uptime Kuma, Full Validation" },
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

  return (
    <Layout>
      <Helmet>
        <title>Enterprise Security Lab — Projektübersicht | OPNsense</title>
        <meta name="description" content="Gesamtübersicht über das 6-teilige Enterprise Security Lab mit OPNsense, Proxmox, Suricata, Wazuh und WireGuard." />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
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
            <span className="text-white">Projektübersicht</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Radio className="w-3 h-3" />
            Enterprise Security Lab
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Enterprise Security<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              Lab: OPNsense
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Ein vollständiges, 6-teiliges Cloud-Security-Projekt: Vom physischen Netzwerkaufbau über
            Firewall-Härtung, VLAN-Isolation und IDS/IPS bis hin zu VPN-Fernzugriff und
            Architekturvalidierung — dokumentiert, getestet und betriebsbereit.
          </p>

          <p className="text-xs text-slate-500 font-mono mb-2">Gokhan Zehirlioglu · Fachinformatiker für Systemintegration · April 2026</p>
        </div>
      </section>

      {/* ═══════════════════════ PART-NAVIGATOR (STICKY) ═══════════════════════ */}
      <div className="sticky top-[73px] z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold hidden md:block">Navigator</span>
          {parts.map((p) => (
            <Link
              key={p.num}
              to={p.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all whitespace-nowrap ${
                p.num === 0
                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"
                  : "bg-slate-900 text-blue-400 border-blue-900/50 hover:bg-slate-800"
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.num === 0 ? "bg-emerald-500 text-slate-950" : "bg-slate-800"}`}>
                {p.num === 0 ? "★" : p.num}
              </div>
              <span className="hidden sm:inline-block opacity-90">{p.short}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-300 min-h-screen">
        {/* ═══════════════════════ ARCHITECTURE OVERVIEW ═══════════════════════ */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-emerald-500 font-mono text-xl">01</span>
            <h2 className="text-3xl font-bold text-white">Architektur & Zielsetzung</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Das Ziel dieses Projekts war der Aufbau eines <strong className="text-white">Cloud Security Labs</strong> in
                einer realen Homelab-Umgebung. Der Kern: Eine <strong className="text-white">OPNsense-Firewall</strong> als
                zentrale Sicherheitsinstanz, die sämtlichen Netzwerkverkehr kontrolliert, analysiert und filtert.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Von der physischen Verkabelung über die Virtualisierung mit <strong className="text-white">Proxmox</strong>,
                der Netzwerksegmentierung mit <strong className="text-white">VLANs</strong>, der Bedrohungserkennung mit
                <strong className="text-white"> Suricata & Wazuh</strong>, bis hin zum sicheren Fernzugriff per
                <strong className="text-white"> WireGuard VPN</strong> — jede Schicht wurde einzeln implementiert,
                dokumentiert und validiert.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Das Ergebnis ist eine <strong className="text-white">Zero-Trust-Architektur</strong> mit vollständiger
                VLAN-Isolation, Echtzeit-Monitoring (Uptime Kuma, Homepage Dashboard), IDS/IPS-Analyse und einem
                physisch getrennten Bastion-Host für Out-of-Band Management.
              </p>
            </div>
            <div>
              <Photo
                src={FOTO.hero}
                alt="Enterprise Security Lab — Gesamtarchitektur"
                caption="Gesamtarchitektur: Enterprise Security Lab mit OPNsense"
                onClick={zoom(FOTO.hero)}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════ 6-PART MILESTONES ═══════════════════════ */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-emerald-500 font-mono text-xl">02</span>
            <h2 className="text-3xl font-bold text-white">Was wurde aufgebaut?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <Link
                key={i}
                to={parts[i + 1].path}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <m.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase">Part {i + 1}</span>
                </div>
                <h3 className="text-white font-bold mb-2 group-hover:text-emerald-400 transition-colors">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                <ArrowRight className="w-4 h-4 text-emerald-500 mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ SKILLS GAINED ═══════════════════════ */}
        <section className="py-20 px-4 max-w-5xl mx-auto border-b border-white/5">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-mono text-xl">03</span>
                <h2 className="text-3xl font-bold text-white">Erlernte Skills</h2>
              </div>
              <div className="space-y-2">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-emerald-500 font-mono text-xl">04</span>
                <h2 className="text-3xl font-bold text-white">Projektziel</h2>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 mb-6">
                <p className="text-slate-400 leading-relaxed mb-4">
                  Als angehender <strong className="text-white">Fachinformatiker für Systemintegration</strong> mit
                  Fokus auf <strong className="text-white">Cloud & Cybersecurity</strong> war mein Ziel, ein
                  praxisnahes Security Lab aufzubauen, das reale Enterprise-Szenarien abbildet.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Dieses Projekt demonstriert die Fähigkeit, eine komplette Sicherheitsinfrastruktur
                  eigenständig zu planen, zu implementieren und zu validieren — von Layer 1 (Kabel)
                  bis Layer 7 (Application Proxy).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-full text-white">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Projekt Status: Abgeschlossen</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      6 Parts · 65+ Screenshots · Vollständige Dokumentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ NAVIGATION ═══════════════════════ */}
        <section className="py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-10 text-slate-400 text-sm max-w-2xl mx-auto">
            Bereit, in die Tiefe zu gehen? Starte mit Part 1 und folge der Implementierung Schritt für Schritt.
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4">
            <Link
              to="/projekt/security/opnsense/part-1"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/2 border border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all group text-center"
            >
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Los geht's</p>
              <p className="text-sm font-bold text-white">Part 1 — Netzwerk & Virtualisierung</p>
              <ArrowRight className="w-5 h-5 text-emerald-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/projekte"
              className="flex flex-col items-center justify-center p-5 rounded-2xl w-full md:w-1/2 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all group text-center"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Zurück zu</p>
              <p className="text-sm font-bold text-white">Alle Projekte</p>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektOPNsenseIntro;
