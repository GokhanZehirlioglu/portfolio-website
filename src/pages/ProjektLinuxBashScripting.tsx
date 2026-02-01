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
    List
} from "lucide-react";

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

const ProjektLinuxBashScripting = () => {
    return (
        <Layout>
            <div className="bg-[#0f111a] min-h-screen">

                {/* --- HEADER SECTION --- */}
                <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-[#0f111a] to-[#0f111a]" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-6">
                            <Terminal size={14} /> Linux Administration
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Challenge Lab B: Bash Scripting & <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">Automation</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                            In diesem Projekt wird ein Bash-Script entwickelt, das die manuelle Benutzerverwaltung automatisiert. 
                            Es umfasst Duplikat-Kontrolle, automatische Verzeichniserstellung im Root-Dateisystem, 
                            und das Setzen von komplexen Berechtigungen (770 + Sticky Bit).
                            Ziel ist es, Fehleranfälligkeit zu minimieren und administrative Prozesse effizienter zu gestalten.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/Challenge_Lab_B_Bash_Scripting.docx"
                                download
                                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-orange-500/20"
                            >
                                <Download size={18} /> Projektbericht (.docx)
                            </a>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Server size={16} className="text-orange-500" /> Ubuntu Server 24.04 LTS
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <FileCode size={16} className="text-orange-500" /> Bash Scripting
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Terminal size={16} className="text-orange-500" /> CLI only
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Users size={16} className="text-orange-500" /> User Automation
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
                            <h3 className="text-xl font-bold text-white mb-3">Szenario (Case Scenario)</h3>
                            <p>
                                Im vorherigen Challenge Lab A wurde die manuelle Erstellung von Benutzern und Gruppen durchgeführt. 
                                Diese einzelnen Befehle auf der Kommandozeile sind ein zeitaufwändiger Prozess und können zu möglichen Syntaxfehlern führen. 
                                Als Administrator ist es Ihre Aufgabe, diesen Prozess so reibungslos und effizient wie möglich zu gestalten.
                            </p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-3">Projektziele</h3>
                            <ul className="space-y-2 text-slate-400 list-disc pl-5">
                                <li>Ein Bash-Script erstellen, das die gesamte Benutzerverwaltung automatisiert</li>
                                <li>Duplikat-Kontrolle für Gruppen und Benutzer implementieren</li>
                                <li>Verzeichnisse im Root-Dateisystem (/) mit dem Benutzernamen erstellen</li>
                                <li>Eigentümerschaft und Berechtigungen (770 + Sticky Bit) automatisch setzen</li>
                                <li>Das Script für beliebige Benutzernamen und Gruppennamen funktionsfähig machen (keine Hardcodes)</li>
                                <li>4 Abteilungen mit jeweils 4 Benutzern erstellen</li>
                            </ul>
                        </DocSection>

                        {/* 2. TECHNISCHE SPEZIFIKATIONEN */}
                        <DocSection title="2. Technische Spezifikationen" id="specs">
                            <div className="bg-slate-800/30 p-6 rounded-lg border border-white/5 mb-6">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Cpu size={18} className="text-blue-400" /> Systemumgebung</h3>
                                <ul className="space-y-2 text-sm text-slate-400 font-mono">
                                    <li>• Betriebssystem: Ubuntu Server 24.04.3 LTS</li>
                                    <li>• Kernel: Linux 6.x</li>
                                    <li>• Installation: Remote Desktop via Hyper-V</li>
                                    <li>• Benutzeroberfläche: CLI only (keine GUI)</li>
                                    <li>• Zugriffsmethode: SSH (OpenSSH Server)</li>
                                    <li>• Script-Datei: user_management.sh</li>
                                </ul>
                            </div>
                             <p>
                                <strong>Systemvoraussetzungen:</strong> Root- oder Sudo-Zugriff, SSH-Verbindung, grundlegende Linux-Kenntnisse, Verständnis von Bash-Scripting (Variablen, If-Else, Exit Status) sowie Unix-Dateiberechtigungen (rwx).
                            </p>
                        </DocSection>

                        {/* 3. SYSTEMARCHITEKTUR */}
                        <DocSection title="3. Systemarchitektur" id="architecture">
                            <h3 className="text-xl font-bold text-white mb-3">Abteilungsstruktur</h3>
                            <p className="mb-4">Es werden 4 Abteilungen mit jeweils 4 Benutzern verwaltet:</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse border border-slate-700/50 text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 text-slate-300">
                                            <th className="p-3 border border-slate-700/50">Abteilung</th>
                                            <th className="p-3 border border-slate-700/50">Gruppe</th>
                                            <th className="p-3 border border-slate-700/50">Benutzer Beispiele</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-400">
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">IT</td>
                                            <td className="p-3 border border-slate-700/50">IT</td>
                                            <td className="p-3 border border-slate-700/50">thomas_mueller, anna_schmidt...</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">Marketing</td>
                                            <td className="p-3 border border-slate-700/50">Marketing</td>
                                            <td className="p-3 border border-slate-700/50">julia_hoffmann, marco_becker...</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">Personal</td>
                                            <td className="p-3 border border-slate-700/50">Personal</td>
                                            <td className="p-3 border border-slate-700/50">petra_wagner, stefan_schulz...</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">Finanzen</td>
                                            <td className="p-3 border border-slate-700/50">Finanzen</td>
                                            <td className="p-3 border border-slate-700/50">claudia_wolf, andreas_schroeder...</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-bold text-white mt-8 mb-3">Berechtigungsmatrix</h3>
                            <div className="bg-slate-800/30 p-4 rounded-lg border border-white/5 font-mono text-sm text-slate-400">
                                <div className="grid grid-cols-4 gap-4 mb-2 pb-2 border-b border-white/5 font-bold text-slate-300">
                                    <div>Ressource</div>
                                    <div>Eigentümer</div>
                                    <div>Gruppe</div>
                                    <div>Andere</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>Verzeichnisse</div>
                                    <div className="text-emerald-400">rwx (7)</div>
                                    <div className="text-emerald-400">rwx (7)</div>
                                    <div className="text-red-400">--- (0)</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-2">
                                    <div>Sticky Bit</div>
                                    <div className="text-emerald-400">Ja (T)</div>
                                    <div className="text-emerald-400">Ja (T)</div>
                                    <div className="text-red-400">Nein</div>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-500">
                                <strong>Bedeutung:</strong> r = read, w = write, x = execute/enter, T = Sticky Bit (nur Eigentümer löscht eigene Dateien).
                            </p>
                        </DocSection>

                        {/* 4. IMPLEMENTIERUNG */}
                        <DocSection title="4. Implementierung" id="implementation">
                            <p>
                                Das Bash-Script wird schrittweise aufgebaut. Es akzeptiert zwei Parameter: den Benutzernamen und den Gruppennamen.
                            </p>

                            {/* 4.1 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.1 Script-Aufruf und Parameterüberprüfung</h3>
                            <CommandBlock
                                title="script_part1.sh"
                                command={`#!/bin/bash

BENUTZERNAME=$1
GRUPPENNAME=$2

if [ $# -ne 2 ]; then
    echo "FEHLER: Falsche Anzahl von Parametern!"
    echo "Verwendung: $0 BENUTZERNAME GRUPPENNAME"
    exit 1
fi`}
                                explanation="$# prüft die Anzahl der Argumente. Wenn nicht genau 2 übergeben werden, bricht das Script mit exit 1 ab."
                            />

                            {/* 4.2 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.2 Gruppe Erstellen oder Verwenden</h3>
                            <CommandBlock
                                title="script_part2.sh"
                                command={`if getent group "$GRUPPENNAME" > /dev/null 2>&1; then
    echo "✓ Gruppe '$GRUPPENNAME' existiert bereits. Wird verwendet."
else
    sudo groupadd "$GRUPPENNAME"
    if [ $? -eq 0 ]; then
        echo "✓ Gruppe '$GRUPPENNAME' erfolgreich erstellt!"
    else
        echo "FEHLER: Gruppe konnte nicht erstellt werden!"
        exit 1
    fi
fi`}
                                explanation="getent group prüft die Existenz. Ausgaben werden mit > /dev/null unterdrückt. $? prüft den Erfolg des vorangegangenen Befehls."
                            />

                            {/* 4.3 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.3 Benutzer Erstellen & Verzeichnis</h3>
                            <CommandBlock
                                title="script_part3.sh"
                                command={`if getent passwd "$BENUTZERNAME" > /dev/null 2>&1; then
    echo "FEHLER: Benutzer '$BENUTZERNAME' existiert bereits!"
    exit 1
fi

sudo useradd -m -s /bin/bash -g "$GRUPPENNAME" "$BENUTZERNAME"

sudo mkdir "/$BENUTZERNAME"`}
                                explanation="-m erstellt das /home Verzeichnis, -s setzt die Shell auf Bash, -g weist die Gruppe zu. mkdir /$BENUTZERNAME erstellt das separate Abteilungsverzeichnis im Root."
                            />

                            {/* 4.4 - 4.5 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.4 & 4.5 Passwort & Mitgliedschaft</h3>
                            <CommandBlock
                                title="script_part4.sh"
                                command={`# Passwort
sudo passwd "$BENUTZERNAME"

if [ $? -eq 0 ]; then
    echo "✓ Passwort erfolgreich gesetzt!"
else
    echo "FEHLER: Passwort konnte nicht gesetzt werden!"
    exit 1
fi

# Bestätigung
id "$BENUTZERNAME"
echo "✓ Benutzer '$BENUTZERNAME' ist Mitglied der Gruppe '$GRUPPENNAME'!"`}
                            />

                            {/* 4.6 - 4.7 */}
                            <h3 className="text-lg font-bold text-white mt-8 mb-3">4.6 & 4.7 Berechtigungen & Sticky Bit</h3>
                            <CommandBlock
                                title="script_part5.sh"
                                command={`# Eigentümer und Gruppe setzen
sudo chown "$BENUTZERNAME:$GRUPPENNAME" "/$BENUTZERNAME"

# Berechtigungen (770)
sudo chmod 770 "/$BENUTZERNAME"

# Sticky Bit (+t)
sudo chmod +t "/$BENUTZERNAME"`}
                                explanation="Sticky Bit (+t) verhindert das Löschen von Dateien anderer Benutzer im selben Gruppenverzeichnis."
                            />
                        </DocSection>

                        {/* 5. VARIABLEN */}
                        <DocSection title="5. Script-Variablen & Operatoren" id="variables">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse border border-slate-700/50 text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 text-slate-300">
                                            <th className="p-3 border border-slate-700/50">Operator</th>
                                            <th className="p-3 border border-slate-700/50">Bedeutung</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-400 font-mono">
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">$1, $2</td>
                                            <td className="p-3 border border-slate-700/50">Positionsparameter</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">$#</td>
                                            <td className="p-3 border border-slate-700/50">Anzahl der Parameter</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-slate-700/50">$?</td>
                                            <td className="p-3 border border-slate-700/50">Exit Status (0 = Erfolg)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </DocSection>

                        {/* 6. VERIFIZIERUNG */}
                        <DocSection title="6. Verifizierung und Tests" id="verification">
                            <p className="mb-6">
                                Nach der Implementierung wurden umfassende Tests durchgeführt.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Test 1: Erfolgreiche Erstellung</h4>
                                    <CommandBlock
                                        title="Terminal"
                                        command={`./user_management.sh thomas_mueller IT`}
                                        output={`=== Benutzer-Verwaltungs-Script ===
✓ Gruppe 'IT' existiert nicht.
✓ Gruppe 'IT' erfolgreich erstellt!
✓ Benutzer 'thomas_mueller' erfolgreich erstellt!
✓ Verzeichnis '/thomas_mueller' erfolgreich erstellt!
✓ Passwort erfolgreich gesetzt!
✓ Benutzer 'thomas_mueller' ist Mitglied der Gruppe 'IT'!
✓ Eigentümer: thomas_mueller, Gruppe: IT
✓ Berechtigungen auf 770 gesetzt
✓ Sticky Bit gesetzt`}
                                    />
                                </div>

                                <div>
                                    <h4 className="text-white font-bold mb-2">Test 5: Verzeichnis- und Berechtigungskontrolle</h4>
                                    <CommandBlock
                                        title="ls -ld Verification"
                                        command={`ls -ld /thomas_mueller /anna_schmidt`}
                                        output={`drwxrwx--T 2 thomas_mueller  IT  4096 Jan 30 22:30 /thomas_mueller
drwxrwx--T 2 anna_schmidt    IT  4096 Jan 30 22:30 /anna_schmidt`}
                                    />
                                </div>
                            </div>

                             <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 space-y-6 mt-8">
                                <h3 className="text-xl font-bold text-white">Gesamtergebnis</h3>
                                <div className="space-y-4">
                                     <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-emerald-500" />
                                        <span>Alle 16 Benutzer erfolgreich erstellt</span>
                                     </div>
                                     <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-emerald-500" />
                                        <span>Alle 4 Gruppen (IT, Marketing, Personal, Finanzen) existieren</span>
                                     </div>
                                      <div className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="text-emerald-500" />
                                        <span>Rechte 770 & Sticky Bit auf allen Verzeichnissen aktiv</span>
                                     </div>
                                </div>
                            </div>
                        </DocSection>

                        {/* 9. FAZIT */}
                        <DocSection title="9. Fazit" id="conclusion">
                             <p>
                                Dieses Projekt demonstriert die erfolgreiche Automatisierung der Benutzerverwaltung mittels eines Bash-Scripts auf einem Ubuntu-Server. 
                                Durch die Verwendung von Variablen, Parameterübergabe und logischer Fehlerbehandlung wurde ein flexibles Script entwickelt, 
                                das für beliebige Benutzernamen und Gruppennamen verwendet werden kann.
                            </p>
                            <p className="mt-4">
                                Im Vergleich zu Challenge Lab A reduziert das Script den Zeitaufwand erheblich und minimiert das Risiko von Syntaxfehlern. 
                                Die implementierte Duplikat-Kontrolle stellt sicher, dass das System konsistent bleibt. 
                                Die modulare Herangehensweise erleichtert sowohl die Fehlersuche als auch die zukünftige Erweiterung des Scripts.
                            </p>
                        </DocSection>

                    </div>

                    {/* Table of Contents Column (Sticky) */}
                    <div className="hidden md:block">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Inhalt</h3>
                                <nav className="space-y-1 border-l border-white/10">
                                    {[
                                        { id: "#overview", label: "1. Übersicht" },
                                        { id: "#specs", label: "2. Spezifikationen" },
                                        { id: "#architecture", label: "3. Architektur" },
                                        { id: "#implementation", label: "4. Implementierung" },
                                        { id: "#variables", label: "5. Variablen" },
                                        { id: "#verification", label: "6. Verifizierung" },
                                        { id: "#conclusion", label: "9. Fazit" },
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
            </div>
        </Layout>
    );
};

export default ProjektLinuxBashScripting;
