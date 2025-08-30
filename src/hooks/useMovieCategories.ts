import { useQueries } from "@tanstack/react-query";

import {
  CONTENT_LIST_CACHE_CONFIG,
  NOW_PLAYING_CACHE_CONFIG,
  POPULAR_CACHE_CONFIG,
} from "@/constants";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/tmdb";

/**
 * Hook for fetching main movie categories in parallel:
 * Popular, Top Rated, Upcoming, and Now Playing.
 *
 * @returns Object with movie category data, loading/error states, and refetch functions.
 */
export default function useMovieCategories() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["movies", "popular"],
        queryFn: ({ signal }) => getPopularMovies(signal),
        ...POPULAR_CACHE_CONFIG,
      },
      {
        queryKey: ["movies", "topRated"],
        queryFn: ({ signal }) => getTopRatedMovies(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
      {
        queryKey: ["movies", "upcoming"],
        queryFn: ({ signal }) => getUpcomingMovies(signal),
        ...CONTENT_LIST_CACHE_CONFIG,
      },
      {
        queryKey: ["movies", "nowPlaying"],
        queryFn: ({ signal }) => getNowPlayingMovies(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
    ],
  });

  const [
    popularMoviesResult,
    topRatedMoviesResult,
    upcomingMoviesResult,
    nowPlayingMoviesResult,
  ] = results;

  return {
    popularMovies: popularMoviesResult.data?.results ?? [],
    topRatedMovies: topRatedMoviesResult.data?.results ?? [],
    upcomingMovies: upcomingMoviesResult.data?.results ?? [],
    nowPlayingMovies: nowPlayingMoviesResult.data?.results ?? [],
    isLoading: results.some((r) => r.isLoading),
    errors: {
      popularMovies: popularMoviesResult.error ?? null,
      topRatedMovies: topRatedMoviesResult.error ?? null,
      upcomingMovies: upcomingMoviesResult.error ?? null,
      nowPlayingMovies: nowPlayingMoviesResult.error ?? null,
    },
    refetch: {
      all: () => Promise.all(results.map((r) => r.refetch())),
      popularMovies: popularMoviesResult.refetch,
      topRatedMovies: topRatedMoviesResult.refetch,
      upcomingMovies: upcomingMoviesResult.refetch,
      nowPlayingMovies: nowPlayingMoviesResult.refetch,
    },
  };
}
