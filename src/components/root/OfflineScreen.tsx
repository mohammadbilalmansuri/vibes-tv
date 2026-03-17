import { View, Text } from "react-native";
import { WifiOff } from "lucide-react-native";
import { COLORS } from "@/constants";
import ScreenView from "./ScreenView";

const OfflineScreen = () => (
  <ScreenView className="items-center justify-center gap-6 px-8">
    <View className="bg-shark-secondary p-5 rounded-full">
      <WifiOff size={40} color={COLORS.yellow} strokeWidth={1.5} />
    </View>
    <View className="items-center gap-2">
      <Text className="text-2xl font-bold text-white text-center">
        You&apos;re Offline
      </Text>
      <Text className="text-white/60 text-center leading-6">
        Please check your internet connection.
      </Text>
    </View>
  </ScreenView>
);

export default OfflineScreen;
