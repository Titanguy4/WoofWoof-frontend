import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { COLORS } from "../constants/colors";
import { Stay as StayType } from "../type/stayservice/Stay";

type HomeMissionCardProps = {
    stay: StayType;
    image: ImageSourcePropType;
    heart?: boolean;
};


export default function HomeMissionCard({ stay, heart = false, image }: HomeMissionCardProps) {
  const { id_stay, title, description, localisation, region, department, status, accomodations, reviews, learningSkills, meals, activities } = stay;

  const distance = "5 km away"; // Placeholder
  const longitude = localisation[1];
  const latitude = localisation[0]; 

  const accomodation_list = accomodations.map((item) => item.label).join(", ");
  const activity_list = activities.map((item) => item.label).join(", ");
  const learningSkill_list = learningSkills.map((item) => item.label).join(", ");
  const meal_list = meals.map((item) => item.label).join(", ");

  const rating = (reviews ?? []).length > 0
    ? ((reviews ?? []).reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1): "No rating";
    
    return (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/details/[id]",
              params: { id: String(id_stay) },
            })
          }
          className="w-[165px] h-[250px] bg-white rounded-2xl mr-4 overflow-hidden"
        >
            {/* Image */}
            <View className="relative">
                <Image source={image} className="w-full h-[148px]" resizeMode="cover" />
                {heart && (
                    <Ionicons className="absolute top-2 right-2" name="heart" size={20} color={COLORS.woofHeart} />
                )}
            </View>

            {/* Texte */}
            <View className="p-3">
                <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
                    {title}
                </Text>
                <Text className="text-[12px] text-[#7E7E7E] mt-[2px]" numberOfLines={1}>
                    {department}, {region}
                </Text>
                <View className="flex-row items-center mt-2">
                    <Ionicons name="star" size={14} color="#F4B400" />
                    <Text className="ml-1 text-[12px] font-manropeMedium">
                        {rating}
                    </Text>
                    <Text className="ml-2 text-[12px] text-[#7E7E7E]">{distance}</Text>
                </View>
                <View className="flex-row items-center mt-1">
                    <Text className="ml-1 text-[12px] text-[#7E7E7E]">
                        {accomodation_list}
                    </Text>
                </View>
                    <View className="mt-3 rounded-xl overflow-hidden h-[80px]">
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            pitchEnabled={false}
                            rotateEnabled={false}
                        >
                            <Marker coordinate={{ latitude, longitude }} />
                        </MapView>
                    </View>
            </View>
        </TouchableOpacity>
    );
}
