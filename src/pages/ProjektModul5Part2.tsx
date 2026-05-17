import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Shield, ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

/* ─── Theme ─────────────────────────────────────────────────── */
const C  = "#7C3AED";   // violet-700
const AZ = "#A78BFA";   // violet-400 (light accent)
const HERO_BG = "linear-gradient(135deg, #1C1040 0%, #2D1B69 50%, #1C1040 100%)";
const CONTENT_BG = "#13102A";
const CARD_BG    = "#1E1A3A";
const CARD2_BG   = "#251F45";
const BORDER_C   = "#4C3A8A";

/* ─── Helpers ────────────────────────────────────────────────── */
const Cmd = ({ children }: { children: string }) => (
  <code style={{ background: "#0F0D20", color: "#C4B5FD", border: "1px solid #3D2F7A",
    padding: "1px 7px", borderRadius: 4, fontFamily: "monospace", fontSize: "0.82em" }}>
    {children}
  </code>
);

/* Numbered step row */
const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 14, marginBottom: 10, alignItems: "flex-start" }}>
    <span style={{ flexShrink: 0, width: 26, height: 26, background: `${C}25`,
      border: `1px solid ${C}50`, borderRadius: "50%", display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 11, fontWeight: 700, color: AZ, marginTop: 1 }}>
      {n}
    </span>
    <span style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.7 }}>{children}</span>
  </div>
);

/* Screenshot / figure component */
const Figure = ({ src, caption, alt, wide = false }: {
  src: string; caption: string; alt: string; wide?: boolean;
}) => (
  <figure style={{ margin: wide ? "28px -20px" : "24px 0", textAlign: "center" }}>
    <div style={{
      display: "inline-block", borderRadius: 10, overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.25)",
      background: "#0A0818", maxWidth: "100%"
    }}>
      {/* Window chrome bar */}
      <div style={{ height: 28, background: "#1A1535", display: "flex", alignItems: "center",
        gap: 6, padding: "0 12px", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        {["#FF5F57","#FEBC2E","#28C840"].map((c, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
      </div>
      <img src={src} alt={alt} style={{ display: "block", maxWidth: "100%", height: "auto",
        maxHeight: 420, objectFit: "contain" }} />
    </div>
    <figcaption style={{ marginTop: 10, fontSize: 12, color: "#8B7EC8", fontStyle: "italic",
      letterSpacing: "0.01em" }}>
      {caption}
    </figcaption>
  </figure>
);

/* Two figures side-by-side */
const FigureRow = ({ figs }: { figs: { src: string; caption: string; alt: string }[] }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>
    {figs.map((f, i) => (
      <figure key={i} style={{ margin: 0, textAlign: "center" }}>
        <div style={{ borderRadius: 8, overflow: "hidden",
          boxShadow: "0 6px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(124,58,237,0.2)",
          background: "#0A0818" }}>
          <div style={{ height: 22, background: "#1A1535", display: "flex", alignItems: "center",
            gap: 5, padding: "0 10px", borderBottom: "1px solid rgba(124,58,237,0.15)" }}>
            {["#FF5F57","#FEBC2E","#28C840"].map((c, j) => (
              <span key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.6 }} />
            ))}
          </div>
          <img src={f.src} alt={f.alt} style={{ display: "block", width: "100%", height: "auto",
            maxHeight: 300, objectFit: "contain" }} />
        </div>
        <figcaption style={{ marginTop: 8, fontSize: 11, color: "#8B7EC8", fontStyle: "italic" }}>
          {f.caption}
        </figcaption>
      </figure>
    ))}
  </div>
);

/* Section with collapsible steps */
type SectionProps = {
  id: string;
  stepRange: string;
  title: string;
  background?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
};

const Section = ({ id, stepRange, title, background, hint, children }: SectionProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} style={{ marginBottom: 28 }}>
      {/* Section header */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
        background: CARD_BG, border: `1px solid ${BORDER_C}`,
        borderBottom: open ? "none" : `1px solid ${BORDER_C}`,
        borderRadius: open ? "12px 12px 0 0" : 12,
        cursor: "pointer", textAlign: "left", transition: "background 0.15s"
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5,
          background: `${C}20`, color: AZ, border: `1px solid ${C}35`, whiteSpace: "nowrap",
          letterSpacing: "0.04em" }}>
          {stepRange}
        </span>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: "#E2E8F0" }}>{title}</span>
        {open ? <ChevronUp size={16} color={AZ} /> : <ChevronDown size={16} color={AZ} />}
      </button>

      {open && (
        <div style={{ padding: "20px 22px", background: background || CARD2_BG,
          border: `1px solid ${BORDER_C}`, borderTop: "none", borderRadius: "0 0 12px 12px" }}>
          {hint && (
            <div style={{ display: "flex", gap: 10, padding: "12px 14px", marginBottom: 18,
              background: "#7C3AED12", border: "1px solid #7C3AED30", borderRadius: 8,
              fontSize: 13, color: "#C4B5FD", lineHeight: 1.6 }}>
              <Info size={15} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{hint}</span>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

/* Warning box */
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 10, padding: "12px 14px", margin: "16px 0",
    background: "#F59E0B10", border: "1px solid #F59E0B30", borderRadius: 8,
    fontSize: 13, color: "#FCD34D", lineHeight: 1.65 }}>
    <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} />
    <div>{children}</div>
  </div>
);

/* Code block */
const CodeBlock = ({ children }: { children: string }) => (
  <pre style={{ background: "#0A0818", border: "1px solid #2D2460",
    borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#C4B5FD",
    overflowX: "auto", lineHeight: 1.7, margin: "12px 0", fontFamily: "monospace" }}>
    {children}
  </pre>
);

