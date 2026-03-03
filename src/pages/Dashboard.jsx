import React, { useState } from "react";
import {
  Search,
  Filter,
  Columns,
  Ban,
  TriangleAlert,
  SearchAlert,
  RefreshCcw,
} from "lucide-react";
import { orgStats, severityStats, scans } from "../data/mockData";
import {
  StatusChip,
  VulnBadge,
  ProgressBar,
  Button,
} from "../components/index";
import "./Dashboard.css";

const SEVERITY_ICONS = {
  critical: {
    icon: <Ban size={16} color="#EF4444" />,
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.2)",
  },
  high: {
    icon: <TriangleAlert size={16} color="#F97316" />,
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.2)",
  },
  medium: {
    icon: <TriangleAlert size={16} color="#EAB308" />,
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.2)",
  },
  low: {
    icon: <SearchAlert size={16} color="#ebf2ff" />,
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.2)",
  },
};

export default function Dashboard({ onScanClick, showToast, showModal }) {
  const [search, setSearch] = useState("");

  const filtered = scans.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNewScan = () => showToast("Opening new scan wizard...", "info");
  const handleFilter = () => showToast("Filter options coming soon", "info");
  const handleColumn = () =>
    showToast("Column customization coming soon", "info");

  return (
    <div className="dashboard">
      {/* Header stats bar */}
      <div className="dashboard__org-bar">
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Org:</span>
          <span className="dashboard__org-value">{orgStats.org}</span>
        </div>
        <div className="dashboard__org-sep" />
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Owner:</span>
          <span className="dashboard__org-value">{orgStats.owner}</span>
        </div>
        <div className="dashboard__org-sep" />
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Total Scans:</span>
          <span className="dashboard__org-value">{orgStats.totalScans}</span>
        </div>
        <div className="dashboard__org-sep" />
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Scheduled:</span>
          <span className="dashboard__org-value">{orgStats.scheduled}</span>
        </div>
        <div className="dashboard__org-sep" />
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Rescans:</span>
          <span className="dashboard__org-value">{orgStats.rescans}</span>
        </div>
        <div className="dashboard__org-sep" />
        <div className="dashboard__org-item">
          <span className="dashboard__org-label">Failed Scans:</span>
          <span className="dashboard__org-value">{orgStats.failedScans}</span>
        </div>
        <div className="dashboard__org-refresh">
          <span className="dashboard__org-time">
            <RefreshCcw size={12} color="#0e9e9e" /> {orgStats.lastUpdated}
          </span>
        </div>
      </div>

      {/* Severity cards */}
      <div className="dashboard__severity-grid">
        {severityStats.map((s) => (
          <div key={s.label} className="dashboard__severity-card">
            <div className="dashboard__severity-header">
              <span className="dashboard__severity-label">{s.label}</span>
              <span
                className="dashboard__severity-icon-box"
                style={{
                  background: SEVERITY_ICONS[s.color].bg,
                  border: `1px solid ${SEVERITY_ICONS[s.color].border}`,
                }}
              >
                {SEVERITY_ICONS[s.color].icon}
              </span>
            </div>
            <div className="dashboard__severity-bottom">
              <div className="dashboard__severity-count">{s.count}</div>
              <div
                className={`dashboard__severity-change dashboard__severity-change--${s.direction}`}
              >
                {s.direction === "up" ? "↑" : "↓"} {s.change}{" "}
                {s.direction === "up" ? "increase" : "decrease"} than yesterday
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table section */}
      <div className="dashboard__table-section">
        {/* Toolbar */}
        <div className="dashboard__toolbar">
          <div className="dashboard__search">
            <Search size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scans by name or type..."
              className="dashboard__search-input"
            />
          </div>
          <div className="dashboard__toolbar-actions">
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <Filter size={13} /> Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleColumn}>
              <Columns size={13} /> Column
            </Button>
            <Button variant="primary" size="sm" onClick={handleNewScan}>
              + New scan
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard__table-wrap">
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>Scan Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Vulnerability</th>
                <th>Last Scan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => onScanClick(scan)}
                  className="dashboard__table-row"
                >
                  <td className="dashboard__scan-name">{scan.name}</td>
                  <td className="dashboard__scan-type">{scan.type}</td>
                  <td>
                    <StatusChip status={scan.status} />
                  </td>
                  <td>
                    <div className="dashboard__progress-cell">
                      <ProgressBar value={scan.progress} status={scan.status} />
                      <span className="dashboard__progress-pct">
                        {scan.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="dashboard__vuln-row">
                      <VulnBadge count={scan.vuln.critical} type="critical" />
                      <VulnBadge count={scan.vuln.high} type="high" />
                      <VulnBadge count={scan.vuln.medium} type="medium" />
                      <VulnBadge count={scan.vuln.low} type="low" />
                    </div>
                  </td>
                  <td className="dashboard__last-scan">{scan.lastScan}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="dashboard__empty">
              No scans found matching "{search}"
            </div>
          )}
        </div>

        <div className="dashboard__table-footer">
          <span>
            Showing {filtered.length} of {scans.length} Scans
          </span>
          <div className="dashboard__pagination">
            <button className="dashboard__page-btn">‹</button>
            <button className="dashboard__page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
