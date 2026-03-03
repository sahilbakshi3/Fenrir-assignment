import React, { useState, useCallback } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanDetail from './pages/ScanDetail';
import Sidebar from './components/Sidebar';
import { ToastContainer, Modal } from './components/index';
import './styles/App.css';

let toastId = 0;

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [page, setPage] = useState('login'); // 'login' | 'dashboard' | 'scan-detail'
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [selectedScan, setSelectedScan] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = useCallback((message, type = 'info') => {
    const id = ++toastId;
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const showModal = useCallback((config) => {
    setModal(config);
  }, []);

  const handleModalConfirm = () => {
    modal?.onConfirm?.();
    setModal(null);
  };

  const handleLogin = () => {
    setPage('dashboard');
    setActiveSidebar('dashboard');
  };

  const handleNavigate = (id) => {
    setActiveSidebar(id);
    if (id === 'dashboard') setPage('dashboard');
    else if (id === 'scans') { setPage('scan-detail'); }
    else showToast(`Navigating to ${id}...`, 'info');
    setSidebarOpen(false);
  };

  const handleScanClick = (scan) => {
    setSelectedScan(scan);
    setPage('scan-detail');
    setActiveSidebar('scans');
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (page === 'login') {
    return (
      <div data-theme={theme}>
        <Login onLogin={handleLogin} />
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="app">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="app__sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        activePage={activeSidebar}
        onNavigate={handleNavigate}
        className={sidebarOpen ? 'sidebar--open' : ''}
      />

      <div className="app__main">
        {/* Top bar */}
        <div className="app__topbar">
          <button className="app__menu-btn" onClick={() => setSidebarOpen(s => !s)}>
            ☰
          </button>
          <div className="app__topbar-right">
            <button className="app__theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Page */}
        <div className="app__content">
          {page === 'dashboard' && (
            <Dashboard
              onScanClick={handleScanClick}
              showToast={showToast}
              showModal={showModal}
            />
          )}
          {page === 'scan-detail' && (
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

function SunIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function MoonIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}
