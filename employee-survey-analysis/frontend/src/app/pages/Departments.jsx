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
};

const row = {
  display: "flex",
  gap: "1.5rem",
};

const barContainer = {
  height: 10,
  background: "#e5e7eb",
  borderRadius: 999,
  overflow: "hidden",
};

const getHeatColor = (value) => {
  if (value < 6) return "#fee2e2"; // red
  if (value < 6.5) return "#fef3c7"; // yellow
  if (value < 7.2) return "#e0f2fe"; // blue-ish
  return "#dcfce7"; // green
};

const departments = [
  { name: "Support", score: 5.5, responses: 340, negative: "48%" },
  { name: "Sales", score: 5.8, responses: 310, negative: "42%" },
  { name: "Operations", score: 6.0, responses: 280, negative: "38%" },
  { name: "Marketing", score: 6.2, responses: 180, negative: "35%" },
  { name: "Finance", score: 6.9, responses: 145, negative: "24%" },
  { name: "Product", score: 7.0, responses: 210, negative: "22%" },
  { name: "HR", score: 7.1, responses: 95, negative: "20%" },
  { name: "Engineering", score: 7.4, responses: 420, negative: "18%" },
  { name: "Legal", score: 7.3, responses: 67, negative: "16%" },
  { name: "Design", score: 7.6, responses: 120, negative: "14%" },
];

const heatmap = [
  [6.1, 5.8, 5.5, 5.8],
  [5.9, 5.6, 5.3, 5.5],
  [6.3, 6.0, 5.8, 6.0],
  [6.5, 6.2, 6.0, 6.2],
  [7.0, 6.9, 6.8, 6.9],
  [7.2, 7.0, 6.8, 7.0],
  [7.3, 7.1, 7.0, 7.1],
  [7.5, 7.4, 7.2, 7.4],
  [7.4, 7.3, 7.1, 7.3],
  [7.8, 7.6, 7.4, 7.6],
];

export default function Departments() {
  return (
    <div style={container}>
      {/* Header */}
      <h2 style={{ marginBottom: 4 }}>Department Insights</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Compare satisfaction metrics across departments
      </p>

      {/* Top Section */}
      <div style={{ ...row, marginBottom: "2rem" }}>
        {/* Bar Chart */}
        <div style={{ ...card, flex: 1 }}>
          <h4 style={{ marginBottom: "1rem" }}>
            Satisfaction by Department
          </h4>

          {departments.map((d) => (
            <div key={d.name} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                <span>{d.name}</span>
                <strong>{d.score}</strong>
              </div>

              <div style={barContainer}>
                <div
                  style={{
                    width: `${(d.score / 8) * 100}%`,
                    height: "100%",
                    background: "#3b82f6",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div style={{ ...card, flex: 2 }}>
          <h4 style={{ marginBottom: "1rem" }}>
            Dissatisfaction Heatmap
          </h4>

          <table style={{ width: "100%", borderSpacing: "8px" }}>
            <thead>
              <tr style={{ textAlign: "left", fontSize: 13 }}>
                <th>Department</th>
                <th>Q1 2024</th>
                <th>Q2 2024</th>
                <th>Q3 2024</th>
                <th>Q4 2024</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((d, i) => (
                <tr key={d.name}>
                  <td style={{ fontWeight: 500 }}>{d.name}</td>

                  {heatmap[i].map((val, j) => (
                    <td key={j}>
                      <div
                        style={{
                          background: getHeatColor(val),
                          padding: "8px 0",
                          textAlign: "center",
                          borderRadius: 8,
                          fontWeight: 600,
                        }}
                      >
                        {val}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={card}>
        <h4 style={{ marginBottom: "1rem" }}>
          Department Details
        </h4>

        {departments.map((d) => (
          <div
            key={d.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <div style={{ fontWeight: 500 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                {d.responses} responses
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600 }}>
                {d.score}/10
              </div>
              <div style={{ fontSize: 12, color: "red" }}>
                {d.negative} negative
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}