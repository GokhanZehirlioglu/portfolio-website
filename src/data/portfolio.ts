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
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure", title: "Microsoft Azure" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux", title: "Linux" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", alt: "Cisco", title: "Cisco" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", title: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", alt: "Raspberry Pi", title: "Raspberry Pi" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare", title: "Cloudflare" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg", alt: "Home Assistant", title: "Home Assistant" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/zigbee2mqtt.svg", alt: "Zigbee", title: "Zigbee" },
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
        label: "Web-Server Einrichten (Ngnix)",
        description: "Konfiguration und Verwaltung eines Nginx Web Servers.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
        ]
    },
    {
        path: "/projekt/web-hosting",
        label: "Web-Hosting Einrichten (Cloudflare)",
        description: "Selfhosting-Lösungen und Cloudflare Integration.",
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

export const projects: string[] = featuredProjects.map(p => p.label);
