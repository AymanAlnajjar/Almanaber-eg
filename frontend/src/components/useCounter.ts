import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    let current = 0;
    const increment = target / (duration / 16);
    let frame: number;

    function animate() {
      current += increment;
      if (current < target) {
        setCount(Math.floor(current));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    animate();
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
} 