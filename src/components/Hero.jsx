import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yArrow = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} style={{ textAlign: 'center' }}>
      <motion.div style={{ y: yText, opacity, zIndex: 2 }}>
        <h2 className="subtitle">We Invite You To Celebrate</h2>
        <h1 className="title" style={{ margin: '1rem 0' }}>Emma & James</h1>
        <p className="date-text">September 24, 2027</p>
      </motion.div>

      <motion.div 
        style={{ 
          y: yArrow, 
          position: 'absolute', 
          bottom: '10%',
          right: '20%',
          zIndex: 1,
          rotate: 45
        }}
      >
        <img src="/flying_arrow.png" alt="Flying arrow" className="decorative-img" />
      </motion.div>
    </section>
  );
};

export default Hero;
