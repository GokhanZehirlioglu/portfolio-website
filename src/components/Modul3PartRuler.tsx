import { Link } from "react-router-dom";

const C = "#0078D4";

const modul3Parts = [
    { id: 1, label: "Part 1 — DC-Deployment & AD-Architektur",  path: "/projekt/windows/modul-3/part-1" },
    { id: 2, label: "Part 2 — PKI · LAPS · GPO Hardening",      path: "/projekt/windows/modul-3/part-2" },
    { id: 3, label: "Part 3 — Entra Tenant & Prov. Agent",      path: "/projekt/windows/modul-3/part-3" },
    { id: 4, label: "Part 4 — Cloud Sync & Validation",          path: "/projekt/windows/modul-3/part-4" },
    { id: 5, label: "Part 5 — Coming Soon",                      path: "/projekt/windows/modul-3/part-5" },
];

export default function Modul3PartRuler({ currentPart }: { currentPart: number }) {
    return (
        <nav className="flex gap-2 flex-wrap mt-2">
            {modul3Parts.map((p) => {
                const isActive = p.id === currentPart;
                return isActive ? (
                    <span
                        key={p.id}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-sm"
                        style={{ background: C, borderColor: C, color: "#fff" }}
                    >
                        {p.label}
                    </span>
                ) : (
                    <Link
                        key={p.id}
                        to={p.path}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:bg-white/10"
                        style={{ background: "transparent", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                    >
                        {p.label}
                    </Link>
                );
            })}
        </nav>
    );
}
