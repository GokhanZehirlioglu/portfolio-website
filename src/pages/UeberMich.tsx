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
  BookOpen
} from "lucide-react";

const UeberMich: React.FC = () => {
  
  // --- KONFİGÜRASYON: TEKNOLOJİ STACK'İ (Sadece Metinde Geçenler & Orijinal Renkler) ---
  // Not: Bu URL'ler SimpleIcons CDN'inden çekilir, ekstra dosya yüklemene gerek yok.
  const techStack = [
    { name: "Linux", url: "https://cdn.simpleicons.org/linux/FCC624" },
    { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Home Assistant", url: "https://cdn.simpleicons.org/homeassistant/41BDF5" },
    { name: "Nginx", url: "https://cdn.simpleicons.org/nginx/009639" },
    { name: "Cloudflare", url: "https://cdn.simpleicons.org/cloudflare/F38020" },
    { name: "Cisco", url: "https://cdn.simpleicons.org/cisco/1BA0D7" },
    { name: "Wazuh", url: "https://cdn.simpleicons.org/wazuh/00BCE4" },
  ];

  // --- KONFİGÜRASYON: PROJE DURUMLARI (Tekrarı önleyen Status Listesi) ---
  const projectStatus = [
    { label: "Infrastruktur & Docker-Basis", status: "Abgeschlossen", active: false },
    { label: "IoT-Integration (Home Assistant)", status: "Abgeschlossen", active: false },
    { label: "Web-Hosting & Reverse Proxy", status: "Abgeschlossen", active: false },
    { label: "Secure Access (Zero Trust/Tunnel)", status: "Abgeschlossen", active: false },
    { label: "VLAN & Netz-Segmentierung", status: "In Arbeit", active: true }, // Şu anki odak
    { label: "Layer-3 Routing & Firewalls", status: "Geplant", active: false },
  ];

  return (
    <Layout>
      {/* MİMARİ: EDITORIAL TASARIM 
         Akış: Kimlik -> Geçmiş -> Metodoloji (HomeLab + Vertiefung) -> Görsel Kanıt -> Proje Durumu -> Tech Stack
      */}

      {/* --- 1. PROFESSIONELLE SELBSTVERORTUNG (KİMLİK) --- */}
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
            
            {/* Alıntı Kutusu */}
            <div className="glass border-l-4 border-primary p-6 my-8 rounded-r-xl italic text-muted-foreground flex gap-4 shadow-sm">
              <Quote className="w-8 h-8 text-primary/40 flex-shrink-0" />
              <p>
                "Meine berufliche Haltung ist klar: Systeme müssen nicht nur funktionieren, sondern verständlich, 
                wartbar und langfristig stabil sein."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 max-w-4xl mx-auto space-y-24">
        
        {/* --- 2. VOM HINTERGRUND ZUR IT-PRAXIS (GEÇMİŞ & USP) --- */}
        <div className="grid md:grid-cols-[1fr_3fr] gap-6 items-start">
          <div className="hidden md:flex flex-col items-center text-center p-4 glass rounded-xl border border-primary/10 bg-primary/5">
            <Briefcase className="w-8 h-8 text-primary mb-2" />
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Hintergrund</span>
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
            {/* Vurgulu Geçmiş Deneyimi */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border-l-2 border-primary">
              <p className="text-foreground font-medium">
                Auch meine vorherige Tätigkeit als <span className="text-primary font-bold">Gründer und Leiter eines Nachhilfezentrums</span> hat 
                meine Organisationsfähigkeit, Verlässlichkeit und Kommunikationsstärke nachhaltig geprägt.
              </p>
            </div>
          </div>
        </div>

        {/* --- 3. AKTUELLE ENTWICKLUNG & VERTIEFUNG (METODOLOJİ) --- */}
        <div className="space-y-10">
          
          {/* A) Home-LAB Felsefesi */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
              <GraduationCap className="w-7 h-7 text-primary" />
              Aktuelle Entwicklung & Lernansatz
            </h2>
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
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

          {/* B) YENİ EKLENEN METİN: Fachliche Vertiefung (Müfredat) */}
          <div className="glass p-6 rounded-xl border border-primary/10 bg-black/5 relative overflow-hidden">
            {/* Dekoratif Arka Plan İkonu */}
            <BookOpen className="absolute -right-6 -bottom-6 w-32 h-32 text-primary/5 rotate-12" />
            
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Aktuelle fachliche Vertiefung
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
              Parallel zu meiner Umschulung und der praktischen Arbeit im Home-LAB vertiefe ich meine Kenntnisse 
              gezielt in netzwerk-, system- und cloudnahen Betriebsbereichen. Dabei folge ich strukturierten Lernpfaden 
              mit Fokus auf <span className="text-foreground font-medium">Netzwerk- und Systemadministration, Linux- und containerbasiertem Betrieb, 
              Cloud-Administration</span> sowie <span className="text-foreground font-medium">security-nahen Betriebs- und Monitoring-Themen</span>. 
              Ziel ist es, meine praktische Systemerfahrung durch fundiertes, rollenorientiertes Fachwissen zu ergänzen 
              und kontinuierlich zu schärfen.
            </p>
          </div>
        </div>

        {/* --- 4. SYSTEMISCHE SICHT (KANIT GÖRSELİ) --- */}
        <div className="my-8">
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-black/40 group relative aspect-[16/9] md:aspect-[21/9]">
             <img 
               src="/images/homelab-architecture.png" 
               alt="IT System Architecture Diagram" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
             />
             
             {/* CAPTION - SEÇENEK B */}
             <div className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md py-3 px-4 border-t border-white/10">
               <p className="text-xs md:text-sm text-center text-white/90 font-medium tracking-wide">
                 Systemdenken in der Praxis: Eine Schicht-für-Schicht visualisierte Infrastruktur – von der Hardware bis zur Security-Gateway.
               </p>
             </div>
          </div>
        </div>

        {/* --- 5. PROJEKTE & ROADMAP (STATUS RAPORU) --- */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-primary/10">
          
          {/* Sol: Proje Durumları (Liste) */}
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <Target className="text-primary w-5 h-5" />
              Projekt-Status & Module
            </h3>
            <div className="space-y-3">
              {projectStatus.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${item.active ? 'bg-primary/5 border-primary/30' : 'glass border-transparent'}`}>
                  <span className={`text-sm ${item.active ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.status === "Abgeschlossen" && <CheckCircle2 size={16} className="text-green-500" />}
                    {item.status === "In Arbeit" && <Loader2 size={16} className="text-primary animate-spin" />}
                    {item.status === "Geplant" && <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />}
                    <span className="text-xs text-muted-foreground w-20 text-right">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ: Gelecek (Roadmap Metni) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <ArrowRight className="text-primary w-5 h-5" />
              Blick nach vorn
            </h3>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
              <p>
                Perspektivisch möchte ich mich im Bereich <strong>Cloud- und Security-naher IT-Infrastrukturen</strong> weiterentwickeln.
                Dabei liegt mein Fokus auf cloudbasierten Architekturen, Container-Plattformen und sicherem Betrieb verteilter Systeme.
              </p>
              <p>
                Mein Ziel ist es, meine fachlichen Grundlagen systematisch zu vertiefen und mich langfristig in 
                verantwortungsvollen, struktur- und sicherheitsorientierten IT-Rollen zu etablieren.
              </p>
            </div>
          </div>
        </div>

        {/* --- 6. TECH STACK (ORİJİNAL LOGOLAR) --- */}
        <div className="mt-16 pt-10 border-t border-primary/10 text-center">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-8">
            Eingesetzte Technologien & Tools
          </h2>
          
          {/* Logo Grid - Sadece Metinde Geçenler */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {techStack.map((tech) => (
              <div key={tech.name} className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
                {/* Logo Resmi - Grayscale başlar, hover olunca renklenir */}
                <img 
                  src={tech.url} 
                  alt={tech.name} 
                  className="h-8 w-8 md:h-10 md:w-10 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
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
