import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import TechLogos from "@/components/TechLogos";
import StatCard from "@/components/StatCard";
import { ArrowRight } from "lucide-react";
import { techLogos, certificates, badges, projects, totalProjectCount } from "@/data/portfolio";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Gökhan Zehirlioglu - Fachinformatiker für Systemintegration</title>
        <meta name="description" content="Portfolio von Gökhan Zehirlioglu, Fachinformatiker für Systemintegration. Spezialisiert auf Azure, Cisco, Linux und Netzwerkinfrastruktur." />
      </Helmet>
      <section className="min-h-[calc(100vh-5rem)] flex items-center px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="flex flex-col gap-8">
              <h1 className="flex flex-col gap-2 mb-4">
                <span className="text-[13px] md:text-[15px] tracking-[0.3em] uppercase text-muted-foreground font-mono">
                  Angehender
                </span>
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                  Fachinformatiker
                </span>
                <span className="font-serif text-5xl md:text-6xl lg:text-7xl italic font-light text-orange-400 tracking-[-0.02em]">
                  Cloud Security.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Angehender Fachinformatiker für Systemintegration mit klarem Fokus auf Cloud Security. Während ich mich intensiv auf Azure-Zertifizierungen vorbereite, simuliere ich bereits heute komplexe Enterprise-Sicherheitsarchitekturen in meinem eigenen Homelab, um Cloud-Konzepte in die Praxis umzusetzen.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <StatCard
                  value={`${totalProjectCount}+`}
                  label="Projekte"
                  tooltipTitle="Highlight-Projekte (Auswahl)"
                  items={projects}
                />

                <StatCard
                  value={certificates.length.toString()}
                  label="Zertifikate"
                  tooltipTitle="Offizielle Zertifikate · Azure (In Progress)"
                  items={certificates}
                />

                <StatCard
                  value={badges.length.toString()}
                  label="Badges"
                  tooltipTitle="Cisco Networking Academy"
                  items={badges}
                />

                <StatCard
                  value="24/7"
                  label="Home Server"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/projekte"
                  className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -ml-4" />
                  Projekte ansehen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                </Link>
                <Link
                  to="/ueber-mich"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-primary/20 bg-background/50 backdrop-blur-sm text-foreground font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-primary/5 hover:border-primary transition-all"
                >
                  Mehr erfahren
                </Link>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-border text-muted-foreground font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-secondary/50 hover:text-foreground transition-all"
                >
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Hero Image Area */}
            <div className="flex flex-col gap-6 w-full items-center">
              <div className="relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden border border-border group shadow-2xl shadow-primary/5 transition-all duration-500 hover:shadow-primary/30 hover:border-primary/50">
                {/* HERO IMAGE */}
                <img
                  src="/images/hero.jpg"
                  alt="Gökhan Zehirlioglu — Fachinformatiker für Systemintegration, HomeLab und Netzwerk-Projekte"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  // @ts-expect-error React 18 doesn't support fetchPriority prop yet
                  fetchpriority="high"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-emerald/20 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Tech Logos */}
              <div className="w-full max-w-4xl mx-auto px-4 mt-4">
                <div className="scale-90 md:scale-100 opacity-70 hover:opacity-100 transition-opacity duration-500">
                  <TechLogos
                    logos={techLogos}
                    className="flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
