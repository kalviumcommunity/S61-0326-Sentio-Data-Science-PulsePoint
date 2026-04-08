const container = {
  padding: "2rem",
  background: "#f5f7fb",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const row = {
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
};

const toneStyles = {
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
};

function getToneStyle(tone) {
  return toneStyles[tone] ?? { background: "#e2e8f0", color: "#475569" };
}

function renderState(message) {
  return (
    <div style={container}>
      <div style={card}>{message}</div>
    </div>
  );
}

export default function Departments({ dashboard, isLoading, error }) {
  if (isLoading) {
    return renderState("Loading department insights...");
  }

  if (error) {
    return renderState(error);
  }

  if (!dashboard) {
    return renderState("No department data is available yet.");
  }

  const focusAreas = dashboard.focus_areas ?? [];
  const feedbackThemes = dashboard.feedback_themes ?? [];

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 4 }}>Department Insights</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Prioritized teams and themes from the latest dashboard snapshot
      </p>

      <div style={{ ...row, marginBottom: "2rem" }}>
        <div style={{ ...card, flex: "1 1 420px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Teams Requiring Attention</h4>

          {focusAreas.length ? (
            focusAreas.map((area) => {
              const toneStyle = getToneStyle(area.tone);

              return (
                <div
                  key={area.team}
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <strong>{area.team}</strong>
                    <span
                      style={{
                        ...toneStyle,
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "4px 10px",
                        textTransform: "capitalize",
                      }}
                    >
                      {area.tone}
                    </span>
                  </div>
                  <p style={{ marginTop: 10, color: "#475569" }}>{area.note}</p>
                </div>
              );
            })
          ) : (
            <div style={{ color: "#6b7280" }}>No focus areas were returned by the API.</div>
          )}
        </div>

        <div style={{ ...card, flex: "1 1 320px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Improvement Themes</h4>

          {feedbackThemes.length ? (
            feedbackThemes.map((theme) => (
              <div
                key={theme.title}
                style={{
                  padding: "1rem",
                  borderRadius: 10,
                  background: "#f8fafc",
                  marginBottom: "0.85rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <strong>{theme.title}</strong>
                  <span style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>
                    {theme.trend}
                  </span>
                </div>
                <div style={{ color: "#475569", fontSize: 14 }}>{theme.description}</div>
              </div>
            ))
          ) : (
            <div style={{ color: "#6b7280" }}>No themes were returned by the API.</div>
          )}
        </div>
      </div>
    </div>
  );
}
