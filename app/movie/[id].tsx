import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Award,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Play,
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
import { useFetch } from "@/hooks";
import { getMovieDetails } from "@/services/api";
import getImageUrl from "@/utils/getImageUrl";

const { width } = Dimensions.get("window");

interface MovieInfoProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ icon, label, value }: MovieInfoProps) => (
  <Animated.View
    className="bg-secondary-800 rounded-2xl p-4 border border-secondary-700"
    entering={FadeInUp.springify()}
  >
    <View className="flex-row items-center mb-2">
      <View className="bg-primary-500/20 p-2 rounded-lg mr-3">{icon}</View>
      <Text className="text-secondary-300 font-medium text-sm">{label}</Text>
    </View>
    <Text className="text-white font-bold text-base leading-6">
      {value || "Not available"}
    </Text>
  </Animated.View>
);

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scale = useSharedValue(1);

  const { data: movie, isLoading } = useFetch(() =>
    getMovieDetails(id as string)
  );

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  const formatBudget = (budget: number) => {
    if (budget >= 1000000) {
      return `$${(budget / 1000000).toFixed(1)}M`;
    }
    return `$${(budget / 1000).toFixed(0)}K`;
  };

  return (
    <SafeAreaView className="bg-secondary-950 flex-1" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={{ uri: getImageUrl(movie?.backdrop_path ?? "") }}
            style={{ width, height: width * 0.6 }}
            className="bg-secondary-800"
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary-950 via-secondary-950/80 to-transparent" />

          {/* Back Button */}
          <TouchableOpacity
            onPress={router.back}
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-3"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Play Button */}
          <TouchableOpacity className="absolute bottom-6 right-6 bg-primary-500 rounded-full p-4 shadow-lg">
            <Play size={24} color="white" fill="white" />
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-8">
          {/* Title Section */}
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <Text className="text-3xl font-bold text-white leading-10 mb-3">
              {movie?.title}
            </Text>

            <View className="flex-row items-center flex-wrap gap-3 mb-4">
              <View className="flex-row items-center bg-secondary-800 px-3 py-2 rounded-full">
                <Calendar size={14} color="#ec4899" />
                <Text className="text-secondary-300 text-sm font-medium ml-2">
                  {movie?.release_date?.split("-")[0] || "TBA"}
                </Text>
              </View>

              <View className="flex-row items-center bg-secondary-800 px-3 py-2 rounded-full">
                <Clock size={14} color="#ec4899" />
                <Text className="text-secondary-300 text-sm font-medium ml-2">
                  {movie?.runtime}min
                </Text>
              </View>

              <View className="flex-row items-center bg-amber-500/20 px-3 py-2 rounded-full">
                <Star size={14} color="#fbbf24" fill="#fbbf24" />
                <Text className="text-amber-400 text-sm font-bold ml-2">
                  {movie?.vote_average
                    ? (movie.vote_average / 2).toFixed(1)
                    : "0.0"}
                  /5
                </Text>
                <Text className="text-secondary-400 text-sm ml-1">
                  ({movie?.vote_count || 0})
                </Text>
              </View>
            </View>

            {/* Genres */}
            <View className="flex-row flex-wrap gap-2 mb-6">
              {movie?.genres?.map((genre, index) => (
                <View
                  key={genre.id}
                  className="bg-primary-500/20 border border-primary-500/30 px-3 py-2 rounded-full"
                >
                  <Text className="text-primary-300 text-xs font-semibold">
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
            <Text className="text-secondary-300 text-base leading-7">
              {movie?.overview || "No overview available."}
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
                  icon={<DollarSign size={16} color="#ec4899" />}
                  label="Budget"
                  value={movie?.budget ? formatBudget(movie.budget) : "N/A"}
                />
              </View>
              <View className="flex-1">
                <MovieInfo
                  icon={<Award size={16} color="#ec4899" />}
                  label="Revenue"
                  value={movie?.revenue ? formatBudget(movie.revenue) : "N/A"}
                />
              </View>
            </View>

            <MovieInfo
              icon={<Building size={16} color="#ec4899" />}
              label="Production Companies"
              value={
                movie?.production_companies?.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />

            <MovieInfo
              icon={<Users size={16} color="#ec4899" />}
              label="Production Countries"
              value={
                movie?.production_countries?.map((c) => c.name).join(", ") ||
                "N/A"
              }
            />
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
          className="bg-primary-500 rounded-2xl py-4 flex-row items-center justify-center shadow-lg"
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
