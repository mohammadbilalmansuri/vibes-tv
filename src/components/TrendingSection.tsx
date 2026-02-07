import React, { useRef, useState, useTransition } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  CircleAlert,
  Play,
  RefreshCcw,
  RefreshCw,
  Star,
} from "lucide-react-native";
import { COLORS } from "@/constants";
import Skeleton from "@/components/ui/Skeleton";
import getImageUrl from "@/utils/getImageUrl";
import type { TrendingContent, Genre } from "@/types/tmdb";
import { Button } from "./ui";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface TrendingSectionProps {
  data: TrendingContent[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  genres: Genre[];
}

const TrendingSection = ({
  data,
  isLoading,
  isError,
  error,
  genres,
}: TrendingSectionProps) => {
  const flatListRef = useRef<FlatList<TrendingContent>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleMomentumScrollEnd = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    if (index !== currentIndex) setCurrentIndex(index);
  };

  const handleWatchNow = (item: TrendingContent) => {
    const mediaType = item.media_type || "movie";
    router.push(`/${mediaType}/${item.id}` as any);
  };

  if (isLoading) {
    return (
      <View className="p-5 pt-2.5">
        <Skeleton className="w-full aspect-[2/3] rounded-2xl" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="p-5 pt-2.5">
        <View className="w-full aspect-[2/3] bg-shark-secondary justify-center items-center rounded-2xl gap-5 p-5">
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

  if (data.length === 0) return null;

  return (
    <View className="p-5 pt-2.5">
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => `trending-${item.id}`}
        renderItem={({ item }) => {
          const imageUrl = getImageUrl(item.poster_path, "w500");
          const rating = item.vote_average
            ? (item.vote_average / 2).toFixed(1)
            : "N/A";

          const itemGenres =
            genres && item.genre_ids?.length
              ? item.genre_ids
                  .map((id) => genres.find((g) => g.id === id)?.name)
                  .filter(Boolean)
                  .slice(0, 2)
                  .join(" • ")
              : null;

          return (
            <View style={{ width: SCREEN_WIDTH }} className="px-5">
              <View className="relative">
                <Image
                  source={{ uri: imageUrl }}
                  resizeMode="contain"
                  className="w-full aspect-[2/3] rounded-2xl"
                />

                <View className="absolute bottom-8 left-0 right-0 items-center px-8">
                  <Text
                    className="text-white text-2xl font-bold text-center mb-2 drop-shadow-lg"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <View className="flex-row items-center mb-4 gap-4">
                    <View className="flex-row items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star size={16} color="#FFD700" fill="#FFD700" />
                      <Text className="text-white font-semibold">{rating}</Text>
                    </View>
                    {itemGenres && (
                      <Text className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                        {itemGenres}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleWatchNow(item)}
                    className="bg-white/20 backdrop-blur-md rounded-full px-8 py-4 flex-row items-center gap-3 shadow-lg"
                  >
                    <Play size={20} color="white" fill="white" />
                    <Text className="text-white font-bold text-lg">
                      Watch Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        decelerationRate="fast"
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {data.length > 1 && (
        <View className="flex-row justify-center mt-6 gap-2">
          {data.map((_, index: number) => (
            <View
              key={`indicator-${index}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-white w-6" : "bg-white/30 w-2"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default TrendingSection;
