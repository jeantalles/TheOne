import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({ children, strength = 0.2 }) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
  }, []);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    xTo.current(x * strength);
    yTo.current(y * strength);
  };

  const reset = () => {
    xTo.current(0);
    yTo.current(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
}
