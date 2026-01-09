import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  Calendar,
  Server as ServerIcon,
  CheckCircle2,
  ArrowRight,
  Shield,
  Globe,
  Lock,
  Cloud,
  X,
  FileText,
  Download,
  Terminal,
  Activity,
  Network,
  Cpu,
  Link as LinkIcon,
  Zap
} from "lucide-react";

type LightboxData = {
  src: string;
  alt: string;
};

const ProjektWebHosting = () => {
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "10.12 - 12.12.2025" },
    { icon: ServerIcon, label: "Hardware", value: "Raspberry Pi 5" },
    { icon: Globe, label: "Modus", value: "Self-Hosted" },
    { icon: CheckCircle2, label: "Status", value: "Produktiv", highlight: true },
  ];

  // RESMİ LOGOLAR İÇİN URL'LER
  const techStack = [
    { 
      iconUrl: "https://cdn.simpleicons.org/raspberrypi/C51A4A", 
      title: "Raspberry Pi OS", 
      desc: "Host Operating System" 
    },
    { 
      iconUrl: "https://cdn.simpleicons.org/docker/2496ED", 
      title: "Docker Engine", 
      desc: "Container Virtualization" 
    },
    { 
      iconUrl: "https://cdn.simpleicons.org/nginx/009639", 
      title: "Nginx Web Server", 
      desc: "Static Content Delivery" 
    },
    { 
      iconUrl: "https://cdn.simpleicons.org/cloudflare/F38020", 
      title: "Cloudflare Tunnel", 
      desc: "Zero Trust Reverse Tunnel" 
    },
  ];

  const benefits = [
    { icon: Shield, title: "Sicherheit (No Port-Forwarding)", desc: "Keine offenen Ports am Heimrouter notwendig." },
    { icon: Lock, title: "Automatisches SSL/TLS", desc: "Zertifikatsmanagement via Cloudflare Edge." },
    { icon: Zap, title: "Resilienz (Dynamic IP)", desc: "Unabhängig von IP-Änderungen des ISPs." },
  ];

  const Lightbox = () => {
    if (!lightbox) return null;

    return (
      <div
        className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        onClick={() => setLightbox(null)}
      >
        <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="absolute -top-3 -right-3 md:top-2 md:right-2 inline-flex items-center justify-center rounded-full bg-black/70 text-white border border-white/20 w-10 h-10 hover:bg-black/80"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain"
              draggable={false}
              loading="eager" 
            />
          </div>

          <p className="text-xs text-white/70 mt-3 text-center">Tipp: ESC zum Schließen</p>
        </div>
      </div>
    );
  };

  const ClickToZoomImage = ({ src, alt, caption, type = "default" }: { src: string; alt: string; caption?: string; type?: "terminal" | "browser" | "default" }) => (
    <div className="group h-full flex flex-col">
      <button
        type="button"
        className="block w-full text-left transition-transform hover:scale-[1.01] flex-1"
        onClick={() => setLightbox({ src, alt })}
        aria-label="Bild vergrößern"
      >
        <div className={`rounded-lg overflow-hidden border relative shadow-lg h-full flex flex-col ${type === 'terminal' ? 'bg-[#1e1e1e] border-slate-700' : 'bg-white/5 border-white/10'}`}>
           
           {/* Terminal Header Süsü */}
           {type === 'terminal' && (
             <div className="bg-[#2d2d2d] px-3 py-1.5 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono ml-2 opacity-50">bash — 80x24</div>
             </div>
           )}

          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain flex-1 opacity-90 group-hover:opacity-100 transition-opacity"
            loading="lazy" 
            decoding="async"
          />
          
          {/* Zoom Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <div className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
               Vergrößern 🔍
             </div>
          </div>
        </div>
      </button>
      {caption && (
        <p className="mt-2 text-xs text-muted-foreground text-center font-mono">{caption}</p>
      )}
    </div>
  );

  return (
    <Layout>
      <style jsx global>{`
        .no-motion *,
        .no-motion *::before,
        .no-motion *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
        .no-motion .glass {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `}</style>

      <div className="no-motion">
        <Lightbox />

        {/* --- 1. HERO SECTION --- */}
        <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium mb-6">
               <Cloud size={14} />
               <span>Secure Self-Hosting Project</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Secure Web Hosting &<br />
              <span className="gradient-text">Reverse Tunneling (Self-Hosted)</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Veröffentlichung einer lokalen Webanwendung ohne Port-Forwarding mittels Cloudflare Zero Trust Tunnel.
            </p>

            {/* Download Button */}
            <div className="flex justify-center mb-10">
              <a 
                href="/web-hosting-ohne-port-forwarding.docx" 
                download 
                className="
                  group relative inline-flex items-center gap-3 px-8 py-4 
                  rounded-full overflow-hidden transition-all duration-300
                  bg-white dark:bg-white/5 
                  border-2 border-orange-500/20 shadow-lg shadow-orange-500/10
                  hover:border-orange-500/50 hover:scale-105
                "
              >
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-bold tracking-widest uppercase text-orange-600/80 dark:text-orange-400/80">
                    PROJEKT DOKUMENTATION
                  </span>
                  <span className="text-sm font-black transition-colors text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300">
                    Download .DOCX
                  </span>
                </div>
                <Download className="w-5 h-5 ml-2 transition-all text-slate-400 dark:text-white/50 group-hover:text-orange-600 dark:group-hover:text-white group-hover:translate-y-1" />
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center border-t border-white/10">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`font-semibold ${stat.highlight ? "text-emerald-500" : ""}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 2. PROJEKTÜBERSICHT (PROJE ÖZETİ - ÖNE ALINDI) --- */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Projektübersicht & Kontext</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Im vorangegangenen Projekt wurde ein Nginx-Webserver erfolgreich auf einem Raspberry Pi im lokalen Netzwerk deployt. 
                Der nächste logische Schritt war die <strong>öffentliche Bereitstellung (Self-Hosting)</strong> dieser Anwendung.
              </p>
              <p>
                Das Hauptziel war es, die lokale Webanwendung sicher über das Internet erreichbar zu machen, ohne dabei Kompromisse bei der Sicherheit des Heimnetzwerks einzugehen.
                Anstatt unsicherer Methoden wie Port-Forwarding wurde eine <strong>Reverse-Tunnel-Architektur</strong> mittels Cloudflare implementiert.
              </p>
            </div>
          </div>
        </section>

        {/* --- 3. REQUEST FLOW (AKIŞ ŞEMASI - YUKARI TAŞINDI) --- */}
        <section className="py-8 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-8">
             <h2 className="text-2xl font-bold mb-2">Wie der Zugriff funktioniert</h2>
             <p className="text-muted-foreground">Vom Besucher bis zum Raspberry Pi – sicher und verschlüsselt.</p>
          </div>
          <div className="glass rounded-xl p-4 md:p-8">
            <ClickToZoomImage
              src="/images/Zugriff_eines_Besuchers_auf_die_Website.jpg"
              alt="Zugriff eines Besuchers auf die Website - Flow Chart"
              caption="Diagramm: Request Flow - Der Verkehr wird über das Cloudflare Edge Network geroutet."
            />
          </div>
        </section>

        {/* --- 4. WHY REVERSE TUNNEL (YENİ BÖLÜM: GÜVENLİK & YÖNTEM) --- */}
        <section className="py-12 px-4 max-w-4xl mx-auto space-y-8">
           {/* Reverse Tunnel vs Port Forwarding */}
           <div className="glass rounded-xl p-6 md:p-8 border-l-4 border-orange-500">
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
               <div className="bg-orange-500/10 p-2 rounded-lg">
                  <Shield className="text-orange-500 w-6 h-6" />
               </div>
               Sicherheitskonzept: Reverse Tunnel vs. Port Forwarding
             </h2>
             <p className="text-muted-foreground mb-4 leading-relaxed">
               Ein klassisches Port-Forwarding würde bedeuten, dass eingehende Ports am Router geöffnet werden müssen. 
               Dies stellt ein erhebliches Sicherheitsrisiko dar, da Angreifer direkt auf das Heimnetzwerk zugreifen könnten.
             </p>
             <div className="bg-background/50 rounded-lg p-4">
               <h3 className="font-semibold mb-2 text-foreground">Warum Cloudflare Tunnel (Reverse Tunnel)?</h3>
               <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                     <span>
                       <strong>Outbound-Only Verbindung:</strong> Der Tunnel wird vom Raspberry Pi nach außen zu Cloudflare aufgebaut. Es gibt keine eingehenden Ports.
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                     <span>
                       <strong>DDOS Schutz:</strong> Die echte IP-Adresse des Anschlusses bleibt verborgen (Cloaking).
                     </span>
                  </li>
                  <li className="flex items-start gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                     <span>
                       <strong>Resilienz gegen IP-Wechsel:</strong> Da der Tunnel softwareseitig verwaltet wird, funktioniert die Verbindung auch bei dynamischen öffentlichen IPs (ohne DynDNS).
                     </span>
                  </li>
               </ul>
             </div>
           </div>
        </section>

        {/* --- 5. PROOF OF WORK (KANITLAR) --- */}
        <section className="py-12 px-4 bg-slate-50/50 dark:bg-slate-900/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                   <Activity className="text-emerald-500" />
                   Technische Validierung & Status
                </h2>
                <p className="text-muted-foreground">Live-Daten aus der Produktionsumgebung (Docker & Cloudflare)</p>
             </div>

             <div className="grid md:grid-cols-2 gap-8 items-start">
                
                {/* SOL KOLON: LOCAL ENVIRONMENT (TERMINAL) */}
                <div className="space-y-8">
                    {/* 1. Docker PS (webhosting3.png) */}
                    <div className="glass rounded-xl p-5 border border-slate-500/20">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
                            <Terminal size={18} className="text-slate-500" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold uppercase text-foreground">Local Environment</span>
                              <span className="text-[10px] text-muted-foreground">Raspberry Pi (SSH) - Container Status</span>
                            </div>
                        </div>
                        <ClickToZoomImage 
                            src="/images/webhosting3.png" 
                            alt="Docker PS Output showing Nginx and Cloudflared"
                            caption="Abb 1: Proof of Work - Nginx und Cloudflared laufen parallel im selben Docker-Netzwerk."
                            type="terminal"
                        />
                    </div>

                    {/* 2. Docker Logs (webhosting2.png) */}
                    <div className="glass rounded-xl p-5 border border-slate-500/20">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
                            <Network size={18} className="text-orange-500" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold uppercase text-foreground">Tunnel Connection Logs</span>
                              <span className="text-[10px] text-muted-foreground">Outbound Traffic Analysis</span>
                            </div>
                        </div>
                        <ClickToZoomImage 
                            src="/images/webhosting2.png" 
                            alt="Cloudflared Logs showing Frankfurt Connection"
                            caption="Abb 2: Tunnel etabliert - Verbindung zu Cloudflare Edge Servern (Rechenzentrum FRA/Frankfurt) erfolgreich."
                            type="terminal"
                        />
                    </div>
                </div>

                {/* SAĞ KOLON: CLOUD & SSL (DASHBOARD) */}
                <div className="space-y-8">
                    
                    {/* 3. Cloudflare Connector (webhosting4.png) */}
                    <div className="glass rounded-xl p-5 border border-orange-500/20">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
                            <Cloud size={18} className="text-[#f38020]" />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold uppercase text-foreground">Zero Trust Dashboard</span>
                              <span className="text-[10px] text-muted-foreground">Connector Diagnose</span>
                            </div>
                        </div>
                        <ClickToZoomImage 
                            src="/images/webhosting4.png" 
                            alt="Cloudflare Connector Diagnose Dashboard"
                            caption="Abb 3: Tunnel-Diagnose bestätigt Verbindung von Private IP (172.18.0.3) zu Edge."
                        />
                    </div>

                    {/* 4. SSL DETAILED CARD (Geliştirilmiş Versiyon) */}
                    <div className="glass rounded-xl p-0 overflow-hidden border border-blue-500/20 flex flex-col">
                        <div className="bg-blue-500/10 p-4 border-b border-blue-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Lock size={18} className="text-blue-500" />
                                <span className="text-sm font-bold text-blue-500 uppercase">SSL / TLS Verification</span>
                            </div>
                            <div className="flex gap-2">
                               <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] px-2 py-1 rounded border border-blue-500/20 font-mono">TLS 1.3</span>
                               <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-1 rounded border border-emerald-500/20 font-mono">X25519</span>
                            </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
                            {/* Browser Simulation */}
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-100 dark:bg-black/40 border border-border shadow-inner">
                                <div className="bg-emerald-500 p-2 rounded-full shadow-lg shadow-emerald-500/20">
                                    <Lock size={20} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-muted-foreground mb-0.5">Common Name (CN)</div>
                                    <div className="font-mono text-base font-bold truncate text-foreground">gokhanzehirlioglu.de</div>
                                </div>
                                <CheckCircle2 size={20} className="text-emerald-500" />
                            </div>
                            
                            {/* Detailed Tech Data */}
                            <div className="space-y-2 text-sm bg-background/50 p-4 rounded-lg border border-border/50 font-mono text-xs">
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Issuer:</span>
                                    <span className="font-medium text-foreground">Google Trust Services</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Protocol:</span>
                                    <span className="font-medium text-emerald-500">TLS 1.3 (Secure)</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Cipher:</span>
                                    <span className="text-[10px] opacity-80">AEAD-CHACHA20-POLY1305-SHA256</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Valid From:</span>
                                    <span>11.12.2025</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Valid To:</span>
                                    <span className="font-bold text-emerald-500">11.03.2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
             </div>
          </div>
        </section>

        {/* --- 6. TECH STACK (RESMİ LOGOLARLA YENİLENDİ) --- */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Eingesetzte Technologien</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div key={tech.title} className="glass rounded-xl p-6 hover:border-primary/50 transition-colors flex flex-col items-center text-center gap-4 group">
                  <div className="h-14 w-14 flex items-center justify-center p-1 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                      <img src={tech.iconUrl} alt={tech.title} className="w-full h-full object-contain" />
                  </div>
                  <div>
                      <h3 className="font-semibold text-sm mb-1">{tech.title}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

        {/* --- 7. AUTOMATION & CI/CD --- */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Automatisierter CI/CD Prozess
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Änderungen am Quellcode starten automatisch einen Build-Prozess. 
              Dies gewährleistet, dass jede Änderung getestet und reproduzierbar veröffentlicht wird.
            </p>

            <ClickToZoomImage
              src="/images/Automatisierter_Veroeffentlichungsprozess.jpg"
              alt="Automatisierter Entwicklungs- und Veröffentlichungsprozess"
            />
          </div>
        </section>

        {/* --- 8. BENEFITS & FAZIT --- */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Vorteile der Architektur</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 hover:bg-emerald-500/10 transition-colors">
                  <benefit.icon className="w-8 h-8 text-emerald-500 mb-3" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
        </section>

      </div>
    </Layout>
  );
};

export default ProjektWebHosting;
