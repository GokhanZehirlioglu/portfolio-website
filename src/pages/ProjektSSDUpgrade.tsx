import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import {
  Calendar,
  Server as ServerIcon,
  CheckCircle2,
  ArrowRight,
  FileText,
  Download,
  Terminal,
  ShieldCheck,
  Activity,
  Zap,
  Maximize2,
  HardDrive,
  Cpu,
  Fan,
  Thermometer,
  Monitor,
  Gauge,
  Copy,
  Wrench
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PROJEKT: Raspberry Pi 5 – SSD Upgrade & Pironman 5 MAX
   THEME:   Ice Blue / Cyan (#06b6d4) - Cooling & Tech
   ═══════════════════════════════════════════════════════════════ */

const ProjektSSDUpgrade = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setZoomedImage(null), []);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // ─── PROJEKT-STATISTIKEN ───
  const stats = [
    { icon: Calendar, label: "Zeitraum", value: "02.2026" },
    { icon: ServerIcon, label: "Hardware", value: "Raspberry Pi 5 (16 GB)" },
    { icon: HardDrive, label: "Speicher", value: "512 GB NVMe SSD" },
    { icon: CheckCircle2, label: "Status", value: "Abgeschlossen", highlight: true },
  ];

  // ─── TECH STACK ───
  const techStack = [
    { icon: "https://upload.wikimedia.org/wikipedia/commons/2/23/Kingston_Technology_logo.svg", title: "Kingston", desc: "NVMe PCIe Gen 3 SSD" },
    { icon: "https://pironman.com/wp-content/uploads/2022/07/cropped-pironman-logo-1.png", title: "Pironman 5 MAX", desc: "Aluminium NVMe Case" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", title: "Raspberry Pi 5", desc: "16 GB RAM Modell" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", title: "Linux Kernel", desc: "6.x (aarch64)" },
  ];

  // ─── HARDWARE SPECS ───
  const hardwareSpecs = [
    { label: "SoC", value: "BCM2712 (ARM Cortex-A76, Quad-Core)" },
    { label: "RAM", value: "16 GB LPDDR4X" },
    { label: "Speicher (Neu)", value: "512 GB NVMe M.2 SSD (PCIe Gen 2)" },
    { label: "Speicher (Alt)", value: "Micro-SD-Karte (32 GB)" },
    { label: "Gehäuse", value: "Pironman 5 MAX (Aluminium)" },
    { label: "Kühlung", value: "PWM Tower-Kühler + 2× RGB-Lüfter" },
    { label: "Display", value: "0,96\" OLED (I²C, Vibrationssensor)" },
    { label: "Netzteil", value: "27W USB-C PD (5V / 5A)" },
  ];

  // ─── KÜHLSYSTEM-TABELLE ───
  const coolingTable = [
    { temp: "< 50°C", speed: "0%", label: "Aus", color: "text-cyan-500" },
    { temp: "50°C", speed: "30%", label: "Niedrig", color: "text-sky-400" },
    { temp: "60°C", speed: "50%", label: "Mittel", color: "text-blue-500" },
    { temp: "67,5°C", speed: "70%", label: "Hoch", color: "text-indigo-500" },
    { temp: "≥ 75°C", speed: "100%", label: "Maximum", color: "text-purple-600" },
  ];

  // ─── GPIO-FAN-MODI ───
  const fanModes = [
    { mode: "Always On", value: "0", temp: "Immer aktiv", icon: "🔊" },
    { mode: "Performance", value: "1", temp: "50°C", icon: "🚀" },
    { mode: "Cool", value: "2", temp: "60°C", icon: "❄️" },
    { mode: "Balanced", value: "3", temp: "67,5°C", icon: "⚖️" },
    { mode: "Quiet", value: "4", temp: "70°C", icon: "🔇" },
  ];

  // ─── IMPLEMENTIERUNGSPHASEN ───
  const phases = [
    {
      num: "01",
      title: "System aktualisieren & Backup",
      desc: "Firmware und Kernel aktualisieren, vollständiges Backup der Micro-SD-Karte erstellen.",
      commands: [
        "sudo apt update && sudo apt full-upgrade -y",
        "sudo rpi-eeprom-update -a",
        "sudo dd if=/dev/mmcblk0 of=/mnt/usb/pi5_backup.img bs=4M status=progress",
      ],
      verify: "sha256sum /mnt/usb/pi5_backup.img",
    },
    {
      num: "02",
      title: "EEPROM konfigurieren & PCIe aktivieren",
      desc: "POWER_OFF_ON_HALT aktivieren, Boot-Reihenfolge auf NVMe setzen, PCIe-Schnittstelle einschalten.",
      commands: [
        "sudo rpi-eeprom-config -e",
        "# POWER_OFF_ON_HALT=1 | BOOT_ORDER=0xf416",
        "echo 'dtparam=pciex1' | sudo tee -a /boot/firmware/config.txt",
        "sudo reboot",
      ],
      verify: "lspci   # NVMe-Controller muss sichtbar sein",
    },
    {
      num: "03",
      title: "System auf NVMe SSD klonen",
      desc: "Micro-SD blockweise auf die NVMe SSD kopieren und Partitionen verifizieren.",
      commands: [
        "lsblk   # Geräte identifizieren",
        "sudo dd if=/dev/mmcblk0 of=/dev/nvme0n1 bs=4M status=progress",
        "sync",
      ],
      verify: "lsblk   # nvme0n1p1 + nvme0n1p2 müssen existieren",
    },
    {
      num: "04",
      title: "UUIDs & Boot-Konfiguration anpassen",
      desc: "cmdline.txt und /etc/fstab auf der SSD mit den korrekten NVMe-UUIDs aktualisieren.",
      commands: [
        "sudo blkid   # UUIDs notieren",
        "sudo mount /dev/nvme0n1p1 /mnt",
        "sudo nano /mnt/cmdline.txt   # root=UUID=<NVMe-UUID>",
        "sudo mount /dev/nvme0n1p2 /mnt",
        "sudo nano /mnt/etc/fstab   # NVMe-UUIDs eintragen",
      ],
      verify: "cat /mnt/cmdline.txt | grep nvme",
    },
    {
      num: "05",
      title: "SSD-Boot verifizieren & Partition erweitern",
      desc: "SD-Karte entfernen, von SSD booten, Root-Partition auf volle 512 GB erweitern.",
      commands: [
        "# SD-Karte entfernen → Pi einschalten",
        "mount | grep 'on / '   # Muss nvme0n1p2 zeigen",
        "sudo raspi-config   # Advanced → Expand Filesystem",
        "sudo reboot",
      ],
      verify: "df -h   # Root ~ 468 GB",
    },
    {
      num: "06",
      title: "Pironman 5 MAX Software installieren",
      desc: "OLED, RGB-LEDs und Lüftersteuerung über das offizielle SunFounder-Repository einrichten.",
      commands: [
        "sudo apt-get install git python3 python3-pip python3-setuptools -y",
        "cd ~ && git clone -b max https://github.com/sunfounder/pironman5.git --depth 1",
        "cd ~/pironman5 && sudo python3 install.py",
        "sudo reboot",
      ],
      verify: "sudo systemctl status pironman5.service   # active (running)",
    },
    {
      num: "07",
      title: "Lüfter & RGB-LEDs konfigurieren",
      desc: "GPIO-Lüfter-Modus, RGB-Farben und OLED-Einstellungen über CLI anpassen.",
      commands: [
        "pironman5 -gm 3   # Balanced-Modus (67,5°C)",
        "pironman5 -rc 0a1aff -rb 50 -rs breathing",
        "pironman5 -oe true -os 60",
        "sudo systemctl restart pironman5.service",
      ],
      verify: "pironman5 -c   # Konfiguration prüfen",
    },
  ];

  // ─── VORHER/NACHHER ───
  const beforeAfter = [
    { label: "Boot-Medium", before: "Micro-SD-Karte (32 GB)", after: "NVMe M.2 SSD (512 GB)" },
    { label: "Seq. Lesen", before: "~45 MB/s", after: "~450 MB/s" },
    { label: "Seq. Schreiben", before: "~30 MB/s", after: "~400 MB/s" },
    { label: "Gehäuse", before: "Einfaches Kunststoffgehäuse", after: "Pironman 5 MAX (Aluminium)" },
    { label: "Kühlung", before: "Passiv (kein Lüfter)", after: "PWM Tower-Kühler + 2× RGB-Lüfter" },
    { label: "Monitoring", before: "Nur SSH / CLI", after: "OLED + Web-Dashboard (:34001)" },
    { label: "Idle-Temperatur", before: "~55°C", after: "~39°C" },
  ];

  // ─── Klickbares Bild ───
  const ClickableImage = ({ src, alt, caption, className = "" }: { src: string; alt: string; caption?: string; className?: string }) => (
    <div className="group relative cursor-zoom-in" onClick={() => setZoomedImage(src)}>
      <div className={`rounded - xl overflow - hidden shadow - lg border border - white / 10 transition - all duration - 300 group - hover: shadow - 2xl group - hover: scale - [1.02] ${className} `}>
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs font-medium">{caption}</p>
          </div>
        )}
        <Maximize2 size={14} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
      </div>
    </div>
  );

  // ─── Terminal-Screenshot ───
  const TerminalImage = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
    <div
      className="relative group rounded-xl overflow-hidden shadow-[0_0_30px_-10px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 bg-[#1a1b26] cursor-zoom-in transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
      onClick={() => setZoomedImage(src)}
    >
      <div className="bg-[#24283b] px-4 py-2.5 flex items-center gap-4 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 text-xs text-center font-mono text-slate-400 flex items-center justify-center gap-2">
          <Terminal size={12} />
          <span>{title}</span>
        </div>
        <Maximize2 size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto" />
    </div>
  );

  return (
    <Layout>
      <Helmet>
        <title>SSD Upgrade – Gökhan Zehirlioglu</title>
        <meta name="description" content="Raspberry Pi 5 SSD Upgrade: Migration auf NVMe SSD im Pironman 5 MAX Gehäuse mit intelligentem Kühlsystem." />
        <meta property="og:title" content="SSD Upgrade – Gökhan Zehirlioglu" />
        <meta property="og:description" content="Raspberry Pi 5 SSD Upgrade: Migration auf NVMe SSD im Pironman 5 MAX Gehäuse." />
        <meta property="og:type" content="article" />
      </Helmet>
      <Lightbox src={zoomedImage} onClose={closeLightbox} />


      {/* ══════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-cyan-500/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Hardware-Upgrade Projekt
          </div>

          <h1 className="flex flex-col items-center justify-center font-bold tracking-tight mb-8">
            <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-slate-700 dark:to-slate-300 pb-2">
              Raspberry Pi 5 – SSD Upgrade
            </span>
            <span className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium mt-2">
              Pironman 5 MAX &amp; NVMe-Migration
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Migration von Micro-SD auf eine 512 GB NVMe SSD im Pironman 5 MAX Aluminium-Gehäuse
            mit PWM-Kühlung, OLED-Display und Web-Dashboard.
          </p>

          {/* Dokument-Download */}
          <div className="flex justify-center mb-16">
            <a
              href="/Raspberry_Pi_5_SSD_Upgrade_Dokumentation.docx"
              download
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900 border border-cyan-500/30 hover:border-cyan-500 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="bg-cyan-500/10 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400">Technische Dokumentation</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">Projektbericht herunterladen (.DOCX)</span>
              </div>
              <Download className="w-5 h-5 ml-2 text-slate-400 group-hover:text-cyan-500 transition-colors" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass p-4 rounded-2xl border border-white/10 dark:border-white/5 hover:border-cyan-500/30 transition-colors duration-300">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-cyan-600 dark:text-cyan-400" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`font - bold text - lg ${stat.highlight ? "text-cyan-600 dark:text-cyan-400" : "text-foreground"} `}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          AUSGANGSLAGE & SPECS
          ══════════════════════════════════════════ */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400"><Zap size={24} /></span>
              Ausgangslage &amp; Zielsetzung
            </h2>

            <div className="prose dark:prose-invert text-muted-foreground leading-relaxed">
              <p className="mb-4">
                Der bestehende Raspberry Pi 5 (16 GB) lief auf einer <strong>Micro-SD-Karte</strong>, die sowohl
                in der I/O-Geschwindigkeit als auch in der Langzeitstabilität deutliche Grenzen aufwies.
                Bei intensiven Schreibvorgängen (Docker-Container, Datenbanken, Logs) zeigten sich
                zunehmend Engpässe, die den produktiven Dauerbetrieb beeinträchtigten.
              </p>
              <p>
                Ziel des Upgrades war die <strong>vollständige Migration auf NVMe SSD-Speicher</strong> über
                den integrierten PCIe-Slot des Pironman 5 MAX Gehäuses. Gleichzeitig sollte das
                <strong> intelligente Kühlsystem</strong>, das <strong>OLED-Display</strong> und
                das <strong>Web-Dashboard</strong> eingerichtet werden.
              </p>
            </div>

            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span><strong>Performance:</strong> ~10× schnellere Lese-/Schreibgeschwindigkeit.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span><strong>Zuverlässigkeit:</strong> SSD-Speicher für stabilen 24/7-Betrieb.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span><strong>Kühlung:</strong> Intelligentes 3-Stufen-Kühlsystem.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span><strong>Monitoring:</strong> OLED und Web-Dashboard auf Port 34001.</span>
              </li>
            </ul>
          </div>

          {/* Hardware Specs Card */}
          <div className="glass p-6 rounded-2xl border-amber-500/10 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden">
            <Cpu className="absolute -right-6 -bottom-6 w-32 h-32 text-amber-500/5 z-0" />
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <ServerIcon size={20} className="text-amber-600 dark:text-amber-400" />
              Hardware-Spezifikationen
            </h3>
            <div className="space-y-4 relative z-10">
              {hardwareSpecs.map((spec, index) => (
                <div key={index} className="flex justify-between items-center border-b border-amber-500/10 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-foreground text-sm text-right">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-8 justify-center relative z-10">
              {techStack.map((tech) => (
                <div key={tech.title} className="relative group flex flex-col items-center">
                  <img src={tech.icon} alt={tech.title} className="h-8 w-8 object-contain opacity-80 hover:opacity-100 transition-opacity" title={tech.title} />
                  <span className="text-[9px] text-muted-foreground mt-1">{tech.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          HARDWARE SHOWCASE – Pironman 5 MAX
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"><HardDrive size={28} /></span>
              Pironman 5 MAX – Hardware-Showcase
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium-Aluminium-Gehäuse mit integriertem Tower-Kühler, Dual-NVMe-Slots,
              OLED-Display und RGB-Beleuchtung.
            </p>
          </div>

          {/* Architekturdiagramm – Hauptbild */}
          <div className="mb-8">
            <ClickableImage
              src="/images/general_tower.png"
              alt="Pironman 5 MAX – Komponentenübersicht"
              caption="Pironman 5 MAX: OLED, PWM Tower Cooler, Dual NVMe PIP, RGB-Lüfter, Safe Shutdown, GPIO-Pins, IR Receiver"
              className="max-w-3xl mx-auto"
            />
          </div>

          {/* Eigene Fotos: Front + Rückseite */}
          <div className="grid md:grid-cols-2 gap-6">
            <ClickableImage
              src="/images/SSDUpgrade_case_1.png"
              alt="Pironman 5 MAX – Frontansicht mit OLED und Tower-Kühler"
              caption="Frontansicht: OLED-Display (CPU/RAM/Disk/Temp), Acryl-Seitenpanel, Power-Button"
            />
            <ClickableImage
              src="/images/SSDUpgrade_case_2.png"
              alt="Pironman 5 MAX – Rückansicht mit RGB-Lüftern und Anschlüssen"
              caption="Rückseite: 2× RGB-Lüfter, USB 2/3, Ethernet, Dual-HDMI, Power — 'Be Cool, Use Linux'"
            />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          HARDWARE-MONTAGE (3 Schritte)
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">Assembly-Prozess</span>
            <h2 className="text-3xl font-bold mt-2 mb-4 flex items-center justify-center gap-3">
              <Wrench size={28} className="text-cyan-600 dark:text-cyan-400" />
              Hardware-Montage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vom Unboxing über die Raspberry Pi Montage bis zum fertigen Mini-PC –
              dokumentiert in drei Schritten.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Schritt 1: Unboxing */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">01</div>
                <div>
                  <h3 className="font-bold">Unboxing &amp; Vorbereitung</h3>
                  <p className="text-xs text-muted-foreground">Alle Komponenten sortiert</p>
                </div>
              </div>
              <ClickableImage
                src="/images/installation1.jpeg"
                alt="Pironman 5 MAX – Lieferumfang und alle Komponenten"
                caption="Lieferumfang: Gehäuse, RGB-Lüfter, Schrauben, FPC-Kabel, OLED, Thermal Pads, Werkzeug"
              />
            </div>

            {/* Schritt 2: Board-Montage */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">02</div>
                <div>
                  <h3 className="font-bold">Raspberry Pi montieren</h3>
                  <p className="text-xs text-muted-foreground">Board in Gehäuse einsetzen</p>
                </div>
              </div>
              <ClickableImage
                src="/images/installation2.jpeg"
                alt="Raspberry Pi 5 auf Bodenplatte montiert"
                caption="Pi 5 auf Bodenplatte mit Anleitung — HDMI-Adapter, GPIO-Header und Montagelöcher sichtbar"
              />
            </div>

            {/* Schritt 3: NVMe + Tower Cooler */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-cyan-500/20">03</div>
                <div>
                  <h3 className="font-bold">NVMe &amp; Tower-Kühler</h3>
                  <p className="text-xs text-muted-foreground">SSD + Kühlung installieren</p>
                </div>
              </div>
              <ClickableImage
                src="/images/installation3.jpeg"
                alt="NVMe PIP-Modul und Tower-Kühler auf dem Raspberry Pi 5"
                caption="NVMe Dual-PIP-Modul mit FPC-Kabel, Thermal Pads und Tower-Kühler mit Heatpipes montiert"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          VORHER / NACHHER
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">Performance-Vergleich</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Vorher vs. Nachher</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Direkter Vergleich der System-Parameter vor und nach dem Hardware-Upgrade.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold">
              <div className="px-4 py-3 md:px-6">Eigenschaft</div>
              <div className="px-4 py-3 md:px-6 text-center">Vorher</div>
              <div className="px-4 py-3 md:px-6 text-center">Nachher</div>
            </div>
            {beforeAfter.map((row, i) => (
              <div key={i} className={`grid grid - cols - 3 text - sm ${i % 2 === 0 ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-800/50"} border - b border - slate - 100 dark: border - white / 5 last: border - 0`}>
                <div className="px-4 py-3 md:px-6 font-semibold text-foreground">{row.label}</div>
                <div className="px-4 py-3 md:px-6 text-center text-muted-foreground line-through decoration-red-400/50">{row.before}</div>
                <div className="px-4 py-3 md:px-6 text-center font-semibold text-cyan-700 dark:text-cyan-400">{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          KÜHLSYSTEM
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"><Fan size={28} /></span>
              Kühlsystem-Architektur
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dreistufiges Kühlkonzept: Unter Volllast bleibt die CPU bei ca. 39°C (bei 25°C Raumtemperatur).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10"><Fan className="w-7 h-7 text-cyan-600 dark:text-cyan-400" /></div>
                <div>
                  <h3 className="font-bold text-lg">PWM Tower-Kühler</h3>
                  <span className="text-xs text-muted-foreground">Primäre CPU-Kühlung</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">U-förmige Heatpipes mit Aluminium-Kühlrippen. Automatisch vom Pi System gesteuert (0–100%).</p>
              <div className="text-xs bg-cyan-500/5 rounded-lg p-3 border border-cyan-500/10">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">Hysterese:</span> 5°C — verhindert ständiges Schalten.
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10"><Activity className="w-7 h-7 text-cyan-600 dark:text-cyan-400" /></div>
                <div>
                  <h3 className="font-bold text-lg">2× RGB-Lüfter</h3>
                  <span className="text-xs text-muted-foreground">Sekundäre Gehäusebelüftung</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">GPIO-gesteuerte 5V-Lüfter an den Seitenpanels. 5 Modi von Always On bis Quiet.</p>
              <div className="text-xs bg-cyan-500/5 rounded-lg p-3 border border-cyan-500/10">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">GPIO-Pins:</span> Fan 1 → GPIO6 · Fan 2 → GPIO5
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-cyan-500/10"><Monitor className="w-7 h-7 text-cyan-600 dark:text-cyan-400" /></div>
                <div>
                  <h3 className="font-bold text-lg">OLED &amp; Dashboard</h3>
                  <span className="text-xs text-muted-foreground">Echtzeit-Monitoring</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">0,96" OLED zeigt CPU, RAM, Disk, Temperatur und IP. Web-Dashboard auf Port 34001.</p>
              <div className="text-xs bg-cyan-500/5 rounded-lg p-3 border border-cyan-500/10">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">Tap-to-Wake:</span> Vibrationssensor aktiviert Display.
              </div>
            </div>
          </div>

          {/* Temperaturkurve + Fan-Modi */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl overflow-hidden border border-white/10 dark:border-white/5">
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-600/10 to-transparent border-b border-cyan-500/10">
                <h3 className="font-bold flex items-center gap-2">
                  <Thermometer size={18} className="text-cyan-600 dark:text-cyan-400" />
                  PWM-Lüfter Temperaturkurve
                </h3>
              </div>
              <div className="p-4">
                {coolingTable.map((row, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <span className={`font - mono text - sm font - bold w - 16 ${row.color} `}>{row.temp}</span>
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700" style={{ width: row.speed }} />
                    </div>
                    <span className="text-sm font-semibold w-14 text-right">{row.speed}</span>
                    <span className="text-xs text-muted-foreground w-16 text-right">{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden border border-white/10 dark:border-white/5">
              <div className="px-6 py-4 bg-gradient-to-r from-cyan-600/10 to-transparent border-b border-cyan-500/10">
                <h3 className="font-bold flex items-center gap-2">
                  <Gauge size={18} className="text-cyan-600 dark:text-cyan-400" />
                  GPIO-Lüfter Modi
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Konfigurierbar über: <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">pironman5 -gm &lt;Wert&gt;</code></p>
              </div>
              <div className="p-4">
                {fanModes.map((fm, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-lg w-8">{fm.icon}</span>
                    <div className="flex-1">
                      <span className="font-semibold text-sm">{fm.mode}</span>
                      <span className="text-xs text-muted-foreground ml-2">({fm.temp})</span>
                    </div>
                    <code className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded text-xs font-mono">-gm {fm.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          IMPLEMENTIERUNG (7 PHASEN)
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">Software-Konfiguration</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Implementierung in 7 Phasen</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Von der Firmware-Aktualisierung über das Klonen des Betriebssystems bis zur
              Konfiguration des Kühlsystems.
            </p>
          </div>

          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <div key={idx} className="group relative">
                {idx < phases.length - 1 && (
                  <div className="absolute left-[27px] top-[72px] bottom-[-32px] w-px bg-gradient-to-b from-cyan-500/30 to-transparent hidden md:block" />
                )}

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                    {phase.num}
                  </div>

                  <div className="flex-1 glass rounded-2xl border border-white/10 dark:border-white/5 overflow-hidden hover:border-cyan-500/20 transition-colors duration-300">
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg font-bold mb-2">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{phase.desc}</p>

                      <div className="rounded-xl overflow-hidden bg-[#1a1b26] border border-white/5">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#24283b] border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono ml-2">Phase {phase.num}</span>
                          </div>
                          <button
                            type="button"
                            className="text-slate-500 hover:text-cyan-400 transition-colors p-1"
                            onClick={() => handleCopy(phase.commands.join("\n"), idx)}
                            title="Befehle kopieren"
                          >
                            {copiedIdx === idx ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div className="p-4 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
                          {phase.commands.map((cmd, ci) => (
                            <div key={ci} className="flex items-start gap-2">
                              {cmd.startsWith("#") ? (
                                <span className="text-slate-500">{cmd}</span>
                              ) : (
                                <>
                                  <span className="text-cyan-400 select-none">$</span>
                                  <span className="text-slate-300">{cmd}</span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-muted-foreground">Verifizierung:</span>
                        <code className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">{phase.verify}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          SYSTEM VALIDATION – Terminal Screenshots
          ══════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-cyan-500/10 p-3 rounded-full">
              <ShieldCheck className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">System Validation</h2>
              <p className="text-muted-foreground">Nachweis der erfolgreichen Migration — echte Terminal-Ausgaben vom Pi 5.</p>
            </div>
          </div>

          {/* Terminal Screenshots – Echte Nachweise */}
          <div className="space-y-6 mb-10">
            <TerminalImage
              src="/images/SSDUpgrade_lsblk.png"
              alt="lsblk – NVMe SSD als Boot-Medium"
              title="$ lsblk — nvme0n1 (465,8G) mit /boot/firmware und / als Mountpoints"
            />
            <TerminalImage
              src="/images/SSDUpgrade_dfh.png"
              alt="df -h – Speicherbelegung auf NVMe"
              title="$ df -h — /dev/nvme0n1p2 (29G, 83% belegt) als Root · /dev/nvme0n1p1 als /boot/firmware"
            />
            <TerminalImage
              src="/images/SSDUpgrade_service_status.png"
              alt="systemctl status pironman5.service"
              title="$ sudo systemctl status pironman5.service — active (running) seit 1 Tag 19h"
            />
          </div>

          {/* Erfolgskriterien */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {[
              "System bootet von NVMe SSD",
              "Root auf /dev/nvme0n1p2",
              "EEPROM: BOOT_ORDER=0xf416",
              "Pironman5-Service aktiv",
              "OLED zeigt CPU/RAM/Disk/IP",
              "RGB-LEDs im Breathing-Modus",
              "PWM-Lüfter regelt automatisch",
              "GPIO-Lüfter: Balanced-Modus",
              "Web-Dashboard auf :34001",
              "CPU-Temperatur < 40°C (Idle)",
              "Kein Datenverlust bei Migration",
              "System stabil nach 48h Betrieb",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.title} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-cyan-500/30 transition-colors">
                <img src={tech.icon} alt={tech.title} className="w-8 h-8 mb-2 opacity-80" />
                <span className="text-sm font-semibold text-center">{tech.title}</span>
                <span className="text-[10px] text-muted-foreground text-center">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FAZIT & AUSBLICK
          ══════════════════════════════════════════ */}

      <div className="text-center">
        <div className="inline-flex items-center gap-3 text-sm font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 px-6 py-3 rounded-full border border-amber-500/20">
          <span className="font-bold">Von SD-Karte zu NVMe — ein entscheidender Upgrade-Schritt</span>
          <ArrowRight size={16} />
        </div>
        <p className="text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
          Quelle: SunFounder Pironman 5 MAX Dokumentation · docs.sunfounder.com/projects/pironman5
        </p>
      </div>
    </Layout>
  );
};

export default ProjektSSDUpgrade;
