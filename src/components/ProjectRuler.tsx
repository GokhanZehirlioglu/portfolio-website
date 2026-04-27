import { Link } from "react-router-dom";

export const windowProjectsData = [
  { id: 1, label: "01 Server Upgrade", path: "/projekt/windows/win10-upgrade" },
  { id: 2, label: "02 Migration", path: "/projekt/windows/usmt-migration" },
  { id: 3, label: "03 Golden Image", isGeplant: true },
  { id: 4, label: "04 Deployment", isGeplant: true },
  { id: 5, label: "05 Active Directory Setup", path: "/projekt/windows/ad-setup" },
  { id: 6, label: "06 Zentrale Domäneninfrastruktur", path: "/projekt/windows/netzwerk-infrastruktur" },
  { id: 7, label: "07 Rollenbasierte Zugriffskontrolle", path: "/projekt/windows/rbac-gpo" },
  { id: 8, label: "08 Client-Hardening", path: "/projekt/windows/client-hardening" },
  { id: 9, label: "09 Storage Mngt", path: "/projekt/windows/storage-management" },
];

export default function ProjectRuler({ currentId }: { currentId: number }) {
  // Determine a sliding window of exactly 5 items (2 before, current, 2 after) if possible.
  let startIdx = currentId - 3; // -3 because array is 0-indexed, so currentId 5 -> index 4. start = 4 - 2 = 2. Yes: currentId - 1 - 2.
  let endIdx = currentId + 2;   // index 4 + 2 + 1 to include. So 4 + 3 = 7. Yes: currentId + 2.

  if (startIdx < 0) {
    endIdx += Math.abs(startIdx);
    startIdx = 0;
  }
  if (endIdx > windowProjectsData.length) {
    startIdx -= (endIdx - windowProjectsData.length);
    endIdx = windowProjectsData.length;
  }
  startIdx = Math.max(0, startIdx);

  const displayItems = windowProjectsData.slice(startIdx, endIdx);

  return (
    <nav className="flex gap-2 flex-wrap mt-2">
      {displayItems.map((p) => {
        const isActive = p.id === currentId;
        const isGeplant = p.isGeplant;

        // Active Item
        if (isActive) {
          return (
            <span
              key={p.id}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-sm"
              style={{
                background: "#0078D4",
                borderColor: "#0078D4",
                color: "#fff",
              }}
            >
              {p.label}
            </span>
          );
        }

        // Planned Item
        if (isGeplant) {
          return (
            <span
              key={p.id}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium border"
              style={{
                background: "transparent",
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.4)",
                cursor: "not-allowed",
              }}
              title="Dieses Projekt ist noch in Planung"
            >
              {p.label} (Geplant)
            </span>
          );
        }

        // Clickable Link
        return (
          <Link
            key={p.id}
            to={p.path!}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:bg-white/10"
            style={{
              background: "transparent",
              borderColor: "rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
            }}
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}
