import { useQueries } from "@tanstack/react-query";
import { DETAIL_CACHE_CONFIG } from "@/constants";
import { getTVShowDetails, getTVShowVideos } from "@/services/tmdb";

/**
 * Hook for fetching TV show details and videos in parallel.
 *
 * @param tvId - The TMDB TV show ID
 * @returns Object with tv show details, videos, loading/error states
 */
export default function useTVDetails(tvId: number) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["tv", "details", tvId],
        queryFn: ({ signal }) => getTVShowDetails(tvId, signal),
        enabled: !!tvId,
        ...DETAIL_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "videos", tvId],
        queryFn: ({ signal }) => getTVShowVideos(tvId, signal),
        enabled: !!tvId,
        ...DETAIL_CACHE_CONFIG,
      },
    ],
  });

  const [detailsResult, videosResult] = results;

  return {
    details: detailsResult.data ?? null,
    videos: videosResult.data?.results ?? [],
    isLoading: results.some((r) => r.isLoading),
    errors: {
      details: detailsResult.error ?? null,
      videos: videosResult.error ?? null,
    },
    refetch: {
      all: () => Promise.all(results.map((r) => r.refetch())),
      details: detailsResult.refetch,
      videos: videosResult.refetch,
    },
  };
}
