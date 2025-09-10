import React from "react";
import { View, Text } from "react-native";
import { WifiOff } from "lucide-react-native";
import { DEFAULT_COLORS } from "@/constants";

const OfflineScreen = () => {
  return (
    <View className="flex-1 items-center justify-center gap-6 p-4">
      <WifiOff size={48} color={DEFAULT_COLORS.accent} strokeWidth={1.5} />
      <Text className="text-xl font-semibold text-default-50 text-center">
        You’re Offline
      </Text>
      <Text className="text-default-500 text-center -mt-3">
        Please check your internet connection.
      </Text>
    </View>
  );
};

export default OfflineScreen;
