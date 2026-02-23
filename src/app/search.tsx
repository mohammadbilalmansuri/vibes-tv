import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Search as SearchIcon, X } from "lucide-react-native";
import { ScreenView } from "@/components/root";
import { ContentCard, Skeleton } from "@/components/ui";
import { useSearch, useDebounce } from "@/hooks";
import { COLORS } from "@/constants";
import type { ContentType, Content } from "@/types";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, error } = useSearch("multi", debouncedQuery);

  // Flatten all pages into a single array and convert SearchResult to Content
  const searchResults: Content[] =
    data?.pages?.flatMap((page) =>
      page.results
        .filter(
          (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            (item.poster_path || item.backdrop_path)
        )
        .map((item) => {
          // Convert SearchResult to Content format
          if (item.media_type === "movie") {
            return {
              ...item,
              adult: item.adult || false,
              video: item.video || false,
              title: item.title || "",
              original_title: item.original_title || "",
              release_date: item.release_date || "",
            } as Content;
          } else {
            return {
              ...item,
              name: item.name || "",
              original_name: item.original_name || "",
              first_air_date: item.first_air_date || "",
              origin_country: item.origin_country || [],
            } as Content;
          }
        })
    ) || [];

  const handleItemPress = (type: ContentType, id: number) => {
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  const renderSearchResult = ({ item }: { item: Content }) => {
    const isMovie = "title" in item;
    const title = isMovie ? item.title : item.name;
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    const contentType: ContentType = isMovie ? "movie" : "tv";

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleItemPress(contentType, item.id)}
        className="flex-row p-3 bg-zinc-900/50 mb-2 mx-4 rounded-xl"
      >
        <View className="mr-3">
          <ContentCard item={item} variant="compact" />
        </View>
        <View className="flex-1 justify-center">
          <Text
            className="text-white text-base font-semibold mb-1"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text className="text-white/60 text-sm mb-1">
            {contentType === "movie" ? "Movie" : "TV Show"}
          </Text>
          {releaseDate && (
            <Text className="text-white/60 text-sm">
              {new Date(releaseDate).getFullYear()}
            </Text>
          )}
          {item.vote_average > 0 && (
            <Text className="text-yellow-400 text-sm mt-1">
              ⭐ {item.vote_average.toFixed(1)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoadingSkeleton = () => (
    <View className="px-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} className="flex-row p-3 mb-2">
          <Skeleton className="w-[120px] h-[180px] rounded-xl mr-3" />
          <View className="flex-1 justify-center">
            <Skeleton className="w-3/4 h-4 rounded mb-2" />
            <Skeleton className="w-1/2 h-3 rounded mb-1" />
            <Skeleton className="w-1/3 h-3 rounded" />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScreenView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-4 py-6">
          <Text className="text-white text-3xl font-bold mb-2">Search</Text>
          <Text className="text-white/60 text-base mb-4">
            Find your favorite movies and TV shows
          </Text>

          {/* Search Input */}
          <View className="flex-row items-center bg-zinc-900 rounded-xl px-4 py-3">
            <SearchIcon size={20} color={COLORS.white} className="mr-3" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search movies, TV shows..."
              placeholderTextColor={COLORS.white + "60"}
              className="flex-1 text-white text-base ml-3"
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={clearSearch} className="ml-2">
                <X size={20} color={COLORS.white + "60"} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search Results */}
        <View className="flex-1">
          {!debouncedQuery ? (
            <View className="flex-1 justify-center items-center px-4">
              <SearchIcon size={64} color={COLORS.white + "30"} />
              <Text className="text-white/60 text-lg text-center mt-4">
                Start typing to search for movies and TV shows
              </Text>
            </View>
          ) : isLoading ? (
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {renderLoadingSkeleton()}
            </ScrollView>
          ) : error ? (
            <View className="flex-1 justify-center items-center px-4">
              <Text className="text-red-400 text-lg text-center mb-2">
                Search failed
              </Text>
              <Text className="text-white/60 text-center">
                {error?.message || "Something went wrong. Please try again."}
              </Text>
            </View>
          ) : !searchResults.length ? (
            <View className="flex-1 justify-center items-center px-4">
              <SearchIcon size={64} color={COLORS.white + "30"} />
              <Text className="text-white/60 text-lg text-center mt-4">
                No results found for &ldquo;{debouncedQuery}&rdquo;
              </Text>
              <Text className="text-white/40 text-center mt-2">
                Try different keywords or check your spelling
              </Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={(item) => `search-${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenView>
  );
}
