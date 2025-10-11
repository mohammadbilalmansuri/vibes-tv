import { searchApi } from "@/services/api";
import { SearchResult, TMDBResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

// Hook for multi-search (movies and TV shows) with pagination
export const useMultiSearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["search", "multi", query],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      searchApi.multi(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<SearchResult>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 2, // Only search if query is longer than 2 characters
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};
