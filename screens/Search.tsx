import { useSearchFilters } from "@/context/SearchFiltersContext";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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

import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import HomeMissionCard from "../components/HomeMissionCard";

type HistoryItem = {
  title: string;
  region?: string;
};

export default function Search() {
  const { filters } = useSearchFilters();
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const { getAllStays } = useStay();
  const { fetchStayPhotos } = useMedia();
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // LOAD HISTORY
  // -----------------------------
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const saved = await AsyncStorage.getItem("search_history");
        if (saved) setHistory(JSON.parse(saved));
      } catch (err) {
        console.log("Error loading history:", err);
      }
    };
    loadHistory();
  }, []);

  // -----------------------------
  // SAVE HISTORY
  // -----------------------------
  const saveToHistory = async (item: HistoryItem) => {
    try {
      // Remove duplicate by title
      const newHistory = [
        item,
        ...history.filter((h) => h.title !== item.title),
      ].slice(0, 10);
      setHistory(newHistory);
      await AsyncStorage.setItem("search_history", JSON.stringify(newHistory));
    } catch (err) {
      console.log("Error saving history:", err);
    }
  };

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
  // FILTERING BY QUERY
  // -----------------------------
  const filteredStays = useMemo(() => {
    if (!query) return [];
    return stays.filter((s) =>
      `${s.region || ""} ${s.department || ""} ${s.title}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query, stays]);

  const activeCount =
    filters.advantages.length +
    filters.activityTypes.length +
    filters.volunteerProfile.length;

  // -----------------------------
  // DATE SELECTION
  // -----------------------------
  const handleSelectDay = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (startDate && !endDate) {
      setEndDate(day.dateString);
    }
  };

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
        <View className="ml-6 flex-row items-center bg-white border border-woofGrey-500 rounded-full h-[55px] px-4 flex-1">
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
          className="flex-1 border border-woofGrey-500 rounded-full px-4 h-[45px] justify-center"
        >
          <Text className="font-manropeMedium text-[13px] text-gray-500">
            Start
          </Text>
          <Text className="text-[12px] text-woofBrown-500">{startDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowDateModal(true)}
          className="flex-1 border border-woofGrey-500 rounded-full px-4 h-[45px] justify-center"
        >
          <Text className="font-manropeMedium text-[13px] text-gray-500">
            End
          </Text>
          <Text className="text-[12px] text-woofBrown-500">{endDate}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/searchfilter")}
          className="flex-row items-center bg-white border border-woofGrey-500 rounded-2xl px-4 h-[45px]"
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

      {/* RESULTS */}
      <ScrollView className="flex-1 bg-white px-4 pt-4">
        {query.length > 0 ? (
          filteredStays.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">
              No stay found.
            </Text>
          ) : (
            filteredStays.map((stay) => (
              <Pressable
                key={stay.id}
                className="flex-row items-start py-4"
                onPress={() => {
                  saveToHistory({
                    title: stay.title,
                    region: stay.region || "",
                  });
                  router.push({
                    pathname: "/results",
                    params: {
                      location: stay.region || stay.title,
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
                    {stay.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {stay.department || stay.region || "France"}
                  </Text>
                </View>
              </Pressable>
            ))
          )
        ) : (
          <>
            <Text className="text-[18px] font-manropeBold mt-4 mb-6">
              Nearby
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {stays.map((stay) => (
                <HomeMissionCard key={stay.id} stay={stay} />
              ))}
            </ScrollView>

            {/* HISTORY */}
            <Text className="text-[18px] font-manropeBold mt-8 mb-6">
              History
            </Text>

            {history.length === 0 && (
              <Text className="text-gray-400">No recent searches.</Text>
            )}

            {history.map((item, i) => (
              <Pressable
                key={i}
                className="flex-row items-center mb-6"
                onPress={() => {
                  saveToHistory(item);
                  router.push({
                    pathname: "/results",
                    params: {
                      location: item.region || item.title,
                      startDate,
                      endDate,
                    },
                  });
                }}
              >
                <Ionicons name="time-outline" size={24} color="black" />
                <Text className="ml-3 text-[15px] font-manropeMedium">
                  {item.title}
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

            <View className="flex-row mt-6 mb-4">
              <View className="flex-1 bg-gray-200 rounded-full py-2 px-3">
                <Text className="text-black font-manrope">Start</Text>
                <Text className="text-gray-500">{startDate || "-"}</Text>
              </View>
              <View className="flex-1 bg-gray-200 rounded-full py-2 px-3 ml-3">
                <Text className="font-manrope text-black">End</Text>
                <Text className="text-gray-500">{endDate || "-"}</Text>
              </View>
            </View>

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
                className="bg-woofBrown-500 w-[48%] rounded-xl py-3 items-center"
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
