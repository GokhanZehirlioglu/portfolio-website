import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import {
  Calendar,
  Server as ServerIcon,
  CheckCircle2,
  ArrowRight,
  FileText,
  Download,
  Terminal,
  Globe,
  ShieldCheck,
  Activity,
  Maximize2,
  Lock,
  Shield,
  Wifi,
  Network,
  Key,
  Eye,
  Layers
} from "lucide-react";

const ProjektOpenVPN = () => {
  // --- STATE: LIGHTBOX ---
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);

  // --- PROJEKT-STATISTIKEN ---
  const stats = [
    { icon: Calendar, label: "Datum", value: "18.02.2026" },
    { icon: ServerIcon, label: "Hardware", value: "Raspberry Pi 5" },
    { icon: Shield, label: "Sicherheit", value: "7-Schichten" },
    { icon: CheckCircle2, label: "Status", value: "Aktiv (Produktiv)", highlight: true },
  ];

  // --- TECH STACK ---
  const techStack = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", title: "Raspberry Pi OS", desc: "Host System" },
    { icon: "https://cdn.simpleicons.org/openvpn/EA7E20", title: "OpenVPN", desc: "VPN Server" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", title: "UFW / iptables", desc: "Firewall" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ssh/ssh-original.svg", title: "SSH", desc: "Remote Admin" },
  ];

  // --- SICHERHEITSSCHICHTEN ---
  const securityLayers = [
    { nr: "1", title: "Portweiterleitung", desc: "Nur UDP 1194 exponiert – Minimale Angriffsfläche nach außen.", icon: Globe },
    { nr: "2", title: "TLS + AES-128-GCM", desc: "Verschlüsselter Tunnel mit modernem GCM-Modus für Integrität.", icon: Lock },
    { nr: "3", title: "Zertifikat-Auth", desc: "Strenge Authentifizierung: Nur Geräte mit validem Client-Zertifikat.", icon: Key },
    { nr: "4", title: "TLS-crypt-v2", desc: "Verschleiert den TLS-Handshake, um Deep Packet Inspection zu umgehen.", icon: Eye },
    { nr: "5", title: "UFW Firewall", desc: "Default Deny Policy: Alles blockiert, außer explizit erlaubtem Traffic.", icon: Shield },
    { nr: "6", title: "Dienste-Minimierung", desc: "SSH und andere Dienste lauschen nicht auf dem öffentlichen Interface.", icon: Layers },
    { nr: "7", title: "Fail2ban", desc: "Automatische IP-Sperrung bei wiederholten fehlgeschlagenen Verbindungsversuchen.", icon: ShieldCheck },
  ];

  // --- VPN-KONFIGURATION ---
  const vpnConfig = [
    { param: "Transport", value: "UDP" },
    { param: "Port", value: "1194" },
    { param: "Gerätemodus", value: "TUN (Layer 3)" },
    { param: "VPN-Subnetz", value: "10.8.0.0/24" },
    { param: "Verschlüsselung", value: "AES-128-GCM" },
    { param: "TLS-Schutz", value: "TLS-crypt-v2" },
    { param: "Tunnelmodus", value: "Full-Tunnel" },
  ];

  // --- UFW OUTPUT ---
  const ufwOutput = `Status: active

To                         Action      From
--                         ------      ----
1194/udp                   ALLOW       Anywhere
22/tcp                     ALLOW       192.168.0.0/24
22/tcp                     ALLOW       10.8.0.0/24`;

  // Thema-Farbe: Amber/Orange für VPN-Sicherheit
  const C = "#E67E22"; // Hauptfarbe

  return (
    <Layout>
      <Helmet>
        <title>OpenVPN Gateway – Gökhan Zehirlioglu</title>
        <meta name="description" content="OpenVPN-Gateway auf Raspberry Pi 5: Sichere Fernzugriffsarchitektur mit 7-Schichten-Sicherheit." />
        <meta property="og:title" content="OpenVPN Gateway – Gökhan Zehirlioglu" />
        <meta property="og:description" content="OpenVPN-Gateway auf Raspberry Pi 5: Sichere Fernzugriffsarchitektur mit 7-Schichten-Sicherheit." />
        <meta property="og:type" content="article" />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />

      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#E67E22]/5 to-transparent relative overflow-hidden">
        {/* Hintergrund-Effekte */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#E67E22]/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/10 border border-[#E67E22]/20 text-[#E67E22] text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E67E22]"></span>
            </span>
            Netzwerksicherheit Projekt
          </div>

          <h1 className="flex flex-col items-center justify-center font-bold tracking-tight mb-8">
            <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#E67E22] via-amber-600 to-slate-700 dark:to-slate-300 pb-2">
              OpenVPN Gateway
            </span>
            <span className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium mt-2">
              auf Raspberry Pi 5
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Sichere Fernzugriffsarchitektur mit Defense-in-Depth-Modell
            für eine Heim-Infrastruktur – 7 Sicherheitsschichten, ein exponierter Port.
          </p>

          {/* DOKUMENT-DOWNLOAD */}
          <div className="flex justify-center mb-16">
            <a
              href="/OpenVPN_Gateway_Raspberry_Pi5_Dokumentation.docx"
              download
              className="
                group relative inline-flex items-center gap-4 px-8 py-4 
                rounded-2xl overflow-hidden transition-all duration-300
                bg-white dark:bg-slate-900 
                border border-[#E67E22]/30 hover:border-[#E67E22]
                shadow-[0_0_20px_-5px_rgba(230,126,34,0.3)] hover:shadow-[0_0_30px_-5px_rgba(230,126,34,0.6)]
                hover:-translate-y-1
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22]/0 via-[#E67E22]/5 to-[#E67E22]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <div className="bg-[#E67E22]/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-[#E67E22]" />
              </div>

              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest uppercase text-[#E67E22]">
                  Technische Dokumentation
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  Projektbericht herunterladen (.DOCX)
                </span>
              </div>

              <Download className="w-5 h-5 ml-2 text-slate-400 group-hover:text-[#E67E22] transition-colors" />
            </a>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass p-4 rounded-2xl border border-white/10 dark:border-white/5 hover:border-[#E67E22]/30 transition-colors duration-300">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-[#E67E22]" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-bold text-lg ${stat.highlight ? "text-[#E67E22] dark:text-amber-400" : "text-foreground"}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ AUSGANGSLAGE & ARCHITEKTUR ═══════════════════════ */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-[#E67E22]/10 text-[#E67E22]"><Network size={24} /></span>
              Ausgangslage & Strategie
            </h2>

            <div className="prose dark:prose-invert text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Mit der Erweiterung meiner Heim-Infrastruktur um Dienste wie <strong>Home Assistant</strong>,
                einen <strong>MQTT-Broker</strong> und <strong>InfluxDB</strong> entstand die Notwendigkeit,
                diese Ressourcen auch von unterwegs sicher erreichen zu können. Eine einfache Portweiterleitung
                für jeden Dienst kam aus Sicherheitsgründen nicht in Frage, da dies die Angriffsfläche massiv
                erhöht hätte.
              </p>
              <p className="mb-4">
                Die Lösung ist ein zentrales <strong>VPN-Gateway nach Unternehmensstandard</strong>.
                Anstatt mehrere Tore in die Firewall zu bohren, wurde ein einziger, stark gesicherter
                Zugangspunkt geschaffen. Durch den Einsatz von <strong>OpenVPN</strong> auf einem energieeffizienten
                Raspberry Pi 5 wird eine verschlüsselte Verbindung (Tunnel) aufgebaut, die es ermöglicht,
                sich im öffentlichen Netz so zu bewegen, als wäre man direkt per Kabel im Heimnetzwerk angeschlossen.
              </p>
              <p>
                Das Architektur-Design folgt strikt dem <strong>Privilege-Separation-Prinzip</strong>.
                Der Raspberry Pi fungiert als "Gatekeeper": Er prüft eingehende Verbindungen rigoros,
                bevor auch nur ein Datenpaket das interne Netz erreicht.
              </p>
            </div>

            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E67E22] mt-1 flex-shrink-0" />
                <div>
                  <strong>Zero-Exposure:</strong>
                  <p className="text-sm text-muted-foreground">Kein interner Dienst (außer dem VPN-Port selbst) ist direkt aus dem Internet erreichbar.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E67E22] mt-1 flex-shrink-0" />
                <div>
                  <strong>Full-Tunnel Routing:</strong>
                  <p className="text-sm text-muted-foreground">Im VPN-Modus wird der gesamte Traffic verschlüsselt, was auch in unsicheren öffentlichen WLANs Sicherheit bietet.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E67E22] mt-1 flex-shrink-0" />
                <div>
                  <strong>Zertifikatsbasierte Identität:</strong>
                  <p className="text-sm text-muted-foreground">Jedes Gerät (Laptop, Smartphone) benötigt ein eigenes, kryptografisches Zertifikat für den Zugriff.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 📸 FOTO 1: VPN-Verbindung (z.B. iPhone/Laptop OpenVPN Connect App – Connected) */}
          <div
            className="relative group cursor-zoom-in"
            onClick={() => setZoomedImage("/images/openvpn-foto1.png")}
          >
            <div className="absolute inset-0 bg-[#E67E22]/20 blur-2xl rounded-3xl -z-10 group-hover:bg-[#E67E22]/30 transition-all duration-500" />
            <div className="glass overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="bg-[#1a1b26] p-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-xs text-slate-500 font-mono ml-2">VPN Connection – Active</div>
                </div>
                <Maximize2 size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <img
                src="/images/openvpn-foto1.png"
                alt="OpenVPN Verbindung aktiv"
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Abbildung: Aktive OpenVPN-Verbindung im Client-Dashboard
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7-SCHICHTEN SICHERHEIT ═══════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-[#E67E22]" />
              Defense-in-Depth: 7 Sicherheitsschichten
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sicherheit entsteht nicht durch ein einzelnes Feature, sondern durch gestaffelte Verteidigungslinien.
              Dieses Projekt implementiert das <strong>Defense-in-Depth</strong> Konzept: Selbst wenn ein Angreifer
              eine Barriere überwinden sollte, steht er vor der nächsten. Jede Schicht schützt unabhängig.
            </p>
          </div>

          {/* Security Layer Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {securityLayers.map((layer) => (
              <div
                key={layer.nr}
                className="group relative glass p-4 rounded-xl border border-white/10 hover:border-[#E67E22]/40 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#E67E22] text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {layer.nr}
                </div>
                <layer.icon className="w-6 h-6 mx-auto mb-2 text-[#E67E22] group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold mb-1">{layer.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ KONFIGURATION & FIREWALL ═══════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Konfiguration & Firewall</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Die technische Umsetzung basiert auf bewährten Standards. Als Protokoll wurde <strong>UDP</strong> gewählt,
              da es für VPN-Tunnel performanter ist als TCP (kein TCP-Meltdown-Problem). Der Port <strong>1194</strong> ist
              Standard, kann aber zur Obfuskation verschoben werden.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Die Firewall-Regeln (UFW) sind restriktiv: Eingehender Verkehr wird standardmäßig blockiert ("Default Deny").
              Lediglich der OpenVPN-Port ist aus dem Internet erreichbar. SSH-Zugriff ist nur aus dem lokalen Netz erlaubt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LINKS: VPN-Konfiguration */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-white/10 font-mono text-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Lock size={16} className="text-[#E67E22]" />
                  <span>server.conf – Kernparameter</span>
                </div>
                <div className="text-xs text-slate-500">OpenVPN</div>
              </div>
              <div className="p-5 space-y-2">
                {vpnConfig.map((item) => (
                  <div key={item.param} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-400 text-xs">{item.param}</span>
                    <span className="text-amber-400 text-xs font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RECHTS: UFW Terminal */}
            <div className="flex flex-col gap-6">
              <div className="rounded-xl overflow-hidden shadow-xl bg-black border border-white/10 font-mono text-xs md:text-sm">
                <div className="flex items-center px-4 py-2 bg-slate-800/50 border-b border-white/5">
                  <Terminal size={14} className="text-slate-400 mr-2" />
                  <span className="text-slate-400">ufw status verbose</span>
                </div>
                <div className="p-4 text-green-400">
                  <div className="mb-2">
                    <span className="text-blue-400">lgbeta@raspberrypi:~ $</span> sudo ufw status verbose
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap text-xs">{ufwOutput}</pre>
                </div>
              </div>

              {/* 📸 FOTO 2: UFW/Firewall Screenshot oder Terminal-Ausgabe */}
              <div
                className="rounded-xl overflow-hidden shadow-xl border border-[#E67E22]/30 group cursor-zoom-in relative"
                onClick={() => setZoomedImage("/images/openvpn-foto2.png")}
              >
                <div className="flex items-center justify-between px-4 py-2 bg-amber-950/30 border-b border-[#E67E22]/20">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span className="text-xs text-amber-400 font-bold uppercase">Firewall Verification</span>
                  </div>
                  <Maximize2 size={12} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <img
                  src="/images/openvpn-foto2.png"
                  alt="UFW Firewall Status"
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NETZWERK-DIAGRAMM ═══════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 mb-4">
              <Wifi className="w-7 h-7 text-[#E67E22]" />
              Netzwerk-Topologie
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Die folgende Übersicht zeigt den Datenfluss vom externen Client bis ins interne LAN.
              Der Raspberry Pi übernimmt dabei das <strong>Routing</strong>. Die Clients erhalten eine IP aus dem
              virtuellen Subnetz <code>10.8.0.0/24</code> und werden über NAT ins Heimnetz <code>192.168.0.0/24</code> maskiert.
            </p>
          </div>

          {/* Netzwerk-Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-8">
            {[
              { label: "Internet", sub: "Öffentliche IPv4", color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400" },
              { label: "Router", sub: "NAT / UDP 1194", color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400" },
              { label: "Raspberry Pi 5", sub: "OpenVPN Gateway", color: "bg-[#E67E22]/10 border-[#E67E22]/30 text-[#E67E22]" },
              { label: "Internes LAN", sub: "192.168.0.0/24", color: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" },
            ].map((node, i) => (
              <React.Fragment key={node.label}>
                {i > 0 && <ArrowRight className="text-muted-foreground w-5 h-5 rotate-90 md:rotate-0 flex-shrink-0" />}
                <div className={`px-5 py-3 rounded-xl border text-center min-w-[140px] ${node.color}`}>
                  <p className="font-bold text-sm">{node.label}</p>
                  <p className="text-[10px] opacity-75">{node.sub}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Zugangsmatrix */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#E67E22] text-white">
                  <th className="px-4 py-3 text-left font-bold">Dienst</th>
                  <th className="px-4 py-3 text-center font-bold">Internet</th>
                  <th className="px-4 py-3 text-center font-bold">LAN</th>
                  <th className="px-4 py-3 text-center font-bold">VPN</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "OpenVPN (1194/udp)", internet: true, lan: true, vpn: true },
                  { name: "SSH (22/tcp)", internet: false, lan: true, vpn: true },
                  { name: "Home Assistant (8123)", internet: false, lan: true, vpn: true },
                  { name: "MQTT (1883)", internet: false, lan: true, vpn: true },
                  { name: "InfluxDB (8086)", internet: false, lan: true, vpn: true },
                ].map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-2.5 font-medium">{row.name}</td>
                    {[row.internet, row.lan, row.vpn].map((access, j) => (
                      <td key={j} className="px-4 py-2.5 text-center">
                        {access
                          ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold">✓</span>
                          : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">✕</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Die Matrix zeigt deutlich: Nur der VPN-Dienst selbst ist öffentlich exponiert. Alle anderen Dienste sind geschützt
            und erst <em>nach</em> erfolgreichem VPN-Tunnelbau erreichbar.
          </p>
        </div>
      </section>

      {/* ═══════════════════════ VALIDIERUNG ═══════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#E67E22]/10 p-3 rounded-full">
              <Activity className="w-8 h-8 text-[#E67E22]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Validierung & Testing</h2>
              <p className="text-muted-foreground">Systemprüfung: Alle Komponenten verifiziert und funktional.</p>
            </div>
          </div>

          {/* 📸 FOTO 3: VPN Connected Screenshot (z.B. iPhone zeigt "Connected" + IP 10.8.0.x) */}
          <div
            className="relative group rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1b26] cursor-zoom-in mb-8"
            onClick={() => setZoomedImage("/images/openvpn-foto3.png")}
          >
            {/* Browser/App Header */}
            <div className="bg-slate-100 dark:bg-[#24283b] px-4 py-3 flex items-center gap-4 border-b border-slate-200 dark:border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="flex-1 bg-white dark:bg-[#1a1b26] rounded-md px-3 py-1.5 text-xs md:text-sm text-center font-mono text-[#E67E22] flex items-center justify-center gap-2 shadow-inner">
                <Lock size={12} className="text-green-500" />
                <span>VPN Connected – 10.8.0.2</span>
              </div>
              <Maximize2 size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-slate-50 dark:bg-[#1a1b26] p-4 text-sm text-muted-foreground border-b border-slate-200 dark:border-white/5">
              <p>
                Mit einer aktiven VPN-Verbindung wird das Endgerät Teil des lokalen Netzwerks.
                Interne Dienste, die nicht im Internet freigegeben sind (wie Home Assistant),
                können sicher über ihre lokale IP-Adresse aufgerufen werden, als wäre man zu Hause.
              </p>
            </div>

            <div className="relative aspect-video bg-slate-50">
              <img
                src="/images/openvpn-foto3.png"
                alt="VPN Verbindung erfolgreich"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border border-white/20 shadow-lg translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <div className="font-bold text-green-400 mb-1">VPN: Connected</div>
                <div className="text-slate-300">Tunnel: Full-Tunnel</div>
              </div>
            </div>
          </div>

          {/* Erfolgskriterien */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "OpenVPN-Dienst läuft (active/running)",
              "UFW aktiv mit korrekten Regeln",
              "Nur UDP 1194 dem Internet exponiert",
              "SSH auf LAN + VPN beschränkt",
              "Fail2ban überwacht SSH",
              "TUN0-Schnittstelle aktiv",
              "Clients verbinden sich erfolgreich",
              "Interne Dienste über VPN erreichbar",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {techStack.map((tech) => (
              <div key={tech.title} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-[#E67E22]/30 transition-colors">
                <img src={tech.icon} alt={tech.title} className="w-8 h-8 mb-2 opacity-80" />
                <span className="text-sm font-semibold">{tech.title}</span>
                <span className="text-[10px] text-muted-foreground">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAZIT & AUSBLICK ═══════════════════════ */}
      <section className="py-12 px-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Fazit & Ausblick</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Das Projekt demonstriert eine gehärtete Fernzugriffsarchitektur nach Unternehmensstandard
            auf einem Einplatinencomputer. Die Kombination aus verschlüsseltem Tunneling, Firewall-Durchsetzung
            und Dienstminimierung erreicht ein professionelles Sicherheitsniveau.
          </p>

          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#E67E22] bg-[#E67E22]/10 px-4 py-2 rounded-full">
            <span>Nächster Schritt:</span>
            <span className="text-foreground">Proxmox-Virtualisierung & Netzwerksegmentierung</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektOpenVPN;
