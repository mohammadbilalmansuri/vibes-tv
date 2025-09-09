import React from "react";
import { View, Text } from "react-native";
import { WifiOff } from "lucide-react-native";
import { DEFAULT_COLORS } from "@/constants";

const OfflineScreen = () => {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <WifiOff size={48} color={DEFAULT_COLORS.accent} />
      <Text className="text-xl font-semibold text-default-50">
        You’re Offline
      </Text>
      <Text className="text-default-200 text-center">
        Please check your internet connection.
      </Text>
    </View>
  );
};

export default OfflineScreen;
