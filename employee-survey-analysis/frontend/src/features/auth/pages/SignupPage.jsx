import { useState } from "react";
import { googleAuthUser, signupUser } from "../api/authClient";
import AuthLayout from "../components/AuthLayout";
import GoogleAuthButton from "../components/GoogleAuthButton";
import styles from "../styles/AuthLayout.module.css";

export default function SignupPage({
  onGoogleAuthSuccess,
  onSwitch,
  onSignupSuccess,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

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
      onSignupSuccess(response.user.email);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setError("");
    setIsGoogleSubmitting(true);

    try {
      const response = await googleAuthUser({ credential });
      onGoogleAuthSuccess(response);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Create your account"
      description="Get started with employee analytics"
      googleSection={
        <GoogleAuthButton
          disabled={isSubmitting || isGoogleSubmitting}
          onCredential={handleGoogleCredential}
          onError={setError}
        />
      }
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
        Passwords must be at least 8 characters and will be hashed before they
        are stored in PostgreSQL.
      </p>

      {isGoogleSubmitting ? (
        <div className={styles.statusMessage}>Completing Google sign-in...</div>
      ) : null}
      {error ? <div className={styles.errorMessage}>{error}</div> : null}
    </AuthLayout>
  );
}
