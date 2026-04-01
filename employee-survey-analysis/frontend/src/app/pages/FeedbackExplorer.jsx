import React from 'react';


const feedbacks = [
  {
    sentiment: 'NEGATIVE',
    color: '#e53935',
    role: 'Sales · Account Executive',
    text: "The constant <b>overtime</b> and unrealistic targets are burning everyone out. <b>Management</b> doesn't listen to our concerns about workload.",
    date: '2024-12-15',
    score: '3/10',
  },
  {
    sentiment: 'POSITIVE',
    color: '#43a047',
    role: 'Engineering · Senior Developer',
    text: 'Great team culture and interesting projects. Would love more clarity on promotion criteria though.',
    date: '2024-12-14',
    score: '8/10',
  },
  {
    sentiment: 'NEGATIVE',
    color: '#e53935',
    role: 'Support · Customer Support Lead',
    text: 'We are severely <b>understaffed</b>. The <b>burnout</b> is real and <b>management</b> keeps adding more responsibilities without extra pay.',
    date: '2024-12-13',
    score: '2/10',
  },
  {
    sentiment: 'NEUTRAL',
    color: '#757575',
    role: 'Marketing · Content Strategist',
    text: 
      'Work is fine but there\'s not much room for growth. Would appreciate more training opportunities.',
    date: '2024-12-12',
    score: '6/10',
  },
  {
    sentiment: 'NEGATIVE',
    color: '#e53935',
    role: 'Operations · Operations Manager',
    text: 'Communication between departments is <b>terrible</b>. Nobody knows what anyone else is doing and it creates so much <b>wasted</b> effort.',
    date: '2024-12-11',
    score: '4/10',
  },
];

export default function FeedbackExplorer() {
  return (
    <div style={{ padding: '2rem', maxWidth: 900 }}>
      <h2 style={{ marginBottom: '1rem' }}>Feedback Explorer</h2>
      <input type="text" placeholder="Search comments..." style={{ width: 320, marginBottom: 24, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
      <div>
        {feedbacks.map((f, i) => (
          <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 18, padding: 16, background: '#fff' }}>
            <div style={{ color: f.color, fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{f.sentiment} <span style={{ color: '#888', fontWeight: 400, marginLeft: 8 }}>{f.role}</span></div>
            <div style={{ fontSize: 15, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: f.text }} />
            <div style={{ fontSize: 13, color: '#888', display: 'flex', justifyContent: 'space-between' }}>
              <span>{f.date}</span>
              <span>{f.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

