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
  FileText, // Yeni ekledik: Dosya ikonu
  Download, // Yeni ekledik: İndirme ikonu
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
    { icon: ServerIcon, label: "Platform", value: "Raspberry Pi" },
    { icon: Cloud, label: "Tunnel", value: "Cloudflare" },
    { icon: CheckCircle2, label: "Status", value: "Produktiv", highlight: true },
  ];

  const techStack = [
    { icon: "🐧", title: "Raspberry Pi OS", desc: "Linux-basiertes Betriebssystem" },
    { icon: "🐳", title: "Docker", desc: "Container-Plattform" },
    { icon: "🌐", title: "Nginx", desc: "Web Server" },
    { icon: "☁️", title: "Cloudflare Tunnel", desc: "Reverse Tunnel Lösung" },
  ];

  const benefits = [
    { icon: Shield, title: "Keine Portweiterleitung", desc: "Höhere Sicherheit durch geschlossene Ports" },
    { icon: Lock, title: "Automatisches SSL", desc: "HTTPS wird automatisch bereitgestellt" },
    { icon: Globe, title: "Dynamische IP", desc: "Funktioniert auch bei wechselnder IP-Adresse" },
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

  const ClickToZoomImage = ({ src, alt }: { src: string; alt: string }) => (
    <button
      type="button"
      className="block w-full text-left"
      onClick={() => setLightbox({ src, alt })}
      aria-label="Bild vergrößern"
    >
      <div className="rounded-lg overflow-hidden border border-border relative">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy" 
          decoding="async"
        />
        <div className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-md bg-black/60 text-white/90">
          Klicken zum Vergrößern
        </div>
      </div>
    </button>
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

        {/* Hero (Giriş Bölümü) */}
        <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Web-Hosting ohne Port-Forwarding</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Sicheres Hosting mit Cloudflare Tunnel - Veröffentlichung einer lokalen Webanwendung ohne Portweiterleitung
            </p>
            {/* --- GÜNCELLENMİŞ VE OKUNAKLI BUTON KODU --- */}
            <div className="flex justify-center mb-10">
              <a 
                href="/web-hosting-ohne-port-forwarding.docx" 
                download 
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-emerald-500/20 rounded-full overflow-hidden transition-all hover:border-emerald-500/50 hover:scale-105 shadow-lg shadow-emerald-500/10"
              >
                {/* Arka planı beyaz yaptık, gölge ekledik */}
                
                {/* İkon rengini koyu yeşil yaptık */}
                <FileText className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                
                <div className="flex flex-col items-start text-left">
                  {/* İSTEDİĞİN DEĞİŞİKLİK: Kelimeyi ayırdık ve rengini koyulaştırdık */}
                  <span className="text-xs text-emerald-600/80 font-bold tracking-widest uppercase">PROJEKT DOKUMENTATION</span>
                  
                  {/* İndirme yazısını simsiyah yaptık ki net okunsun */}
                  <span className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors">Download .DOCX</span>
                </div>
                
                {/* İndirme okunu belirgin hale getirdik */}
                <Download className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-y-1 transition-all ml-2" />
              </a>
            </div>
            {/* ------------------------------------------- */}


            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" alt="Cloudflare" className="w-12 h-12" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" className="w-12 h-12" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-12 h-12" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" className="w-12 h-12" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`font-semibold ${stat.highlight ? "text-emerald" : ""}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-center mb-8 gradient-text">System-Architektur</h3>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                {["🌐 Internet", "☁️ Cloudflare", "🔒 Tunnel", "🐳 Docker", "🖥️ Nginx"].map((step, index, arr) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">{step.split(" ")[0]}</div>
                      <div className="text-xs font-medium">{step.split(" ").slice(1).join(" ")}</div>
                    </div>
                    {index < arr.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4 max-w-4xl mx-auto space-y-12">
          {/* Projektübersicht */}
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Projektübersicht</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              In diesem Projekt wurde eine zuvor ausschließlich im lokalen Netzwerk betriebene Docker-basierte Webanwendung
              (Nginx) ohne Portweiterleitung sicher über das öffentliche Internet veröffentlicht. Hierfür kam Cloudflare
              Tunnel als Reverse-Tunnel-Lösung zum Einsatz.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Der Fokus lag auf einer sicheren, wartungsarmen und professionellen Veröffentlichung unter Verwendung einer
              eigenen Domain, automatischem HTTPS (SSL/TLS) sowie einer sauberen www- und non-www-Weiterleitung. Ziel war es,
              eine Home-LAB-Umgebung realitätsnah an professionelle Hosting-Szenarien anzunähern.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Verwendete Technologien</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div key={tech.title} className="glass rounded-xl p-4">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <h3 className="font-semibold mb-1">{tech.title}</h3>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold mb-6 gradient-text">Vorteile der Lösung</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-emerald/10 border border-emerald/30 rounded-xl p-6">
                  <benefit.icon className="w-8 h-8 text-emerald mb-3" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Cloudflare Tunnel */}
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Warum Cloudflare Tunnel?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Untersucht wurden klassische Portweiterleitungen, externes VPS-Hosting sowie VPN- und Reverse-Proxy-Kombinationen.
              Aufgrund von Sicherheitsrisiken, zusätzlichem Kostenaufwand oder erhöhter Komplexität wurden diese Varianten verworfen.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <span>Keine Portöffnung am Router erforderlich</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <span>SSL wird automatisch bereitgestellt</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <span>Zugriff auch bei wechselnder IP-Adresse des Heimanschlusses</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <span>Kostenlose Nutzung für private Projekte</span>
              </li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
              <Shield className="w-5 h-5" />
              Sicherheitshinweis
            </h3>
            <p className="text-muted-foreground">
              Durch Cloudflare Tunnel bleibt der Heimrouter vollständig geschlossen. Die Verbindung wird von innen nach außen
              aufgebaut, wodurch keine eingehenden Verbindungen akzeptiert werden müssen. Dies erhöht die Sicherheit erheblich.
            </p>
          </div>
        </section>

        {/* Automatisierter Entwicklungs- und Veröffentlichungsprozess */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Automatisierter Entwicklungs- und Veröffentlichungsprozess
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Änderungen an der Website werden direkt im Quellcode vorgenommen und in das GitHub-Repository gespeichert.
              Jeder gespeicherte Stand (Commit) startet automatisch einen definierten Prozess, bei dem die Website auf
              einem eigenen Server neu gebaut und veröffentlicht wird. Dadurch wird sichergestellt, dass alle Anpassungen
              kontrolliert, reproduzierbar und ohne manuelle Eingriffe online gehen. Die aktualisierte Version ist in der
              Regel innerhalb weniger Sekunden bis Minuten öffentlich sichtbar.
            </p>

            <ClickToZoomImage
              src="/images/Automatisierter_Veroeffentlichungsprozess.jpg"
              alt="Automatisierter Entwicklungs- und Veröffentlichungsprozess"
            />
          </div>
        </section>

        {/* Zugriff eines Besuchers auf die Website */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Zugriff eines Besuchers auf die Website</h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Wenn eine Besucherin oder ein Besucher die Website aufruft, wird die Anfrage über den Domainnamen an eine
              sichere Cloud-Infrastruktur weitergeleitet. Von dort aus gelangt die Anfrage über einen geschützten Tunnel
              zum Webserver, der die aktuellen Inhalte ausliefert. Dieser Ansatz ermöglicht einen stabilen, sicheren und
              performanten Zugriff auf die Website, ohne dass direkte Serverports im Internet geöffnet werden müssen.
            </p>

            <ClickToZoomImage
              src="/images/Zugriff_eines_Besuchers_auf_die_Website.jpg"
              alt="Zugriff eines Besuchers auf die Website"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjektWebHosting;
