"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GlassParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true
      }
    });

    // Set initial parallax offsets. They will meet perfectly at y: 0 in the middle of the scroll!
    gsap.set('.layer-mid', { y: 100 });
    gsap.set('.layer-front', { y: 250 });

    // Midground parallax (slow)
    tl.to('.layer-mid', {
      y: -100,
      ease: 'none'
    }, 0);

    // Foreground parallax (fast)
    tl.to('.layer-front', {
      y: -250,
      ease: 'none'
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* 1. FIXED BACKGROUND */}
      <div className="layer-bg" style={{
        position: 'absolute', top: -50, left: -50, right: -50, bottom: -50, // Slightly larger to allow parallax if we wanted
        backgroundImage: 'url(/bg_garden.png)', backgroundSize: 'cover', backgroundPosition: 'center',
        zIndex: -1
      }} />

      {/* 2. MIDGROUND LAYER (Slow Parallax) */}
      <div className="layer-mid" style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        {/* The large glass frame that encompasses the composition */}
        <div className="glass-card" style={{ width: '92%', height: '88%', position: 'relative', padding: '1.5rem 3rem', display: 'flex', flexDirection: 'column' }}>

          {/* Top Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '1rem', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            <span>SEPTEMBER 24, 2027 | WILLOW CREEK, CA</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>RSVP</span> | <span>OUR STORY</span> | <span>REGISTRY</span> | <span>GALLERY</span>
            </div>
          </div>

          {/* Our Story Text */}
          <div style={{ position: 'absolute', top: '40%', left: '8%', maxWidth: '300px' }}>
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'white' }}>OUR STORY</h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.5', textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
              From the first day to the forever yes, our journey continues...<br /><br />
              <span style={{ fontStyle: 'italic' }}>#EmmaAndJamesForever</span>
            </p>
          </div>

          {/* Floral Graphics (Simulated with text/css for now) */}
          <div style={{ position: 'absolute', top: '15%', left: '5%', opacity: 0.8, filter: 'blur(1px)' }}>
            <span style={{ fontSize: '4rem' }}>🌸</span>
          </div>

          {/* Story Photos */}


          <div className="glass-panel" style={{ position: 'absolute', top: '25%', right: '5%', padding: '0.5rem', transform: 'rotate(3deg)' }}>
            <img src="/story_photo.png" alt="Memory" style={{ width: '300px', borderRadius: '8px', display: 'block' }} />
          </div>

        </div>
      </div>

      {/* 3. FOREGROUND LAYER (Fast Parallax) */}
      <div className="layer-front" style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none'
      }}>

        {/* Main Title */}
        <h1 style={{
          position: 'absolute', top: '2%', width: '100%', textAlign: 'center',
          fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '0.05em', color: 'white',
          fontFamily: 'var(--font-serif)', textShadow: '0 5px 15px rgba(0,0,0,0.5)'
        }}>
          EMMA & JAMES - OUR FOREVER
        </h1>

        {/* Breakout Couple Cutout */}
        <img src="/couple_cutout.png" alt="Emma and James" style={{
          position: 'absolute', bottom: '11%', left: '50%', transform: 'translateX(-50%)',
          height: '85%', objectFit: 'contain', zIndex: 5, filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))'
        }} />

        {/* Countdown */}
        <div style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 6, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          <p style={{ fontSize: '0.9rem', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>COUNTING DOWN:</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <div><strong style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)' }}>114</strong><br /><small style={{ letterSpacing: '0.1em' }}>DAYS</small></div>
            <div><strong style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)' }}>42</strong><br /><small style={{ letterSpacing: '0.1em' }}>MIN</small></div>
            <div><strong style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)' }}>16</strong><br /><small style={{ letterSpacing: '0.1em' }}>SEC</small></div>
          </div>
        </div>

        {/* Bridal Party Widgets */}
        <div style={{ position: 'absolute', bottom: '25%', right: '10%', display: 'flex', flexDirection: 'column', gap: '1.5rem', pointerEvents: 'auto', zIndex: 6 }}>
          <div className="glass-panel" style={{ padding: '1rem 2rem' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8 }}>GUEST/BRIDAL PARTY</span>
            <p style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>SARAH - MAID OF HONOR</p>
          </div>
          <div className="glass-panel" style={{ padding: '1rem 2rem' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8 }}>GUEST/BRIDAL PARTY</span>
            <p style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>MICHAEL - BEST MAN</p>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="glass-panel" style={{
          position: 'absolute', bottom: '3%', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '2rem', padding: '1rem 3rem', borderRadius: '50px', pointerEvents: 'auto', zIndex: 6
        }}>
          {['HOME', 'STORY', 'DETAILS', 'ACCOMMODATION', 'RSVP'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.9 }}>
              {item}
            </a>
          ))}
        </div>

      </div>

    </div>
  );
}
