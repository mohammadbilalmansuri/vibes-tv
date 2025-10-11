import { tvApi } from "@/services/api";
import { TMDBResponse, TVShow } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Hook for latest TV shows with pagination
export const useLatestTVShows = () => {
  return useInfiniteQuery({
    queryKey: ["tv", "latest"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      tvApi.getLatest(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<TVShow>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook for popular TV shows with pagination
export const usePopularTVShows = () => {
  return useInfiniteQuery({
    queryKey: ["tv", "popular"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      tvApi.getPopular(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<TVShow>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30,
  });
};

// Hook for TV shows airing today with pagination
export const useTVShowsAiringToday = () => {
  return useInfiniteQuery({
    queryKey: ["tv", "airing_today"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      tvApi.getAiringToday(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<TVShow>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for TV shows on the air with pagination
export const useTVShowsOnTheAir = () => {
  return useInfiniteQuery({
    queryKey: ["tv", "on_the_air"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      tvApi.getOnTheAir(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<TVShow>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for trending TV shows (no pagination needed, just first page)
export const useTrendingTVShows = (timeWindow: "day" | "week" = "week") => {
  return useQuery({
    queryKey: ["tv", "trending", timeWindow],
    queryFn: () => tvApi.getTrending(timeWindow),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for TV show details
export const useTVShowDetails = (id: number) => {
  return useQuery({
    queryKey: ["tv", "details", id],
    queryFn: () => tvApi.getDetails(id),
    staleTime: 1000 * 60 * 60, // 1 hour (details don't change often)
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: !!id,
  });
};

// Hook for searching TV shows with pagination
export const useSearchTVShows = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["tv", "search", query],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      tvApi.search(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: TMDBResponse<TVShow>) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });
};
