// screens/DetailsScreen.tsx
import { missionsAnimal, missionsCultural, missionsEnv, missionsFarm, missionsNearby } from "@/data/missions";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

type Props = {
  id: string | string[] | undefined;
};

export default function DetailsScreen({ id }: Props) {
  // Combine toutes les missions
  const allMissions = [
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ];

  // Trouve la mission correspondant à l'id
  const mission = allMissions.find((m) => m.id.toString() === id);

  if (!mission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">Mission not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <Image source={mission.image} className="w-full h-64" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-2xl font-manropeBold mb-2">{mission.title}</Text>
        <Text className="text-base text-gray-700">{mission.description}</Text>
        <Text className="mt-4 text-sm text-gray-500">
          📍 {mission.location} — ⭐ {mission.rating}
        </Text>
      </View>
    </ScrollView>
  );
}
