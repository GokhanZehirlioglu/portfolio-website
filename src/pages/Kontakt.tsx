import Layout from "@/components/Layout";
import { Linkedin, Github, Mail, MapPin, Briefcase, Lightbulb } from "lucide-react";

const Kontakt = () => {
  const contactCards = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Professionelles Netzwerk",
      href: "https://linkedin.com/in/gokhan-zehirlioglu-a54508280/",
      color: "#0A66C2",
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "Projekte & Code",
      href: "https://github.com/GokhanZehirlioglu",
      color: "currentColor",
    },
    {
      icon: Mail,
      title: "E-Mail",
      subtitle: "Direkt schreiben",
      href: "mailto:kontakt@gokhan-zehirlioglu.de",
      color: "currentColor",
    },
  ];

  const infoItems = [
    {
      icon: MapPin,
      label: "Standort",
      value: "Mannheim, Deutschland",
    },
    {
      icon: Briefcase,
      label: "Beruf",
      value: "Fachinformatiker für Systemintegration",
    },
    {
      icon: Lightbulb,
      label: "Schwerpunkte",
      value: "IT-Infrastruktur, Netzwerksicherheit, Home Automation",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Kontakt</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interesse an einer Zusammenarbeit? Ich freue mich auf Ihre Nachricht!
        </p>
      </section>

      {/* Content */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass rounded-xl p-8 text-center hover-lift hover:border-primary transition-all"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <card.icon className="w-12 h-12" style={{ color: card.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </a>
          ))}
        </div>

        {/* Info Section */}
        <div className="glass rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Informationen
          </h2>
          <div className="space-y-0">
            {infoItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 py-4 ${
                  index < infoItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
