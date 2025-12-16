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
    <div className={`flex flex-wrap justify-center gap-5 p-4 px-6 bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-xl ${className}`}>
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
