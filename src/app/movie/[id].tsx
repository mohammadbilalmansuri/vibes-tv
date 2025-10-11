import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Award,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Users,
} from "lucide-react-native";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInUp,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { MovieDetailSkeleton } from "@/components";
import { useMovieDetails } from "@/hooks";
import { getBackdropUrl, getImageUrl } from "@/services/api";

const { width } = Dimensions.get("window");

interface MovieInfoProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ icon, label, value }: MovieInfoProps) => (
  <Animated.View
    className="bg-neutral-800/60 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/50"
    entering={FadeInUp.springify()}
  >
    <View className="flex-row items-center mb-2">
      <View className="bg-primary-500/20 p-2 rounded-lg mr-3">{icon}</View>
      <Text className="text-neutral-400 font-medium text-sm">{label}</Text>
    </View>
    <Text className="text-white font-semibold text-base leading-6">
      {value || "Not available"}
    </Text>
  </Animated.View>
);

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scale = useSharedValue(1);

  const { data: movie, isLoading, error } = useMovieDetails(Number(id));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (error || !movie) {
    return (
      <SafeAreaView
        className="bg-neutral-950 flex-1 justify-center items-center px-6"
        edges={["top"]}
      >
        <View className="bg-neutral-800/50 rounded-2xl p-8 items-center">
          <Text className="text-white text-xl font-bold mb-2">Oops!</Text>
          <Text className="text-neutral-400 text-center mb-6">
            Failed to load movie details
          </Text>
          <TouchableOpacity
            onPress={router.back}
            className="bg-primary-500 px-8 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatBudget = (budget: number) => {
    if (budget >= 1000000000) {
      return `$${(budget / 1000000000).toFixed(1)}B`;
    }
    if (budget >= 1000000) {
      return `$${(budget / 1000000).toFixed(1)}M`;
    }
    return `$${(budget / 1000).toFixed(0)}K`;
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const backdropUrl =
    getBackdropUrl(movie.backdrop_path) || getImageUrl(movie.poster_path);
  const fallbackImage = "https://placehold.co/800x600/1a1a1f/0ea5e9.png";

  return (
    <SafeAreaView className="bg-neutral-950 flex-1" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={{
              uri: backdropUrl || fallbackImage,
            }}
            style={{ width, height: width * 0.65 }}
            className="bg-neutral-800"
            resizeMode="cover"
          />

          {/* Enhanced Gradient Overlay */}
          <View className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/90" />
          <View className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />

          {/* Back Button */}
          <TouchableOpacity
            onPress={router.back}
            className="absolute top-6 left-6 bg-black/60 backdrop-blur-md rounded-full p-3"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Rating Badge */}
          <View className="absolute top-6 right-6 bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 flex-row items-center">
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-white text-sm font-bold ml-1">
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>

        <View className="px-6 pb-8 -mt-12 relative z-10">
          {/* Title Section */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <Text className="text-3xl font-bold text-white leading-10 mb-3">
              {movie.title}
            </Text>

            {movie.tagline && (
              <Text className="text-lg text-primary-300 italic mb-4 font-medium">
                "{movie.tagline}"
              </Text>
            )}

            <View className="flex-row items-center flex-wrap gap-3 mb-6">
              <View className="flex-row items-center bg-neutral-800/70 backdrop-blur-sm px-3 py-2 rounded-full">
                <Calendar size={14} color="#0ea5e9" />
                <Text className="text-neutral-300 text-sm font-medium ml-2">
                  {movie.release_date?.split("-")[0] || "TBA"}
                </Text>
              </View>

              {movie.runtime && (
                <View className="flex-row items-center bg-neutral-800/70 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Clock size={14} color="#0ea5e9" />
                  <Text className="text-neutral-300 text-sm font-medium ml-2">
                    {formatRuntime(movie.runtime)}
                  </Text>
                </View>
              )}

              <View className="flex-row items-center bg-amber-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-amber-500/30">
                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                <Text className="text-amber-400 text-sm font-bold ml-1">
                  {movie.vote_average.toFixed(1)}
                </Text>
                <Text className="text-neutral-400 text-sm ml-1">
                  ({movie.vote_count})
                </Text>
              </View>
            </View>

            {/* Genres */}
            <View className="flex-row flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <View
                  key={genre.id}
                  className="bg-primary-500/20 border border-primary-500/40 px-4 py-2 rounded-full"
                >
                  <Text className="text-primary-300 text-sm font-semibold">
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Overview */}
          <Animated.View
            className="mb-6"
            entering={FadeInUp.delay(300).springify()}
          >
            <Text className="text-xl font-bold text-white mb-3">Overview</Text>
            <Text className="text-neutral-300 text-base leading-7">
              {movie.overview || "No overview available."}
            </Text>
          </Animated.View>

          {/* Movie Details Grid */}
          <Animated.View
            className="gap-4"
            entering={FadeInUp.delay(400).springify()}
          >
            <Text className="text-xl font-bold text-white mb-2">Details</Text>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <MovieInfo
                  icon={<DollarSign size={16} color="#0ea5e9" />}
                  label="Budget"
                  value={movie.budget ? formatBudget(movie.budget) : "N/A"}
                />
              </View>
              <View className="flex-1">
                <MovieInfo
                  icon={<Award size={16} color="#0ea5e9" />}
                  label="Revenue"
                  value={movie.revenue ? formatBudget(movie.revenue) : "N/A"}
                />
              </View>
            </View>

            <MovieInfo
              icon={<Building size={16} color="#0ea5e9" />}
              label="Production Companies"
              value={
                movie.production_companies?.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />

            <MovieInfo
              icon={<Users size={16} color="#0ea5e9" />}
              label="Production Countries"
              value={
                movie.production_countries?.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />

            {movie.status && (
              <MovieInfo
                icon={<Award size={16} color="#0ea5e9" />}
                label="Status"
                value={movie.status}
              />
            )}

            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <MovieInfo
                icon={<Users size={16} color="#0ea5e9" />}
                label="Languages"
                value={movie.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(", ")}
              />
            )}
          </Animated.View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        className="absolute bottom-6 left-6 right-6"
        entering={SlideInDown.delay(500).springify()}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={router.back}
          className="bg-primary-500 rounded-2xl py-4 flex-row items-center justify-center shadow-2xl"
        >
          <Animated.View
            style={animatedButtonStyle}
            className="flex-row items-center"
          >
            <ArrowLeft size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Back to Browse
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
