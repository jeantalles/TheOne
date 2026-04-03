import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Magnetic({ children, strength = 0.2 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const springX = useSpring(position.x, { stiffness: 150, damping: 15 });
  const springY = useSpring(position.y, { stiffness: 150, damping: 15 });
  const rectRef = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouse = (e) => {
    if (!rectRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;

    // Utilize rAF for ultra-smooth rendering to prevent Layout Thrashing on high-hz displays
    requestAnimationFrame(() => {
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * strength, y: middleY * strength });
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
