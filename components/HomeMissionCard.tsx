import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type HomeMissionCardProps = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  rating: string;
  distance: string;
  housing: string;
  heart?: boolean;
};

export default function HomeMissionCard({
  id,
  image,
  title,
  location,
  rating,
  distance,
  housing,
  heart = false,
}: Readonly<HomeMissionCardProps>) {
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
        <Image source={image} className="w-full h-[148px]" resizeMode="cover" />
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
