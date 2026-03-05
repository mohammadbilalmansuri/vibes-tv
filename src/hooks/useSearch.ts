import { useInfiniteQuery } from "@tanstack/react-query";
import { searchContent } from "@/services/tmdb";
import { SEARCH_CACHE_CONFIG } from "@/constants";
import type { SearchMode } from "@/types";

export default function useSearch(mode: SearchMode, query: string) {
  return useInfiniteQuery({
    queryKey: ["search", mode, query],
    queryFn: ({ pageParam = 1, signal }) =>
      searchContent(mode, query, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!query.trim(),
    ...SEARCH_CACHE_CONFIG,
  });
}
