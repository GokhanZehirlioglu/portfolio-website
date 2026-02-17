import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import Logo from "./Logo";
import { featuredProjects, linuxProjects, ciscoProjects } from "@/data/portfolio";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/ueber-mich", label: "Über mich" },
    { path: "/kontakt", label: "Kontakt" },
  ];

  const projectLinks = featuredProjects;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-semibold text-foreground">gökhan zehirlioglu</span>
              <span className="text-[10px] md:text-xs font-normal text-primary tracking-wide">Fachinformatiker für Systemintegration</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 ml-auto mr-7">

            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all pb-1 border-b-2 ${
                  isActive(link.path)
                    ? "text-primary border-primary"
                    : "text-muted-foreground hover:text-primary border-transparent hover:border-primary/30"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Projects Dropdown */}
            <div className="relative group focus-within:*:opacity-100 focus-within:*:visible">
              <Link
                to="/projekte"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Projekte
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                <div className="bg-card border border-border rounded-xl p-2 min-w-[240px] shadow-xl">
                  {projectLinks.map((project) => (
                    <Link
                      key={project.path}
                      to={project.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors"
                    >
                      <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Linux Projects Dropdown */}
            <div className="relative group focus-within:*:opacity-100 focus-within:*:visible">
              <Link
                to="/linux-projekte"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Linux
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                <div className="bg-card border border-border rounded-xl p-2 min-w-[240px] shadow-xl">
                  {linuxProjects.map((project) => (
                    <Link
                      key={project.path}
                      to={project.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors"
                    >
                      <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Cisco Projects Dropdown */}
            <div className="relative group focus-within:*:opacity-100 focus-within:*:visible">
              <Link
                to="/cisco-projekte"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Cisco
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all">
                <div className="bg-card border border-border rounded-xl p-2 min-w-[240px] shadow-xl">
                  {ciscoProjects.map((project) => (
                    <Link
                      key={project.path}
                      to={project.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground hover:bg-secondary focus:bg-secondary focus:outline-none transition-colors"
                    >
                      <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/kontakt"
              className={`text-sm font-medium transition-all pb-1 border-b-2 ${
                isActive("/kontakt")
                  ? "text-primary border-primary"
                  : "text-muted-foreground hover:text-primary border-transparent hover:border-primary/30"
              }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Helles Design aktivieren" : "Dunkles Design aktivieren"}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:bg-secondary transition-all"
            >
              {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="fixed top-[73px] left-0 right-0 bg-card border-b border-border p-4 z-40 lg:hidden" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            to="/projekte"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-xs font-semibold text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Projekte
          </Link>
          {projectLinks.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
              {project.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            to="/linux-projekte"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-xs font-semibold text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Linux
          </Link>
          {linuxProjects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
              {project.label}
            </Link>
          ))}
          <div className="border-t border-border my-2" />
          <Link
            to="/cisco-projekte"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2 text-xs font-semibold text-muted-foreground uppercase hover:text-primary transition-colors"
          >
            Cisco
          </Link>
          {ciscoProjects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <img src={project.logos[0]} alt="" className="w-4 h-4 object-contain" />
              {project.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
