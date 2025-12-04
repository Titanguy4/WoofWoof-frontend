import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchFilters } from "../context/SearchFiltersContext";

export default function SearchFilter() {
  const { t } = useTranslation();
  const { filters, toggleFilter, clearFilters } = useSearchFilters();

  const { getAllStays } = useStay();
  const { fetchStayPhotos } = useMedia();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // LOAD STAYS
  // -------------------------------
  useEffect(() => {
    const loadStays = async () => {
      setLoading(true);
      try {
        const allStays = await getAllStays();
        if (!allStays) return;

        // Fetch first photo for each stay (optional)
        const staysWithPhotos = await Promise.all(
          allStays.map(async (s) => {
            const media = await fetchStayPhotos(s.id);
            const imageUrl = media && media.length > 0 ? media[0].url : "";
            return { ...s, imageUrl };
          }),
        );

        setStays(staysWithPhotos);
      } catch (err) {
        console.error("Error loading stays:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStays();
  }, []);

  // -------------------------------
  // ADVANTAGES = extraction unique depuis stays
  // -------------------------------
  const allAdvantages = useMemo(() => {
    const r = new Set<string>();
    stays.forEach((s) => s.accomodations.forEach((a) => r.add(a.label)));
    return Array.from(r);
  }, [stays]);

  // -------------------------------
  // ACTIVITY TYPES (toujours statique)
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
  // VOLUNTEER PROFILE (toujours statique)
  // -------------------------------
  const volunteerProfiles = [
    "Open to youth / students",
    "Family-friendly",
    "Group volunteering",
    "Senior-friendly",
  ];

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={COLORS.woofBrown[500]} />
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
