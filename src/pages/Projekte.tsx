import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { featuredProjects } from "@/data/portfolio";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Projekte = () => {
    return (
        <Layout>
            <Helmet>
                <title>Projekte - Gökhan Zehirlioglu</title>
                <meta name="description" content="Übersicht meiner IT-Projekte und Infrastruktur-Setups." />
            </Helmet>

            <section className="min-h-[calc(100vh-5rem)] py-12 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-light mb-4">
                            Meine <span className="font-semibold gradient-text">Projekte</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Hier finden Sie eine Auswahl meiner aktuellen Projekte und Infrastruktur-Setups,
                            an denen ich arbeite.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {featuredProjects.map((project, index) => (
                            <Link
                                key={index}
                                to={project.path}
                                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex items-center gap-6"
                            >
                                {/* Loogs Layout */}
                                <div className="flex-shrink-0 flex items-center gap-3 w-24 justify-center">
                                    {project.logos && project.logos.map((logoUrl, i) => (
                                        <div key={i} className="w-10 h-10 p-1.5 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                            <img src={logoUrl} alt="Tech Logo" className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                                        {project.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Action */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    );
};

export default Projekte;
