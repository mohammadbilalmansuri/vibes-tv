import { Link } from "expo-router";
import { Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    opacity.value = withSpring(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    opacity.value = withSpring(1, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Link href={`/movie/${id}`} asChild>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-[30%]"
      >
        <Animated.View style={animatedStyle}>
          <View className="relative">
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "https://placehold.co/600x400/1f2937/ec4899.png",
              }}
              className="w-full h-52 rounded-2xl bg-secondary-800"
              resizeMode="cover"
            />

            {/* Rating Badge */}
            <View className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex-row items-center">
              <Star size={12} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-xs text-white font-semibold ml-1">
                {(vote_average / 2).toFixed(1)}
              </Text>
            </View>

            {/* Gradient Overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl" />
          </View>

          <View className="mt-3 px-1">
            <Text
              className="text-sm font-bold text-white leading-5"
              numberOfLines={2}
            >
              {title}
            </Text>

            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-xs text-secondary-400 font-medium">
                {release_date?.split("-")[0] || "TBA"}
              </Text>
              <View className="bg-primary-500/20 px-2 py-1 rounded-md">
                <Text className="text-xs font-semibold text-primary-400 uppercase">
                  Movie
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

export default MovieCard;
