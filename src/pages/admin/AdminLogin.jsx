import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    // Backend authentication will be connected in the next step.
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setError(
      "Login authentication is not connected yet. We will connect it to the backend next."
    );
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-visual">
        <Link to="/" className="admin-login-brand">
          <img src="/logo.png" alt="LUBESON logo" />
          <span>LUBESON</span>
        </Link>

        <div className="admin-login-visual-content">
          <span className="admin-login-tag">
            <ShieldCheck size={15} />
            SECURE ADMINISTRATION
          </span>

          <h1>
            Manage your business.
            <br />
            <span>Move forward.</span>
          </h1>

          <p>
            Your central workspace for managing equipment, customer enquiries,
            website content and business operations.
          </p>

          <div className="admin-login-feature">
            <div className="admin-login-feature-icon">
              <LockKeyhole size={20} />
            </div>
            <div>
              <strong>Administrator workspace</strong>
              <span>One place to manage your website</span>
            </div>
          </div>
        </div>

        <p className="admin-login-copyright">
          © {new Date().getFullYear()} LUBESON. All rights reserved.
        </p>
      </section>

      <section className="admin-login-form-section">
        <div className="admin-login-form-wrapper">
          <div className="admin-login-mobile-brand">
            <img src="/logo.png" alt="LUBESON logo" />
            <span>LUBESON</span>
          </div>

          <div className="admin-login-heading">
            <span className="admin-login-eyebrow">WELCOME BACK</span>
            <h2>Admin sign in</h2>
            <p>Enter your administrator credentials to continue.</p>
          </div>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-email">Email address</label>

            <div className="admin-login-input-wrap">
              <Mail size={18} />
              <input
                id="admin-email"
                type="email"
                placeholder="admin@yourcompany.com"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label htmlFor="admin-password">Password</label>

            <div className="admin-login-input-wrap">
              <LockKeyhole size={18} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="admin-login-toggle-password"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="admin-login-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="admin-login-submit">
              <span>Sign in to dashboard</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="admin-login-security-note">
            <ShieldCheck size={17} />
            <span>Authorized administrators only</span>
          </div>

          <Link to="/" className="admin-login-back">
            ← Back to LUBESON website
          </Link>
        </div>
      </section>
    </main>
  );
}