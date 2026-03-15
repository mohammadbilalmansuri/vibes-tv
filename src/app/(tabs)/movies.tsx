import { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMoviesByGenre,
  useNowPlayingAndUpcomingMovies,
  useGenres,
} from "@/hooks";
import { ContentListSection } from "@/components/common";
import { ScreenView } from "@/components/root";
import { COLORS } from "@/constants";
import type { ContentType, Genre } from "@/types";

const GenreMoviesSection = ({
  genre,
  onItemPress,
}: {
  genre: Genre;
  onItemPress: (type: ContentType, id: number) => void;
}) => {
  const genreMovieResult = useMoviesByGenre(genre.id);

  return (
    <ContentListSection
      title={genre.name}
      result={genreMovieResult}
      showTitle={true}
      loadMoreFeature={true}
      onItemPress={onItemPress}
    />
  );
};

export default function Movies() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["movies"] }),
        queryClient.invalidateQueries({ queryKey: ["genres", "movie"] }),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

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
        <View className="px-4 py-6">
          <Text className="text-white text-3xl font-bold mb-2">Movies</Text>
          <Text className="text-white/60 text-base">
            Discover amazing movies and blockbusters
          </Text>
        </View>

        <ContentListSection
          title="Now Playing"
          result={nowPlayingResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        <ContentListSection
          title="Upcoming"
          result={upcomingResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {movieGenres.map((genre) => (
          <GenreMoviesSection
            key={`genre-${genre.id}`}
            genre={genre}
            onItemPress={handleItemPress}
          />
        ))}
      </ScrollView>
    </ScreenView>
  );
}
