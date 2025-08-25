import { useRouter } from "expo-router";
import { Sparkles, TrendingUp } from "lucide-react-native";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { logo } from "@/assets";
import {
  MovieCard,
  MovieCardSkeleton,
  SearchBar,
  TrendingCard,
  TrendingCardSkeleton,
} from "@/components";
import { useFetch } from "@/hooks";
import { getMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

export default function Home() {
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetch(() => getMovies());

  return (
    <SafeAreaView className="flex-1 bg-secondary-950" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Header */}
        <Animated.View
          className="px-6 pt-4 pb-6"
          entering={FadeInDown.delay(100).springify()}
        >
          <View className="flex-row items-center justify-center mb-6">
            <Image source={logo} className="w-10 h-8" />
            <Text className="text-2xl font-bold text-white ml-3">
              <Text className="text-primary-400">Vibes TV</Text>
            </Text>
          </View>

          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search movies, shows..."
          />
        </Animated.View>

        {/* Trending Section */}
        <View className="mb-8">
          <Animated.View
            className="px-6 mb-4"
            entering={FadeInUp.delay(200).springify()}
          >
            <View className="flex-row items-center">
              <View className="bg-primary-500/20 p-2 rounded-xl mr-3">
                <TrendingUp size={20} color="#ec4899" />
              </View>
              <Text className="text-xl font-bold text-white">Trending Now</Text>
              <Sparkles size={16} color="#ec4899" className="ml-2" />
            </View>
            <Text className="text-secondary-400 text-sm mt-1">
              What everyone's watching
            </Text>
          </Animated.View>

          {trendingLoading ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              data={[1, 2, 3]}
              renderItem={() => <TrendingCardSkeleton />}
              keyExtractor={(item) => item.toString()}
            />
          ) : trendingError ? (
            <View className="px-6">
              <Text className="text-red-400 text-center">
                Failed to load trending movies
              </Text>
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
            />
          )}
        </View>

        {/* Latest Movies Section */}
        <View className="px-6">
          <Animated.View
            className="mb-4"
            entering={FadeInUp.delay(300).springify()}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xl font-bold text-white">
                  Latest Movies
                </Text>
                <Text className="text-secondary-400 text-sm mt-1">
                  Fresh releases just for you
                </Text>
              </View>
              <View className="bg-secondary-700 px-3 py-1 rounded-full">
                <Text className="text-primary-400 text-xs font-semibold">
                  NEW
                </Text>
              </View>
            </View>
          </Animated.View>

          {moviesLoading ? (
            <View className="flex-row flex-wrap justify-between">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <View key={item} className="w-[30%] mb-6">
                  <MovieCardSkeleton />
                </View>
              ))}
            </View>
          ) : moviesError ? (
            <Text className="text-red-400 text-center">
              Failed to load movies
            </Text>
          ) : (
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 24,
              }}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
