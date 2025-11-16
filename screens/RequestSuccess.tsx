import {
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "@/data/missions";
import { COLORS } from "@/utils/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestSuccessScreen() {
  const { id, start, end, email, number } = useLocalSearchParams();

  const allMissions = [
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ];

  const mission = allMissions.find((m) => m.id.toString() === id);

  if (!mission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">Mission not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      <ScrollView className="flex-1 bg-woofCream px-4">
        <View className="rounded-2xl items-center mt-12 px-4 bg-white">
          <View className="p-4 border-b border-gray-300 w-full items-center">
            <Image
              source={require("../assets/images/doglogo.png")}
              className="w-[147px] h-[139px] self-center"
            />
            <Text className="text-2xl font-manropeBold">Request success</Text>
          </View>

          {/* --- Mission details --- */}
          <View className="px-4 py-7 border-b border-gray-300 w-full">
            <Text className="text-lg font-manropeBold mb-2">
              {mission.title}
            </Text>
            <Text className="text-sm font-manrope mb-6 text-woofDarkGrey">
              {mission.locationDetails}
            </Text>

            {/* 🕓 Dates */}
            <Text className="text-lg font-manropeBold mb-6">
              {start} → {end}
            </Text>

            {/* 👤 User Info */}
            <Text className="text-lg font-manropeBold mb-2">Volunteer</Text>
            <Text className="text-sm font-manrope mb-2 text-woofDarkGrey">
              {email}
            </Text>
            <Text className="text-sm font-manrope text-woofDarkGrey">
              {number}
            </Text>
          </View>

          {/* --- Buttons --- */}
          <View className="w-full px-10 items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/missions")}
              className="bg-woofBrown w-full h-14 px-3 py-1 mt-7 rounded-2xl items-center justify-center mb-6"
            >
              <Text className="text-base font-manropeBold text-white">
                View Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/explore")}
              className="bg-white border border-gray-300 w-full h-14 px-3 py-1 rounded-2xl items-center justify-center mb-6"
            >
              <Text className="text-base font-manropeBold text-black">
                Back to home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
