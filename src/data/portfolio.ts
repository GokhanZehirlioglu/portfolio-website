
export const techLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure", title: "Microsoft Azure" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", alt: "Linux", title: "Linux" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg", alt: "Cisco", title: "Cisco" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", title: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", alt: "Raspberry Pi", title: "Raspberry Pi" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare", title: "Cloudflare" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/home-assistant.svg", alt: "Home Assistant", title: "Home Assistant" },
    { src: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/zigbee2mqtt.svg", alt: "Zigbee", title: "Zigbee" },
];

export const certificates = [
    "MS Azure Administrator (AZ-104)",
    "MS Windows Server 2022 & Powershell",
    "Linux Essentials",
    "ITIL v4 Foundation",
];

export const badges = [
    "CCNA: Introduction to Networks",
    "Cisco Networking Basics",
    "Cisco Operating Systems Support",
    "Cisco Security and Connectivity Support",
    "Cisco Introduction to IoT",
    "Industrial Networking Essentials",
    "Industrial Cybersecurity Essential",
    "Linux Unhatched",
];

export const featuredProjects = [
    {
        path: "/projekt/home-server",
        label: "Home Server & Infrastruktur Einrichten (Docker-Basis)",
        description: "Zentralisiertes Heimnetzwerk mit Raspberry Pi 5 und Docker Containern.",
        // Two logos: Raspberry Pi + Docker
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
        path: "/projekt/switching-vlan-einrichten",
        label: "Switching Layer 2 VLAN & Netz-Segmentierung",
        description: "Netzwerksegmentierung und VLAN Konfiguration für erhöhte Sicherheit.",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" // Cisco usually fits switching well
        ]
    },
];

export const linuxProjects = [
    {
        path: "/projekt/linux/user-management-lab",
        label: "Challenge Lab A: User Management",
        description: "Linux Administrator Projekt: Implementierung eines sicheren Multi-User-Systems mit Fokus auf Benutzerverwaltung (useradd/groupadd), Berechtigungskonfiguration (chmod/chown/Sticky Bit), und Security-Härtung für isolierte Abteilungsstrukturen.",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg"
        ],
        previewScript: `# quick-preview.sh
sudo groupadd produktion
sudo useradd -m -s /bin/bash -g produktion prod_admin
sudo chmod 770 /produktion
sudo chmod +t /produktion
ls -ld /produktion  # drwxrwx--T`
    },
    {
        path: "#", // Placeholder
        label: "Challenge Lab B: [Coming Soon]",
        description: "Projektstruktur wird erstellt. Fortsetzung folgt...",
        logos: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
        ],
        previewScript: `# Future Lab Preview
sudo systemctl status firewalld
sudo ufw allow 22/tcp
# Network Hardening...`
    }
];

// Keep for compatibility
export const projects = featuredProjects.map(p => p.label);
