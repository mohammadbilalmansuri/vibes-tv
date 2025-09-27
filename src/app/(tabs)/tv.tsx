import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAiringAndOnTheAirTVShows,
  useTVShowsByGenre,
} from "@/hooks/useTvQueries";
import useGenres from "@/hooks/useGenres";
import ContentListSection from "@/components/common/ContentListSection";
import { ScreenView } from "@/components/root";
import { COLORS } from "@/constants";
import type { ContentType } from "@/types";

export default function TV() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  // Get TV show data
  const [airingTodayResult, onTheAirResult] = useAiringAndOnTheAirTVShows();
  const [, tvGenresResult] = useGenres();

  const handleItemPress = (type: ContentType, id: number) => {
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const tvGenres = tvGenresResult.data?.genres || [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Invalidate TV-related queries
      await queryClient.invalidateQueries({ queryKey: ["tv"] });
      await queryClient.invalidateQueries({ queryKey: ["genres", "tv"] });
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

  return (
    <ScreenView>
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
        {/* Header */}
        <View className="px-4 py-6">
          <Text className="text-white text-3xl font-bold mb-2">TV Shows</Text>
          <Text className="text-white/60 text-base">
            Explore incredible TV series and episodes
          </Text>
        </View>

        {/* Airing Today TV Shows */}
        <ContentListSection
          title="Airing Today"
          result={airingTodayResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* On The Air TV Shows */}
        <ContentListSection
          title="On The Air"
          result={onTheAirResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Genre-based TV Shows */}
        {tvGenres.map((genre) => {
          const GenreTVShows = () => {
            const genreTVResult = useTVShowsByGenre(genre.id);
            return (
              <ContentListSection
                key={`genre-${genre.id}`}
                title={genre.name}
                result={genreTVResult}
                showTitle={true}
                loadMoreFeature={true}
                onItemPress={handleItemPress}
              />
            );
          };
          return <GenreTVShows key={`genre-${genre.id}`} />;
        })}
      </ScrollView>
    </ScreenView>
  );
}
