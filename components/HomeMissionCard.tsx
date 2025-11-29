import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMedia } from "../hooks/useMedia";

type HomeMissionCardProps = {
  stay: Stay;
  heart?: boolean;
};

export default function HomeMissionCard({
  stay,
  heart = false,
}: Readonly<HomeMissionCardProps>) {
  const { mediasByStay, fetchStayPhotos } = useMedia();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // ⭐ Calcul du rating
  const rating =
    stay.reviews && stay.reviews.length > 0
      ? (
          stay.reviews.reduce((sum, r) => sum + r.rating, 0) /
          stay.reviews.length
        ).toFixed(1)
      : "0.0";

  // 📍 Localisation
  const location =
    stay.localisation && stay.localisation.length === 2
      ? `${(stay.localisation[0] / 1_000_000).toFixed(2)}, ${(stay.localisation[1] / 1_000_000).toFixed(2)}`
      : "No location";

  // 🏡 Premier logement
  const housing = stay.accomodations?.[0]?.label ?? "No housing";

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      // Vérifie le cache
      let photos = mediasByStay[stay.id];
      if (!photos) {
        photos = await fetchStayPhotos(stay.id);
      }

      if (isMounted && photos && photos.length > 0) {
        setImageUrl(photos[0].url);
      } else {
        console.log("⚠️ Aucun média trouvé pour ce stay");
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [stay.id]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/details/[id]",
          params: { id: String(stay.id) },
        })
      }
      className=" bg-white rounded-2xl mr-4 overflow-hidden"
    >
      {/* Image */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[148px]"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[148px] bg-gray-200 flex items-center justify-center">
            <Text className="text-gray-400">Loading...</Text>
          </View>
        )}

        {heart && (
          <Ionicons
            className="absolute top-2 right-2"
            name="heart"
            size={20}
            color={COLORS.woofHeart}
          />
        )}
      </View>

      {/* Texte */}
      <View className="p-3">
        <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
          {stay.title}
        </Text>

        <Text className="text-[12px] text-[#7E7E7E] mt-[2px]" numberOfLines={1}>
          {location}
        </Text>

        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#F4B400" />
          <Text className="ml-1 text-[12px] font-manropeMedium">{rating}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <Text className="ml-1 text-[12px] text-[#7E7E7E]">{housing}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
