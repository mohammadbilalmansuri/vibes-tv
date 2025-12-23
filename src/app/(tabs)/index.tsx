import React from "react";
import { Text } from "react-native";
import { ScreenView, Skeleton } from "@/components";
import { useGenres, useTrending } from "@/hooks";

export default function Home() {
  const {
    trendingMovies,
    trendingTvShows,
    isLoading: trendingLoading,
    errors: trendingErrors,
    refetch: trendingRefetch,
  } = useTrending();
  const {
    tvGenres,
    movieGenres,
    isLoading: genresLoading,
    errors: genresErrors,
    refetch: genresRefetch,
  } = useGenres();

  return (
    <ScreenView inSafeArea={false}>
      <Text>Home</Text>
    </ScreenView>
  );
}
