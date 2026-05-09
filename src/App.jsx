import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import FolderCard from "./components/FolderCard";
import FileCard from "./components/FileCard";
import Breadcrumbs from "./components/Breadcrumbs";

import {
  fetchContents,
  fetchAllContents,
} from "./services/githubApi";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

function App() {
  const [contents, setContents] = useState([]);
  const [allContents, setAllContents] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch current folder
  const fetchAndShow = async (path = "") => {
    setLoading(true);

    const data = await fetchContents(path);

    setContents(data);
    setCurrentPath(path);

    setLoading(false);
  };

  // Navigation with browser history
  const loadContents = async (path = "") => {
    const url = path
      ? `?path=${encodeURIComponent(path)}`
      : "/";

    window.history.pushState({ path }, "", url);

    await fetchAndShow(path);
  };

  useEffect(() => {
    // Load current URL path
    const params = new URLSearchParams(window.location.search);

    const initialPath = params.get("path") || "";

    fetchAndShow(initialPath);

    // Browser back/forward support
    const handlePopState = (e) => {
      const path = e.state?.path ?? "";

      fetchAndShow(path);
    };

    window.addEventListener("popstate", handlePopState);

    // GLOBAL SEARCH DATA
    const loadAllData = async () => {
      const allData = await fetchAllContents();

      setAllContents(allData);
    };

    loadAllData();

    return () =>
      window.removeEventListener(
        "popstate",
        handlePopState
      );
  }, []);

  // GLOBAL SEARCH
  const filteredContents = searchTerm
    ? allContents.filter((item) =>
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : contents;

  const folders = filteredContents.filter(
    (item) => item.type === "dir"
  );

  const files = filteredContents.filter(
    (item) => item.type === "file"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main
        style={{
          flex: 1,
          padding: "36px 40px",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--accent-light)",
              color: "var(--accent)",
              fontSize: "11.5px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "20px",
              marginBottom: "10px",
              letterSpacing: "0.03em",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="6" />
            </svg>

            Live from GitHub
          </div>

          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            GitHub Notes Explorer
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              marginTop: "6px",
              lineHeight: 1.5,
            }}
          >
            Browse and download notes directly from the repository.
          </p>
        </div>

        {/* Breadcrumbs */}
        {!searchTerm && (
          <Breadcrumbs
            currentPath={currentPath}
            navigateTo={loadContents}
          />
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "80px",
                gap: "14px",
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  border: "2.5px solid var(--border)",
                  borderTopColor: "var(--accent)",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />

              <span style={{ fontSize: "13.5px" }}>
                Loading contents…
              </span>

              <style>
                {`
                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}
              </style>
            </motion.div>
          ) : (
            <motion.div
              key={currentPath}
              initial="hidden"
              animate="show"
              variants={container}
            >
              {/* Folders */}
              {folders.length > 0 && (
                <div style={{ marginBottom: "32px" }}>
                  <SectionLabel
                    icon="📁"
                    label={
                      searchTerm
                        ? "Matching Folders"
                        : "Folders"
                    }
                    count={folders.length}
                  />

                  <motion.div
                    variants={container}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "14px",
                      marginTop: "12px",
                    }}
                  >
                    {folders.map((folder) => (
                      <motion.div
                        key={folder.path}
                        variants={item}
                      >
                        <FolderCard
                          folder={folder}
                          onClick={loadContents}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Files */}
              {files.length > 0 && (
                <div>
                  <SectionLabel
                    icon="📄"
                    label={
                      searchTerm
                        ? "Matching Files"
                        : "Files"
                    }
                    count={files.length}
                  />

                  <motion.div
                    variants={container}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "14px",
                      marginTop: "12px",
                    }}
                  >
                    {files.map((file) => (
                      <motion.div
                        key={file.path}
                        variants={item}
                      >
                        <FileCard file={file} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Empty State */}
              {folders.length === 0 &&
                files.length === 0 && (
                  <motion.div
                    variants={item}
                    style={{
                      textAlign: "center",
                      paddingTop: "72px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "36px",
                        marginBottom: "12px",
                      }}
                    >
                      🔍
                    </div>

                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Nothing found
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        marginTop: "4px",
                      }}
                    >
                      Try adjusting your search term.
                    </div>
                  </motion.div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const SectionLabel = ({
  icon,
  label,
  count,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <span style={{ fontSize: "13px" }}>
      {icon}
    </span>

    <span
      style={{
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        color: "var(--text-primary)",
      }}
    >
      {label}
    </span>

    <span
      style={{
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--text-muted)",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        padding: "1px 7px",
        borderRadius: "20px",
      }}
    >
      {count}
    </span>
  </div>
);

export default App;