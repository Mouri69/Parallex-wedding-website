import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Details = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yHearts = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} style={{ backgroundColor: '#fffdfb', textAlign: 'center' }}>
      <motion.div style={{ y: yHearts, position: 'absolute', top: '10%', left: '15%', opacity: 0.8 }}>
        <img src="/intertwined_hearts.png" alt="Intertwined hearts" className="decorative-img" style={{ maxWidth: '250px' }} />
      </motion.div>

      <motion.div style={{ y: yContent, zIndex: 2, maxWidth: '600px' }}>
        <h2 className="subtitle" style={{ color: 'var(--accent-red)' }}>The Details</h2>
        <div style={{ margin: '3rem 0', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: '1.8' }}>
          <p><strong>Ceremony & Reception</strong></p>
          <p>The Botanical Gardens</p>
          <p>123 Floral Avenue, Willow Creek</p>
          <br/>
          <p>Ceremony starts at 4:00 PM</p>
          <p>Dinner & Dancing to follow</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Details;
