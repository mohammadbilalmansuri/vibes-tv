import React from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import useHomeQueries from "@/hooks/useHomeQueries";
import useGenres from "@/hooks/useGenres";
import TrendingSection from "@/components/TrendingSection";
import { ScreenView } from "@/components/root";

export default function Home() {
  const router = useRouter();
  const [
    trendingResult,
    popularMoviesResult,
    popularTvShowsResult,
    topRatedMoviesResult,
    topRatedTvShowsResult,
  ] = useHomeQueries();

  const handleItemPress = (type: "movie" | "tv", id: number) => {
    router.push(`/${type}/${String(id)}`);
  };

  return (
    <ScreenView inSafeArea={false}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <TrendingSection
          data={trendingResult.data?.results ?? []}
          isLoading={trendingResult.isLoading}
          isError={trendingResult.isError}
          error={trendingResult.error}
          // genres={movieGenresResult.data?.genres ?? []}
        />
      </ScrollView>
    </ScreenView>
  );
}
