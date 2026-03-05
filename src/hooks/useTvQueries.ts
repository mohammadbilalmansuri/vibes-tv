import { useQuery, useQueries, useInfiniteQuery } from "@tanstack/react-query";
import {
  NOW_PLAYING_CACHE_CONFIG,
  DETAIL_CACHE_CONFIG,
  GENRE_DISCOVER_CACHE_CONFIG,
} from "@/constants";
import {
  getTVShowDetails,
  getTVSeasonDetails,
  getTVShowsAiringToday,
  getTVShowsOnTheAir,
  getTVShowsByGenre,
} from "@/services/tmdb";

export function useAiringAndOnTheAirTVShows() {
  return useQueries({
    queries: [
      {
        queryKey: ["tv", "airingToday"],
        queryFn: ({ signal }) => getTVShowsAiringToday(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
      {
        queryKey: ["tv", "onTheAir"],
        queryFn: ({ signal }) => getTVShowsOnTheAir(signal),
        ...NOW_PLAYING_CACHE_CONFIG,
      },
    ],
  });
}

export function useTVShowsByGenre(genreId: number) {
  return useInfiniteQuery({
    queryKey: ["tv", "genre", genreId],
    queryFn: ({ pageParam = 1, signal }) =>
      getTVShowsByGenre(genreId, pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!genreId,
    ...GENRE_DISCOVER_CACHE_CONFIG,
  });
}

export function useTVShowDetails(tvId: number) {
  const result = useQuery({
    queryKey: ["tv", "details", tvId],
    queryFn: ({ signal }) => getTVShowDetails(tvId, signal),
    enabled: !!tvId,
    ...DETAIL_CACHE_CONFIG,
  });
  return [result] as const;
}

export function useTVSeason(tvId: number, seasonNumber: number) {
  return useQuery({
    queryKey: ["tv", "season", tvId, seasonNumber],
    queryFn: ({ signal }) => getTVSeasonDetails(tvId, seasonNumber, signal),
    enabled: !!tvId && seasonNumber >= 0,
    ...DETAIL_CACHE_CONFIG,
  });
}
