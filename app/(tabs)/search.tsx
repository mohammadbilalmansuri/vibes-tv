import { Film, Search as SearchIcon, Sparkles } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { logo } from "@/assets";
import { MovieCard, MovieCardSkeleton, SearchBar } from "@/components";
import { useFetch } from "@/hooks";
import { getMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    isLoading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => getMovies(searchQuery), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        loadMovies();

        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const EmptyState = () => (
    <Animated.View
      className="flex-1 justify-center items-center px-8 py-20"
      entering={FadeInUp.springify()}
    >
      <View className="bg-secondary-800 rounded-full p-6 mb-6">
        <SearchIcon size={40} color="#ec4899" />
      </View>

      <Text className="text-2xl font-bold text-white text-center mb-3">
        {searchQuery.trim() ? "No Results Found" : "Discover Movies"}
      </Text>

      <Text className="text-secondary-400 text-center text-base leading-6">
        {searchQuery.trim()
          ? `No movies found for "${searchQuery}". Try different keywords.`
          : "Search for your favorite movies, series, and shows."}
      </Text>

      {!searchQuery.trim() && (
        <View className="flex-row items-center mt-6 bg-primary-500/10 px-4 py-2 rounded-full">
          <Sparkles size={16} color="#ec4899" />
          <Text className="text-primary-400 text-sm font-medium ml-2">
            Start typing to explore
          </Text>
        </View>
      )}
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary-950" edges={["top"]}>
      <FlatList
        className="flex-1"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 24,
        }}
        contentContainerStyle={{
          paddingBottom: 140,
          paddingHorizontal: 24,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <Animated.View
              className="pt-4 pb-6"
              entering={FadeInDown.delay(100).springify()}
            >
              <View className="flex-row items-center justify-center mb-6">
                <Image source={logo} className="w-10 h-8" />
                <Text className="text-2xl font-bold text-white ml-3">
                  <Text className="text-primary-400">Search</Text>
                </Text>
              </View>

              <SearchBar
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </Animated.View>

            {/* Loading State */}
            {isLoading && (
              <View className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View className="bg-primary-500/20 p-2 rounded-xl mr-3">
                    <Film size={20} color="#ec4899" />
                  </View>
                  <Text className="text-lg font-bold text-white">
                    Searching...
                  </Text>
                </View>

                <View className="flex-row flex-wrap justify-between">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <View key={item} className="w-[30%] mb-6">
                      <MovieCardSkeleton />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Error State */}
            {error && (
              <Animated.View
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6"
                entering={FadeInUp.springify()}
              >
                <Text className="text-red-400 text-center font-medium">
                  Something went wrong. Please try again.
                </Text>
              </Animated.View>
            )}

            {/* Results Header */}
            {!isLoading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Animated.View
                  className="mb-6"
                  entering={FadeInUp.delay(200).springify()}
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-xl font-bold text-white">
                        Search Results
                      </Text>
                      <Text className="text-secondary-400 text-sm mt-1">
                        Found {movies?.length} results for "
                        <Text className="text-primary-400">{searchQuery}</Text>"
                      </Text>
                    </View>
                    <View className="bg-primary-500/20 px-3 py-1 rounded-full">
                      <Text className="text-primary-400 text-xs font-semibold">
                        {movies?.length}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              )}
          </>
        }
        ListEmptyComponent={!isLoading && !error ? <EmptyState /> : null}
      />
    </SafeAreaView>
  );
}
