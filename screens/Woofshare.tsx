import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { mockImages } from "../data/woofshare";

export default function Woofshare() {

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "Farm work",
    "Animal care",
  ]);

  const toggleFilter = (label: string) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  type CategoryLabel = "Farm work" | "Animal care" | "Cultural" | "Environment";


  const categoryLabels: CategoryLabel[] = [
    "Farm work",
    "Animal care",
    "Cultural",
    "Environment",
  ];

  const categoryIcons: Record<CategoryLabel, any> = {
    "Farm work": require("../assets/images/farmType.png"),
    "Animal care": require("../assets/images/animalType.png"),
    "Cultural": require("../assets/images/culturalType.png"),
    "Environment": require("../assets/images/environmentalType.png"),
  };




  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color={COLORS.woofBrown} />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[106.5px]">Woofshare</Text>
      </View>

      {/* Search + Filter */}
      <View className="bg-white px-6 py-2 flex-row items-center gap-3">

        {/* ✅ Search */}
        <View className="flex-row items-center bg-white border border-woofGrey rounded-full h-[55px] px-4 flex-1">
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.woofGrey}
            className="flex-1 text-[15px] font-manropeMedium ml-2"
          />
          <Ionicons name="search" size={20} color={COLORS.woofGrey} />
        </View>

        {/* ✅ Filter */}
        <TouchableOpacity
          onPress={() => setFiltersOpen(!filtersOpen)}
          className="flex-row items-center bg-white border border-woofGrey rounded-full px-4 h-[55px]"
        >
          <Ionicons name="filter" size={20} color={COLORS.woofGrey} />
          <Text className="ml-2 font-manropeMedium">Filter</Text>

          {/* ✅ Badge dynamic */}
          {selectedFilters.length > 0 && (
            <View className="ml-2 bg-woofBrown px-2 rounded-full">
              <Text className="text-white text-[12px] font-manropeBold">
                {selectedFilters.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ✅ FILTER POPOVER */}
      {filtersOpen && (
        <View className="absolute top-[150px] right-6 bg-white p-4 rounded-2xl shadow-lg z-50 w-[210px]">

          <Text className="font-manropeBold mb-2 text-[15px]">Filter by</Text>

          <View className="flex-row flex-wrap gap-2">
            {categoryLabels.map((label) => {
              const active = selectedFilters.includes(label);
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => toggleFilter(label)}
                  className={`px-3 py-1 rounded-full border ${active ?
                    "bg-woofBrown border-woofBrown" :
                    "border-woofGrey"
                    }`}
                >
                  <Text
                    className={`text-[12px] ${active ? "text-white" : "text-black"
                      }`}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ✅ Apply Button */}
          <TouchableOpacity
            onPress={() => setFiltersOpen(false)}
            className="bg-woofBrown px-4 py-2 rounded-full mt-4 items-center"
          >
            <Text className="text-white font-manropeBold text-[13px]">
              Apply
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {/* Categories preview row */}
      <View className="bg-white px-4 py-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View className="flex-row gap-3">
            {categoryLabels.map((label) => {
              const active = selectedFilters.includes(label);

              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => toggleFilter(label)}
                  className={`flex-row items-center rounded-full px-2 border
    ${active ? "bg-woofBrown border-woofBrown" : "bg-white border-woofBrown"}
  `}
                  style={{ width: 135, height: 36 }}
                  activeOpacity={1}
                >
                  <Image
                    source={categoryIcons[label]}
                    style={{
                      width: 42,
                      height: 36,
                      resizeMode: "contain",
                    }}
                  />

                  <Text
                    className={`ml-2 text-[12px] ${active ? "text-white font-manropeBold" : "text-black"
                      }`}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>






      {/* Images Grid */}
      <ScrollView className="flex-1 bg-woofCream px-4 pt-2">
        <View className="flex-row justify-between">
          {/* Left Column */}
          <View className="w-[48%] gap-y-5">
            {mockImages
              .filter((_, i) => i % 2 === 0)
              .map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  className="w-full rounded-xl"
                  resizeMode="cover"
                />
              ))}
          </View>

          {/* Right Column */}
          <View className="w-[48%] gap-y-5">
            {mockImages
              .filter((_, i) => i % 2 !== 0)
              .map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  className="w-full rounded-xl"
                  resizeMode="cover"
                />
              ))}
          </View>
        </View>
      </ScrollView>



    </SafeAreaView>
  );
}
