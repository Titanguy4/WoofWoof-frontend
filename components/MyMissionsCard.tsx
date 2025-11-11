import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type MyMissionsCardProps = {
    id: number;
    image: ImageSourcePropType;
    image2x?: ImageSourcePropType;
    title: string;
    location: string;
    rating: string;
    distance: string;
    housing: string;
    description?: string;
    advantages?: string[];
    reviews?: any[];
    locationDetails?: string;
    startDate: string;
    endDate: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
};

export default function MyMissionsCard({
    id,
    image,
    title,
    location,
    rating,
    distance,
    housing,
    locationDetails,
    startDate,
    endDate,
    status,
}: MyMissionsCardProps) {

    const formatStartDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month}`;
    };

    const formatEndDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const formatStatus = (status: string) => {
        switch (status) {
            case "pending": return "Pending ⏱";
            case "accepted": return "Accepted";
            case "rejected": return "Rejected ❌";
            case "completed": return "Completed ✔";
            default: return status;
        }
    };



    return (
        <View className="w-full h-[122px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown">

            {/* Image */}
            <View className="relative">
                <Image source={image} className="h-full w-[115px]" resizeMode="cover" />
            </View>

            {/* Texte */}
            <View className="p-3 flex-1">

                <Text className="font-manropeBold text-[16px] mb-2" numberOfLines={1}>
                    {title}
                </Text>

                <Text className="font-manrope text-[12px] text-[#7E7E7E] mb-1" numberOfLines={2}>
                    {location}
                </Text>

                <Text className="font-manropeBold text-[12px] text-black mb-3" numberOfLines={2}>
                    {`${formatStartDate(startDate)} - ${formatEndDate(endDate)}`}
                </Text>

                <Text className="font-manropeBold text-[16px] text-woofBrown" numberOfLines={2}>
                    {formatStatus(status)}
                </Text>

            </View>
        </View>
    );
}
