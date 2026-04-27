import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Construction } from "lucide-react";

interface PlaceholderPageProps {
    title: string;
    category: string;
    categoryColor: string;
    status?: 'coming-soon' | 'planned';
}

const PlaceholderPage = ({ title, category, categoryColor, status = 'coming-soon' }: PlaceholderPageProps) => {
    const isPlanned = status === 'planned';

    return (
        <Layout>
            <Helmet>
                <title>{title} — Gökhan Zehirlioglu</title>
                <meta name="description" content={`${title} — ${isPlanned ? 'Geplant' : 'Coming Soon'}`} />
            </Helmet>

            <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 md:px-6">
                <div className="max-w-xl mx-auto text-center">

                    {/* Category Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-8 border"
                        style={{
                            color: categoryColor,
                            borderColor: `${categoryColor}33`,
                            backgroundColor: `${categoryColor}11`,
                        }}
                    >
                        {category}
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center">
                            {isPlanned ? (
                                <Construction className="w-10 h-10 text-muted-foreground" />
                            ) : (
                                <Clock className="w-10 h-10 text-muted-foreground" />
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                        {title}
                    </h1>

                    {/* Status */}
                    <p className="text-lg text-muted-foreground mb-8">
                        {isPlanned
                            ? "Dieses Projekt ist in Planung. Inhalt wird zu einem späteren Zeitpunkt hinzugefügt."
                            : "Dieses Projekt wird gerade vorbereitet. Inhalt folgt in Kürze."
                        }
                    </p>

                    {/* Back Button */}
                    <Link
                        to="/projekte"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Übersicht
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default PlaceholderPage;
