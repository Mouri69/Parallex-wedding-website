"use client";

import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import Hero from '@/components/Hero';
import Details from '@/components/Details';
import RSVP from '@/components/RSVP';
import CinematicIntro from '@/components/CinematicIntro';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCinematicComplete = useCallback(() => {
    // Reveal the rest of the website's text smoothly
    gsap.to('.reveal-text', {
      opacity: 1,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <main ref={containerRef} className="gsap-container">
      
      <CinematicIntro 
        imageSrc="/flying_arrow.png"
        onCinematicComplete={handleCinematicComplete}
      />
      
      <Hero />
      <Details />
      <RSVP />
    </main>
  );
}
