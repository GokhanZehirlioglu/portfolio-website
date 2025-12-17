import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon, Home, Server, Cloud } from "lucide-react";

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

  const projectLinks = [
    { path: "/projekt/home-assistant", label: "Home Assistant", icon: Home },
    { path: "/projekt/web-server", label: "Web Server", icon: Server },
    { path: "/projekt/web-hosting", label: "Web Hosting", icon: Cloud },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-lg md:text-xl font-semibold text-foreground">gökhan zehirlioglu</span>
            <span className="text-[10px] md:text-xs font-normal text-primary tracking-wide">Fachinformatiker für Systemintegration</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 mr-7">

            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Projects Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Projekte
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-card border border-border rounded-xl p-2 min-w-[220px] shadow-xl">
                  {projectLinks.map((project) => (
                    <Link
                      key={project.path}
                      to={project.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      <project.icon className="w-4 h-4 text-primary" />
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/kontakt"
              className={`text-sm font-medium transition-colors ${
                isActive("/kontakt") ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:bg-secondary transition-all"
            >
              {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[73px] left-0 right-0 bg-card border-b border-border p-4 z-40 lg:hidden">
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
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">Projekte</p>
          {projectLinks.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <project.icon className="w-4 h-4 text-primary" />
              {project.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
