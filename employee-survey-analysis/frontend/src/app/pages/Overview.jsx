import React from "react";

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

const statCard = {
  ...card,
  flex: 1,
};

const row = {
  display: "flex",
  gap: "1.5rem",
};

const alertBox = {
  ...card,
  border: "1px solid #f5c2c7",
  backgroundColor: "#fff1f2",
  color: "#842029",
};

const donut = {
  width: 140,
  height: 140,
  borderRadius: "50%",
  background:
    "conic-gradient(#22c55e 0% 42%, #94a3b8 42% 72%, #ef4444 72% 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  position: "relative",
};

const donutInner = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export default function Overview() {
  return (
    <div style={containerStyle}>
      {/* Header */}
      <h2 style={{ marginBottom: "0.3rem" }}>
        Employee Engagement Dashboard
      </h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Q4 2024 Survey Analysis — 2,847 responses collected
      </p>

      {/* Alert */}
      <div style={{ ...alertBox, marginBottom: "1.5rem" }}>
        <strong>⚠ Attention Required</strong>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          Support — Satisfaction Score{" "}
          <span style={{ color: "green" }}>-12%</span> (last 30 days)
          <br />
          Sales — Negative Sentiment{" "}
          <span style={{ color: "red" }}>+18%</span> (last quarter)
        </div>
      </div>

      {/* Stats */}
      <div style={{ ...row, marginBottom: "2rem" }}>
        <div style={statCard}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Overall Satisfaction
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold" }}>6.8/10</div>
          <div style={{ color: "red", fontSize: 13 }}>↓ -4.2%</div>
        </div>

        <div style={statCard}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Negative Sentiment
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold" }}>28.4%</div>
          <div style={{ color: "red", fontSize: 13 }}>↓ 17.8%</div>
        </div>

        <div style={statCard}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Total Responses
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold" }}>2,847</div>
          <div style={{ color: "green", fontSize: 13 }}>↑ +12%</div>
        </div>

        <div style={statCard}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Topics Detected
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold" }}>8</div>
          <div style={{ color: "green", fontSize: 13 }}>↑ 2 new</div>
        </div>

        {/* New Stat Card: Average Employee Age */}
        <div style={statCard}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>
            Average Employee Age
          </div>
          <div style={{ fontSize: 28, fontWeight: "bold" }}>31.67</div>
          <div style={{ color: "#64748b", fontSize: 13 }}>Sample Data</div>
        </div>
      </div>

      {/* Charts */}
      <div style={row}>
        {/* Donut */}
        <div style={{ ...card, flex: 1 }}>
          <h4 style={{ marginBottom: "1rem" }}>
            Sentiment Distribution
          </h4>

          <div style={donut}>
            <div style={donutInner}>
              <strong>42%</strong>
              <span style={{ fontSize: 12, color: "#22c55e" }}>
                Positive
              </span>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ color: "#22c55e" }}>● Positive 42%</div>
            <div style={{ color: "#64748b" }}>● Neutral 30%</div>
            <div style={{ color: "#ef4444" }}>● Negative 28%</div>
          </div>
        </div>

        {/* Line Chart */}
        <div style={{ ...card, flex: 2 }}>
          <h4 style={{ marginBottom: "1rem" }}>
            Satisfaction Trend
          </h4>

          <div
            style={{
              height: 200,
              borderRadius: 8,
              background:
                "linear-gradient(to top, #e0ecff, #f8fbff)",
              position: "relative",
              padding: "1rem",
            }}
          >
            {/* Fake line */}
            <svg width="100%" height="100%">
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                points="0,120 60,110 120,100 180,120 240,90 300,80 360,100 420,110"
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
            }}
          >
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </div>
      </div>
    </div>
  );
}