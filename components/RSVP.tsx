"use client";

import React from 'react';

export default function RSVP() {
  return (
    <section className="section" id="rsvp-section">
      <div className="id-rsvp-content reveal-text" style={{ textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '1rem', zIndex: 2, opacity: 0 }}>
        <h2 className="title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Join Us</h2>
        <p className="subtitle" style={{ margin: '1rem 0 2rem' }}>Please RSVP by August 1st</p>
        
        <button className="btn">RSVP Now</button>
      </div>
    </section>
  );
}
