import Layout from "@/components/Layout";
import { Server, Wifi, CheckCircle2 } from "lucide-react";

const ProjektSwitchingVlanEintichten = () => {
  return (
    <Layout>
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Switching VLAN einrichten</h1>
          <p className="text-muted-foreground mb-4">Kısa proje: temel VLAN yapılandırması ve kısa video/vlog içeriği.</p>

          <div className="glass rounded-xl p-6 text-left">
            <p className="mb-3">İçerik: temel teori, switch üzerinde VLAN konfigürasyonu adımları ve kısa demo çekimleri.</p>

            <p className="mb-2 font-semibold">Neden?</p>
            <p className="text-sm text-muted-foreground mb-3">Ağ segmentasyonu, güvenlik ve trafik izolasyonu için hızlı bir rehber sunmak.</p>

            <p className="mb-2 font-semibold">Nereleri gezmeli & Ne kadar süre?</p>
            <p className="text-sm text-muted-foreground">Laboratuvar ortamında 1 gün içinde temel konfigürasyon ve testler tamamlanır; demo çekimleri için ekstra 1 gün yeterli.</p>

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
