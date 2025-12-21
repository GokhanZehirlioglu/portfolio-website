import Layout from "@/components/Layout";
import { 
  Download, 
  Calendar, 
  Server as ServerIcon, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Zap, 
  Database,
  FileText // Yeni eklendi
} from "lucide-react";

const ProjektHomeAssistant = () => {
  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "02.10 - 29.11.2025" },
    { icon: ServerIcon, label: "Platform", value: "Raspberry Pi 5" },
    { icon: Wifi, label: "Protokoll", value: "Zigbee + MQTT" },
    { icon: CheckCircle2, label: "Status", value: "Produktiv", highlight: true },
  ];

  const devices = [
    { icon: "💡", title: "Beleuchtung", desc: "Smarte Leuchtmittel", count: "8 Geräte" },
    { icon: "🔌", title: "Steckdosen", desc: "Schaltbare Steckdosen", count: "5 Geräte" },
    { icon: "🌡️", title: "Thermostate", desc: "Heizkörperthermostate", count: "4 Geräte" },
    { icon: "📡", title: "Sensoren", desc: "Temperatur & Fenster", count: "6 Geräte" },
  ];

  const features = [
    { icon: Shield, title: "Lokale Verarbeitung", desc: "Alle Daten bleiben im Heimnetzwerk" },
    { icon: Zap, title: "Automationen", desc: "Intelligente Szenarien für Alltag" },
    { icon: Database, title: "Energy Dashboard", desc: "Stromverbrauch im Überblick" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Home Assistant Smart Home</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Vollständig lokale Smart-Home-Plattform auf Raspberry Pi 5 mit Zigbee, Docker und sicherer VPN-Anbindung
          </p>

          {/* --- AKILLI DOKÜMANTASYON BUTONU (Home Assistant) --- */}
          <div className="flex justify-center mb-10">
            <a 
              href="/home_assistant.docx" 
              download 
              className="
                group relative inline-flex items-center gap-3 px-8 py-4 
                rounded-full overflow-hidden transition-all duration-300
                
                /* AYDINLIK MOD (Light Mode) */
                bg-white border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/10
                hover:border-emerald-500/50 hover:scale-105

                /* KARANLIK MOD (Dark Mode) */
                dark:bg-white/5 dark:border-white/10 dark:shadow-none
                dark:hover:bg-white/10
              "
            >
              {/* İkon */}
              <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              
              <div className="flex flex-col items-start text-left">
                {/* Başlık */}
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600/80 dark:text-emerald-400/80">
                  PROJEKT DOKUMENTATION
                </span>
                
                {/* Alt Başlık */}
                <span className="text-sm font-black transition-colors text-slate-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  Download .DOCX
                </span>
              </div>
              
              {/* Ok İkonu */}
              <Download className="w-5 h-5 ml-2 transition-all text-slate-400 dark:text-white/50 group-hover:text-emerald-600 dark:group-hover:text-white group-hover:translate-y-1" />
            </a>
          </div>
          {/* ----------------------------------------------------- */}

          {/* Tech Logos */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-12 h-12 animate-float" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" alt="Raspberry Pi" className="w-12 h-12 animate-float" style={{ animationDelay: "0.2s" }} />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-12 h-12 animate-float" style={{ animationDelay: "0.4s" }} />
            <img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg" alt="Home Assistant" className="w-12 h-12 animate-float" style={{ animationDelay: "0.6s" }} />
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
              {["📡 Zigbee Geräte", "🔌 Zigbee2MQTT", "🏠 Home Assistant", "🐳 Docker", "🔒 Tailscale VPN"].map((step, index, arr) => (
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
            Dieses Projekt beschreibt den vollständigen Aufbau, die schrittweise Entwicklung sowie den stabilen Betrieb eines lokal 
            betriebenen Smart-Home-Systems auf Basis von Home Assistant. Das System wurde als Teil eines persönlichen Home-LABs 
            realisiert und parallel zur Fachinformatiker Systemintegration (FISI) Umschulung umgesetzt.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Im Mittelpunkt des Projekts stand nicht die schnelle Inbetriebnahme einzelner Smart-Home-Geräte, sondern der Aufbau einer 
            sauberen, sicheren und langfristig wartbaren Systemarchitektur. Besonderes Augenmerk wurde auf Datenschutz, 
            Netzwerksegmentierung und den bewussten Verzicht auf öffentliche Internetfreigaben gelegt.
          </p>
        </div>

        {/* Devices */}
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Integrierte Geräte</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {devices.map((device) => (
              <div key={device.title} className="glass rounded-xl p-4 hover-lift">
                <div className="text-3xl mb-2">{device.icon}</div>
                <h3 className="font-semibold mb-1">{device.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{device.desc}</p>
                <p className="text-xs text-emerald">{device.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Kernfunktionen</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-emerald/10 border border-emerald/30 rounded-xl p-6 hover-lift">
                <feature.icon className="w-8 h-8 text-emerald mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
            <Shield className="w-5 h-5" />
            Sicherheitskonzept
          </h3>
          <p className="text-muted-foreground">
            Der externe Zugriff auf das System erfolgt ausschließlich über eine gesicherte VPN-Verbindung mittels 
            <strong className="text-foreground"> Tailscale</strong>. Eine öffentliche Erreichbarkeit wurde bewusst ausgeschlossen.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektHomeAssistant;
