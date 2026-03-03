import React, { useState } from 'react';
import { activeScan, activityLogs, verificationLogs, findings } from '../data/mockData';
import { CircularProgress, SeverityBadge, Button } from '../components/index';
import './ScanDetail.css';

function renderLogLine(log) {
  if (!log.highlights) {
    return <span>{log.text}</span>;
  }

  return (
    <>
      {log.text}
      {log.highlights?.map((h, i) => (
        <span key={i} className={`log-highlight log-highlight--${h.type}`}>{h.text}</span>
      ))}
      {log.suffix}
      {log.highlights2?.map((h, i) => (
        <span key={i} className={`log-highlight log-highlight--${h.type}`}>{h.text}</span>
      ))}
      {log.suffix2}
    </>
  );
}

export default function ScanDetail({ showToast, showModal }) {
  const [activeTab, setActiveTab] = useState('activity');

  const handleExport = () => showToast('Exporting report as PDF...', 'info');
  const handleStop = () => showModal({
    title: 'Stop Scan?',
    message: 'Are you sure you want to stop this scan? All progress will be saved.',
    onConfirm: () => showToast('Scan stopped successfully', 'warning'),
    confirmLabel: 'Stop Scan',
    confirmVariant: 'danger',
  });

  const logs = activeTab === 'activity' ? activityLogs : verificationLogs;

  return (
    <div className="scan-detail">
      {/* Breadcrumb + actions */}
      <div className="scan-detail__header">
        <div className="scan-detail__breadcrumb">
          <span className="scan-detail__breadcrumb-root">Scan</span>
          <span className="scan-detail__breadcrumb-sep">›</span>
          <HomeIcon />
          <span className="scan-detail__breadcrumb-sep">/</span>
          {activeScan.breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span className={i === activeScan.breadcrumb.length - 1 ? 'scan-detail__breadcrumb-active' : 'scan-detail__breadcrumb-item'}>{b}</span>
              {i < activeScan.breadcrumb.length - 1 && <span className="scan-detail__breadcrumb-sep">/</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="scan-detail__header-actions">
          <Button variant="outline" size="sm" onClick={handleExport}>Export Report</Button>
          <Button variant="stop" size="sm" onClick={handleStop}>Stop Scan</Button>
        </div>
      </div>

      {/* Progress + steps */}
      <div className="scan-detail__progress-section">
        <CircularProgress value={activeScan.progress} label={activeScan.status} />
        <div className="scan-detail__steps-wrap">
          <div className="scan-detail__steps">
            {activeScan.steps.map((step, i) => (
              <React.Fragment key={step}>
                <div className={`scan-detail__step ${i === activeScan.activeStep ? 'scan-detail__step--active' : i < activeScan.activeStep ? 'scan-detail__step--done' : ''}`}>
                  <div className="scan-detail__step-icon">
                    {i === 0 ? <SpiderIcon /> : i === 1 ? <MapIcon /> : i === 2 ? <TestIcon /> : i === 3 ? <ValidateIcon /> : <ReportIcon />}
                  </div>
                  <span>{step}</span>
                </div>
                {i < activeScan.steps.length - 1 && <div className="scan-detail__step-line" />}
              </React.Fragment>
            ))}
          </div>

          <div className="scan-detail__meta">
            {[
              { label: 'Scan Type', value: activeScan.scanType },
              { label: 'Targets', value: activeScan.targets },
              { label: 'Started At', value: activeScan.startedAt },
              { label: 'Credentials', value: activeScan.credentials },
              { label: 'Files', value: activeScan.files },
              { label: 'Checklists', value: activeScan.checklists, teal: true },
            ].map(m => (
              <div key={m.label} className="scan-detail__meta-item">
                <span className="scan-detail__meta-label">{m.label}</span>
                <span className={`scan-detail__meta-value ${m.teal ? 'scan-detail__meta-value--teal' : ''}`}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Console + findings */}
      <div className="scan-detail__panels">
        {/* Left: Console */}
        <div className="scan-detail__console-panel">
          <div className="scan-detail__console-header">
            <div className="scan-detail__console-title">
              <span className="scan-detail__console-dot" />
              <span>Live Scan Console</span>
            </div>
            <div className="scan-detail__console-meta">
              <span className="scan-detail__running">⏱ Running...</span>
              <div className="scan-detail__console-controls">
                <button className="scan-detail__ctrl-btn">⌄</button>
                <button className="scan-detail__ctrl-btn">✕</button>
              </div>
            </div>
          </div>

          <div className="scan-detail__tabs">
            <button
              className={`scan-detail__tab ${activeTab === 'activity' ? 'scan-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity Log
            </button>
            <button
              className={`scan-detail__tab ${activeTab === 'verification' ? 'scan-detail__tab--active' : ''}`}
              onClick={() => setActiveTab('verification')}
            >
              Verification Loops
            </button>
          </div>

          <div className="scan-detail__log">
            {logs.map((log) => (
              <div key={log.id} className="scan-detail__log-entry">
                <span className="scan-detail__log-time">[{log.time}]</span>{' '}
                <span className="scan-detail__log-text">{renderLogLine(log)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Findings */}
        <div className="scan-detail__findings-panel">
          <div className="scan-detail__findings-header">
            <span>Finding Log</span>
          </div>
          <div className="scan-detail__findings-list">
            {findings.map((f) => (
              <div key={f.id} className="scan-detail__finding-card">
                <div className="scan-detail__finding-top">
                  <SeverityBadge level={f.severity} />
                  <span className="scan-detail__finding-time">{f.time}</span>
                </div>
                <div className="scan-detail__finding-title">{f.title}</div>
                <div className="scan-detail__finding-endpoint">{f.endpoint}</div>
                <div className="scan-detail__finding-desc">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="scan-detail__status-bar">
        <span className="scan-detail__status-item">
          <span className="scan-detail__status-dot" />
          Sub-Agents: <strong>0</strong>
        </span>
        <span className="scan-detail__status-item">
          <span className="scan-detail__status-dot" />
          Parallel Executions: <strong>2</strong>
        </span>
        <span className="scan-detail__status-item">
          <span className="scan-detail__status-dot" />
          Operations: <strong>1</strong>
        </span>
        <span className="scan-detail__status-sev">
          Critical: <strong style={{ color: 'var(--critical)' }}>0</strong>
        </span>
        <span className="scan-detail__status-sev">
          High: <strong style={{ color: 'var(--high)' }}>0</strong>
        </span>
        <span className="scan-detail__status-sev">
          Medium: <strong style={{ color: 'var(--medium)' }}>0</strong>
        </span>
        <span className="scan-detail__status-sev">
          Low: <strong style={{ color: 'var(--low)' }}>0</strong>
        </span>
      </div>
    </div>
  );
}

function HomeIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function SpiderIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
}
function MapIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
}
function TestIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>;
}
function ValidateIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
function ReportIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
