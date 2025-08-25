import { Movie, TVShow } from "@/types";
import { Crown, TrendingUp } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TrendingCardProps {
  item: Movie | TVShow;
  index?: number;
  onPress: () => void;
}

const TrendingCard = ({ item, index = 0, onPress }: TrendingCardProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(0.8, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getRankColor = (position: number) => {
    switch (position) {
      case 0:
        return "#fbbf24"; // Gold
      case 1:
        return "#e5e7eb"; // Silver
      case 2:
        return "#f59e0b"; // Bronze
      default:
        return "#0ea5e9"; // Primary blue
    }
  };

  // Get title based on item type
  const title = "title" in item ? item.title : item.name;
  const posterPath = item.poster_path;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className="w-44 mr-4"
      >
        <View className="relative">
          {/* Main Image */}
          <Image
            source={{
              uri: posterPath
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : "https://placehold.co/600x900/1a1a1f/0ea5e9.png",
            }}
            className="w-44 h-64 rounded-2xl bg-neutral-800"
            resizeMode="cover"
          />

          {/* Rank Badge */}
          <View className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-xl px-2 py-1 flex-row items-center">
            <Crown
              size={14}
              color={getRankColor(index)}
              fill={getRankColor(index)}
            />
            <Text className="text-xs font-bold text-white ml-1">
              #{index + 1}
            </Text>
          </View>

          {/* Trending Badge */}
          <View className="absolute top-3 right-3 bg-primary-500/90 backdrop-blur-sm rounded-full p-2">
            <TrendingUp size={14} color="white" />
          </View>

          {/* Gradient Overlay */}
          <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl" />

          {/* Title */}
          <View className="absolute bottom-0 left-0 right-0 p-3">
            <Text
              className="text-sm font-bold text-white leading-5"
              numberOfLines={2}
            >
              {title}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="bg-primary-500/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                <Text className="text-xs font-semibold text-primary-300 uppercase">
                  Trending
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default TrendingCard;
