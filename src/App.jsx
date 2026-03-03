import React, { useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ScanDetail from "./pages/ScanDetail";
import Sidebar from "./components/Sidebar";
import { ToastContainer, Modal } from "./components/index";
import "./styles/App.css";

let toastId = 0;

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("login");
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [selectedScan, setSelectedScan] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const showToast = useCallback((message, type = "info") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const showModal = useCallback((config) => {
    setModal(config);
  }, []);

  const handleModalConfirm = () => {
    modal?.onConfirm?.();
    setModal(null);
  };

  const handleLogin = () => {
    setPage("dashboard");
    setActiveSidebar("dashboard");
  };

  const handleNavigate = (id) => {
    setActiveSidebar(id);
    if (id === "dashboard") setPage("dashboard");
    else if (id === "scans") {
      setPage("scan-detail");
    } else showToast(`Navigating to ${id}...`, "info");
    setSidebarOpen(false);
  };

  const handleScanClick = (scan) => {
    setSelectedScan(scan);
    setPage("scan-detail");
    setActiveSidebar("scans");
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  if (page === "login") {
    return (
      <div data-theme={theme}>
        <Login onLogin={handleLogin} />
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="app">
      {sidebarOpen && (
        <div
          className="app__sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activePage={activeSidebar}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        className={sidebarOpen ? "sidebar--open" : ""}
      />

      <div className="app__main">
        <div className="app__topbar">
          <button
            className="app__menu-btn"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            ☰
          </button>
          <div className="app__topbar-right">
            <button
              className="app__theme-toggle"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        <div className="app__content">
          {page === "dashboard" && (
            <Dashboard
              onScanClick={handleScanClick}
              showToast={showToast}
              showModal={showModal}
            />
          )}
          {page === "scan-detail" && (
            <ScanDetail
              scan={selectedScan}
              showToast={showToast}
              showModal={showModal}
            />
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} />
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          onConfirm={handleModalConfirm}
          onCancel={() => setModal(null)}
          confirmLabel={modal.confirmLabel}
          confirmVariant={modal.confirmVariant}
        />
      )}
    </div>
  );
}
