import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import DocSection from "@/components/DocSection";
import CommandBlock from "@/components/CommandBlock";
import {
    Terminal,
    Shield,
    Users,
    Server,
    Download,
    ChevronRight,
    Play,
    CheckCircle2,
    Cpu,
    Monitor
} from "lucide-react";

const ProjektLinuxUserManagement = () => {
    return (
        <Layout>
            <Helmet>
                <title>Lab A: User Management — Gökhan Zehirlioglu</title>
                <meta name="description" content="Linux Challenge Lab A: User- und Gruppenverwaltung mit useradd, groupadd, chmod, chown und Sticky Bit." />
            </Helmet>
            <div className="bg-[#0f111a] min-h-screen">

                {/* --- HEADER SECTION --- */}
                <section className="relative py-24 px-4 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-[#0f111a] to-[#0f111a]" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium mb-6">
                            <Terminal size={14} /> Linux Administration
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Challenge LAB A : User Management & <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">System Security</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
                            Dieses Projekt zeigt Ihnen Schritt für Schritt, wie man ein sicheres
                            Linux-Mehrbenutzersystem aufbaut: Benutzer und Gruppen verwalten
                            (useradd, groupadd), Dateiberechtigungen präzise konfigurieren
                            (chmod, chown), das rwx-System verstehen, und Verzeichnisse mit
                            Sticky Bit schützen. Sie lernen, wie man isolierte Arbeitsumgebungen
                            für verschiedene Abteilungen erstellt, Zugriffsrechte granular steuert,
                            und typische Sicherheitsprobleme in Multi-User-Systemen löst – von der
                            VM-Installation bis zur produktionsreifen Verifizierung.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <a
                                    href="/Challenge_Lab_A_User_Management.docx"
                                    download
                                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-orange-500/20"
                                >
                                    <Download size={18} /> Projektbericht (.docx)
                                </a>
                                <span className="text-slate-400 font-mono text-sm">28.01.2026</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Server size={16} className="text-orange-500" /> Ubuntu Server 24.04 LTS
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Monitor size={16} className="text-orange-500" /> Remote Desktop & Virtual Maschine
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Terminal size={16} className="text-orange-500" /> SSH Verbindung
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Users size={16} className="text-orange-500" /> User Management
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Shield size={16} className="text-orange-500" /> Permission Control
                                </span>
                                <span className="flex items-center gap-2 text-slate-300 font-mono text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/5">
                                    <Shield size={16} className="text-orange-500" /> chown/chmod/Sticky Bit
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MAIN CONTENT --- */}
                <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-[1fr_250px] gap-12">

                    {/* Content Column */}
                    <div className="min-w-0">

                        {/* 0. SETUP & INSTALLATION */}
                        <DocSection title="Setup & Installation" id="setup">
                            <p>
                                Basis der Infrastruktur ist ein <strong>Ubuntu Server 24.04 LTS</strong>, der als virtuelle Maschine auf <strong>Microsoft Hyper-V</strong> läuft.
                            </p>

                            <div className="bg-slate-800/30 p-6 rounded-lg border border-white/5 mb-6">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Cpu size={18} className="text-blue-400" /> VM Konfiguration</h3>
                                <ul className="space-y-2 text-sm text-slate-400 font-mono">
                                    <li>• Hypervisor: Microsoft Hyper-V</li>
                                    <li>• Generation: <strong>Generation 2</strong> (UEFI Support)</li>
                                    <li>• Secure Boot: Enabled (Microsoft UEFI Certificate Authority)</li>
                                    <li>• Ressourcen: <strong>4096 MB RAM</strong>, <strong>20 GB Speicher</strong></li>
                                    <li>• OS Selection: Ubuntu Server 24.04 LTS ISO</li>
                                </ul>
                            </div>

                            <p>Nach der Installation wurde der erste administrative Benutzer <code>gz</code> erstellt und OpenSSH für den Fernzugriff konfiguriert.</p>

                            <CommandBlock
                                title="Initial Connection"
                                command={`# IP-Adresse ermitteln
ip addr show

# SSH Verbindung herstellen
ssh gz@10.100.15.116`}
                                explanation="Verbindung erfolgt über PowerShell oder Terminal vom Host-System."
                            />
                        </DocSection>

                        {/* 1. PHASE 1: GRUPPEN */}
                        <DocSection title="Phase 1: Gruppen erstellen" id="phase1">
                            <p>
                                Für die Firmenstruktur werden drei dedizierte Gruppen benötigt: <strong>Produktion</strong>, <strong>Vertrieb</strong> und <strong>Buchhaltung</strong>.
                            </p>
                            <CommandBlock
                                title="Terminal - Gruppen anlegen"
                                command={`sudo groupadd produktion
sudo groupadd vertrieb
sudo groupadd buchhaltung`}
                                explanation="groupadd erstellt neue Einträge in /etc/group."
                                output={`# Verifizierung
cat /etc/group | grep -E "produktion|vertrieb|buchhaltung"

produktion:x:1001:
vertrieb:x:1002:
buchhaltung:x:1003:`}
                            />
                        </DocSection>

                        {/* 2. PHASE 2: BENUTZER */}
                        <DocSection title="Phase 2: Benutzer erstellen" id="phase2">
                            <p>
                                Insgesamt werden 9 Benutzer erstellt (3 pro Abteilung: 1 Admin, 2 User).
                                Jeder Benutzer erhält ein eigenes Home-Verzeichnis (<code>-m</code>) und die Bash-Shell (<code>-s /bin/bash</code>).
                            </p>

                            <CommandBlock
                                title="A. Produktion"
                                command={`sudo useradd -m -s /bin/bash -g produktion prod_admin
sudo useradd -m -s /bin/bash -g produktion prod_user1
sudo useradd -m -s /bin/bash -g produktion prod_user2

# Passwörter setzen
sudo passwd prod_admin
sudo passwd prod_user1
sudo passwd prod_user2`}
                            />

                            <CommandBlock
                                title="B. Vertrieb"
                                command={`sudo useradd -m -s /bin/bash -g vertrieb ver_admin
sudo useradd -m -s /bin/bash -g vertrieb ver_user1
sudo useradd -m -s /bin/bash -g vertrieb ver_user2

# Passwörter setzen
sudo passwd ver_admin
sudo passwd ver_user1
sudo passwd ver_user2`}
                            />

                            <CommandBlock
                                title="C. Buchhaltung"
                                command={`sudo useradd -m -s /bin/bash -g buchhaltung buch_admin
sudo useradd -m -s /bin/bash -g buchhaltung buch_user1
sudo useradd -m -s /bin/bash -g buchhaltung buch_user2

# Passwörter setzen
sudo passwd buch_admin
sudo passwd buch_user1
sudo passwd buch_user2`}
                            />

                            <div className="bg-black/40 p-4 border-l-4 border-emerald-500 font-mono text-sm text-slate-400 mt-4">
                                <span className="text-emerald-500 font-bold block mb-2">// VERIFIZIERUNG</span>
                                id prod_admin<br />
                                <span className="opacity-70">uid=1001(prod_admin) gid=1001(produktion) groups=1001(produktion)</span>
                            </div>
                        </DocSection>

                        {/* 3. PHASE 3: VERZEICHNISSE */}
                        <DocSection title="Phase 3: Verzeichnisse & Ownership" id="phase3">
                            <p>
                                Die zentralen Verzeichnisse werden im Root-Pfad erstellt und der Besitz an die jeweiligen Abteilungs-Admins übergeben.
                            </p>

                            <CommandBlock
                                title="Verzeichnisse erstellen"
                                command={`sudo mkdir /produktion
sudo mkdir /vertrieb
sudo mkdir /buchhaltung`}
                            />

                            <CommandBlock
                                title="Besitzrechte ändern (chown)"
                                command={`sudo chown prod_admin:produktion /produktion
sudo chown ver_admin:vertrieb /vertrieb
sudo chown buch_admin:buchhaltung /buchhaltung`}
                                explanation="Syntax: chown user:group pfad. Dies gibt dem Abteilungs-Admin die Kontrolle über den Ordner."
                                output={`# Verifizierung (ls -ld)
drwxr-xr-x 2 prod_admin produktion  4096 ... /produktion
drwxr-xr-x 2 ver_admin  vertrieb    4096 ... /vertrieb
drwxr-xr-x 2 buch_admin buchhaltung 4096 ... /buchhaltung`}
                            />
                        </DocSection>

                        {/* 4. PHASE 4: BERECHTIGUNGEN */}
                        <DocSection title="Phase 4: Berechtigungen konfigurieren" id="phase4">
                            <p>
                                Standardmäßig sind die Rechte zu offen. Wir setzen strikte Rechte (770) und aktivieren das <strong>Sticky Bit</strong>, um das Löschen fremder Dateien zu verhindern.
                            </p>

                            <CommandBlock
                                title="Schritt 1: Zugriff einschränken (770)"
                                command={`sudo chmod 770 /produktion
sudo chmod 770 /vertrieb
sudo chmod 770 /buchhaltung`}
                                explanation={`7 (User): rwx (Vollzugriff)
7 (Group): rwx (Abteilungskollegen haben Vollzugriff)
0 (Other): --- (Kein Zugriff für Fremde)`}
                            />

                            <CommandBlock
                                title="Schritt 2: Sticky Bit (+t)"
                                command={`sudo chmod +t /produktion
sudo chmod +t /vertrieb
sudo chmod +t /buchhaltung`}
                                explanation="Das Sticky Bit (+t) verhindert, dass Benutzer Dateien löschen können, die ihnen nicht gehören – selbst wenn sie Schreibrechte im Ordner haben."
                                output={`# Verifizierung
drwxrwx--T 2 prod_admin produktion  ... /produktion
drwxrwx--T 2 ver_admin  vertrieb    ... /vertrieb
drwxrwx--T 2 buch_admin buchhaltung ... /buchhaltung`}
                            />
                        </DocSection>

                        {/* 5. PHASE 5: DATEIEN */}
                        <DocSection title="Phase 5: Dateien & Inhalte" id="phase5">
                            <p>
                                Zum Testen erstellen wir vertrauliche Dokumente in jedem Ordner. Diese dürfen nur vom Eigentümer bearbeitet werden (640).
                            </p>

                            <CommandBlock
                                title="Dateien erstellen"
                                command={`sudo bash -c 'echo "This file contains confidential information for the department." > /produktion/info.txt'
sudo bash -c 'echo "This file contains confidential information for the department." > /vertrieb/info.txt'
sudo bash -c 'echo "This file contains confidential information for the department." > /buchhaltung/info.txt'`}
                            />

                            <CommandBlock
                                title="Besitz & Rechte anpassen"
                                command={`# Ownership
sudo chown prod_admin:produktion /produktion/info.txt
sudo chown ver_admin:vertrieb /vertrieb/info.txt
sudo chown buch_admin:buchhaltung /buchhaltung/info.txt

# Berechtigungen (640: User=RW, Group=R, Other=None)
sudo chmod 640 /produktion/info.txt
sudo chmod 640 /vertrieb/info.txt
sudo chmod 640 /buchhaltung/info.txt`}
                                output={`# Verifizierung
-rw-r----- 1 prod_admin produktion  60 ... /produktion/info.txt
-rw-r----- 1 ver_admin  vertrieb    59 ... /vertrieb/info.txt
-rw-r----- 1 buch_admin buchhaltung 59 ... /buchhaltung/info.txt`}
                            />
                        </DocSection>


                        {/* VERIFICATION SUMMARY */}
                        <DocSection title="Abschluss-Verifizierung" id="verification">
                            <div className="bg-slate-800/30 p-6 rounded-xl border border-white/5 space-y-6">
                                <p className="text-slate-300">
                                    Die finale Überprüfung der gesamten Infrastruktur.
                                </p>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-green-500 pl-4 py-1">
                                        <h4 className="text-white font-bold text-sm">1. Verzeichnis-Struktur & Sticky Bit</h4>
                                        <code className="text-xs font-mono text-emerald-400 block mt-1">drwxrwx--T</code>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4 py-1">
                                        <h4 className="text-white font-bold text-sm">2. Datei-Berechtigungen (Read-Only Group)</h4>
                                        <code className="text-xs font-mono text-emerald-400 block mt-1">-rw-r-----</code>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4 py-1">
                                        <h4 className="text-white font-bold text-sm">3. Isolation Test</h4>
                                        <code className="text-xs font-mono text-emerald-400 block mt-1">Permission denied (bei Zugriff auf fremde Ordner)</code>
                                    </div>
                                </div>

                                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs md:text-sm text-slate-300 overflow-x-auto">
                                    <div className="text-slate-500 mb-2"># Final Status Check</div>
                                    <div className="whitespace-pre">
                                        {`$ sudo ls -ld /produktion /vertrieb /buchhaltung
drwxrwx--T 2 prod_admin produktion  4096 Jan 28 14:05 /produktion
drwxrwx--T 2 ver_admin  vertrieb    4096 Jan 28 14:05 /vertrieb
drwxrwx--T 2 buch_admin buchhaltung 4096 Jan 28 14:06 /buchhaltung`}
                                    </div>
                                </div>
                            </div>
                        </DocSection>

                    </div>

                    {/* Table of Contents Column (Sticky) */}
                    <div className="hidden md:block">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Phasen</h3>
                                <nav className="space-y-1 border-l border-white/10">
                                    {[
                                        { id: "#setup", label: "0. Setup & Install" },
                                        { id: "#phase1", label: "1. Gruppen" },
                                        { id: "#phase2", label: "2. Benutzer" },
                                        { id: "#phase3", label: "3. Verzeichnisse" },
                                        { id: "#phase4", label: "4. Berechtigungen" },
                                        { id: "#phase5", label: "5. Dateien" },
                                        { id: "#verification", label: "Verifizierung" },
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

export default ProjektLinuxUserManagement;
