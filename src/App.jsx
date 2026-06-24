import React from 'react'

export default function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: '#0f172a',
      }}
    >
      <section
        style={{
          padding: '32px 40px',
          borderRadius: '20px',
          background: 'white',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>
          Simple React Project
        </p>
        <h1 style={{ margin: '12px 0 8px', fontSize: '40px', lineHeight: 1.1 }}>Your page is working</h1>
        <p style={{ margin: 0, fontSize: '16px', color: '#475569' }}>
          The app now mounts correctly and renders visible content.
        </p>
      </section>
    </main>
  )
}