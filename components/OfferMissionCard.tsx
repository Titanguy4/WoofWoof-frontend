import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type OfferMissionCardProps = {
  id: number;
  image: ImageSourcePropType;
  image2x?: ImageSourcePropType;
  title: string;
  location: string;
  activity: string;
  meals: string;
  dailyHours: string;
  backpackersMax: number;
  housing: string;
  description?: string;
  advantages?: string[];
  locationDetails?: string;
  backpackersTotal: number;
};

export default function OfferMissionCard({
  id,
  image,
  title,
  locationDetails,
  housing,
  meals,
  backpackersMax,
  dailyHours,
  activity,
  backpackersTotal,
}: OfferMissionCardProps) {
  return (
    <View className="w-full h-[250px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown">
      {/* Image */}
      <View className="relative">
        <Image source={image} className="h-full w-[115px]" resizeMode="cover" />
      </View>

      {/* Texte */}
      <View className="p-3">
        <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
          {title}
        </Text>
        <View className="w-[220px]">
          <Text className="text-[12px] text-[#7E7E7E] mt-1" numberOfLines={2}>
            {locationDetails}
          </Text>
        </View>
        <Text className="font-manropeBold text-[14px] mt-1" numberOfLines={1}>
          Mission details
        </Text>
        <View className="mt-1 gap-y-2">
          <View className="w-[220px]">
            <Text className="text-[12px] text-[#7E7E7E]">
              🌱 Activity: {activity}
            </Text>
          </View>
          <Text className="text-[12px] text-[#7E7E7E]">
            ⏱ Daily hours: {dailyHours}
          </Text>
          <Text className="text-[12px] text-[#7E7E7E]">
            👥 Backpackers: up to {backpackersMax} at time
          </Text>
          <Text className="text-[12px] text-[#7E7E7E]">🍽 Meals: {meals}</Text>
          <Text className="text-[12px] text-[#7E7E7E]">
            🏠 Housing: {housing}
          </Text>
          <View className="px-2 flex-row items-center justify-between">
            <Text
              className="mt-2 mb-2 font-manropeBold text-[16px] text-woofBrown"
              numberOfLines={1}
            >
              {backpackersTotal} backpackers hosted
            </Text>
            <Ionicons name="paw" size={20} color={COLORS.woofBrown[500]} />
          </View>
        </View>
      </View>
    </View>
  );
}
