import { useQueries } from "@tanstack/react-query";
import { GENRES_CACHE_CONFIG } from "@/constants";
import { getMovieGenres, getTVGenres } from "@/services/tmdb";

/**
 * Fetches genres in parallel:
 * - Movie Genres
 * - TV Show Genres
 *
 * @returns Array of query results in fixed order:
 * [movieGenres, tvGenres]
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
