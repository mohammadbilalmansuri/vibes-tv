import { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useHomeQueries } from "@/hooks";
import { TrendingSection, ContentListSection } from "@/components/common";
import { ScreenView } from "@/components/root";
import { COLORS } from "@/constants";
import type { ContentType } from "@/types";

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const [
    trendingResult,
    popularMoviesResult,
    popularTvShowsResult,
    topRatedMoviesResult,
    topRatedTvShowsResult,
  ] = useHomeQueries();

  const handleItemPress = (type: ContentType, id: number) => {
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["trending"] }),
        queryClient.invalidateQueries({ queryKey: ["popular", "movies"] }),
        queryClient.invalidateQueries({ queryKey: ["popular", "tvShows"] }),
        queryClient.invalidateQueries({ queryKey: ["topRated", "movies"] }),
        queryClient.invalidateQueries({ queryKey: ["topRated", "tvShows"] }),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScreenView inSafeArea={false}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.white}
            colors={[COLORS.white]}
          />
        }
      >
        <TrendingSection {...trendingResult} />

        <ContentListSection
          title="Popular Movies"
          result={popularMoviesResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        <ContentListSection
          title="Popular TV Shows"
          result={popularTvShowsResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        <ContentListSection
          title="Top Rated Movies"
          result={topRatedMoviesResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        <ContentListSection
          title="Top Rated TV Shows"
          result={topRatedTvShowsResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />
      </ScrollView>
    </ScreenView>
  );
}
