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
  flex: 1,
};

const row = {
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
};

function buildPolyline(data, maxValue, width = 520, height = 180) {
  if (!data.length) return "";

  return data
    .map((point, index) => {
      const x = data.length === 1 ? width / 2 : (index / (data.length - 1)) * width;
      const y = height - (point.value / maxValue) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function renderState(message) {
  return (
    <div style={container}>
      <div style={card}>{message}</div>
    </div>
  );
}

export default function Trends({ dashboard, isLoading, error }) {
  if (isLoading) {
    return renderState("Loading trend data...");
  }

  if (error) {
    return renderState(error);
  }

  if (!dashboard) {
    return renderState("No trend data is available yet.");
  }

  const trendPoints = dashboard.trend_points ?? [];
  const volumePoints = dashboard.volume_points ?? [];
  const maxTrendValue = Math.max(...trendPoints.map((point) => point.value), 1);
  const maxVolumeValue = Math.max(...volumePoints.map((point) => point.value), 1);
  const latestTrend = trendPoints[trendPoints.length - 1];
  const firstTrend = trendPoints[0];
  const trendDelta =
    latestTrend && firstTrend ? (latestTrend.value - firstTrend.value).toFixed(1) : null;

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 4 }}>Time-Based Trends</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Satisfaction and response patterns from the latest dashboard snapshot
      </p>

      <div style={{ ...row, marginBottom: "1.5rem" }}>
        <div style={{ ...card, flex: "1 1 220px" }}>
          <div style={{ color: "#6b7280", fontSize: 14 }}>Starting Score</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{firstTrend?.value ?? "--"}</div>
        </div>
        <div style={{ ...card, flex: "1 1 220px" }}>
          <div style={{ color: "#6b7280", fontSize: 14 }}>Latest Score</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{latestTrend?.value ?? "--"}</div>
        </div>
        <div style={{ ...card, flex: "1 1 220px" }}>
          <div style={{ color: "#6b7280", fontSize: 14 }}>Net Change</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{trendDelta ?? "--"}</div>
        </div>
      </div>

      <div style={row}>
        <div style={{ ...card, flex: "2 1 520px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Satisfaction Score Over Time</h4>

          {trendPoints.length ? (
            <>
              <div
                style={{
                  height: 220,
                  background: "linear-gradient(to top, #e0ecff, #f8fbff)",
                  borderRadius: 8,
                  padding: "1rem",
                }}
              >
                <svg width="100%" height="180" viewBox="0 0 520 180" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    points={buildPolyline(trendPoints, maxTrendValue)}
                  />
                </svg>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 8,
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {trendPoints.map((point) => (
                  <span key={point.label}>{point.label}</span>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#6b7280" }}>No trend points were returned by the API.</div>
          )}
        </div>

        <div style={{ ...card, flex: "1 1 320px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Weekly Feedback Volume</h4>

          {volumePoints.length ? (
            <>
              <div style={{ display: "grid", gap: "0.85rem" }}>
                {volumePoints.map((point) => (
                  <div key={point.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        marginBottom: 6,
                      }}
                    >
                      <span>{point.label}</span>
                      <strong>{point.value}</strong>
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: "#e2e8f0",
                        borderRadius: 999,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(point.value / maxVolumeValue) * 100}%`,
                          height: "100%",
                          background: "#0f766e",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#6b7280" }}>No volume points were returned by the API.</div>
          )}
        </div>
      </div>
    </div>
  );
}
