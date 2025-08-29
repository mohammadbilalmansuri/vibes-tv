import { getMovieGenres, getTVGenres } from "@/services/tmdb";
import { useQueries } from "@tanstack/react-query";

/**
 * Fetches both movie and TV genres in parallel.
 * @returns Object containing movie genres, tv genres, loading, and error states
 */
export function useGenres() {
  const cacheConfig = { staleTime: 30 * 60 * 1000, gcTime: 60 * 60 * 1000 };

  const results = useQueries({
    queries: [
      {
        queryKey: ["genres", "movie"],
        queryFn: ({ signal }) => getMovieGenres(signal),
        ...cacheConfig,
      },
      {
        queryKey: ["genres", "tv"],
        queryFn: ({ signal }) => getTVGenres(signal),
        ...cacheConfig,
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
