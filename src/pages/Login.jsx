import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import "./Login.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 8) e.password = "8+ characters required";
    if (!agreed) e.agreed = "You must agree to continue";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onLogin();
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="login">
      {/* Left Panel */}
      <div className="login__left">
        <div className="login__left-content">
          <div className="login__brand">
            <div className="login__brand-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="#0CC8A8"
                  strokeWidth="2.5"
                />
                <circle cx="9" cy="9" r="3.5" fill="#0CC8A8" />
              </svg>
            </div>
            <span>aps</span>
          </div>

          <div className="login__hero">
            <h1>
              Expert level Cybersecurity
              <br />
              in <span className="login__hero-accent">hours</span> not weeks.
            </h1>
          </div>

          <div className="login__features">
            <p className="login__features-title">What's included</p>
            {[
              "Effortlessly spider and map targets to uncover hidden security flaws",
              "Deliver high-quality, validated findings in hours, not weeks.",
              "Generate professional, enterprise-grade security reports automatically.",
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
            <p>
              <strong>Rated 4.5/5.0</strong>{" "}
              <span className="login__review-count">(100k+ reviews)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login__right">
        <div className="login__card">
          <h2 className="login__card-title">Sign up</h2>
          <p className="login__card-sub">
            Already have an account?{" "}
            <a
              href="#"
              className="login__link"
              onClick={(e) => {
                e.preventDefault();
                onLogin();
              }}
            >
              Log in
            </a>
          </p>

          <div className="login__form">
            <div className="login__field">
              <input
                className={`login__input ${errors.firstName ? "login__input--error" : ""}`}
                placeholder="First name*"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && (
                <span className="login__error">{errors.firstName}</span>
              )}
            </div>

            <div className="login__field">
              <input
                className={`login__input ${errors.lastName ? "login__input--error" : ""}`}
                placeholder="Last name*"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && (
                <span className="login__error">{errors.lastName}</span>
              )}
            </div>

            <div className="login__field">
              <input
                className={`login__input ${errors.email ? "login__input--error" : ""}`}
                placeholder="Email address*"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="login__error">{errors.email}</span>
              )}
            </div>

            <div className="login__field">
              <div className="login__password-wrap">
                <input
                  className={`login__input login__input--password ${errors.password ? "login__input--error" : ""}`}
                  placeholder="Password (8+ characters)*"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                  className="login__eye"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="login__error">{errors.password}</span>
              )}
            </div>

            <div className="login__field">
              <label
                className={`login__checkbox-label ${errors.agreed ? "login__checkbox-label--error" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setErrors((er) => ({ ...er, agreed: undefined }));
                  }}
                />
                <span>
                  I agree to Aps's{" "}
                  <a href="#" className="login__link">
                    Terms & Conditions
                  </a>{" "}
                  and acknowledge the{" "}
                  <a href="#" className="login__link">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreed && (
                <span className="login__error">{errors.agreed}</span>
              )}
            </div>

            <button className="login__submit" onClick={handleSubmit}>
              Create account
            </button>

            <div className="login__divider">
              <span>or continue with</span>
            </div>

            <div className="login__socials">
              <button
                className="login__social login__social--apple"
                onClick={onLogin}
              >
                <FaApple size={18} color="#fff" />
              </button>
              <button
                className="login__social login__social--google"
                onClick={onLogin}
              >
                <FcGoogle size={18} />
              </button>
              <button
                className="login__social login__social--meta"
                onClick={onLogin}
              >
                <FaMeta size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
