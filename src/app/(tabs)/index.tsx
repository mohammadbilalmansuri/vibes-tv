import { MovieCard, Skeleton, TVCard, TrendingCard } from "@/components";
import {
  useLatestMovies,
  useLatestTVShows,
  usePopularMovies,
  usePopularTVShows,
  useTrendingMovies,
  useTrendingTVShows,
} from "@/hooks";
import { Movie, TVShow } from "@/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronRight, Clock, Star, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  // Fetch data using React Query hooks
  const {
    data: latestMovies,
    fetchNextPage: fetchNextLatestMovies,
    hasNextPage: hasNextLatestMovies,
    isFetchingNextPage: isFetchingNextLatestMovies,
    isLoading: isLoadingLatestMovies,
    refetch: refetchLatestMovies,
  } = useLatestMovies();

  const {
    data: popularMovies,
    fetchNextPage: fetchNextPopularMovies,
    hasNextPage: hasNextPopularMovies,
    isFetchingNextPage: isFetchingNextPopularMovies,
    isLoading: isLoadingPopularMovies,
    refetch: refetchPopularMovies,
  } = usePopularMovies();

  const {
    data: trendingMoviesData,
    isLoading: isLoadingTrendingMovies,
    refetch: refetchTrendingMovies,
  } = useTrendingMovies();

  const {
    data: latestTVShows,
    isLoading: isLoadingLatestTV,
    refetch: refetchLatestTV,
  } = useLatestTVShows();

  const {
    data: popularTVShows,
    isLoading: isLoadingPopularTV,
    refetch: refetchPopularTV,
  } = usePopularTVShows();

  const {
    data: trendingTVData,
    isLoading: isLoadingTrendingTV,
    refetch: refetchTrendingTV,
  } = useTrendingTVShows();

  // Handle refresh
  const handleRefresh = async () => {
    await Promise.all([
      refetchLatestMovies(),
      refetchPopularMovies(),
      refetchTrendingMovies(),
      refetchLatestTV(),
      refetchPopularTV(),
      refetchTrendingTV(),
    ]);
  };

  const isRefreshing =
    isLoadingLatestMovies ||
    isLoadingPopularMovies ||
    isLoadingTrendingMovies ||
    isLoadingLatestTV ||
    isLoadingPopularTV ||
    isLoadingTrendingTV;

  // Get first page data
  const latestMoviesData = latestMovies?.pages[0]?.results || [];
  const popularMoviesData = popularMovies?.pages[0]?.results || [];
  const trendingMovies = trendingMoviesData?.results || [];
  const latestTVData = latestTVShows?.pages[0]?.results || [];
  const popularTVData = popularTVShows?.pages[0]?.results || [];
  const trendingTV = trendingTVData?.results || [];

  const handleMoviePress = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const handleTVPress = (id: number) => {
    // For now, route to movie detail page, you can create a separate TV detail page later
    router.push(`/movie/${id}`);
  };

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => (
    <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} />
  );

  const renderTVItem = ({ item, index }: { item: TVShow; index: number }) => (
    <TVCard tvShow={item} onPress={() => handleTVPress(item.id)} />
  );

  const renderTrendingItem = ({
    item,
    index,
  }: {
    item: Movie | TVShow;
    index: number;
  }) => (
    <TrendingCard
      item={item}
      index={index}
      onPress={() => handleMoviePress(item.id)}
    />
  );

  const SectionHeader = ({
    title,
    icon,
    onSeeAll,
  }: {
    title: string;
    icon?: React.ReactNode;
    onSeeAll?: () => void;
  }) => (
    <View className="flex-row items-center justify-between px-6 mb-5">
      <View className="flex-row items-center">
        {icon && <View className="mr-3">{icon}</View>}
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>
      {onSeeAll && (
        <TouchableOpacity
          onPress={onSeeAll}
          className="flex-row items-center bg-primary-500/10 px-3 py-2 rounded-lg"
        >
          <Text className="text-primary-400 text-sm font-semibold mr-1">
            See All
          </Text>
          <ChevronRight size={14} color="#60a5fa" />
        </TouchableOpacity>
      )}
    </View>
  );

  const LoadingSkeleton = () => (
    <View className="px-6">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[...Array(5)].map((_, index) => (
          <View key={index} className="mr-4">
            <Skeleton width={128} height={192} />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#0ea5e9"
            colors={["#0ea5e9"]}
            progressBackgroundColor="#1a1a1f"
          />
        }
      >
        {/* Header */}
        <View className="px-6 pt-16 pb-8">
          <Text className="text-white text-4xl font-bold mb-2">VibesTV</Text>
          <Text className="text-neutral-400 text-lg">
            Discover amazing movies and TV shows
          </Text>
        </View>

        {/* Trending Movies - Hero Section */}
        <SectionHeader
          title="Trending Now"
          icon={<TrendingUp size={24} color="#0ea5e9" />}
        />
        {isLoadingTrendingMovies ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={trendingMovies.slice(0, 10)}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => `trending-movie-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        )}

        <View className="h-8" />

        {/* Popular Movies */}
        <SectionHeader
          title="Popular Movies"
          icon={<Star size={22} color="#fbbf24" />}
        />
        {isLoadingPopularMovies ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={popularMoviesData.slice(0, 10)}
            renderItem={renderMovieItem}
            keyExtractor={(item) => `popular-movie-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        )}

        <View className="h-8" />

        {/* Latest Movies */}
        <SectionHeader
          title="Latest Movies"
          icon={<Clock size={22} color="#10b981" />}
        />
        {isLoadingLatestMovies ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={latestMoviesData.slice(0, 10)}
            renderItem={renderMovieItem}
            keyExtractor={(item) => `latest-movie-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        )}

        <View className="h-8" />

        {/* Popular TV Shows */}
        <SectionHeader
          title="Popular TV Shows"
          icon={<Star size={22} color="#fbbf24" />}
        />
        {isLoadingPopularTV ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={popularTVData.slice(0, 10)}
            renderItem={renderTVItem}
            keyExtractor={(item) => `popular-tv-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        )}

        <View className="h-8" />

        {/* Latest TV Shows */}
        <SectionHeader
          title="Latest TV Shows"
          icon={<Clock size={22} color="#10b981" />}
        />
        {isLoadingLatestTV ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={latestTVData.slice(0, 10)}
            renderItem={renderTVItem}
            keyExtractor={(item) => `latest-tv-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        )}

        {/* Bottom spacing for tab bar */}
        <View className="h-32" />
      </ScrollView>
    </View>
  );
}
