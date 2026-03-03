import React, { useState } from "react";
import {
  Home,
  Radar,
  Map,
  FlaskConical,
  CheckCircle,
  FileText,
} from "lucide-react";
import {
  activeScan,
  activityLogs,
  verificationLogs,
  findings,
} from "../data/mockData";
import { CircularProgress, SeverityBadge, Button } from "../components/index";
import "./ScanDetail.css";

function renderLogLine(log) {
  if (!log.highlights) {
    return <span>{log.text}</span>;
  }
  return (
    <>
      {log.text}
      {log.highlights?.map((h, i) => (
        <span key={i} className={`log-highlight log-highlight--${h.type}`}>
          {h.text}
        </span>
      ))}
      {log.suffix}
      {log.highlights2?.map((h, i) => (
        <span key={i} className={`log-highlight log-highlight--${h.type}`}>
          {h.text}
        </span>
      ))}
      {log.suffix2}
    </>
  );
}

const STEP_ICONS = [
  <Radar size={18} />,
  <Map size={18} />,
  <FlaskConical size={18} />,
  <CheckCircle size={18} />,
  <FileText size={18} />,
];

export default function ScanDetail({ showToast, showModal }) {
  const [activeTab, setActiveTab] = useState("activity");

  const handleExport = () => showToast("Exporting report as PDF...", "info");
  const handleStop = () =>
    showModal({
      title: "Stop Scan?",
      message:
        "Are you sure you want to stop this scan? All progress will be saved.",
      onConfirm: () => showToast("Scan stopped successfully", "warning"),
      confirmLabel: "Stop Scan",
      confirmVariant: "danger",
    });

  const logs = activeTab === "activity" ? activityLogs : verificationLogs;

  return (
    <div className="scan-detail">
      {/* Breadcrumb + actions */}
      <div className="scan-detail__header">
        <div className="scan-detail__breadcrumb">
          <span className="scan-detail__breadcrumb-root">Scan</span>
          <span className="scan-detail__breadcrumb-sep">›</span>
          <Home size={13} />
          <span className="scan-detail__breadcrumb-sep">/</span>
          {activeScan.breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span
                className={
                  i === activeScan.breadcrumb.length - 1
                    ? "scan-detail__breadcrumb-active"
                    : "scan-detail__breadcrumb-item"
                }
              >
                {b}
              </span>
              {i < activeScan.breadcrumb.length - 1 && (
                <span className="scan-detail__breadcrumb-sep">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="scan-detail__header-actions">
          <Button variant="outline" size="sm" onClick={handleExport}>
            Export Report
          </Button>
          <Button variant="stop" size="sm" onClick={handleStop}>
            Stop Scan
          </Button>
        </div>
      </div>

      {/* Progress + steps */}
      <div className="scan-detail__progress-section">
        <CircularProgress
          value={activeScan.progress}
          label={activeScan.status}
        />

        {/* Vertical divider */}
        <div className="scan-detail__progress-divider" />

        <div className="scan-detail__steps-wrap">
          <div className="scan-detail__steps">
            {activeScan.steps.map((step, i) => (
              <React.Fragment key={step}>
                <div
                  className={`scan-detail__step ${i === activeScan.activeStep ? "scan-detail__step--active" : i < activeScan.activeStep ? "scan-detail__step--done" : ""}`}
                >
                  <div className="scan-detail__step-icon">{STEP_ICONS[i]}</div>
                  <span>{step}</span>
                </div>
                {i < activeScan.steps.length - 1 && (
                  <div className="scan-detail__step-line" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="scan-detail__meta">
            {[
              { label: "Scan Type", value: activeScan.scanType },
              { label: "Targets", value: activeScan.targets },
              { label: "Started At", value: activeScan.startedAt },
              { label: "Credentials", value: activeScan.credentials },
              { label: "Files", value: activeScan.files },
              { label: "Checklists", value: activeScan.checklists, teal: true },
            ].map((m) => (
              <div key={m.label} className="scan-detail__meta-item">
                <span className="scan-detail__meta-label">{m.label}</span>
                <span
                  className={`scan-detail__meta-value ${m.teal ? "scan-detail__meta-value--teal" : ""}`}
                >
                  {m.value}
                </span>
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
              className={`scan-detail__tab ${activeTab === "activity" ? "scan-detail__tab--active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity Log
            </button>
            <button
              className={`scan-detail__tab ${activeTab === "verification" ? "scan-detail__tab--active" : ""}`}
              onClick={() => setActiveTab("verification")}
            >
              Verification Loops
            </button>
          </div>

          <div className="scan-detail__log">
            {logs.map((log) => (
              <div key={log.id} className="scan-detail__log-entry">
                <span className="scan-detail__log-time">[{log.time}]</span>{" "}
                <span className="scan-detail__log-text">
                  {renderLogLine(log)}
                </span>
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
                <div className="scan-detail__finding-endpoint">
                  {f.endpoint}
                </div>
                <div className="scan-detail__finding-desc">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar — left items + right severity counts */}
      <div className="scan-detail__status-bar">
        <div className="scan-detail__status-left">
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
        </div>
        <div className="scan-detail__status-right">
          <span className="scan-detail__status-sev">
            Critical: <strong style={{ color: "var(--critical)" }}>0</strong>
          </span>
          <span className="scan-detail__status-sev">
            High: <strong style={{ color: "var(--high)" }}>0</strong>
          </span>
          <span className="scan-detail__status-sev">
            Medium: <strong style={{ color: "var(--medium)" }}>0</strong>
          </span>
          <span className="scan-detail__status-sev">
            Low: <strong style={{ color: "var(--low)" }}>0</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
