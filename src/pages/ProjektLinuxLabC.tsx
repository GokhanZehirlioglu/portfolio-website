import React from "react";
import Layout from "@/components/Layout";
import {
    Terminal,
    Shield,
    Users,
    Server,
    Download,
    ChevronRight,
    Play,
    Info,
    CheckCircle2,
    Cpu,
    Monitor,
    FileCode,
    List,
    Archive,
    FileArchive
} from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * DocSection Component
 * Wrapper for documentation sections with consistent styling
 */
const DocSection: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
    <div id={id} className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-orange-500 rounded-full" />
            {title}
        </h2>
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            {children}
        </div>
    </div>
);

/**
 * CommandBlock Component
 * Displays code with explanation
 */
const CommandBlock: React.FC<{ title?: string; command: string; explanation?: string; output?: string }> = ({ title, command, explanation, output }) => (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#1e1e1e] shadow-xl">
        {title && (
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">{title}</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
            </div>
        )}
        <div className="p-5 font-mono text-sm md:text-base cursor-text selection:bg-orange-500/30">
            <div className="text-emerald-400 whitespace-pre-wrap">{command}</div>
        </div>

        {output && (
            <div className="bg-black/40 p-4 border-t border-slate-700/30 font-mono text-sm text-slate-400">
                <div className="text-xs uppercase text-slate-500 mb-2 font-bold tracking-wider">// OUTPUT / VERIFICATION</div>
                <div className="whitespace-pre-wrap opacity-90">{output}</div>
            </div>
        )}

        {explanation && (
            <div className="bg-slate-800/20 p-4 border-t border-slate-700/50 flex gap-3 text-sm text-slate-400">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p>{explanation}</p>
            </div>
        )}
    </div>
);

