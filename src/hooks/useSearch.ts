import { searchMovies, searchMulti, searchTVShows } from "@/services/tmdb";
import {
  MultiSearchResponse,
  SearchMoviesResponse,
  SearchTVShowsResponse,
} from "@/types/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";

type PagedResponse = { page: number; total_pages: number };

/**
 * Custom React Query hook for searching movies, TV shows, or mixed results.
 *
 * This hook supports three modes:
 * - `"multi"` → returns movies, TV shows, and people
 * - `"movie"` → returns only movies
 * - `"tv"` → returns only TV shows
 *
 * Each query is cached separately by mode + query string.
 *
 * @param query - The search text input from user
 * @param mode - The search type ("multi" | "movie" | "tv")
 */

export default function useSearch(
  query: string,
  mode: "multi"
): ReturnType<typeof useInfiniteQuery<MultiSearchResponse>>;

export default function useSearch(
  query: string,
  mode: "movie"
): ReturnType<typeof useInfiniteQuery<SearchMoviesResponse>>;

export default function useSearch(
  query: string,
  mode: "tv"
): ReturnType<typeof useInfiniteQuery<SearchTVShowsResponse>>;

export default function useSearch(
  query: string,
  mode: "multi" | "movie" | "tv"
) {
  return useInfiniteQuery({
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
}
