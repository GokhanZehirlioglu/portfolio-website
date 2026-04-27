import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  ArrowRight,
  Network,
  Server,
  ShieldCheck,
  Home,
  Terminal,
  Award,
  BookOpen,
  Cpu,
  Globe,
  Layers,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const certs = [
  { name: "MS Azure Administrator", code: "AZ-104", color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", text: "text-blue-400" },
  { name: "MS Windows Server 2022 & PowerShell", code: "MCSA", color: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/30", text: "text-cyan-400" },
  { name: "Linux Essentials", code: "LPI LE-1", color: "from-yellow-500/20 to-yellow-600/10", border: "border-yellow-500/30", text: "text-yellow-400" },
  { name: "ITIL v4 Foundation", code: "ITIL v4", color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", text: "text-purple-400" },
];

const badges = [
  "CCNA: Introduction to Networks",
  "Cisco Networking Basics",
  "Cisco Operating Systems Support",
  "Cisco Security & Connectivity",
  "Cisco Introduction to IoT",
  "Industrial Networking Essentials",
  "Industrial Cybersecurity Essential",
  "Linux Unhatched",
];

const projectGroups = [
  {
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    label: "Enterprise Security Lab",
    count: 6,
    description: "6-teiliges OPNsense-Projekt: Proxmox, VLAN-Segmentierung, Suricata IDS/IPS, Wazuh SIEM, WireGuard VPN.",
    link: "/projekt/security/opnsense",
    tag: "Flagship",
  },
  {
    icon: Home,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20 hover:border-orange-500/50",
    label: "Homelab Infrastruktur",
    count: 5,
    description: "Raspberry Pi 5, Docker-Stack, Nginx Reverse Proxy, Cloudflare Tunnel, SSD-Upgrade & Home Assistant.",
    link: "/projekte",
    tag: null,
  },
  {
    icon: Server,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-500/50",
    label: "Windows Server & Active Directory",
    count: 5,
    description: "AD-Setup, DHCP/DNS, RBAC & GPO, Endpoint Hardening, Enterprise Storage mit FSRM & VSS.",
    link: "/projekte/windows",
    tag: null,
  },
  {
    icon: Terminal,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20 hover:border-yellow-500/50",
    label: "Linux Challenge Labs",
    count: 4,
    description: "User Management, Bash Scripting & Automation, Log Archiving, Text Processing Pipelines.",
    link: "/projekte/linux",
    tag: null,
  },
  {
    icon: Network,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    label: "Cisco Networking Labs",
    count: 2,
    description: "Packet Tracer: Router-Grundkonfiguration mit IPv4/IPv6 & SSH, VLAN-Segmentierung & Trunking.",
    link: "/projekte/cisco",
    tag: null,
  },
  {
    icon: Globe,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20 hover:border-rose-500/50",
    label: "Cloud & VPN",
    count: 1,
    description: "OpenVPN Gateway auf Raspberry Pi 5 mit Defense-in-Depth-Modell, 7 Sicherheitsschichten.",
    link: "/projekte",
    tag: null,
  },
];

const focus = [
  {
    icon: Cpu,
    label: "Microsoft Azure",
    sub: "AZ-104 Vorbereitung",
    progress: 75,
    color: "bg-blue-500",
  },
  {
    icon: ShieldCheck,
    label: "Cloud Security",
    sub: "Zero-Trust & SIEM-Architekturen",
    progress: 60,
    color: "bg-emerald-500",
  },
  {
    icon: Layers,
    label: "Homelab Ausbau",
    sub: "Weitere Enterprise-Simulationen",
    progress: 85,
    color: "bg-orange-500",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const UeberMich: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Über mich | Gökhan Zehirlioglu</title>
        <meta
          name="description"
          content="Angehender Fachinformatiker für Systemintegration — ich lerne durch Bauen: Enterprise Security Labs, Homelab, Cloud & Security."
        />
      </Helmet>

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        {/* background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-orange-500/5 blur-[120px]" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* label */}
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase font-mono text-muted-foreground mb-8">
            <BookOpen className="w-3 h-3 text-orange-400" />
            Fachinformatiker Ausbildung · Jahrgang 2024
          </span>

          {/* headline */}
          <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1] mb-8">
            Ich lerne nicht durch<br />
            Zuschauen —{" "}
            <span className="italic font-light text-orange-400 font-serif">
              ich baue.
            </span>
          </h1>

          {/* body */}
          <div className="space-y-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            <p>
              Meine Ausbildung zum Fachinformatiker für Systemintegration gibt mir das Fundament.
              Aber was mich wirklich antreibt, passiert abends im Homelab: echte Enterprise-Architekturen
              aufbauen, sichern, dokumentieren — und verstehen, <em className="text-foreground not-italic font-medium">warum</em> etwas funktioniert.
            </p>
            <p>
              Über <span className="text-foreground font-semibold">20+ Projekte</span> in Networking, Windows Server,
              Linux, Cloud Security und Homelab-Infrastruktur — alle selbst konzipiert, aufgebaut und dokumentiert.
              Kein Tutorial-Klonen, sondern echte Problemlösung.
            </p>
          </div>

          {/* quick stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "23+", label: "Projekte" },
              { n: "4", label: "Zertifikate" },
              { n: "8", label: "Cisco Badges" },
              { n: "24/7", label: "Home Server" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-muted/30 border border-border rounded-2xl p-5 text-center hover:border-orange-500/30 transition-colors"
              >
                <div className="text-3xl font-black text-foreground">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1 tracking-wide uppercase font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WAS ICH GEBAUT HABE ───────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">Projektarbeit</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Was ich gebaut habe</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectGroups.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.label}
                  to={g.link}
                  className={`group relative flex flex-col gap-4 p-6 rounded-2xl border bg-muted/20 ${g.border} transition-all duration-300 hover:bg-muted/40`}
                >
                  {g.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {g.tag}
                    </span>
                  )}
                  <div className={`${g.bg} w-11 h-11 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${g.color}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-foreground">{g.label}</h3>
                      <span className={`text-xs font-mono ${g.color}`}>{g.count} Proj.</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${g.color} mt-auto opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Ansehen <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ZERTIFIKATE & BADGES ──────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">Qualifikationen</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Zertifikate & Badges</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Certs */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-widest">Offizielle Zertifikate</span>
              </div>
              <div className="flex flex-col gap-3">
                {certs.map((c) => (
                  <div
                    key={c.code}
                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${c.color} border ${c.border}`}
                  >
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <span className={`text-xs font-mono font-bold ${c.text} shrink-0 ml-3`}>{c.code}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Network className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-foreground uppercase tracking-widest">Cisco Networking Academy</span>
              </div>
              <div className="flex flex-col gap-2">
                {badges.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. AKTUELLER FOKUS ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">Derzeit</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Aktueller Fokus</h2>
          </div>

          <div className="flex flex-col gap-6">
            {focus.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-start gap-5">
                  <div className="bg-muted/30 border border-border w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-semibold text-foreground">{f.label}</span>
                      <span className="text-xs text-muted-foreground font-mono">{f.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${f.color} rounded-full`}
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Alles in einem Ort
          </h2>
          <p className="text-muted-foreground mb-8">
            Alle Projekte sind vollständig dokumentiert — von der Architekturentscheidung bis zur finalen Konfiguration.
          </p>
          <Link
            to="/projekte"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity group"
          >
            Alle Projekte ansehen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default UeberMich;
