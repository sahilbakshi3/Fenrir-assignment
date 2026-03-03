import React from 'react';
import './components.css';

/* ===== SEVERITY BADGE ===== */
export function SeverityBadge({ level }) {
  return (
    <span className={`severity-badge severity-badge--${level.toLowerCase()}`}>
      {level}
    </span>
  );
}

/* ===== STATUS CHIP ===== */
export function StatusChip({ status }) {
  return (
    <span className={`status-chip status-chip--${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

/* ===== VULN BADGE ===== */
export function VulnBadge({ count, type }) {
  if (count === null || count === undefined) return null;
  return (
    <span className={`vuln-badge vuln-badge--${type}`}>{count}</span>
  );
}

/* ===== BUTTON ===== */
export function Button({ children, variant = 'default', size = 'md', onClick, className = '', disabled }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* ===== PROGRESS BAR ===== */
export function ProgressBar({ value, status }) {
  const colorClass = status === 'Failed' ? 'progress-bar--failed' : 'progress-bar--default';
  return (
    <div className="progress-bar-track">
      <div
        className={`progress-bar-fill ${colorClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ===== CIRCULAR PROGRESS ===== */
export function CircularProgress({ value, label }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = circ - (value / 100) * circ;
  return (
    <div className="circular-progress">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="#0CC8A8"
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className="circular-progress__center">
        <span className="circular-progress__value">{value}%</span>
        <span className="circular-progress__label">{label}</span>
      </div>
    </div>
  );
}

/* ===== TOAST CONTAINER ===== */
export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type || ''}`}>{t.message}</div>
      ))}
    </div>
  );
}

/* ===== MODAL ===== */
export function Modal({ title, message, onConfirm, onCancel, confirmLabel = 'Confirm', confirmVariant = 'danger' }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
