interface TechLogosProps {
  logos: Array<{
    src: string;
    alt: string;
    title: string;
  }>;
  className?: string;
}

const TechLogos = ({ logos, className = "" }: TechLogosProps) => {
  return (
    <div className={`flex flex-wrap justify-center gap-4 md:gap-6 py-4 px-6 md:px-10 bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl shadow-lg shadow-primary/5 ${className}`}>
      {logos.map((logo, index) => (
        <div
          key={logo.alt}
          className="relative group flex items-center justify-center animate-float"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="w-4 h-4 opacity-70 grayscale-[30%] group-hover:opacity-100 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-200"
          />
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover border border-border px-2 py-1 text-[10px] font-medium text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
            {logo.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TechLogos;