/* Comparison table */
const CompareTable = () => (
  <div style={{ margin: "20px 0", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: `${C}18` }}>
          {["Merkmal","Unternehmen-ZS","Eigenständige ZS"].map(h => (
            <th key={h} style={{ padding: "9px 14px", textAlign: "left", color: AZ,
              fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em",
              border: `1px solid ${BORDER_C}` }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          ["Active Directory", "Pflicht", "Nicht nötig"],
          ["GPO-Verteilung", "Automatisch", "Manuell"],
          ["Auto-Enrollment", "✓ Ja", "✗ Nein"],
          ["Zertifikatvorlagen", "Vordefiniert (AD)", "Keine"],
          ["Einsatz", "Produktiv (AD-Umgebung)", "Offline Root CA"],
        ].map(([feat, ent, stand], i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#1A1635" : "#1E1A3A" }}>
            <td style={{ padding: "8px 14px", color: "#94A3B8", border: `1px solid ${BORDER_C}26` }}>{feat}</td>
            <td style={{ padding: "8px 14px", color: "#86EFAC", border: `1px solid ${BORDER_C}26` }}>{ent}</td>
            <td style={{ padding: "8px 14px", color: "#94A3B8", border: `1px solid ${BORDER_C}26` }}>{stand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* Lifecycle phases */
const Lifecycle = () => {
  const phases = [
    { label: "Anforderung", desc: "MMC / Auto-Enrollment / Web" },
    { label: "Prüfung", desc: "ZS prüft Identität (AD)" },
    { label: "Ausstellung", desc: "Signatur mit ZS-Schlüssel" },
    { label: "Installation", desc: "Speicher: Benutzer / Computer" },
    { label: "Verwendung", desc: "Auth / Verschlüsselung / Sign." },
    { label: "Erneuerung", desc: "Vor Ablauf (manuell / Auto)" },
    { label: "Sperrung", desc: "CRL-Eintrag / OCSP-Status" },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 0, margin: "20px 0", position: "relative" }}>
      {phases.map((p, i) => (
        <div key={i} style={{ flex: "1 1 120px", minWidth: 100, display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", padding: "12px 6px", position: "relative" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%",
            background: i === 6 ? "#EF444420" : `${C}20`,
            border: `2px solid ${i === 6 ? "#EF4444" : C}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: i === 6 ? "#FCA5A5" : AZ, marginBottom: 8,
            zIndex: 1, position: "relative" }}>
            {i + 1}
          </div>
          {i < phases.length - 1 && (
            <div style={{ position: "absolute", top: 30, left: "calc(50% + 18px)",
              width: "calc(100% - 36px)", height: 2,
              background: `linear-gradient(90deg, ${C}60, ${C}20)` }} />
          )}
          <span style={{ fontSize: 11, fontWeight: 700, color: "#E2E8F0", marginBottom: 3 }}>{p.label}</span>
          <span style={{ fontSize: 10, color: "#64748B" }}>{p.desc}</span>
        </div>
      ))}
    </div>
  );
};

/* Q&A */
const QA = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${BORDER_C}30` }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", padding: "13px 4px", display: "flex", alignItems: "flex-start",
        gap: 12, background: "none", border: "none", cursor: "pointer", textAlign: "left"
      }}>
        <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 5,
          background: open ? `${C}30` : `${C}18`, border: `1px solid ${C}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: AZ, fontWeight: 700, marginTop: 1 }}>
          {open ? "–" : "+"}
        </span>
        <span style={{ fontSize: 13.5, color: open ? "#E2E8F0" : "#B0A8D4", fontWeight: 500, lineHeight: 1.5 }}>
          {q}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 4px 14px 34px", fontSize: 13, color: "#94A3B8", lineHeight: 1.75 }}>
          {a}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */

const ProjektModul5Part2 = () => (
  <Layout>
    <Helmet>
      <title>AD-Zertifikatdienste — PKI & Zertifizierungsstellen — Gökhan Zehirlioglu</title>
      <meta name="description" content="Active Directory Certificate Services: Enterprise CA einrichten, Zertifikate ausstellen, CRL/OCSP konfigurieren." />
    </Helmet>

    {/* ══════════ HERO ══════════ */}
    <header className="relative overflow-hidden text-white" style={{ background: HERO_BG }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(167,139,250,0.08) 0%, transparent 50%)"
      }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="relative z-10 max-w-[820px] mx-auto px-6 py-14">
        <nav className="flex items-center gap-1.5 text-[13px] text-white/60 mb-7 flex-wrap">
          <a href="/windows-projekte" className="hover:text-white transition-colors">Microsoft Enterprise IT</a>
          <span className="opacity-40">&rsaquo;</span>
          <span style={{ color: AZ }} className="font-medium">Modul 5 — Projekt 2</span>
        </nav>

        <div className="flex flex-wrap gap-2 mb-6">
          <span style={{ background: "#7C3AED20", color: AZ, border: "1px solid #7C3AED40" }}
            className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Fertig
          </span>
          <span style={{ background: "#ffffff10", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
            className="text-[11px] px-3 py-1 rounded-full">
            9 Abschnitte · 17 Abbildungen
          </span>
          <span style={{ background: "#ffffff10", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
            className="text-[11px] px-3 py-1 rounded-full">
            15 Wissenscheck-Fragen
          </span>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <div style={{ background: "#7C3AED25", border: "1px solid #7C3AED50",
            borderRadius: 12, padding: "10px 12px", flexShrink: 0 }}>
            <Shield size={28} color={AZ} />
          </div>
          <div>
            <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.15] tracking-tight mb-2">
              Active Directory<br />
              <span style={{ color: AZ }}>Zertifikatdienste</span>
            </h1>
            <p className="text-[1rem] font-light text-white/60 leading-relaxed max-w-[600px]">
              Enterprise PKI mit Windows Server — Stammzertifizierungsstelle einrichten, Zertifikate
              ausstellen und sperren, CRL & OCSP konfigurieren, Vertrauenskette verstehen.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {["PKI","X.509","Enterprise CA","CRL/OCSP","Zertifikatslebenszyklus","Auto-Enrollment","AD CS","CDP & AIA"].map(t => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: "#ffffff08", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>

    {/* ══════════ CONTENT ══════════ */}
    <div style={{ background: CONTENT_BG, color: "#E2E8F0", minHeight: "100vh" }}>
      <div className="max-w-[820px] mx-auto px-6 py-12">

        {/* ── Section marker ── */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: C }}>01 — Theorie</span>
          <div style={{ flex: 1, height: 1, background: `${C}20` }} />
        </div>

        {/* ── 1.1 Asymmetrische Verschlüsselung ── */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 10 }}>
            1.1 Asymmetrische Verschlüsselung
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
            Digitale Kommunikation beruht auf einem einfachen, aber genialen Prinzip: zwei mathematisch
            verknüpfte Schlüssel — ein öffentlicher, der frei verteilt werden darf, und ein privater,
            der niemals das System des Eigentümers verlässt. Was mit dem einen verschlüsselt wird,
            kann nur mit dem anderen entschlüsselt werden.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            {[
              { label: "Verschlüsselung", desc: "Sender verschlüsselt mit dem öffentlichen Schlüssel des Empfängers → nur der Empfänger kann mit seinem privaten Schlüssel entschlüsseln.", color: "#7C3AED" },
              { label: "Digitale Signatur", desc: "Absender verschlüsselt den Hash der Nachricht mit seinem privaten Schlüssel → Empfänger prüft mit dem öffentlichen Schlüssel die Authentizität.", color: "#0EA5E9" },
            ].map(({ label, desc, color }) => (
              <div key={label} style={{ padding: "16px 18px", borderRadius: 10,
                background: `${color}10`, border: `1px solid ${color}30` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color,
                  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
                <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 1.2 X.509 ── */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 10 }}>
            1.2 X.509-Zertifikat — Aufbau
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
            Ein Zertifikat ist ein digitales Dokument, das einen öffentlichen Schlüssel mit einer
            Identität verknüpft. Die digitale Signatur der Zertifizierungsstelle beglaubigt diese
            Verknüpfung. X.509 ist der universelle Standard — eingesetzt in HTTPS, S/MIME, VPN und
            Code Signing.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: `${C}15` }}>
                  {["Feld","Inhalt / Bedeutung"].map(h => (
                    <th key={h} style={{ padding: "9px 14px", textAlign: "left", color: AZ,
                      fontWeight: 700, fontSize: 11, textTransform: "uppercase",
                      letterSpacing: "0.05em", border: `1px solid ${BORDER_C}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Subject (Ausgestellt für)","Identität des Inhabers — z.B. server.gfnlab.test"],
                  ["Issuer (Ausgestellt von)","Name der signierenden Zertifizierungsstelle"],
                  ["Öffentlicher Schlüssel","Zur Verschlüsselung oder Signaturprüfung"],
                  ["Gültigkeitszeitraum","Von/Bis — typisch 1–2 Jahre für Endentitäten"],
                  ["Seriennummer","Eindeutige ZS-Nummer zur Identifikation bei Sperrungen"],
                  ["Thumbprint","SHA-Hash des Zertifikats — Integritätsprüfung"],
                  ["Beabsichtigte Verwendung","Serverauth, E-Mail, Code Signing, EFS …"],
                  ["ZS-Signatur","Digitale Unterschrift der ausstellenden ZS"],
                ].map(([f, v], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#1A1635" : "#1E1A3A" }}>
                    <td style={{ padding: "8px 14px", color: AZ, fontWeight: 600, border: `1px solid ${BORDER_C}26`, whiteSpace: "nowrap" }}>{f}</td>
                    <td style={{ padding: "8px 14px", color: "#94A3B8", border: `1px solid ${BORDER_C}26` }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 1.3 CA-Typen ── */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 10 }}>
            1.3 Zertifizierungsstellen — Typen &amp; Hierarchie
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
            Die Root CA ist die Vertrauensanker der gesamten PKI — sie signiert ihr eigenes Zertifikat
            und wird in professionellen Umgebungen nach der Einrichtung <em>offline</em> gestellt.
            Den laufenden Betrieb übernehmen untergeordnete Issuing CAs.
          </p>
          {/* Hierarchy visual */}
          <div style={{ margin: "20px 0", padding: "20px", background: "#0F0D24",
            border: `1px solid ${BORDER_C}40`, borderRadius: 12 }}>
            {[
              { label: "Stammzertifizierungsstelle (Root CA)", sub: "Selbstsigniert · Offline in Produktion · Langer Gültigkeitszeitraum (10–25 Jahre)", color: "#F59E0B", w: "100%" },
              { label: "Untergeordnete ZS (Issuing CA)", sub: "Von Root CA signiert · Online · Stellt alle Endzertifikate aus", color: "#7C3AED", w: "80%" },
              { label: "Endzertifikat (End Entity)", sub: "Server, Benutzer, Computer — von Issuing CA ausgestellt", color: "#0EA5E9", w: "60%" },
            ].map(({ label, sub, color, w }, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: i < 2 ? 0 : 0 }}>
                {i > 0 && <div style={{ width: 2, height: 20, background: `${color}40` }} />}
                <div style={{ width: w, maxWidth: "100%", padding: "12px 16px", borderRadius: 8,
                  background: `${color}10`, border: `1px solid ${color}35`, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#C4B5FD", marginBottom: 10, marginTop: 22 }}>
            Unternehmens-ZS vs. Eigenständige ZS
          </h3>
          <CompareTable />
        </section>

        {/* ── 1.4 CRL/OCSP ── */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 10 }}>
            1.4 Zertifikatssperrung — CRL, Delta-CRL &amp; OCSP
          </h2>
          <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.8, marginBottom: 16 }}>
            Zertifikate können vor Ablauf ihrer Gültigkeitsdauer gesperrt werden — etwa wenn der
            private Schlüssel kompromittiert wurde. Clients müssen den Sperrstatus prüfen können.
            Dafür gibt es drei Methoden:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "CRL (Certificate Revocation List)", color: "#EF4444",
                desc: "Periodisch veröffentlichte Liste aller gesperrten Zertifikate. Clients laden die gesamte Liste herunter. Problem: Aktualitätslücke zwischen zwei Veröffentlichungen (Standard: wöchentlich)." },
              { name: "Delta-CRL", color: "#F59E0B",
                desc: "Enthält nur die seit der letzten vollständigen CRL neu gesperrten Einträge. Wesentlich kleiner, kann täglich oder stündlich veröffentlicht werden. Clients kombinieren CRL + Delta-CRL." },
              { name: "OCSP (Online Certificate Status Protocol)", color: "#22C55E",
                desc: "Echtzeitprotokoll: Client fragt gezielt nach einem einzelnen Zertifikat und erhält sofort eine signierte Antwort. Keine Wartezeit auf nächste CRL, minimaler Netzwerkverkehr." },
            ].map(({ name, color, desc }) => (
              <div key={name} style={{ display: "flex", gap: 14, padding: "14px 16px",
                background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 10,
                borderLeft: `4px solid ${color}` }}>
                <CheckCircle2 size={16} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 5 }}>{name}</div>
                  <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 1.5 Lifecycle ── */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", marginBottom: 10 }}>
            1.5 Zertifikatslebenszyklus
          </h2>
          <Lifecycle />
        </section>

        {/* ── Section 2 marker ── */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: C }}>02 — Systemkonfiguration</span>
          <div style={{ flex: 1, height: 1, background: `${C}20` }} />
        </div>

        <section style={{ marginBottom: 36 }}>
          <div style={{ padding: "18px 20px", background: CARD_BG,
            border: `1px solid ${BORDER_C}`, borderRadius: 12 }}>
            <Warn>
              In produktiven Umgebungen wird die Zertifizierungsstelle <strong>niemals auf einem
              Domänencontroller</strong> betrieben. Ein kompromittierter DC würde gleichzeitig die
              gesamte PKI gefährden. Im Laborbetrieb ist die Kombination auf Server2 aus Ressourcengründen
              akzeptabel.
            </Warn>
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: `${C}15` }}>
                    {["Hostname","IP","Rolle","Neue Funktion"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: AZ,
                        fontWeight: 700, fontSize: 11, textTransform: "uppercase",
                        letterSpacing: "0.05em", border: `1px solid ${BORDER_C}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["DC (gfnlab.test)","192.168.1.200","Stammdomänencontroller","GPO-Verteilung Stammzertifikat, ADSI-Editor"],
                    ["Server2","192.168.2.100","DC sub.gfnlab.test","Enterprise-Stammzertifizierungsstelle (gfnlab-ROOT-CA)"],
                    ["W11 (Client)","192.168.1.x","Windows 11 Workstation","Zertifikatsspeicher-Prüfung, Benutzer-Zertifikatsanforderung"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#1A1635" : "#1E1A3A" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "8px 12px", border: `1px solid ${BORDER_C}26`,
                          color: j === 0 ? AZ : "#94A3B8", fontWeight: j === 0 ? 600 : 400, fontSize: 13 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Section 3 marker ── */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: C }}>03 — Implementierung</span>
          <div style={{ flex: 1, height: 1, background: `${C}20` }} />
        </div>

        {/* ── 3.1 CA einrichten ── */}
        <Section
          id="s31"
          stepRange="Schritte 1–16"
          title="3.1 Unternehmens-Stammzertifizierungsstelle einrichten"
          hint="Server2 wird als Enterprise-Root-CA konfiguriert. Das Stammzertifikat wird automatisch per GPO an alle Domänencomputer verteilt — kein manueller Import nötig."
        >
          <Step n={1}>Server2: <Cmd>Server-Manager → Dashboard → Rollen und Features hinzufügen</Cmd></Step>
          <Step n={2}>Installationstyp: <Cmd>Rollenbasierte oder featurebasierte Installation</Cmd> → Weiter.</Step>
          <Step n={3}>Zielserver: <Cmd>Server2.Gfnlab.test</Cmd> auswählen → Weiter.</Step>
          <Step n={4}>Serverrolle: <Cmd>Active Directory-Zertifikatdienste</Cmd> auswählen → benötigte Features bestätigen → Weiter.</Step>
          <Step n={5}>Rollendienste auswählen: <Cmd>Zertifizierungsstelle</Cmd> + <Cmd>Online Responder</Cmd> + <Cmd>Zertifizierungsstellen-Webregistrierung</Cmd> → jeweils benötigte Features bestätigen → Weiter.</Step>
          <Step n={6}>Rolle Webserver (IIS): Weiter → Rollendienste: Weiter → <Cmd>Installieren</Cmd>.</Step>
          <Step n={7}>Nach Ende der Installation auf das <strong style={{ color: "#FCD34D" }}>gelbe Fähnchen</strong> im Server-Manager klicken.</Step>
          <Step n={8}><Cmd>Active Directory-Zertifikatdienste auf dem Zielserver einrichten</Cmd> → Anmeldeinformationen: Weiter.</Step>
          <Step n={9}>Rollendienste: Haken NUR bei <Cmd>Zertifizierungsstelle</Cmd> setzen (kurz warten bis aktiv) → Weiter.</Step>
          <Step n={10}>Installationstyp: <Cmd>Unternehmenszertifizierungsstelle</Cmd> → Weiter.</Step>
          <Step n={11}>Zertifizierungsstellentyp: <Cmd>Stammzertifizierungsstelle</Cmd> → Weiter.</Step>
          <Step n={12}>Privater Schlüssel: <Cmd>Neuen privaten Schlüssel erstellen</Cmd> → Weiter.</Step>
          <Step n={13}>Kryptografie: Standardeinstellungen belassen → Weiter.</Step>
          <Step n={14}>Name: Allgemeiner Name: <Cmd>gfnlab-ROOT-CA</Cmd> → Weiter. <strong style={{ color: "#FCA5A5" }}>(Dieser Name kann nach der Konfiguration nicht mehr geändert werden!)</strong></Step>
          <Step n={15}>Gültigkeitsdauer: Weiter → Zertifikatdatenbank: Weiter → <Cmd>Konfigurieren</Cmd>.</Step>
          <Step n={16}>Schließen → Abfrage <em>„Weitere Rollendienste konfigurieren?"</em> → <Cmd>Nein</Cmd>.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig01.png", alt: "Gelbes Fähnchen nach Installation", caption: "Abb. 1: Gelbes Fähnchen zeigt weiteren Konfigurationsbedarf" },
            { src: "/images/microsoft/modul5/projekt2/fig02.png", alt: "Installationstyp Unternehmen", caption: "Abb. 2: Installationstyp ‚Unternehmenszertifizierungsstelle'" },
          ]} />
          <Figure
            src="/images/microsoft/modul5/projekt2/fig03.png"
            alt="ZS-Name gfnlab-ROOT-CA"
            caption="Abb. 3: ZS-Name ‚gfnlab-ROOT-CA' — nach Konfiguration unveränderlich"
          />
        </Section>

        {/* ── 3.2 Zertifikatsspeicher ── */}
        <Section
          id="s32"
          stepRange="Schritte 17–30"
          title="3.2 Zertifikatsspeicher prüfen und Stammzertifikat verteilen"
          hint="Nach der ZS-Einrichtung verteilt Active Directory das Stammzertifikat automatisch per GPO. Auf W11 prüfen, ob es im richtigen Speicher eingetragen ist."
        >
          <Step n={17}>W11 neu starten, damit das ZS-Zertifikat per Gruppenrichtlinie gepullt wird.</Step>
          <Step n={18}>Als <Cmd>gfnlab\administrator</Cmd> anmelden.</Step>
          <Step n={19}><Cmd>Start → MMC</Cmd> eingeben → MMC ausführen.</Step>
          <Step n={20}><Cmd>Datei → Snap-In hinzufügen/entfernen → Zertifikate → Computerkonto → Weiter → OK</Cmd>.</Step>
          <Step n={21}>Erweitern: <Cmd>Zertifikate (Lokaler Computer) → Vertrauenswürdige Stammzertifizierungsstellen → Zertifikate</Cmd>.</Step>
          <Step n={22}><strong style={{ color: "#86EFAC" }}>Überprüfen:</strong> <Cmd>gfnlab-ROOT-CA</Cmd> muss in der Liste erscheinen.</Step>
          <Step n={23}>Falls nicht vorhanden: Eingabeaufforderung (Admin) → <Cmd>gpupdate /force</Cmd> → MMC aktualisieren.</Step>
          <div style={{ height: 12 }} />
          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, marginBottom: 8 }}>
            ADSI-Editor — Stammzertifikat in Active Directory betrachten (auf DC)
          </p>
          <Step n={24}>Gruppenrichtlinienverwaltung öffnen → Rechtsklick auf <Cmd>Default Domain Policy</Cmd> → Bearbeiten.</Step>
          <Step n={25}>Navigieren: <Cmd>Computerkonfiguration → Richtlinien → Windows-Einstellungen → Sicherheitseinstellungen → Richtlinien für öffentliche Schlüssel → Vertrauenswürdige Stammzertifizierungsstellen</Cmd>.</Step>
          <Step n={26}>Gruppenrichtlinienverwaltung schließen.</Step>
          <Step n={27}>ADSI-Editor öffnen → Rechtsklick → <Cmd>Verbindung herstellen</Cmd>.</Step>
          <Step n={28}>Bekannten Namenskontext auswählen → <Cmd>Konfiguration → Standard → OK</Cmd>.</Step>
          <Step n={29}>Navigieren: <Cmd>CN=Configuration → CN=Services → CN=Public Key Services → CN=Certification Authorities</Cmd>.</Step>
          <Step n={30}>Das Zertifikat von <Cmd>gfnlab-ROOT-CA</Cmd> ist hier als Objekt sichtbar — so wird es per LDAP an alle Domänencomputer repliziert.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig04.png", alt: "Zertifikatsspeicher W11", caption: "Abb. 4: gfnlab-ROOT-CA in ‚Vertrauenswürdige Stammzertifizierungsstellen'" },
            { src: "/images/microsoft/modul5/projekt2/fig05.png", alt: "ADSI-Editor", caption: "Abb. 5: ADSI-Editor — Stammzertifikat im AD-Konfigurationscontainer" },
          ]} />
        </Section>

        {/* ── 3.3 Export ── */}
        <Section
          id="s33"
          stepRange="Schritte 31–44"
          title="3.3 Stammzertifikat exportieren und manuell übertragen"
          hint="Für Geräte ohne Domänenmitgliedschaft muss das Stammzertifikat manuell exportiert und importiert werden. DER-Format (.cer) ist der Standard für X.509-Einzelzertifikate."
        >
          <Step n={31}>Server2: <Cmd>Server-Manager → Tools → Zertifizierungsstelle</Cmd>.</Step>
          <Step n={32}>Linke Seite: Rechtsklick auf <Cmd>Gfnlab-ROOT-CA → Eigenschaften → Registerkarte ‚Allgemein'</Cmd>.</Step>
          <Step n={33}><Cmd>Zertifikat anzeigen → Details → In Datei kopieren</Cmd>.</Step>
          <Step n={34}>Zertifikatexport-Assistent: <Cmd>DER-codiert-binär X.509 (.CER)</Cmd> → Weiter.</Step>
          <Step n={35}>Speicherort: Neuen Ordner <Cmd>C:\cert</Cmd> erstellen, Datei als <Cmd>gfnlab-root-ca.cer</Cmd> speichern → Fertigstellen.</Step>
          <Step n={36}>PowerShell auf W11 — Ordner von Server2 nach W11 kopieren:</Step>
          <CodeBlock>{`# Quelldatei auf Server2, Ziel auf W11
$source = "\\\\Server2\\c$\\cert"
$destination = "c:\\cert\\"
Copy-Item -Path $source -Destination $destination -Recurse
Get-ChildItem -Path "C:\\cert\\" -Depth 1`}</CodeBlock>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, margin: "16px 0 8px" }}>
            Alternative A — certutil in Active Directory veröffentlichen
          </p>
          <Step n={37}>Server2: Eingabeaufforderung als Administrator öffnen.</Step>
          <Step n={38}>Befehl ausführen:</Step>
          <CodeBlock>{`certutil -dspublish -f c:\\cert\\gfnlab-root-ca.cer RootCA`}</CodeBlock>
          <Step n={39}>Meldung <em>„Zertifikat befindet sich bereits im Verzeichnisdienstspeicher"</em> ist normal.</Step>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, margin: "16px 0 8px" }}>
            Alternative B — Manueller Import auf W11
          </p>
          <Step n={40}>W11: MMC öffnen → Snap-In <Cmd>Zertifikate</Cmd> für <Cmd>Eigenes Benutzerkonto</Cmd> hinzufügen.</Step>
          <Step n={41}>Unter <Cmd>Vertrauenswürdige Stammzertifizierungsstellen → Zertifikate</Cmd>: Rechtsklick → Alle Aufgaben → Importieren.</Step>
          <Step n={42}>Datei <Cmd>C:\cert\gfnlab-root-ca.cer</Cmd> auswählen → Weiter → Fertigstellen.</Step>
          <Step n={43}>Warnmeldung mit <Cmd>Ja</Cmd> bestätigen.</Step>
          <Step n={44}><Cmd>gfnlab-ROOT-CA</Cmd> muss nun in der Liste erscheinen.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig06.png", alt: "Zertifikatexport DER-Format", caption: "Abb. 6: Zertifikatexport — DER-Format auswählen" },
            { src: "/images/microsoft/modul5/projekt2/fig07.png", alt: "Zielordner C:\\cert", caption: "Abb. 7: Zielordner C:\\cert für das exportierte Stammzertifikat" },
          ]} />
        </Section>

        {/* ── 3.4 Benutzerzertifikat ── */}
        <Section
          id="s34"
          stepRange="Schritte 45–55"
          title="3.4 Benutzerzertifikat anfordern (MMC)"
          hint="Endbenutzer können Zertifikate direkt über die MMC anfordern. Die Vorlage ‚Benutzer' deckt E-Mail-Schutz, Authentifizierung und EFS ab."
        >
          <Step n={45}>W11: Als <Cmd>Karl Klammer</Cmd> (<Cmd>gfnlab\kk</Cmd>) anmelden.</Step>
          <Step n={46}>Eingabeaufforderung öffnen → <Cmd>gpupdate /force</Cmd> ausführen.</Step>
          <Step n={47}><Cmd>Start → MMC</Cmd> ausführen.</Step>
          <Step n={48}><Cmd>Datei → Snap-In hinzufügen/entfernen → Zertifikate → OK</Cmd> (Benutzerkonto).</Step>
          <Step n={49}>Erweitern: <Cmd>Zertifikate - Aktueller Benutzer → Eigene Zertifikate</Cmd>.</Step>
          <Step n={50}>Rechtsklick → Alle Aufgaben → <Cmd>Neues Zertifikat anfordern</Cmd>.</Step>
          <Step n={51}>Zertifikatregistrierungsassistent: Vorbereitung → Weiter.</Step>
          <Step n={52}>Zertifikatregistrierungsrichtlinie auswählen: Weiter.</Step>
          <Step n={53}>Zertifikate anfordern: <Cmd>Benutzer</Cmd> ankreuzen → <Cmd>Registrieren</Cmd>.</Step>
          <Step n={54}>Zertifikatinstallationsergebnisse: Fertigstellen.</Step>
          <Step n={55}>Doppelklick auf das neue Zertifikat → Inhalt betrachten (Ausgestellt von, Gültigkeitsdatum, Beabsichtigte Verwendung).</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig08.png", alt: "Vorlage Benutzer auswählen", caption: "Abb. 8: Vorlage ‚Benutzer' auswählen und registrieren" },
            { src: "/images/microsoft/modul5/projekt2/fig09.png", alt: "Ausgestelltes Benutzerzertifikat", caption: "Abb. 9: Ausgestelltes Benutzerzertifikat in der MMC-Konsole" },
          ]} />
        </Section>

        {/* ── 3.5 Webregistrierung ── */}
        <Section
          id="s35"
          stepRange="Schritte 56–63"
          title="3.5 Zertifizierungsstellen-Webregistrierung konfigurieren"
          hint="Veralteter Rollendienst (Windows 2000-Ära). Unterstützt keine Zertifikatvorlagen ab Version 3. Für neue Implementierungen: Zertifikatregistrierungs-Webdienst oder PSCertificateEnrollment (PowerShell) verwenden."
        >
          <Warn>
            Die ZS-Webregistrierung ist das älteste Web-Interface für Zertifikatsanforderungen —
            letztes Update mit Windows Server 2003. Sie unterstützt <strong>keine</strong> modernen
            Vorlagen (Version 3+) und ist für neue Projekte nicht empfohlen.
          </Warn>
          <Step n={56}>Server2: <strong style={{ color: "#FCD34D" }}>Gelbes Fähnchen</strong> im Server-Manager klicken.</Step>
          <Step n={57}><Cmd>Active Directory-Zertifikatdienste auf dem Zielserver konfigurieren</Cmd>.</Step>
          <Step n={58}>Anmeldeinformationen: Weiter → Rollendienste: <Cmd>Zertifizierungsstellen-Webregistrierung</Cmd> → Weiter → Konfigurieren → Schließen.</Step>
          <Step n={59}>W11: Browser Edge öffnen → <Cmd>http://Server2/certsrv</Cmd> aufrufen.</Step>
          <Step n={60}>Seite <em>„Willkommen bei der Microsoft Active Directory-Zertifikatdienste"</em> muss erscheinen.</Step>
          <Step n={61}><Cmd>Ein Zertifikat anfordern</Cmd> → Beurteilung: Nur <Cmd>Benutzerzertifikat</Cmd> verfügbar (moderne Vorlagen nicht sichtbar).</Step>
          <Step n={62}>Zum Testen: <Cmd>Erweiterte Zertifikatanforderung</Cmd> → Vorlage <Cmd>Benutzer</Cmd> → Einsenden → diverse Fehlermeldungen sind zu erwarten.</Step>
          <Step n={63}>Browser schließen.</Step>

          <Figure
            src="/images/microsoft/modul5/projekt2/fig10.png"
            alt="Webregistrierungsseite"
            caption="Abb. 10: http://Server2/certsrv — eingeschränkte Vorlagenauswahl (nur Version 2)"
          />
        </Section>

        {/* ── 3.6 Sperren ── */}
        <Section
          id="s36"
          stepRange="Schritte 64–73"
          title="3.6 Zertifikat sperren und Sperrliste veröffentlichen"
          hint="Ein gesperrtes Zertifikat erscheint in der CRL erst, nachdem eine neue Sperrliste manuell veröffentlicht wurde. Das Zeitfenster zwischen Sperrung und Veröffentlichung ist das bekannte CRL-Problem."
        >
          <Step n={64}>Server2: <Cmd>Server-Manager → Tools → Zertifizierungsstelle</Cmd>.</Step>
          <Step n={65}>Linke Seite: <Cmd>GFNLAB-ROOT-CA → Ausgestellte Zertifikate</Cmd> öffnen.</Step>
          <Step n={66}>Zertifikat von <Cmd>KK</Cmd> (Karl Klammer) mit Rechtsklick → Alle Aufgaben → <Cmd>Zertifikat sperren</Cmd>.</Step>
          <Step n={67}>Sperrgrund: <Cmd>Zertifikat blockiert</Cmd> → Bestätigen: Ja.</Step>
          <Step n={68}><Cmd>Gesperrte Zertifikate</Cmd> anklicken → Rechtsklick → Eigenschaften → Standard-Veröffentlichungsintervalle betrachten.</Step>
          <Step n={69}>Registerkarte <Cmd>Zertifikatssperrliste anzeigen</Cmd> → <Cmd>Sperrliste anzeigen</Cmd>: Die Liste ist noch leer, obwohl ein gesperrtes Zertifikat vorhanden ist <strong style={{ color: "#FCA5A5" }}>(CRL noch nicht aktualisiert!)</strong>.</Step>
          <Step n={70}>Zurück: Rechtsklick auf <Cmd>Gesperrte Zertifikate</Cmd> → Alle Aufgaben → <Cmd>Veröffentlichen → Neue Sperrliste → OK</Cmd>.</Step>
          <Step n={71}>Sperrliste erneut anzeigen: Das gesperrte Zertifikat <strong style={{ color: "#86EFAC" }}>muss jetzt erscheinen</strong>.</Step>
          <Step n={72}>Sperrung aufheben (zum Test): Gesperrtes Zertifikat → Rechtsklick → Alle Aufgaben → <Cmd>Sperrung des Zertifikats aufheben → OK</Cmd>.</Step>
          <Step n={73}>In <Cmd>Ausgestellte Zertifikate</Cmd> prüfen: Zertifikat ist wieder aktiv. Hinweis: Für sofortige Wirkung wäre eine Delta-Sperrliste nötig.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig11.png", alt: "Zertifikat sperren", caption: "Abb. 11: Zertifikat sperren — Sperrgrund auswählen" },
            { src: "/images/microsoft/modul5/projekt2/fig12.png", alt: "Sperrliste veröffentlichen", caption: "Abb. 12: Neue CRL veröffentlichen" },
          ]} />
        </Section>

        {/* ── 3.7 OCSP ── */}
        <Section
          id="s37"
          stepRange="Schritte 74–79"
          title="3.7 Online-Responder aktivieren (OCSP)"
          hint="Der Online-Responder wurde mit installiert, muss aber separat konfiguriert werden. Nach der Aktivierung können Clients Sperrstatus-Anfragen in Echtzeit stellen."
        >
          <Step n={74}>Server2: <strong style={{ color: "#FCD34D" }}>Gelbes Fähnchen</strong> im Server-Manager klicken.</Step>
          <Step n={75}><Cmd>Active Directory-Zertifikatdienste auf dem Zielserver konfigurieren</Cmd>.</Step>
          <Step n={76}>Anmeldeinformationen: Weiter → Rollendienste: <Cmd>Online-Responder</Cmd> → Weiter → Konfigurieren.</Step>
          <Step n={77}>Unter Ergebnisse: Link <em>„Weitere Informationen zur OCSP-Konfiguration"</em> notieren.</Step>
          <Step n={78}>Ergebnisse: Schließen.</Step>
          <Step n={79}>Der OCSP-Dienst ist nun aktiv. Für vollständige Konfiguration (Sperrkonfiguration, OCSP-Zertifikat) siehe optionale Abschnitte 3.8 und 3.9.</Step>

          <Figure
            src="/images/microsoft/modul5/projekt2/fig13.png"
            alt="Online-Responder Konfiguration"
            caption="Abb. 13: Online-Responder-Rollendienst aktivieren"
          />
        </Section>

        {/* ── 3.8 Optional OCSP ── */}
        <Section
          id="s38"
          stepRange="Schritte 80–92"
          title="3.8 [Optional] Online-Responder vollständig konfigurieren"
          background="#1A1030"
        >
          <div style={{ display: "flex", gap: 10, padding: "10px 14px", marginBottom: 16,
            background: "#7C3AED15", border: "1px solid #7C3AED30", borderRadius: 8,
            fontSize: 12, color: "#C4B5FD" }}>
            <Lock size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Optionaler Abschnitt — beschreibt die vollständige OCSP-Konfiguration: Vorlage einrichten,
            OCSP-Antwortsignatur-Zertifikat ausstellen und Sperrkonfiguration anlegen.</span>
          </div>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, marginBottom: 8 }}>
            OCSP-Zertifikatvorlage für Server2 berechtigen
          </p>
          <Step n={80}>Zertifizierungsstellen-Konsole: <Cmd>gfnlab-Root-CA → Zertifikatsvorlagen → Rechtsklick → Verwalten</Cmd>.</Step>
          <Step n={81}>Vorlage <Cmd>OCSP-Antwortsignatur</Cmd> → Rechtsklick → Eigenschaften → Registerkarte <Cmd>Sicherheit</Cmd>.</Step>
          <Step n={82}>Hinzufügen → Objekttypen: Haken bei <Cmd>Computer</Cmd> → <Cmd>Server2</Cmd> eingeben → Namen überprüfen → OK.</Step>
          <Step n={83}>Berechtigung <Cmd>Registrieren</Cmd> auf <Cmd>Zulassen</Cmd> setzen → OK → Zertifikatsvorlagenkonsole schließen.</Step>
          <Step n={84}>Rechtsklick auf <Cmd>Zertifikatsvorlagen → Neu → Auszustellende Zertifikatsvorlage → OCSP-Antwortsignatur → OK</Cmd>.</Step>
          <Step n={85}>Server2: MMC öffnen → <Cmd>Zertifikate (Lokaler Computer) → Eigene Zertifikate</Cmd> → Rechtsklick → Alle Aufgaben → <Cmd>Neues Zertifikat anfordern</Cmd>.</Step>
          <Step n={86}>Zertifikat <Cmd>OCSP-Antwortsignatur</Cmd> wählen → Registrieren → Fertigstellen.</Step>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, margin: "16px 0 8px" }}>
            Sperrkonfiguration erstellen
          </p>
          <Step n={87}><Cmd>Server-Manager → Tools → Online-Responderverwaltung</Cmd> öffnen.</Step>
          <Step n={88}>Rechtsklick auf <Cmd>Sperrkonfiguration → Sperrkonfiguration hinzufügen → Weiter</Cmd>.</Step>
          <Step n={89}>Name: <Cmd>Sperr1</Cmd> → Weiter.</Step>
          <Step n={90}>Radiobutton: <Cmd>Zertifikat für eine vorhandene Unternehmenszertifizierungsstelle auswählen</Cmd> → Weiter.</Step>
          <Step n={91}>Radiobutton: <Cmd>In Active Directory veröffentlichte Zertifizierungsstellenzertifikate suchen</Cmd> → Durchsuchen → <Cmd>GFNLAB-ROOT-CA</Cmd> wählen → OK → Weiter → Weiter → Fertigstellen.</Step>
          <Step n={92}>Online-Responderverwaltungs-Tool schließen.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig14.png", alt: "OCSP-Vorlage Berechtigung", caption: "Abb. 14: OCSP-Antwortsignatur-Vorlage — Computerberechtigung hinzufügen" },
            { src: "/images/microsoft/modul5/projekt2/fig15.png", alt: "OCSP-Zertifikat", caption: "Abb. 15: OCSP-Zertifikat in den eigenen Zertifikaten von Server2" },
          ]} />
        </Section>

        {/* ── 3.9 Optional CDP/AIA ── */}
        <Section
          id="s39"
          stepRange="Schritte 93–105"
          title="3.9 [Optional] CDP und AIA konfigurieren"
          background="#1A1030"
        >
          <div style={{ display: "flex", gap: 10, padding: "10px 14px", marginBottom: 16,
            background: "#7C3AED15", border: "1px solid #7C3AED30", borderRadius: 8,
            fontSize: 12, color: "#C4B5FD" }}>
            <Lock size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Optionaler Abschnitt — erweiterte Konfiguration: Sperrlisten-Verteilungspunkt (CDP),
            Zugriff auf Stelleninformationen (AIA) und anschließende Überprüfung.</span>
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, marginBottom: 14 }}>
            CDP und AIA sind Erweiterungen, die in jedes ausgestellte Zertifikat eingebettet werden.
            Sie teilen dem Client mit, wo er die Sperrliste (CDP) bzw. den OCSP-Dienst (AIA) findet.
            Ohne diese Angaben können Clients den Sperrstatus nicht prüfen.
          </p>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, marginBottom: 8 }}>CDP konfigurieren</p>
          <Step n={93}>Server2: <Cmd>Zertifizierungsstellen-Konsole → Rechtsklick auf ‚GFNLAB-ROOT-CA' → Eigenschaften → Registerkarte ‚Erweiterungen'</Cmd>.</Step>
          <Step n={94}>Erweiterung: <Cmd>Sperrlisten-Verteilungspunkt (CDP)</Cmd> auswählen.</Step>
          <Step n={95}>Hinzufügen → folgenden URL einfügen:</Step>
          <CodeBlock>{`http://server2.gfnlab.test/certenroll/<CaName><CRLNameSuffix><DeltaCRLAllowed>.crl`}</CodeBlock>
          <Step n={96}>Haken setzen bei: <Cmd>In Sperrlisten einbeziehen</Cmd> + <Cmd>In CDP-Erweiterung des ausgestellten Zertifikats einbeziehen</Cmd>.</Step>
          <Step n={97}><Cmd>Übernehmen</Cmd> → Dienst <strong style={{ color: "#FCA5A5" }}>NICHT</strong> neu starten.</Step>

          <p style={{ fontSize: 13, color: "#7C6FAA", fontWeight: 600, margin: "16px 0 8px" }}>AIA (OCSP-URL) konfigurieren</p>
          <Step n={98}>Erweiterung: <Cmd>Zugriff auf Stelleninformationen (AIA)</Cmd> auswählen → Hinzufügen.</Step>
          <Step n={99}>Folgenden URL einfügen:</Step>
          <CodeBlock>{`http://server2.gfnlab.test/ocsp`}</CodeBlock>
          <Step n={100}>Haken setzen bei: <Cmd>In Online Certificate Status-Protokoll (OCSP)-Erweiterungen einbeziehen</Cmd> + <Cmd>In AIA-Erweiterungen des ausgestellten Zertifikats einbeziehen</Cmd>.</Step>
          <Step n={101}><Cmd>OK</Cmd> → Dienst neu starten.</Step>
          <Step n={102}>Überprüfung: Neues Benutzerzertifikat anfordern → Zertifikat öffnen → Registerkarte <Cmd>Details</Cmd>.</Step>
          <Step n={103}>Im Feld <Cmd>Sperrlisten-Verteilungspunkte</Cmd> muss der neue CDP-URL erscheinen.</Step>
          <Step n={104}>Im Feld <Cmd>Zugriff auf Stelleninformationen</Cmd> muss der OCSP-URL erscheinen.</Step>
          <Step n={105}>CRL-Download testen: Edge öffnen → URL <Cmd>http://server2.gfnlab.test/CertEnroll/gfnlab-ROOT-CA.crl</Cmd> → Datei öffnen.</Step>

          <FigureRow figs={[
            { src: "/images/microsoft/modul5/projekt2/fig16.png", alt: "CDP und AIA im Zertifikat", caption: "Abb. 16: Zertifikat-Details — CDP- und AIA-Einträge korrekt hinterlegt" },
            { src: "/images/microsoft/modul5/projekt2/fig17.png", alt: "CRL im Browser", caption: "Abb. 17: CRL-Inhalt im Browser — Sperrliste erfolgreich abgerufen" },
          ]} />
        </Section>

        {/* ── Summary ── */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: C }}>04 — Zusammenfassung</span>
          <div style={{ flex: 1, height: 1, background: `${C}20` }} />
        </div>

        <div style={{ marginBottom: 40, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: `${C}15` }}>
                {["Abschnitt","Element","Zweck","Methode"].map(h => (
                  <th key={h} style={{ padding: "9px 12px", textAlign: "left", color: AZ,
                    fontWeight: 700, fontSize: 11, textTransform: "uppercase",
                    letterSpacing: "0.05em", border: `1px solid ${BORDER_C}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["3.1","Unternehmens-Stammzertifizierungsstelle","PKI-Kernkomponente — stellt alle Zertifikate aus","AD CS Rolle, Typ: Unternehmen/Stamm"],
                ["3.2","Zertifikatsspeicher prüfen","Sicherstellen, dass Clients der ZS vertrauen","GPO-Verteilung + MMC + ADSI-Editor"],
                ["3.3","Stammzertifikat exportieren","Manueller Import auf Nicht-Domänengeräte","DER-Export + PowerShell + MMC-Import"],
                ["3.4","Benutzerzertifikat anfordern","Endbenutzer erhält Zertifikat für Auth/EFS","MMC + Zertifikatregistrierungsassistent"],
                ["3.5","Webregistrierung konfigurieren","Alternatives Web-Interface (veraltet)","IIS + ZS-Webregistrierungs-Rollendienst"],
                ["3.6","Zertifikat sperren + CRL","Kompromittierte Zertifikate ungültig machen","ZS-Konsole + manuelle CRL-Veröffentlichung"],
                ["3.7","Online-Responder aktivieren","Echtzeitprüfung des Sperrstatus (OCSP)","Rollendienst Online-Responder"],
                ["3.8 opt.","OCSP vollständig konfigurieren","OCSP produktionsbereit machen","OCSP-Vorlage + Sperrkonfiguration"],
                ["3.9 opt.","CDP und AIA konfigurieren","Clients zu CRL und OCSP leiten","Erweiterungen in ZS-Eigenschaften"],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#1A1635" : "#1E1A3A" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "8px 12px", border: `1px solid ${BORDER_C}26`,
                      color: j === 0 ? AZ : j === 1 ? "#E2E8F0" : "#94A3B8",
                      fontWeight: j <= 1 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Wissenscheck ── */}
        <div className="flex items-center gap-3 mb-8">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: C }}>05 — Wissenscheck</span>
          <div style={{ flex: 1, height: 1, background: `${C}20` }} />
        </div>

        <div style={{ marginBottom: 48, padding: "8px 4px",
          background: CARD_BG, border: `1px solid ${BORDER_C}`, borderRadius: 12 }}>
          <div style={{ padding: "14px 18px 8px", marginBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
              15 Fragen zur Selbstkontrolle und Prüfungsvorbereitung. Klicken zum Aufklappen.
            </p>
          </div>
          <div style={{ padding: "0 16px" }}>
            {[
              { q: "Frage 1: Was ist asymmetrische Verschlüsselung und worin besteht der Unterschied zur symmetrischen?", a: "Bei symmetrischer Verschlüsselung verwenden Sender und Empfänger denselben Schlüssel — er muss sicher übertragen werden, was ein Grundproblem darstellt. Bei asymmetrischer Verschlüsselung gibt es ein Schlüsselpaar: öffentlicher Schlüssel (frei verteilt) und privater Schlüssel (geheim). Was mit dem öffentlichen Schlüssel verschlüsselt wird, kann nur mit dem privaten entschlüsselt werden — und umgekehrt. Der öffentliche Schlüssel muss nie geheim übertragen werden." },
              { q: "Frage 2: Welche zwei Anwendungsfälle hat die asymmetrische Verschlüsselung in der PKI?", a: "1. Verschlüsselung: Der Sender verschlüsselt mit dem öffentlichen Schlüssel des Empfängers — nur der Empfänger kann mit seinem privaten Schlüssel entschlüsseln. 2. Digitale Signatur: Der Absender erstellt einen Hash der Nachricht und verschlüsselt ihn mit seinem privaten Schlüssel. Der Empfänger entschlüsselt die Signatur mit dem öffentlichen Schlüssel und prüft, ob der Hash übereinstimmt — so wird die Authentizität bewiesen." },
              { q: "Frage 3: Was ist ein X.509-Zertifikat und welche wesentlichen Informationen enthält es?", a: "X.509 ist der Standard für digitale Zertifikate, verwendet in HTTPS, S/MIME, VPN und Code Signing. Ein Zertifikat enthält: Identität des Inhabers (Subject), öffentlicher Schlüssel, Name der ausstellenden ZS (Issuer), Gültigkeitszeitraum, Seriennummer, Fingerabdruck (Thumbprint), beabsichtigte Verwendung und digitale Signatur der ausstellenden ZS." },
              { q: "Frage 4: Was ist eine Zertifizierungsstelle (CA) und welche Hauptaufgabe hat sie?", a: "Eine ZS ist die vertrauenswürdige Instanz, die öffentliche Schlüssel mit Identitäten verknüpft, indem sie Zertifikate ausstellt und mit ihrer Signatur beglaubigt. Clients, die dem Stammzertifikat der ZS vertrauen, vertrauen automatisch allen von ihr ausgestellten Zertifikaten. Die ZS verwaltet und sperrt zudem ausgestellte Zertifikate." },
              { q: "Frage 5: Was ist der Unterschied zwischen einer Stamm-ZS und einer untergeordneten ZS?", a: "Die Stammzertifizierungsstelle (Root CA) ist die Wurzel der PKI-Hierarchie — sie signiert ihr Zertifikat selbst und wird nach der Einrichtung offline gestellt (Offline Root CA). Die untergeordnete ZS erhält ihre Vertrauenswürdigkeit von der Root CA und übernimmt den laufenden Betrieb. Bei Kompromittierung kann sie widerrufen werden, ohne die Root CA zu gefährden." },
              { q: "Frage 6: Was ist der Unterschied zwischen Unternehmens-ZS und eigenständiger ZS?", a: "Die Unternehmens-ZS erfordert Active Directory. Sie verteilt das Stammzertifikat automatisch per GPO und unterstützt Auto-Enrollment über AD-Zertifikatvorlagen. Die eigenständige ZS benötigt kein AD, kennt keine Vorlagen, erfordert manuelle Genehmigung und eignet sich als Offline Root CA oder für nicht-domänengekoppelte Geräte." },
              { q: "Frage 7: Wie wird das Stammzertifikat einer Unternehmens-ZS automatisch verteilt?", a: "Über Gruppenrichtlinien (GPO). Active Directory speichert das Stammzertifikat der Unternehmens-ZS im LDAP-Verzeichnis unter CN=Certification Authorities. Beim nächsten GPO-Abgleich (gpupdate oder Start/Anmeldung) laden alle Domänencomputer das Zertifikat und legen es unter 'Vertrauenswürdige Stammzertifizierungsstellen' ab." },
              { q: "Frage 8: Was ist eine Zertifikatssperrliste (CRL) und welches Problem hat sie?", a: "Eine CRL ist eine periodisch veröffentlichte Liste aller gesperrten Zertifikate (identifiziert durch Seriennummern). Das grundlegende Problem: Zwischen zwei Veröffentlichungen kann ein gesperrtes Zertifikat noch als gültig akzeptiert werden (Aktualitätslücke). Bei großen PKIs kann die CRL zudem sehr groß werden." },
              { q: "Frage 9: Was ist eine Delta-Sperrliste und wie löst sie das CRL-Problem teilweise?", a: "Eine Delta-CRL enthält ausschließlich die seit der letzten vollständigen CRL neu gesperrten Einträge. Sie ist wesentlich kleiner und kann häufiger veröffentlicht werden (täglich/stündlich). Clients kombinieren die vollständige CRL mit der aktuellen Delta-CRL. Das reduziert die Aktualitätslücke, löst aber das Grundproblem der periodischen Veröffentlichung nicht vollständig." },
              { q: "Frage 10: Was ist OCSP und welche Vorteile hat es gegenüber der CRL?", a: "OCSP (Online Certificate Status Protocol) ermöglicht Echtzeitprüfung des Sperrstatus. Der Client fragt gezielt: 'Ist Zertifikat X noch gültig?' und erhält sofort eine signierte Antwort. Vorteile: Echtzeitinformation, geringer Netzwerkverkehr (nur eine kleine Anfrage statt gesamter Liste), datenschutzfreundlicher (nur ein spezifisches Zertifikat wird abgefragt)." },
              { q: "Frage 11: Was sind CDP und AIA und wo werden sie gespeichert?", a: "CDP (CRL Distribution Point) ist die URL, unter der Clients die Sperrliste herunterladen können. AIA (Authority Information Access) enthält die URL des OCSP-Dienstes. Beide werden als Erweiterungen direkt in jedes ausgestellte Zertifikat eingebettet. Clients können anhand dieser Einträge automatisch den Sperrstatus prüfen." },
              { q: "Frage 12: Warum wird die Root CA in professionellen Umgebungen offline gestellt?", a: "Der private Schlüssel der Root CA ist das wertvollste Schlüsselmaterial der PKI. Bei Kompromittierung müsste die gesamte PKI neu aufgebaut werden. Durch Offline-Stellen (kein Netzwerkzugang) wird dieser Schlüssel maximal geschützt. Die untergeordneten ZS übernehmen den laufenden Betrieb; ihre Kompromittierung hat begrenzte Auswirkungen." },
              { q: "Frage 13: Welche Rollendienste werden in dieser Übung installiert und was leisten sie?", a: "Drei Rollendienste: 1. Zertifizierungsstelle — Kernkomponente, stellt Zertifikate aus. 2. Online-Responder — beantwortet OCSP-Anfragen in Echtzeit. 3. ZS-Webregistrierung — veraltetes Web-Interface zur Zertifikatsbeantragung (nur HTTP, keine Version-3-Vorlagen, nicht empfohlen)." },
              { q: "Frage 14: Was passiert direkt nach der Sperrung eines Zertifikats?", a: "Das Zertifikat wird in der internen Datenbank der ZS als gesperrt markiert, aber die aktuelle CRL enthält es noch nicht. Clients mit einer älteren CRL würden das Zertifikat weiterhin als gültig akzeptieren. Erst nach manueller Veröffentlichung einer neuen CRL steht die aktualisierte Information bereit." },
              { q: "Frage 15: Warum sollte die ZS-Webregistrierung nicht mehr eingesetzt werden?", a: "Die ZS-Webregistrierung wurde zuletzt mit Windows Server 2003 aktualisiert. Sie unterstützt keine Vorlagen der Version 3+, was alle modernen Vorlagen (Smart-Card, OCSP, erweitertes EFS) ausschließt. Der Code ist veraltet und potenziell unsicher. Empfohlene Alternativen: Zertifikatregistrierungs-Webdienst oder PSCertificateEnrollment (PowerShell)." },
            ].map(({ q, a }, i) => <QA key={i} q={q} a={a} />)}
          </div>
        </div>

        {/* ── Back ── */}
        <div style={{ paddingTop: 24, borderTop: `1px solid ${BORDER_C}30` }}>
          <a href="/windows-projekte" style={{ fontSize: 13, color: "#64748B",
            textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E2E8F0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}>
            ← Microsoft Enterprise IT Übersicht
          </a>
        </div>

      </div>
    </div>
  </Layout>
);

export default ProjektModul5Part2;
