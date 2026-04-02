import { useState } from "react";
import { signupUser } from "../api/authClient";
import AuthLayout from "../components/AuthLayout";
import styles from "../styles/AuthLayout.module.css";

export default function SignupPage({
  onSwitch,
  onSignupSuccess,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await signupUser({
        full_name: name.trim(),
        email: email.trim(),
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      onSignupSuccess(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Create your account"
      description="Get started with employee analytics"
      submitLabel={isSubmitting ? "Creating Account..." : "Create Account"}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          required
        />
      </div>

      <p className={styles.supportText}>
        By signing up, you agree to our terms and privacy policy.
      </p>

      {error ? <div className={styles.errorMessage}>{error}</div> : null}
    </AuthLayout>
  );
}
