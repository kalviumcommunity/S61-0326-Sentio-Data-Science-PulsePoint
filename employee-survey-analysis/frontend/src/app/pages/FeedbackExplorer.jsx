import React, { useState, useMemo } from "react";

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

const pill = (bg, color) => ({
  background: bg,
  color: color,
  fontSize: 12,
  fontWeight: 600,
  padding: "4px 8px",
  borderRadius: 999,
  display: "inline-block",
  marginRight: 8,
});

const highlight = {
  background: "#fee2e2",
  color: "#dc2626",
  padding: "2px 4px",
  borderRadius: 4,
  fontWeight: 500,
};

const feedbacks = [
  {
    sentiment: "NEGATIVE",
    role: "Sales · Account Executive",
    text: "The constant overtime and unrealistic targets are burning everyone out. Management doesn't listen to our concerns about workload.",
    date: "2024-12-15",
    score: "3/10",
  },
  {
    sentiment: "POSITIVE",
    role: "Engineering · Senior Developer",
    text: "Great team culture and interesting projects. Would love more clarity on promotion criteria though.",
    date: "2024-12-14",
    score: "8/10",
  },
  {
    sentiment: "NEGATIVE",
    role: "Support · Customer Support Lead",
    text: "We are severely understaffed. The burnout is real and management keeps adding more responsibilities without extra pay.",
    date: "2024-12-13",
    score: "2/10",
  },
  {
    sentiment: "NEUTRAL",
    role: "Marketing · Content Strategist",
    text: "Work is fine but there's not much room for growth. Would appreciate more training opportunities.",
    date: "2024-12-12",
    score: "6/10",
  },
];

const getSentimentStyle = (type) => {
  if (type === "NEGATIVE") return pill("#fee2e2", "#dc2626");
  if (type === "POSITIVE") return pill("#dcfce7", "#16a34a");
  return pill("#e0f2fe", "#2563eb");
};

// highlight keywords like screenshot
const highlightText = (text) => {
  const keywords = ["overtime", "burnout", "management", "understaffed"];
  let result = text;

  keywords.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    result = result.replace(
      regex,
      `<span style="background:#fee2e2;color:#dc2626;padding:2px 4px;border-radius:4px;">$1</span>`
    );
  });

  return result;
};
export default function FeedbackExplorer() {
  const [search, setSearch] = useState("");

  // Filter feedbacks by search text (case-insensitive, matches in text)
  const filteredFeedbacks = useMemo(() => {
    if (!search.trim()) return feedbacks;
    return feedbacks.filter((f) =>
      f.text.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  return (
    <div style={container}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: 4 }}>Feedback Explorer</h2>
        <p style={{ color: "#6b7280" }}>
          Browse and search raw employee responses
        </p>
      </div>

      {/* Top Controls */}
      <div
        style={{
          ...card,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          placeholder="Search comments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
          }}
        />

        <select style={{ padding: 8, borderRadius: 8 }}>
          <option>All Sentiments</option>
        </select>

        <select style={{ padding: 8, borderRadius: 8 }}>
          <option>All Departments</option>
        </select>

        <span style={{ fontSize: 13, color: "#6b7280" }}>
          {filteredFeedbacks.length} result{filteredFeedbacks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Feedback List */}
      {filteredFeedbacks.length === 0 ? (
        <div style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>
          No comments found.
        </div>
      ) : (
        filteredFeedbacks.map((f, i) => (
          <div key={i} style={card}>
            {/* Top Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                alignItems: "center",
              }}
            >
              <div>
                <span style={getSentimentStyle(f.sentiment)}>
                  {f.sentiment}
                </span>
                <span style={{ color: "#6b7280", fontSize: 13 }}>
                  {f.role}
                </span>
              </div>

              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {f.date} &nbsp; <strong>{f.score}</strong>
              </div>
            </div>

            {/* Text */}
            <div
              style={{ fontSize: 15, color: "#374151" }}
              dangerouslySetInnerHTML={{
                __html: highlightText(f.text),
              }}
            />
          </div>
        ))
      )}
    </div>
); }