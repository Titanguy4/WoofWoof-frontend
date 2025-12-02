import { useStay } from "@/hooks/useStay";
import { Stay, StayType } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMedia } from "../hooks/useMedia";
import { Media } from "../types/Media";

export default function Woofshare() {
  const { t } = useTranslation("woofshare");
  const { medias, fetchAllWoofSharePhotos, loading: mediaLoading } = useMedia();
  const { getStayById } = useStay();
  const [mediaStays, setMediaStays] = useState<{ [mediaId: number]: Stay }>({});

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");



  const categoryLabels: StayType[] = [
    "FARM",
    "ANIMAL",
    "CULTURAL",
    "ENVIRONMENTAL",
  ];

  const categoryIcons: Record<StayType, any> = {
    FARM: require("../assets/images/farmType.png"),
    ANIMAL: require("../assets/images/animalType.png"),
    CULTURAL: require("../assets/images/culturalType.png"),
    ENVIRONMENTAL: require("../assets/images/environmentalType.png"),
  };

  useEffect(() => {
    const loadPhotosWithStays = async () => {
      try {
        const fetchedMedias: Media[] = await fetchAllWoofSharePhotos();

        for (const media of fetchedMedias) {
          if (media.stayId) {
            const stay = await getStayById(media.stayId);
            if (stay) {
              setMediaStays((prev) => ({
                ...prev,
                [media.id]: stay,
              }));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching photos with stays:", err);
      }
    };

    loadPhotosWithStays();
  }, []);

  const filteredMedias: Media[] = medias.filter((media) => {
    if (!media.stayId || !mediaStays[media.id]) return false;

    const stay = mediaStays[media.id];

    // Filtre par type
    const typeMatches =
      selectedFilters.length === 0 ||
      selectedFilters.map(f => f.toUpperCase()).includes(stay.type);

    // Filtre par titre
    const searchMatches =
      searchText.trim() === "" ||
      stay.title.toLowerCase().split(" ").some(word =>
        word.includes(searchText.toLowerCase())
      );

    return typeMatches && searchMatches;
  });





  const toggleFilter = (label: string) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };




  // Générateur de hauteur aléatoire pour Pinterest
  const getRandomHeight = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* Header */}
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
        <Text className="text-lg font-manropeBold ml-[106.5px]">
          {t("title")}
        </Text>
      </View>

      {/* Search + Filter */}
      <View className="bg-white px-6 py-2 flex-row items-center gap-3">
        <View className="flex-row items-center bg-white border border-woofGrey-500 rounded-full h-[55px] px-4 flex-1">
          <TextInput
            placeholder={t("search.placeholder")}
            placeholderTextColor={COLORS.woofGrey[500]}
            className="flex-1 text-[15px] font-manropeMedium ml-2"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={20} color={COLORS.woofGrey[500]} />
        </View>

        <TouchableOpacity
          onPress={() => setFiltersOpen(!filtersOpen)}
          className="flex-row items-center bg-white border border-woofGrey-500 rounded-full px-4 h-[55px]"
        >
          <Ionicons name="filter" size={20} color={COLORS.woofGrey[500]} />
          <Text className="ml-2 font-manropeMedium">{t("filters")}</Text>

          <View className="ml-2 bg-woofBrown-500 px-2 rounded-full">
            <Text className="text-white text-[12px] font-manropeBold">
              {selectedFilters.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Filter Popover */}
      {filtersOpen && (
        <View className="absolute top-[150px] right-6 bg-white p-4 rounded-2xl shadow-lg z-50 w-[210px]">
          <Text className="font-manropeBold mb-2 text-[15px]">
            {t("filter.by")}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {categoryLabels.map((label) => {
              const active = selectedFilters.includes(label);
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => toggleFilter(label)}
                  className={`px-3 py-1 rounded-full border ${active
                    ? "bg-woofBrown-500 border-woofBrown-500"
                    : "border-woofGrey"
                    }`}
                >
                  <Text
                    className={`text-[12px] ${active ? "text-white" : "text-black"}`}
                  >
                    {t(`categories.${label.toLowerCase()}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => setFiltersOpen(false)}
            className="bg-woofBrown-500 px-4 py-2 rounded-full mt-4 items-center"
          >
            <Text className="text-white font-manropeBold text-[13px]">
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categories row */}
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
                  className={`flex-row items-center rounded-full px-2 border ${active
                    ? "bg-woofBrown-500 border-woofBrown-500"
                    : "bg-white border-woofBrown-500"
                    }`}
                  style={{ width: 135, height: 36 }}
                  activeOpacity={1}
                >
                  <Image
                    source={categoryIcons[label]}
                    style={{ width: 42, height: 36, resizeMode: "contain" }}
                  />
                  <Text
                    className={`ml-2 text-[12px] ${active ? "text-white font-manropeBold" : "text-black"}`}
                    numberOfLines={1}
                  >
                    {t(`categories.${label.toLowerCase()}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Images Grid (Pinterest style) */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4 pt-2">
        {mediaLoading && (
          <View className="flex-1 items-center justify-center mt-20">
            <ActivityIndicator size="large" color={COLORS.woofBrown[500]} />
            <Text className="mt-2 text-[14px] font-manropeMedium">
              Loading photos...
            </Text>
          </View>
        )}

        {!mediaLoading && medias.length === 0 && (
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-[14px] font-manropeMedium text-gray-400">
              No photos available.
            </Text>
          </View>
        )}

        {!mediaLoading && medias.length > 0 && (
          <View className="flex-row justify-between">
            {/* Left column */}
            <View className="w-[48%] gap-y-5">
              {filteredMedias
                .filter((_, i) => i % 2 === 0)
                .map((media, index) =>
                  media.url ? (
                    <TouchableOpacity
                      key={media.id ?? index}
                      onPress={() =>
                        router.push({
                          pathname: "/details/[id]",
                          params: { id: String(media.stayId) },
                        })
                      }
                    >
                      <Image
                        source={{ uri: media.url }}
                        style={{
                          width: "100%",
                          height: getRandomHeight(120, 220),
                          borderRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : null,
                )}
            </View>

            {/* Right column */}
            <View className="w-[48%] gap-y-5">
              {filteredMedias
                .filter((_, i) => i % 2 !== 0)
                .map((media, index) =>
                  media.url ? (
                    <TouchableOpacity
                      key={media.id ?? index}
                      onPress={() =>
                        router.push({
                          pathname: "/details/[id]",
                          params: { id: String(media.stayId) },
                        })
                      }
                    >
                      <Image
                        source={{ uri: media.url }}
                        style={{
                          width: "100%",
                          height: getRandomHeight(140, 240),
                          borderRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : null,
                )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
