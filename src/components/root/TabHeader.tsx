import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { DEFAULT_COLORS } from "@/constants";
import Logo from "../Logo";

const TabHeader = () => {
  const router = useRouter();

  const handleSearchPress = () => router.push("/search");

  return (
    <View className="px-5 py-2 flex-row justify-between items-center bg-default-950">
      <Logo />
      <TouchableOpacity
        onPress={handleSearchPress}
        className="p-2 justify-center items-center bg-default-800 rounded-full"
        activeOpacity={0.5}
      >
        <Search size={16} color={DEFAULT_COLORS[300]} />
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
