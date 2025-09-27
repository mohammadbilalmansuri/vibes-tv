import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMoviesByGenre,
  useNowPlayingAndUpcomingMovies,
} from "@/hooks/useMovieQueries";
import useGenres from "@/hooks/useGenres";
import { ContentListSection } from "@/components/common";
import { ScreenView } from "@/components/root";
import { COLORS } from "@/constants";
import type { ContentType } from "@/types";

export default function Movies() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  // Get movie data
  const [nowPlayingResult, upcomingResult] = useNowPlayingAndUpcomingMovies();
  const [movieGenresResult] = useGenres();

  const handleItemPress = (type: ContentType, id: number) => {
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const movieGenres = movieGenresResult.data?.genres ?? [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Invalidate movie-related queries
      await queryClient.invalidateQueries({ queryKey: ["movies"] });
      await queryClient.invalidateQueries({ queryKey: ["genres", "movie"] });
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
          <Text className="text-white text-3xl font-bold mb-2">Movies</Text>
          <Text className="text-white/60 text-base">
            Discover amazing movies and blockbusters
          </Text>
        </View>

        {/* Now Playing Movies */}
        <ContentListSection
          title="Now Playing"
          result={nowPlayingResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Upcoming Movies */}
        <ContentListSection
          title="Upcoming"
          result={upcomingResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {/* Genre-based Movies */}
        {movieGenres.map((genre) => {
          const GenreMovies = () => {
            const genreMovieResult = useMoviesByGenre(genre.id);

            return (
              <ContentListSection
                key={`genre-${genre.id}`}
                title={genre.name}
                result={genreMovieResult}
                showTitle={true}
                loadMoreFeature={true}
                onItemPress={handleItemPress}
              />
            );
          };
          return <GenreMovies key={`genre-${genre.id}`} />;
        })}
      </ScrollView>
    </ScreenView>
  );
}
