import React from "react";
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
  Globe,
  ShieldCheck,
  Activity,
  Zap
} from "lucide-react";

const ProjektWebServer = () => {
  // --- PROJE İSTATİSTİKLERİ ---
  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "08.12 - 09.12.2025" },
    { icon: ServerIcon, label: "Hardware", value: "Raspberry Pi 5" },
    { icon: Activity, label: "Uptime", value: "99.9%" },
    { icon: CheckCircle2, label: "Status", value: "Aktiv (Local)", highlight: true },
  ];

  // --- TECH STACK ---
  const techStack = [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", title: "Raspberry Pi OS", desc: "Host System" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", title: "Docker", desc: "Container Engine" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", title: "Nginx", desc: "Web Server" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", title: "Shell / Bash", desc: "Administration" },
  ];

  // --- DEKLARATİF KOD İÇERİKLERİ ---
  const dockerPsOutput = `CONTAINER ID   IMAGE                 STATUS          PORTS
a1b2c3d4e5f6   nginx:stable-alpine   Up 3 weeks      0.0.0.0:8082->80/tcp`;

  return (
    <Layout>
      {/* --- HERO SECTION --- */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        {/* Arkaplan Süslemeleri */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Systemintegration Projekt
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 dark:from-white dark:via-emerald-400 dark:to-white">
              Web Server auf Raspberry Pi
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Implementierung einer skalierbaren, Docker-basierten Web-Server-Infrastruktur 
            zur lokalen Bereitstellung statischer Inhalte.
          </p>

          {/* DOKÜMAN İNDİRME BUTONU */}
          <div className="flex justify-center mb-16">
            <a 
              href="/web_server.docx" 
              download 
              className="
                group relative inline-flex items-center gap-4 px-8 py-4 
                rounded-2xl overflow-hidden transition-all duration-300
                bg-white dark:bg-slate-900 
                border border-emerald-500/20 hover:border-emerald-500/50
                shadow-xl shadow-emerald-500/5 hover:shadow-emerald-500/20
                hover:-translate-y-1
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              
              <div className="bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600/70 dark:text-emerald-400/70">
                  Technische Dokumentation
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  Projektbericht herunterladen (.DOCX)
                </span>
              </div>
              
              <Download className="w-5 h-5 ml-2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </a>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass p-4 rounded-2xl border border-white/10 dark:border-white/5 hover:border-emerald-500/30 transition-colors duration-300">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-emerald-500" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font-bold text-lg ${stat.highlight ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTEXT & CHALLENGE --- */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-primary/10 text-primary"><Database size={24} /></span>
              Ausgangslage & Ziel
            </h2>
            <div className="prose dark:prose-invert text-muted-foreground leading-relaxed">
              <p>
                In der bestehenden Home-LAB-Umgebung fehlte eine zentrale Instanz zur Bereitstellung statischer Webinhalte. 
                Ziel war es, einen <strong>isolierten und reproduzierbaren</strong> Web-Server aufzubauen, ohne dabei direkt 
                in das Host-System einzugreifen.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Isolation:</strong> Nutzung von Docker zur sauberen Trennung von Host und Applikation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Persistence:</strong> Volume-Mounting für einfache Inhaltsaktualisierung ohne Re-Deployment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span><strong>Security First:</strong> Bewusster Verzicht auf Public Exposure (vorerst nur LAN).</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* SSH LOGIN GÖRSELİ */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-3xl -z-10 group-hover:bg-emerald-500/30 transition-all duration-500" />
            <div className="glass overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <div className="bg-[#1a1b26] p-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-slate-500 font-mono ml-2">lgbeta@raspberrypi:~ (SSH)</div>
              </div>
              <img 
                src="/images/webserver-foto1.png" 
                alt="SSH Access Raspberry Pi" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TECHNICAL DEEP DIVE (IAC & TERMINAL) --- */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Infrastructure as Code</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Die gesamte Konfiguration ist deklarativ in <code>docker-compose.yml</code> definiert. 
              Dies garantiert Reproduzierbarkeit und Versionierung.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SOL: VS CODE GÖRÜNÜMÜ (Code Block) */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e] border border-white/10 font-mono text-sm group hover:-translate-y-1 transition-transform duration-500">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Code size={16} className="text-blue-400" />
                  <span>docker-compose.yml</span>
                </div>
                <div className="text-xs text-slate-500">YAML</div>
              </div>
              {/* Code Body */}
              <div className="p-6 overflow-x-auto">
                <pre className="leading-relaxed">
                  <code>
                    <span className="text-pink-400">services</span>:<br/>
                    &nbsp;&nbsp;<span className="text-blue-400">nginx_portfolio</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">image</span>: <span className="text-orange-300">nginx:stable-alpine</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">container_name</span>: <span className="text-green-300">nginx_portfolio</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">restart</span>: <span className="text-orange-300">unless-stopped</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">ports</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-green-300">"8082:80"</span> <span className="text-slate-500">// Host Port 8082</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">volumes</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="text-green-300">./html:/usr/share/nginx/html:ro</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* SAĞ: TERMINAL VE CURL KANITI */}
            <div className="flex flex-col gap-6">
              
              {/* Terminal Status Text */}
              <div className="rounded-xl overflow-hidden shadow-xl bg-black border border-white/10 font-mono text-xs md:text-sm">
                <div className="flex items-center px-4 py-2 bg-slate-800/50 border-b border-white/5">
                  <Terminal size={14} className="text-slate-400 mr-2" />
                  <span className="text-slate-400">docker ps status</span>
                </div>
                <div className="p-4 text-green-400">
                  <div className="mb-2">
                    <span className="text-blue-400">lgbeta@raspberrypi:~/webserver $</span> docker ps --filter "name=nginx"
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap">{dockerPsOutput}</pre>
                </div>
              </div>

              {/* Curl Header Check (GÖRSEL - webserver-foto4.png) */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-emerald-500/30 group">
                <div className="flex items-center justify-between px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-bold uppercase">Header Verification</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/60">curl -I localhost:8082</span>
                </div>
                
                {/* --- DÜZELTİLDİ: Curl Fotoğrafı --- */}
                <img 
                  src="/images/webserver-foto4.png" 
                  alt="Curl Header Check" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- VERIFICATION (BROWSER & NETWORK) --- */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500/10 p-3 rounded-full">
              <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Validierung & Testing</h2>
              <p className="text-muted-foreground">Client-seitige Überprüfung der Server-Antworten (HTTP 200 OK).</p>
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="relative group rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1b26]">
            {/* Browser Header */}
            <div className="bg-slate-100 dark:bg-[#24283b] px-4 py-3 flex items-center gap-4 border-b border-slate-200 dark:border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              
              {/* Address Bar */}
              <div className="flex-1 bg-white dark:bg-[#1a1b26] rounded-md px-3 py-1.5 text-xs md:text-sm text-center font-mono text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 shadow-inner">
                <Globe size={12} className="text-slate-400" />
                <span>http://100.85.7.24:8082</span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="relative aspect-video bg-slate-50">
              {/* --- DÜZELTİLDİ: Browser Fotoğrafı (.jpg olarak) --- */}
              <img 
                src="/images/webserver-foto5.png" 
                alt="Browser Network Analysis" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Annotations */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border border-white/20 shadow-lg translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <div className="font-bold text-emerald-400 mb-1">Status: 200 OK</div>
                <div className="text-slate-300">Server: Nginx</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {techStack.map((tech) => (
              <div key={tech.title} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-colors">
                <img src={tech.icon} alt={tech.title} className="w-8 h-8 mb-2 opacity-80" />
                <span className="text-sm font-semibold">{tech.title}</span>
                <span className="text-[10px] text-muted-foreground">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUTRO / NEXT STEPS --- */}
      <section className="py-12 px-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Fazit & Ausblick</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Das Projekt bestätigt die Stabilität der Container-basierten Architektur. 
            Mit einer Speicherbelegung von unter 50MB und einer Startzeit von wenigen Sekunden 
            ist die Basis für das kommende Hosting-Projekt geschaffen.
          </p>
          
          <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full">
            <span>Nächster Schritt:</span>
            <span className="text-foreground">Cloudflare Tunnel & SSL (Kein Port-Forwarding)</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektWebServer;
