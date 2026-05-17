import { Link } from "react-router-dom";

const C = "#0078D4";
const AZ = "#00BCF2";

const parts = [
    { id: 1, label: "01 Trusts & Sites", path: "/projekt/windows/modul-5/part-1" },
];

const Modul5PartRuler = ({ currentPart }: { currentPart: number }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {parts.map((p) => {
                const isActive = p.id === currentPart;
                return isActive ? (
                    <span
                        key={p.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold"
                        style={{ background: C, color: "#fff" }}
                    >
                        {p.label}
                    </span>
                ) : (
                    <Link
                        key={p.id}
                        to={p.path}
                        className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium transition-colors"
                        style={{ border: `1px solid ${C}40`, color: `${AZ}99` }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = `${C}20`;
                            (e.currentTarget as HTMLElement).style.color = AZ;
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = `${AZ}99`;
                        }}
                    >
                        {p.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default Modul5PartRuler;
