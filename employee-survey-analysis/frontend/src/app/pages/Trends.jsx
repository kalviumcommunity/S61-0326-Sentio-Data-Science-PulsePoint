import React from "react";

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
};

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

// sample data (same as UI)
const satisfaction = [7.2, 7.0, 6.8, 6.5, 6.3, 6.7, 6.9, 7.1, 7.0, 6.8, 6.5, 6.9];
const negative = [22, 24, 26, 30, 33, 29, 28, 25, 27, 29, 31, 28];

// helper to convert data to svg points
const getPoints = (data, max, height = 160, width = 400) => {
  return data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (val / max) * height;
      return `${x},${y}`;
    })
    .join(" ");
};

export default function Trends() {
  return (
    <div style={container}>
      {/* Header */}
      <h2 style={{ marginBottom: 4 }}>Time-Based Trends</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Track sentiment changes over months and quarters
      </p>

      <div style={row}>
        {/* Satisfaction Chart */}
        <div style={card}>
          <h4 style={{ marginBottom: "1rem" }}>
            Satisfaction Score Over Time
          </h4>

          <div
            style={{
              height: 200,
              background: "linear-gradient(to top, #e0ecff, #f8fbff)",
              borderRadius: 8,
              padding: "1rem",
            }}
          >
            <svg width="100%" height="160">
              {/* Line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points={getPoints(satisfaction, 8)}
              />

              {/* Dots */}
              {satisfaction.map((val, i) => {
                const x = (i / (satisfaction.length - 1)) * 400;
                const y = 160 - (val / 8) * 160;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#3b82f6"
                  />
                );
              })}
            </svg>
          </div>

          {/* Months */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#6b7280",
              marginTop: 8,
            }}
          >
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Negative Sentiment */}
        <div style={card}>
          <h4 style={{ marginBottom: "1rem" }}>
            Negative Sentiment % Over Time
          </h4>

          <div
            style={{
              height: 200,
              background: "linear-gradient(to top, #ffe4e6, #fff)",
              borderRadius: 8,
              padding: "1rem",
            }}
          >
            <svg width="100%" height="160">
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                points={getPoints(negative, 40)}
              />

              {negative.map((val, i) => {
                const x = (i / (negative.length - 1)) * 400;
                const y = 160 - (val / 40) * 160;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ef4444"
                  />
                );
              })}
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
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}