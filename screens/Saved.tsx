import SavedMissionCard from "@/components/SavedMissionCard";
import { useLikes } from "@/context/LikeContext";
import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  const { t } = useTranslation("saved");
  const { getAllStays } = useStay();
  const { fetchStayPhotos } = useMedia();
  const { isLiked } = useLikes();

  const [likedStays, setLikedStays] = useState<(Stay & { imageUrl: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const loadLikedStays = async () => {
    setLoading(true);
    try {
      const allStays = await getAllStays();
      if (!allStays) return;

      const staysWithImages = await Promise.all(
        allStays.map(async (s) => {
          const media = await fetchStayPhotos(s.id);
          const imageUrl = media && media.length > 0 ? media[0].url : "";
          return { ...s, imageUrl };
        })
      );

      const filtered = staysWithImages.filter((stay) => isLiked(stay.id));
      setLikedStays(filtered);
    } catch (err) {
      console.error("Error loading liked stays:", err);
      setError("Failed to load saved missions.");
    } finally {
      setLoading(false);
    }
  };

  loadLikedStays();
}, [isLiked]); 

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={COLORS.woofBrown[500]} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

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
        <Text className="text-lg font-manropeBold ml-[122.5px]">
          {t("title")}
        </Text>
      </View>

      {/* Liste des stays likés */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="items-center gap-y-6 mt-4">
          {likedStays.length > 0 ? (
            likedStays.map((stay) => (
              <SavedMissionCard
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
          ) : (
            <Text className="text-gray-500 mt-4">{t("noSavedMissions") || "No saved missions yet."}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


