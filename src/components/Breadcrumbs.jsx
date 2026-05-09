const Breadcrumbs = ({ currentPath, navigateTo }) => {
  const paths = currentPath.split("/").filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "4px",
        marginBottom: "24px",
        padding: "10px 14px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        fontSize: "13px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Home icon + label */}
      <span
        onClick={() => navigateTo("")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
          color: paths.length === 0 ? "var(--text-primary)" : "var(--accent)",
          fontWeight: paths.length === 0 ? 500 : 400,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { if (paths.length > 0) e.currentTarget.style.color = "var(--accent-hover)"; }}
        onMouseLeave={(e) => { if (paths.length > 0) e.currentTarget.style.color = "var(--accent)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </span>

      {paths.map((part, index) => {
        const fullPath = paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;

        return (
          <span key={index} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span
              onClick={() => !isLast && navigateTo(fullPath)}
              style={{
                cursor: isLast ? "default" : "pointer",
                color: isLast ? "var(--text-primary)" : "var(--accent)",
                fontWeight: isLast ? 500 : 400,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { if (!isLast) e.currentTarget.style.color = "var(--accent-hover)"; }}
              onMouseLeave={(e) => { if (!isLast) e.currentTarget.style.color = "var(--accent)"; }}
            >
              {part}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;