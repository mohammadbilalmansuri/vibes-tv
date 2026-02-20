import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Play } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";

import getImageUrl from "@/utils/getImageUrl";
import type { Content, ContentType } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ContentCardProps {
  item: Content;
  variant: "trending" | "compact";
  onPress?: (type: ContentType, id: number) => void;
  onPlayPress?: (type: ContentType, id: number) => void;
  style?: object;
  // For animations in horizontal lists
  scrollX?: SharedValue<number>;
  index?: number;
  itemWidth?: number;
}

const ContentCard = ({
  item,
  variant,
  onPress,
  onPlayPress,
  style,
  scrollX,
  index,
  itemWidth,
}: ContentCardProps) => {
  const isMovie = "title" in item;
  const contentType: ContentType = isMovie ? "movie" : "tv";

  // Better image selection with fallbacks
  const primaryImage =
    variant === "trending"
      ? item.backdrop_path || item.poster_path
      : item.poster_path || item.backdrop_path;

  const fallbackImage =
    variant === "trending" ? item.poster_path : item.backdrop_path;

  const imageUrl = primaryImage
    ? getImageUrl(primaryImage, variant === "trending" ? "w780" : "w500")
    : undefined;

  const fallbackImageUrl = fallbackImage
    ? getImageUrl(fallbackImage, variant === "trending" ? "w780" : "w500")
    : undefined;

  // Animation style for horizontal lists
  const animatedStyle = useAnimatedStyle(() => {
    if (!scrollX || index === undefined || !itemWidth) {
      return {};
    }

    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  if (variant === "trending") {
    return (
      <Animated.View
        style={[styles.trendingCard, style, animatedStyle]}
        className="relative rounded-2xl overflow-hidden bg-zinc-800"
      >
        <Image
          source={{
            uri: imageUrl,
            ...(fallbackImageUrl && {
              headers: { fallback: fallbackImageUrl },
            }),
          }}
          contentFit="cover"
          transition={300}
          style={StyleSheet.absoluteFillObject}
          placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
          cachePolicy="memory-disk"
          recyclingKey={`${item.id}-${variant}`}
          priority="high"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFillObject}
        />

        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.3 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Centered Play Button */}
        <View className="absolute inset-0 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress?.(contentType, item.id)}
            className="bg-white/90 p-4 rounded-full"
          >
            <Play size={24} fill="#000" color="#000" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  // Compact variant for horizontal lists - simple rounded image only
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(contentType, item.id)}
      style={style}
    >
      <Animated.View style={[styles.compactCard, animatedStyle]}>
        <Image
          source={{
            uri: imageUrl,
            ...(fallbackImageUrl && {
              headers: { fallback: fallbackImageUrl },
            }),
          }}
          contentFit="cover"
          transition={300}
          style={styles.compactImage}
          className="rounded-xl"
          placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
          cachePolicy="memory-disk"
          recyclingKey={`${item.id}-compact`}
          priority="normal"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const PADDING_HORIZONTAL = 20;
const TRENDING_ITEM_WIDTH = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
const TRENDING_ITEM_HEIGHT = TRENDING_ITEM_WIDTH * (3 / 2); // Changed to 2:3 aspect ratio

const COMPACT_CARD_WIDTH = 120;
const COMPACT_IMAGE_HEIGHT = COMPACT_CARD_WIDTH * (3 / 2); // Also 2:3 aspect ratio

const styles = StyleSheet.create({
  trendingCard: {
    width: TRENDING_ITEM_WIDTH,
    height: TRENDING_ITEM_HEIGHT,
  },
  compactCard: {
    width: COMPACT_CARD_WIDTH,
  },
  compactImage: {
    width: COMPACT_CARD_WIDTH,
    height: COMPACT_IMAGE_HEIGHT,
  },
});

export default ContentCard;
