import React from "react";
import Layout from "@/components/Layout";
import { 
  Quote, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Target,
  Layers,
  BookOpen,
  Zap,
  LayoutDashboard
} from "lucide-react";

const UeberMich: React.FC = () => {
  
  // --- KONFİGÜRASYON: TEKNOLOJİ STACK'İ (HER ZAMAN RENKLİ) ---
  const techStack = [
    { name: "Linux", url: "https://cdn.simpleicons.org/linux/FCC624" },
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Home Assistant", url: "https://cdn.simpleicons.org/homeassistant/41BDF5" },
    { name: "Nginx", url: "https://cdn.simpleicons.org/nginx/009639" },
    { name: "Cloudflare", url: "https://cdn.simpleicons.org/cloudflare/F38020" },
    { name: "Cisco", url: "https://cdn.simpleicons.org/cisco/1BA0D7" },
    { name: "Wazuh", url: "https://cdn.simpleicons.org/wazuh/00BCE4" },
  ];

  // --- KONFİGÜRASYON: PROJE DURUMLARI (AYRILMIŞ VE GÜNCEL) ---
  const projectStatus = [
    { label: "Infrastruktur & Docker-Basis", status: "Abgeschlossen", active: false },
    { label: "IoT-Integration (Home Assistant)", status: "Abgeschlossen", active: false },
    { label: "Web-Hosting & Reverse Proxy", status: "Abgeschlossen", active: false },
    { label: "Secure Access (Zero Trust/Tunnel)", status: "Abgeschlossen", active: false },
    { label: "VLAN & Netz-Segmentierung", status: "In Arbeit", active: true }, 
    { label: "Layer-3 Routing Konzepte", status: "Geplant", active: false }, // AYRILDI
    { label: "Dedizierte Firewalls & Zonen", status: "Geplant", active: false }, // AYRILDI
  ];

  return (
    <Layout>
      {/* MİMARİ AKIŞ: 
         1. Hero (Kimlik - Ortalanmış)
         2. Geçmiş (Hintergrund)
         3. Yöntem (Home-LAB Felsefesi)
         4. Görsel (Kanıt)
         5. Proje Durumu & Gelecek (Status + Roadmap)
         6. Akademik Derinleşme (Vertiefung - Alta taşındı)
         7. Tech Stack (Renkli Logolar)
      */}

      {/* --- 1. HERO SECTION (PROFESSIONELLE SELBSTVERORTUNG) --- */}
      <section className="pt-20 pb-12 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Über mich</span>
          </h1>
          
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 max-w-3xl mx-auto">
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
            
            {/* Alıntı Kutusu */}
            <div className="glass mt-10 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <div className="bg-primary/10 p-3 rounded-full">
                <Quote className="w-6 h-6 text-primary" />
              </div>
              <p className="italic text-muted-foreground font-medium">
                "Meine berufliche Haltung ist klar: Systeme müssen nicht nur funktionieren, sondern verständlich, 
                wartbar und langfristig stabil sein."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 max-w-5xl mx-auto space-y-24">
        
        {/* --- 2. VOM HINTERGRUND ZUR IT-PRAXIS --- */}
        <div className="grid md:grid-cols-[1fr_3fr] gap-8 items-start">
          {/* İkon Kutusu (Sol) */}
          <div className="hidden md:flex flex-col items-center text-center p-6 glass rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
            <Briefcase className="w-10 h-10 text-primary mb-3" />
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Hintergrund</span>
          </div>
          
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-4">
              <span className="md:hidden bg-primary/10 p-2 rounded-lg"><Briefcase className="w-6 h-6 text-primary"/></span>
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
            {/* Vurgulu Alan */}
            <div className="bg-card p-5 rounded-xl border-l-4 border-primary shadow-sm">
              <p className="text-foreground font-medium">
                Auch meine vorherige Tätigkeit als <span className="text-primary font-bold">Gründer und Leiter eines Nachhilfezentrums</span> hat 
                meine Organisationsfähigkeit, Verlässlichkeit und Kommunikationsstärke nachhaltig geprägt.
              </p>
            </div>
          </div>
        </div>

        {/* --- 3. AKTUELLE ENTWICKLUNG (HOME LAB FELSEFESİ) --- */}
        <div>
           <h2 className="text-2xl font-bold flex items-center gap-4 mb-6 text-foreground">
             <div className="bg-primary/10 p-2 rounded-lg shadow-sm">
               <GraduationCap className="w-7 h-7 text-primary" />
             </div>
             Aktuelle Entwicklung & Lernansatz
           </h2>
           <div className="prose max-w-none text-muted-foreground leading-relaxed text-lg">
             <p className="mb-4">
               Parallel zur Umschulung entwickle ich meine praktischen Fähigkeiten gezielt weiter. 
               Dafür habe ich unter dem Namen <strong>Home-LAB</strong> eine eigene, zusammenhängende IT-Lernumgebung aufgebaut.
             </p>
             <p>
               Dabei geht es mir nicht um isolierte Einzelübungen, sondern um eine <strong>systematische, praxisnahe Entwicklung</strong>: 
               Planung, Umsetzung, Betrieb und Dokumentation gehören immer zusammen. Die einzelnen Module bauen bewusst 
               aufeinander auf und orientieren sich an realen Anforderungen aus dem IT-Betrieb.
             </p>
           </div>
        </div>

        {/* --- 4. GÖRSEL KANIT (SYSTEMISCHE SICHT) --- */}
        <div className="my-10">
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-primary/20 bg-black/50 group relative aspect-[16/9] md:aspect-[21/9]">
             <img 
               src="/images/homelab-architecture.png" 
               alt="IT System Architecture Diagram" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
             />
             
             {/* Caption */}
             <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md py-4 px-6 border-t border-white/10">
               <p className="text-sm text-center text-white/90 font-medium tracking-wide">
                 Systemdenken in der Praxis: Eine Schicht-für-Schicht visualisierte Infrastruktur – von der Hardware bis zur Security-Gateway.
               </p>
             </div>
          </div>
        </div>

        {/* --- 5. PROJEKT-STATUS & ROADMAP --- */}
        <div className="grid md:grid-cols-2 gap-12 pt-10 border-t border-primary/10">
          
          {/* Sol: Proje Durumları */}
          <div>
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
               <div className="bg-primary/10 p-2 rounded-lg">
                 <LayoutDashboard className="text-primary w-5 h-5" />
               </div>
              Projekt-Status & Module
            </h3>
            <div className="space-y-3">
              {projectStatus.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-md ${item.active ? 'bg-primary/5 border-primary/30 shadow-sm' : 'glass border-transparent'}`}>
                  <span className={`text-sm ${item.active ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.status === "Abgeschlossen" && <CheckCircle2 size={18} className="text-green-500" />}
                    {item.status === "In Arbeit" && <Loader2 size={18} className="text-primary animate-spin" />}
                    {item.status === "Geplant" && <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />}
                    <span className="text-xs text-muted-foreground w-24 text-right">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Gelecek Hedefleri */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
               <div className="bg-primary/10 p-2 rounded-lg">
                 <Target className="text-primary w-5 h-5" />
               </div>
              Blick nach vorn
            </h3>
            <div className="text-muted-foreground text-base leading-relaxed space-y-4">
              <p>
                Perspektivisch möchte ich mich im Bereich <strong>Cloud- und Security-naher IT-Infrastrukturen</strong> weiterentwickeln.
                Dabei liegt mein Fokus auf cloudbasierten Architekturen, Container-Plattformen und sicherem Betrieb verteilter Systeme.
              </p>
              <div className="bg-card p-5 rounded-xl border border-primary/10 shadow-sm">
                <p className="font-medium text-foreground mb-2">Mein Ziel:</p>
                <p>
                  Meine fachlichen Grundlagen systematisch zu vertiefen und mich langfristig in 
                  verantwortungsvollen, struktur- und sicherheitsorientierten IT-Rollen zu etablieren.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 6. AKTUELLE FACHLICHE VERTIEFUNG (YENİ KONUM) --- */}
        <div className="glass p-8 rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-transparent relative overflow-hidden mt-8">
            {/* Dekoratif Arka Plan İkonu */}
            <BookOpen className="absolute -right-8 -bottom-8 w-40 h-40 text-primary/5 rotate-12" />
            
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              Aktuelle fachliche Vertiefung
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed relative z-10 max-w-3xl">
              Parallel zu meiner Umschulung und der praktischen Arbeit im Home-LAB vertiefe ich meine Kenntnisse 
              gezielt in netzwerk-, system- und cloudnahen Betriebsbereichen. Dabei folge ich strukturierten Lernpfaden 
              mit Fokus auf <span className="text-foreground font-semibold">Netzwerk- und Systemadministration, Linux- und containerbasiertem Betrieb, 
              Cloud-Administration</span> sowie <span className="text-foreground font-semibold">security-nahen Betriebs- und Monitoring-Themen</span>. 
              Ziel ist es, meine praktische Systemerfahrung durch fundiertes, rollenorientiertes Fachwissen zu ergänzen 
              und kontinuierlich zu schärfen.
            </p>
        </div>

        {/* --- 7. TECH STACK (RENKLİ LOGOLAR) --- */}
        <div className="mt-12 pt-10 border-t border-primary/10 text-center">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-10">
            Eingesetzte Technologien & Tools
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {techStack.map((tech) => (
              <div key={tech.name} className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1">
                {/* Logo Resmi - Grayscale YOK, Her zaman renkli */}
                <img 
                  src={tech.url} 
                  alt={tech.name} 
                  className="h-10 w-10 md:h-12 md:w-12 transition-all duration-300 drop-shadow-sm"
                />
                <span className="text-[11px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default UeberMich;
