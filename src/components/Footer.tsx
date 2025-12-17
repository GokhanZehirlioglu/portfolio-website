import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 py-8 px-6 border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Baden-Württemberg, Deutschland</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">© 2025 Gökhan Zehirlioglu</span>
        </div>
        <p className="text-sm text-muted-foreground md:hidden">© 2024 Gökhan Zehirlioglu</p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/gokhan-zehirlioglu-a54508280/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/GokhanZehirlioglu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@gokhanzehirlioglu.de"
            className="text-muted-foreground hover:text-primary transition-colors"
            title="E-Mail"
          >
            <Mail className="w-5 h-5" />
          </a>
          <Link
            to="/kontakt"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
