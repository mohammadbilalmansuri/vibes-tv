import { useEffect, useState } from "react";

interface UseFetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => Promise<T | null>;
  reset: () => void;
}

/**
 * useFetch - A generic async data fetching hook
 * @param fetcher - Async function returning data
 * @param autoFetch - Run on mount (default true)
 * @param deps - Dependency array to re-run fetch
 */
const useFetch = <T>(
  fetcher: () => Promise<T>,
  autoFetch: boolean = true,
  deps: any[] = []
): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch);

  const executeFetch = async (): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  const refetch = async () => {
    return executeFetch();
  };

  useEffect(() => {
    if (autoFetch) {
      executeFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, autoFetch]);

  return { data, error, isLoading, refetch, reset };
};

export default useFetch;
