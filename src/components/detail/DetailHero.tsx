import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Play,
  Plus,
  Share,
  Star,
  Clock,
  Calendar,
  ChevronLeft,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import getImageUrl from "@/utils/getImageUrl";
import type { Genre, ContentType } from "@/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_HEIGHT * 0.6;

interface DetailHeroProps {
  title: string;
  backdropPath?: string;
  posterPath?: string;
  overview: string;
  rating: number;
  releaseDate: string;
  runtime?: number; // For movies
  genres: Genre[];
  contentType: ContentType;
  onPlayPress: () => void;
  onWatchlistPress?: () => void;
  onSharePress?: () => void;
  tagline?: string;
  status?: string;
}

const DetailHero = ({
  title,
  backdropPath,
  posterPath,
  overview,
  rating,
  releaseDate,
  runtime,
  genres,
  contentType,
  onPlayPress,
  onWatchlistPress,
  onSharePress,
  tagline,
  status,
}: DetailHeroProps) => {
  const router = useRouter();

  const backdropUrl = getImageUrl(backdropPath || posterPath || "", "w1280");

  const posterUrl = getImageUrl(posterPath || "", "w500");

  const formatReleaseDate = (date: string) => {
    if (!date) return "";
    return new Date(date).getFullYear().toString();
  };

  const formatRuntime = (minutes: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;
  };

  const formatRating = (vote: number) => {
    return vote > 0 ? vote.toFixed(1) : "N/A";
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: backdropUrl }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
        cachePolicy="memory-disk"
        transition={300}
      />

      {/* Gradients for better text readability */}
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "transparent", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Back Button */}
      <View className="absolute top-12 left-4 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-black/50 p-3 rounded-full"
        >
          <ChevronLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Share Button */}
      {onSharePress && (
        <View className="absolute top-12 right-4 z-10">
          <TouchableOpacity
            onPress={onSharePress}
            className="bg-black/50 p-3 rounded-full"
          >
            <Share size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <View className="flex-1 justify-end pb-8">
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Poster and Title Section */}
          <View className="flex-row px-4 mb-6">
            {/* Poster */}
            <View className="mr-4">
              <Image
                source={{ uri: posterUrl }}
                style={styles.poster}
                contentFit="cover"
                className="rounded-xl"
                placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
                cachePolicy="memory-disk"
              />
            </View>

            {/* Title and Meta Info */}
            <View className="flex-1 justify-end">
              <Text
                className="text-white text-2xl font-bold mb-2"
                numberOfLines={2}
              >
                {title}
              </Text>

              {tagline && (
                <Text
                  className="text-white/80 text-sm italic mb-3"
                  numberOfLines={2}
                >
                  {tagline}
                </Text>
              )}

              {/* Rating and Meta */}
              <View className="flex-row items-center mb-3">
                <View className="flex-row items-center mr-4">
                  <Star size={16} fill={COLORS.yellow} color={COLORS.yellow} />
                  <Text className="text-white ml-1 font-semibold">
                    {formatRating(rating)}
                  </Text>
                </View>

                <View className="flex-row items-center mr-4">
                  <Calendar size={16} color={COLORS.white} />
                  <Text className="text-white ml-1">
                    {formatReleaseDate(releaseDate)}
                  </Text>
                </View>

                {runtime && (
                  <View className="flex-row items-center">
                    <Clock size={16} color={COLORS.white} />
                    <Text className="text-white ml-1">
                      {formatRuntime(runtime)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Genres */}
              <View className="flex-row flex-wrap mb-4">
                {genres.slice(0, 3).map((genre, index) => (
                  <View
                    key={genre.id}
                    className="bg-white/20 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-white text-xs font-medium">
                      {genre.name}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Status for TV Shows */}
              {contentType === "tv" && status && (
                <Text className="text-white/60 text-sm mb-3">
                  Status: {status}
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="px-4 mb-6">
            <View className="flex-row gap-3">
              {/* Play Button */}
              <TouchableOpacity
                onPress={onPlayPress}
                className="flex-1 bg-white px-6 py-4 rounded-xl flex-row items-center justify-center"
              >
                <Play size={20} fill="#000" color="#000" className="mr-2" />
                <Text className="text-black font-bold text-base ml-2">
                  {contentType === "movie" ? "Play Movie" : "Play"}
                </Text>
              </TouchableOpacity>

              {/* Watchlist Button */}
              {onWatchlistPress && (
                <TouchableOpacity
                  onPress={onWatchlistPress}
                  className="bg-white/20 p-4 rounded-xl"
                >
                  <Plus size={20} color={COLORS.white} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Overview */}
          <View className="px-4">
            <Text className="text-white text-base leading-6" numberOfLines={4}>
              {overview}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    width: SCREEN_WIDTH,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
  },
});

export default DetailHero;
