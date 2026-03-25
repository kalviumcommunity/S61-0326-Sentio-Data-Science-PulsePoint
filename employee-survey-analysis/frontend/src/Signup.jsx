import React, { useState } from "react";
import styles from "./Login.module.css";

export default function Signup({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    alert("Account created!");
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-left"]}>
        <div className={styles.logo}> <span role="img" aria-label="logo">📊</span> EngagePulse </div>
        <div className={styles.subtitle}>Employee Analytics</div>
        <h1 className={styles["main-title"]}>Understand your team.<br />Improve engagement.</h1>
        <div className={styles["features-grid"]}>
          <div> <span role="img" aria-label="user">👥</span> Track satisfaction across departments </div>
          <div> <span role="img" aria-label="trend">📈</span> Monitor sentiment trends over time </div>
          <div> <span role="img" aria-label="feedback">💬</span> Explore employee feedback themes </div>
          <div> <span role="img" aria-label="insight">📊</span> Actionable insights & alerts </div>
        </div>
        <div className={styles.copyright}>© 2026 EngagePulse. All rights reserved.</div>
      </div>
      <div className={styles["auth-right"]}>
        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <h2>Create your account</h2>
          <p className={styles.desc}>Get started with employee analytics</p>
          <label>Full Name</label>
          <input type="text" placeholder="Maya Krishnan" value={name} onChange={e => setName(e.target.value)} required />
          <label>Email</label>
          <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className={styles["primary-btn"]}>Create Account</button>
          <div className={styles.divider}>OR CONTINUE WITH</div>
          <button type="button" className={styles["google-btn"]}>
            <span className={styles["google-icon"]}>G</span> Continue with Google
          </button>
          <div className={styles["switch-link"]}>
            Already have an account? <span className={styles.link} onClick={() => onSwitch("login")}>Sign in</span>
          </div>
        </form>
      </div>
    </div>
  );
}
