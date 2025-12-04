import ResultMissionCard from "@/components/ResultMissionCard";
import { useSearchFilters } from "@/context/SearchFiltersContext";
import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Results() {
  const params = useLocalSearchParams();
  const { filters } = useSearchFilters();
  const activeCount =
    filters.advantages.length +
    filters.activityTypes.length +
    filters.volunteerProfile.length;

  const locationParam = Array.isArray(params.location)
    ? params.location[0]
    : params.location;
  const startDateParam = Array.isArray(params.startDate)
    ? params.startDate[0]
    : params.startDate;
  const endDateParam = Array.isArray(params.endDate)
    ? params.endDate[0]
    : params.endDate;

  const selectedLocation = String(locationParam || "");
  const selectedStartDate = String(startDateParam || "");
  const selectedEndDate = String(endDateParam || "");

  const { getAllStays } = useStay();
  const { fetchStayPhotos } = useMedia();
  const [stays, setStays] = useState<(Stay & { imageUrl: string })[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // LOAD STAYS + PHOTOS
  // -----------------------------
  useEffect(() => {
    const loadStays = async () => {
      setLoading(true);
      try {
        const allStays = await getAllStays();
        if (!allStays) return;

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

  // -----------------------------
  // FORMAT DATE
  // -----------------------------
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  // -----------------------------
  // FILTRAGE
  // -----------------------------
  const filteredStays = stays.filter((stay) => {
    const matchesLocation =
      selectedLocation.toLowerCase() === "nearby" ||
      stay.region?.toLowerCase().includes(selectedLocation.toLowerCase()) ||
      stay.department?.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesAdvantages =
      filters.advantages.length === 0 ||
      filters.advantages.every((f: string) =>
        stay.accomodations.some((a) =>
          typeof a === "string" ? a === f : a.label === f,
        ),
      );

    const matchesActivity =
      filters.activityTypes.length === 0 ||
      filters.activityTypes.includes(stay.type);

    const matchesProfile =
      filters.volunteerProfile.length === 0 ||
      filters.volunteerProfile.some((p: string) =>
        stay.description.toLowerCase().includes(p.toLowerCase()),
      );

    return (
      matchesLocation && matchesAdvantages && matchesActivity && matchesProfile
    );
  });

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

      {/* LOCATION + DATES + FILTER */}
      <View className="bg-white p-4 flex-row items-center justify-between border-b border-gray-200">
        <View>
          <Text className="font-manropeBold text-[16px]">
            {selectedLocation}
          </Text>
          <Text className="text-woofBrown-500 text-[13px]">
            {formatDate(selectedStartDate)} - {formatDate(selectedEndDate)}
          </Text>
        </View>

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

      {/* LISTE DES STAYS */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="items-center gap-y-6 mt-4">
          {filteredStays.length === 0 ? (
            <Text className="text-gray-500 mt-10 text-[16px]">
              No stay found for this search.
            </Text>
          ) : (
            filteredStays.map((stay) => (
              <ResultMissionCard
                key={stay.id}
                id={stay.id}
                title={stay.title}
                description={stay.description}
                region={stay.region || ""}
                department={stay.department || ""}
                imageUrl={stay.imageUrl}
                type={stay.type}
                accomodations={stay.accomodations}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
