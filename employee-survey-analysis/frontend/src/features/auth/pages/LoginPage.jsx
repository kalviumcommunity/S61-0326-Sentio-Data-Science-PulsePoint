import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import styles from "../styles/AuthLayout.module.css";

export default function LoginPage({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert("Logged in!");
  };

  return (
    <AuthLayout
      heading="Welcome back"
      description="Sign in to access your engagement dashboard"
      submitLabel="Sign In"
      onSubmit={handleSubmit}
      switchPrompt="Don't have an account?"
      switchLabel="Sign up"
      onSwitchClick={() => onSwitch("signup")}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className={styles.textInput}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className={styles.textInput}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
    </AuthLayout>
  );
}
