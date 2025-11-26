import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useMedia } from "../hooks/useMedia"; // adapte le chemin si besoin

type HomeMissionCardProps = {
  id: number;
  title: string;
  location: string;
  rating: string;
  distance: string;
  housing: string;
  heart?: boolean;
};

export default function HomeMissionCard({
  id,
  title,
  location,
  rating,
  distance,
  housing,
  heart = false,
}: Readonly<HomeMissionCardProps>) {
  const { medias, fetchStayPhotos, loading } = useMedia();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      await fetchStayPhotos(id); // fetch photos pour ce stayId
      if (medias.length > 0) {
        setImageUrl(medias[0].url); // on prend la première photo si disponible
      }
    };
    loadImage();
  }, [id, medias.length]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/details/[id]",
          params: { id: String(id) },
        })
      }
      className="w-[165px] h-[250px] bg-white rounded-2xl mr-4 overflow-hidden"
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
          {title}
        </Text>
        <Text className="text-[12px] text-[#7E7E7E] mt-[2px]" numberOfLines={1}>
          {location}
        </Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="star" size={14} color="#F4B400" />
          <Text className="ml-1 text-[12px] font-manropeMedium">{rating}</Text>
          <Text className="ml-2 text-[12px] text-[#7E7E7E]">{distance}</Text>
        </View>
        <View className="flex-row items-center mt-1">
          <Text className="ml-1 text-[12px] text-[#7E7E7E]">{housing}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
