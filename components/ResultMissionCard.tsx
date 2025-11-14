import { router } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type ResultMissionCardProps = {
    id: number;
    image: ImageSourcePropType;
    image2x?: ImageSourcePropType;
    title: string;
    location: string;
    description: string;
    advantages: string[];
    locationDetails?: string;
};

export default function ResultMissionCard({
    id,
    image,
    title,
    location,
    advantages,
}: ResultMissionCardProps) {
    return (
        <TouchableOpacity onPress={() => router.push(`/details/${id}`)} className="w-full h-[180px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown relative">
            

            {/* Image */}
            <Image source={image} className="h-full w-[115px]" resizeMode="cover" />

            {/* Texte */}
            <View className="p-3">
                <Text className="font-manropeBold text-[14px]" numberOfLines={1}>
                    {title}
                </Text>

                <View className="w-[220px] mb-4">
                    <Text className="text-[12px] text-[#7E7E7E] mt-1" numberOfLines={2}>
                        {location}
                    </Text>
                </View>

                <Text className="font-manropeBold text-[14px] mt-1">
                    Mission details
                </Text>

                <View className="mt-1 gap-y-1">
                    {advantages.map((adv, index) => (
                        <Text key={index} className="text-[12px] text-[#7E7E7E]">
                            • {adv}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}
