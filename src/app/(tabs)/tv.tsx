import { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAiringAndOnTheAirTVShows,
  useTVShowsByGenre,
  useGenres,
} from "@/hooks";
import { ContentListSection } from "@/components/common";
import { ScreenView } from "@/components/root";
import { COLORS } from "@/constants";
import type { ContentType, Genre } from "@/types";

const GenreTVShowsSection = ({
  genre,
  onItemPress,
}: {
  genre: Genre;
  onItemPress: (type: ContentType, id: number) => void;
}) => {
  const genreTVResult = useTVShowsByGenre(genre.id);

  return (
    <ContentListSection
      title={genre.name}
      result={genreTVResult}
      showTitle={true}
      loadMoreFeature={true}
      onItemPress={onItemPress}
    />
  );
};

export default function TV() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const [airingTodayResult, onTheAirResult] = useAiringAndOnTheAirTVShows();
  const [, tvGenresResult] = useGenres();

  const handleItemPress = (type: ContentType, id: number) => {
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const tvGenres = tvGenresResult.data?.genres ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tv"] }),
        queryClient.invalidateQueries({ queryKey: ["genres", "tv"] }),
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
          <Text className="text-white text-3xl font-bold mb-2">TV Shows</Text>
          <Text className="text-white/60 text-base">
            Explore incredible TV series and episodes
          </Text>
        </View>

        <ContentListSection
          title="Airing Today"
          result={airingTodayResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        <ContentListSection
          title="On The Air"
          result={onTheAirResult}
          showTitle={true}
          onItemPress={handleItemPress}
        />

        {tvGenres.map((genre) => (
          <GenreTVShowsSection
            key={`genre-${genre.id}`}
            genre={genre}
            onItemPress={handleItemPress}
          />
        ))}
      </ScrollView>
    </ScreenView>
  );
}
