// ============================================
// TYPE DEFINITIONS
// ============================================

export interface TechLogo {
    src: string;
    alt: string;
    title: string;
}

export interface Project {
    path: string;
    label: string;
    description: string;
    logos: string[];
}

export interface LinuxProject extends Project {
    previewScript?: string;
}

// ============================================
// DATA
// ============================================

export const techLogos: TechLogo[] = [
    // — Security & Network —
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/opnsense.svg", alt: "OPNsense", title: "OPNsense" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/wazuh.svg", alt: "Wazuh", title: "Wazuh SIEM" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/wireguard.svg", alt: "WireGuard", title: "WireGuard VPN" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/unifi.svg", alt: "UniFi", title: "Ubiquiti UniFi" },
    { src: "https://cdn.simpleicons.org/openvpn/EA7E20", alt: "OpenVPN", title: "OpenVPN" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", alt: "Cisco", title: "Cisco" },
    // — Cloud & Infrastructure —
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure", title: "Microsoft Azure" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/proxmox.svg", alt: "Proxmox", title: "Proxmox" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", title: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare", title: "Cloudflare" },
    // — OS & Server —
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux", title: "Linux" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg", alt: "Windows", title: "Windows Server" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", alt: "Raspberry Pi", title: "Raspberry Pi" },
    // — Services & Monitoring —
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", alt: "Nginx", title: "Nginx" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg", alt: "Home Assistant", title: "Home Assistant" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/uptime-kuma.svg", alt: "Uptime Kuma", title: "Uptime Kuma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", alt: "Grafana", title: "Grafana" },
    // — Scripting & Automation —
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", alt: "Bash", title: "Bash" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg", alt: "PowerShell", title: "PowerShell" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", title: "Python" },
];

export const certificates: string[] = [
    "MS Azure Administrator (AZ-104)",
    "MS Windows Server 2022 & Powershell",
    "Linux Essentials",
    "ITIL v4 Foundation",
];

export const badges: string[] = [
    "CCNA: Introduction to Networks",
    "Cisco Networking Basics",
    "Cisco Operating Systems Support",
    "Cisco Security and Connectivity Support",
    "Cisco Introduction to IoT",
    "Industrial Networking Essentials",
    "Industrial Cybersecurity Essential",
    "Linux Unhatched",
];

export const featuredProjects: Project[] = [
    {
        path: "/projekt/home-server",
        label: "Home Server & Infrastruktur Einrichten (Docker-Basis)",
        description: "Zentralisiertes Heimnetzwerk mit Raspberry Pi 5 und Docker Containern.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        ]
    },
    {
        path: "/projekt/home-assistant",
        label: "Smart Home & IoT-Integration (Home Assistant)",
        description: "Automatisierung und Steuerung des Smart Homes für mehr Komfort und Effizienz.",
        logos: [
            "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg"
        ]
    },
    {
        path: "/projekt/web-server",
        label: "Web-Server Einrichten (Nginx)",
        description: "Konfiguration und Verwaltung eines Nginx Web Servers.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
        ]
    },
    {
        path: "/projekt/web-hosting",
        label: "Reverse Tunneling & Web Hosting (Cloudflare)",
        description: "Selfhosting-Lösungen mit Cloudflare Tunnel und DNS-Integration.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg"
        ]
    },
    {
        path: "/projekt/ssd-upgrade",
        label: "Raspberry Pi 5 SSD Upgrade & Pironman 5 MAX",
        description: "Hardware-Upgrade: Migration von SD-Karte auf NVMe SSD, Installation Pironman 5 MAX Gehäuse mit PWM-Kühlung & OLED-Monitoring.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
            "https://cdn.simpleicons.org/python/3776AB"
        ]
    },
    {
        path: "/projekt/openvpn-gateway",
        label: "OpenVPN Gateway auf Raspberry Pi 5",
        description: "Sichere Fernzugriffsarchitektur mit Defense-in-Depth-Modell für eine Heim-Infrastruktur. 7 Sicherheitsschichten, VPN-Tunneling und Firewalling.",
        logos: [
            "https://cdn.simpleicons.org/openvpn/EA7E20",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg"
        ]
    },
];

