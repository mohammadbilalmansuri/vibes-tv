import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Play, Clock, Star } from "lucide-react-native";
import { COLORS } from "@/constants";
import getImageUrl from "@/utils/getImageUrl";
import type { Episode } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 cards per row with padding
const CARD_HEIGHT = CARD_WIDTH * (9 / 16); // 16:9 aspect ratio for episode thumbnails

interface EpisodeCardProps {
  episode: Episode;
  onPress: () => void;
  showNumber?: boolean;
  isWatched?: boolean;
  progress?: number; // 0-1 for watch progress
}

const EpisodeCard = ({
  episode,
  onPress,
  showNumber = true,
  isWatched = false,
  progress = 0,
}: EpisodeCardProps) => {
  const thumbnailUrl = getImageUrl(episode.still_path || "", "w500");

  const formatRuntime = (minutes: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;
  };

  const formatAirDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRating = (vote: number) => {
    return vote > 0 ? vote.toFixed(1) : "N/A";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <View className="bg-zinc-900 rounded-xl overflow-hidden">
        {/* Thumbnail */}
        <View className="relative" style={{ height: CARD_HEIGHT }}>
          {episode.still_path ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
              placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
              cachePolicy="memory-disk"
              transition={300}
            />
          ) : (
            <View className="flex-1 bg-zinc-800 items-center justify-center">
              <Play size={32} color={COLORS.white + "40"} />
            </View>
          )}

          {/* Play Button Overlay */}
          <View className="absolute inset-0 items-center justify-center">
            <View className="bg-black/70 p-3 rounded-full">
              <Play size={16} fill={COLORS.white} color={COLORS.white} />
            </View>
          </View>

          {/* Episode Number Badge */}
          {showNumber && (
            <View className="absolute top-2 left-2">
              <View className="bg-black/80 px-2 py-1 rounded">
                <Text className="text-white text-xs font-bold">
                  {episode.episode_number}
                </Text>
              </View>
            </View>
          )}

          {/* Runtime Badge */}
          {episode.runtime && episode.runtime > 0 && (
            <View className="absolute top-2 right-2">
              <View className="bg-black/80 px-2 py-1 rounded flex-row items-center">
                <Clock size={10} color={COLORS.white} />
                <Text className="text-white text-xs ml-1">
                  {formatRuntime(episode.runtime)}
                </Text>
              </View>
            </View>
          )}

          {/* Progress Bar */}
          {progress > 0 && (
            <View className="absolute bottom-0 left-0 right-0">
              <View className="bg-white/20 h-1">
                <View
                  className="bg-red-500 h-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </View>
            </View>
          )}

          {/* Watched Indicator */}
          {isWatched && (
            <View className="absolute bottom-2 right-2">
              <View className="bg-green-500 p-1 rounded-full">
                <Play size={8} fill={COLORS.white} color={COLORS.white} />
              </View>
            </View>
          )}
        </View>

        {/* Episode Info */}
        <View className="p-3">
          {/* Title */}
          <Text
            className="text-white text-sm font-semibold mb-1"
            numberOfLines={2}
          >
            {episode.name}
          </Text>

          {/* Air Date and Rating */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-white/60 text-xs">
              {formatAirDate(episode.air_date)}
            </Text>

            {episode.vote_average > 0 && (
              <View className="flex-row items-center">
                <Star size={10} fill={COLORS.yellow} color={COLORS.yellow} />
                <Text className="text-white/80 text-xs ml-1">
                  {formatRating(episode.vote_average)}
                </Text>
              </View>
            )}
          </View>

          {/* Overview */}
          {episode.overview && (
            <Text className="text-white/60 text-xs leading-4" numberOfLines={3}>
              {episode.overview}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
});

export default EpisodeCard;
