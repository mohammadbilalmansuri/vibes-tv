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

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const errors = {
    movies: trendingMoviesResult.error ?? null,
    tv: trendingTvShowsResult.error ?? null,
  };

  const trendingMovies = trendingMoviesResult.data?.results ?? [];
  const trendingTvShows = trendingTvShowsResult.data?.results ?? [];

  const refetch = {
    all: () => results.forEach((r) => r.refetch()),
    movies: trendingMoviesResult.refetch,
    tv: trendingTvShowsResult.refetch,
  };

  return {
    isLoading,
    isError,
    errors,
    trendingMovies,
    trendingTvShows,
    refetch,
  };
}
