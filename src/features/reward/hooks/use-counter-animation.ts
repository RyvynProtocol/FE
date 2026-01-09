import { useEffect, useRef, useState } from 'react';

interface UseCounterAnimationOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
}

export function useCounterAnimation({
  start = 0,
  end,
  duration = 2000,
  decimals = 2,
}: UseCounterAnimationOptions) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = countRef.current;
    const endValue = end;

    if (startValue === endValue) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      const currentCount = startValue + (endValue - startValue) * easeProgress;

      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        startTimeRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration]);

  return count.toFixed(decimals);
}
