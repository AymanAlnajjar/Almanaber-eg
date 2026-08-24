import { useEffect, useRef, useState } from "react";

interface UseScrollFadeOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollFade(options: UseScrollFadeOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true
  } = options;
  
  const ref = useRef<HTMLDivElement | null>(null);
  const [opacity, setOpacity] = useState(1);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      if (isVisible) {
        setOpacity(1);
        if (triggerOnce) {
          setHasTriggered(true);
        }
      }
    };

    // Check immediately and after a short delay to ensure layout is complete
    checkInitialVisibility();
    const timeoutId = setTimeout(checkInitialVisibility, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (triggerOnce && hasTriggered) return;

          // Calculate opacity based on intersection ratio
          const ratio = entry.intersectionRatio;
          const newOpacity = Math.min(ratio / threshold, 1);

          setOpacity(newOpacity);

          if (newOpacity >= 1 && triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          // Reset opacity when out of view (for non-triggerOnce mode)
          setOpacity(0);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, opacity] as const;
} 