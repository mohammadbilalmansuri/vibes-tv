import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, X, Film, Tv, CircleAlert } from "lucide-react-native";
import { COLORS } from "@/constants";
import { useDebounce, useSearch } from "@/hooks";
import { BackHeader, ScreenView } from "@/components/root";
import { ContentCard, Skeleton } from "@/components/ui";
import type { SearchResult, SearchMode, ContentType } from "@/types";

const SEARCH_MODES = [
  { key: "multi" as SearchMode, label: "All", icon: null },
  {
    key: "movie" as SearchMode,
    label: "Movies",
    icon: <Film size={14} color={COLORS.white} />,
  },
  {
    key: "tv" as SearchMode,
    label: "TV Shows",
    icon: <Tv size={14} color={COLORS.white} />,
  },
];

const SearchResultItem = ({
  item,
  onPress,
}: {
  item: SearchResult;
  onPress: (type: ContentType, id: number) => void;
}) => {
  const isMovie = item.media_type === "movie" || "title" in item;
  const contentType: ContentType = isMovie ? "movie" : "tv";
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(contentType, item.id)}
      className="flex-row bg-shark-secondary rounded-xl p-3 mb-3"
    >
      <View className="mr-3">
        <ContentCard item={item as any} variant="compact" onPress={onPress} />
      </View>
      <View className="flex-1 justify-center">
        <Text className="text-white font-semibold text-base" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center mt-1">
          {contentType === "movie" ? (
            <Film size={12} color={COLORS.white + "80"} />
          ) : (
            <Tv size={12} color={COLORS.white + "80"} />
          )}
          <Text className="text-white/60 text-sm ml-1">
            {contentType === "movie" ? "Movie" : "TV Show"}
            {year ? ` • ${year}` : ""}
          </Text>
        </View>
        {item.vote_average > 0 && (
          <Text className="text-yellow text-sm mt-1">
            ★ {item.vote_average.toFixed(1)}
          </Text>
        )}
        {item.overview && (
          <Text className="text-white/50 text-xs mt-2" numberOfLines={2}>
            {item.overview}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SearchModeSelector = ({
  selectedMode,
  onModeChange,
}: {
  selectedMode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
}) => (
  <View className="flex-row px-4 py-3 gap-2">
    {SEARCH_MODES.map(({ key, label, icon }) => (
      <TouchableOpacity
        key={key}
        onPress={() => onModeChange(key)}
        activeOpacity={0.7}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          selectedMode === key ? "bg-rose" : "bg-shark-secondary"
        }`}
      >
        {icon && <View className="mr-1">{icon}</View>}
        <Text
          className={`text-sm font-medium ${
            selectedMode === key ? "text-white" : "text-white/70"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const LoadingSkeletons = () => (
  <View className="px-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <View key={i} className="flex-row bg-shark-secondary rounded-xl p-3 mb-3">
        <Skeleton
          className="rounded-xl mr-3"
          style={{ width: 80, height: 120 }}
        />
        <View className="flex-1 justify-center">
          <Skeleton className="w-3/4 h-5 rounded mb-2" />
          <Skeleton className="w-1/2 h-4 rounded mb-2" />
          <Skeleton className="w-full h-8 rounded" />
        </View>
      </View>
    ))}
  </View>
);

const EmptyState = ({ query }: { query: string }) => {
  if (!query.trim()) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Search size={64} color={COLORS.shark.tertiary} strokeWidth={1} />
        <Text className="text-white text-xl font-semibold mt-6 text-center">
          Search for Movies & TV Shows
        </Text>
        <Text className="text-white/60 text-center mt-2">
          Type in the search bar to find your favorite content
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center px-8">
      <CircleAlert size={64} color={COLORS.shark.tertiary} strokeWidth={1} />
      <Text className="text-white text-xl font-semibold mt-6 text-center">
        No Results Found
      </Text>
      <Text className="text-white/60 text-center mt-2">
        Try searching with different keywords
      </Text>
    </View>
  );
};

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("multi");
  const debouncedQuery = useDebounce(query, 400);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useSearch(searchMode, debouncedQuery);

  const results = data?.pages?.flatMap((page) => page.results) ?? [];
  const filteredResults =
    searchMode === "multi"
      ? results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv",
        )
      : results;

  const handleItemPress = (type: ContentType, id: number) => {
    Keyboard.dismiss();
    if (type === "movie") {
      router.push(`/movie/${id}`);
    } else {
      router.push(`/tv-show/${id}`);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    Keyboard.dismiss();
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <ScreenView>
      <BackHeader />

      <View className="px-4 py-3">
        <View className="flex-row items-center bg-shark-secondary rounded-xl px-4">
          <Search size={20} color={COLORS.white + "80"} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search movies, TV shows..."
            placeholderTextColor={COLORS.white + "50"}
            className="flex-1 text-white text-base py-4 px-3"
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="never"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} activeOpacity={0.7}>
              <X size={20} color={COLORS.white + "80"} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SearchModeSelector
        selectedMode={searchMode}
        onModeChange={setSearchMode}
      />

      {isLoading && debouncedQuery ? (
        <LoadingSkeletons />
      ) : error ? (
        <View className="flex-1 items-center justify-center px-8">
          <CircleAlert size={48} color={COLORS.rose} />
          <Text className="text-white text-lg font-semibold mt-4 text-center">
            Something went wrong
          </Text>
          <Text className="text-white/60 text-center mt-2">
            {error.message || "Please try again later"}
          </Text>
        </View>
      ) : filteredResults.length > 0 ? (
        <FlatList
          data={filteredResults}
          renderItem={({ item }) => (
            <SearchResultItem item={item} onPress={handleItemPress} />
          )}
          keyExtractor={(item) => `${item.id}-${item.media_type}`}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4">
                <ActivityIndicator size="small" color={COLORS.white} />
              </View>
            ) : null
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      ) : (
        <EmptyState query={debouncedQuery} />
      )}
    </ScreenView>
  );
}
