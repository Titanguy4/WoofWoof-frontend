import { useSearchFilters } from "@/context/SearchFiltersContext";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "../data/missions";

export default function Search() {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState<string | null>("31Mar, 2024");
  const [endDate, setEndDate] = useState<string | null>("01Apr, 2024");
  const [showDateModal, setShowDateModal] = useState(false);

  const [history, setHistory] = useState<string[]>([]);

  const { filters } = useSearchFilters();

  const allMissions = [
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ];

  // -----------------------------
  // LOAD HISTORY FROM STORAGE
  // -----------------------------
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem("search_history");
        if (saved) {
          setHistory(JSON.parse(saved));
        }
      } catch (err) {
        console.log("Error loading history:", err);
      }
    };

    loadHistory();
  }, []);

  // -----------------------------
  // SAVE HISTORY ON CLICK
  // -----------------------------
  const saveToHistory = async (location: string) => {
    try {
      let newHistory = [location, ...history];

      // remove duplicates
      newHistory = [...new Set(newHistory)];

      // limit to last 10
      newHistory = newHistory.slice(0, 10);

      setHistory(newHistory);
      await AsyncStorage.setItem("search_history", JSON.stringify(newHistory));
    } catch (err) {
      console.log("Error saving history:", err);
    }
  };

  // -----------------------------
  // CITIES EXTRACTION
  // -----------------------------
  const extractedCities = allMissions.map((mission) => {
    const [city, region, country] = mission.location
      .split(",")
      .map((s) => s.trim());

    return {
      city,
      region: region || "",
      country: country || "France",
      fullLocation: mission.location,
    };
  });

  const uniqueCities = Array.from(
    new Map(extractedCities.map((c) => [c.city, c])).values(),
  );

  // -----------------------------
  // SEARCH FILTERING
  // -----------------------------
  const searchedCities =
    query.length === 0
      ? []
      : uniqueCities.filter((c) =>
          c.fullLocation.toLowerCase().includes(query.toLowerCase()),
        );

  // -----------------------------
  // COUNT FILTERS
  // -----------------------------
  const activeCount =
    filters.advantages.length +
    filters.activityTypes.length +
    filters.volunteerProfile.length;

  // -----------------------------
  // DATE LOGIC
  // -----------------------------
  const handleSelectDay = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      return;
    }
    if (startDate && !endDate) {
      setEndDate(day.dateString);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* HEADER */}
      <View className="items-center w-full bg-white flex-row px-4 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500]}
          />
        </TouchableOpacity>

        {/* SEARCH BAR */}
        <View className="ml-6 flex-row items-center bg-white border border-woofGrey rounded-full h-[55px] px-4 flex-1">
          <TextInput
            placeholder="Where do you want to help?"
            placeholderTextColor={COLORS.woofGrey[500]}
            className="flex-1 text-[15px] font-manropeMedium ml-2"
            value={query}
            onChangeText={setQuery}
          />
          <Ionicons name="search" size={20} color={COLORS.woofGrey[500]} />
        </View>
      </View>

      {/* DATE + FILTER */}
      <View className="bg-white p-4 flex-row items-center gap-3 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setShowDateModal(true)}
          className="flex-1 border border-woofGrey rounded-full px-4 h-[45px] justify-center"
        >
          <Text className="font-manropeMedium text-[13px] text-woofBrow-500">
            Tonight
          </Text>
          <Text className="text-[12px] text-gray-500">{startDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowDateModal(true)}
          className="flex-1 border border-woofGrey rounded-full px-4 h-[45px] justify-center"
        >
          <Text className="font-manropeMedium text-[13px] text-woofBrow-500">
            Tomorrow
          </Text>
          <Text className="text-[12px] text-gray-500">{endDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/searchfilter")}
          className="flex-row items-center bg-white border border-woofGrey rounded-full px-4 h-[45px]"
        >
          <Ionicons name="filter" size={20} color={COLORS.woofGrey[500]} />
          <Text className="ml-2 font-manropeMedium">Filter</Text>
          <View className="ml-2 bg-woofBrow-500 px-2 rounded-full">
            <Text className="text-white text-[12px] font-manropeBold">
              {activeCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* RESULTS */}
      <ScrollView className="flex-1 bg-white px-4 pt-4">
        {query.length > 0 ? (
          <>
            {searchedCities.length === 0 && (
              <Text className="text-center text-gray-500 mt-10">
                No city found.
              </Text>
            )}

            {searchedCities.map((item, index) => (
              <Pressable
                key={index}
                className="flex-row items-start py-4"
                onPress={() => {
                  saveToHistory(item.fullLocation); // <--- SAVE HERE
                  router.push({
                    pathname: "/results",
                    params: {
                      location: item.fullLocation,
                      startDate,
                      endDate,
                    },
                  });
                }}
              >
                <View className="w-10 h-10 rounded-xl bg-[#F5F5F5] items-center justify-center mt-1">
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={COLORS.woofBrown[500]}
                  />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-manropeMedium">
                    {item.city}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    City in {item.region || "France"}, {item.country}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        ) : (
          <>
            <Text className="text-[18px] font-manropeBold mt-4 mb-6">
              Nearby
            </Text>

            <TouchableOpacity
              className="flex-row items-center justify-between"
              onPress={() =>
                router.push({
                  pathname: "/results",
                  params: {
                    location: "Nearby",
                    startDate,
                    endDate,
                    missions: JSON.stringify(missionsNearby),
                  },
                })
              }
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="location"
                  size={24}
                  color={COLORS.woofBrown[500]}
                />
                <Text className="ml-2 font-manrope">100+ Missions</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={"gray"} />
            </TouchableOpacity>

            {/* HISTORY */}
            <Text className="text-[18px] font-manropeBold mt-8 mb-6">
              History
            </Text>

            {history.length === 0 && (
              <Text className="text-gray-400">No recent searches.</Text>
            )}

            {history.map((loc, i) => (
              <Pressable
                key={i}
                className="flex-row items-center mb-6"
                onPress={() => {
                  saveToHistory(loc); // boost to top
                  router.push({
                    pathname: "/results",
                    params: {
                      location: loc,
                      startDate,
                      endDate,
                    },
                  });
                }}
              >
                <Ionicons name="time-outline" size={24} color="black" />
                <Text className="ml-3 text-[15px] font-manropeMedium">
                  {loc}
                </Text>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>

      {/* DATE MODAL */}
      <Modal visible={showDateModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/30 justify-end">
          <View className="bg-white rounded-t-3xl p-6 max-h-[85%]">
            <View className="flex-row justify-between items-center">
              <Text className="text-[20px] font-manropeBold">
                When do you want to help?
              </Text>
              <TouchableOpacity onPress={() => setShowDateModal(false)}>
                <Ionicons name="close" size={26} color="black" />
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="flex-row mt-6 mb-4">
              <View className="flex-1 bg-woofBrow-500 rounded-full py-2 px-3">
                <Text className="text-white font-manropeBold">Start</Text>
                <Text className="text-white opacity-80">{startDate}</Text>
              </View>
              <View className="flex-1 bg-gray-200 rounded-full py-2 px-3 ml-3">
                <Text className="font-manropeBold text-gray-600">End</Text>
                <Text className="text-gray-500">{endDate || "-"}</Text>
              </View>
            </View>

            {/* Calendar */}
            <Calendar
              onDayPress={handleSelectDay}
              markedDates={{
                [startDate || ""]: {
                  startingDay: true,
                  color: COLORS.woofBrown[500],
                  textColor: "#fff",
                },
                [endDate || ""]: {
                  endingDay: true,
                  color: COLORS.woofBrown[500],
                  textColor: "#fff",
                },
              }}
              markingType="period"
            />

            {/* Footer */}
            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                onPress={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="border border-gray-300 w-[48%] rounded-xl py-3 items-center"
              >
                <Text className="font-manropeMedium">Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowDateModal(false)}
                className="bg-woofBrow-500 w-[48%] rounded-xl py-3 items-center"
              >
                <Text className="text-white font-manropeMedium">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
