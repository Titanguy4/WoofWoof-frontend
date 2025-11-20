import { COLORS } from "@/utils/constants/colors";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchFilters } from "../context/SearchFiltersContext";
import {
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "../data/missions";

export default function SearchFilter() {
  const { t } = useTranslation();
  const { filters, toggleFilter, clearFilters } = useSearchFilters();

  // -------------------------------
  // ADVANTAGES = extraction unique
  // -------------------------------
  const allAdvantages = useMemo(() => {
    const missions = [
      ...missionsNearby,
      ...missionsFarm,
      ...missionsAnimal,
      ...missionsEnv,
      ...missionsCultural,
    ];
    const r = new Set<string>();
    missions.forEach((m) => m.advantages.forEach((a) => r.add(a)));
    return Array.from(r);
  }, []);

  // -------------------------------
  // ACTIVITY TYPES
  // -------------------------------
  const activityTypes = [
    "Farm work",
    "Animal care",
    "Environment",
    "Cultural events",
    "Education",
    "Health",
  ];

  // -------------------------------
  // VOLUNTEER PROFILE
  // -------------------------------
  const volunteerProfiles = [
    "Open to youth / students",
    "Family-friendly",
    "Group volunteering",
    "Senior-friendly",
  ];

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* HEADER */}
      <View className="items-center w-full h-[56px] bg-white flex-row px-6 justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-sm text-woofBrown-500 font-manropeSemiBold">
            {t("searchFilter.cancel")}
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-manropeBold">
          {t("searchFilter.title")}
        </Text>

        <TouchableOpacity onPress={clearFilters}>
          <Text className="text-sm text-woofBrown-500 font-manropeSemiBold">
            {t("searchFilter.clearAll")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView className="flex-1 bg-white px-4 pt-2">
        {/* --------------------- */}
        {/* ADVANTAGES SECTION */}
        {/* --------------------- */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[17px] font-manropeBold">
              {t("searchFilter.advantages")}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {allAdvantages.map((label, i) => {
              const active = filters.advantages.includes(label);
              return (
                <Pressable
                  key={i}
                  onPress={() => toggleFilter("advantages", label)}
                  className={`px-3 py-1.5 rounded-full border
                    ${active ? "bg-woofBrown-500 border-woofBrown-500" : "bg-[#eef4ff] border-[#dde7ff]"}`}
                >
                  <Text
                    className={`text-[13px] font-manropeMedium
                      ${active ? "text-white" : "text-woofBrown-500"}`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Divider */}
        <View className="my-8 h-[1px] bg-gray-200" />

        {/* --------------------- */}
        {/* ACTIVITY TYPES */}
        {/* --------------------- */}
        <View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-[17px] font-manropeBold">
              {t("searchFilter.activityType")}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {activityTypes.map((label, i) => {
              const active = filters.activityTypes.includes(label);
              return (
                <Pressable
                  key={i}
                  onPress={() => toggleFilter("activityTypes", label)}
                  className={`px-4 py-2 rounded-full border
                    ${active ? "bg-woofBrown-500 border-woofBrown-500" : "bg-[#f2f6ff] border-[#ddd]"}`}
                >
                  <Text
                    className={`font-manropeMedium
                      ${active ? "text-white" : "text-woofBrown-500"}`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Divider */}
        <View className="my-8 h-[1px] bg-gray-200" />

        {/* --------------------- */}
        {/* VOLUNTEER PROFILE */}
        {/* --------------------- */}
        <View>
          <Text className="text-[17px] font-manropeBold mb-3">
            {t("searchFilter.volunteerProfile")}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {volunteerProfiles.map((label, i) => {
              const active = filters.volunteerProfile.includes(label);
              return (
                <Pressable
                  key={i}
                  onPress={() => toggleFilter("volunteerProfile", label)}
                  className={`px-4 py-2 rounded-full border
                    ${active ? "bg-woofBrown-500 border-woofBrown-500" : "bg-[#f2f6ff] border-[#ddd]"}`}
                >
                  <Text
                    className={`font-manropeMedium
                      ${active ? "text-white" : "text-woofBrown-500"}`}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* APPLY FILTERS BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-woofBrown-500 mt-12 mb-10 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-manropeBold text-[16px]">
            {t("searchFilter.applyFilters")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
