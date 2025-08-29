import { useQueries } from "@tanstack/react-query";

import { DETAIL_CACHE_CONFIG } from "@/constants";
import { getMovieDetails, getMovieVideos } from "@/services/tmdb";

/**
 * Fetches movie details and videos in parallel for a given movie.
 *
 * @param movieId TMDB movie ID
 * @returns Object containing movie details, videos, loading/error states, and refetch functions
 */
export default function useMovieDetails(movieId: number) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["movie", "details", movieId],
        queryFn: ({ signal }) => getMovieDetails(movieId, signal),
        enabled: !!movieId,
        ...DETAIL_CACHE_CONFIG,
      },
      {
        queryKey: ["movie", "videos", movieId],
        queryFn: ({ signal }) => getMovieVideos(movieId, signal),
        enabled: !!movieId,
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
      all: () => results.forEach((r) => r.refetch()),
      details: detailsResult.refetch,
      videos: videosResult.refetch,
    },
  };
}
