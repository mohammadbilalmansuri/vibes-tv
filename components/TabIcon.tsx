import { Image, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden bg-gradient-to-r from-base-200 to-base-300">
        <Image
          source={icon}
          tintColor="var(--color-base-600)"
          className="size-5"
        />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image
        source={icon}
        tintColor="var(--color-base-100)"
        className="size-5"
      />
    </View>
  );
};

export default TabIcon;
