"use client";

import React, { useRef, useState, useEffect, useId } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ParallaxPathProps {
  /** The SVG path coordinate string. */
  pathData: string;
  /** The path to the image you want to fly along the SVG */
  imageSrc: string;
  /** Width of the flying image */
  imageWidth?: string;
  /** Ref to the container that controls the scroll scrubbing */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  /** Optional hook to add animations to the timeline after the flight is complete */
  onFlightComplete?: (tl: gsap.core.Timeline, flyingElement: HTMLImageElement) => void;
}

export default function ParallaxPath({ 
  pathData, 
  imageSrc, 
  imageWidth = "120px",
  scrollContainerRef,
  onFlightComplete 
}: ParallaxPathProps) {
  const arrowRef = useRef<HTMLImageElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const maskId = useId();

  useEffect(() => {
    if (maskPathRef.current) {
      setPathLength(maskPathRef.current.getTotalLength());
    }
  }, [pathData]);

  useGSAP(() => {
    const arrow = arrowRef.current;
    const maskPath = maskPathRef.current;
    
    if (!arrow || !maskPath || pathLength === 0) return;

    gsap.set(arrow, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
    gsap.set(maskPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, 
      }
    });

    // Animate arrow and dash drawing
    tl.to(arrow, {
      motionPath: {
        path: maskPath,
        align: maskPath,
        alignOrigin: [0.5, 0.5],
        // Set autoRotate to true. Because we removed preserveAspectRatio="none", 
        // the mathematical angles will now perfectly match the visual angles! No more weird rotations!
        autoRotate: 90 
      },
      ease: "power1.inOut",
      duration: 8
    }, "start")
    .to(maskPath, {
      strokeDashoffset: 0, 
      ease: "power1.inOut",
      duration: 8
    }, "start");

    if (onFlightComplete) {
      onFlightComplete(tl, arrow);
    }

  }, { scope: scrollContainerRef, dependencies: [pathLength, onFlightComplete] });

  return (
    <>
      {/* 
        CRITICAL FIX: Removed preserveAspectRatio="none". 
        By using "xMidYMin meet", the SVG scales uniformly. 
        This prevents the coordinates from stretching, which fixes the "weird rotation" GSAP math bug!
      */}
      <svg 
        viewBox="0 0 1000 3000" 
        style={{ 
          position: 'absolute', 
          top: 0, left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 1, 
          pointerEvents: 'none' 
        }}
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <mask id={maskId}>
            <path 
              ref={maskPathRef}
              d={pathData} 
              fill="none" 
              stroke="white" 
              strokeWidth="10" 
            />
          </mask>
        </defs>

        <path 
          d={pathData} 
          fill="none" 
          stroke="var(--accent-pink)" 
          strokeWidth="4" 
          strokeDasharray="15 15" 
          opacity="0.8" 
          mask={`url(#${maskId})`}
        />
      </svg>

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
    </>
  );
}
