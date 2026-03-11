import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Share,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenView } from "@/components/root";
import { DetailHero } from "@/components/detail";
import { Skeleton } from "@/components/ui";
import { useMovieDetails } from "@/hooks";
import { COLORS } from "@/constants";
import type { ProductionCompany, SpokenLanguage } from "@/types";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const movieId = parseInt(id || "0");
  const [refreshing, setRefreshing] = useState(false);

  const [detail] = useMovieDetails(movieId);

  const handlePlayPress = () => {
    if (!detail.data) return;
    Alert.alert(
      "Play Movie",
      `Would start playing "${detail.data.title}" here.\n\nIn a real streaming app, this would launch the video player.`,
      [{ text: "OK" }],
    );
  };

  const handleWatchlistPress = () => {
    if (!detail.data) return;
    Alert.alert(
      "Add to Watchlist",
      `Added "${detail.data.title}" to your watchlist!`,
      [{ text: "OK" }],
    );
  };

  const handleSharePress = async () => {
    if (!detail.data) return;

    try {
      await Share.share({
        message: `Check out "${detail.data.title}" on Vibes TV!`,
        title: detail.data.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await detail.refetch();
    setRefreshing(false);
  };

  if (detail.isLoading) {
    return (
      <ScreenView>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View style={{ height: 400 }}>
            <Skeleton className="w-full h-full" />
          </View>
          <View className="p-4">
            <Skeleton className="w-3/4 h-8 rounded mb-4" />
            <Skeleton className="w-1/2 h-5 rounded mb-4" />
            <Skeleton className="w-full h-24 rounded mb-6" />
            <Skeleton className="w-40 h-6 rounded mb-3" />
            <View className="flex-row gap-3 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-24 h-8 rounded-full" />
              ))}
            </View>
          </View>
        </ScrollView>
      </ScreenView>
    );
  }

  if (detail.isError || !detail.data) {
    return (
      <ScreenView>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-rose text-xl font-bold mb-2">
            Failed to load movie
          </Text>
          <Text className="text-white/60 text-center mb-4">
            {detail.error?.message || "Something went wrong"}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-white text-base">← Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenView>
    );
  }

  const movie = detail.data;

  const formatCurrency = (amount: number): string => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScreenView inSafeArea={false}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.white}
            colors={[COLORS.white]}
          />
        }
      >
        <DetailHero
          title={movie.title}
          backdropPath={movie.backdrop_path ?? undefined}
          posterPath={movie.poster_path ?? undefined}
          overview={movie.overview}
          rating={movie.vote_average}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
          genres={movie.genres}
          contentType="movie"
          tagline={movie.tagline}
          status={movie.status}
          onPlayPress={handlePlayPress}
          onWatchlistPress={handleWatchlistPress}
          onSharePress={handleSharePress}
        />

        <View className="px-4 py-6">
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">
              Movie Details
            </Text>
            <View className="bg-shark-secondary p-4 rounded-xl">
              {movie.status && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Status:</Text>
                  <Text className="text-white font-semibold">
                    {movie.status}
                  </Text>
                </View>
              )}

              {movie.runtime && movie.runtime > 0 && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Runtime:</Text>
                  <Text className="text-white font-semibold">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </Text>
                </View>
              )}

              {movie.budget > 0 && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Budget:</Text>
                  <Text className="text-white font-semibold">
                    {formatCurrency(movie.budget)}
                  </Text>
                </View>
              )}

              {movie.revenue > 0 && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Revenue:</Text>
                  <Text className="text-white font-semibold">
                    {formatCurrency(movie.revenue)}
                  </Text>
                </View>
              )}

              {movie.original_language && (
                <View className="flex-row justify-between">
                  <Text className="text-white/60">Original Language:</Text>
                  <Text className="text-white font-semibold">
                    {movie.original_language.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {movie.production_companies.length > 0 && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">
                Production
              </Text>
              <View className="flex-row flex-wrap">
                {movie.production_companies
                  .slice(0, 4)
                  .map((company: ProductionCompany, idx: number) => (
                    <View key={company.id} className="mr-3 mb-2">
                      <Text className="text-white/60 text-sm">
                        {company.name}
                        {idx < movie.production_companies.slice(0, 4).length - 1
                          ? " • "
                          : ""}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          )}

          {movie.spoken_languages.length > 0 && (
            <View className="mb-6">
              <Text className="text-white text-lg font-bold mb-3">
                Languages
              </Text>
              <View className="flex-row flex-wrap">
                {movie.spoken_languages.map((language: SpokenLanguage) => (
                  <View
                    key={language.iso_639_1}
                    className="bg-shark-secondary px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-white/80 text-sm">
                      {language.english_name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenView>
  );
}
