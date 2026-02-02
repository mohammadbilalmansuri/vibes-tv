import React from "react";
import { View, Text } from "react-native";
import { WifiOff } from "lucide-react-native";
import { COLORS } from "@/constants";

const OfflineScreen = () => {
  return (
    <View className="flex-1 items-center justify-center gap-5 p-5">
      <View className="bg-shark-secondary p-4 rounded-full">
        <WifiOff size={28} color={COLORS.yellow} strokeWidth={2} />
      </View>
      <Text className="text-xl font-semibold text-white text-center">
        You’re Offline
      </Text>
      <Text className="text-white/60 text-center -mt-3">
        Please check your internet connection.
      </Text>
    </View>
  );
};

export default OfflineScreen;
