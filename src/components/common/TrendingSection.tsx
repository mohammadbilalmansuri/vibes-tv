import React, { useRef } from "react";
import {
  View,
  Text,
  ListRenderItem,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { CircleAlert } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "@/constants";
import { ContentCard, Skeleton } from "@/components/ui";
import type { TrendingResponse, ContentType, Content } from "@/types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

type TrendingItem = TrendingResponse["results"][number];

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<TrendingItem>
);
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PADDING_HORIZONTAL = 20;
const ITEM_WIDTH_VISIBLE = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
const ITEM_HEIGHT = ITEM_WIDTH_VISIBLE * (3 / 2);
const ITEM_FULL_WIDTH = ITEM_WIDTH_VISIBLE;

const TrendingSection = ({
  data,
  isLoading,
  isError,
  error,
}: UseQueryResult<TrendingResponse, Error>) => {
  const router = useRouter();
  const listRef = useRef<FlatList<TrendingItem>>(null);
  const activeIndex = useSharedValue(0);
  const scrollX = useSharedValue(0);

  const filteredResults =
    data?.results.filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        (item.backdrop_path || item.poster_path)
    ) ?? [];

  const loopedData =
    filteredResults.length > 1
      ? [
          filteredResults[filteredResults.length - 1],
          ...filteredResults,
          filteredResults[0],
        ]
      : filteredResults;

  const handleItemPress = (type: ContentType, id: string | number) => {
    const numericId = String(id);
    if (type === "movie") {
      router.push(`/movie/${numericId}`);
    } else {
      router.push(`/tv-show/${numericId}`);
    }
  };

  const handlePlayPress = (type: ContentType, id: string | number) => {
    // For demo purposes - in a real app, this would navigate to the player
    console.log("Play content:", type, id);
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const newIndex = Math.round(event.contentOffset.x / ITEM_FULL_WIDTH);
      if (newIndex !== activeIndex.value) {
        activeIndex.value = newIndex;
      }
    },
  });

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (filteredResults.length <= 1) return;

    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_FULL_WIDTH);

    if (index === 0) {
      listRef.current?.scrollToIndex({
        index: filteredResults.length,
        animated: false,
      });
    } else if (index === loopedData.length - 1) {
      listRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  };

  const renderItem: ListRenderItem<TrendingItem> = ({ item, index }) => {
    // Convert TrendingItem to Content format for ContentCard
    // TrendingContent extends BaseMovie but can also be TV shows
    const contentItem: Content =
      item.media_type === "movie"
        ? {
            ...item,
            // Ensure movie fields are present
            adult: item.adult || false,
            video: item.video || false,
          }
        : ({
            // For TV shows, create a BaseTVShow-like object
            id: item.id,
            backdrop_path: item.backdrop_path,
            genre_ids: item.genre_ids,
            original_language: item.original_language,
            overview: item.overview,
            popularity: item.popularity,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            vote_count: item.vote_count,
            first_air_date: (item as any).first_air_date || "",
            name: (item as any).name || item.title || "",
            origin_country: (item as any).origin_country || [],
            original_name:
              (item as any).original_name || item.original_title || "",
          } as Content);

    return (
      <ContentCard
        item={contentItem}
        variant="trending"
        onPress={handleItemPress}
        onPlayPress={handlePlayPress}
        scrollX={scrollX}
        index={index}
        itemWidth={ITEM_FULL_WIDTH}
      />
    );
  };

  const PaginationDot = React.memo(function PaginationDot({
    index,
  }: {
    index: number;
  }) {
    const dotAnimatedStyle = useAnimatedStyle(() => {
      const realDataOffset = scrollX.value - ITEM_FULL_WIDTH;

      const inputRange = [
        (index - 1) * ITEM_FULL_WIDTH,
        index * ITEM_FULL_WIDTH,
        (index + 1) * ITEM_FULL_WIDTH,
      ];

      const opacity = interpolate(
        realDataOffset,
        inputRange,
        [0.4, 1, 0.4],
        Extrapolate.CLAMP
      );

      const scale = interpolate(
        realDataOffset,
        inputRange,
        [0.8, 1.2, 0.8],
        Extrapolate.CLAMP
      );

      const width = interpolate(
        realDataOffset,
        inputRange,
        [8, 24, 8],
        Extrapolate.CLAMP
      );

      return {
        opacity,
        transform: [{ scale }],
        width,
      };
    });

    return (
      <Animated.View
        key={`dot-${index}`}
        className="h-2 rounded-full mx-1.5 bg-white"
        style={dotAnimatedStyle}
      />
    );
  });

  const PaginationDots = () => {
    return (
      <View className="flex-row justify-center items-center mt-4">
        {filteredResults.map((_, index) => (
          <PaginationDot key={`dot-${index}`} index={index} />
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.outerContainer}>
        <View style={{ width: ITEM_WIDTH_VISIBLE, height: ITEM_HEIGHT }}>
          <Skeleton className="w-full h-full rounded-2xl" />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.outerContainer}>
        <View
          style={{ width: ITEM_WIDTH_VISIBLE, height: ITEM_HEIGHT }}
          className="bg-zinc-800 justify-center items-center rounded-2xl gap-5 p-5"
        >
          <CircleAlert size={48} color={COLORS.yellow} strokeWidth={1.5} />
          <Text className="text-xl font-semibold text-white text-center">
            {error?.message || "Unable to load trending content"}
          </Text>
          <Text className="text-white/60 text-center -mt-2">
            Please try again later
          </Text>
        </View>
      </View>
    );
  }

  if (filteredResults.length === 0) {
    return (
      <View style={styles.outerContainer}>
        <View
          style={{ width: ITEM_WIDTH_VISIBLE, height: ITEM_HEIGHT }}
          className="bg-zinc-800 justify-center items-center rounded-2xl gap-5 p-5"
        >
          <CircleAlert size={48} color={COLORS.yellow} strokeWidth={1.5} />
          <Text className="text-xl font-semibold text-white text-center">
            No trending content available
          </Text>
          <Text className="text-white/60 text-center -mt-2">
            Check back soon!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="py-2.5">
      <View style={{ height: ITEM_HEIGHT + 20 }}>
        <AnimatedFlatList
          ref={listRef}
          data={loopedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `trending-${item.id}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialScrollIndex={filteredResults.length > 1 ? 1 : 0}
          getItemLayout={(_, index) => ({
            length: ITEM_FULL_WIDTH,
            offset: ITEM_FULL_WIDTH * index,
            index,
          })}
          snapToInterval={ITEM_FULL_WIDTH}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={{
            paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH_VISIBLE) / 2,
          }}
        />
      </View>
      {filteredResults.length > 1 && <PaginationDots />}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default TrendingSection;
