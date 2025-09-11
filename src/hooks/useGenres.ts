import { useQueries } from "@tanstack/react-query";
import { GENRES_CACHE_CONFIG } from "@/constants";
import { getMovieGenres, getTVGenres } from "@/services/tmdb";

/**
 * Hook for fetching movie and TV genres in parallel.
 * @returns An array with two query results: [movieGenresResult, tvGenresResult].
 */
export default function useGenres() {
  return useQueries({
    queries: [
      {
        queryKey: ["genres", "movie"],
        queryFn: ({ signal }) => getMovieGenres(signal),
        ...GENRES_CACHE_CONFIG,
      },
      {
        queryKey: ["genres", "tv"],
        queryFn: ({ signal }) => getTVGenres(signal),
        ...GENRES_CACHE_CONFIG,
      },
    ],
  });
}
