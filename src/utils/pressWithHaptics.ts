import * as Haptics from "expo-haptics";

const pressWithHaptics = <T>(onPress: () => T | Promise<T>): T | Promise<T> => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  return onPress();
};

export default pressWithHaptics;
