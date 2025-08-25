import { Search } from "lucide-react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnimation = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnimation.value = withSpring(1, {
      damping: 20,
      stiffness: 300,
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnimation.value = withSpring(0, {
      damping: 20,
      stiffness: 300,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnimation.value,
      [0, 1],
      ["#374151", "#ec4899"] // secondary-700 to primary-500
    );

    return {
      borderColor,
      transform: [
        {
          scale: focusAnimation.value * 0.02 + 1,
        },
      ],
    };
  });

  return (
    <Animated.View
      className="flex-row items-center bg-secondary-800 rounded-2xl px-5 py-4 border-2"
      style={animatedStyle}
    >
      <Search
        size={20}
        color={isFocused ? "#ec4899" : "#9ca3af"}
        className="transition-colors duration-200"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex-1 ml-3 text-white text-base font-medium"
        placeholderTextColor="#6b7280"
        selectionColor="#ec4899"
        cursorColor="#ec4899"
      />
    </Animated.View>
  );
};

export default SearchBar;
