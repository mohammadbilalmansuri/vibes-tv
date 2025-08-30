import { useInfiniteQuery } from "@tanstack/react-query";
import { searchContent } from "@/services/tmdb";

/**
 * Hook for searching TMDB content (movies, TV shows, or mixed results).
 *
 * - `"multi"` → movies, TV shows, and people
 * - `"movie"` → movies only
 * - `"tv"` → TV shows only
 *
 * Each search is cached separately by mode + query string.
 * Supports infinite pagination with consistent return shape.
 */
export default function useSearch(
  query: string,
  mode: "multi" | "movie" | "tv"
) {
  const result = useInfiniteQuery({
    queryKey: ["search", mode, query],
    queryFn: ({ pageParam = 1, signal }) =>
      searchContent(mode, query, pageParam, signal),
    getNextPageParam: (lastPageResponse) =>
      lastPageResponse.page < lastPageResponse.total_pages
        ? lastPageResponse.page + 1
        : undefined,
    initialPageParam: 1,
    enabled: !!query.trim(),
  });

  return {
    results: result.data?.pages.flatMap((page) => page.results) ?? [],
    isLoading: result.isLoading,
    error: result.error ?? null,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    refetch: result.refetch,
  };
}
