import { useQueries } from "@tanstack/react-query";

import { GENRES_CACHE_CONFIG } from "@/constants";
import { getMovieGenres, getTVGenres } from "@/services/tmdb";

/**
 * Fetches both movie and TV genres in parallel.
 * @returns Object containing movie genres, tv genres, loading, and error states
 */
export default function useGenres() {
  const results = useQueries({
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

  const [movieGenres, tvGenres] = results;

  return {
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    movieGenres: movieGenres.data?.genres ?? [],
    tvGenres: tvGenres.data?.genres ?? [],
  };
}