export const linuxProjects: LinuxProject[] = [
    {
        path: "/projekt/linux/user-management-lab",
        label: "Challenge Lab A: User Management",
        description: "Linux Administrator Projekt: Implementierung eines sicheren Multi-User-Systems mit Fokus auf Benutzerverwaltung (useradd/groupadd), Berechtigungskonfiguration (chmod/chown/Sticky Bit), und Security-Härtung für isolierte Abteilungsstrukturen.",
        logos: ["/images/linux-lab-a.png"],
        previewScript: `# quick-preview.sh
sudo groupadd produktion
sudo useradd -m -s /bin/bash -g produktion prod_admin
sudo chmod 770 /produktion
sudo chmod +t /produktion
ls -ld /produktion  # drwxrwx--T`
    },
    {
        path: "/projekt/linux/bash-scripting-lab",
        label: "Challenge Lab B: Bash Scripting & Automation",
        description: "Entwicklung eines Bash-Scripts zur Automatisierung der Benutzerverwaltung. Features: Duplikat-Kontrolle, automatische Verzeichnis-Erstellung und komplexe Berechtigungssteuerung (Sticky Bit). Ziel: Effizienzsteigerung und Fehlervermeidung.",
        logos: ["/images/linux-lab-b.png"],
        previewScript: `# user_management.sh
if getent group "$GRUPPENNAME" > /dev/null 2>&1; then
    echo "Gruppe existiert bereits."
else
    sudo groupadd "$GRUPPENNAME"
fi
sudo useradd -m -s /bin/bash -g "$GRUPPENNAME" "$BENUTZERNAME"
sudo chmod 770 "/$BENUTZERNAME"
sudo chmod +t "/$BENUTZERNAME"`
    },
    {
        path: "/projekt/linux/lab-c",
        label: "Challenge Lab C: Log Archiving",
        description: "Systemadministration: Implementierung einer Log-Archivierungsstrategie mit tar. Umfasst Verzeichnismanagement, Pfadmanipulation und Backup-Verifizierung zur Sicherung kritischer Systemdaten.",
        logos: ["/images/linux-lab-c.png"],
        previewScript: `# log_backup.sh
mkdir ~/archive ~/backup
sudo tar -cvf ~/archive/log.tar -C /var/log $(cd /var/log && ls *.log)
tar -tf ~/archive/log.tar
tar -xvf ~/archive/log.tar -C ~/backup`
    },
    {
        path: "/projekt/linux/lab-d",
        label: "Challenge Lab D: Text Processing",
        description: "Datenanalyse-Pipeline: Extraktion von Systemdiensten aus /etc/services ohne Zwischendateien. Einsatz von grep, awk, sort und uniq zur Filterung und Aufbereitung von Rohdaten.",
        logos: ["/images/linux-lab-d.png"],
        previewScript: `# text_processing.sh
grep -v '^#' /etc/services | \\
grep -v '^$' | \\
awk '{print $1}' | \\
sort | uniq > uniqueservices.txt && \\
wc -l uniqueservices.txt`
    }
];

export const ciscoProjects: Project[] = [
    {
        path: "/projekt/cisco/lab-1-6-2",
        label: "Lab 1.6.2: Grundlegende Router-Einstellungen",
        description: "Initialkonfiguration eines Cisco 4321 Routers: Hostname, Banner, IPv4/IPv6-Adressierung und SSH-Zugriffssicherung im Packet Tracer Physical Mode.",
        logos: ["/images/cisco/lab-1.6.2.png"],
    },
    {
        path: "/projekt/cisco/lab-3-6-1",
        label: "Lab 3.6.1: VLANs und Trunking",
        description: "Cisco Packet Tracer Lab 3.6.1 - VLANs implementieren und Trunking konfigurieren mit drei Switches.",
        logos: ["/images/cisco/lab-3.6.1.png"],
    }
];

