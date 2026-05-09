import { motion } from "framer-motion";

const FolderCard = ({ folder, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "var(--shadow-md)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(folder.path)}
      style={{
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "18px",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "42px",
          height: "42px",
          background: "var(--folder-bg)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"
            fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Name */}
      <div>
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "13.5px",
            color: "var(--text-primary)",
            wordBreak: "break-word",
            lineHeight: "1.4",
          }}
        >
          {folder.name}
        </div>
        <div
          style={{
            fontSize: "11.5px",
            color: "var(--text-muted)",
            marginTop: "3px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          Folder
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default FolderCard;