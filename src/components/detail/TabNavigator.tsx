import { useState, useEffect, ReactNode } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Tab {
  key: string;
  title: string;
  content: ReactNode;
}

interface TabNavigatorProps {
  tabs: Tab[];
  initialTab?: string;
  onTabChange?: (tabKey: string) => void;
  sticky?: boolean;
}

const TabNavigator = ({
  tabs,
  initialTab,
  onTabChange,
  sticky = false,
}: TabNavigatorProps) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.key || "");
  const indicatorPosition = useSharedValue(0);
  const tabWidth = SCREEN_WIDTH / tabs.length;

  const handleTabPress = (tabKey: string, index: number) => {
    setActiveTab(tabKey);
    indicatorPosition.value = withSpring(index * tabWidth);
    onTabChange?.(tabKey);
  };

  const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const TabBar = () => (
    <View
      className={`bg-black/95 border-b border-white/10 ${sticky ? "sticky top-0 z-10" : ""}`}
    >
      <View className="flex-row">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => handleTabPress(tab.key, index)}
            className="flex-1 py-4 px-2 items-center justify-center"
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === tab.key ? "text-white" : "text-white/60"
              }`}
              numberOfLines={1}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={[{ width: tabWidth }, indicatorStyle]}
        className="bg-white h-0.5 absolute bottom-0"
      />
    </View>
  );

  useEffect(() => {
    const initialIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (initialIndex !== -1) {
      indicatorPosition.value = initialIndex * tabWidth;
    }
  }, [activeTab, tabWidth, tabs, indicatorPosition]);

  return (
    <View className="flex-1">
      <TabBar />
      <View className="flex-1">{activeTabContent}</View>
    </View>
  );
};

export default TabNavigator;
