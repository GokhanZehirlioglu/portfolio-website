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
  ArrowRight 
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
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Über mich</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Als angehender Fachinformatiker für Systemintegration (Start: Juni 2025) verfolge ich einen klaren Ansatz: <span className="text-primary font-medium">IT muss praxisnah, sicher und dokumentiert sein.</span>
        </p>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 max-w-5xl mx-auto space-y-16">
        
        {/* SECTION 1: Home Lab & Architektur */}
        <div>
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Layers className="w-7 h-7 text-primary" />
            Home-LAB & Architektur
          </h2>
          
          <div className="glass rounded-xl p-6 md:p-8 hover-lift border border-primary/10">
            {/* Intro Text */}
            <div className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Mein Herzstück ist mein Home-LAB. Anders als übliche Testumgebungen ist dies eine bewusst geplante 
                <strong className="text-primary"> Enterprise-Simulation</strong>, die ich von Grund auf selbst aufgebaut habe – 
                inklusive Architektur, Betrieb und vollständiger Dokumentation. Hier bilde ich reale Betriebs-, Netzwerk- und Sicherheitsanforderungen ab.
              </p>
            </div>

            {/* Split Layout: Image & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              
              {/* Left Column: Image (Infografik) */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-lg overflow-hidden border border-primary/20 shadow-2xl bg-black/50 aspect-[4/3] group">
                  <img 
                    src="/images/homelab-architecture.png" 
                    alt="IT Infrastructure Architecture Diagram" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs text-white/80 text-center">Systemarchitektur & Datenfluss</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Structure (Text) */}
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-lg font-bold text-foreground">Arbeitsweise & Projektstruktur</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mein Portfolio umfasst derzeit 8 aufeinander aufbauende Projektmodule (5 abgeschlossen, 3 in Entwicklung).
                </p>

                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                       <Server size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Infrastruktur & Virtualisierung</h4>
                      <p className="text-sm text-muted-foreground">Linux-Basis (Ubuntu/Pi) & Docker-Fundament.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                       <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Application & Services</h4>
                      <p className="text-sm text-muted-foreground">Orchestrierung von Home Assistant (IoT/State Monitoring) & Nginx.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                       <Shield size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Security & Access</h4>
                      <p className="text-sm text-muted-foreground">Cloudflare Tunnel & SSL (Zero Trust statt Port-Forwarding).</p>
                    </div>
                  </li>

                   <li className="flex gap-3 items-start">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                       <Network size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Enterprise Networking</h4>
                      <p className="text-sm text-muted-foreground">VLAN-Segmentierung & ACLs auf Cisco Catalyst Hardware.</p>
                    </div>
                  </li>
                </ul>

                {/* Roadmap Box */}
                <div className="mt-6 pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 text-amber-500 mb-1">
                    <ArrowRight size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Roadmap</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Erweiterung Layer-3-Routing, dedizierte Firewalls & zentrales SIEM (Wazuh).
                  </p>
                </div>
              </div>

            </div>

            {/* Closing Statement */}
            <div className="mt-8 text-center border-t border-primary/10 pt-6">
               <p className="italic text-muted-foreground">
                 "Mein Ziel ist es, theoretisches Wissen systematisch in eine belastbare, wartbare und sauber dokumentierte IT-Infrastruktur zu übersetzen."
               </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Technische Fähigkeiten (Grid) */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
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

        {/* SECTION 3: Ausbildung & Zertifizierungen */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* Ausbildung */}
            <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                Ausbildung
            </h2>
            <div className="glass rounded-xl p-6 hover-lift h-full border border-primary/5">
                <p className="text-sm text-muted-foreground mb-2">2021 - 2024</p>
                <h3 className="text-lg font-semibold text-primary mb-2">Fachinformatiker für Systemintegration</h3>
                <p className="text-muted-foreground text-sm">
                Berufsausbildung mit Schwerpunkt auf IT-Infrastruktur, Netzwerktechnik und Systemadministration.
                </p>
            </div>
            </div>

            {/* Zertifizierungen */}
            <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                Zertifizierungen
            </h2>
            <div className="glass rounded-xl p-6 h-full border border-primary/5">
                <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-medium">
                    Microsoft Azure Fundamentals (AZ-900)
                </span>
                <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm font-medium">
                    Cisco Certified Entry Networking Technician
                </span>
                </div>
            </div>
            </div>
        </div>

      </section>
    </Layout>
  );
};

export default UeberMich;
