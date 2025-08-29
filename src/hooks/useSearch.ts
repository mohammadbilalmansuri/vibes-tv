import { useInfiniteQuery } from "@tanstack/react-query";

import { searchMovies, searchMulti, searchTVShows } from "@/services/tmdb";
import {
  MultiSearchResponse,
  SearchMoviesResponse,
  SearchTVShowsResponse,
} from "@/types/tmdb";

type PagedResponse = { page: number; total_pages: number };

interface BaseSearchReturn<T> {
  results: T[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
}

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
export function useSearch(
  query: string,
  mode: "multi"
): BaseSearchReturn<MultiSearchResponse["results"][number]>;

export function useSearch(
  query: string,
  mode: "movie"
): BaseSearchReturn<SearchMoviesResponse["results"][number]>;

export function useSearch(
  query: string,
  mode: "tv"
): BaseSearchReturn<SearchTVShowsResponse["results"][number]>;

export function useSearch(query: string, mode: "multi" | "movie" | "tv") {
  const result = useInfiniteQuery({
    queryKey: ["search", mode, query],
    queryFn: ({
      pageParam,
      signal,
    }: {
      pageParam: number;
      signal?: AbortSignal;
    }) => {
      if (mode === "multi") return searchMulti(query, pageParam, signal);
      if (mode === "movie") return searchMovies(query, pageParam, signal);
      return searchTVShows(query, pageParam, signal);
    },
    enabled: !!query.trim(),
    getNextPageParam: (lastPage: PagedResponse) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  return {
    results: result.data?.pages.flatMap((page: any) => page.results) ?? [],
    isLoading: result.isLoading,
    error: result.error ?? null,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage ?? false,
    isFetchingNextPage: result.isFetchingNextPage,
    refetch: result.refetch,
  };
}
