import React from "react";
import { View, Text } from "react-native";
import { WifiOff } from "lucide-react-native";
import { COLORS } from "@/constants";
import ScreenView from "./ScreenView";

const OfflineScreen = () => {
  return (
    <ScreenView className="items-center justify-center gap-5 p-5">
      <View className="bg-shark-secondary p-4 rounded-full">
        <WifiOff size={28} color={COLORS.yellow} />
      </View>
      <Text className="text-xl font-semibold text-white text-center">
        You’re Offline
      </Text>
      <Text className="text-white/60 text-center -mt-2">
        Please check your internet connection.
      </Text>
    </ScreenView>
  );
};

export default OfflineScreen;
