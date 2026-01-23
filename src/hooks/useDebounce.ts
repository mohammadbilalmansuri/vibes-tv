import { useEffect, useState } from "react";

/**
 * Hook that debounces a value, delaying updates until after the specified delay.
 * - Optimized for search: resets immediately if value is falsy (e.g., empty string).
 * - Works with any type of value.
 * @param value - The input value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export default function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Reset immediately when value is cleared (empty string, null, etc.)
    if (!value) {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
