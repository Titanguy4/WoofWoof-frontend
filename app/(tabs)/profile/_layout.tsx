import { COLORS } from "@/utils/constants/colors";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.woofCream[500],
        },
      }}
    />
  );
}
