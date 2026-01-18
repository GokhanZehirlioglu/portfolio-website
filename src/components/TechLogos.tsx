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
    <div className={`flex flex-wrap justify-center gap-6 py-3 px-8 bg-card/80 backdrop-blur-md border border-primary/20 rounded-full shadow-lg shadow-primary/5 ${className}`}>
      {logos.map((logo, index) => (
        <img
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          title={logo.title}
          className="w-8 h-8 opacity-70 grayscale-[30%] hover:opacity-100 hover:scale-110 hover:grayscale-0 transition-all duration-200 animate-float"
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default TechLogos;
