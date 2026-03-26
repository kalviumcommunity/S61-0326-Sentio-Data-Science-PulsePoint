import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import styles from "../styles/AuthLayout.module.css";

export default function SignupPage({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    alert("Account created!");
  };

  return (
    <AuthLayout
      heading="Create your account"
      description="Get started with employee analytics"
      submitLabel="Create Account"
      onSubmit={handleSubmit}
      switchPrompt="Already have an account?"
      switchLabel="Sign in"
      onSwitchClick={() => onSwitch("login")}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-name">
          Full Name
        </label>
        <input
          id="signup-name"
          className={styles.textInput}
          type="text"
          placeholder="Maya Krishnan"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          className={styles.textInput}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
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
