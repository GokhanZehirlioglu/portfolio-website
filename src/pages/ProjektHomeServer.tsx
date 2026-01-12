import React, { useState } from "react";
import Layout from "@/components/Layout";
import { 
  Calendar, 
  Server as ServerIcon, 
  CheckCircle2, 
  ArrowRight, 
  Code, 
  Database, 
  FileText, 
  Download,
  Terminal,
  ShieldCheck,
  Activity,
  Zap,
  X,
  Maximize2,
  HardDrive,
  Cpu,
  Fan
} from "lucide-react";

const ProjektHomeServer = () => {
  // --- STATE: RESİM BÜYÜTME (LIGHTBOX) ---
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // --- PROJE İSTATİSTİKLERİ ---
  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "23.09 - 30.09.2025" },
    { icon: ServerIcon, label: "Hardware", value: "Raspberry Pi 5" },
    { icon: Activity, label: "Uptime", value: "48+ Tage" },
    { icon: CheckCircle2, label: "Status", value: "Aktiv (Produktiv)", highlight: true },
  ];

  // --- TECH STACK ---
  const techStack = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", title: "Raspberry Pi OS", desc: "Debian Trixie 64-bit" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", title: "Docker Engine", desc: "v28.5.2" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", title: "Linux", desc: "Host System" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ssh/ssh-original.svg", title: "SSH", desc: "Remote Admin" },
  ];

  // --- DEKLARATİF KOD İÇERİKLERİ ---
  const dockerInstallSteps = `# Official Docker Installation (ARM64)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Enable autostart
sudo systemctl enable docker

# Verify installation
docker --version`;

  return (
    <Layout>
      {/* --- LIGHTBOX OVERLAY (Büyütülmüş Resim) --- */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <img 
            src={zoomedImage} 
            alt="Zoomed Preview" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
          />
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-[#2496ED]/5 to-transparent relative overflow-hidden">
        {/* Arkaplan Süslemeleri - Docker Mavisi */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#2496ED]/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2496ED]/10 border border-[#2496ED]/20 text-[#2496ED] text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2496ED]"></span>
            </span>
            Infrastructure Projekt
          </div>

          {/* BAŞLIK TASARIMI */}
          <h1 className="flex flex-col items-center justify-center font-bold tracking-tight mb-8">
            <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#2496ED] via-blue-600 to-slate-700 dark:to-slate-300 pb-2">
              Home Server & Infrastruktur
            </span>
            <span className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium mt-2">
              Einrichten (Docker-Basis)
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Aufbau einer stabilen, containerfähigen Server-Grundlage auf Raspberry Pi 5 
            als Basis für ein modulares Home-LAB.
          </p>

          {/* DOKÜMAN İNDİRME BUTONU - Docker Mavisi */}
          <div className="flex justify-center mb-16">
            <a 
              href="/home_server.docx" 
              download 
              className="
                group relative inline-flex items-center gap-4 px-8 py-4 
                rounded-2xl overflow-hidden transition-all duration-300
                bg-white dark:bg-slate-900 
                border border-[#2496ED]/30 hover:border-[#2496ED]
                shadow-[0_0_20px_-5px_rgba(36,150,237,0.3)] hover:shadow-[0_0_30px_-5px_rgba(36,150,237,0.6)]
                hover:-translate-y-1
              "
            >
              {/* Buton İçi Parlama */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2496ED]/0 via-[#2496ED]/5 to-[#2496ED]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <div className="bg-[#2496ED]/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-[#2496ED]" />
              </div>
              
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest uppercase text-[#2496ED]">
                  Technische Dokumentation
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  Projektbericht herunterladen (.DOCX)
                </span>
              </div>
              
              <Download className="w-5 h-5 ml-2 text-slate-400 group-hover:text-[#2496ED] transition-colors" />
            </a>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass p-4 rounded-2xl border border-white/10 dark:border-white/5 hover:border-[#2496ED]/30 transition-colors duration-300">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-[#2496ED]" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-bold text-lg ${stat.highlight ? "text-[#2496ED] dark:text-blue-400" : "text-foreground"}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTEXT & STRATEGY --- */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-[#2496ED]/10 text-[#2496ED]"><Database size={24} /></span>
              Ausgangslage & Zielsetzung
            </h2>
            
            <div className="prose dark:prose-invert text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Zu Beginn des Projekts existierte kein dedizierter Server im Heimnetzwerk. 
                Im Rahmen der <strong>FISI-Umschulung</strong> bestand der Anspruch, theoretische Inhalte 
                nicht nur punktuell umzusetzen, sondern in einer <strong>realen, dauerhaft betriebenen Umgebung</strong> anzuwenden.
              </p>
              <p>
                Das Projekt fokussiert sich bewusst auf den <strong>Aufbau einer technisch sauberen Infrastruktur</strong>, 
                nicht auf einzelne Anwendungen. Die Infrastruktur sollte so konzipiert sein, dass sie 
                einen <strong>dauerhaften 24/7-Betrieb</strong> erlaubt, remote administrierbar ist und 
                klare Grenzen zwischen Betriebssystem, Container-Runtime und Anwendungen zieht.
              </p>
            </div>
            
            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2496ED] mt-1 flex-shrink-0" />
                <span><strong>Isolation:</strong> Docker ermöglicht saubere Trennung von Host und Anwendungen.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2496ED] mt-1 flex-shrink-0" />
                <span><strong>Modularität:</strong> Fundament für spätere LAB-Projekte ohne Vermischung.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2496ED] mt-1 flex-shrink-0" />
                <span><strong>Stabilität:</strong> Production-ready Betrieb für dauerhafte Nutzung.</span>
              </li>
            </ul>
          </div>
          
          {/* SSH LOGIN GÖRSELİ (Tıklanabilir) */}
          <div 
            className="relative group cursor-zoom-in"
            onClick={() => setZoomedImage("/images/HomeServer_Foto8.png")}
          >
            <div className="absolute inset-0 bg-[#2496ED]/20 blur-2xl rounded-3xl -z-10 group-hover:bg-[#2496ED]/30 transition-all duration-500" />
            <div className="glass overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="bg-[#1a1b26] p-3 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <div className="text-xs text-slate-500 font-mono ml-2">lgbeta@raspberrypi (SSH)</div>
                </div>
                <Maximize2 size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <img 
                src="/images/HomeServer_Foto8.png" 
                alt="SSH Remote Access" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- HARDWARE SHOWCASE --- */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="p-2 rounded-lg bg-[#2496ED]/10 text-[#2496ED]"><HardDrive size={28} /></span>
              Hardware-Basis & Kühlung
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Raspberry Pi 5 mit 16 GB RAM, aktiver Kühlung und optimiertem Gehäuse 
              für stabilen Dauerbetrieb.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Hardware Specs Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-[#2496ED]" />
                <h3 className="font-bold text-lg">Spezifikationen</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU:</span>
                  <span className="font-semibold">ARM Cortex-A76 (4 Cores)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-semibold">16 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage:</span>
                  <span className="font-semibold">32 GB SSD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">WLAN (DHCP)</span>
                </div>
              </div>
            </div>

            {/* Cooling System Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Fan className="w-8 h-8 text-[#2496ED]" />
                <h3 className="font-bold text-lg">Kühlsystem</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Aktives Kühlsystem mit integriertem Lüfter für thermische Stabilität im 24/7-Betrieb.</p>
                <p className="text-xs">Gehäuse mit optimierten Luftstrom-Öffnungen zur passiven Kühlung.</p>
              </div>
            </div>

            {/* Future Upgrades Card */}
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="w-8 h-8 text-[#2496ED]" />
                <h3 className="font-bold text-lg">Geplant</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>✓ Migration auf NVMe SSD</p>
                <p>✓ Kabelgebundenes Netzwerk</p>
                <p>✓ Netzwerksegmentierung</p>
              </div>
            </div>
          </div>

          {/* Hardware Images Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Case with Power Button */}
            <div 
              className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setZoomedImage("/images/HomeServer_Foto2.png")}
            >
              <img 
                src="/images/HomeServer_Foto2.png" 
                alt="Raspberry Pi Case - Power Button" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-medium">Power LED Indicator</p>
              </div>
              <Maximize2 size={14} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Case Airflow */}
            <div 
              className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setZoomedImage("/images/HomeServer_Foto3.png")}
            >
              <img 
                src="/images/HomeServer_Foto3.png" 
                alt="Raspberry Pi Case - Airflow" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-medium">Optimized Airflow Design</p>
              </div>
              <Maximize2 size={14} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Internal Cooling */}
            <div 
              className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setZoomedImage("/images/HomeServer_Foto4.png")}
            >
              <img 
                src="/images/HomeServer_Foto4.png" 
                alt="Raspberry Pi Internal Cooling" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-medium">Active Cooling System</p>
              </div>
              <Maximize2 size={14} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* --- DOCKER INSTALLATION & VALIDATION --- */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Docker Engine Installation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Offizielle Installation gemäß Docker-Dokumentation für ARM64-Architektur. 
              Systemd-Integration für automatischen Start.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SOL: INSTALLATION SCRIPT */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-white/10 font-mono text-sm group hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Code size={16} className="text-blue-400" />
                  <span>install-docker.sh</span>
                </div>
                <div className="text-xs text-slate-500">BASH</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="leading-relaxed text-xs md:text-sm">
                  <code className="text-slate-300">
                    <span className="text-slate-500"># Official Docker Installation (ARM64)</span><br/>
                    <span className="text-pink-400">curl</span> <span className="text-orange-300">-fsSL</span> https://get.docker.com <span className="text-orange-300">-o</span> get-docker.sh<br/>
                    <span className="text-pink-400">sudo</span> <span className="text-blue-400">sh</span> get-docker.sh<br/>
                    <br/>
                    <span className="text-slate-500"># Add user to docker group</span><br/>
                    <span className="text-pink-400">sudo</span> usermod <span className="text-orange-300">-aG</span> docker <span className="text-green-300">$USER</span><br/>
                    <br/>
                    <span className="text-slate-500"># Enable autostart</span><br/>
                    <span className="text-pink-400">sudo</span> systemctl enable docker<br/>
                    <br/>
                    <span className="text-slate-500"># Verify installation</span><br/>
                    docker <span className="text-orange-300">--version</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* SAĞ: DOCKER VERSION & STATUS */}
            <div className="flex flex-col gap-6">
              
              {/* Docker Version (Tıklanabilir) */}
              <div 
                className="rounded-xl overflow-hidden shadow-xl border border-[#2496ED]/30 group cursor-zoom-in relative"
                onClick={() => setZoomedImage("/images/HomeServer_Foto1.png")}
              >
                <div className="flex items-center justify-between px-4 py-2 bg-blue-950/30 border-b border-[#2496ED]/20">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-blue-400" />
                    <span className="text-xs text-blue-400 font-bold uppercase">Docker Version Check</span>
                  </div>
                  <Maximize2 size={12} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <img 
                  src="/images/HomeServer_Foto1.png" 
                  alt="Docker Version Info" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity bg-black"
                />
              </div>

              {/* Docker Service Status (Tıklanabilir) */}
              <div 
                className="rounded-xl overflow-hidden shadow-xl border border-[#2496ED]/30 group cursor-zoom-in relative"
                onClick={() => setZoomedImage("/images/HomeServer_Foto9.png")}
              >
                <div className="flex items-center justify-between px-4 py-2 bg-blue-950/30 border-b border-[#2496ED]/20">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-green-400" />
                    <span className="text-xs text-green-400 font-bold uppercase">Service Status (1 Month 18 Days)</span>
                  </div>
                  <Maximize2 size={12} className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <img 
                  src="/images/HomeServer_Foto9.png" 
                  alt="Docker Service Status" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity bg-black"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- SYSTEM VALIDATION --- */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#2496ED]/10 p-3 rounded-full">
              <ShieldCheck className="w-8 h-8 text-[#2496ED]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">System Validation & Uptime</h2>
              <p className="text-muted-foreground">Nachweis der Stabilität: 48+ Tage Dauerbetrieb ohne Unterbrechung.</p>
            </div>
          </div>

          {/* System Info Terminal (Tıklanabilir) */}
          <div 
            className="relative group rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 bg-[#1a1b26] cursor-zoom-in mb-8"
            onClick={() => setZoomedImage("/images/HomeServer_Foto5.png")}
          >
            {/* Terminal Header */}
            <div className="bg-[#24283b] px-4 py-3 flex items-center gap-4 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              
              <div className="flex-1 text-xs md:text-sm text-center font-mono text-slate-400 flex items-center justify-center gap-2">
                <Terminal size={12} />
                <span>System Information (48 Days Uptime)</span>
              </div>
              <Maximize2 size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Terminal Content */}
            <div className="relative">
              <img 
                src="/images/HomeServer_Foto5.png" 
                alt="System Information - 48 Days Uptime" 
                className="w-full h-auto"
              />
              
              {/* Overlay Highlight */}
              <div className="absolute top-4 right-4 bg-[#2496ED]/90 backdrop-blur-md text-white text-xs px-4 py-2 rounded-lg border border-white/20 shadow-lg translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <div className="font-bold mb-1">✓ 48+ Tage Uptime</div>
                <div className="text-slate-200 text-[10px]">Production Ready</div>
              </div>
            </div>
          </div>

          {/* Network Configuration (Tıklanabilir) */}
          <div 
            className="relative group rounded-xl overflow-hidden shadow-xl border border-white/10 bg-black cursor-zoom-in"
            onClick={() => setZoomedImage("/images/HomeServer_Foto6.png")}
          >
            <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-slate-400" />
                <span className="text-xs text-slate-400">Network Configuration (ifconfig)</span>
              </div>
              <Maximize2 size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <img 
              src="/images/HomeServer_Foto6.png" 
              alt="Network Configuration" 
              className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Tech Stack Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {techStack.map((tech) => (
              <div key={tech.title} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-[#2496ED]/30 transition-colors">
                <img src={tech.icon} alt={tech.title} className="w-8 h-8 mb-2 opacity-80" />
                <span className="text-sm font-semibold text-center">{tech.title}</span>
                <span className="text-[10px] text-muted-foreground text-center">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAZIT & AUSBLICK --- */}
      <section className="py-12 px-4 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Fazit & Ausblick</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Ergebnis */}
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2496ED]" />
                Projektergebnis
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Das Projekt wurde erfolgreich abgeschlossen. Es steht eine stabile, wartbare und 
                erweiterbare Server-Infrastruktur zur Verfügung, die als Grundlage für weitere 
                Home-LAB-Projekte dient. Die bewusste Trennung zwischen Infrastruktur und 
                Anwendungen ermöglicht sauberes, nachhaltiges Arbeiten.
              </p>
            </div>

            {/* Nächste Schritte */}
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-[#2496ED]" />
                Optimierungspotential
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[#2496ED]">→</span>
                  <span>Migration auf NVMe-Speicher für höhere Performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2496ED]">→</span>
                  <span>Umstellung auf kabelgebundenes Netzwerk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2496ED]">→</span>
                  <span>Implementierung von Netzwerksegmentierung</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Zentrale Aussage */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-sm font-medium bg-[#2496ED]/10 text-[#2496ED] px-6 py-3 rounded-full border border-[#2496ED]/20">
              <span className="font-bold">Infrastrukturarbeit als eigenständiger Projektwert</span>
              <ArrowRight size={16} />
            </div>
            <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
              Saubere Basis reduziert Komplexität und verhindert strukturelle Probleme in Folgeprojekten.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektHomeServer;
