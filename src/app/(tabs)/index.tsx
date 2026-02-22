import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import useHomeQueries from "@/hooks/useHomeQueries";
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Invalidate and refetch all home queries
      await queryClient.invalidateQueries({ queryKey: ["trending"] });
      await queryClient.invalidateQueries({ queryKey: ["movies", "popular"] });
      await queryClient.invalidateQueries({ queryKey: ["tv", "popular"] });
      await queryClient.invalidateQueries({
        queryKey: ["movies", "top_rated"],
      });
      await queryClient.invalidateQueries({ queryKey: ["tv", "top_rated"] });
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

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
        {/* Trending Section */}
        <TrendingSection {...trendingResult} />

        {/* Popular Movies */}
        <ContentListSection
          title="Popular Movies"
          result={popularMoviesResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Popular TV Shows */}
        <ContentListSection
          title="Popular TV Shows"
          result={popularTvShowsResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Top Rated Movies */}
        <ContentListSection
          title="Top Rated Movies"
          result={topRatedMoviesResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Top Rated TV Shows */}
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
