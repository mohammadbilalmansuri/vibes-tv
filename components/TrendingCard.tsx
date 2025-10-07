import { Link } from "expo-router";
import { Crown, TrendingUp } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    rotateY.value = withSpring(5, { damping: 20, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    rotateY.value = withSpring(0, { damping: 20, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { perspective: 1000 },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  const getRankColor = (position: number) => {
    switch (position) {
      case 0:
        return "#fbbf24"; // Gold
      case 1:
        return "#e5e7eb"; // Silver
      case 2:
        return "#f97316"; // Bronze
      default:
        return "#ec4899"; // Primary
    }
  };

  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-48 relative mr-6"
      >
        <Animated.View
          style={animatedStyle}
          entering={FadeInDown.delay(index * 100).springify()}
        >
          <View className="relative">
            <Image
              source={{ uri: poster_url }}
              className="w-48 h-72 rounded-3xl bg-secondary-800"
              resizeMode="cover"
            />

            {/* Trending Badge */}
            <View className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-2xl px-3 py-2 flex-row items-center">
              <Crown
                size={16}
                color={getRankColor(index)}
                fill={getRankColor(index)}
              />
              <Text className="text-xs font-bold text-white ml-1">
                #{index + 1}
              </Text>
            </View>

            {/* Trending Icon */}
            <View className="absolute top-3 right-3 bg-primary-500/90 backdrop-blur-sm rounded-full p-2">
              <TrendingUp size={16} color="white" />
            </View>

            {/* Gradient Overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-3xl" />

            {/* Title Overlay */}
            <View className="absolute bottom-0 left-0 right-0 p-4">
              <Text
                className="text-lg font-bold text-white leading-6 drop-shadow-lg"
                numberOfLines={2}
              >
                {title}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-primary-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Text className="text-xs font-semibold text-primary-100 uppercase">
                    Trending
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

export default TrendingCard;
