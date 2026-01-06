import React from "react";
import Layout from "@/components/Layout";
import { 
  GraduationCap, 
  Award, 
  Code, 
  Server, 
  Cloud, 
  Lock, 
  Home, 
  Cpu, 
  Zap, 
  Shield, 
  Network, 
  Layers, 
  ArrowRight,
  Briefcase,
  BrainCircuit,
  Target
} from "lucide-react";

const UeberMich: React.FC = () => {
  const skills = [
    { icon: Server, label: "Windows Server" },
    { icon: Code, label: "Linux (Debian/Ubuntu)" },
    { icon: Cpu, label: "Docker & Container" },
    { icon: Network, label: "Netzwerk & VLAN" },
    { icon: Cloud, label: "Cloud (Azure)" },
    { icon: Lock, label: "IT-Security" },
    { icon: Home, label: "Home Assistant" },
    { icon: Zap, label: "Proxmox VE" },
  ];

  return (
    <Layout>
      {/* --- HERO SECTION --- */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">Über mich</span>
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          Ich arbeite <span className="text-primary font-medium">strukturiert, prozessorientiert und verantwortungsbewusst</span>. 
          Ein sorgfältiger Umgang mit Daten, klare Abläufe und nachvollziehbare Dokumentation sind für mich 
          zentrale Voraussetzungen für einen verlässlichen IT-Betrieb.
        </p>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-8 px-4 max-w-5xl mx-auto space-y-20">
        
        {/* 1. SEKTION: Haltung & Hintergrund (2 Kolonlu Grid) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Sol: Warum IT? */}
          <div className="glass p-8 rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <Briefcase size={24} />
              </div>
              <h2 className="text-xl font-semibold">Vom Hintergrund zur IT-Praxis</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Aus diesem Grund habe ich mich bewusst für einen beruflichen Wechsel in die IT entschieden und befinde mich seit Juni 2025 
                in der Umschulung zum Fachinformatiker für Systemintegration.
              </p>
              <p>
                Bereits vor meiner Umschulung habe ich in daten- und prozessorientierten Kontexten gearbeitet. 
                Besonders Aufgaben an der Schnittstelle zwischen Technik, Organisation und Prozessen sprechen mich an – 
                dort, wo Genauigkeit und sauberes Reporting entscheidend sind.
              </p>
              <p className="font-medium text-foreground">
                Systeme müssen nicht nur funktionieren, sondern verständlich, wartbar und langfristig stabil sein.
              </p>
            </div>
          </div>

          {/* Sağ: Aktuelle Entwicklung */}
          <div className="glass p-8 rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <BrainCircuit size={24} />
              </div>
              <h2 className="text-xl font-semibold">Aktuelle Entwicklung & Lernansatz</h2>
            </div>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                Parallel zur Umschulung entwickle ich meine praktischen Fähigkeiten gezielt weiter. 
                Dafür habe ich unter dem Namen <strong>Home-LAB</strong> eine eigene, zusammenhängende IT-Lernumgebung aufgebaut.
              </p>
              <p>
                Dabei geht es mir nicht um isolierte Einzelübungen, sondern um eine <strong>systematische Entwicklung</strong>: 
                Planung, Umsetzung, Betrieb und Dokumentation gehören immer zusammen.
              </p>
              <ul className="list-disc list-inside space-y-1 pt-2 opacity-90">
                <li>Netzwerk- und Systemadministration</li>
                <li>Linux-basierter Betrieb & Container</li>
                <li>Security-nahe Betriebs-Themen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. SEKTION: VISUELLE ÜBERSICHT (Görsel Odaklı) */}
        <div className="relative">
          <div className="text-center mb-8 max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold flex items-center justify-center gap-3 mb-3">
               <Layers className="text-primary w-6 h-6" />
               Systemische Sicht
             </h2>
             <p className="text-muted-foreground">
               Die folgende Übersicht zeigt beispielhaft, wie ich IT-Systeme denke und strukturiere: 
               schichtweise aufgebaut, sicher angebunden und klar voneinander getrennt.
             </p>
          </div>

          {/* GÖRSEL KART */}
          <div className="glass p-2 md:p-4 rounded-2xl border border-primary/20 shadow-2xl bg-black/40">
             <div className="rounded-xl overflow-hidden aspect-video relative group">
                {/* Görsel */}
                <img 
                  src="/images/homelab-architecture.png" 
                  alt="System Architecture Diagram" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
             </div>
             <p className="text-xs text-center text-muted-foreground mt-3 italic">
               Visualisierung: Infrastruktur, Services, Security und Networking im Zusammenspiel.
             </p>
          </div>
        </div>

        {/* 3. SEKTION: PROJEKTE & ZUKUNFT (Text Tabanlı) */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Projekte & Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="text-primary w-5 h-5" />
                Projekte & Realisierung
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Meine aktuelle Systemlandschaft besteht aus mehreren aufeinander aufbauenden Projektmodulen (8 Module), 
                von denen ein Teil bereits abgeschlossen ist. Der Fokus liegt dabei auf:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <div className="bg-primary/10 p-1 rounded-full text-primary h-fit"><Shield size={14} /></div>
                  <span>Stabiler Infrastruktur & Netzwerksegmentierung (VLANs)</span>
                </li>
                 <li className="flex gap-3 text-sm text-muted-foreground">
                  <div className="bg-primary/10 p-1 rounded-full text-primary h-fit"><Lock size={14} /></div>
                  <span>Sicherem externem Zugriff (Zero Trust / SSL)</span>
                </li>
                 <li className="flex gap-3 text-sm text-muted-foreground">
                  <div className="bg-primary/10 p-1 rounded-full text-primary h-fit"><Server size={14} /></div>
                  <span>Klarer Trennung von Rollen und Diensten (Docker)</span>
                </li>
              </ul>
            </div>

            {/* Zukunft & Roadmap */}
            <div>
               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="text-primary w-5 h-5" />
                Blick nach vorn & Roadmap
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Perspektivisch möchte ich mich im Bereich <strong>Cloud- und Security-naher IT-Infrastrukturen</strong> weiterentwickeln.
                Mein Ziel ist es, theoretisches Wissen unmittelbar in eine belastbare Praxis zu übersetzen.
              </p>
              <div className="glass bg-primary/5 border border-primary/10 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                  <ArrowRight size={14} /> Nächste Schritte:
                </h4>
                <p className="text-xs text-muted-foreground">
                  Ausbau von Routing-Konzepten, Einführung dedizierter Firewalls und Einstieg in zentrales Logging / Security-Monitoring (SIEM).
                </p>
              </div>
            </div>
        </div>
        
        {/* --- TEKNİK YETENEKLER (SKILLS) --- */}
        <div className="pt-8 border-t border-primary/10">
          <h2 className="text-xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            Technische Fähigkeiten
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.label} className="glass rounded-xl p-4 text-center hover-lift border border-primary/5 transition-colors hover:border-primary/20">
                <skill.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-sm font-medium">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default UeberMich;
