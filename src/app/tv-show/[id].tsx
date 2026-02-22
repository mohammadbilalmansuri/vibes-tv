import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ScreenView } from "@/components/root";
import {
  DetailHero,
  VideoPlayer,
  TabNavigator,
  SeasonEpisodes,
} from "@/components/detail";

import { Skeleton } from "@/components/ui";
import { useTVShowDetails } from "@/hooks";
import getImageUrl from "@/utils/getImageUrl";
import type {
  Video,
  Episode,
  Creator,
  ProductionCompany,
  SpokenLanguage,
  Season,
} from "@/types";

export default function TVShowDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tvShowId = parseInt(id || "0");
  const [, setActiveTab] = useState("episodes");

  const [detail, videos] = useTVShowDetails(tvShowId);

  const handlePlayPress = () => {
    // In a real app, this would launch the latest episode or resume watching
    Alert.alert(
      "Play Show",
      `Would start playing "${detail.data?.name}" here.\n\nIn a real streaming app, this would resume watching or play the latest episode.`,
      [{ text: "OK" }]
    );
  };

  const handleWatchlistPress = () => {
    Alert.alert(
      "Add to Watchlist",
      `Added "${detail.data?.name}" to your watchlist!`,
      [{ text: "OK" }]
    );
  };

  const handleSharePress = async () => {
    if (!detail.data) return;

    try {
      await Share.share({
        message: `Check out "${detail.data.name}" on Vibes TV!`,
        title: detail.data.name,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleVideoPress = (video: Video) => {
    // VideoPlayer component handles opening YouTube videos automatically
    console.log("Video selected:", video.name, video.type);
  };

  const handleEpisodePress = (episode: Episode) => {
    Alert.alert(
      "Play Episode",
      `Would play "${episode.name}" (S${episode.season_number}E${episode.episode_number}) here.\n\nIn a real streaming app, this would launch the episode player.`,
      [{ text: "OK" }]
    );
  };

  if (detail.isLoading) {
    return (
      <ScreenView>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Skeleton */}
          <View style={{ height: 400 }}>
            <Skeleton className="w-full h-full" />
          </View>

          {/* Tab Skeleton */}
          <View className="flex-row p-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="flex-1 h-12 rounded mr-2" />
            ))}
          </View>

          {/* Content Skeletons */}
          <View className="p-4">
            <View className="flex-row flex-wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <View key={i} className="w-1/2 p-2">
                  <Skeleton className="w-full aspect-video rounded-xl mb-2" />
                  <Skeleton className="w-3/4 h-4 rounded mb-1" />
                  <Skeleton className="w-1/2 h-3 rounded" />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ScreenView>
    );
  }

  if (detail.isError || videos.isError || !detail.data) {
    return (
      <ScreenView>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-400 text-xl font-bold mb-2">
            Failed to load TV show
          </Text>
          <Text className="text-white/60 text-center mb-4">
            {detail.error?.message ||
              videos.error?.message ||
              "Something went wrong"}
          </Text>
          <Text
            className="text-blue-400 text-base"
            onPress={() => router.back()}
          >
            ← Go Back
          </Text>
        </View>
      </ScreenView>
    );
  }

  const tvShow = detail.data;
  const tvVideos = videos.data?.results || [];

  // More Info Tab Content
  const MoreInfoTab = () => (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* Show Info */}
      <View className="py-6">
        {/* Network & Creator Info */}
        {(tvShow.networks.length > 0 || tvShow.created_by.length > 0) && (
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">
              Show Details
            </Text>
            <View className="bg-zinc-900 p-4 rounded-xl">
              {tvShow.networks.length > 0 && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Network:</Text>
                  <Text className="text-white font-semibold">
                    {tvShow.networks[0].name}
                  </Text>
                </View>
              )}

              {tvShow.created_by.length > 0 && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-white/60">Created By:</Text>
                  <Text className="text-white font-semibold text-right flex-1 ml-4">
                    {tvShow.created_by
                      .map((creator: Creator) => creator.name)
                      .join(", ")}
                  </Text>
                </View>
              )}

              <View className="flex-row justify-between mb-2">
                <Text className="text-white/60">Seasons:</Text>
                <Text className="text-white font-semibold">
                  {tvShow.number_of_seasons}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-white/60">Episodes:</Text>
                <Text className="text-white font-semibold">
                  {tvShow.number_of_episodes}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Production Info */}
        {tvShow.production_companies.length > 0 && (
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">
              Production
            </Text>
            <View className="flex-row flex-wrap">
              {tvShow.production_companies
                .slice(0, 3)
                .map((company: ProductionCompany, index: number) => (
                  <View key={company.id} className="mr-3 mb-2">
                    <Text className="text-white/60 text-sm">
                      {company.name}
                      {index <
                      tvShow.production_companies.slice(0, 3).length - 1
                        ? " • "
                        : ""}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {tvShow.spoken_languages.length > 0 && (
          <View className="mb-6">
            <Text className="text-white text-lg font-bold mb-3">Languages</Text>
            <View className="flex-row flex-wrap">
              {tvShow.spoken_languages.map((language: SpokenLanguage) => (
                <View
                  key={language.iso_639_1}
                  className="bg-zinc-900 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-white/80 text-sm">
                    {language.english_name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Videos */}
        <VideoPlayer
          videos={tvVideos}
          isLoading={videos.isLoading}
          onVideoPress={handleVideoPress}
        />
      </View>
    </ScrollView>
  );

  // Seasons Overview Tab Content
  const SeasonsTab = () => (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      <View className="py-6">
        <Text className="text-white text-lg font-bold mb-4">
          All Seasons ({tvShow.seasons.length})
        </Text>

        {tvShow.seasons
          .filter((season: Season) => season.season_number >= 0) // Include specials (season 0)
          .sort((a: Season, b: Season) => b.season_number - a.season_number) // Latest first
          .map((season: Season) => (
            <TouchableOpacity
              key={season.id}
              className="bg-zinc-900 p-4 rounded-xl mb-3"
              onPress={() => setActiveTab("episodes")} // Switch to episodes tab
            >
              <View className="flex-row">
                {season.poster_path && (
                  <View className="mr-4">
                    <Image
                      source={{ uri: getImageUrl(season.poster_path, "w185") }}
                      style={{ width: 60, height: 90 }}
                      className="rounded-lg"
                      contentFit="cover"
                    />
                  </View>
                )}

                <View className="flex-1">
                  <Text className="text-white text-base font-bold mb-1">
                    {season.season_number === 0
                      ? "Specials"
                      : `Season ${season.season_number}`}
                  </Text>

                  <Text className="text-white/60 text-sm mb-2">
                    {season.episode_count} episodes
                    {season.air_date &&
                      ` • ${new Date(season.air_date).getFullYear()}`}
                  </Text>

                  {season.overview && (
                    <Text className="text-white/80 text-sm" numberOfLines={3}>
                      {season.overview}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );

  const tabs = [
    {
      key: "episodes",
      title: "Episodes",
      content: (
        <SeasonEpisodes
          tvShowId={tvShowId}
          seasons={tvShow.seasons}
          onEpisodePress={handleEpisodePress}
        />
      ),
    },
    {
      key: "seasons",
      title: "Seasons",
      content: <SeasonsTab />,
    },
    {
      key: "more",
      title: "More Info",
      content: <MoreInfoTab />,
    },
  ];

  return (
    <ScreenView inSafeArea={false}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // Make tabs sticky
      >
        {/* Hero Section */}
        <DetailHero
          title={tvShow.name}
          backdropPath={tvShow.backdrop_path || undefined}
          posterPath={tvShow.poster_path || undefined}
          overview={tvShow.overview}
          rating={tvShow.vote_average}
          releaseDate={tvShow.first_air_date}
          genres={tvShow.genres}
          contentType="tv"
          tagline={tvShow.tagline}
          status={tvShow.status}
          onPlayPress={handlePlayPress}
          onWatchlistPress={handleWatchlistPress}
          onSharePress={handleSharePress}
        />

        {/* Tabs Section */}
        <View style={{ minHeight: 600 }}>
          <TabNavigator
            tabs={tabs}
            initialTab="episodes"
            onTabChange={setActiveTab}
            sticky={true}
          />
        </View>
      </ScrollView>
    </ScreenView>
  );
}
