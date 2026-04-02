
import { useEffect, useState } from "react";
import { fetchDashboardOverview } from "../api/authClient";
import styles from "../styles/SessionPage.module.css";
import Overview from "../../../app/pages/Overview";
import Departments from "../../../app/pages/Departments";
import Trends from "../../../app/pages/Trends";
import FeedbackExplorer from "../../../app/pages/FeedbackExplorer";

const sidebarSections = [
  {
    title: "Analytics",
    items: ["Overview", "Departments", "Trends", "Feedback Explorer"],
  },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="11"
        cy="11"
        r="6.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m16 16 4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.5 17.25h9l-1.1-1.2v-4.1a3.4 3.4 0 0 0-2.65-3.32V7.9a.75.75 0 1 0-1.5 0v.73A3.4 3.4 0 0 0 8.6 11.95v4.1l-1.1 1.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.1 18.25a2 2 0 0 0 3.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 18V6M11 18v-8M16 18V9M4 18.5h16"
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
        d="M8.8 12.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.8 17.9v-.7a2.9 2.9 0 0 1 2.9-2.9H9.9a2.9 2.9 0 0 1 2.9 2.9v.7M16.2 11.2a2.3 2.3 0 1 0 0-4.6M18.9 18v-.5a2.5 2.5 0 0 0-2.5-2.5h-.4"
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
        d="m5 16 4.6-4.4 3.1 3.2L19 8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8 8.8H19v4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.8 20 18.5H4L12 4.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.7v4.2M12 16.8h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getMetricIcon(icon) {
  if (icon === "users") return <UsersIcon />;
  if (icon === "trend") return <TrendIcon />;
  return <CardIcon />;
}

function buildTrendPath(data) {
  if (data.length <= 1) return "";

  const width = 640;
  const height = 220;
  const minValue = 5;
  const maxValue = 8;
  const stepX = width / (data.length - 1);

  return data
    .map((point, index) => {
      const x = index * stepX;
      const normalized = (point.value - minValue) / (maxValue - minValue);
      const y = height - normalized * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function buildAreaPath(data) {
  if (data.length <= 1) return "";

  const width = 640;
  const height = 220;
  const minValue = 5;
  const maxValue = 8;
  const stepX = width / (data.length - 1);
  const topPath = data
    .map((point, index) => {
      const x = index * stepX;
      const normalized = (point.value - minValue) / (maxValue - minValue);
      const y = height - normalized * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return `${topPath} L ${width} ${height} L 0 ${height} Z`;
}

function buildDonutGradient(segments) {
  let current = 0;
  const stops = segments.map((segment) => {
    const start = current;
    current += segment.value;
    return `${segment.color} ${start}% ${current}%`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}


export default function SessionPage({ session, onLogout }) {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchDashboardOverview(session.access_token);
        if (isMounted) {
          setDashboard(response);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [session.access_token]);

  const initials = session.user.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const metricCards = dashboard?.metrics ?? [];
  const sentimentData = dashboard?.sentiment_segments ?? [];
  const monthlyTrend = dashboard?.trend_points ?? [];
  const teamFocusAreas = dashboard?.focus_areas ?? [];
  const feedbackThemes = dashboard?.feedback_themes ?? [];
  const volumePoints = dashboard?.volume_points ?? [];
  const maxVolumeValue = Math.max(...volumePoints.map((item) => item.value), 1);
  const donutStyle = sentimentData.length
    ? { background: buildDonutGradient(sentimentData) }
    : undefined;
  const linePath = buildTrendPath(monthlyTrend);
  const areaPath = buildAreaPath(monthlyTrend);

  return (
    <main
      className={`${styles.dashboardShell} ${!isSidebarOpen ? styles.dashboardShellCollapsed : ""}`}
    >
      <aside
        id="app-sidebar"
        className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.brandBadge}>PP</div>
          <div>
            <div className={styles.brandName}>PulsePoint</div>
            <div className={styles.brandSubtitle}>Employee Analytics</div>
          </div>
        </div>

        <div className={styles.sidebarSections}>
          {sidebarSections.map((section) => (
            <section key={section.title} className={styles.sidebarSection}>
              <p className={styles.sidebarLabel}>{section.title}</p>
              <nav className={styles.sidebarNav}>
                {section.items.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`${styles.navItem} ${selectedPage === item ? styles.navItemActive : ""}`}
                    onClick={() => setSelectedPage(item)}
                  >
                    <span className={styles.navIcon}>{index + 1}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </nav>
            </section>
          ))}
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>{initials}</div>
          <div className={styles.profileCopy}>
            <div className={styles.profileName}>{session.user.full_name}</div>
            <div className={styles.profileRole}>HR Director</div>
            <div className={styles.profileEmail}>{session.user.email}</div>
          </div>
          <button type="button" className={styles.signOutButton} onClick={onLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <section className={styles.dashboardMain}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.topbarButton}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-controls="app-sidebar"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            <MenuIcon />
          </button>

          <label className={styles.searchBar}>
            <SearchIcon />
            <input type="search" placeholder="Search surveys, departments, topics..." />
          </label>

          <div className={styles.topbarActions}>
            <button type="button" className={styles.notificationButton} aria-label="Notifications">
              <BellIcon />
              <span className={styles.notificationDot} />
            </button>
            <div className={styles.topbarAvatar}>{initials}</div>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          {selectedPage === "Overview" && <Overview />}
          {selectedPage === "Departments" && <Departments />}
          {selectedPage === "Trends" && <Trends />}
          {selectedPage === "Feedback Explorer" && <FeedbackExplorer />}
        </div>
      </section>
    </main>
  );
}
