import { MovieCard, Skeleton, TVCard } from "@/components";
import { useMultiSearch } from "@/hooks";
import { SearchResult } from "@/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Film, Search, Tv, X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Simple debounce function
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
    }, 500),
    []
  );

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useMultiSearch(debouncedQuery);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const handleItemPress = (item: SearchResult) => {
    if (item.media_type === "movie" || item.media_type === "tv") {
      router.push(`/movie/${item.id}`);
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    if (item.media_type === "person") {
      return null; // Skip person results for now
    }

    if (item.media_type === "movie") {
      return (
        <View className="w-1/2 px-2 mb-4">
          <MovieCard
            movie={{
              id: item.id,
              title: item.title || "",
              overview: item.overview || "",
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              release_date: item.release_date || "",
              vote_average: item.vote_average || 0,
              vote_count: 0,
              genre_ids: [],
              adult: false,
              original_language: "",
              original_title: item.title || "",
              popularity: item.popularity || 0,
              video: false,
            }}
            onPress={() => handleItemPress(item)}
          />
        </View>
      );
    }

    if (item.media_type === "tv") {
      return (
        <View className="w-1/2 px-2 mb-4">
          <TVCard
            tvShow={{
              id: item.id,
              name: item.name || "",
              overview: item.overview || "",
              poster_path: item.poster_path,
              backdrop_path: item.backdrop_path,
              first_air_date: item.first_air_date || "",
              vote_average: item.vote_average || 0,
              vote_count: 0,
              genre_ids: [],
              adult: false,
              original_language: "",
              original_name: item.name || "",
              popularity: item.popularity || 0,
              origin_country: [],
            }}
            onPress={() => handleItemPress(item)}
          />
        </View>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View className="flex-1 px-4">
          <View className="flex-row flex-wrap">
            {[...Array(6)].map((_, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <Skeleton width={160} height={240} />
              </View>
            ))}
          </View>
        </View>
      );
    }

    if (debouncedQuery && !isLoading) {
      return (
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-neutral-800/50 rounded-2xl p-8 items-center">
            <Search size={48} color="#6b7280" />
            <Text className="text-neutral-300 text-xl font-bold mt-4 text-center">
              No results found
            </Text>
            <Text className="text-neutral-400 text-base text-center mt-2">
              for "{debouncedQuery}"
            </Text>
            <Text className="text-neutral-500 text-sm text-center mt-2">
              Try searching with different keywords
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View className="flex-1 justify-center items-center px-6">
        <View className="items-center">
          <View className="bg-primary-500/20 p-6 rounded-full mb-6">
            <Search size={48} color="#0ea5e9" />
          </View>
          <Text className="text-white text-2xl font-bold mb-3">
            Discover Content
          </Text>
          <Text className="text-neutral-400 text-base text-center leading-6 mb-6">
            Search through millions of movies and TV shows to find your next
            favorite
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-row items-center bg-neutral-800/50 px-4 py-2 rounded-full">
              <Film size={16} color="#0ea5e9" />
              <Text className="text-neutral-300 text-sm ml-2">Movies</Text>
            </View>
            <View className="flex-row items-center bg-neutral-800/50 px-4 py-2 rounded-full">
              <Tv size={16} color="#10b981" />
              <Text className="text-neutral-300 text-sm ml-2">TV Shows</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Flatten all pages into a single array
  const allResults = searchResults?.pages.flatMap((page) => page.results) || [];

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar style="light" />

      {/* Header */}
      <View className="px-6 pt-16 pb-6">
        <Text className="text-white text-4xl font-bold mb-2">Search</Text>
        <Text className="text-neutral-400 text-lg">
          Find movies and TV shows
        </Text>
      </View>

      {/* Search Input */}
      <View className="px-6 mb-6">
        <View className="flex-row items-center bg-neutral-800/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-neutral-700/50">
          <Search size={22} color="#0ea5e9" />
          <TextInput
            className="flex-1 text-white text-base ml-4 font-medium"
            placeholder="Search movies and TV shows..."
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              className="ml-3 bg-neutral-700/50 p-1 rounded-full"
            >
              <X size={16} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      <View className="flex-1">
        {allResults.length > 0 ? (
          <FlatList
            data={allResults}
            renderItem={renderSearchResult}
            keyExtractor={(item, index) => `search-${item.id}-${index}`}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmpty()
        )}
      </View>
    </View>
  );
}
