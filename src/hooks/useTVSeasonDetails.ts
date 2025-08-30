import { useQuery } from "@tanstack/react-query";
import { DETAIL_CACHE_CONFIG } from "@/constants";
import { getTVSeasonDetails } from "@/services/tmdb";

/**
 * Hook for fetching details of a specific TV season.
 *
 * @param tvId - The TMDB TV show ID
 * @param seasonNumber - The season number to fetch
 * @returns Object with season details, loading/error states, and refetch
 */
export default function useTVSeasonDetails(tvId: number, seasonNumber: number) {
  const result = useQuery({
    queryKey: ["tv", "season", tvId, seasonNumber],
    queryFn: ({ signal }) => getTVSeasonDetails(tvId, seasonNumber, signal),
    enabled: !!tvId && seasonNumber >= 0,
    ...DETAIL_CACHE_CONFIG,
  });

  return {
    details: result.data ?? null,
    isLoading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