const ProjektLinuxLabC = () => {
    return (
        <Layout>
            <Helmet>
                <title>Challenge Lab C: Log Archiving - Gökhan Zehirlioglu</title>
                <meta name="description" content="Linux Projekt: Log-Archivierung und Sicherung mit tar auf Ubuntu Server." />
            </Helmet>

            <div className="min-h-screen bg-[#0f111a] text-slate-300">
                {/* --- HEADER SECTION --- */}
                <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-[#0f111a] to-[#0f111a]" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-6">
                            <Terminal size={14} /> Linux Administration
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Challenge Lab C: <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">Log Archiving</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                            Implementierung einer Strategie zur Sicherung von System-Logs.
                            Verwendung von <code>tar</code> zur Archivierung, Pfad-Manipulation und Extraktion in Backup-Verzeichnisse,
                            um verdächtige Aktivitäten für forensische Analysen zu bewahren.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <a
                                    href="/Challenge_Lab_C_Log_Archiving.docx"
                                    download
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-orange-500/20"
                                >
                                    <Download size={18} /> Projektbericht (.docx)
                                </a>
                                <span className="text-slate-400 font-mono text-sm">03.02.2026</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Server size={16} className="text-orange-500" /> Ubuntu Server 24.04 LTS
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Terminal size={16} className="text-orange-500" /> CLI only
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <FileArchive size={16} className="text-orange-500" /> Tar Archiving
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Shield size={16} className="text-orange-500" /> Incident Response
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MAIN CONTENT --- */}
                <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-[1fr_250px] gap-12">

                    {/* Content Column */}
                    <div className="min-w-0">

                        {/* 1. PROJEKTÜBERSICHT */}
                        <DocSection title="1. Projektübersicht" id="overview">
                            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
                                <h3 className="text-orange-400 font-bold mb-2">Szenario (Case Scenario)</h3>
                                <p>
                                    Es gab verdächtige Aktivitäten auf dem System. Um Log-Informationen zu bewahren,
                                    ist es notwendig, die aktuellen Dateien in <code>/var/log</code> mit der Erweiterung <code>.log</code> zu archivieren.
                                    Die Dateien sollen in einer Datei namens <code>log.tar</code> gespeichert werden, die im Verzeichnis <code>~/archive</code> abgelegt wird.
                                    Zusätzlich wurde angefordert, dass die archivierten Dateien in einem Verzeichnis <code>~/backup</code> gespeichert werden.
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">Projektziele</h3>
                            <ul className="space-y-2 text-slate-400 list-disc pl-5">
                                <li>Ein Archiv namens <code>log.tar</code> erstellen, das im Verzeichnis <code>~/archive</code> gespeichert wird</li>
                                <li>Pfadnamen aus den archivierten Dateien entfernen (nur Dateinamen speichern)</li>
                                <li>Verbose Output beim Archivieren erzeugen (Statusanzeige)</li>
                                <li>Inhalte des Archivs auflisten, ohne zu extrahieren (Validierung)</li>
                                <li>Dateien in das Verzeichnis <code>~/backup</code> extrahieren</li>
                            </ul>
                        </DocSection>

                        {/* 2. TECHNISCHE SPEZIFIKATIONEN */}
                        <DocSection title="2. Technische Spezifikationen" id="specs">
                            <div className="bg-slate-800/30 p-6 rounded-lg border border-white/5 mb-6">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Cpu size={18} className="text-blue-400" /> Systemumgebung
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 font-mono">
                                    <div>• OS: Ubuntu Server 24.04.3 LTS</div>
                                    <div>• Kernel: Linux 6.x</div>
                                    <div>• Interface: CLI only (keine GUI)</div>
                                    <div>• Installation: Remote Desktop via Hyper-V</div>
                                    <div>• Zugriff: SSH (OpenSSH Server)</div>
                                    <div>• Log-Dateien: 8 (*.log im /var/log)</div>
                                </div>
                            </div>
                            <p>
                                <strong>Systemvoraussetzungen:</strong> Root- oder Sudo-Zugriff, SSH-Verbindung, grundlegende Linux-Kenntnisse (tar, Dateisystem), Verständnis von Archivierung und Kompression.
                            </p>
                        </DocSection>

                        {/* 3. SYSTEMARCHITEKTUR */}
                        <DocSection title="3. Systemarchitektur" id="architecture">
                            <h3 className="text-xl font-bold text-white mb-3">Verzeichnisstruktur</h3>
                            <div className="overflow-x-auto mb-8">
                                <table className="w-full text-left border-collapse border border-slate-700/50 text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 text-slate-300">
                                            <th className="p-3 border border-slate-700/50">Verzeichnis</th>
                                            <th className="p-3 border border-slate-700/50">Zweck</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-400 font-mono">
                                        <tr>
                                            <td className="p-3 border border-slate-700/50 text-emerald-400">/var/log</td>
                                            <td className="p-3 border border-slate-700/50">Quelle der Log-Dateien (*.log)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50 text-emerald-400">~/archive</td>
                                            <td className="p-3 border border-slate-700/50">Speicherort für log.tar</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50 text-emerald-400">~/backup</td>
                                            <td className="p-3 border border-slate-700/50">Extrahierte Log-Dateien</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">Archivierte Dateien (Beispiele)</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-400 font-mono bg-slate-800/30 p-4 rounded-lg border border-white/5">
                                <li>📄 alternatives.log</li>
                                <li>📄 apport.log</li>
                                <li>📄 auth.log (Authentifizierung)</li>
                                <li>📄 bootstrap.log</li>
                                <li>📄 cloud-init.log</li>
                                <li>📄 cloud-init-output.log</li>
                                <li>📄 dpkg.log (Paket-Management)</li>
                                <li>📄 kern.log (Kernel)</li>
                            </ul>
                        </DocSection>

                        {/* 4. IMPLEMENTIERUNG */}
                        <DocSection title="4. Implementierung" id="implementation">
                            <p className="mb-6">
                                Die Implementierung erfolgt in vier Phasen, die aufeinander aufbauen und Best Practices der Systemadministration folgen.
                            </p>

                            {/* 4.1 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.1 Phase 1: Verzeichnisse Erstellen</h3>
                            <CommandBlock
                                title="Verzeichnis-Setup"
                                command={`mkdir ~/archive
mkdir ~/backup`}
                                explanation="Erstellt die Zielverzeichnisse für das Archiv und die extrahierten Backups im Home-Verzeichnis."
                                output={`drwxrwxr-x 2 gz gz 4096 Feb  3 15:08 archive
drwxrwxr-x 2 gz gz 4096 Feb  3 15:09 backup`}
                            />

                            {/* 4.2 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.2 Phase 2: Log-Dateien Archivieren</h3>
                            <CommandBlock
                                title="Erstellung des TAR-Archivs"
                                command={`sudo tar -cvf ~/archive/log.tar -C /var/log $(cd /var/log && ls *.log)`}
                                explanation="Optionen: -c (create), -v (verbose), -f (file). -C wechselt das Verzeichnis vor Ausführung, um relative Pfade zu nutzen. Die Subshell $() listet nur .log Dateien auf."
                                output={`alternatives.log
apport.log
auth.log
bootstrap.log
cloud-init.log
cloud-init-output.log
dpkg.log
kern.log`}
                            />

                            {/* 4.3 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.3 Phase 3: Archiv-Inhalt Auflisten</h3>
                            <CommandBlock
                                title="Archiv-Verifizierung (List Content)"
                                command={`tar -tf ~/archive/log.tar`}
                                explanation="-t (list) zeigt den Inhalt des Archivs ohne zu Entpacken. Es sind nur Dateinamen ohne führende Pfade (/var/log/...) sichtbar, was das Ziel bestätigt."
                                output={`alternatives.log
apport.log
auth.log
...`}
                            />

                            {/* 4.4 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.4 Phase 4: Dateien Extrahieren</h3>
                            <CommandBlock
                                title="Restore / Extraction"
                                command={`tar -xvf ~/archive/log.tar -C ~/backup`}
                                explanation="-x (extract) entpackt das Archiv. -C ~/backup stellt sicher, dass die Dateien im gewünschten Zielverzeichnis landen."
                                output={`alternatives.log
apport.log
auth.log
...`}
                            />
                        </DocSection>

                        {/* 5. VERIFIZIERUNG */}
                        <DocSection title="5. Verifizierung und Tests" id="verification">
                            <p className="mb-6">
                                Nach der Implementierung wurde eine vollständige Systemprüfung durchgeführt.
                            </p>

                            <div className="space-y-6">
                                <h4 className="text-white font-bold mb-2">Komplette Systemverifizierung</h4>
                                <CommandBlock
                                    title="Verification Script"
                                    command={`echo "=== ARCHIVE VERIFICATION ==="
ls -lh ~/archive/log.tar
tar -tf ~/archive/log.tar | wc -l

echo ""
echo "=== BACKUP VERIFICATION ==="
ls ~/backup`}
                                    output={`=== ARCHIVE VERIFICATION ===
-rw-r--r-- 1 root root 280K Feb  3 15:11 /home/gz/archive/log.tar
8

=== BACKUP VERIFICATION ===
alternatives.log  apport.log  auth.log  bootstrap.log cloud-init.log  cloud-init-output.log  dpkg.log  kern.log`}
                                />

                                <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 space-y-4 mt-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Erfolgskriterien</h3>
                                    {[
                                        "Verzeichnisse ~/archive und ~/backup erfolgreich erstellt",
                                        "Alle 8 .log-Dateien aus /var/log wurden archiviert",
                                        "Pfadnamen wurden entfernt (nur Dateinamen im Archiv)",
                                        "Verbose Output wurde während der Archivierung angezeigt",
                                        "Archiv-Inhalt wurde erfolgreich aufgelistet"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-slate-300">
                                            <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DocSection>

                        {/* 6. SKILLS */}
                        <DocSection title="6. Erworbene Fähigkeiten" id="skills">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-white font-bold mb-4">Technische Kompetenzen</h3>
                                    <ul className="space-y-2 text-slate-400 text-sm">
                                        <li>• Archivierung mit tar (create, list, extract)</li>
                                        <li>• Pfadmanipulation und -entfernung bei Archiven</li>
                                        <li>• Log-Dateien-Management und -Sicherung</li>
                                        <li>• Dateisystem-Navigation und -Verwaltung</li>
                                        <li>• SSH-basierte Remote-Administration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-4">Befehlsreferenz</h3>
                                    <table className="w-full text-left border-collapse border border-slate-700/50 text-xs font-mono">
                                        <tbody className="text-slate-400">
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">mkdir</td>
                                                <td className="p-2">Verzeichnis erstellen</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">tar -cvf</td>
                                                <td className="p-2">Archiv erstellen (verbose)</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">tar -tf</td>
                                                <td className="p-2">Archiv-Inhalt auflisten</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">ls -lh</td>
                                                <td className="p-2">Detaillierte Liste mit Größe</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </DocSection>

                        {/* 7. FAZIT */}
                        <DocSection title="7. Fazit" id="conclusion">
                            <p>
                                Dieses Projekt demonstriert die erfolgreiche Implementierung einer Log-Archivierungslösung auf einem Ubuntu Server.
                                Durch die systematische Anwendung von <code>tar</code>-Befehlen wurde eine effiziente Methode zur Sicherung und Verwaltung von System-Log-Dateien geschaffen.
                            </p>
                            <p className="mt-4">
                                Die Entfernung von Pfadnamen durch die Kombination von Optionen stellt sicher, dass nur die Dateinamen im Archiv gespeichert werden,
                                was zu einer saubereren und portableren Archivstruktur führt.
                                Das Projekt festigt praktische Erfahrungen in der Verwaltung von Linux-Systemen und Incident-Response-Vorbereitung.
                            </p>
                        </DocSection>

                    </div>

                    {/* Table of Contents Column (Sticky) */}
                    <div className="hidden md:block">
                        <div className="sticky top-24">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Inhalt</h3>
                            <nav className="space-y-1 border-l border-white/10">
                                {[
                                    { id: "#overview", label: "1. Übersicht" },
                                    { id: "#specs", label: "2. Spezifikationen" },
                                    { id: "#architecture", label: "3. Architektur" },
                                    { id: "#implementation", label: "4. Implementierung" },
                                    { id: "#verification", label: "5. Verifizierung" },
                                    { id: "#skills", label: "6. Fähigkeiten" },
                                    { id: "#conclusion", label: "7. Fazit" },
                                ].map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.id}
                                        className="block pl-4 py-1 text-sm text-slate-500 hover:text-orange-500 hover:border-l-2 hover:border-orange-500 -ml-[1px] transition-all"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ProjektLinuxLabC;
