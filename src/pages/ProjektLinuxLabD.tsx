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
    FileArchive,
    Filter,
    ArrowRight
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

const ProjektLinuxLabD = () => {
    return (
        <Layout>
            <Helmet>
                <title>Challenge Lab D: Text Processing - Gökhan Zehirlioglu</title>
                <meta name="description" content="Linux Projekt: Text Processing Pipeline mit grep, awk, sort und uniq." />
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
                            Challenge Lab D: <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">Text Processing</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                            Komplexe Textverarbeitungs-Pipeline ohne Zwischendateien.
                            Filterung, Extraktion und Sortierung von Systemdiensten mittels <code>grep</code>, <code>awk</code>, <code>sort</code> und <code>uniq</code>.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <a
                                    href="/Challenge_Lab_D_Text_Processing.docx"
                                    download
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-orange-500/20"
                                >
                                    <Download size={18} /> Projektbericht (.docx)
                                </a>
                                <span className="text-slate-400 font-mono text-sm">04.02.2026</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Server size={16} className="text-orange-500" /> Ubuntu Server 24.04 LTS
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Terminal size={16} className="text-orange-500" /> CLI only
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Filter size={16} className="text-orange-500" /> Grep & Awk
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <List size={16} className="text-orange-500" /> Pipes & Redirects
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
                                    Ein Mitarbeiter benötigt eine Liste aller Dienste, die vom aktuellen Linux-System erkannt werden.
                                    Die Datei <code>/etc/services</code> enthält die relevanten Informationen, ist jedoch nicht organisiert, um alle Dienste einfach zu ermitteln.
                                    Unter Verwendung einer Kombination von Pipes, Redirects und Kontrollstrukturen soll eine Ausgabe erstellt werden,
                                    die nur die Dienstnamen enthält. Die gesamte Aufgabe muss ohne Verwendung von Zwischendateien durchgeführt werden.
                                    Jeder Dienst soll nur einmal aufgelistet und in einer Datei namens <code>uniqueservices.txt</code> im Home-Verzeichnis gespeichert werden.
                                    Leere Zeilen und Kommentarzeilen müssen entfernt werden.
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">Projektziele</h3>
                            <ul className="space-y-2 text-slate-400 list-disc pl-5">
                                <li>Alle Dienstnamen aus der Datei <code>/etc/services</code> extrahieren</li>
                                <li>Namen alphabetisch sortieren und Duplikate entfernen</li>
                                <li>Leere Zeilen und Kommentarzeilen (<code>#</code> am Anfang) entfernen</li>
                                <li>Finale Ausgabe in der Datei <code>uniqueservices.txt</code> speichern</li>
                                <li>Zeilenanzahl mit bedingtem Befehl zählen (nur bei Erfolg)</li>
                                <li>Gesamte Aufgabe in einer einzigen Pipeline ohne Zwischendateien</li>
                            </ul>
                        </DocSection>

                        {/* 2. TECHNISCHE SPEZIFIKATIONEN */}
                        <DocSection title="2. Technische Spezifikationen" id="specs">
                            <div className="bg-slate-800/30 p-6 rounded-lg border border-white/5 mb-6">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Cpu size={18} className="text-blue-400" /> Systemumgebung & Tools
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400 font-mono">
                                    <div>• OS: Ubuntu Server 24.04.3 LTS</div>
                                    <div>• Kernel: Linux 6.x</div>
                                    <div>• Input: /etc/services</div>
                                    <div>• Output: ~/uniqueservices.txt</div>
                                    <div>• Tools: grep, awk, sort, uniq</div>
                                    <div>• Datenmenge: ~200 Dienste</div>
                                </div>
                            </div>
                            <p>
                                <strong>Systemvoraussetzungen:</strong> Zugriff auf das Linux-System (lokal/SSH), Verständnis von Pipes (|), Redirects ({`>`}) und Kontrollstrukturen (&&, ||).
                            </p>
                        </DocSection>

                        {/* 3. SYSTEMARCHITEKTUR */}
                        <DocSection title="3. Systemarchitektur" id="architecture">
                            <h3 className="text-xl font-bold text-white mb-3">Datenfluss Pipeline</h3>
                            <div className="bg-[#1e1e1e] border border-slate-700/50 rounded-xl p-6 overflow-x-auto mb-8">
                                <div className="flex items-center gap-4 text-sm font-mono whitespace-nowrap">
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Input</div>
                                        <div className="bg-slate-800 px-3 py-1.5 rounded text-slate-300 w-full text-center border border-slate-700">Source</div>
                                        <div className="text-xs text-emerald-400 font-bold">/etc/services</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Step 1</div>
                                        <div className="bg-blue-900/30 px-3 py-1.5 rounded text-blue-300 w-full text-center border border-blue-500/30">grep -v</div>
                                        <div className="text-xs text-orange-400 font-bold">'^#'</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Step 2</div>
                                        <div className="bg-blue-900/30 px-3 py-1.5 rounded text-blue-300 w-full text-center border border-blue-500/30">grep -v</div>
                                        <div className="text-xs text-orange-400 font-bold">'^$'</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Step 3</div>
                                        <div className="bg-emerald-900/30 px-3 py-1.5 rounded text-emerald-300 w-full text-center border border-emerald-500/30">awk</div>
                                        <div className="text-xs text-orange-400 font-bold">{`'{print $1}'`}</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Step 4</div>
                                        <div className="bg-purple-900/30 px-3 py-1.5 rounded text-purple-300 w-full text-center border border-purple-500/30">sort</div>
                                        <div className="text-xs text-orange-400 font-bold">(a-z)</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Step 5</div>
                                        <div className="bg-purple-900/30 px-3 py-1.5 rounded text-purple-300 w-full text-center border border-purple-500/30">uniq</div>
                                        <div className="text-xs text-orange-400 font-bold">duplicates</div>
                                    </div>
                                    <ArrowRight className="text-slate-600" />
                                    <div className="flex flex-col items-center gap-1 min-w-[100px]">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Output</div>
                                        <div className="bg-orange-900/30 px-3 py-1.5 rounded text-orange-300 w-full text-center border border-orange-500/30">Redirect &gt;</div>
                                        <div className="text-xs text-emerald-400 font-bold">file.txt</div>
                                    </div>
                                </div>
                            </div>
                        </DocSection>

                        {/* 4. IMPLEMENTIERUNG */}
                        <DocSection title="4. Implementierung" id="implementation">
                            <p className="mb-6">
                                Die Implementierung erfolgt schrittweise, wobei jede Stage die Daten für die nächste vorbereitet.
                            </p>

                            {/* 4.2 & 4.3 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">Schritt 1-3: Filtern</h3>
                            <CommandBlock
                                title="Cleanup"
                                command={`grep -v '^#' /etc/services | grep -v '^$' | head -20`}
                                explanation="grep -v '^#' entfernt Zeilen, die mit # beginnen. grep -v '^$' entfernt komplett leere Zeilen."
                            />

                            {/* 4.4 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">Schritt 4: Extraktion</h3>
                            <CommandBlock
                                title="AWK Field Extraction"
                                command={`grep -v '^#' /etc/services | grep -v '^$' | awk '{print $1}'`}
                                explanation="awk '{print $1}' gibt nur das erste Feld (Dienstname) jeder Zeile aus. Standardtrenner ist Leerzeichen/Tab."
                            />

                            {/* 4.5 & 4.6 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">Schritt 5-6: Sortieren & Reduzieren</h3>
                            <CommandBlock
                                title="Sort & Uniq"
                                command={`... | sort | uniq`}
                                explanation="sort bringt die Liste in alphabetische Reihenfolge. uniq entfernt aufeinanderfolgende Duplikate. Wichtig: uniq funktioniert nur korrekt auf sortierten Daten."
                            />

                            {/* 4.7 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">Schritt 7: Finaler Befehl</h3>
                            <CommandBlock
                                title="Final Pipeline Execution"
                                command={`grep -v '^#' /etc/services | grep -v '^$' | awk '{print $1}' | sort | uniq > uniqueservices.txt && wc -l uniqueservices.txt`}
                                explanation="Die gesamte Kette wird in eine Datei umgeleitet (>). Der && Operator führt wc -l (Zeilenzähler) nur aus, wenn der vorherige Befehl erfolgreich war."
                                output={`269 uniqueservices.txt`}
                            />
                        </DocSection>

                        {/* 5. VERIFIZIERUNG */}
                        <DocSection title="5. Verifizierung und Tests" id="verification">
                            <p className="mb-6">
                                Nach der Implementierung wurde die Korrektheit der Daten verifiziert.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Test 2: Dateigröße</h4>
                                    <CommandBlock
                                        title="ls -lh"
                                        command={`ls -lh uniqueservices.txt`}
                                        output={`-rw-rw-r-- 1 gz gz 2.1K Feb  3 20:37 uniqueservices.txt`}
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Test 3: Inhalt Check</h4>
                                    <CommandBlock
                                        title="head uniqueservices.txt"
                                        command={`head uniqueservices.txt`}
                                        output={`acr-nema
afpovertcp
afs3-bos
afs3-callback
...`}
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 space-y-4 mt-8">
                                <h3 className="text-xl font-bold text-white mb-4">Erfolgskriterien</h3>
                                {[
                                    "Alle Kommentarzeilen (#) wurden entfernt",
                                    "Alle leeren Zeilen wurden entfernt",
                                    "Nur Dienstnamen (erste Spalte) wurden extrahiert",
                                    "Dienstnamen sind alphabetisch sortiert",
                                    "Keine Duplikate in der Liste",
                                    "Keine Zwischendateien verwendet"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </DocSection>

                        {/* 6. SKILLS */}
                        <DocSection title="6. Erworbene Fähigkeiten" id="skills">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-white font-bold mb-4">Technische Kompetenzen</h3>
                                    <ul className="space-y-2 text-slate-400 text-sm">
                                        <li>• Textverarbeitung mit grep, awk, sort und uniq</li>
                                        <li>• Verwendung von Pipes (|) zur Verkettung</li>
                                        <li>• Regex-Patterns (^#, ^$) für Muster-Erkennung</li>
                                        <li>• Effiziente Datenverarbeitung ohne Zwischendateien</li>
                                        <li>• Unix-Philosophy (Do One Thing Well)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-4">Befehlsreferenz</h3>
                                    <table className="w-full text-left border-collapse border border-slate-700/50 text-xs font-mono">
                                        <tbody className="text-slate-400">
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">grep -v</td>
                                                <td className="p-2">Zeilen filtern (invert match)</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">awk</td>
                                                <td className="p-2">Textverarbeitung / Feldextraktion</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">sort | uniq</td>
                                                <td className="p-2">Sortieren & Duplikate entfernen</td>
                                            </tr>
                                            <tr className="border-b border-white/5">
                                                <td className="p-2 text-orange-400">&&</td>
                                                <td className="p-2">UND-Operator (bedingte Ausführung)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </DocSection>

                        {/* 7. FAZIT */}
                        <DocSection title="7. Fazit" id="conclusion">
                            <p>
                                Dieses Projekt demonstriert die erfolgreiche Implementierung einer Textverarbeitungs-Pipeline auf einem Ubuntu Server.
                                Durch die systematische Verkettung von Tools wurde eine effiziente Lösung geschaffen, die etwa 200 Dienstnamen extrahiert und aufbereitet.
                            </p>
                            <p className="mt-4">
                                Die Verwendung von Pipes (|) zeigt die Eleganz der Unix-Philosophy.
                                Die Implementierung folgt Best Practices: keine Zwischendateien, bedingte Ausführung mit &&, und saubere Fehlerbehandlung.
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

export default ProjektLinuxLabD;
