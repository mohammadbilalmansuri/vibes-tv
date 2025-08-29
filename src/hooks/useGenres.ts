import { useQueries } from "@tanstack/react-query";

import { GENRES_CACHE_CONFIG } from "@/constants";
import { getMovieGenres, getTVGenres } from "@/services/tmdb";

/**
 * Hook for fetching movie and TV genres in parallel.
 * @returns Object with movieGenres, tvGenres, loading states, errors, and refetch functions.
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

  const [movieGenresResult, tvGenresResult] = results;

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const errors = {
    movieGenres: movieGenresResult.error ?? null,
    tvGenres: tvGenresResult.error ?? null,
  };

  const movieGenres = movieGenresResult.data?.genres ?? [];
  const tvGenres = tvGenresResult.data?.genres ?? [];

  const refetch = {
    all: () => results.forEach((r) => r.refetch()),
    movieGenres: movieGenresResult.refetch,
    tvGenres: tvGenresResult.refetch,
  };

  return { isLoading, isError, errors, movieGenres, tvGenres, refetch };
}
