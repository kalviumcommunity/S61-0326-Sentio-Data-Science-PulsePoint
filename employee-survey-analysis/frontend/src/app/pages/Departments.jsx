import React from 'react';


const barStyle = {
  height: 18,
  borderRadius: 8,
  background: '#1976d2',
  margin: '4px 0',
};
const heatmapColors = [
  '#ffeaea', '#fff3e0', '#fffde7', '#e8f5e9', '#e3f2fd', '#f3e5f5', '#fce4ec', '#f9fbe7', '#e0f2f1', '#fbe9e7',
];
const departments = [
  { name: 'Support', score: 5.5 },
  { name: 'Sales', score: 5.5 },
  { name: 'Operations', score: 6.0 },
  { name: 'Marketing', score: 6.2 },
  { name: 'Finance', score: 6.9 },
  { name: 'Product', score: 7.0 },
  { name: 'HR', score: 7.0 },
  { name: 'Legal', score: 7.3 },
  { name: 'Engineering', score: 7.4 },
  { name: 'Design', score: 7.8 },
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
  [7.8, 7.6, 7.4, 7.7],
];

export default function Departments() {
  return (
    <div style={{ padding: '2rem', maxWidth: 1100 }}>
      <h2 style={{ marginBottom: '1rem' }}>Department Insights</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h4>Satisfaction by Department</h4>
          <div>
            {departments.map((d, i) => (
              <div key={d.name} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                  <span>{d.name}</span>
                  <span style={{ fontWeight: 600 }}>{d.score}</span>
                </div>
                <div style={{ ...barStyle, width: `${(d.score / 8) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <h4>Dissatisfaction Heatmap</h4>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f7f7fa' }}>
                <th style={{ padding: 8 }}>Department</th>
                <th>Q1 2024</th>
                <th>Q2 2024</th>
                <th>Q3 2024</th>
                <th>Q4 2024</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d, i) => (
                <tr key={d.name}>
                  <td style={{ padding: 8 }}>{d.name}</td>
                  {heatmap[i].map((val, j) => (
                    <td key={j} style={{ background: heatmapColors[j % heatmapColors.length], textAlign: 'center', fontWeight: 600, padding: 8 }}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

