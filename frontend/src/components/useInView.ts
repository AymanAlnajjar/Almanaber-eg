import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setInView(true);
          setHasRun(true);
        }
      },
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, hasRun]);

  return [ref, inView] as const;
}