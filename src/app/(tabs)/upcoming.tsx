import { MovieCard, Skeleton, TVCard } from "@/components";
import { useTVShowsOnTheAir, useUpcomingMovies } from "@/hooks";
import { Movie, TVShow } from "@/types";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Calendar, PlayCircle } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function UpcomingScreen() {
  const router = useRouter();

  const {
    data: upcomingMovies,
    fetchNextPage: fetchNextUpcomingMovies,
    hasNextPage: hasNextUpcomingMovies,
    isFetchingNextPage: isFetchingNextUpcomingMovies,
    isLoading: isLoadingUpcomingMovies,
    refetch: refetchUpcomingMovies,
  } = useUpcomingMovies();

  const {
    data: onAirTVShows,
    fetchNextPage: fetchNextOnAirTV,
    hasNextPage: hasNextOnAirTV,
    isFetchingNextPage: isFetchingNextOnAirTV,
    isLoading: isLoadingOnAirTV,
    refetch: refetchOnAirTV,
  } = useTVShowsOnTheAir();

  const handleRefresh = async () => {
    await Promise.all([refetchUpcomingMovies(), refetchOnAirTV()]);
  };

  const isRefreshing = isLoadingUpcomingMovies || isLoadingOnAirTV;

  const handleMoviePress = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const handleTVPress = (id: number) => {
    router.push(`/movie/${id}`);
  };

  // Flatten all pages into single arrays
  const allUpcomingMovies =
    upcomingMovies?.pages.flatMap((page) => page.results) || [];
  const allOnAirTVShows =
    onAirTVShows?.pages.flatMap((page) => page.results) || [];

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <View className="w-1/2 px-2 mb-4">
      <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} />
    </View>
  );

  const renderTVItem = ({ item }: { item: TVShow }) => (
    <View className="w-1/2 px-2 mb-4">
      <TVCard tvShow={item} onPress={() => handleTVPress(item.id)} />
    </View>
  );

  const renderMovieFooter = () => {
    if (!isFetchingNextUpcomingMovies) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  };

  const renderTVFooter = () => {
    if (!isFetchingNextOnAirTV) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  };

  const LoadingSkeleton = () => (
    <View className="flex-row flex-wrap px-4">
      {[...Array(6)].map((_, index) => (
        <View key={index} className="w-1/2 px-2 mb-4">
          <Skeleton width={160} height={240} />
        </View>
      ))}
    </View>
  );

  const SectionHeader = ({
    title,
    icon,
    subtitle,
  }: {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
  }) => (
    <View className="px-6 mb-5">
      <View className="flex-row items-center mb-2">
        <View className="mr-3">{icon}</View>
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>
      <Text className="text-neutral-400 text-base">{subtitle}</Text>
    </View>
  );

  const loadMoreMovies = () => {
    if (hasNextUpcomingMovies && !isFetchingNextUpcomingMovies) {
      fetchNextUpcomingMovies();
    }
  };

  const loadMoreTV = () => {
    if (hasNextOnAirTV && !isFetchingNextOnAirTV) {
      fetchNextOnAirTV();
    }
  };

  return (
    <View className="flex-1 bg-neutral-950">
      <StatusBar style="light" />

      <ScrollView
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
          <Text className="text-white text-4xl font-bold mb-2">Upcoming</Text>
          <Text className="text-neutral-400 text-lg">
            Coming soon to theaters and streaming platforms
          </Text>
        </View>

        {/* Upcoming Movies Section */}
        <SectionHeader
          title="Upcoming Movies"
          icon={<Calendar size={24} color="#0ea5e9" />}
          subtitle="New releases hitting theaters soon"
        />

        {isLoadingUpcomingMovies ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={allUpcomingMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => `upcoming-movie-${item.id}`}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderMovieFooter}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        )}

        <View className="h-8" />

        {/* On Air TV Shows Section */}
        <SectionHeader
          title="Currently Airing"
          icon={<PlayCircle size={24} color="#10b981" />}
          subtitle="TV shows with new episodes this season"
        />

        {isLoadingOnAirTV ? (
          <LoadingSkeleton />
        ) : (
          <FlatList
            data={allOnAirTVShows}
            renderItem={renderTVItem}
            keyExtractor={(item) => `on-air-tv-${item.id}`}
            numColumns={2}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
            onEndReached={loadMoreTV}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderTVFooter}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        )}
      </ScrollView>
    </View>
  );
}
