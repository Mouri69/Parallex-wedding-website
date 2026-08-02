"use client";

import React, { useRef, useState, useEffect, useId } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CinematicIntroProps {
  imageSrc: string;
  imageWidth?: string;
  onCinematicComplete?: () => void;
}

export default function CinematicIntro({ 
  imageSrc, 
  imageWidth = "120px",
  onCinematicComplete 
}: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const maskId = useId();

  const heartPath = `
    M 0, 100
    C 200, 0 400, 150 500, 250
    C 350, 100 150, 300 150, 500
    C 150, 700 500, 850 500, 850
    C 500, 850 850, 700 850, 500
    C 850, 300 650, 100 500, 250
    C 500, 350 500, 450 500, 500
  `;

  useEffect(() => {
    if (maskPathRef.current) {
      setPathLength(maskPathRef.current.getTotalLength());
    }
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    const arrow = arrowRef.current;
    const maskPath = maskPathRef.current;
    const card = cardRef.current;
    
    if (!container || !arrow || !maskPath || pathLength === 0 || !card) return;

    gsap.set(arrow, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
    gsap.set(maskPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.set('.id-envelope-card', { y: 0, scale: 1, opacity: 1 });
    gsap.set('.id-envelope-flap', { rotateX: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000", // Scroll 3000px to play through the intro
        pin: true,
        scrub: 1,
        onComplete: () => {
          if (onCinematicComplete) onCinematicComplete();
        }
      }
    });

    // 1. Draw Path & Fly Arrow (takes up first chunk of timeline)
    tl.to(arrow, {
      motionPath: {
        path: maskPath,
        align: maskPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: 90 
      },
      ease: "power1.inOut",
      duration: 5
    }, "start")
    .to(maskPath, {
      strokeDashoffset: 0, 
      ease: "power1.inOut",
      duration: 5
    }, "start");

    // 2. Arrow lands in envelope (fade arrow out)
    tl.to(arrow, {
      opacity: 0,
      duration: 0.5
    });

    // 3. Envelope Flap flips open
    tl.to('.id-envelope-flap', {
      rotateX: 180,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // 4. Invitation Card pops out of envelope
    tl.to(card, {
      y: -150,
      zIndex: 15,
      duration: 1.5,
      ease: "power2.out"
    });

    // 5. OPPENHEIMER ZOOM! Card scales up to fill the screen and fades out
    tl.to(card, {
      scale: 30, // massive scale
      opacity: 0,
      duration: 3,
      ease: "power3.in"
    });

    // 6. Fade out the envelope as the card takes over
    tl.to('.envelope-wrapper', {
      opacity: 0,
      duration: 1.5,
      ease: "power2.in"
    }, "<"); // sync with the card scaling

  }, { scope: containerRef, dependencies: [pathLength, onCinematicComplete] });

  return (
    <section 
      ref={containerRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg-color)'
      }}
    >
      {/* SVG Path */}
      <svg 
        viewBox="0 0 1000 1000" 
        style={{ 
          position: 'absolute', 
          top: '50%', left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '100vmin', // ensures it fits fully in the screen
          height: '100vmin', 
          zIndex: 1, 
          pointerEvents: 'none' 
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={maskId}>
            <path 
              ref={maskPathRef}
              d={heartPath} 
              fill="none" 
              stroke="white" 
              strokeWidth="10" 
            />
          </mask>
        </defs>

        <path 
          d={heartPath} 
          fill="none" 
          stroke="var(--accent-pink)" 
          strokeWidth="4" 
          strokeDasharray="15 15" 
          opacity="0.8" 
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Flying Element (Arrow) */}
      <img 
        ref={arrowRef}
        src={imageSrc} 
        alt="Flying Element"
        style={{ 
          position: 'absolute', 
          width: imageWidth, 
          zIndex: 20, 
          top: 0,
          left: 0,
          opacity: pathLength === 0 ? 0 : 1 
        }}
      />

      {/* Centered Envelope (Replacing the one from RSVP) */}
      <div className="envelope-wrapper" style={{ zIndex: 10, position: 'relative' }}>
        <div className="envelope-flap id-envelope-flap"></div>
        
        <div className="envelope-card id-envelope-card" ref={cardRef}>
          <h3 style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>Emma & James</h3>
          <p>Please join us</p>
        </div>
        
        <div className="envelope-front-left"></div>
        <div className="envelope-front-right"></div>
        <div className="envelope-front-bottom"></div>
      </div>
    </section>
  );
}
