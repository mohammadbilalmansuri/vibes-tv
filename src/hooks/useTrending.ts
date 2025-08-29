import { useQueries } from "@tanstack/react-query";

import { TRENDING_CACHE_CONFIG } from "@/constants";
import { getTrendingMovies, getTrendingTVShows } from "@/services/tmdb";

/**
 * Hook for fetching trending movies and TV shows in parallel.
 * @returns Object with movies, tv, loading states, errors, and refetch functions.
 */
export default function useTrending() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["trending", "movies"],
        queryFn: ({ signal }) => getTrendingMovies(signal),
        ...TRENDING_CACHE_CONFIG,
      },
      {
        queryKey: ["trending", "tv"],
        queryFn: ({ signal }) => getTrendingTVShows(signal),
        ...TRENDING_CACHE_CONFIG,
      },
    ],
  });

  const [trendingMoviesResult, trendingTvShowsResult] = results;

  return {
    isLoading: results.some((r) => r.isLoading),
    errors: {
      trendingMovies: trendingMoviesResult.error ?? null,
      trendingTvShows: trendingTvShowsResult.error ?? null,
    },
    trendingMovies: trendingMoviesResult.data?.results ?? [],
    trendingTvShows: trendingTvShowsResult.data?.results ?? [],
    refetch: {
      all: () => results.forEach((r) => r.refetch()),
      movies: trendingMoviesResult.refetch,
      tv: trendingTvShowsResult.refetch,
    },
  };
}
