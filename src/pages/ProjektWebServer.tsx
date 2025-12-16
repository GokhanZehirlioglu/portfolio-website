import Layout from "@/components/Layout";
import { Calendar, Server as ServerIcon, CheckCircle2, ArrowRight, Code, Database, Settings } from "lucide-react";

const ProjektWebServer = () => {
  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "08.12 - 09.12.2025" },
    { icon: ServerIcon, label: "Platform", value: "Raspberry Pi" },
    { icon: Code, label: "Web Server", value: "Nginx" },
    { icon: CheckCircle2, label: "Status", value: "Abgeschlossen", highlight: true },
  ];

  const techStack = [
    { icon: "🐧", title: "Raspberry Pi OS", desc: "Linux-basiertes Betriebssystem" },
    { icon: "🐳", title: "Docker", desc: "Container-Verwaltung" },
    { icon: "📦", title: "Docker Compose", desc: "Multi-Container Orchestrierung" },
    { icon: "🌐", title: "Nginx", desc: "Web Server" },
  ];

  const highlights = [
    { icon: Database, title: "Container-basiert", desc: "Klare Trennung von Host-System und Anwendung" },
    { icon: Settings, title: "Volume Mounting", desc: "Änderungen ohne Container-Neubau möglich" },
    { icon: Code, title: "Dokumentiert", desc: "Nachvollziehbare und reproduzierbare Konfiguration" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Web Server auf Raspberry Pi</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Docker-basierter Nginx Web Server auf Raspberry Pi - Home LAB Projekt
          </p>

          {/* Tech Logos */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" className="w-12 h-12 animate-float" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-12 h-12 animate-float" style={{ animationDelay: "0.2s" }} />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" className="w-12 h-12 animate-float" style={{ animationDelay: "0.4s" }} />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-12 h-12 animate-float" style={{ animationDelay: "0.6s" }} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center hover-lift">
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
              {["🐧 Linux Host", "🐳 Docker Engine", "📦 Container", "🌐 Nginx", "📁 Web Content"].map((step, index, arr) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{step.split(" ")[0]}</div>
                    <div className="text-xs font-medium">{step.split(" ").slice(1).join(" ")}</div>
                  </div>
                  {index < arr.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground animate-pulse-arrow hidden md:block" />
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
        <div className="glass rounded-xl p-6 md:p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Projektübersicht</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            In diesem Projekt wurde innerhalb einer bestehenden Home-LAB-Umgebung ein Nginx Web Server auf einem Raspberry Pi 
            eingerichtet. Der Betrieb erfolgt containerbasiert mit Docker, wodurch eine saubere Trennung zwischen Host-System 
            und Anwendung gewährleistet wird.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ziel war es, eine stabile und wartbare Web-Server-Grundstruktur zur Bereitstellung statischer Webinhalte im lokalen 
            Netzwerk aufzubauen. Das Projekt stellt bewusst keine öffentliche Veröffentlichung dar, sondern dient als technische 
            Basis und Vorbereitung für ein nachfolgend geplantes Hosting-Projekt ohne Port-Forwarding.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Verwendete Technologien</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.title} className="glass rounded-xl p-4 hover-lift">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <h3 className="font-semibold mb-1">{tech.title}</h3>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Projekt-Highlights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {highlights.map((highlight) => (
              <div key={highlight.title} className="bg-emerald/10 border border-emerald/30 rounded-xl p-6 hover-lift">
                <highlight.icon className="w-8 h-8 text-emerald mb-3" />
                <h3 className="font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="glass rounded-xl p-6 md:p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Zielsetzung</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <span>Funktionsfähiger Nginx Web Server als Docker-Container betreiben</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <span>Statische Webinhalte zuverlässig im lokalen Netzwerk bereitstellen</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <span>Übersichtliche, dokumentierte und reproduzierbare Konfiguration</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <span>Grundlage für sichere Veröffentlichung ohne Infrastruktur-Umbau</span>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektWebServer;
