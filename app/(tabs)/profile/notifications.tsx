import { Stack } from "expo-router";
import { View } from "react-native";

export default function NotificationsStack() {
  return (
    <View className="min-h-screen bg-woofCream-500">
      <Stack.Screen options={{ title: "Notifications" }} />
    </View>
  );
}