export const windowsModul1Projects: Project[] = [
    {
        path: "/projekt/windows/win10-upgrade",
        label: "Projekt 01: Windows Update (10 → 11)",
        description: "Windows 10 auf Windows 11 upgraden ohne Datenverlust. Schritt-für-Schritt Dokumentation mit Screenshots, Logs und Lösungen für häufige Probleme.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/usmt-migration",
        label: "Projekt 02: Benutzerdaten Umzug",
        description: "Benutzerdaten und Programme sicher von Windows 10 zu Windows 11 migrieren. Professionelle Umzugsstrategie für Unternehmensumgebungen.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/golden-image",
        label: "Projekt 03: Golden Image & Sysprep",
        description: "Standardisiertes Windows 11 Master-Image (VHDX) erstellen, mit Sysprep generalisieren und für das Massen-Deployment vorbereiten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/deployment",
        label: "Projekt 04: Rapid Deployment & Provisioning",
        description: "Skalierbare Bereitstellung neuer virtueller Clients aus dem Golden Image — ohne manuelle OS-Installation, in unter 10 Minuten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
];

export const windowsModul2Projects: Project[] = [
    {
        path: "/projekt/windows/ad-setup",
        label: "Projekt 05: Active Directory Setup & Domain Join",
        description: "Active Directory auf Windows Server 2019 einrichten. Windows 11 Clients zur Unternehmensdomäne hinzufügen und zentralisiert verwalten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/netzwerk-infrastruktur",
        label: "Projekt 06: Zentrale Domäneninfrastruktur & DHCP",
        description: "DHCP, DNS, Domäne und Dateiserver aufbauen. Automatische Netzwerkkonfiguration und sichere Dateifreigaben für Abteilungen einrichten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/rbac-gpo",
        label: "Projekt 07: Identity & Access Management (IAM) im Active Directory",
        description: "Aufbau einer sauberen Abteilungsstruktur im Active Directory zur zentralen Verwaltung von Benutzern. Implementierung eines sicheren Zugriffskonzepts, bei dem Mitarbeiter automatisch genau die Netzlaufwerke und Rechte erhalten, die sie für ihre Arbeit benötigen.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/client-hardening",
        label: "Projekt 08: Zentrales Endpoint Hardening & Security Management",
        description: "Client-PCs absichern: USB-Sperre, Bildschirmsperre, Kommandozeile blockieren. Unternehmenslogo und Sicherheitsrichtlinien einrichten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/storage-management",
        label: "Projekt 09: Enterprise Storage Management & Data Protection (FSRM & VSS)",
        description: "File Screening, Quotas (2GB) und DSGVO-konforme Datensicherheit mit Self-Service Wiederherstellung via Schattenkopien.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    }
];

export const windowsModul3Parts: Project[] = [
    {
        path: "/projekt/windows/modul-3",
        label: "Modul 3: Hybrid Identity & Azure — Übersicht",
        description: "Gesamtübersicht des 5-teiligen Hybrid-Identity-Projekts mit Entra ID, AD CS, LAPS und Cloud Sync.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-3/part-1",
        label: "Part 1: Infrastructure & Windows Admin Center",
        description: "Windows Server 2022 Umgebung aufbauen und Windows Admin Center für zentrales Remote-Management einrichten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/modul-3/part-2",
        label: "Part 2: Multi-Site Active Directory DS",
        description: "Zweiten Domain Controller für Stuttgart aufbauen, AD Sites & Services konfigurieren und Replikation validieren.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/modul-3/part-3",
        label: "Part 3: PKI & LDAPS",
        description: "Interne Certificate Authority aufbauen, LDAPS aktivieren und Zertifikate per GPO ausrollen.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/modul-3/part-4",
        label: "Part 4: LAPS & Endpoint Hardening",
        description: "Windows LAPS für automatisches Passwort-Management einrichten und Security-Baselines per GPO durchsetzen.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg"],
    },
    {
        path: "/projekt/windows/modul-3/part-5",
        label: "Part 5: Entra Cloud Sync",
        description: "Hybrid Identity aufbauen: On-Premises AD mit Microsoft Entra ID über den Cloud Sync Agent synchronisieren.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
];

export const windowsModul4Parts: Project[] = [
    {
        path: "/projekt/windows/modul-4",
        label: "Modul 4: Cloud Security & Compliance — Übersicht",
        description: "Gesamtübersicht des 5-teiligen Cloud-Security-Projekts mit Intune, Conditional Access, PIM, Defender und Sentinel.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-4/part-1",
        label: "Part 1: Microsoft Intune & MDM",
        description: "Geräte-Enrollment via Autopilot, Compliance Policies und App-Deployment für alle Unternehmensgeräte.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-4/part-2",
        label: "Part 2: Conditional Access & MFA",
        description: "Zero-Trust-Identitätsabsicherung: Zugriff nur aus konformen Geräten und definierten Standorten.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-4/part-3",
        label: "Part 3: Privileged Identity Management (PIM)",
        description: "Just-In-Time-Zugriff auf privilegierte Azure-Rollen mit Genehmigungsworkflow.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-4/part-4",
        label: "Part 4: Microsoft Defender for Endpoint",
        description: "EDR-Lösung für alle Unternehmensgeräte — ASR, EDR und Threat & Vulnerability Management.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
    {
        path: "/projekt/windows/modul-4/part-5",
        label: "Part 5: Microsoft Sentinel & SIEM",
        description: "Cloud-natives SIEM mit Log Analytics, Analytics Rules, Playbooks und Threat Hunting mit KQL.",
        logos: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"],
    },
];

export const windowsProjects: Project[] = [...windowsModul1Projects, ...windowsModul2Projects];

// ============================================
// CATEGORY GROUPINGS (for navigation)
// ============================================

export const homelabProjects: Project[] = featuredProjects.filter(p =>
    ["/projekt/home-server", "/projekt/home-assistant", "/projekt/web-server", "/projekt/web-hosting", "/projekt/ssd-upgrade"].includes(p.path)
);

export const cloudSecurityProjects: Project[] = featuredProjects.filter(p =>
    p.path === "/projekt/openvpn-gateway"
);

export const opnsenseParts: Project[] = [
    {
        path: "/projekt/security/opnsense",
        label: "Projektübersicht  Enterprise Security Lab",
        description: "Gesamtübersicht über das 6-teilige Enterprise Security Lab mit OPNsense.",
        logos: ["https://api.iconify.design/lucide/cloud.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-1",
        label: "Part 1  Netzwerk-Aufbau & Virtualisierung",
        description: "Physische Infrastruktur und Proxmox-Virtualisierung als Fundament für das Enterprise Security Lab.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/proxmox.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-2",
        label: "Part 2 — OPNsense Firewall Anwendungen",
        description: "OPNsense als virtuelle Firewall-Appliance installieren und optimieren.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/opnsense.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-3",
        label: "Part 3  VLAN-Segmentierung & Firewall-Regeln",
        description: "Netzwerksegmentierung mit VLANs und Zero-Trust Firewall-ACLs.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/unifi.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-4",
        label: "Part 4  IDS/IPS mit Suricata",
        description: "Intrusion Detection und Prevention System mit Suricata.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/wazuh.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-5",
        label: "Part 5 — DNS & Reverse Proxy",
        description: "Unbound DNS und Nginx Reverse Proxy Konfiguration.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/nginx.svg"]
    },
    {
        path: "/projekt/security/opnsense/part-6",
        label: "Part 6  VPN & Bastion Host",
        description: "Sicherer Fernzugriff per WireGuard und Out-of-Band Bastion Host.",
        logos: ["https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/wireguard.svg"]
    },
];

// Tüm proje sayısı (StatCard sayacı için)
export const totalProjectCount = [
    ...ciscoProjects,
    ...linuxProjects,
    ...windowsModul1Projects,
    ...windowsModul2Projects,
    ...windowsModul3Parts,
    ...windowsModul4Parts,
    ...cloudSecurityProjects,
    ...homelabProjects,
    ...opnsenseParts,
].length;

// Tooltip'te gösterilen 10 öne çıkan proje
export const projects: string[] = [
    "OPNsense Enterprise Firewall Lab",
    "Proxmox Virtualization Environment",
    "Wazuh SIEM Deployment",
    "Zero-Trust Network Design",
    "WireGuard Site-to-Site VPN",
    "Automated Docker Infrastructure",
    "Nginx Reverse Proxy & SSL Gateway",
    "Monitoring Stack (Grafana & Prometheus)",
    "Active Directory Integration",
    "OpenVPN Gateway & Defense-in-Depth",
];

export const portfolioCategories = {
    featured: featuredProjects,
    windows: windowsProjects,
    windowsModul1: windowsModul1Projects,
    windowsModul2: windowsModul2Projects,
    windowsModul3: windowsModul3Parts,
    windowsModul4: windowsModul4Parts,
    linux: linuxProjects,
    cisco: ciscoProjects,
    homelab: homelabProjects,
    cloudSecurity: cloudSecurityProjects,
    opnsenseParts,
};
