import React from 'react';


export default function Trends() {
  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <h2 style={{ marginBottom: '1rem' }}>Time-Based Trends</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h4>Satisfaction Score Over Time</h4>
          <div style={{ height: 180, background: 'linear-gradient(to top, #e3f2fd, #fff)', borderRadius: 8, display: 'flex', alignItems: 'flex-end', padding: 8 }}>
            <div style={{ width: '100%', height: 4, background: '#1976d2', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>Jan - Dec</div>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Negative Sentiment % Over Time</h4>
          <div style={{ height: 180, background: 'linear-gradient(to top, #ffebee, #fff)', borderRadius: 8, display: 'flex', alignItems: 'flex-end', padding: 8 }}>
            <div style={{ width: '100%', height: 4, background: '#e53935', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>Jan - Dec</div>
        </div>
      </div>
    </div>
  );
}

