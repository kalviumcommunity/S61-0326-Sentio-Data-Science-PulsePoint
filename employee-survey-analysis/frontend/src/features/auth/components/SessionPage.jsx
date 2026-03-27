import styles from "../styles/SessionPage.module.css";

export default function SessionPage({ session, onLogout }) {
  return (
    <main className={styles.pageShell}>
      <section className={styles.sessionCard}>
        <div className={styles.brandBadge}>PulsePoint</div>
        <p className={styles.eyebrow}>Authenticated with FastAPI + PostgreSQL</p>
        <h1 className={styles.title}>Welcome, {session.user.full_name}</h1>
        <p className={styles.description}>
          Your account is now stored in PostgreSQL and your frontend session is
          using the token returned by the FastAPI backend.
        </p>

        <dl className={styles.detailGrid}>
          <div className={styles.detailCard}>
            <dt>Email</dt>
            <dd>{session.user.email}</dd>
          </div>
          <div className={styles.detailCard}>
            <dt>User ID</dt>
            <dd>{session.user.id}</dd>
          </div>
          <div className={styles.detailCard}>
            <dt>Created At</dt>
            <dd>{new Date(session.user.created_at).toLocaleString()}</dd>
          </div>
        </dl>

        <button type="button" className={styles.logoutButton} onClick={onLogout}>
          Sign out
        </button>
      </section>
    </main>
  );
}
