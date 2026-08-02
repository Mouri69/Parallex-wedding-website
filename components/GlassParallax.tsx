"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function GlassParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true
      }
    });

    // The background doesn't move (position: fixed)
    
    // Midground moves up to final position
    tl.to('.layer-mid', {
      top: '10vh',
      ease: 'power1.inOut'
    }, 0);

    // Foreground moves up to final position faster (parallax depth)
    tl.to('.layer-front', {
      top: '15vh',
      ease: 'power1.inOut'
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. FIXED BACKGROUND */}
      <div className="layer-bg" style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        backgroundImage: 'url(/bg_garden.png)', backgroundSize: 'cover', backgroundPosition: 'center', 
        zIndex: -1 
      }} />

      {/* 2. MIDGROUND LAYER (Slow) */}
      <div className="layer-mid" style={{ 
        position: 'absolute', top: '100vh', left: 0, width: '100%', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem'
      }}>
        {/* Our Story Card */}
        <div className="glass-card" style={{ width: '80%', maxWidth: '800px', padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <h2 className="title" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>Our Story</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              From the first day we met, we knew it was something special. Join us in celebrating our next chapter. 
              <br/><br/>
              #EmmaAndJames
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
             <img src="/story_photo.png" alt="Our Story" style={{ width: '100%', maxWidth: '350px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
          </div>
        </div>

        {/* Details Card */}
        <div className="glass-card" style={{ width: '70%', maxWidth: '700px', padding: '3rem', textAlign: 'center', marginLeft: '-10%' }}>
          <h2 className="subtitle" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>The Details</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            <strong>Ceremony & Reception</strong><br/>
            The Botanical Gardens<br/>
            123 Floral Avenue, Willow Creek<br/><br/>
            Ceremony starts at 4:00 PM<br/>
            Dinner & Dancing to follow
          </p>
        </div>
      </div>

      {/* 3. FOREGROUND LAYER (Fast) */}
      <div className="layer-front" style={{ 
        position: 'absolute', top: '150vh', left: 0, width: '100%', zIndex: 2,
        display: 'flex', justifyContent: 'center'
      }}>
        <div className="glass-card" style={{ width: '90%', maxWidth: '1200px', minHeight: '90vh', position: 'relative', padding: '3rem' }}>
           
           {/* Main Title */}
           <h1 className="title" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.1em', color: 'white' }}>
             EMMA & JAMES - OUR FOREVER
           </h1>
           
           {/* Countdown & Info Left Side */}
           <div style={{ position: 'absolute', top: '30%', left: '10%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div className="glass-panel" style={{ textAlign: 'center' }}>
               <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>COUNTING DOWN</h3>
               <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                 <div><strong style={{ fontSize: '2rem' }}>114</strong><br/><small>DAYS</small></div>
                 <div><strong style={{ fontSize: '2rem' }}>42</strong><br/><small>MIN</small></div>
                 <div><strong style={{ fontSize: '2rem' }}>16</strong><br/><small>SEC</small></div>
               </div>
             </div>
           </div>
           
           {/* Breakout Couple Cutout */}
           <img src="/couple_cutout.png" alt="Emma and James" style={{ 
             position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', 
             height: '75vh', objectFit: 'contain', zIndex: 5, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' 
           }} />

           {/* RSVP / Bridal Party Right Side */}
           <div style={{ position: 'absolute', top: '40%', right: '5%', display: 'flex', flexDirection: 'column', gap: '1rem', width: '250px', zIndex: 6 }}>
             <div className="glass-panel">
               <strong style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>MAID OF HONOR</strong>
               <p style={{ fontSize: '1.2rem', margin: '0.5rem 0 0' }}>Sarah Jenkins</p>
             </div>
             <div className="glass-panel">
               <strong style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>BEST MAN</strong>
               <p style={{ fontSize: '1.2rem', margin: '0.5rem 0 0' }}>Michael Scott</p>
             </div>
             
             <div className="glass-panel" style={{ marginTop: '2rem', textAlign: 'center' }}>
               <h3 style={{ marginBottom: '1rem' }}>Join Us</h3>
               <button className="btn" style={{ padding: '0.5rem 1.5rem', marginTop: 0, color: 'white', borderColor: 'white' }}>RSVP NOW</button>
             </div>
           </div>

           {/* Nav Bar */}
           <div className="glass-panel" style={{ 
             position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', 
             display: 'flex', gap: '2rem', padding: '1rem 3rem', borderRadius: '50px', zIndex: 6 
           }}>
             {['HOME', 'STORY', 'DETAILS', 'ACCOMMODATION', 'RSVP'].map((item) => (
               <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                 {item}
               </a>
             ))}
           </div>

        </div>
      </div>

    </div>
  );
}
