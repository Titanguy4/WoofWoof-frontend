import { useMedia } from "@/hooks/useMedia";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

type ApplyMissionCardProps = {
  stay: Stay;
  heart?: boolean;
};

export default function ApplyMissionCard({
  stay,
  heart = false,
}: ApplyMissionCardProps) {
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
    <View className="w-full h-[144px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-500">
      {/* Image */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="h-full w-[115px]"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[15px] bg-gray-200 flex items-center justify-center">
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
          {stay.localisation}
        </Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#F4B400" />
          <Text className="ml-1 text-[12px] font-manropeMedium">{rating}</Text>
          <Text className="ml-2 text-[12px] text-[#7E7E7E]">
            {stay.reviews.length} review(s)
          </Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Text className="ml-1 text-[12px] text-[#7E7E7E]">
            {stay.activities[0]?.label}
          </Text>
        </View>
      </View>
    </View>
  );
}
