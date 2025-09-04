import * as Haptics from "expo-haptics";

export default async function pressWithHaptics(
  onPress: () => void | Promise<void>
) {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {}

  await onPress();
}
