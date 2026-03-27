import styles from "../styles/AuthLayout.module.css";

const features = [
  {
    key: "users",
    title: "Track satisfaction across departments",
  },
  {
    key: "trend",
    title: "Monitor sentiment trends over time",
  },
  {
    key: "message",
    title: "Explore employee feedback themes",
  },
  {
    key: "insights",
    title: "Actionable insights & alerts",
  },
];

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 19.25V6.75a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 16V11M13 16V8M17 16v-4M4 19.25h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16.5 18.75v-1.1a3.1 3.1 0 0 0-3.1-3.1H8.1A3.1 3.1 0 0 0 5 17.65v1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18.4 18.25v-.9a2.7 2.7 0 0 0-2.7-2.7h-.35M15.4 5.7a2.65 2.65 0 0 1 0 5.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m5 16.5 5-5 3.2 3.2L19 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9H19v4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.5 6.5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H10l-4.5 3v-3H5.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InsightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 19.25h14M7.75 16.25V9.5M12 16.25v-9M16.25 16.25v-4.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.googleIcon}>
      <path
        d="M21.6 12.23c0-.71-.06-1.21-.19-1.74H12v3.46h5.53c-.11.86-.73 2.15-2.1 3.02l-.02.12 3.05 2.36.21.02c1.9-1.75 2.93-4.32 2.93-7.24Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.96-.89 6.61-2.42l-3.24-2.51c-.87.61-2.03 1.03-3.37 1.03-2.64 0-4.88-1.74-5.67-4.15l-.11.01-3.17 2.45-.04.1A9.98 9.98 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.33 13.95A5.98 5.98 0 0 1 6 12c0-.68.12-1.33.32-1.95l-.01-.13-3.2-2.49-.1.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.01 4.52l3.32-2.57Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.9c1.68 0 2.81.72 3.46 1.32l2.53-2.47C16.95 3.79 14.7 3 12 3a9.98 9.98 0 0 0-8.99 5.48l3.31 2.57C7.11 7.64 9.36 5.9 12 5.9Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FeatureIcon({ name }) {
  if (name === "users") return <UsersIcon />;
  if (name === "trend") return <TrendIcon />;
  if (name === "message") return <MessageIcon />;
  return <InsightIcon />;
}

export default function AuthLayout({
  heading,
  description,
  googleSection,
  submitLabel,
  onSubmit,
  switchPrompt,
  switchLabel,
  onSwitchClick,
  children,
}) {
  return (
    <div className={styles.authPage}>
      <section className={styles.heroPanel}>
        <div className={styles.brandRow}>
          <div className={styles.brandMark}>
            <AnalyticsIcon />
          </div>
          <div>
            <div className={styles.brandName}>PulsePoint</div>
            <div className={styles.brandSubtitle}>Employee Analytics</div>
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Understand your team.
            <br />
            Improve engagement.
          </h1>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <div key={feature.key} className={styles.featureCard}>
                <span className={styles.featureIcon}>
                  <FeatureIcon name={feature.key} />
                </span>
                <span>{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={styles.copyright}>© 2026 PulsePoint. All rights reserved.</p>
      </section>

      <section className={styles.formPanel}>
        <form className={styles.authForm} onSubmit={onSubmit}>
          <div className={styles.formHeader}>
            <h2>{heading}</h2>
            <p>{description}</p>
          </div>

          <div className={styles.fieldStack}>{children}</div>

          <button type="submit" className={styles.primaryButton}>
            {submitLabel}
          </button>

          <div className={styles.divider}>
            <span>OR CONTINUE WITH</span>
          </div>

          {googleSection || (
            <button type="button" className={styles.googleButton}>
              <GoogleIcon />
              Continue with Google
            </button>
          )}

          <p className={styles.switchText}>
            {switchPrompt}
            <button
              type="button"
              className={styles.linkButton}
              onClick={onSwitchClick}
            >
              {switchLabel}
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}
