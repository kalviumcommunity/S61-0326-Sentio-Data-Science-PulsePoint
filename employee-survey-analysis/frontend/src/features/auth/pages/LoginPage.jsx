import { useState } from "react";
import { loginUser } from "../api/authClient";
import AuthLayout from "../components/AuthLayout";
import styles from "../styles/AuthLayout.module.css";

export default function LoginPage({ onSwitch, notice, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });
      setPassword("");
      onLoginSuccess(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome back"
      description="Sign in to access your engagement dashboard"
      submitLabel={isSubmitting ? "Signing In..." : "Sign In"}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          required
        />
      </div>

      {notice ? <div className={styles.statusMessage}>{notice}</div> : null}
      {error ? <div className={styles.errorMessage}>{error}</div> : null}
    </AuthLayout>
  );
}
