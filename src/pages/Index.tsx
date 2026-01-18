import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import TechLogos from "@/components/TechLogos";
import StatCard from "@/components/StatCard";
import { ArrowRight } from "lucide-react";
import { techLogos, certificates, badges, projects } from "@/data/portfolio";

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                <span className="font-semibold gradient-text">Fachinformatiker für Systemintegration</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Fachinformatiker für Systemintegration mit Azure & Cisco Zertifizierungen.
                Spezialisiert auf Netzwerkinfrastruktur, Containerisierung und Smart Home Automation.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <StatCard
                  value={projects.length.toString()}
                  label="Projekte"
                  tooltipTitle="Abgeschlossene Projekte"
                  items={projects}
                />

                <StatCard
                  value={certificates.length.toString()}
                  label="Zertifikate"
                  tooltipTitle="Offizielle Zertifikate"
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
                  to="/ueber-mich"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/projekte"
                  className="inline-flex items-center gap-2 px-7 py-4 border border-primary/20 bg-primary/5 text-primary font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Projekte ansehen
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
            <div className="relative h-[450px] lg:h-[550px] flex items-end justify-center">
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
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <TechLogos logos={techLogos} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
