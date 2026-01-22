import { useInfiniteQuery } from "@tanstack/react-query";
import { searchContent } from "@/services/tmdb";

/**
 * Fetches TMDB search results with infinite pagination.
 * Supports different modes:
 * - `"multi"` → movies, TV shows, and people
 * - `"movie"` → movies only
 * - `"tv"` → TV shows only
 *
 * Each search is cached separately by mode and query string.
 *
 * @param mode Search type ("multi" | "movie" | "tv")
 * @param query Search query string
 * @returns Infinite query result with pages of search results
 */
export default function useSearch(
  mode: "multi" | "movie" | "tv",
  query: string
) {
  return useInfiniteQuery({
    queryKey: ["search", mode, query],
    queryFn: ({ pageParam = 1, signal }) =>
      searchContent(mode, query, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!query.trim(),
  });
}
