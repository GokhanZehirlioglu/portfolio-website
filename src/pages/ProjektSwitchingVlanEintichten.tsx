import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { Server, Wifi, CheckCircle2, Clock } from "lucide-react";

const ProjektSwitchingVlanEintichten = () => {
  return (
    <Layout>
      <Helmet>
        <title>VLAN Konfiguration — Gökhan Zehirlioglu</title>
        <meta name="description" content="Grundlegende VLAN-Konfiguration auf einem Cisco Switch: Theorie, Praxis und Demo." />
      </Helmet>

      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-medium mb-6">
            <Clock className="w-3.5 h-3.5" />
            In Bearbeitung
          </div>

          <h1 className="text-3xl font-bold mb-4 gradient-text">Switching — VLAN einrichten</h1>
          <p className="text-muted-foreground mb-4">
            Kurzprojekt: Grundlegende VLAN-Konfiguration und Demo-Dokumentation.
          </p>

          <div className="glass rounded-xl p-6 text-left">
            <p className="mb-3">
              Inhalt: Grundlagen der VLAN-Theorie, schrittweise Switch-Konfiguration und kurze Demonstrationen.
            </p>

            <p className="mb-2 font-semibold">Warum?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Ein kompakter Leitfaden für Netzwerksegmentierung, Sicherheit und Traffic-Isolierung.
            </p>

            <p className="mb-2 font-semibold">Umfang & Zeitrahmen</p>
            <p className="text-sm text-muted-foreground">
              Die grundlegende Konfiguration und Tests werden innerhalb eines Tages in der Laborumgebung abgeschlossen. Für die Demo-Aufnahmen wird ein zusätzlicher Tag benötigt.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Server className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs">Switch</span>
              </div>
              <div className="flex flex-col items-center">
                <Wifi className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs">VLAN</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs">Test</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjektSwitchingVlanEintichten;
