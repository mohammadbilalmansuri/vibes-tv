import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { COLORS } from "@/constants";
import Logo from "../ui/Logo";

const TabHeader = () => {
  const router = useRouter();

  const handleSearchPress = () => router.push("/search");

  return (
    <View className="px-5 py-2 flex-row justify-between items-center bg-shark-primary">
      <Logo />
      <TouchableOpacity
        onPress={handleSearchPress}
        className="p-2 justify-center items-center bg-shark-tertiary rounded-full"
        activeOpacity={0.6}
      >
        <Search size={16} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;
