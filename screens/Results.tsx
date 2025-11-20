import ResultMissionCard from "@/components/ResultMissionCard";
import { useSearchFilters } from "@/context/SearchFiltersContext";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Mission,
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "../data/missions";

export default function Results() {
  // ---------------------------------------
  // 🔄 RÉCUPÉRATION DES PARAMÈTRES VENANT DE SEARCH
  // ---------------------------------------
  const params = useLocalSearchParams();

  const locationParam = Array.isArray(params.location)
    ? params.location[0]
    : params.location;

  const startDateParam = Array.isArray(params.startDate)
    ? params.startDate[0]
    : params.startDate;

  const endDateParam = Array.isArray(params.endDate)
    ? params.endDate[0]
    : params.endDate;

  const missionsParam = Array.isArray(params.missions)
    ? params.missions[0]
    : params.missions || null;

  const selectedLocation = String(locationParam || "");
  const selectedStartDate = String(startDateParam || "");
  const selectedEndDate = String(endDateParam || "");

  // ---------------------------------------
  // 📅 FORMATAGE DES DATES
  // ---------------------------------------
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  // ---------------------------------------
  // ⚙️ FILTRES
  // ---------------------------------------
  const { filters } = useSearchFilters();
  const activeCount =
    filters.advantages.length +
    filters.activityTypes.length +
    filters.volunteerProfile.length;

  // ---------------------------------------
  // 📌 TOUTES LES MISSIONS (DÉDOUBLONNAGE)
  // ---------------------------------------
  const dedupeMissionsById = (missions: Mission[]) => {
    const map = new Map<number, Mission>();
    missions.forEach((m) => map.set(m.id, m));
    return Array.from(map.values());
  };

  const allMissions: Mission[] = dedupeMissionsById([
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ]);

  // ---------------------------------------
  // 📌 MISSIONS PASSÉES PAR LES PARAMÈTRES (NEARBY)
  // ---------------------------------------
  const displayedMissions: Mission[] = missionsParam
    ? JSON.parse(missionsParam)
    : allMissions;

  // ---------------------------------------
  // 🔍 FILTRAGE PAR VILLE (AVEC FIX FOR "NEARBY")
  // ---------------------------------------
  const filteredByLocation =
    selectedLocation.toLowerCase() === "nearby"
      ? displayedMissions
      : displayedMissions.filter((mission) =>
          mission.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()),
        );

  // ---------------------------------------
  // 🔍 FILTRAGE PAR SEARCHFILTER
  // ---------------------------------------
  const fullyFiltered = filteredByLocation.filter((mission) => {
    const matchesAdvantages =
      filters.advantages.length === 0 ||
      filters.advantages.every((f: string) => mission.advantages.includes(f));

    const matchesActivity =
      filters.activityTypes.length === 0 ||
      filters.activityTypes.includes(mission.title);

    const matchesProfile =
      filters.volunteerProfile.length === 0 ||
      filters.volunteerProfile.some((p: string) =>
        mission.description.toLowerCase().includes(p.toLowerCase()),
      );

    return matchesAdvantages && matchesActivity && matchesProfile;
  });

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* --------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------- */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500]}
          />
        </TouchableOpacity>

        <Text className="text-lg font-manropeBold ml-24">Results</Text>

        <TouchableOpacity
          onPress={() => router.push("/search")}
          className="flex-row items-center bg-white border border-woofGrey-200 rounded-xl px-4 h-[45px] ml-auto mr-4"
        >
          <Text className="font-manropeMedium">Change</Text>
        </TouchableOpacity>
      </View>

      {/* --------------------------------------- */}
      {/* LOCATION + DATES + FILTER */}
      {/* --------------------------------------- */}
      <View className="bg-white p-4 flex-row items-center justify-between border-b border-gray-200">
        {/* Location & Dates */}
        <View>
          <Text className="font-manropeBold text-[16px]">
            {selectedLocation}
          </Text>
          <Text className="text-woofBrown-500 text-[13px]">
            {formatDate(selectedStartDate)} - {formatDate(selectedEndDate)}
          </Text>
        </View>

        {/* Filter button */}
        <TouchableOpacity
          onPress={() => router.push("/searchfilter")}
          className="flex-row items-center bg-white border border-woofGrey-200 rounded-full px-4 h-[45px]"
        >
          <Ionicons name="filter" size={20} color={COLORS.woofGrey[500]} />
          <Text className="ml-2 font-manropeMedium">Filter</Text>
          <View className="ml-2 bg-woofBrown-500 px-2 rounded-full">
            <Text className="text-white text-[12px] font-manropeBold">
              {activeCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* --------------------------------------- */}
      {/* LISTE DES MISSIONS */}
      {/* --------------------------------------- */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="items-center gap-y-6 mt-4">
          {fullyFiltered.length === 0 ? (
            <Text className="text-gray-500 mt-10 text-[16px]">
              No mission found for this search.
            </Text>
          ) : (
            fullyFiltered.map((mission) => (
              <ResultMissionCard key={mission.id} {...mission} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
