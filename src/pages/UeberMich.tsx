import Layout from "@/components/Layout";
import { GraduationCap, Award, Code, Server, Cloud, Lock, Home, Cpu, Zap } from "lucide-react";

const UeberMich = () => {
  const skills = [
    { icon: Server, label: "Windows Server" },
    { icon: Code, label: "Linux (Debian/Ubuntu)" },
    { icon: Cpu, label: "Docker & Container" },
    { icon: Cloud, label: "Netzwerk & VLAN" },
    { icon: Cloud, label: "Cloud (Azure)" },
    { icon: Lock, label: "IT-Security" },
    { icon: Home, label: "Home Assistant" },
    { icon: Zap, label: "Proxmox VE" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Über mich</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fachinformatiker für Systemintegration mit Leidenschaft für IT-Infrastruktur, Netzwerksicherheit und Home Automation
        </p>
      </section>

      {/* Content */}
      <section className="py-12 px-4 max-w-4xl mx-auto space-y-12">
        {/* Ausbildung */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary" />
            Ausbildung
          </h2>
          <div className="glass rounded-xl p-6 hover-lift">
            <p className="text-sm text-muted-foreground mb-2">2021 - 2024</p>
            <h3 className="text-lg font-semibold text-primary mb-2">Fachinformatiker für Systemintegration</h3>
            <p className="text-muted-foreground">
              Berufsausbildung mit Schwerpunkt auf IT-Infrastruktur, Netzwerktechnik und Systemadministration
            </p>
          </div>
        </div>

        {/* Zertifizierungen */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            Zertifizierungen
          </h2>
          <div className="glass rounded-xl p-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm">
                Microsoft Azure Fundamentals (AZ-900)
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm">
                Cisco Certified Entry Networking Technician
              </span>
            </div>
          </div>
        </div>

        {/* Technische Fähigkeiten */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            Technische Fähigkeiten
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.label} className="glass rounded-xl p-4 text-center hover-lift">
                <skill.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="text-sm">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Home Lab */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <Home className="w-6 h-6 text-primary" />
            Home Lab
          </h2>
          <div className="glass rounded-xl p-6 hover-lift">
            <h3 className="text-lg font-semibold text-primary mb-2">Persönliches IT-Labor</h3>
            <p className="text-muted-foreground">
              In meinem Home Lab betreibe ich verschiedene Projekte zur Weiterbildung und zum Experimentieren mit neuen Technologien. 
              Von Smart Home Automatisierung über selbst gehostete Dienste bis hin zu Netzwerksegmentierung - hier lerne ich praxisnah, 
              was in der Theorie oft abstrakt bleibt.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UeberMich;
