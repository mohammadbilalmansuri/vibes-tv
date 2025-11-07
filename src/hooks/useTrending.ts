import { TRENDING_CACHE_CONFIG } from "@/constants";
import { getTrendingMovies, getTrendingTVShows } from "@/services/tmdb";
import { useQueries } from "@tanstack/react-query";

/**
 * Fetches trending movies and TV shows in parallel.
 * @returns Object containing trending movies, trending tv, loading, and error states
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

  const [movies, tv] = results;

  return {
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    movies: movies.data?.results ?? [],
    tv: tv.data?.results ?? [],
  };
}
