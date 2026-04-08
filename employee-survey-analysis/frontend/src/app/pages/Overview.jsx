const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f5f7fb",
  padding: "2rem",
  fontFamily: "Inter, sans-serif",
};

const card = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const row = {
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
};

const alertBox = {
  ...card,
  border: "1px solid #f5c2c7",
  backgroundColor: "#fff1f2",
  color: "#842029",
};

const stateCard = {
  ...card,
  color: "#475569",
};

function buildDonutGradient(segments) {
  let current = 0;
  const stops = segments.map((segment) => {
    const start = current;
    current += segment.value;
    return `${segment.color} ${start}% ${current}%`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function buildTrendPoints(points, width = 520, height = 180) {
  if (points.length === 0) return "";

  const values = points.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
      const y = height - ((point.value - minValue) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

function renderState(message) {
  return (
    <div style={containerStyle}>
      <div style={stateCard}>{message}</div>
    </div>
  );
}

export default function Overview({ dashboard, isLoading, error }) {
  if (isLoading) {
    return renderState("Loading the latest dashboard snapshot...");
  }

  if (error) {
    return renderState(error);
  }

  if (!dashboard) {
    return renderState("No dashboard data is available yet.");
  }

  const sentimentData = dashboard.sentiment_segments ?? [];
  const trendPoints = dashboard.trend_points ?? [];
  const leadSegment =
    sentimentData.find((segment) => segment.label.toLowerCase() === "positive") ??
    sentimentData[0];
  const donutStyle = sentimentData.length
    ? {
        width: 140,
        height: 140,
        borderRadius: "50%",
        background: buildDonutGradient(sentimentData),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }
    : undefined;
  const trendPolyline = buildTrendPoints(trendPoints);

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "0.3rem" }}>{dashboard.title}</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>{dashboard.subtitle}</p>

      <div style={{ ...alertBox, marginBottom: "1.5rem" }}>
        <strong>{dashboard.alert_title}</strong>
        <div style={{ marginTop: 6, fontSize: 14 }}>{dashboard.alert_text}</div>
      </div>

      <div style={{ ...row, marginBottom: "2rem" }}>
        {dashboard.metrics.map((metric) => (
          <div key={metric.title} style={{ ...card, flex: "1 1 180px" }}>
            <div style={{ fontSize: 14, color: "#6b7280" }}>{metric.title}</div>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>{metric.value}</div>
            <div
              style={{
                color: metric.tone === "up" ? "green" : "#dc2626",
                fontSize: 13,
              }}
            >
              {metric.trend} · {metric.detail}
            </div>
          </div>
        ))}
      </div>

      <div style={row}>
        <div style={{ ...card, flex: "1 1 280px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Sentiment Distribution</h4>

          {leadSegment ? (
            <>
              <div style={donutStyle}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <strong>{leadSegment.value}%</strong>
                  <span style={{ fontSize: 12, color: leadSegment.color }}>
                    {leadSegment.label}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                {sentimentData.map((segment) => (
                  <div key={segment.label} style={{ color: segment.color }}>
                    ● {segment.label} {segment.value}%
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#6b7280" }}>No sentiment data available.</div>
          )}
        </div>

        <div style={{ ...card, flex: "2 1 480px" }}>
          <h4 style={{ marginBottom: "1rem" }}>Satisfaction Trend</h4>

          {trendPoints.length ? (
            <>
              <div
                style={{
                  height: 220,
                  borderRadius: 8,
                  background: "linear-gradient(to top, #e0ecff, #f8fbff)",
                  padding: "1rem",
                }}
              >
                <svg width="100%" height="180" viewBox="0 0 520 180" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    points={trendPolyline}
                  />
                </svg>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 8,
                  flexWrap: "wrap",
                }}
              >
                {trendPoints.map((point) => (
                  <span key={point.label}>{point.label}</span>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#6b7280" }}>No trend data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
