import { motion } from "framer-motion";

const FileCard = ({ file }) => {
  const ext = file.name.split(".").pop().toLowerCase();

  const extConfig = {
    pdf: { bg: "var(--file-red-bg)", color: "#dc2626", label: "PDF" },
    md: { bg: "#f0fdf4", color: "#16a34a", label: "MD" },
    txt: { bg: "#f0f9ff", color: "#0284c7", label: "TXT" },
  };

  const config = extConfig[ext] || { bg: "var(--surface-2)", color: "var(--text-muted)", label: ext.toUpperCase() };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "18px",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Icon + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            background: config.bg,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
              fill={config.bg === "var(--file-red-bg)" ? "#fecaca" : config.bg}
              stroke={config.color}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <polyline points="14 2 14 8 20 8" stroke={config.color} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: config.color,
            background: config.bg,
            padding: "2px 7px",
            borderRadius: "20px",
            letterSpacing: "0.04em",
            border: `1px solid ${config.color}22`,
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 500,
          fontSize: "13px",
          color: "var(--text-primary)",
          wordBreak: "break-word",
          lineHeight: "1.4",
          flex: 1,
        }}
      >
        {file.name}
      </div>

      {/* Download button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => window.open(file.download_url, "_blank")}
        style={{
          width: "100%",
          padding: "8px",
          background: "var(--text-primary)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-sm)",
          fontSize: "12.5px",
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          fontFamily: "'DM Sans', sans-serif",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download
      </motion.button>
    </motion.div>
  );
};

export default FileCard;