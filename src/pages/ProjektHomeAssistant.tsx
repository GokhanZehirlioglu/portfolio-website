import React, { useState } from "react";
import Layout from "@/components/Layout";
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
  X,     
  Maximize2,
  Wifi,    // EKLENDİ (Hata buradaydı)
  Layers   // EKLENDİ (Hata buradaydı)
} from "lucide-react";

const ProjektHomeAssistant = () => {
  // --- STATE: LIGHTBOX (Resim Büyütme) ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --- KONFİGÜRASYON ---
  
  // Proje Künyesi
  const projectStats = [
    { icon: Calendar, label: "Projektzeitraum", value: "02.10.25 – 29.11.25" },
    { icon: Server, label: "Infrastruktur", value: "Raspberry Pi 5 (Docker Host)" },
    { icon: Network, label: "Netzwerk", value: "VLAN & Tailscale VPN" },
    { icon: ShieldCheck, label: "Sicherheitslevel", value: "Local Only / Zero Trust", highlight: true },
  ];

  // Donanım Spekleri
  const hardwareSpecs = [
    { label: "Host System", value: "Raspberry Pi 5, 16GB RAM" },
    { label: "Storage", value: "SanDisk Extreme PRO microSDXC (A2)" },
    { label: "Zigbee Gateway", value: "Sonoff Zigbee 3.0 USB Dongle Plus (FW v2.6.3)" },
    { label: "OS / Kernel", value: "Debian Bookworm (Headless Optimized)" },
  ];

  // Tech Stack (Logolar CDN)
  const techStackIcons = [
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Home Assistant", url: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg" },
    { name: "Zigbee2MQTT", url: "https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" },
    { name: "Tailscale", url: "https://cdn.simpleicons.org/tailscale/white/121212" }, // Dark theme için white versiyon
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Mosquitto MQTT", url: "https://cdn.simpleicons.org/eclipse-mosquitto/3C5280" },
  ];

  // Challenges
  const challenges = [
    {
        title: "Interoperabilität & Protokolle",
        icon: Wifi, // Artık import edildiği için çalışacak
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
      {/* --- LIGHTBOX OVERLAY (Büyütülmüş Resim) --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Fullscreen Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()} // Resme tıklayınca kapanmasın
          />
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        {/* Arka plan */}
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

          <a href="/home_assistant.docx" download className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>Technische Dokumentation (.docx)</span>
          </a>
        </div>
      </section>


      {/* KONTEXT & ARCHITEKTUR */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* BAŞLIK DÜZELTİLDİ: Vendor Lock-in ibaresi kalktı */}
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
              <div className="glass p-5 rounded-xl border-l-4 border-primary bg-primary/5">
                <p className="font-medium text-foreground">Das technische Ziel:</p>
                <p>
                  Ablösung proprietärer Cloud-Lösungen durch eine zentrale, herstellerunabhängige Management-Plattform (Home Assistant).
                  Fokus auf <strong>On-Premise Data Processing</strong> (Alle Daten bleiben im lokalen Netz) und Betrieb als
                  stabiler Microservice via Docker.
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
             <div className="flex flex-wrap gap-4 mt-8 justify-center relative z-10">
                {techStackIcons.map((tech) => (
                    <img key={tech.name} src={tech.url} alt={tech.name} className="h-8 w-8 object-contain opacity-80 hover:opacity-100 transition-opacity" title={tech.name} />
                ))}
             </div>
          </div>
        </div>

        {/* SYSTEMARCHITEKTUR & DATENFLUSS */}
        <div className="glass p-8 rounded-2xl border-primary/10 text-center">
            <h3 className="text-xl font-bold mb-10 flex items-center justify-center gap-3">
                <Network className="text-primary w-6 h-6" />
                Systemarchitektur & Datenfluss
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-12 overflow-x-auto py-6 px-4">
                {/* 1. Internet */}
                <div className="flex flex-col items-center gap-3 min-w-[120px] group">
                    <div className="bg-blue-500/10 p-5 rounded-full ring-1 ring-blue-500/30 group-hover:scale-110 transition-transform">
                         <Globe size={32} className="text-blue-500" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">WAN / Internet</span>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" />

                {/* 2. Tailscale (VPN) - Logo */}
                <div className="flex flex-col items-center gap-3 min-w-[120px] group">
                    <div className="bg-zinc-900 p-5 rounded-full ring-1 ring-white/20 relative group-hover:scale-110 transition-transform">
                        <img 
                            src="https://cdn.simpleicons.org/tailscale/white" 
                            alt="Tailscale VPN" 
                            className="w-8 h-8 object-contain" 
                        />
                        <span className="absolute -top-2 -right-3 bg-emerald-500 text-[9px] text-white font-bold px-1.5 py-0.5 rounded-full shadow-lg">ENC</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">Tailscale Mesh</span>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" />

                {/* 3. Docker Host (RPi) - Logo */}
                <div className="flex flex-col items-center gap-3 min-w-[140px] group">
                     <div className="glass p-4 rounded-2xl border-primary/20 text-center group-hover:border-primary/50 transition-colors">
                        <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
                            alt="Docker Host" 
                            className="w-10 h-10 mx-auto mb-2 drop-shadow-lg" 
                        />
                        <span className="text-sm font-bold block">Docker Host</span>
                        <span className="text-[10px] text-muted-foreground">RPi 5 / Debian</span>
                     </div>
                </div>

                <ArrowRight className="text-muted-foreground/50 hidden md:block" />

                {/* 4. IoT Network (Zigbee) - Logo */}
                <div className="flex flex-col items-center gap-3 min-w-[140px] group">
                    <div className="bg-orange-500/10 p-5 rounded-full ring-1 ring-orange-500/30 group-hover:scale-110 transition-transform">
                        <img 
                            src="https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" 
                            alt="Zigbee2MQTT" 
                            className="w-8 h-8 object-contain" 
                        />
                    </div>
                    <span className="text-xs font-bold text-orange-500">Zigbee Mesh</span>
                </div>
            </div>

            <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-left max-w-2xl mx-auto">
                <Lock className="text-red-500 w-8 h-8 flex-shrink-0" />
                <div>
                    <h4 className="text-base font-bold text-red-500 mb-1">Security Policy: No Public Exposure</h4>
                    <p className="text-sm text-muted-foreground leading-snug">
                        Es wurde bewusst auf <strong>Port-Forwarding</strong> verzichtet, um die Angriffsfläche zu minimieren.
                        Der Zugriff erfolgt ausschließlich authentifiziert über das Tailscale-Overlay-Netzwerk (ZTNA-Ansatz).
                    </p>
                </div>
            </div>
        </div>
      </section>


      {/* TERMINAL & BACKEND */}
      <section className="py-16 px-4 bg-background/50 border-y border-primary/5">
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
                {/* SSH - CLICKABLE */}
                <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto9.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                         <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ssh pi@homeassistant</span>
                    </div>
                    <div className="relative">
                        <img src="/images/home-assistant-foto9.png" alt="SSH Login Debian" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">OS Hardening & Access Control</p>
                    </div>
                </div>

                 {/* Docker - CLICKABLE */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto7.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">docker stats</span>
                    </div>
                    <div className="relative">
                        <img src="/images/home-assistant-foto7.png" alt="Docker Container Stats" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Container Resource Management</p>
                    </div>
                </div>

                 {/* Network / IP - CLICKABLE */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto8.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ip a</span>
                    </div>
                    <div className="relative">
                        <img src="/images/home-assistant-foto8.png" alt="Network Interfaces" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Interface Analysis (Tailscale & VLANs)</p>
                    </div>
                </div>

                 {/* Htop - CLICKABLE */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e] cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto10.png")}>
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">htop</span>
                    </div>
                    <div className="relative">
                        <img src="/images/home-assistant-foto10.png" alt="Htop Process Monitor" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                            <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10 pointer-events-none">
                        <p className="text-xs text-white/90 font-mono">Realtime Process Monitoring</p>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* LOGIC & PRIVACY */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
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

            {/* Camera Privacy Card - CLICKABLE */}
            <div className="glass p-0 rounded-2xl border-primary/10 overflow-hidden hover:border-primary/30 transition-colors flex flex-col group cursor-pointer" onClick={() => setSelectedImage("/images/home-assistant-foto11.jpeg")}>
                <div className="relative h-56 overflow-hidden">
                    <img src="/images/home-assistant-foto11.jpeg" alt="Indoor Kamera" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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

      {/* TAILSCALE SECTION */}
      <section className="py-16 px-4 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Globe className="text-primary w-8 h-8" />
                    Secure Remote Access (Tailscale)
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    Um das System von unterwegs sicher erreichbar zu machen, ohne Sicherheitsrisiken durch Port-Forwarding einzugehen,
                    wurde <strong>Tailscale</strong> als Mesh-VPN-Lösung implementiert.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span><strong>Zero Configuration Networking:</strong> Direkte Peer-to-Peer Verbindungen.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span><strong>ACL-Steuerung:</strong> Nur autorisierte Geräte im Tailnet haben Zugriff auf den Docker-Host.</span>
                    </li>
                </ul>
            </div>
            {/* TAILSCALE FOTO - CLICKABLE */}
            <div className="glass p-2 rounded-xl border-primary/20 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 cursor-pointer group" onClick={() => setSelectedImage("/images/home-assistant-foto12.jpeg")}>
                <div className="relative overflow-hidden rounded-lg">
                    <img src="/images/home-assistant-foto12.jpeg" alt="Tailscale Admin Console" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                         <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2 text-center pointer-events-none">
                         <span className="text-[10px] text-white/80 font-mono">Tailnet Admin Console - Authenticated Devices Only</span>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* FRONTEND & ANALYTICS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3 gradient-text">
                    Das Ergebnis: Zentrale Kontrolle
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Die technische Komplexität wird in eine intuitive Benutzeroberfläche abstrahiert.
                    Das System unterscheidet strikt zwischen technischem Monitoring und täglicher Bedienung.
                </p>
            </div>

            {/* Dashboard - CLICKABLE */}
            <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
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
            </div>

            {/* Tablet UI - FRONTEND UX BÖLÜMÜ - CLICKABLE */}
            <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {/* İkonun rengi ve boyutu garantiye alındı */}
                    <Activity className="text-primary w-6 h-6" />
                    Frontend UX (Tablet & Mobile)
                </h3>
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

             {/* Enerji Analizi - CLICKABLE */}
            <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 gradient-text">
                    <Activity size={20} />
                    Data Analytics & Energy Management
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
                            {/* Grafik 1 */}
                            <div className="cursor-pointer group relative" onClick={() => setSelectedImage("/images/home-assistant-foto5.jpg")}>
                                <img src="/images/home-assistant-foto5.jpg" alt="Energy Graph Weekly" className="w-full h-auto rounded-lg border border-white/10 shadow-md transition-transform" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                                    <Maximize2 className="text-white w-8 h-8" />
                                </div>
                            </div>
                            {/* Grafik 2 */}
                             <div className="cursor-pointer group relative" onClick={() => setSelectedImage("/images/home-assistant-foto6.jpg")}>
                                <img src="/images/home-assistant-foto6.jpg" alt="Device Energy List" className="w-full h-auto rounded-lg border border-white/10 shadow-md transition-transform" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                                    <Maximize2 className="text-white w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

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
