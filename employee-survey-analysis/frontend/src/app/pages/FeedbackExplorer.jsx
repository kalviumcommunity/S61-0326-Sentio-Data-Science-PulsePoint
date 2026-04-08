import { useMemo, useState } from "react";

const container = {
  padding: "2rem",
  background: "#f5f7fb",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "1rem 1.25rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  marginBottom: "1rem",
};

const tonePill = {
  positive: {
    background: "#dcfce7",
    color: "#15803d",
  },
  alert: {
    background: "#fef3c7",
    color: "#b45309",
  },
  danger: {
    background: "#fee2e2",
    color: "#dc2626",
  },
  theme: {
    background: "#dbeafe",
    color: "#1d4ed8",
  },
};

function getPillStyle(kind) {
  return {
    ...(tonePill[kind] ?? tonePill.theme),
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 8px",
    borderRadius: 999,
    display: "inline-block",
    marginRight: 8,
    textTransform: "capitalize",
  };
}

function renderState(message) {
  return (
    <div style={container}>
      <div style={card}>{message}</div>
    </div>
  );
}

export default function FeedbackExplorer({ dashboard, isLoading, error }) {
  const [search, setSearch] = useState("");
  const entries = useMemo(() => {
    if (!dashboard) return [];

    return [
      ...(dashboard.feedback_themes ?? []).map((theme) => ({
        id: `theme-${theme.title}`,
        label: theme.trend,
        kind: "theme",
        title: theme.title,
        subtitle: "Extracted theme",
        description: theme.description,
      })),
      ...(dashboard.focus_areas ?? []).map((area) => ({
        id: `focus-${area.team}`,
        label: area.tone,
        kind: area.tone,
        title: area.team,
        subtitle: "Priority team",
        description: area.note,
      })),
    ];
  }, [dashboard]);
  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;

    const query = search.trim().toLowerCase();
    return entries.filter((entry) =>
      [entry.title, entry.subtitle, entry.description, entry.label]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [entries, search]);

  if (isLoading) {
    return renderState("Loading feedback themes...");
  }

  if (error) {
    return renderState(error);
  }

  if (!dashboard) {
    return renderState("No feedback data is available yet.");
  }

  return (
    <div style={container}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: 4 }}>Feedback Explorer</h2>
        <p style={{ color: "#6b7280" }}>
          Search the latest extracted themes and focus areas from the API
        </p>
      </div>

      <div
        style={{
          ...card,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search themes or teams..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            flex: "1 1 260px",
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
          }}
        />

        <span style={{ fontSize: 13, color: "#6b7280" }}>
          {filteredEntries.length} result{filteredEntries.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredEntries.length === 0 ? (
        <div style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>
          No themes matched your search.
        </div>
      ) : (
        filteredEntries.map((entry) => (
          <div key={entry.id} style={card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <span style={getPillStyle(entry.kind)}>{entry.label}</span>
                <span style={{ color: "#6b7280", fontSize: 13 }}>{entry.subtitle}</span>
              </div>

              <strong style={{ color: "#0f172a" }}>{entry.title}</strong>
            </div>

            <div style={{ fontSize: 15, color: "#374151" }}>{entry.description}</div>
          </div>
        ))
      )}
    </div>
  );
}
