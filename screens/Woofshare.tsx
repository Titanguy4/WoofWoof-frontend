import { useStay } from "@/hooks/useStay";
import { Stay, StayType } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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

  const mediaHeights = useMemo(() => {
    const heights: { [key: number]: number } = {};
    for (const media of medias) {
      heights[media.id] = Math.floor(Math.random() * (240 - 120 + 1)) + 120;
    }
    return heights;
  }, [medias]);

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

    const typeMatches =
      selectedFilters.length === 0 ||
      selectedFilters.map((f) => f.toUpperCase()).includes(stay.type);

    const searchMatches =
      searchText.trim() === "" ||
      stay.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.includes(searchText.toLowerCase()));

    return typeMatches && searchMatches;
  });

  const toggleFilter = (label: string) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  return (
    <View className="pt-safe bg-woofCream-500">
      <View className="bg-woofCream-500 min-h-screen">
        <View className="flex-row items-center justify-between bg-white border border-woofGrey-500 rounded-full p-3 my-5 mx-5">
          <TextInput
            placeholder={t("search.placeholder")}
            placeholderTextColor={COLORS.woofGrey[500]}
            className="text-lg font-manrope ml-2"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={20} color={COLORS.woofGrey[500]} />
        </View>

        <View className="px-4 py-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="flex-row gap-3 mb-4">
              {categoryLabels.map((label) => {
                const active = selectedFilters.includes(label);
                return (
                  <TouchableOpacity
                    key={label}
                    onPress={() => toggleFilter(label)}
                    className={`flex-row items-center justify-between rounded-3xl border-2 overflow-hidden gap-x-4 pr-3 ${
                      active
                        ? "bg-woofBrown-500 border-woofBrown-500"
                        : "bg-white border-woofBrown-500"
                    }`}
                    // style={{ width: 135, height: 36 }}
                    activeOpacity={1}
                  >
                    <Image
                      source={categoryIcons[label]}
                      className="w-[45px] h-[42px]"
                    />
                    <Text
                      className={`text-sm ${active ? "text-white font-manropeBold" : "text-black"}`}
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

        <ScrollView
          className="flex-1 px-4 pt-2"
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        >
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
                            height: mediaHeights[media.id],
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
                            height: mediaHeights[media.id],
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
      </View>
    </View>
  );
}
