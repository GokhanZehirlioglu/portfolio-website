import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TechLogos from "@/components/TechLogos";
import { ArrowRight, Check } from "lucide-react";

const Index = () => {
  const techLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure", title: "Microsoft Azure" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux", title: "Linux" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", alt: "Cisco", title: "Cisco" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", title: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", alt: "Raspberry Pi", title: "Raspberry Pi" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare", title: "Cloudflare" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg", alt: "Home Assistant", title: "Home Assistant" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/zigbee2mqtt.svg", alt: "Zigbee", title: "Zigbee" },
  ];

  const certificates = [
    "MS Azure Administrator (AZ-104)",
    "MS Windows Server 2022 & Powershell",
    "Linux Essentials",
    "ITIL v4 Foundation",
  ];

  const badges = [
    "CCNA: Introduction to Networks",
    "Cisco Networking Basics",
    "Cisco Operating Systems Support",
    "Cisco Security and Connectivity Support",
    "Cisco Introduction to IoT",
  ];

  return (
    <Layout>
      {/* 1) Önce ana konu anlatımı / hero */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="flex flex-col gap-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                <span className="font-semibold gradient-text">Fachinformatiker für Systemintegration</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Fachinformatiker für Systemintegration mit Azure & Cisco Zertifizierungen.
                Spezialisiert auf Netzwerkinfrastruktur, Containerisierung und Smart Home Automation.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-semibold gradient-text">3</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Projekte</span>
                </div>

                <div className="relative group flex flex-col gap-1 cursor-pointer">
                  <span className="text-3xl font-semibold gradient-text">4</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Zertifikate</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 min-w-[280px] bg-card border border-border rounded-xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 pb-2 border-b border-border">
                      Offizielle Zertifikate
                    </div>
                    <ul className="space-y-2">
                      {certificates.map((cert) => (
                        <li key={cert} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card" />
                  </div>
                </div>

                <div className="relative group flex flex-col gap-1 cursor-pointer">
                  <span className="text-3xl font-semibold gradient-text">5</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Badges</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 min-w-[280px] bg-card border border-border rounded-xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 pb-2 border-b border-border">
                      Cisco Networking Academy
                    </div>
                    <ul className="space-y-2">
                      {badges.map((badge) => (
                        <li key={badge} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          {badge}
                        </li>
                      ))}
                    </ul>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-semibold gradient-text">24/7</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Home Lab</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/ueber-mich"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-border text-foreground font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-secondary/50 hover:border-primary transition-all"
                >
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Hero Image Area */}
            <div className="relative h-[500px] lg:h-[650px] flex items-end justify-center">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border">
                {/* HERO IMAGE */}
                <img
                  src="/images/hero.jpg"
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-emerald/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Tech Logos */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <TechLogos logos={techLogos} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Bu iki bölüm en alta taşındı */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Automatisierter Entwicklungs- und Veröffentlichungsprozess
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Änderungen an der Website werden direkt im Quellcode vorgenommen und in das GitHub-Repository gespeichert.
                Jeder gespeicherte Stand (Commit) startet automatisch einen definierten Prozess, bei dem die Website auf
                einem eigenen Server neu gebaut und veröffentlicht wird. Dadurch wird sichergestellt, dass alle Anpassungen
                kontrolliert, reproduzierbar und ohne manuelle Eingriffe online gehen. Die aktualisierte Version ist in der
                Regel innerhalb weniger Sekunden bis Minuten öffentlich sichtbar.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-border">
              <img
                // TODO: Buradaki src senin mevcut kodundaki fotoğrafla AYNI kalmalı
                src="/images/Automatisierter_Veroeffentlichungsprozess.png"
                alt="Automatisierter Entwicklungs- und Veröffentlichungsprozess"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Zugriff eines Besuchers auf die Website
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wenn eine Besucherin oder ein Besucher die Website aufruft, wird die Anfrage über den Domainnamen an eine
                sichere Cloud-Infrastruktur weitergeleitet. Von dort aus gelangt die Anfrage über einen geschützten Tunnel
                zum Webserver, der die aktuellen Inhalte ausliefert. Dieser Ansatz ermöglicht einen stabilen, sicheren und
                performanten Zugriff auf die Website, ohne dass direkte Serverports im Internet geöffnet werden müssen.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-border">
              <img
                // TODO: Buradaki src senin mevcut kodundaki fotoğrafla AYNI kalmalı
                src="/images/Zugriff_eines_Besuchers_auf_die_Website.png"
                alt="Zugriff eines Besuchers auf die Website"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
