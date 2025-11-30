import { Stay } from "@/types/stayservice/Stay";
import { router } from "expo-router";
import { Check } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface StayCardProps {
  stay: Stay;
  isSelected?: boolean;
  onToggle?: (stayId: number) => void;
  fullWidth?: boolean;
}

export const StayCard: React.FC<StayCardProps> = ({
  stay,
  isSelected = false,
  onToggle,
  fullWidth = false,
}) => {
  const { t } = useTranslation("roadtrip");

  const handlePress = () => {
    if (onToggle) {
      onToggle(stay.id);
    }
  };

  return (
    <View
      style={
        fullWidth ? { width: "100%" } : { width: width - 32, marginRight: 16 }
      }
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={onToggle ? 0.9 : 1}
        disabled={!onToggle}
        className={`relative ${isSelected ? "border-4 border-woofBrown-500 rounded-3xl" : ""}`}
      >
        {isSelected && (
          <View className="absolute top-4 right-4 z-10 bg-woofBrown-500 rounded-full p-2 shadow-lg">
            <Check size={24} color="white" />
          </View>
        )}

        <View className="w-full min-h-44 bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-200">
          <Image
            source={{
              uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvoyageforum.info%2Fimages%2Fhd%2Fposts%2Fopenmedium%2F1565809766-obt29F7ycgZ5Gwd.jpeg&f=1&nofb=1&ipt=293bb6071a66312150a9d449698c8e1ddfa64514f8f144f18e9e037c02062776",
            }}
            className="h-full w-[115px]"
            resizeMode="cover"
          />

          <View className="p-3 flex-1 justify-between">
            <View>
              <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
                {stay.title}
              </Text>
              <Text
                className="font-manrope text-[12px] mt-1 text-gray-600"
                numberOfLines={2}
              >
                {stay.description}
              </Text>
            </View>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                router.push(`/details/${stay.id}`);
              }}
              className="bg-woofCream-200 p-3 rounded-3xl"
            >
              <Text className="text-woofBrown-700 font-manropeSemiBold text-[13px]">
                {t("actions.viewMore")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
