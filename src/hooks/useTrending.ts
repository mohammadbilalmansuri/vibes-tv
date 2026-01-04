import { useQuery } from "@tanstack/react-query";
import { TRENDING_CACHE_CONFIG } from "@/constants";
import { getTrending } from "@/services/tmdb";

/**
 * Hook for fetching trending content.
 * @returns Object with content, loading state, error, and refetch function.
 */
export default function useTrending() {
  const result = useQuery({
    queryKey: ["trending"],
    queryFn: ({ signal }) => getTrending(signal),
    ...TRENDING_CACHE_CONFIG,
  });

  return {
    content: result.data?.results ?? [],
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
  };
}
