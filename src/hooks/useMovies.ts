import { movieApi } from "@/services/api";
import { Movie, TMDBResponse } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Hook for latest movies with pagination
export const useLatestMovies = () => {
  return useInfiniteQuery({
    queryKey: ["movies", "latest"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      movieApi.getLatest(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<Movie>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook for popular movies with pagination
export const usePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: ["movies", "popular"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      movieApi.getPopular(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<Movie>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 10, // 10 minutes (popular content changes less frequently)
    gcTime: 1000 * 60 * 30,
  });
};

// Hook for upcoming movies with pagination
export const useUpcomingMovies = () => {
  return useInfiniteQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      movieApi.getUpcoming(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<Movie>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 15, // 15 minutes (upcoming content changes very slowly)
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for trending movies (no pagination needed, just first page)
export const useTrendingMovies = (timeWindow: "day" | "week" = "week") => {
  return useQuery({
    queryKey: ["movies", "trending", timeWindow],
    queryFn: () => movieApi.getTrending(timeWindow),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for movie details
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ["movies", "details", id],
    queryFn: () => movieApi.getDetails(id),
    staleTime: 1000 * 60 * 60, // 1 hour (details don't change often)
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: !!id,
  });
};

// Hook for searching movies with pagination
export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["movies", "search", query],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      movieApi.search(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<Movie>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};
