import React from "react";
import {
  LayoutGrid,
  Folder,
  Activity,
  Calendar,
  Bell,
  Settings,
  LifeBuoy,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutGrid size={16} /> },
  { id: "projects", label: "Projects", icon: <Folder size={16} /> },
  { id: "scans", label: "Scans", icon: <Activity size={16} /> },
  { id: "schedule", label: "Schedule", icon: <Calendar size={16} /> },
];

const bottomNav = [
  { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  { id: "support", label: "Support", icon: <LifeBuoy size={16} /> },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo" onClick={() => onNavigate("dashboard")}>
        <div className="sidebar__logo-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#0CC8A8" strokeWidth="2" />
            <circle cx="8" cy="8" r="3" fill="#0CC8A8" />
          </svg>
        </div>
        <span className="sidebar__logo-text">aps</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${activePage === item.id ? "sidebar__nav-item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__divider" />

      <nav className="sidebar__nav">
        {bottomNav.map((item) => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${activePage === item.id ? "sidebar__nav-item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__spacer" />

      <div className="sidebar__user">
        <div className="sidebar__avatar">
          <span>A</span>
        </div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-email">admin@edu.com</span>
          <span className="sidebar__user-role">Security Lead</span>
        </div>
        <button className="sidebar__user-chevron">›</button>
      </div>
    </aside>
  );
}
