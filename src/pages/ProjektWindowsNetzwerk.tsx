import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useState, type ReactNode } from "react";
import ProjectRuler from "@/components/ProjectRuler";
import { X, Download } from "lucide-react";

const WIN_BLUE = "#0078D4";

interface ProofImage {
  src: string;
  num: number;
  caption: string;
}

/* ─── Anleitung helper components ─── */
function AnleitungStepP06({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full text-sm font-bold flex-shrink-0">{num}</div>
        <div className="text-base font-semibold text-green-600">{title}</div>
      </div>
      <div className="ml-11 text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function PathDisplay({ path }: { path: string }) {
  const segments = path.split(" > ");
  return (
    <div className="my-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-600 overflow-x-auto whitespace-nowrap">
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && <span className="text-green-600 mx-1.5 font-bold">›</span>}
          <span className={i === segments.length - 1 ? "text-green-600 font-semibold" : "text-gray-600"}>{seg}</span>
        </span>
      ))}
    </div>
  );
}

function SettingBadge({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 my-1 flex-wrap">
      <span className="text-sm text-gray-800 font-medium">{name}</span>
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">{value}</span>
    </div>
  );
}

const ProjektWindowsNetzwerk = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<ProofImage | null>(null);

  const openLightbox = (image: ProofImage) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const proofImages: ProofImage[] = [
    { src: "/images/microsoft/projekt6/Projekt6_2.png", num: 1, caption: `Server-Manager — DHCP-Rolle erfolgreich installiert. Benachrichtigung: „Konfiguration ist für DHCP-Server erforderlich".` },
    { src: "/images/microsoft/projekt6/Projekt6_4.png", num: 2, caption: "DHCP-Konfigurations-Assistent — Autorisierung mit GFN_LAB\\Administrator. Der Server wird im AD als legitimer DHCP-Server registriert." },
    { src: "/images/microsoft/projekt6/Projekt6_5.png", num: 3, caption: "DHCP-Konfiguration — Zusammenfassung: Sicherheitsgruppen erstellt, DHCP-Server autorisiert. Status: Fertig." },
    { src: "/images/microsoft/projekt6/Projekt6_6.png", num: 4, caption: "Bereichserstellungs-Assistent — IP-Adressbereich: 192.168.10.51 bis 192.168.10.100, Subnetzmaske: /24." },
    { src: "/images/microsoft/projekt6/Projekt6_7.png", num: 5, caption: "Bereichsoptionen — Router (Standardgateway): 192.168.10.254." },
    { src: "/images/microsoft/projekt6/Projekt6_8.png", num: 6, caption: "Bereichsoptionen — DNS-Server: 192.168.10.10, Übergeordnete Domäne: gfn_lab.local." },
    { src: "/images/microsoft/projekt6/Projekt6_9.png", num: 7, caption: `Bereichserstellungs-Assistent — „Der Bereichserstellungs-Assistent wurde erfolgreich abgeschlossen."` },
    { src: "/images/microsoft/projekt6/Projekt6_11.png", num: 8, caption: `Client-Netzwerkkonfiguration — „IP-Adresse automatisch beziehen" aktiviert, DNS-Server: 192.168.10.10, Domäne: gfn_lab.local.` },
    { src: "/images/microsoft/projekt6/Projekt6_12.png", num: 9, caption: "ipconfig /all — DHCP aktiviert: Ja, IPv4: 192.168.10.52, Gateway: .254, DHCP-Server: .10, Lease bis 31.03.2026." },
    { src: "/images/microsoft/projekt6/Projekt6_15.png", num: 10, caption: `Active Directory-Benutzer und -Computer — 6 standardisierte Clients im Container „Computers" sichtbar.` },
    { src: "/images/microsoft/projekt6/Projekt6_16.png", num: 11, caption: "DHCP Adressleases — 6 Clients mit standardisierten Namen und automatisch zugewiesenen IPs (.52–.60)." },
    { src: "/images/microsoft/projekt6/Projekt6_17.1.png", num: 12, caption: "C:\\Unternehmensdaten — 5 Abteilungsordner: Betrieb, Finanz, Gemeinsam, IT, Vertrieb (Server 2019)." },
    { src: "/images/microsoft/projekt6/Projekt6_17.2.png", num: 13, caption: "Freigabe-Konfiguration — Netzwerkpfad: \\\\WIN-QLN9UGPDOEA\\Unternehmensdaten, Berechtigungen: Jeder = Vollzugriff." },
    { src: "/images/microsoft/projekt6/Projekt6_17.3.png", num: 14, caption: "Server-Manager — Zugriffsbasierte Aufzählung aktivieren (ABE): Ja. Benutzer sehen nur autorisierte Ordner." },
    { src: "/images/microsoft/projekt6/Projekt6_14.png", num: 15, caption: "Bereichsoptionen — Sichtbar: 003 Router mit der falschen externen IP 10.100.15.41 (markiert). DNS und Domäne korrekt." },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Projekt 06: Netzwerkautomatisierung & IT-Infrastruktur – Gökhan Zehirlioglu</title>
        <meta name="description" content="DHCP-Automatisierung, Active Directory Domain Join, File Server mit ABE — Aufbau einer skalierbaren Unternehmensinfrastruktur auf Windows Server 2019." />
      </Helmet>

      <div className="min-h-screen bg-[#FAFBFC] text-[#1A1A1A]">
        {/* LIGHTBOX */}
        {lightboxOpen && lightboxImage && (
          <div className="fixed inset-0 bg-black/88 z-50 flex items-center justify-center p-8 backdrop-blur-sm" onClick={() => setLightboxOpen(false)}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
              <X size={24} />
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.caption} className="max-w-4xl max-h-[90vh] rounded-lg shadow-2xl" />
          </div>
        )}

        {/* HERO */}
        <section className="bg-gradient-to-br from-[#001D3D] via-[#002B5C] to-[#005A9E] text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22><line x1=%220%22 y1=%220%22 x2=%2260%22 y2=%220%22 stroke=%22white%22 stroke-width=%221%22 opacity=%22.03%22/><line x1=%220%22 y1=%220%22 x2=%220%22 y2=%2260%22 stroke=%22white%22 stroke-width=%221%22 opacity=%22.03%22/></svg>')] pointer-events-none" />
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/70 mb-8 flex-wrap">
              <span>System & Server Administration</span>
              <span className="opacity-40">›</span>
              <span>Microsoft Enterprise IT</span>
              <span className="opacity-40">›</span>
              <span>Modul 2: Identity & Server Administration</span>
              <span className="opacity-40">›</span>
              <span className="text-blue-300 font-medium">Projekt 06</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Zentrale Domäneninfrastruktur<br />& DHCP
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
              DHCP, Domain Join und zentraler File Server — eine skalierbare Unternehmensinfrastruktur auf Windows Server 2019 aufbauen und dokumentieren.
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-8 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-medium">📅 24.03.2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-medium">🖥️ Hyper-V</span> auf Remote Desktop
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300 font-medium">👤 Gokhan Zehirlioglu</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <a href="/downloads/Projekt06_Netzwerk.docx" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium no-underline transition-all backdrop-blur-sm hover:bg-white/20">
                <Download size={16} />
                Dokumentation (DOCX)
              </a>
              <a href="/downloads/Anleitung_Domaeneninfrastruktur_DHCP.docx" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600/15 border border-green-600/35 rounded-lg text-green-300 text-sm font-medium no-underline transition-all backdrop-blur-sm hover:bg-green-600/25">
                <Download size={16} />
                Anleitung (DOCX)
              </a>
            </div>

            <ProjectRuler currentId={6} />
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          {/* 1. ZIEL */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Ziel</h2>
                <p className="text-sm text-gray-600">Was wird hier aufgebaut und warum?</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>In diesem Projekt wird eine <strong>skalierbare und isolierte Unternehmensnetzwerk-Architektur</strong> auf Basis von Windows Server 2019 und Windows 11 Clients aufgebaut. Es simuliert ein reales Szenario: Ein Unternehmen mit mehreren Abteilungen benötigt eine zentral verwaltete IT-Infrastruktur — von der automatischen IP-Vergabe bis zum sicheren Dateiserver.</p>

              <p>Die drei Kernziele des Projekts sind: <strong>Automatisierung der IP-Vergabe</strong> mittels DHCP, <strong>Standardisierung und Domänenintegration</strong> der Endgeräte über Active Directory sowie die <strong>Bereitstellung eines zentralen File Servers</strong> mit Access-Based Enumeration (ABE) — damit jeder Benutzer nur die Ordner sieht, auf die er Zugriff hat.</p>

              <p>Der gesamte Prozess wird nach dem <strong>Proof-Driven-Prinzip</strong> dokumentiert — jeder Konfigurationsschritt wird durch Screenshots belegt. Das Ergebnis ist eine produktionsnahe Infrastruktur, wie sie in realen Unternehmen eingesetzt wird.</p>
            </div>
          </div>

          {/* 2. AUSGANGSSITUATION */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Ausgangssituation</h2>
                <p className="text-sm text-gray-600">Bestehende Infrastruktur vor dem Projekt</p>
              </div>
            </div>

            <div className="mb-6 text-gray-700">
              <p>Das Projekt baut auf der in <strong>Projekt 05</strong> erstellten Active-Directory-Umgebung auf. Der Domain Controller ist bereits konfiguriert und die Domäne <code className="bg-gray-100 px-2 py-1 rounded text-sm">gfn_lab.local</code> existiert. Allerdings fehlen noch automatische Netzwerkkonfiguration, standardisierte Clients und ein zentraler Dateispeicher.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { label: "Domain Controller", value: "Windows Server 2019 Standard Evaluation (WIN-QLN9UGPDOEA)" },
                { label: "Server-IP (statisch)", value: "192.168.10.10 / 24" },
                { label: "Domäne", value: "gfn_lab.local" },
                { label: "Virtualisierung", value: "Hyper-V auf Remote Desktop (WIN-DSQN5G5QED1)" },
                { label: "Clients (geplant)", value: "6× Windows 11 Pro / Enterprise — verschiedene Abteilungen" },
                { label: "Netzwerkbereich", value: "192.168.10.0 / 24" },
                { label: "IP-Vergabe (aktuell)", value: "Manuell — kein DHCP vorhanden" },
                { label: "Dateiserver", value: "Nicht vorhanden — keine zentrale Ablage" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
                  <h4 className="text-sm font-semibold text-blue-600 mb-1">{item.label}</h4>
                  <p className="text-sm text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-gray-700">Das Ziel ist es, diese bestehende AD-Umgebung um drei wesentliche Infrastruktur-Dienste zu erweitern: <strong>DHCP</strong> für automatische IP-Vergabe, <strong>standardisierte Domain-Clients</strong> und einen <strong>File Server</strong> mit abteilungsbasiertem Zugriffsschutz.</p>
          </div>

          {/* 3. ARCHITEKTUR */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Architektur</h2>
                <p className="text-sm text-gray-600">Netzwerkdesign und Infrastrukturkomponenten</p>
              </div>
            </div>

            <p className="mb-6 text-gray-700">Die gesamte Infrastruktur wurde auf einem <strong>Remote Desktop Server</strong> mit Hyper-V aufgebaut. Der Windows Server 2019 übernimmt mehrere Rollen gleichzeitig — Domain Controller, DHCP-Server, DNS-Server und File Server:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: "🖥️", title: "Domain Controller", desc: "Windows Server 2019 mit AD DS, DNS — IP: 192.168.10.10" },
                { icon: "📡", title: "DHCP-Server", desc: "Scope: 192.168.10.51–100, Gateway: .254, DNS: .10" },
                { icon: "🌐", title: "DNS-Server", desc: "Zone: gfn_lab.local — Namensauflösung im Netzwerk" },
                { icon: "📁", title: "File Server", desc: "SMB-Freigabe mit ABE — 5 Abteilungsordner" },
                { icon: "💻", title: "6 Clients", desc: "Win11 Pro/Enterprise — DHCP, Domain Joined, standardisiert" },
                { icon: "🔒", title: "Sicherheit", desc: "ABE: Benutzer sehen nur autorisierte Ordner" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700">Die <strong>Clients</strong> wurden nach einem einheitlichen Namensschema benannt, das sofort die Abteilungszugehörigkeit erkennen lässt: <code className="bg-gray-100 px-2 py-1 rounded text-sm">W11P-Finanz1</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">W11P-Vertrieb2</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">W11P-Betrieb</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">W11ENT-IT</code> usw. So wird eine professionelle NetBIOS-konforme Benennung sichergestellt.</p>
          </div>

          {/* 4. DURCHFÜHRUNG */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Durchführung</h2>
                <p className="text-sm text-gray-600">Drei Phasen — von DHCP über Domain Join bis zum File Server</p>
              </div>
            </div>

            {/* PHASE 1 */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
                📋 Phase 1 — DHCP-Server einrichten
              </div>

              <p className="mb-6 text-gray-700">Um die manuelle IP-Konfiguration abzulösen und IP-Konflikte im Netzwerk zu vermeiden, wurde ein zentraler <strong>DHCP-Server</strong> auf dem Windows Server 2019 eingerichtet.</p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "DHCP-Rolle installieren",
                    desc: `Im Server-Manager wurde über „Rollen und Features hinzufügen" die Rolle DHCP-Server installiert. Nach der Installation erscheint im Server-Manager die Benachrichtigung, dass die DHCP-Konfiguration noch abgeschlossen werden muss.`
                  },
                  {
                    title: "DHCP im Active Directory autorisieren",
                    desc: "Über den DHCP-Konfigurations-Assistenten wurde der Server mit den Anmeldeinformationen GFN_LAB\\Administrator im Active Directory autorisiert. Ohne diese Autorisierung darf ein DHCP-Server in einer AD-Domäne keine Adressen vergeben — ein wichtiger Sicherheitsmechanismus."
                  },
                  {
                    title: "IPv4-Bereich (Scope) erstellen",
                    desc: `In der DHCP-Konsole wurde ein neuer IPv4-Bereich „GFN_Lab_Clients" erstellt: Start-IP 192.168.10.51, End-IP 192.168.10.100, Subnetzmaske 255.255.255.0 (/24). Damit stehen 50 dynamische Adressen für Clients zur Verfügung.`
                  },
                  {
                    title: "Bereichsoptionen konfigurieren",
                    desc: "Als Standardgateway (Router) wurde 192.168.10.254 eingetragen. Als DNS-Server wurde 192.168.10.10 (der Domain Controller) und als Übergeordnete Domäne gfn_lab.local angegeben. Damit erhalten alle Clients automatisch die korrekten Routing- und DNS-Informationen."
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">{idx + 1}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-700">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase 1 Images */}
              <div className="grid gap-6 mb-8">
                {proofImages.slice(0, 7).map((img) => (
                  <div key={img.num} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openLightbox(img)}>
                    <img src={img.src} alt={`Abbildung ${img.num}`} className="w-full h-auto" loading="lazy" />
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border-t border-gray-200">
                      <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-mono font-semibold px-2 py-1 rounded">Abb. {img.num}</span>
                      <p className="text-xs text-gray-700">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHASE 2 */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
                📋 Phase 2 — Client-Standardisierung & Domain Join
              </div>

              <p className="mb-6 text-gray-700">Alle Windows 11 Clients wurden nach einem <strong>einheitlichen Namensschema</strong> benannt und in die Active-Directory-Domäne aufgenommen. Ziel ist eine zentrale Verwaltbarkeit aller Endgeräte.</p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "IPv4 auf DHCP umstellen",
                    desc: `Auf jedem Client wurde über ncpa.cpl → Ethernet → IPv4-Eigenschaften die Option „IP-Adresse automatisch beziehen" aktiviert. Der DNS-Server wurde manuell auf 192.168.10.10 gesetzt, um die Domänenauflösung sicherzustellen.`
                  },
                  {
                    title: "DHCP-Lease überprüfen",
                    desc: "Über ipconfig /all wurde auf jedem Client bestätigt, dass die IP-Adresse vom DHCP-Server bezogen wurde. Beispiel: Hostname Win11_Pro, IP 192.168.10.52, DHCP-Server 192.168.10.10, DNS-Suffix gfn_lab.local, Lease gültig bis 31.03.2026."
                  },
                  {
                    title: "Computerumbenennung (NetBIOS-konform)",
                    desc: "Jeder Client wurde über sysdm.cpl nach einem professionellen Schema umbenannt: W11P-Finanz1, W11P-Finanz2, W11P-Vertrieb1, W11P-Vertrieb2, W11P-Betrieb, W11ENT-IT. Die Namen sind maximal 15 Zeichen lang (NetBIOS-Limit) und zeigen auf den ersten Blick die Abteilung."
                  },
                  {
                    title: "Domain Join",
                    desc: `Über sysdm.cpl → „Ändern" → „Domäne" wurde jeder Client der Domäne gfn_lab.local hinzugefügt. Nach dem Neustart wird die erfolgreiche Integration in der ADUC-Konsole (Active Directory-Benutzer und -Computer) unter dem Container „Computers" sichtbar.`
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">{idx + 1}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-700">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase 2 Images */}
              <div className="grid gap-6 mb-8">
                {proofImages.slice(7, 11).map((img) => (
                  <div key={img.num} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openLightbox(img)}>
                    <img src={img.src} alt={`Abbildung ${img.num}`} className="w-full h-auto" loading="lazy" />
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border-t border-gray-200">
                      <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-mono font-semibold px-2 py-1 rounded">Abb. {img.num}</span>
                      <p className="text-xs text-gray-700">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHASE 3 */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-200">
                📋 Phase 3 — Zentraler File Server mit ABE
              </div>

              <p className="mb-6 text-gray-700">Für die abteilungsübergreifende Zusammenarbeit wurde ein <strong>zentraler Dateiserver</strong> eingerichtet, der höchste Sicherheits- und Usability-Standards erfüllt. Jeder Benutzer soll nur die Ordner sehen, auf die er Zugriff hat.</p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Ordnerstruktur erstellen",
                    desc: "Auf dem Server wurde unter C:\\Unternehmensdaten eine professionelle Ordnerstruktur mit 5 Abteilungen angelegt: IT_Abteilung, Finanz_Abteilung, Vertrieb_Abteilung, Betrieb_Abteilung und Gemeinsam (für abteilungsübergreifende Dokumente)."
                  },
                  {
                    title: "SMB-Freigabe konfigurieren",
                    desc: `Der Stammordner wurde als Netzwerkfreigabe über „Erweiterte Freigabe" konfiguriert. Der Freigabename lautet Unternehmensdaten, der UNC-Pfad ist \\\\WIN-QLN9UGPDOEA\\Unternehmensdaten. Auf der Freigabe-Ebene wurde die Gruppe „Jeder" mit Vollzugriff berechtigt — die granulare Steuerung erfolgt über NTFS-Berechtigungen.`
                  },
                  {
                    title: "Access-Based Enumeration (ABE) aktivieren",
                    desc: `Im Server-Manager unter Datei- und Speicherdienste → Freigaben wurde die Funktion „Zugriffsbasierte Aufzählung aktivieren" eingeschaltet. Dadurch werden Benutzern nur die Ordner angezeigt, für die sie tatsächlich Lese- oder Schreibrechte besitzen — ein unverzichtbares Sicherheitsfeature in Unternehmensumgebungen.`
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">{idx + 1}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-700">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase 3 Images */}
              <div className="grid gap-6">
                {proofImages.slice(11, 14).map((img) => (
                  <div key={img.num} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openLightbox(img)}>
                    <img src={img.src} alt={`Abbildung ${img.num}`} className="w-full h-auto" loading="lazy" />
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border-t border-gray-200">
                      <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-mono font-semibold px-2 py-1 rounded">Abb. {img.num}</span>
                      <p className="text-xs text-gray-700">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projekt Navigation */}
          <div className="flex items-center justify-between pt-8 pb-4 border-t border-gray-200 mt-8">
            <a href="/projekt/windows/ad-setup" className="group">
              <p className="text-xs text-gray-500 mb-1">← Vorheriges Projekt</p>
              <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">Projekt 05: Active Directory Setup</p>
            </a>
            <a href="/projekt/windows/rbac-gpo" className="group text-right">
              <p className="text-xs text-gray-500 mb-1">Nächstes Projekt →</p>
              <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">Projekt 07: Identity & Access Management</p>
            </a>
          </div>

          {/* 5. PROBLEME & LÖSUNGEN */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">5</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Probleme & Lösungen</h2>
                <p className="text-sm text-gray-600">Herausforderungen im Prozess und wie sie gelöst wurden</p>
              </div>
            </div>

            {/* Problem 1 */}
            <div className="mb-6 border border-red-200 rounded-lg overflow-hidden">
              <div className="bg-red-50 px-4 py-3 border-b border-red-200 flex items-center gap-3">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="font-semibold text-red-700">Problem 1: Falsches Standardgateway in den Bereichsoptionen</span>
              </div>
              <div className="p-4 bg-white text-gray-700 text-sm">
                <p>Nach der Erstellung des DHCP-Scopes wurde festgestellt, dass in den <strong>Bereichsoptionen unter „003 Router"</strong> eine falsche IP-Adresse eingetragen war: <code className="bg-gray-100 px-2 py-1 rounded">10.100.15.41</code> — eine Adresse aus dem externen Lab-Netzwerk des Remote Desktop Servers, nicht aus dem internen 192.168.10.x-Netz. Clients, die diese Option erhielten, konnten keine Verbindung zum Internet aufbauen.</p>
              </div>
            </div>

            {/* Solution 1 */}
            <div className="mb-8 border border-green-200 rounded-lg overflow-hidden">
              <div className="bg-green-50 px-4 py-3 border-b border-green-200 flex items-center gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-semibold text-green-700">Lösung: Gateway-Adresse manuell korrigieren</span>
              </div>
              <div className="p-4 bg-white text-gray-700 text-sm space-y-3">
                <p>In der DHCP-Konsole unter <strong>Bereichsoptionen → 003 Router</strong> wurde die falsche Adresse <code className="bg-gray-100 px-2 py-1 rounded">10.100.15.41</code> entfernt und durch die korrekte Gateway-Adresse <code className="bg-gray-100 px-2 py-1 rounded">192.168.10.254</code> ersetzt. Anschließend wurde auf den betroffenen Clients <code className="bg-gray-100 px-2 py-1 rounded">ipconfig /release</code> und <code className="bg-gray-100 px-2 py-1 rounded">ipconfig /renew</code> ausgeführt, um die korrigierte Konfiguration sofort zu übernehmen.</p>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                  <p className="text-blue-700"><strong>Praxishinweis:</strong> In virtualisierten Umgebungen existieren häufig mehrere Netzwerkbereiche parallel. Es ist entscheidend, die Bereichsoptionen nach der Erstellung zu überprüfen — insbesondere den Router-Eintrag. Ein falsches Gateway führt dazu, dass Clients zwar intern kommunizieren können, aber keinen Zugang zum Internet oder zu anderen Subnetzen erhalten.</p>
                </div>
              </div>
            </div>

            {/* Problem 1 Screenshot */}
            <div className="mb-8 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openLightbox(proofImages[14])}>
              <img src={proofImages[14].src} alt={`Abbildung ${proofImages[14].num}`} className="w-full h-auto" loading="lazy" />
              <div className="flex items-center gap-3 p-3 bg-gray-50 border-t border-gray-200">
                <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-mono font-semibold px-2 py-1 rounded">Abb. 15</span>
                <p className="text-xs text-gray-700">{proofImages[14].caption}</p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="mb-6 border border-red-200 rounded-lg overflow-hidden">
              <div className="bg-red-50 px-4 py-3 border-b border-red-200 flex items-center gap-3">
                <span className="text-red-600 font-bold">⚠️</span>
                <span className="font-semibold text-red-700">Problem 2: Domain Join schlägt fehl — DNS-Auflösung</span>
              </div>
              <div className="p-4 bg-white text-gray-700 text-sm">
                <p>Beim Versuch, einen Client der Domäne <code className="bg-gray-100 px-2 py-1 rounded">gfn_lab.local</code> hinzuzufügen, erschien die Fehlermeldung: <strong>„Die Domäne konnte nicht kontaktiert werden"</strong>. Der Client konnte den Domänennamen nicht auflösen, weil er noch den externen DNS-Server (z. B. den des ISP) als bevorzugten DNS-Server eingetragen hatte.</p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="border border-green-200 rounded-lg overflow-hidden">
              <div className="bg-green-50 px-4 py-3 border-b border-green-200 flex items-center gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-semibold text-green-700">Lösung: DNS-Server manuell auf den DC setzen</span>
              </div>
              <div className="p-4 bg-white text-gray-700 text-sm space-y-3">
                <p>In den IPv4-Eigenschaften des Clients wurde der <strong>bevorzugte DNS-Server</strong> manuell auf <code className="bg-gray-100 px-2 py-1 rounded">192.168.10.10</code> (den Domain Controller) gesetzt. Alternativ kann die IP auf DHCP umgestellt werden — vorausgesetzt, die DHCP-Bereichsoptionen enthalten den korrekten DNS-Eintrag. Nach der Änderung war der Domain Join sofort erfolgreich.</p>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                  <p className="text-blue-700"><strong>Praxishinweis:</strong> In einer Active-Directory-Umgebung muss der Client den Domain Controller als DNS-Server verwenden, da AD-Dienste (SRV-Records) nur über den internen DNS aufgelöst werden können. Dies ist eine der häufigsten Fehlerquellen beim Domain Join.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="font-semibold text-gray-800 mb-4">Abweichungen vom Standardvorgehen:</p>

              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Client-Benennung</h4>
                  <p className="text-sm text-yellow-800">Statt generischer Namen wie „PC-01", „PC-02" wurden abteilungsbezogene Namen gewählt (W11P-Finanz1, W11ENT-IT etc.). Dies entspricht dem NetBIOS-Limit von 15 Zeichen und ist praxisnäher für reale Unternehmensumgebungen.</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Freigabe-Berechtigungen</h4>
                  <p className="text-sm text-yellow-800">Auf der Freigabe-Ebene wurde „Jeder = Vollzugriff" gesetzt. Die granulare Zugriffskontrolle erfolgt ausschließlich über NTFS-Berechtigungen. Dieses Vorgehen entspricht der Microsoft Best Practice: Freigabe weit öffnen, NTFS steuert.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. ERGEBNIS */}
          <div className="mb-16 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">6</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Ergebnis</h2>
                <p className="text-sm text-gray-600">Alle Erfolgskriterien auf einen Blick</p>
              </div>
            </div>

            <p className="mb-6 text-gray-700">Die Netzwerkautomatisierung und der Aufbau der IT-Infrastruktur wurden <strong>erfolgreich abgeschlossen</strong>. Alle drei Phasen — DHCP, Domain Join und File Server — sind produktionsbereit:</p>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Kriterium</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Nachweis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { criterion: "DHCP-Server installiert und autorisiert", imgs: "Abb. 1–3" },
                    { criterion: "IPv4-Bereich (Scope) erstellt und aktiv", imgs: "Abb. 4–7" },
                    { criterion: "Bereichsoptionen korrekt (Gateway, DNS, Domäne)", imgs: "Abb. 5, 6" },
                    { criterion: "Clients erhalten IP automatisch via DHCP", imgs: "Abb. 8, 9" },
                    { criterion: "6 Clients standardisiert und in Domäne aufgenommen", imgs: "Abb. 10, 11" },
                    { criterion: "Ordnerstruktur auf Server erstellt (5 Abteilungen)", imgs: "Abb. 12" },
                    { criterion: "SMB-Freigabe konfiguriert und erreichbar", imgs: "Abb. 13" },
                    { criterion: "Access-Based Enumeration (ABE) aktiviert", imgs: "Abb. 14" },
                    { criterion: "Gateway-Problem erkannt und behoben", imgs: "Abb. 15" },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm text-gray-800">{row.criterion}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">✓ Erfüllt</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.imgs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Fazit</h3>
              <div className="space-y-3 text-sm text-blue-900">
                <p>Dieses Projekt zeigt den Aufbau einer <strong>vollständigen Unternehmensinfrastruktur</strong> in drei Schritten: Netzwerkautomatisierung (DHCP), zentrales Client-Management (AD Domain Join) und sichere Dateiablage (File Server mit ABE). Alle Komponenten arbeiten zusammen und bilden eine skalierbare Basis für weitere Erweiterungen wie Group Policies, Druckdienste oder Backup-Strategien.</p>

                <p>Das Projekt demonstriert praxisnah, dass die <strong>Kombination aus DHCP, DNS, Active Directory und File Services</strong> das Rückgrat jeder Windows-Unternehmensinfrastruktur bildet. Die aufgetretenen Probleme — insbesondere das falsche Gateway — sind typische Fehlerquellen in der Praxis und wurden eigenständig analysiert und behoben.</p>
              </div>
            </div>
          </div>

          {/* 7. SCREENSHOT-ÜBERSICHT */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">7</div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Screenshots (Proof)</h2>
                <p className="text-sm text-gray-600">Vollständige Übersicht aller Nachweise</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-20">Abb.</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Beschreibung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {proofImages.map((img) => (
                    <tr key={img.num} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono font-semibold text-blue-600">Abb. {img.num}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{img.caption}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SCHRITT-FÜR-SCHRITT ANLEITUNG */}
        <section className="py-14 border-b border-gray-200" style={{background:"linear-gradient(135deg, #F0FFF4 0%, #F7FFFB 50%, #FAFBFC 100%)"}}>
          <div className="max-w-4xl mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">8</div>
              <div>
                <h2 className="text-2xl font-bold mb-0">Schritt-für-Schritt Anleitung</h2>
                <p className="text-sm text-green-600 font-medium mt-0.5">Zum Nachmachen — So konfigurierst du es selbst</p>
              </div>
            </div>

            {/* Intro Callout */}
            <div className="mb-8 p-5 bg-white border border-green-200 border-l-4 border-l-green-600 rounded-r-xl flex items-center gap-3.5">
              <span className="text-lg">📖</span>
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong>Diese Anleitung zeigt dir Schritt für Schritt, wie du dieses Projekt selbst nachbauen kannst.</strong> Folge den exakten Klickpfaden, um DHCP, File Server und Domain Join in deiner eigenen Umgebung einzurichten.
              </p>
            </div>

            {/* Schritt 1 */}
            <AnleitungStepP06 num="1" title="DHCP-Server installieren und autorisieren">
              <p className="text-sm text-gray-700 mb-2">Öffne den <strong>Server-Manager</strong> und starte den Assistenten:</p>
              <PathDisplay path="Server-Manager > Rollen und Features hinzufügen" />
              <p className="text-sm text-gray-700 my-2">Setze den Haken bei <strong>DHCP-Server</strong> → klicke <strong>Installieren</strong>.</p>
              <p className="text-sm text-gray-700 my-2">Nach der Installation erscheint ein gelbes Ausrufezeichen im Server-Manager → klicke auf <strong>DHCP-Konfiguration abschließen</strong>.</p>
              <p className="text-sm text-gray-700 my-2">Klicke <strong>Commit</strong>, um den DHCP-Server im Active Directory zu autorisieren.</p>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                <strong>Hinweis:</strong> Ohne Autorisierung darf ein DHCP-Server in einer AD-Domäne keine Adressen vergeben — ein wichtiger Sicherheitsmechanismus.
              </div>
            </AnleitungStepP06>

            {/* Schritt 2 */}
            <AnleitungStepP06 num="2" title="DHCP-Bereich (Scope) konfigurieren">
              <p className="text-sm text-gray-700 mb-2">Öffne die DHCP-Konsole:</p>
              <PathDisplay path="Server-Manager > Tools > DHCP" />
              <p className="text-sm text-gray-700 my-2">Erweitere den Servernamen → <strong>IPv4</strong>.</p>
              <p className="text-sm text-gray-700 my-2">Rechtsklick auf <strong>IPv4</strong> → <strong>Neuer Bereich...</strong></p>
              <p className="text-sm text-gray-700 my-2">Gib folgende Werte ein:</p>
              <div className="my-2 space-y-1">
                <SettingBadge name="Name" value="GFN_Lab_Clients" />
                <SettingBadge name="Start-IP" value="192.168.10.51" />
                <SettingBadge name="End-IP" value="192.168.10.100" />
                <SettingBadge name="Subnetzlänge" value="24" />
              </div>
              <p className="text-sm text-gray-700 my-2">Klicke <strong>Weiter</strong> und konfiguriere die Bereichsoptionen:</p>
              <div className="my-2 space-y-1">
                <SettingBadge name="Router (Standardgateway)" value="192.168.10.10" />
                <SettingBadge name="DNS-Server" value="192.168.10.10" />
              </div>
              <p className="text-sm text-gray-700 my-2">Bereich aktivieren → <strong>Fertig stellen</strong>.</p>
            </AnleitungStepP06>

            {/* Schritt 3 */}
            <AnleitungStepP06 num="3" title="Zentralen File Server einrichten (Freigabe)">
              <p className="text-sm text-gray-700 mb-2">Öffne den <strong>Windows Explorer</strong> auf dem Server.</p>
              <p className="text-sm text-gray-700 my-2">Navigiere zu Laufwerk <strong>C:</strong> → Erstelle einen neuen Ordner: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Unternehmensdaten</code></p>
              <p className="text-sm text-gray-700 my-2">Rechtsklick auf den Ordner → <strong>Eigenschaften</strong> → Reiter <strong>Freigabe</strong> → <strong>Erweiterte Freigabe...</strong></p>
              <p className="text-sm text-gray-700 my-2">Setze den Haken bei <strong>„Diesen Ordner freigeben"</strong> → klicke <strong>Berechtigungen</strong>.</p>
              <div className="my-2 space-y-1">
                <SettingBadge name="Gruppe" value="Jeder" />
                <SettingBadge name="Berechtigung" value="Vollzugriff → Zulassen" />
              </div>
              <p className="text-sm text-gray-700 my-2">Klicke <strong>OK</strong> → <strong>OK</strong>.</p>
              <div className="mt-3 p-3 bg-gray-100 border border-gray-200 rounded font-mono text-xs text-blue-700">
                \\ServerName\Unternehmensdaten
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                <strong>Best Practice:</strong> Freigabe-Ebene weit öffnen (Jeder = Vollzugriff), granulare Steuerung erfolgt über NTFS-Berechtigungen.
              </div>
            </AnleitungStepP06>

            {/* Schritt 4 */}
            <AnleitungStepP06 num="4" title="Client-PC in die Domäne aufnehmen (Domain Join)">
              <p className="text-sm text-gray-700 mb-2">Starte den <strong>Windows 11 Client</strong> und prüfe, ob eine DHCP-IP zugewiesen wurde.</p>
              <p className="text-sm text-gray-700 my-2">Drücke <strong>Windows-Taste + R</strong> → gib ein:</p>
              <div className="my-2 p-2 bg-gray-100 border border-gray-200 rounded font-mono text-xs text-blue-700">
                sysdm.cpl
              </div>
              <p className="text-sm text-gray-700 my-2">→ Drücke <strong>Enter</strong>.</p>
              <p className="text-sm text-gray-700 my-2">Wechsle zum Reiter <strong>Computername</strong> → klicke <strong>Ändern...</strong></p>
              <p className="text-sm text-gray-700 my-2">Wähle <strong>Domäne</strong> und gib ein:</p>
              <div className="my-2">
                <SettingBadge name="Domäne" value="gfn_lab.local" />
              </div>
              <p className="text-sm text-gray-700 my-2">Gib die <strong>Domänen-Administrator Anmeldedaten</strong> ein.</p>
              <p className="text-sm text-gray-700 my-2">Es erscheint die Bestätigung: <strong>„Willkommen in der Domäne gfn_lab.local"</strong></p>
              <p className="text-sm text-gray-700 my-2">Klicke <strong>OK</strong> → <strong>Client-PC neu starten</strong>.</p>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                <strong>Hinweis:</strong> Der Client muss den Domain Controller als DNS-Server verwenden, damit die Domäne aufgelöst werden kann. Stelle sicher, dass DHCP die korrekte DNS-Adresse verteilt.
              </div>
            </AnleitungStepP06>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-100 border-t border-gray-200 py-8 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 font-medium">
              <strong>Projekt 06</strong> — Microsoft Enterprise IT · Modul 2: Identity & Server Administration
            </p>
            <p className="text-xs text-gray-600 mt-2">
              <a href="https://gokhanzehirlioglu.de" className="text-blue-500 hover:underline">gokhanzehirlioglu.de</a> · Gokhan Zehirlioglu · Fachinformatiker für Systemintegration
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default ProjektWindowsNetzwerk;
