import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ChevronDown, Calendar, Play, Info } from "lucide-react-native";
import { COLORS } from "@/constants";
import { Skeleton } from "@/components/ui";
import EpisodeCard from "./EpisodeCard";
import { useTVSeason } from "@/hooks";
import type { Season, Episode } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SeasonEpisodesProps {
  tvShowId: number;
  seasons: Season[];
  initialSeasonNumber?: number;
  onEpisodePress?: (episode: Episode) => void;
}

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeason: number;
  onSeasonChange: (seasonNumber: number) => void;
}

const SeasonSelector = ({
  seasons,
  selectedSeason,
  onSeasonChange,
}: SeasonSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentSeason = seasons.find((s) => s.season_number === selectedSeason);

  const formatSeasonName = (season: Season) => {
    if (season.season_number === 0) return "Specials";
    return `Season ${season.season_number}`;
  };

  const formatAirDate = (date: string) => {
    if (!date) return "";
    return new Date(date).getFullYear().toString();
  };

  return (
    <View className="mb-4">
      {/* Current Season Button */}
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        className="bg-zinc-900 p-4 rounded-xl flex-row items-center justify-between"
      >
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">
            {currentSeason ? formatSeasonName(currentSeason) : "Select Season"}
          </Text>
          {currentSeason && (
            <View className="flex-row items-center mt-1">
              <Text className="text-white/60 text-sm">
                {currentSeason.episode_count} episodes
              </Text>
              {currentSeason.air_date && (
                <>
                  <Text className="text-white/60 text-sm mx-2">•</Text>
                  <Text className="text-white/60 text-sm">
                    {formatAirDate(currentSeason.air_date)}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
        <ChevronDown
          size={20}
          color={COLORS.white}
          style={{
            transform: [{ rotate: isExpanded ? "180deg" : "0deg" }],
          }}
        />
      </TouchableOpacity>

      {/* Season Dropdown */}
      {isExpanded && (
        <View className="bg-zinc-800 rounded-xl mt-2 overflow-hidden">
          <ScrollView style={{ maxHeight: 300 }}>
            {seasons
              .sort((a, b) => b.season_number - a.season_number) // Latest season first
              .map((season) => (
                <TouchableOpacity
                  key={season.id}
                  onPress={() => {
                    onSeasonChange(season.season_number);
                    setIsExpanded(false);
                  }}
                  className={`p-4 border-b border-white/10 ${
                    selectedSeason === season.season_number ? "bg-white/10" : ""
                  }`}
                >
                  <Text className="text-white font-semibold">
                    {formatSeasonName(season)}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Text className="text-white/60 text-sm">
                      {season.episode_count} episodes
                    </Text>
                    {season.air_date && (
                      <>
                        <Text className="text-white/60 text-sm mx-2">•</Text>
                        <Text className="text-white/60 text-sm">
                          {formatAirDate(season.air_date)}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const SeasonInfo = ({ season }: { season: Season }) => {
  const formatAirDate = (date: string) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View className="bg-zinc-900 p-4 rounded-xl mb-4">
      <View className="flex-row items-center mb-3">
        <Info size={16} color={COLORS.white} />
        <Text className="text-white font-semibold ml-2">
          Season Information
        </Text>
      </View>

      <View className="space-y-2">
        <View className="flex-row items-center">
          <Calendar size={14} color={COLORS.white + "60"} />
          <Text className="text-white/60 text-sm ml-2">
            Aired: {season.air_date ? formatAirDate(season.air_date) : "TBA"}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Play size={14} color={COLORS.white + "60"} />
          <Text className="text-white/60 text-sm ml-2">
            {season.episode_count} Episodes
          </Text>
        </View>
      </View>

      {season.overview && (
        <Text className="text-white/80 text-sm mt-3 leading-5">
          {season.overview}
        </Text>
      )}
    </View>
  );
};

const SeasonEpisodes = ({
  tvShowId,
  seasons,
  initialSeasonNumber,
  onEpisodePress,
}: SeasonEpisodesProps) => {
  // Default to latest season or season 1
  const defaultSeason =
    initialSeasonNumber ||
    Math.max(
      ...seasons.filter((s) => s.season_number > 0).map((s) => s.season_number)
    ) ||
    1;

  const [selectedSeasonNumber, setSelectedSeasonNumber] =
    useState(defaultSeason);

  // Fetch current season data
  const {
    data: seasonData,
    isLoading,
    error,
  } = useTVSeason(tvShowId, selectedSeasonNumber);

  const currentSeason = useMemo(
    () => seasons.find((s) => s.season_number === selectedSeasonNumber),
    [seasons, selectedSeasonNumber]
  );

  const handleEpisodePress = (episode: Episode) => {
    onEpisodePress?.(episode);
  };

  const renderEpisodeItem = ({
    item,
    index,
  }: {
    item: Episode;
    index: number;
  }) => (
    <View style={{ marginRight: index % 2 === 0 ? 16 : 0 }}>
      <EpisodeCard
        episode={item}
        onPress={() => handleEpisodePress(item)}
        showNumber={true}
      />
    </View>
  );

  const renderLoadingSkeleton = () => (
    <View>
      {/* Season info skeleton */}
      <View className="bg-zinc-900 p-4 rounded-xl mb-4">
        <Skeleton className="w-40 h-5 rounded mb-2" />
        <Skeleton className="w-32 h-4 rounded mb-1" />
        <Skeleton className="w-28 h-4 rounded mb-3" />
        <Skeleton className="w-full h-16 rounded" />
      </View>

      {/* Episodes skeleton */}
      <View className="flex-row flex-wrap justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={i}
            className="mb-4"
            style={{ width: (SCREEN_WIDTH - 48) / 2 }}
          >
            <Skeleton
              className="rounded-xl mb-2"
              style={{ height: ((SCREEN_WIDTH - 48) / 2) * (9 / 16) }}
            />
            <Skeleton className="w-3/4 h-4 rounded mb-1" />
            <Skeleton className="w-1/2 h-3 rounded" />
          </View>
        ))}
      </View>
    </View>
  );

  if (!seasons.length) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-white/60 text-center">
          No season information available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
      {/* Season Selector */}
      <SeasonSelector
        seasons={seasons}
        selectedSeason={selectedSeasonNumber}
        onSeasonChange={setSelectedSeasonNumber}
      />

      {isLoading ? (
        renderLoadingSkeleton()
      ) : error ? (
        <View className="bg-zinc-900 p-6 rounded-xl items-center">
          <Text className="text-red-400 text-center font-medium mb-2">
            Failed to load season data
          </Text>
          <Text className="text-white/60 text-center text-sm">
            Please try again later
          </Text>
        </View>
      ) : seasonData && currentSeason ? (
        <>
          {/* Season Information */}
          <SeasonInfo season={currentSeason} />

          {/* Episodes Grid */}
          {seasonData.episodes && seasonData.episodes.length > 0 ? (
            <View>
              <Text className="text-white text-lg font-bold mb-4">
                Episodes ({seasonData.episodes.length})
              </Text>

              <FlatList
                data={seasonData.episodes}
                renderItem={renderEpisodeItem}
                keyExtractor={(item) => `episode-${item.id}`}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </View>
          ) : (
            <View className="bg-zinc-900 p-6 rounded-xl items-center">
              <Play size={32} color={COLORS.white + "30"} />
              <Text className="text-white/60 text-center mt-2">
                No episodes available for this season
              </Text>
            </View>
          )}
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
  },
});

export default SeasonEpisodes;
