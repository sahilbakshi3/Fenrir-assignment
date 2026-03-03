import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = '8+ characters required';
    if (!agreed) e.agreed = 'You must agree to continue';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onLogin();
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="login">
      {/* Left Panel */}
      <div className="login__left">
        <div className="login__left-content">
          <div className="login__brand">
            <div className="login__brand-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#0CC8A8" strokeWidth="2.5" />
                <circle cx="9" cy="9" r="3.5" fill="#0CC8A8" />
              </svg>
            </div>
            <span>aps</span>
          </div>

          <div className="login__hero">
            <h1>
              Expert level Cybersecurity<br />
              in <span className="login__hero-accent">hours</span> not weeks.
            </h1>
          </div>

          <div className="login__features">
            <p className="login__features-title">What's included</p>
            {[
              'Effortlessly spider and map targets to uncover hidden security flaws',
              'Deliver high-quality, validated findings in hours, not weeks.',
              'Generate professional, enterprise-grade security reports automatically.',
            ].map((f, i) => (
              <div key={i} className="login__feature">
                <span className="login__feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="login__trust">
            <div className="login__trustpilot">
              <span className="login__star">★</span>
              <span>Trustpilot</span>
            </div>
            <p><strong>Rated 4.5/5.0</strong> <span className="login__review-count">(100k+ reviews)</span></p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login__right">
        <div className="login__card">
          <h2 className="login__card-title">Sign up</h2>
          <p className="login__card-sub">
            Already have an account?{' '}
            <a href="#" className="login__link" onClick={e => { e.preventDefault(); onLogin(); }}>Log in</a>
          </p>

          <div className="login__form">
            <div className="login__row">
              <div className="login__field">
                <input
                  className={`login__input ${errors.firstName ? 'login__input--error' : ''}`}
                  placeholder="First name*"
                  value={form.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                {errors.firstName && <span className="login__error">{errors.firstName}</span>}
              </div>
              <div className="login__field">
                <input
                  className={`login__input ${errors.lastName ? 'login__input--error' : ''}`}
                  placeholder="Last name*"
                  value={form.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
                {errors.lastName && <span className="login__error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="login__field">
              <input
                className={`login__input ${errors.email ? 'login__input--error' : ''}`}
                placeholder="Email address*"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
              />
              {errors.email && <span className="login__error">{errors.email}</span>}
            </div>

            <div className="login__field">
              <div className="login__password-wrap">
                <input
                  className={`login__input login__input--password ${errors.password ? 'login__input--error' : ''}`}
                  placeholder="Password (8+ characters)*"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                />
                <button className="login__eye" onClick={() => setShowPass(s => !s)}>
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="login__error">{errors.password}</span>}
            </div>

            <div className="login__field">
              <label className={`login__checkbox-label ${errors.agreed ? 'login__checkbox-label--error' : ''}`}>
                <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setErrors(er => ({ ...er, agreed: undefined })); }} />
                <span>
                  I agree to Aps's{' '}
                  <a href="#" className="login__link">Terms & Conditions</a>
                  {' '}and acknowledge the{' '}
                  <a href="#" className="login__link">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <span className="login__error">{errors.agreed}</span>}
            </div>

            <button className="login__submit" onClick={handleSubmit}>
              Create account
            </button>

            <div className="login__divider">
              <span>or continue with</span>
            </div>

            <div className="login__socials">
              <button className="login__social login__social--apple" onClick={onLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              </button>
              <button className="login__social login__social--google" onClick={onLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </button>
              <button className="login__social login__social--meta" onClick={onLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function EyeOffIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
