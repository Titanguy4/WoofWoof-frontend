import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import ResultMissionCard from "@/components/ResultMissionCard";
import {
  Mission,
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "../data/missions";

export default function Map() {
  // 🛑 Remove duplicates (unique ids)
  const missions: Mission[] = Array.from(
    new globalThis.Map(
      [
        ...missionsNearby,
        ...missionsFarm,
        ...missionsAnimal,
        ...missionsEnv,
        ...missionsCultural,
      ].map((m) => [m.id, m]),
    ).values(),
  );

  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-woofBrown-500">
      {/* Top bar */}
      <View className="absolute top-24 left-4 z-20">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full bg-white justify-center items-center shadow-md"
        >
          <MaterialIcons name="chevron-left" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {/* MAP */}
      <MapView
        style={{
          width: "100%",
          height: Dimensions.get("window").height,
        }}
        initialRegion={{
          latitude: 46.5,
          longitude: 2.2,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}
      >
        {missions.map((m) => {
          const isSelected = selectedMission?.id === m.id;

          return (
            <Marker
              key={m.id}
              coordinate={m.coords}
              onPress={() => setSelectedMission(m)}
            >
              <View
                className={`px-3 py-1 rounded-md shadow ${
                  isSelected ? "bg-woofCream" : "bg-white"
                }`}
              >
                <Text
                  className={`text-[12px] font-manropeSemiBold ${
                    isSelected ? "text-woofBrown-500" : "text-black"
                  }`}
                >
                  {m.title}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Bottom card */}
      {selectedMission && (
        <View className="absolute bottom-6 w-full px-4">
          <ResultMissionCard
            id={selectedMission.id}
            image={selectedMission.image}
            title={selectedMission.title}
            location={selectedMission.location}
            description={selectedMission.description}
            advantages={selectedMission.advantages}
            locationDetails={selectedMission.locationDetails}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
