import MyMissionsCard from "@/components/MyMissionsCard";
import { myMissions } from "@/data/personalmissions";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControlTab from "react-native-segmented-control-tab";

export default function Missions() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabChange = (index: number) => setSelectedIndex(index);

  // 🧠 Tri des missions du plus récent au plus ancien
  const sortedMissions = useMemo(() => {
    return [...myMissions].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime(); // plus récent d'abord
    });
  }, []);

  // 🧭 Filtrage des missions selon l’onglet
  const filteredMissions =
    selectedIndex === 0
      ? sortedMissions.filter(
          (m) => m.status === "accepted" || m.status === "pending",
        )
      : sortedMissions; // 🔹 History contient TOUTES les missions

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500][500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500][500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500][500]}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[105px]">My missions</Text>
      </View>

      {/* Segmented Control */}
      <View className="bg-white px-4 py-3">
        <SegmentedControlTab
          values={["Ongoing", "History"]}
          selectedIndex={selectedIndex}
          onTabPress={handleTabChange}
          borderRadius={20}
          tabsContainerStyle={{
            backgroundColor: "white",
          }}
          tabStyle={{
            borderColor: COLORS.woofBrown[500][500],
            height: 48,
          }}
          activeTabStyle={{
            backgroundColor: COLORS.woofBrown[500][500],
          }}
          tabTextStyle={{
            color: COLORS.woofBrown[500][500],
            fontWeight: "600",
            fontSize: 16,
          }}
          activeTabTextStyle={{
            color: "white",
          }}
        />
      </View>

      {/* ScrollView */}
      <ScrollView className="flex-1 bg-woofCream px-4">
        <View className="items-center mt-4 gap-y-6">
          {filteredMissions.length > 0 ? (
            filteredMissions.map((mission) => (
              <MyMissionsCard key={mission.id} {...mission} />
            ))
          ) : (
            <Text className="text-gray-500 mt-8">No missions found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
