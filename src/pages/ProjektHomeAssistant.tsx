import React from "react";
import Layout from "@/components/Layout";
import {
  Download,
  Calendar,
  Server,
  Wifi,
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
  Layers,
  Network
} from "lucide-react";

const ProjektHomeAssistant = () => {
  // --- KONFİGÜRASYON & SABİTLER ---

  [cite_start]// Proje Künyesi (Dokümandan [cite: 11-30])
  const projectStats = [
    { icon: Calendar, label: "Projektzeitraum", value: "02.10.25 – 29.11.25" },
    { icon: Server, label: "Hardware-Basis", value: "Raspberry Pi 5 (16GB)" },
    { icon: Network, label: "Netzwerk", value: "VLAN & Tailscale VPN" },
    { icon: ShieldCheck, label: "Sicherheitslevel", value: "Local Only / Zero Trust", highlight: true },
  ];

  [cite_start]// Donanım Spekleri (Dokümandan [cite: 85-111])
  const hardwareSpecs = [
    { label: "Host System", value: "Raspberry Pi 5, 16GB RAM" },
    { label: "Speicher", value: "SanDisk Extreme PRO microSDXC (A2)" },
    { label: "Zigbee Gateway", value: "Sonoff Zigbee 3.0 USB Dongle Plus (FW v2.6.3)" },
    { label: "Betriebssystem", value: "Raspberry Pi OS (Debian Bookworm)" },
  ];

  // Teknoloji Stack'i (İkonlar)
  const techStackIcons = [
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Home Assistant", url: "https://cdn.simpleicons.org/homeassistant/41BDF5" },
    { name: "Zigbee2MQTT", url: "https://raw.githubusercontent.com/Koenkk/zigbee2mqtt/master/images/logo.png" },
    { name: "Tailscale", url: "https://cdn.simpleicons.org/tailscale/121212" },
    { name: "Linux / Debian", url: "https://cdn.simpleicons.org/debian/A81D33" },
    { name: "Mosquitto MQTT", url: "https://cdn.simpleicons.org/eclipse-mosquitto/3C5280" },
  ];

   [cite_start]// Karşılaşılan Zorluklar (Dokümandan [cite: 181-187])
   const challenges = [
    {
        title: "Zigbee Pairing & Stabilität",
        icon: Wifi,
        problem: "Initialprobleme beim Anlernen von Sonoff-Geräten und instabile Mesh-Verbindungen.",
        solution: "Durchführung von 'Re-Interviews' in Z2M, strategische Platzierung von Router-Geräten (ZBMINI-L2) zur Mesh-Stärkung und Firmware-Updates des Coordinators."
    },
    {
        title: "Dashboard-Wildwuchs & UX",
        icon: Layers,
        problem: "Unstrukturierte Ansichten durch automatisches Hinzufügen neuer Entitäten führten zu schlechter Bedienbarkeit.",
        solution: "Komplette Umstrukturierung: Trennung von reinen Monitoring-Daten (Admin-View) und simpler Alltagssteuerung (Tablet-View für die Familie)."
    }
   ];


  return (
    <Layout>
      {/* =====================================================================================
          1. HERO SECTION: BAŞLIK VE ÖZET
          ===================================================================================== */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        {/* Arka Plan Dekoru (foto4 blur) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
             <img src="/images/home-assistant-foto4.png" alt="" className="w-full h-full object-cover blur-lg" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Üst Başlık */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <TerminalSquare size={16} /> FISI-Abschlussprojekt (Simulation)
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Enterprise-Grade Smart Home <br />
            <span className="gradient-text">auf Raspberry Pi Basis</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Konzeption, Aufbau und Absicherung einer vollständig lokalen, containerbasierten
            IoT-Infrastruktur als Alternative zu cloudabhängigen Insellösungen.
          </p>

          {/* İstatistikler Grid'i */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {projectStats.map((stat, index) => (
              <div key={index} className={`glass p-4 rounded-xl border-primary/10 text-center transition-transform hover:-translate-y-1 ${stat.highlight ? 'bg-primary/5 border-primary/30 shadow-sm' : ''}`}>
                <stat.icon className={`w-6 h-6 mx-auto mb-3 ${stat.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-bold ${stat.highlight ? 'text-foreground' : 'text-foreground/90'}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Döküman İndirme Butonu */}
          <a href="/home_assistant.docx" download className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>Vollständige Projektdokumentation (.docx)</span>
          </a>
        </div>
      </section>


      {/* =====================================================================================
          2. KONTEXT & ARCHITEKTUR (THE "WHY" & "WHAT")
          ===================================================================================== */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-20">
        {/* Motivasyon ve Donanım Grid'i */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          [cite_start]{/* Sol: Hikaye [cite: 31-56] */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Lightbulb className="text-primary w-6 h-6" />
              Ausgangslage & Zielsetzung
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Die Ausgangslage war typisch für viele Haushalte: Eine wachsende Anzahl von Smart-Home-Geräten
                verschiedener Hersteller (Tuya, Sonoff) führte zu einer Fragmentierung ("Insellösungen") und
                Datenschutzbedenken durch zwingende Cloud-Anbindung.
              </p>
              <div className="glass p-5 rounded-xl border-l-4 border-primary bg-primary/5">
                <p className="font-medium text-foreground">Das technische Ziel:</p>
                <p>
                  Zentralisierung der Steuerung auf einem eigenen Server, vollständige Entkopplung von externen Clouds
                  (Privacy First) und die praktische Anwendung von FISI-relevanten Themen wie Linux-Administration,
                  Docker-Containerisierung und Netzwerksegmentierung (VLANs).
                </p>
              </div>
            </div>
          </div>

          {/* Sağ: Donanım Özellikleri */}
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
             {/* Teknoloji İkonları */}
             <div className="flex flex-wrap gap-4 mt-8 justify-center relative z-10">
                {techStackIcons.map((tech) => (
                    <img key={tech.name} src={tech.url} alt={tech.name} className="h-8 w-8 object-contain opacity-80 hover:opacity-100 transition-opacity" title={tech.name} />
                ))}
             </div>
          </div>
        </div>

        {/* Mimari ve Güvenlik Görselleştirmesi */}
        <div className="glass p-8 rounded-2xl border-primary/10 text-center">
            <h3 className="text-xl font-bold mb-8 flex items-center justify-center gap-3">
                <Network className="text-primary w-6 h-6" />
                Systemarchitektur & Netzwerkfluss
            </h3>

            {/* CSS Akış Şeması */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10 overflow-x-auto py-4">
                {/* Adım 1: Dış Dünya */}
                <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div className="bg-muted/50 p-4 rounded-full"><Wifi size={24} className="text-muted-foreground" /></div>
                    <span className="text-xs font-medium text-muted-foreground">Internet (4G/5G)</span>
                </div>
                <ArrowRight className="text-muted-foreground hidden md:block" />

                {/* Adım 2: Güvenli Tünel */}
                <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div className="bg-primary/10 p-4 rounded-full border border-primary/30 relative">
                        <Lock size={24} className="text-primary" />
                        <span className="absolute -top-2 -right-2 bg-primary text-[10px] text-background font-bold px-1.5 py-0.5 rounded-full">VPN</span>
                    </div>
                    <span className="text-xs font-bold text-primary">Tailscale Tunnel</span>
                </div>
                <ArrowRight className="text-muted-foreground hidden md:block" />

                {/* Adım 3: Host System */}
                <div className="flex flex-col items-center gap-2 min-w-[140px]">
                     <div className="glass p-4 rounded-xl border-primary/20 text-center">
                        <Server size={24} className="text-foreground mx-auto mb-2" />
                        <span className="text-sm font-bold">Raspberry Pi 5</span>
                        <span className="block text-[10px] text-muted-foreground">(Docker Host)</span>
                     </div>
                </div>
                <ArrowRight className="text-muted-foreground hidden md:block" />

                {/* Adım 4: İzole Ağ */}
                <div className="flex flex-col items-center gap-2 min-w-[140px]">
                    <div className="bg-orange-500/10 p-4 rounded-full border border-orange-500/30">
                        <Layers size={24} className="text-orange-500" />
                    </div>
                    <span className="text-xs font-bold text-orange-500">IoT VLAN / Zigbee</span>
                </div>
            </div>

            {/* Güvenlik Vurgusu */}
            <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-left max-w-2xl mx-auto">
                <ShieldCheck className="text-red-500 w-8 h-8 flex-shrink-0" />
                <div>
                    <h4 className="text-base font-bold text-red-500 mb-1">Sicherheitskonzept: Zero Trust</h4>
                    <p className="text-sm text-muted-foreground leading-snug">
                        Es wurde bewusst auf jegliches <strong>Port-Forwarding</strong> am Router verzichtet.
                        Das System ist aus dem öffentlichen Internet nicht direkt erreichbar.
                        Zugriff erfolgt ausschließlich über authentifizierte VPN-Tunnel (Tailscale).
                    </p>
                </div>
            </div>
        </div>
      </section>


      {/* =====================================================================================
          3. IMPLEMENTIERUNG & BACKEND (THE ENGINE ROOM - Terminal Fotoları)
          ===================================================================================== */}
      <section className="py-16 px-4 bg-background/50 border-y border-primary/5">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                    <TerminalSquare className="text-primary w-8 h-8" />
                    Deep Dive: Die "Engine Room"
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ein Blick hinter die Kulissen: Direkte Systemverwaltung auf Linux-Ebene, Container-Orchestrierung
                    und Netzwerkanalyse via CLI. Hier zeigt sich die technische Basis des stabilen Betriebs.
                </p>
            </div>

            {/* Terminal Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Terminal 1: SSH & OS */}
                <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e]">
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ssh pi@homeassistant</span>
                    </div>
                    {/* FOTO 9 - SSH */}
                    <img src="/images/home-assistant-foto9.png" alt="SSH Login Debian" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10">
                        <p className="text-xs text-white/90 font-mono">Secure Shell Access & OS Check (Debian GNU/Linux 12)</p>
                    </div>
                </div>

                 {/* Terminal 2: Docker Stats */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e]">
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">docker stats</span>
                    </div>
                    {/* FOTO 7 - Docker */}
                    <img src="/images/home-assistant-foto7.png" alt="Docker Container Stats" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10">
                        <p className="text-xs text-white/90 font-mono">Container-Ressourcenmanagement (CPU/RAM Usage)</p>
                    </div>
                </div>

                 {/* Terminal 3: Network Interfaces */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e]">
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">ip a</span>
                    </div>
                    {/* FOTO 8 - IP */}
                    <img src="/images/home-assistant-foto8.png" alt="Network Interfaces" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10">
                        <p className="text-xs text-white/90 font-mono">Netzwerk-Schnittstellenanalyse (Tailscale & VLANs)</p>
                    </div>
                </div>

                 {/* Terminal 4: Htop */}
                 <div className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-[#1e1e1e]">
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
                        <span className="text-xs text-muted-foreground font-mono ml-2">htop</span>
                    </div>
                    {/* FOTO 10 - Htop (GitHub'da png görünüyor) */}
                    <img src="/images/home-assistant-foto10.png" alt="Htop Process Monitor" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 border-t border-white/10">
                        <p className="text-xs text-white/90 font-mono">Echtzeit-Prozess- & Systemüberwachung</p>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* =====================================================================================
          4. INTELLIGENZ & AUTOMATISIERUNG (LOGIC & PRIVACY)
          ===================================================================================== */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
         <div className="text-center mb-12">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 mb-4">
                <Activity className="text-primary w-7 h-7" />
                Intelligente Automatisierung & Logik
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Das System reagiert proaktiv auf Umweltbedingungen und Anwesenheit.
                Zwei Beispiele für implementierte Logiken aus der Projektdokumentation.
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            {/* Senaryo 1: Isıtma Mantığı */}
            <div className="glass p-6 rounded-2xl border-primary/10 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ThermometerSnowflake className="text-blue-500 w-5 h-5" />
                    Heizungs- & Fensterlogik
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Um Energie zu sparen, werden Heizkörperthermostate automatisch abgeschaltet, wenn ein Fenster im Raum geöffnet wird.
                    Eine Sicherheitsroutine reaktiviert die Heizung nach 2 Stunden, um Auskühlung zu verhindern.
                </p>
                {/* CSS Logic Flow */}
                <div className="flex items-center justify-between text-xs font-medium bg-muted/30 p-3 rounded-lg border border-white/5">
                    <div className="text-center"><span className="block mb-1">🪟 Fenster AUF</span><span className="text-red-500">Trigger</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center"><span className="block mb-1">🔥 Heizung AUS</span><span className="text-blue-500">Action</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center bg-yellow-500/10 p-1 rounded"><span className="block mb-1">⏳ 2 Std. Warten</span><span className="text-yellow-500">Safety Timer</span></div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                    <div className="text-center"><span className="block mb-1">🔥 Heizung AN</span><span className="text-green-500">Fallback</span></div>
                </div>
            </div>

            {/* Senaryo 2: Gizlilik & Kamera */}
            <div className="glass p-0 rounded-2xl border-primary/10 overflow-hidden hover:border-primary/30 transition-colors flex flex-col">
                {/* Üst Kısım: Görsel */}
                <div className="relative h-56 overflow-hidden group">
                     {/* YENİ KAMERA FOTOSU - .jpeg */}
                    <img src="/images/home-assistant-foto11.jpeg" alt="Indoor Kamera" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <EyeOff size={12} className="text-red-400" /> Privacy Mode
                        </div>
                        <div className="bg-green-500/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12} /> Active
                        </div>
                    </div>
                </div>
                {/* Alt Kısım: Açıklama */}
                <div className="p-6 flex-grow flex flex-col justify-between bg-gradient-to-b from-transparent to-background/50">
                    <div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Lock className="text-red-500 w-5 h-5" />
                            Datenschutz-orientierte Überwachung
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Innenkameras dienen ausschließlich der Sicherheit bei Abwesenheit.
                            Die Stromzufuhr der Kameras wird physisch über Smart Plugs gekappt,
                            sobald eine berechtigte Person (via WLAN/GPS-Tracking) zu Hause erkannt wird.
                        </p>
                    </div>
                </div>
            </div>
         </div>
      </section>


      {/* =====================================================================================
          5. FRONTEND & ANALYTICS (USER EXPERIENCE & DATA)
          ===================================================================================== */}
      <section className="py-16 px-4 bg-black/20 border-t border-primary/5">
        <div className="max-w-6xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3 gradient-text">
                    Das Ergebnis: Zentrale Kontrolle & Analyse
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Die technische Komplexität wird in eine intuitive Benutzeroberfläche für den Alltag (WAF)
                    und detaillierte Analyse-Dashboards für das Systemmanagement übersetzt.
                </p>
            </div>

            {/* A) Ana Sistem Dashboard'u */}
            <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Server size={20} className="text-primary" />
                    System-Health & Admin Dashboard
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/20 group relative">
                     {/* FOTO 4 - Dashboard */}
                    <img src="/images/home-assistant-foto4.png" alt="Home Assistant Admin Dashboard" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                    {/* Vurgu Noktaları */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-white/90 font-medium">System Status: Optimal</span>
                    </div>
                     <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 shadow-lg md:flex hidden">
                        <Cpu size={14} className="text-primary" />
                        <span className="text-xs text-white/90 font-medium">RPi 5 Load: &lt; 15% (Avg)</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                    Zentrale Übersicht über Server-Ressourcen (CPU, RAM, Speicher), Netzwerkstatus und Zigbee-Verbindungsqualität.
                </p>
            </div>

            {/* B) Tablet UI Grid'i */}
            <div className="mb-16">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Layout className="text-primary w-5 h-5" />
                    Alltags-UI (Tablet & Mobile)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {/* Tablet Kart 1: Ana Kontrol */}
                    <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1">
                         {/* FOTO 1 */}
                        <img src="/images/home-assistant-foto1.png" alt="Tablet UI Main Control" className="w-full h-auto rounded-lg shadow-sm" />
                        <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Raumsteuerung & Szenen</p>
                    </div>
                     {/* Tablet Kart 2: İklim */}
                    <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1">
                         {/* FOTO 2 */}
                        <img src="/images/home-assistant-foto2.png" alt="Tablet UI Climate" className="w-full h-auto rounded-lg shadow-sm" />
                        <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Klima & Heizungsübersicht</p>
                    </div>
                     {/* Tablet Kart 3: Harita/Presence */}
                    <div className="glass p-2 rounded-xl border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1">
                         {/* FOTO 3 */}
                        <img src="/images/home-assistant-foto3.png" alt="Tablet UI Map" className="w-full h-auto rounded-lg shadow-sm" />
                        <p className="text-xs text-muted-foreground text-center mt-2 font-medium">Anwesenheit & Geofencing</p>
                    </div>
                </div>
            </div>

             {/* C) Enerji Analizi */}
            <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 gradient-text">
                    <Activity size={20} />
                    Energiemanagement & Datenanalyse
                </h3>
                <div className="bg-[#121212] rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-70"></div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 order-2 md:order-1">
                            <h4 className="text-lg font-bold text-white mb-2">Verbrauchstransparenz</h4>
                             <p className="text-sm text-gray-400 leading-relaxed">
                                Durch den Einsatz von Tuya Smart Plugs mit Leistungsmessung werden Stromverbräuche einzelner Geräte (z.B. Server, Workstation)
                                erfasst. Home Assistant aggregiert diese Daten zu Tages-, Wochen- und Monatsstatistiken.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Identifikation von Stromfressern</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Kostenanalyse in Echtzeit</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary" /> Langzeit-Datenspeicherung (InfluxDB/MariaDB)</li>
                            </ul>
                        </div>
                        <div className="space-y-4 order-1 md:order-2">
                             {/* FOTO 5 (GitHub'da png görünüyor) */}
                            <img src="/images/home-assistant-foto5.png" alt="Energy Graph Weekly" className="w-full h-auto rounded-lg border border-white/10 shadow-md hover:shadow-primary/20 transition-shadow" />
                             {/* FOTO 6 (GitHub'da png görünüyor) */}
                            <img src="/images/home-assistant-foto6.png" alt="Device Energy List" className="w-full h-auto rounded-lg border border-white/10 shadow-md hover:shadow-primary/20 transition-shadow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* =====================================================================================
          6. CHALLENGES & FAZIT (DOKÜMANDAN ALINTILAR)
          ===================================================================================== */}
      <section className="py-16 px-4 max-w-4xl mx-auto space-y-16">
        {/* Karşılaşılan Sorunlar */}
        <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <AlertTriangle className="text-orange-500 w-7 h-7" />
                Herausforderungen & Learnings
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

        {/* Sonuç ve Gelecek (Fazit) */}
        <div className="glass p-8 rounded-2xl border-primary/10 bg-primary/5 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
            <div className="bg-primary/10 p-4 rounded-full flex-shrink-0">
                <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3 gradient-text">Fazit & Ausblick</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Das Projekt hat erfolgreich gezeigt, dass eine leistungsfähige, datenschutzkonforme Smart-Home-Infrastruktur
                    ohne Cloud-Zwang realisierbar ist. Die Kombination aus Raspberry Pi 5, Docker und Zigbee hat sich als
                    äußerst stabil und performant erwiesen.
                </p>
                <p className="text-sm font-medium text-foreground">
                    Nächste Schritte (Roadmap): Implementierung von Layer-3 Routing und weiterer Ausbau der Sensorik.
                </p>
            </div>
        </div>

      </section>

    </Layout>
  );
};

export default ProjektHomeAssistant;
