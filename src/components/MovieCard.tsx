import { Movie } from "@/types";
import { Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="w-32 mr-3"
      >
        <View className="relative">
          {/* Movie Poster */}
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/600x900/1a1a1f/0ea5e9.png",
            }}
            className="w-full h-48 rounded-xl bg-neutral-800"
            resizeMode="cover"
          />

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <View className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex-row items-center">
              <Star size={10} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-xs text-white font-semibold ml-1">
                {movie.vote_average.toFixed(1)}
              </Text>
            </View>
          )}

          {/* Gradient overlay for better text readability */}
          <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl" />
        </View>

        {/* Movie Info */}
        <View className="mt-2 px-1">
          <Text
            className="text-sm font-semibold text-white leading-4"
            numberOfLines={2}
          >
            {movie.title}
          </Text>

          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-xs text-neutral-400 font-medium">
              {movie.release_date?.split("-")[0] || "TBA"}
            </Text>
            <View className="bg-primary-500/20 px-2 py-1 rounded-md">
              <Text className="text-xs font-semibold text-primary-300 uppercase">
                Movie
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default MovieCard;
