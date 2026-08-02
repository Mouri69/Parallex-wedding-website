"use client";

import React from 'react';

export default function Hero() {
  return (
    <section className="section" id="hero-section" style={{ zIndex: 2 }}>
      {/* Added reveal-text class and hidden opacity for the Grand Reveal! */}
      <div className="reveal-text" style={{ opacity: 0, textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '1rem', zIndex: 2, position: 'relative' }}>
        <h2 className="subtitle">We Invite You To Celebrate</h2>
        <h1 className="title" style={{ margin: '1rem 0' }}>Emma & James</h1>
        <p className="date-text">September 24, 2027</p>
      </div>
    </section>
  );
}
