import { useRef, useEffect, useCallback } from "react";

export function useDebounced<T>(callback: (value: T) => void, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
