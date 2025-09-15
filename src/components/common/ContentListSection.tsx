import React from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { CircleAlert } from "lucide-react-native";
import { COLORS } from "@/constants";
import { ContentCard, Skeleton } from "@/components/ui";
import type { ContentPressHandler, ContentResponse, Content } from "@/types";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";

type Result =
  | UseQueryResult<ContentResponse, Error>
  | UseInfiniteQueryResult<InfiniteData<ContentResponse>, Error>;

interface ContentListSectionProps {
  title: string;
  result: Result;
  skeletonCount?: number;
  showTitle?: boolean;
  loadMoreFeature?: boolean;
  onItemPress?: ContentPressHandler;
}

const ContentListSection = ({
  title,
  result,
  skeletonCount = 6,
  loadMoreFeature = false,
  onItemPress,
}: ContentListSectionProps) => {
  const { isLoading, error } = result;

  const hasNextPage =
    loadMoreFeature && "hasNextPage" in result ? result.hasNextPage : false;
  const isFetchingNextPage =
    loadMoreFeature && "isFetchingNextPage" in result
      ? result.isFetchingNextPage
      : false;
  const fetchNextPage =
    loadMoreFeature && "fetchNextPage" in result
      ? result.fetchNextPage
      : () => {};

  const contents = (() => {
    if (!result.data) return [];

    // Check if this is an infinite query (has pages property)
    if ("pages" in result.data && Array.isArray(result.data.pages)) {
      const allResults: Content[] = [];
      for (const page of result.data.pages) {
        if (page && "results" in page) {
          allResults.push(...page.results);
        }
      }
      return allResults;
    }

    // For regular queries, check if data has results property
    if ("results" in result.data) {
      return result.data.results;
    }

    return [];
  })();

  if (isLoading) {
    return (
      <View className="mb-8">
        <View className="px-4 mb-4">
          <Skeleton className="w-40 h-6 rounded-md" />
        </View>
        <View className="flex-row px-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <View key={`skeleton-${i}`} className="mr-3">
              <Skeleton
                className="rounded-xl"
                style={{ width: 120, height: 180 }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="mb-8">
        <View className="px-4 mb-4">
          <Text className="text-white text-xl font-bold">{title}</Text>
        </View>
        <View className="mx-4 bg-zinc-900 rounded-xl p-6 items-center gap-3">
          <CircleAlert size={32} color={COLORS.rose} />
          <Text className="text-white text-center font-medium">
            {error.message || "Failed to load content"}
          </Text>
          <Text className="text-white/60 text-center text-sm">
            Please try again later
          </Text>
        </View>
      </View>
    );
  }

  const renderFooter = () => {
    if (!hasNextPage) return null;

    if (isFetchingNextPage) {
      return (
        <View className="px-4 py-2">
          <ActivityIndicator size="small" color={COLORS.white} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => fetchNextPage()}
        className="bg-white/10 mx-4 py-3 px-4 rounded-lg items-center"
      >
        <Text className="text-white font-medium">Load More</Text>
      </TouchableOpacity>
    );
  };

  if (!contents.length) return null;

  return (
    <View className="py-5 gap-2.5">
      <Text className="text-white text-xl font-bold">{title}</Text>

      <FlatList
        data={contents}
        renderItem={({ item }) => (
          <View style={{ marginRight: 12 }}>
            <ContentCard item={item} variant="compact" onPress={onItemPress} />
          </View>
        )}
        keyExtractor={(item) => `${title}-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 16,
          paddingRight: 4,
        }}
        snapToInterval={132}
        decelerationRate="fast"
        bounces={false}
        ListFooterComponent={loadMoreFeature ? renderFooter : undefined}
        onEndReached={() => {
          if (loadMoreFeature && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ContentListSection;
