import { useInfiniteQuery } from "@tanstack/react-query";

import { GENRE_DISCOVER_CACHE_CONFIG } from "@/constants";
import { getMoviesByGenre } from "@/services/tmdb";

/**
 * Fetches movies for a specific genre using infinite scrolling.
 *
 * @param genreId The TMDB genre ID
 * @returns Object containing movies, pagination helpers, loading/error states, and refetch function
 */
export default function useMoviesByGenre(genreId: number) {
  const result = useInfiniteQuery({
    queryKey: ["movies", "genre", genreId],
    queryFn: ({ pageParam = 1, signal }) =>
      getMoviesByGenre(genreId, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!genreId,
    ...GENRE_DISCOVER_CACHE_CONFIG,
  });

  return {
    movies: result.data?.pages.flatMap((page) => page.results) ?? [],
    isLoading: result.isLoading,
    error: result.error ?? null,
    hasNextPage: result.hasNextPage,
    fetchNextPage: result.fetchNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    refetch: result.refetch,
  };
}
