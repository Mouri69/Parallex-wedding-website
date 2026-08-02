"use client";

import React from 'react';

export default function Details() {
  return (
    <section className="section">
      {/* Details text is initially hidden for the Grand Reveal */}
      <div className="reveal-text" style={{ opacity: 0, textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '1rem', zIndex: 2, maxWidth: '600px' }}>
        <h2 className="subtitle" style={{ color: 'var(--accent-red)' }}>The Details</h2>
        <div style={{ margin: '3rem 0', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          <p><strong>Ceremony & Reception</strong></p>
          <p>The Botanical Gardens</p>
          <p>123 Floral Avenue, Willow Creek</p>
          <br/>
          <p>Ceremony starts at 4:00 PM</p>
          <p>Dinner & Dancing to follow</p>
        </div>
      </div>
    </section>
  );
}
