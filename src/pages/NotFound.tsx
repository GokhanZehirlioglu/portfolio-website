import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <section className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Seite nicht gefunden</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Die angeforderte Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all"
            >
              <Home className="w-4 h-4" />
              Zur Startseite
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
