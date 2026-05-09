import { FaBookOpen, FaBolt, FaFolder, FaFilePdf } from "react-icons/fa";

const Sidebar = ({ searchTerm, setSearchTerm }) => {
  const features = [
    { icon: <FaBolt size={13} />, label: "Dynamic GitHub Fetching" },
    { icon: <FaFolder size={13} />, label: "Folder Navigation" },
    { icon: <FaFilePdf size={13} />, label: "Direct PDF Download" },
  ];

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        padding: "28px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "var(--text-primary)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <FaBookOpen size={17} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: "17px",
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            NoteSphere
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "1px" }}>
            GitHub Explorer
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 12px 9px 36px",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontSize: "13.5px",
            color: "var(--text-primary)",
            outline: "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* Features */}
      <div>
        <div
          style={{
            fontSize: "10.5px",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Features
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            padding: "10px",
            background: "var(--surface-2)",
            borderRadius: "var(--radius-sm)",
            lineHeight: "1.5",
          }}
        >
          Browsing files directly from a GitHub repository.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;