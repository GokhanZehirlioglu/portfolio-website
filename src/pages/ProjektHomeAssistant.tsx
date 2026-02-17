import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import {
  Download,
  Calendar,
  Server,
  Network,
  ShieldCheck,
  TerminalSquare,
  Cpu,
  Activity,
  Lock,
  EyeOff,
  ThermometerSnowflake,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Globe,
  Maximize2,
  Wifi,
  Layers,
  Box,
  Zap,
  ToggleLeft,
  Tablet,
  Smartphone,
  LineChart
} from "lucide-react";

const ProjektHomeAssistant = () => {
  // --- STATE: LIGHTBOX (Resim Büyütme) ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  // --- KONFİGÜRASYON ---
  
  // Proje Künyesi
  const projectStats = [
    { icon: Calendar, label: "Projektzeitraum", value: "02.10.25 – 29.11.25" },
    { icon: Server, label: "Infrastruktur", value: "Raspberry Pi 5 (Docker Host)" },
    { icon: Network, label: "Netzwerk", value: "VLAN & Tailscale VPN" },
    { icon: ShieldCheck, label: "Sicherheitslevel", value: "Local Only / Zero Trust", highlight: true },
  ];

  // Donanım Spekleri (YENİ SATIR EKLENDİ)
  const hardwareSpecs = [
    { label: "Host System", value: "Raspberry Pi 5, 16GB RAM" },
    { label: "Storage", value: "SanDisk Extreme PRO microSDXC (A2)" },
    { label: "Zigbee Gateway", value: "Sonoff Zigbee 3.0 USB Dongle Plus (FW v2.6.3)" },
    { label: "OS / Kernel", value: "Debian Bookworm (Headless Optimized)" },
    // YENİ EKLENEN SATIR:
    { label: "Installierte Container", value: "Home Assistant Core, Zigbee2MQTT, Mosquitto, Tailscale" },
  ];

  // Tech Stack (DÜZELTİLDİ: Mosquitto & Zigbee Logoları)
  const techStackIcons = [
    { name: "Raspberry Pi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Home Assistant", url: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg" },
    { name: "Zigbee2MQTT", url: "https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" },
    // DÜZELTİLDİ: Mosquitto (Slug hatası giderildi)
    { name: "Mosquitto MQTT", url: "https://cdn.simpleicons.org/eclipsemosquitto/3C5280" }, 
    // DÜZELTİLDİ: Zigbee (Daha stabil kaynak)
    { name: "Zigbee", url: "https://www.vectorlogo.zone/logos/zigbee/zigbee-icon.svg" }, 
    { name: "Tailscale", url: "https://cdn.simpleicons.org/tailscale/white/121212" }, 
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  ];

  // Challenges
  const challenges = [
    {
        title: "Interoperabilität & Protokolle",
        icon: Wifi,
        problem: "Inkompatibilitäten beim Initial-Handshake bestimmter Zigbee-Endgeräte (Sonoff) im Mesh-Netzwerk.",
        solution: "Analyse der Zigbee-Frames via Z2M-Logs, Durchführung gezielter 'Re-Interviews' und Firmware-Upgrade des Coordinators zur Stabilisierung der Mesh-Topologie."
    },
    {
        title: "Datenstruktur & UX-Design",
        icon: Activity,
        problem: "Überflutung des Dashboards durch unstrukturierte Auto-Discovery-Entitäten, was die Usability (WAF) beeinträchtigte.",
        solution: "Implementierung einer strengen Trennung zwischen Admin-Backend (Monitoring) und User-Frontend (Steuerung) sowie logische Gruppierung aller Sensoren."
    }
   ];

  return (
    <Layout>
      <Helmet>
        <title>Home Assistant — Gökhan Zehirlioglu</title>
        <meta name="description" content="Smart Home mit Home Assistant, Zigbee2MQTT und Docker auf Raspberry Pi 5." />
        <meta property="og:title" content="Home Assistant — Gökhan Zehirlioglu" />
        <meta property="og:description" content="Smart Home mit Home Assistant, Zigbee2MQTT und Docker auf Raspberry Pi 5." />
        <meta property="og:type" content="article" />
      </Helmet>
      <Lightbox src={selectedImage} onClose={closeLightbox} />

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
             <img src="/images/home-assistant-foto4.png" alt="" className="w-full h-full object-cover blur-lg" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <TerminalSquare size={16} /> FISI-Abschlussprojekt (Simulation)
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enterprise-Grade Smart Home <br />
            <span className="gradient-text">Infrastruktur & Automation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Implementierung einer vollständig lokalen, containerbasierten IoT-Plattform mit Fokus auf
            Datensouveränität, Netzwerksicherheit und herstellerunabhängiger Integration.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {projectStats.map((stat, index) => (
              <div key={index} className={`glass p-4 rounded-xl border-primary/10 text-center transition-transform hover:-translate-y-1 ${stat.highlight ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}>
                <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-bold ${stat.highlight ? 'text-foreground' : 'text-foreground/90'}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* DOKÜMAN İNDİRME BUTONU */}
          <div className="flex justify-center">
            <a 
              href="/home_assistant.docx" 
              download 
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white dark:bg-[#1c1c1c] border-2 border-[#03a9f4] shadow-[0_0_20px_-5px_rgba(3,169,244,0.3)] hover:shadow-[0_0_30px_-5px_rgba(3,169,244,0.5)] transition-all hover:scale-[1.02]"
            >
              <div className="bg-[#03a9f4]/10 p-2 rounded-lg">
                 <Download className="w-6 h-6 text-[#03a9f4]" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-bold tracking-wider text-[#03a9f4] uppercase">Technische Dokumentation</span>
                <span className="block text-sm font-bold text-foreground group-hover:text-[#03a9f4] transition-colors">Download .DOCX</span>
              </div>
            </a>
          </div>
        </div>
      </section>


      {/* KONTEXT & SPECS */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Lightbulb className="text-primary w-6 h-6" />
              Ausgangslage: Die Herstellerabhängigkeit
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Der Markt für Smart-Home-Komponenten ist stark fragmentiert. Große Hersteller (Philips Hue, Tuya, Amazon)
                zwingen Nutzer oft in geschlossene Ökosysteme ("Walled Gardens"). Dies führt zu einer heterogenen Infrastruktur,
                in der Geräte nicht miteinander kommunizieren können und sensible Daten (Kamerabilder, Anwesenheitsstatus)
                zwingend über externe Cloud-Server geleitet werden.
              </p>
              <p>
                Zusätzlich zur Fragmentierung stellte diese Abhängigkeit ein erhebliches Sicherheits- und Datenschutzrisiko dar.
                Ein zentrales Ziel war daher nicht nur die technische Bündelung, sondern die <strong>Rückgewinnung der Datenhoheit</strong>.
                Das System sollte auch ohne Internetverbindung voll funktionsfähig bleiben und private Daten das eigene Netzwerk nicht verlassen.
              </p>
              <div className="glass p-5 rounded-xl border-l-4 border-primary bg-primary/5">
                <p className="font-medium text-foreground">Das technische Ziel:</p>
                <p>
                  Ablösung proprietärer Cloud-Lösungen durch eine zentrale, herstellerunabhängige Management-Plattform (Home Assistant).
                  Fokus auf <strong>On-Premise Data Processing</strong> (Local Only) und Betrieb als stabiler Microservice via Docker.
                </p>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-primary/10 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
             <Cpu className="absolute -right-6 -bottom-6 w-32 h-32 text-primary/5 z-0" />
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                <Server size={20} className="text-primary" />
                Server-Spezifikationen
             </h3>
             <div className="space-y-4 relative z-10">
                {hardwareSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground text-sm text-right">{spec.value}</span>
                    </div>
                ))}
             </div>
             {/* Tech Stack Icons (DÜZELTİLDİ) */}
             <div className="flex flex-wrap gap-4 mt-8 justify-center relative z-10">
                {techStackIcons.map((tech) => (
                    <div key={tech.name} className="relative group">
                       <img src={tech.url} alt={tech.name} className="h-8 w-8 object-contain opacity-80 hover:opacity-100 transition-opacity" title={tech.name} />
                    </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- ZIGBEE & HARDWARE SECTION --- */}
      <section className="py-16 px-4 bg-background/50 border-y border-primary/5">
        <div className="max-w-6xl mx-auto">
            {/* ÜST BAŞLIK */}
            <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">Eingesetzte Hardware & Protokolle</span>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center mb-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <img src="https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" className="w-10 h-10" alt="Zigbee" />
                        Warum Zigbee Protokoll?
                    </h2>
                    <div className="prose text-muted-foreground space-y-4">
                        <p>
                            Ein Großteil der verwendeten Hardware basiert bewusst auf dem <strong>Zigbee-Funkstandard</strong>.
                            Im Gegensatz zu WLAN-Geräten besitzen Zigbee-Komponenten keine eigene IP-Adresse im Heimnetzwerk.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4"/> <strong>Sicherheit:</strong> Keine direkte Angriffsfläche über IP/TCP.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4"/> <strong>Stabilität:</strong> Entlastung des WLAN-Routers durch eigenes Mesh-Netzwerk.</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="text-emerald-500 w-4 h-4"/> <strong>Effizienz:</strong> Extrem geringer Energieverbrauch (Batterielaufzeiten &gt; 1 Jahr).</li>
                        </ul>
                    </div>
                </div>
                {/* Hardware List Box */}
                <div className="glass p-6 rounded-2xl border-primary/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Box className="text-primary w-5 h-5" /> Installierte Hardware
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-muted-foreground flex items-center gap-2"><ThermometerSnowflake size={14}/> Heizkörperthermostate</span>
                            <span className="font-bold">3 Stück</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-muted-foreground flex items-center gap-2"><Zap size={14}/> Intelligente Steckdosen (Messfunktion)</span>
                            <span className="font-bold">10 Stück</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-muted-foreground flex items-center gap-2"><ToggleLeft size={14}/> Sonoff ZBMINI-L2 (Lichtsteuerung)</span>
                            <span className="font-bold">5 Stück</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                            <span className="text-muted-foreground flex items-center gap-2"><Activity size={14}/> Temperatur- & Feuchtigkeitssensoren</span>
                            <span className="font-bold">8 Stück</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hardware Collage Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
                {/* Dongle */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer md:col-span-2 md:row-span-2" onClick={() => setSelectedImage("/images/home-assistant-foto17.jpeg")}>
                    <img src="/images/home-assistant-foto17.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Zigbee Dongle" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-8 h-8" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Zigbee 3.0 Coordinator</div>
                </div>

                {/* Thermostats */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto13.jpeg")}>
                    <img src="/images/home-assistant-foto13.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Thermostate" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-6 h-6" />
                    </div>
                </div>

                {/* Sonoff Boxes */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto14.jpeg")}>
                    <img src="/images/home-assistant-foto14.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Sonoff ZBMINI" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-6 h-6" />
                    </div>
                </div>

                {/* Wiring 1 */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer md:row-span-2" onClick={() => setSelectedImage("/images/home-assistant-foto19.jpeg")}>
                    <img src="/images/home-assistant-foto19.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Wiring Example" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-6 h-6" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white">Installation</div>
                </div>

                {/* Plugs */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto16.jpeg")}>
                    <img src="/images/home-assistant-foto16.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Smart Plugs" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-6 h-6" />
                    </div>
                </div>

                {/* Sensors */}
                <div className="relative group overflow-hidden rounded-xl border border-white/10 cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto15.jpeg")}>
                    <img src="/images/home-assistant-foto15.jpeg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" alt="Sensoren" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* 1. DEEP DIVE (SERVICE MANAGEMENT) */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                    <TerminalSquare className="text-primary w-8 h-8" />
                    Deep Dive: Service Management
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Direkte Systemverwaltung auf Linux-Ebene. Container-Orchestrierung,
                    Ressourcen-Monitoring und Netzwerkanalyse via CLI bilden das Fundament des stabilen Betriebs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* SSH */}
                <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto9.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                         <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ssh pi@homeassistant</span>
                    </div>
                    <img src="/images/home-assistant-foto9.png" alt="SSH Login Debian" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">OS Hardening & Access Control</p>
                    </div>
                </div>

                 {/* Docker */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto7.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">docker stats</span>
                    </div>
                    <img src="/images/home-assistant-foto7.png" alt="Docker Container Stats" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Container Resource Management</p>
                    </div>
                </div>

                 {/* Network / IP */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto8.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ip a</span>
                    </div>
                    <img src="/images/home-assistant-foto8.png" alt="Network Interfaces" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Interface Analysis (Tailscale & VLANs)</p>
                    </div>
                </div>

                 {/* Htop */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto10.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">htop</span>
                    </div>
                    <img src="/images/home-assistant-foto10.png" alt="Htop Process Monitor" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Realtime Process Monitoring</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. FRONTEND UX (TABLET & MOBILE) */}
      <section className="py-16 px-4 bg-background/50 border-y border-primary/5">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                    <Activity className="text-primary w-7 h-7" />
                    Frontend UX (Tablet & Mobile)
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Die technische Komplexität wird in eine intuitive Benutzeroberfläche abstrahiert.
                    Das System unterscheidet strikt zwischen technischem Monitoring und täglicher Bedienung.
                </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
                {/* Foto 1 */}
                <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => setSelectedImage("/images/home-assistant-foto1.png")}>
                    <div className="relative">
                            <img src="/images/home-assistant-foto1.png" alt="Tablet UI - Beleuchtung & Szenen" className="w-full h-auto rounded-lg shadow-sm" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                            <Maximize2 className="text-white w-8 h-8" />
                            </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Beleuchtung & Szenen</p>
                </div>
                {/* Foto 2 */}
                <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => setSelectedImage("/images/home-assistant-foto2.png")}>
                    <div className="relative">
                        <img src="/images/home-assistant-foto2.png" alt="Tablet UI - Klimasteuerung" className="w-full h-auto rounded-lg shadow-sm" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                            <Maximize2 className="text-white w-8 h-8" />
                            </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Klimasteuerung</p>
                </div>
                {/* Foto 3 */}
                <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => setSelectedImage("/images/home-assistant-foto3.png")}>
                    <div className="relative">
                        <img src="/images/home-assistant-foto3.png" alt="Tablet UI - Präsenz & Geofencing" className="w-full h-auto rounded-lg shadow-sm" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                            <Maximize2 className="text-white w-8 h-8" />
                            </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Präsenz & Geofencing</p>
                </div>
            </div>
        </div>
      </section>

      {/* 3. MONITORING & ENERGIE-ANALYSE */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2 gradient-text">
                <LineChart size={20} />
                Monitoring & Energie-Analyse
            </h3>
            <div className="bg-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-70"></div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 order-2 md:order-1">
                        <h4 className="text-lg font-bold text-white mb-2">Verbrauchstransparenz</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                            Durch den Einsatz von Tuya Smart Plugs mit Leistungsmessung werden Stromverbräuche einzelner Verbraucher
                            (Server, Workstation, Haushaltsgeräte) erfasst. Die Daten werden in InfluxDB persistiert und ermöglichen
                            detaillierte Kostenanalysen und Anomalie-Erkennung.
                        </p>
                    </div>
                    <div className="space-y-4 order-1 md:order-2">
                        {/* Grafik 1 - PNG */}
                        <div className="cursor-pointer group relative" onClick={() => setSelectedImage("/images/home-assistant-foto5.png")}>
                            <img src="/images/home-assistant-foto5.png" alt="Energy Graph Weekly" className="w-full h-auto rounded-lg border border-white/10 shadow-md transition-transform" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                                <Maximize2 className="text-white w-8 h-8" />
                            </div>
                        </div>
                        {/* Grafik 2 - PNG */}
                            <div className="cursor-pointer group relative" onClick={() => setSelectedImage("/images/home-assistant-foto6.png")}>
                            <img src="/images/home-assistant-foto6.png" alt="Device Energy List" className="w-full h-auto rounded-lg border border-white/10 shadow-md transition-transform" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                                <Maximize2 className="text-white w-8 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. AUTOMATIONS-LOGIK & PRIVACY */}
      <section className="py-16 px-4 max-w-5xl mx-auto bg-background/50 border-y border-primary/5">
         <div className="text-center mb-12">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 mb-4">
                <Activity className="text-primary w-7 h-7" />
                Automations-Logik & Privacy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Das System agiert nicht nur reaktiv, sondern proaktiv. Komplexe Skripte und Zustandsautomaten steuern
                Heizung und Sicherheit unter strikter Einhaltung der Privatsphäre.
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            {/* Logic Card */}
            <div className="glass p-6 rounded-2xl border-primary/10 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ThermometerSnowflake className="text-blue-500 w-5 h-5" />
                    Heizungs-Algorithmus
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Logische Verknüpfung von Fensterkontakten und Thermostaten. Ein "Safety-Timer" (Watchdog)
                    stellt sicher, dass Heizkörper bei Sensorausfällen oder vergessenem Fenster nicht einfrieren.
                </p>
                <div className="flex items-center justify-between text-xs font-medium bg-muted/30 p-3 rounded-lg border border-white/5">
                    <div className="text-center"><span className="block mb-1">🪟 State: OPEN</span><span className="text-red-500">Trigger</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center"><span className="block mb-1">🔥 Set: OFF</span><span className="text-blue-500">Action</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center bg-yellow-500/10 p-1 rounded"><span className="block mb-1">⏳ Wait: 2h</span><span className="text-yellow-500">Safety Loop</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center"><span className="block mb-1">🔥 Set: AUTO</span><span className="text-green-500">Restore</span></div>
                </div>
            </div>

            {/* Camera Privacy Card */}
            <div className="glass p-0 rounded-2xl border-primary/10 overflow-hidden hover:border-primary/30 transition-colors flex flex-col group cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto11.jpeg")}>
                <div className="relative h-56 overflow-hidden">
                    <img src="/images/home-assistant-foto11.jpeg" alt="Indoor Kamera" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-3 right-3 flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <EyeOff size={12} className="text-red-400" /> Geo-Fencing Active
                        </div>
                    </div>
                    {/* Büyütme İkonu */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                         <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                    </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between bg-gradient-to-b from-transparent to-background/50">
                    <div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Lock className="text-red-500 w-5 h-5" />
                            Privacy-First Überwachung
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Innenkameras sind physisch stromlos geschaltet (Smart Plug), solange berechtigte Personen
                            (via WLAN/GPS-Tracking) im Haus sind. Bilddaten verlassen niemals das lokale Netzwerk.
                        </p>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* 5. INFRASTRUCTURE HEALTH DASHBOARD */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
                <Server size={20} className="text-primary" />
                Infrastructure Health Dashboard
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/20 group relative cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto4.png")}>
                <img src="/images/home-assistant-foto4.png" alt="Home Assistant Admin Dashboard" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                {/* Büyütme İkonu */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Maximize2 className="text-white w-10 h-10 drop-shadow-md" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-white/90 font-medium">System Status: Healthy</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
                Echtzeit-Überwachung von Server-Metriken (Load, RAM, Storage) und Zigbee-Signalqualität.
            </p>
        </div>
      </section>

      {/* 6. SYSTEMARCHITEKTUR & TAILSCALE (DÜZELTİLDİ: ORTALI METİN) */}
      <div className="py-16 px-4 bg-primary/5 border-y border-primary/10">
        <div className="max-w-6xl mx-auto glass p-8 rounded-2xl border-primary/10 text-center">
            <h3 className="text-xl font-bold mb-10 flex items-center justify-center gap-3">
                <Network className="text-primary w-6 h-6" />
                Systemarchitektur & Remote Access
            </h3>

            {/* ŞEMA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 overflow-x-auto py-6 px-4">
                {/* 1. Internet */}
                <div className="flex flex-col items-center gap-3 min-w-[100px] group">
                    <div className="bg-blue-500/10 p-4 rounded-full ring-1 ring-blue-500/30 group-hover:scale-110 transition-transform">
                         <Globe size={28} className="text-blue-500" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">WAN / Internet</span>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" size={16} />

                {/* 2. Tailscale (VPN) */}
                <div className="flex flex-col items-center gap-3 min-w-[100px] group">
                    <div className="bg-zinc-900 p-4 rounded-full ring-1 ring-white/20 relative group-hover:scale-110 transition-transform">
                        <img src="https://cdn.simpleicons.org/tailscale/white" alt="Tailscale VPN" className="w-7 h-7 object-contain" />
                        <span className="absolute -top-2 -right-3 bg-emerald-500 text-[8px] text-white font-bold px-1.5 py-0.5 rounded-full shadow-lg">ENC</span>
                    </div>
                    <span className="text-[10px] font-bold text-foreground">Tailscale Mesh</span>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" size={16} />

                {/* 3. Docker Host */}
                <div className="flex flex-col items-center gap-3 min-w-[120px] group">
                     <div className="glass p-3 rounded-2xl border-primary/20 text-center group-hover:border-primary/50 transition-colors">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker Host" className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                        <span className="text-xs font-bold block">Docker Host</span>
                        <span className="text-[9px] text-muted-foreground">RPi 5</span>
                     </div>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" size={16} />

                {/* 4. IoT Network (Zigbee) */}
                <div className="flex flex-col items-center gap-3 min-w-[100px] group">
                    <div className="bg-orange-500/10 p-4 rounded-full ring-1 ring-orange-500/30 group-hover:scale-110 transition-transform">
                        <img src="https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" alt="Zigbee2MQTT" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-500">Zigbee Mesh</span>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" size={16} />

                {/* 5. Central Control (Tablet) */}
                <div className="flex flex-col items-center gap-3 min-w-[100px] group">
                    <div className="bg-purple-500/10 p-4 rounded-full ring-1 ring-purple-500/30 group-hover:scale-110 transition-transform relative">
                        <Tablet size={28} className="text-purple-500" />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-black"></div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-400">Zentrale Steuerung</span>
                </div>
            </div>

            {/* TAILSCALE AÇIKLAMA (ORTALANDI) */}
            <div className="grid md:grid-cols-2 gap-12 items-center mt-12 bg-black/20 p-8 rounded-xl border border-white/5">
                <div className="flex flex-col justify-center text-center">
                    <h4 className="text-xl font-bold flex items-center justify-center gap-2 mb-4">
                        <Globe className="text-emerald-500 w-6 h-6" /> Sicherer Fernzugriff
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        Ob im Büro, im Urlaub oder unterwegs: Dank <strong>Tailscale</strong> ist das Smart Home jederzeit sicher erreichbar.
                        Dies ermöglicht eine verschlüsselte Verbindung zum Heimnetzwerk, ohne dass Router-Ports geöffnet werden müssen (No Port-Forwarding).
                        Das System verhält sich für das Endgerät so, als wäre es direkt im lokalen WLAN ("wie zu Hause").
                    </p>
                    <div className="flex justify-center">
                        <ul className="space-y-2 text-left inline-block">
                            <li className="flex items-center gap-2 text-xs text-foreground/80">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                                <span><strong>Ende-zu-Ende Verschlüsselung</strong> (WireGuard)</span>
                            </li>
                            <li className="flex items-center gap-2 text-xs text-foreground/80">
                                <CheckCircle2 className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                                <span><strong>Zero Trust Access:</strong> Authentifizierte Geräte only</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Tailscale Screenshot */}
                <div className="relative group overflow-hidden rounded-lg border border-white/10 cursor-pointer max-w-sm mx-auto shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500" onClick={() => setSelectedImage("/images/home-assistant-foto12.jpeg")}>
                     <img src="/images/home-assistant-foto12.jpeg" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Tailscale Admin" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Maximize2 className="text-white w-8 h-8" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CHALLENGES & FAZIT */}
      <section className="py-16 px-4 max-w-4xl mx-auto space-y-16">
        <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <AlertTriangle className="text-orange-500 w-7 h-7" />
                Technische Herausforderungen
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {challenges.map((item, index) => (
                    <div key={index} className="glass p-6 rounded-xl border-l-4 border-orange-500/50 bg-gradient-to-br from-orange-500/5 to-transparent">
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <item.icon size={18} className="text-orange-500" />
                            {item.title}
                        </h3>
                        <div className="space-y-3 text-sm">
                            <p><strong className="text-foreground">Problem:</strong> <span className="text-muted-foreground">{item.problem}</span></p>
                            <p><strong className="text-foreground">Lösung:</strong> <span className="text-muted-foreground">{item.solution}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="glass p-8 rounded-2xl border-primary/10 bg-primary/5 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
            <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
                <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3 gradient-text">Projekt-Fazit</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Das Projekt demonstriert erfolgreich, dass eine leistungsfähige IoT-Infrastruktur ohne Abhängigkeit von externen
                    Cloud-Providern realisierbar ist. Die Kombination aus Docker, Zigbee und VPN bietet ein Höchstmaß an
                    Datenschutz und Ausfallsicherheit.
                </p>
                <p className="text-sm font-medium text-foreground">
                    Roadmap: Implementierung von VLAN-ACLs zur strikten IoT-Isolation und Erweiterung der Sensorik.
                </p>
            </div>
        </div>

      </section>

    </Layout>
  );
};

export default ProjektHomeAssistant;
