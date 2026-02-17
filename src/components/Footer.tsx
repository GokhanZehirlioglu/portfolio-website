import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm">
      {/* Gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: identity */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-semibold text-foreground">Gökhan Zehirlioglu</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Baden-Württemberg, Deutschland</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">© {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs text-muted-foreground md:hidden">© {new Date().getFullYear()}</p>
          </div>

          {/* Right: social links */}
          <div className="flex items-center gap-1">
            <a
              href="https://www.linkedin.com/in/gokhan-zehirlioglu-a54508280/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/GokhanZehirlioglu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:gokhanzehirlioglu@gmail.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-all"
              title="E-Mail"
            >
              <Mail className="w-4 h-4" />
            </a>
            <Link
              to="/kontakt"
              className="ml-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border/60 hover:border-primary/40 px-3 py-1.5 rounded-lg"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
