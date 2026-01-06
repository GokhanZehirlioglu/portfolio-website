import React from "react";
import Layout from "@/components/Layout";
import { 
  Server, Code, Cpu, Network, Cloud, Lock, Home, Zap, 
  ArrowRight, Quote, Briefcase, GraduationCap 
} from "lucide-react";

const UeberMich: React.FC = () => {
  // Teknik yetenekler listesi (En altta duracak)
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
      {/* TASARIM STRATEJİSİ: "EDITORIAL LAYOUT"
        Metin odaklı, okuma kolaylığı sağlayan, yukarıdan aşağıya akan bir yapı.
      */}

      {/* --- 1. PROFESSIONELLE SELBSTVERORTUNG (GİRİŞ) --- */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Über mich</span>
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p className="font-medium text-xl md:text-2xl text-primary/90">
              Ich arbeite strukturiert, prozessorientiert und verantwortungsbewusst.
            </p>
            <p>
              Ein sorgfältiger Umgang mit Daten, klare Abläufe und nachvollziehbare Dokumentation sind für mich 
              zentrale Voraussetzungen für einen verlässlichen IT-Betrieb. Aus diesem Grund habe ich mich bewusst 
              für einen beruflichen Wechsel in die IT entschieden und befinde mich seit Juni 2025 in der 
              Umschulung zum Fachinformatiker für Systemintegration.
            </p>
            <p>
              Die IT bietet mir den Rahmen, in dem ich strukturiertes Arbeiten, analytisches Denken und 
              technische Verantwortung systematisch verbinden kann.
            </p>
            
            {/* Vurgulu Alıntı */}
            <div className="glass border-l-4 border-primary p-6 my-8 rounded-r-xl italic text-muted-foreground flex gap-4">
              <Quote className="w-8 h-8 text-primary/40 flex-shrink-0" />
              <p>
                "Meine berufliche Haltung ist klar: Systeme müssen nicht nur funktionieren, sondern verständlich, 
                wartbar und langfristig stabil sein."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 max-w-4xl mx-auto space-y-20">
        
        {/* --- 2. VOM HINTERGRUND ZUR IT-PRAXIS (GEÇMİŞ & USP) --- */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
          <div className="hidden md:flex flex-col items-center text-center p-4 glass rounded-xl border border-primary/10">
            <Briefcase className="w-10 h-10 text-primary mb-2" />
            <span className="text-sm font-semibold text-primary">Erfahrung</span>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="md:hidden"><Briefcase className="w-6 h-6 text-primary"/></span>
              Vom Hintergrund zur IT-Praxis
            </h2>
            <p>
              Bereits vor meiner Umschulung habe ich in daten- und prozessorientierten Kontexten gearbeitet. 
              Der strukturierte Umgang mit Informationen, das Aufbereiten von Ergebnissen sowie das Arbeiten mit 
              Systemübersichten und Dokumentationen gehörten dabei zu meinem Alltag.
            </p>
            <p>
              Diese Erfahrung bildet heute die Grundlage meiner IT-Arbeitsweise. Besonders Aufgaben an der 
              Schnittstelle zwischen Technik, Organisation und Prozessen sprechen mich an.
            </p>
            {/* BURASI KESİLMEMELİYDİ - ŞİMDİ EKLENDİ */}
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-foreground font-medium">
                Auch meine vorherige Tätigkeit als <span className="text-primary">Gründer und Leiter eines Nachhilfezentrums</span> hat 
                meine Organisationsfähigkeit, Verlässlichkeit und Kommunikationsstärke nachhaltig geprägt.
              </p>
            </div>
          </div>
        </div>

        {/* --- 3. AKTUELLE ENTWICKLUNG & LERNANSATZ (HOME LAB FELSEFESİ) --- */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-primary" />
            Aktuelle Entwicklung & Lernansatz
          </h2>
          <div className="prose max-w-none text-muted-foreground leading-relaxed">
            <p>
              Parallel zur Umschulung entwickle ich meine praktischen Fähigkeiten gezielt weiter. 
              Dafür habe ich unter dem Namen <strong>Home-LAB</strong> eine eigene, zusammenhängende IT-Lernumgebung aufgebaut.
            </p>
            <p>
              Dabei geht es mir nicht um isolierte Einzelübungen, sondern um eine <strong>systematische, praxisnahe Entwicklung</strong>: 
              Planung, Umsetzung, Betrieb und Dokumentation gehören immer zusammen. Die einzelnen Module bauen bewusst 
              aufeinander auf und orientieren sich an realen Anforderungen aus dem IT-Betrieb.
            </p>
            
            <ul className="grid sm:grid-cols-2 gap-2 mt-4">
              <li className="flex items-center gap-2"><ArrowRight size={16} className="text-primary"/> Netzwerk- und Systemadministration</li>
              <li className="flex items-center gap-2"><ArrowRight size={16} className="text-primary"/> Linux-basierter Betrieb & Container</li>
              <li className="flex items-center gap-2"><ArrowRight size={16} className="text-primary"/> Cloud-basierte Administrationskonzepte</li>
              <li className="flex items-center gap-2"><ArrowRight size={16} className="text-primary"/> Security-nahe Betriebs- und Monitoring-Themen</li>
            </ul>
          </div>
        </div>

        {/* --- 4. SYSTEMISCHE SICHT (GÖRSEL - INFOGRAFİK) --- */}
        <div className="my-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Systemische Sicht – vom Konzept zur Umsetzung</h2>
            <p className="text-muted-foreground">
              Die folgende Übersicht zeigt beispielhaft, wie ich IT-Systeme denke und strukturiere: 
              schichtweise aufgebaut, sicher angebunden und klar voneinander getrennt.
            </p>
          </div>
          
          {/* Görsel Alanı */}
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-black/40 group relative">
             <img 
               src="/images/homelab-architecture.png" 
               alt="IT System Architecture Diagram" 
               className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
             />
             <div className="absolute bottom-0 w-full bg-black/70 backdrop-blur-sm p-2 text-center text-xs text-white/70">
               Visualisierung der Home-LAB Architektur
             </div>
          </div>
        </div>

        {/* --- 5. PROJEKTE & ZUKUNFT (SONUÇ) --- */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-primary/10">
          
          {/* Mevcut Durum */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="text-primary w-5 h-5" />
              Projekte & Status
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Meine aktuelle Systemlandschaft besteht aus mehreren aufeinander aufbauenden Projektmodulen (8 Module), 
              von denen ein Teil bereits abgeschlossen ist. Der Fokus liegt dabei auf:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="glass px-3 py-2 rounded-lg border-l-2 border-primary">Stabiler Infrastruktur</li>
              <li className="glass px-3 py-2 rounded-lg border-l-2 border-primary">Sauberer Netzwerksegmentierung</li>
              <li className="glass px-3 py-2 rounded-lg border-l-2 border-primary">Sicherem externem Zugriff</li>
              <li className="glass px-3 py-2 rounded-lg border-l-2 border-primary">Klarer Trennung von Rollen und Diensten</li>
            </ul>
          </div>

          {/* Gelecek (Roadmap) */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <ArrowRight className="text-primary w-5 h-5" />
              Blick nach vorn
            </h3>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
              <p>
                Perspektivisch möchte ich mich im Bereich <strong>Cloud- und Security-naher IT-Infrastrukturen</strong> weiterentwickeln.
              </p>
              <p>
                Mein Ziel ist es, meine fachlichen Grundlagen systematisch zu vertiefen und mich langfristig in 
                verantwortungsvollen, struktur- und sicherheitsorientierten IT-Rollen zu etablieren.
              </p>
              <div className="mt-4 p-4 glass bg-primary/5 rounded-lg border border-primary/20">
                <span className="font-semibold text-primary block mb-1">Nächste Schritte:</span>
                Ausbau von Routing-Konzepten, Firewalls & zentrales SIEM.
              </div>
            </div>
          </div>
        </div>

        {/* --- SKILLS SECTION (ALT BİLGİ) --- */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold mb-6 text-center text-muted-foreground uppercase tracking-widest">
            Technische Umgebung
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.label} className="glass rounded-xl p-4 text-center hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                <skill.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">{skill.label}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default UeberMich;
