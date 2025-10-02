import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Tab {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabNavigatorProps {
  tabs: Tab[];
  initialTab?: string;
  onTabChange?: (tabKey: string) => void;
  sticky?: boolean; // Whether tabs stick to top when scrolling
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
      className={`bg-black/95 ${sticky ? "sticky top-0 z-10" : ""}`}
      style={styles.tabBar}
    >
      {/* Tab Buttons */}
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

      {/* Animated Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
          },
          indicatorStyle,
        ]}
        className="bg-white h-0.5"
      />
    </View>
  );

  // Initialize indicator position
  React.useEffect(() => {
    const initialIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (initialIndex !== -1) {
      indicatorPosition.value = initialIndex * tabWidth;
    }
  }, [activeTab, tabWidth, tabs, indicatorPosition]);

  return (
    <View className="flex-1">
      <TabBar />

      {/* Tab Content */}
      <View className="flex-1">{activeTabContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
  },
});

export default TabNavigator;
