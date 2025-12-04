import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type OfferMissionCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  region: string;
  department: string;
  activities: string[];
  meals: string[];
  learningSkills: string[];
  accomodations: string[];
  backpackersTotal: number;
  noPhoto?: boolean; // <-- nouveau boolean
  onAddPhotoPress?: () => void; // <-- callback pour le bouton
};

export default function OfferMissionCard({
  id,
  imageUrl,
  title,
  region,
  department,
  activities,
  meals,
  learningSkills,
  accomodations,
  backpackersTotal,
  noPhoto = false,
  onAddPhotoPress,
}: OfferMissionCardProps) {
  const renderList = (items: string[]) => items.join(", ");

  return (
    <View className="w-full h-[220px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-500">
      {/* Image ou bouton Ajouter une photo */}
      <View className="relative">
        {noPhoto ? (
          <TouchableOpacity
            onPress={onAddPhotoPress}
            className="w-[115px] h-full bg-gray-200 flex items-center justify-center rounded-l-2xl"
          >
            <Text className="text-2xl font-bold text-gray-500 text-center">
              +{"\n"}Ajouter une photo
            </Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: imageUrl }}
            className="h-full w-[115px]"
            resizeMode="cover"
          />
        )}
      </View>

      {/* Texte */}
      <View className="p-3 flex-1">
        <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
          {title}
        </Text>

        <Text className="text-[12px] text-[#7E7E7E] mt-1" numberOfLines={2}>
          {department}, {region}
        </Text>

        <Text className="font-manropeBold text-[14px] mt-2">
          Mission details
        </Text>

        <View className="mt-1 gap-y-1">
          {activities.length > 0 && (
            <Text className="text-[12px] text-[#7E7E7E]">
              🌱 Activities: {renderList(activities)}
            </Text>
          )}

          {learningSkills.length > 0 && (
            <Text className="text-[12px] text-[#7E7E7E]">
              🧠 Learning skills: {renderList(learningSkills)}
            </Text>
          )}

          {meals.length > 0 && (
            <Text className="text-[12px] text-[#7E7E7E]">
              🍽 Meals: {renderList(meals)}
            </Text>
          )}

          {accomodations.length > 0 && (
            <Text className="text-[12px] text-[#7E7E7E]">
              🏡 Advantages: {renderList(accomodations)}
            </Text>
          )}
        </View>

        <View className="px-2 flex-row items-center justify-between mt-2">
          <Text className="font-manropeBold text-[16px] text-woofBrown-500">
            {backpackersTotal} backpackers hosted
          </Text>
          <Ionicons name="paw" size={20} color={COLORS.woofBrown[500]} />
        </View>
      </View>
    </View>
  );
}
