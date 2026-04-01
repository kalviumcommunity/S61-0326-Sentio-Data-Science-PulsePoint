import React from 'react';


const cardStyle = {
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
};
const statStyle = {
  background: '#f7f7fa',
  borderRadius: '12px',
  padding: '1.5rem',
  minWidth: '120px',
  textAlign: 'center',
  boxShadow: '0 1px 4px #e0e0e0',
};
const alertStyle = {
  background: '#ffeaea',
  color: '#b71c1c',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1.5rem',
  fontWeight: 500,
};
const pieStyle = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: 'conic-gradient(#4caf50 0% 42%, #bdbdbd 42% 72%, #e53935 72% 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};

export default function Overview() {
  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <h2 style={{ marginBottom: '1rem' }}>Employee Engagement Dashboard</h2>
      <div style={alertStyle}>
        <div>Attention Required</div>
        <div style={{ fontSize: 14, marginTop: 4 }}>
          Support — Satisfaction Score <b>-12%</b> (last 30 days)<br />
          Sales — Negative Sentiment <b>+18%</b> (last quarter)
        </div>
      </div>
      <div style={cardStyle}>
        <div style={statStyle}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>6.8/10</div>
          <div style={{ color: '#888' }}>Overall Satisfaction</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>28.4%</div>
          <div style={{ color: '#888' }}>Negative Sentiment</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>2,847</div>
          <div style={{ color: '#888' }}>Total Responses</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>8</div>
          <div style={{ color: '#888' }}>Topics Detected</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', marginTop: 32 }}>
        <div style={{ flex: 1 }}>
          <h4>Sentiment Distribution</h4>
          <div style={pieStyle}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>42%</div>
              <div style={{ fontSize: 13, color: '#4caf50' }}>Positive</div>
            </div>
          </div>
          <ul style={{ marginTop: 16, fontSize: 15 }}>
            <li style={{ color: '#4caf50' }}>Positive: 42%</li>
            <li style={{ color: '#888' }}>Neutral: 30%</li>
            <li style={{ color: '#e53935' }}>Negative: 28%</li>
          </ul>
        </div>
        <div style={{ flex: 2 }}>
          <h4>Satisfaction Trend</h4>
          <div style={{ height: 180, background: 'linear-gradient(to top, #e3f2fd, #fff)', borderRadius: 8, display: 'flex', alignItems: 'flex-end', padding: 8 }}>
            <div style={{ width: '100%', height: 4, background: '#1976d2', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>Jan - Dec</div>
        </div>
      </div>
    </div>
  );
}

