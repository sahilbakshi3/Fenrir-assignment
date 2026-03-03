import React, { useState } from 'react';
import { orgStats, severityStats, scans } from '../data/mockData';
import { StatusChip, VulnBadge, ProgressBar, Button } from '../components/index';
import './Dashboard.css';

const SEVERITY_ICONS = {
  critical: '🚫',
  high: '⚠️',
  medium: '⚠️',
  low: '🔍',
};

export default function Dashboard({ onScanClick, showToast, showModal }) {
  const [search, setSearch] = useState('');

  const filtered = scans.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewScan = () => showToast('Opening new scan wizard...', 'info');
  const handleFilter = () => showToast('Filter options coming soon', 'info');
  const handleColumn = () => showToast('Column customization coming soon', 'info');

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
          <span className="dashboard__org-time">↻ {orgStats.lastUpdated}</span>
        </div>
      </div>

      {/* Severity cards */}
      <div className="dashboard__severity-grid">
        {severityStats.map((s) => (
          <div key={s.label} className="dashboard__severity-card">
            <div className="dashboard__severity-header">
              <span className="dashboard__severity-label">{s.label}</span>
              <span className="dashboard__severity-icon">{SEVERITY_ICONS[s.color]}</span>
            </div>
            <div className="dashboard__severity-count">{s.count}</div>
            <div className={`dashboard__severity-change dashboard__severity-change--${s.direction}`}>
              {s.direction === 'up' ? '↑' : '↓'} {s.change}{' '}
              {s.direction === 'up' ? 'increase' : 'decrease'} than yesterday
            </div>
          </div>
        ))}
      </div>

      {/* Table section */}
      <div className="dashboard__table-section">
        {/* Toolbar */}
        <div className="dashboard__toolbar">
          <div className="dashboard__search">
            <SearchIcon />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search scans by name or type..."
              className="dashboard__search-input"
            />
          </div>
          <div className="dashboard__toolbar-actions">
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <FilterIcon /> Filter
            </Button>
            <Button variant="outline" size="sm" onClick={handleColumn}>
              <ColumnIcon /> Column
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
                <tr key={scan.id} onClick={() => onScanClick(scan)} className="dashboard__table-row">
                  <td className="dashboard__scan-name">{scan.name}</td>
                  <td className="dashboard__scan-type">{scan.type}</td>
                  <td><StatusChip status={scan.status} /></td>
                  <td>
                    <div className="dashboard__progress-cell">
                      <ProgressBar value={scan.progress} status={scan.status} />
                      <span className="dashboard__progress-pct">{scan.progress}%</span>
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
            <div className="dashboard__empty">No scans found matching "{search}"</div>
          )}
        </div>

        <div className="dashboard__table-footer">
          <span>Showing {filtered.length} of {scans.length} Scans</span>
          <div className="dashboard__pagination">
            <button className="dashboard__page-btn">‹</button>
            <button className="dashboard__page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function FilterIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
}
function ColumnIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/></svg>;
}
