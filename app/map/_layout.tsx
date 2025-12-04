import { Stack } from "expo-router";

export default function MapStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="roadtrip"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="roadtrip-result"
        options={{
          presentation: "card",
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackTitle: "Retour",
          headerTintColor: "#000",
        }}
      />
    </Stack>
  );
}
