import { Building2, MapPin, Users } from "lucide-react";

interface ScenarioOverviewProps {
    compact?: boolean;
}

const locations = [
    {
        city: "Mannheim",
        role: "Hauptsitz (HQ)",
        employees: "~150 Mitarbeiter",
        systems: "Primary DC, WAC, CA",
        color: "#0078D4",
        badge: "HQ",
    },
    {
        city: "Stuttgart",
        role: "Niederlassung",
        employees: "~60 Mitarbeiter",
        systems: "Secondary DC, RODC",
        color: "#00BCF2",
        badge: "Branch",
    },
    {
        city: "München",
        role: "Niederlassung",
        employees: "~40 Mitarbeiter",
        systems: "Entra Cloud Sync, VPN",
        color: "#00BCF2",
        badge: "Branch",
    },
];

const ScenarioOverview = ({ compact = false }: ScenarioOverviewProps) => {
    return (
        <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: "linear-gradient(135deg, #0D1A2D 0%, #0A1628 100%)", borderColor: "#0078D430" }}
        >
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: "#0078D420", background: "#0078D410" }}>
                <Building2 size={18} style={{ color: "#0078D4" }} />
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0078D4" }}>Scenario</span>
                    <h3 className="text-base font-bold text-white leading-tight">Rhein-Neckar Solutions GmbH</h3>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#0078D420", color: "#00BCF2", border: "1px solid #0078D430" }}>
                        ~250 Mitarbeiter
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#0078D420", color: "#00BCF2", border: "1px solid #0078D430" }}>
                        3 Standorte
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {!compact && (
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">
                        Ein mittelständisches IT-Dienstleistungsunternehmen mit drei Standorten in der Metropolregion Rhein-Neckar.
                        Das Unternehmen betreibt eine klassische On-Premises Windows-Infrastruktur und steht vor der Aufgabe,
                        eine <strong className="text-slate-200">Hybrid Identity</strong>-Architektur mit Azure Entra ID aufzubauen.
                    </p>
                )}

                {/* Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {locations.map((loc) => (
                        <div
                            key={loc.city}
                            className="rounded-xl p-4 border"
                            style={{ background: "#0D1A2D", borderColor: `${loc.color}25` }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={13} style={{ color: loc.color }} />
                                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: loc.color }}>
                                    {loc.badge}
                                </span>
                            </div>
                            <p className="text-base font-bold text-white mb-0.5">{loc.city}</p>
                            <p className="text-[11px] text-slate-500 mb-2">{loc.role}</p>
                            <div className="flex items-center gap-1.5 mb-1">
                                <Users size={11} className="text-slate-600" />
                                <span className="text-[11px] text-slate-500">{loc.employees}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 mt-2 pt-2 border-t" style={{ borderColor: "#ffffff10" }}>
                                {loc.systems}
                            </div>
                        </div>
                    ))}
                </div>

                {!compact && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Betriebssystem", value: "Windows Server 2022" },
                            { label: "Verzeichnisdienst", value: "Active Directory DS" },
                            { label: "Cloud", value: "Microsoft Entra ID" },
                            { label: "Virtualisierung", value: "Hyper-V / Remote Desktop" },
                        ].map((item) => (
                            <div key={item.label} className="rounded-lg p-3 border" style={{ background: "#081422", borderColor: "#0078D415" }}>
                                <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">{item.label}</p>
                                <p className="text-xs font-semibold text-slate-300">{item.value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScenarioOverview;
