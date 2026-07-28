import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RSVP = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });

  // Parallax effects
  const yEnvelope = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const scaleEnvelope = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section ref={ref} style={{ textAlign: 'center' }}>
      <motion.div 
        style={{ 
          y: yEnvelope, 
          scale: scaleEnvelope,
          marginBottom: '2rem'
        }}
      >
        <img src="/envelope.png" alt="Love letter envelope" className="decorative-img" style={{ maxWidth: '200px' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Join Us</h2>
        <p className="subtitle" style={{ margin: '1rem 0 2rem' }}>Please RSVP by August 1st</p>
        
        <button className="btn">RSVP Now</button>
      </motion.div>
    </section>
  );
};

export default RSVP;
