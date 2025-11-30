import { COLORS } from "@/constants/colors";
import { useLikes } from "@/context/LikeContext";
import Accomodation from "@/types/stayservice/Accomodation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ResultMissionCardProps = {
  id: number;
  title: string;
  description: string;
  region: string;
  department: string;
  imageUrl: string;
  type: string;
  accomodations: Accomodation[];
};

export default function ResultMissionCard({
  id,
  title,
  description,
  region,
  department,
  imageUrl,
  type,
  accomodations,
}: ResultMissionCardProps) {

  const { isLiked } = useLikes();
    const heart = isLiked(id);


  return (
    <TouchableOpacity
      onPress={() => router.push(`/details/${id}`)}
      className="w-full h-[180px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-500 relative"
    >
      {/* Image */}
      <View>
      <Image
        source={{ uri: imageUrl }}
        className="h-full w-[115px]"
        resizeMode="cover"
      />
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

        <View className="w-[220px] mb-4">
          <Text className="text-[12px] text-[#7E7E7E] mt-1" numberOfLines={2}>
            {department}, {region}
          </Text>
        </View>

        <Text className="font-manropeBold text-[14px] mt-1">
          Mission details
        </Text>

        <View className="mt-1 gap-y-1">
          {accomodations.map((adv, index) => (
            <Text key={index} className="text-[12px] text-[#7E7E7E]">
              • {typeof adv === "string" ? adv : adv.label}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
