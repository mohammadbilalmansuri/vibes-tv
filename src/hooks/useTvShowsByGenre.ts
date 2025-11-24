import { useInfiniteQuery } from "@tanstack/react-query";
import { GENRE_DISCOVER_CACHE_CONFIG } from "@/constants";
import { getTVShowsByGenre } from "@/services/tmdb";

/**
 * Fetches TV shows for a specific genre using infinite scrolling.
 *
 * @param genreId The TMDB genre ID
 * @returns Object containing TV shows, pagination helpers, loading/error states, and refetch function
 */
export default function useTvShowsByGenre(genreId: number) {
  const result = useInfiniteQuery({
    queryKey: ["tv", "genre", genreId],
    queryFn: ({ pageParam = 1, signal }) =>
      getTVShowsByGenre(genreId, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!genreId,
    ...GENRE_DISCOVER_CACHE_CONFIG,
  });

  return {
    tvShows: result.data?.pages.flatMap((page) => page.results) ?? [],
    isLoading: result.isLoading,
    error: result.error ?? null,
    hasNextPage: result.hasNextPage,
    fetchNextPage: result.fetchNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    refetch: result.refetch,
  };
}
