import React from "react";
import { Image, Text, View } from "react-native";

type MyMissionsCardProps = {
  id: number;
  stayTitle: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  stayRegion: string;
  stayDepartment: string;
  imageUrl: string;
};

export default function MyMissionsCard({
  id,
  stayTitle,
  startDate,
  endDate,
  status,
  imageUrl,
  stayRegion,
  stayDepartment,
}: MyMissionsCardProps) {
  const formatStartDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
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
      case "PENDING":
        return "Pending ⏱";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected ❌";
      case "CANCELLED":
        return "Completed ✔";
      default:
        return status;
    }
  };

  return (
    <View className="w-full h-[140px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-500">
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="h-full w-[115px]"
          resizeMode="cover"
        />
      </View>

      {/* Texte */}
      <View className="p-3 flex-1">
        <Text className="font-manropeBold text-[16px] mb-2" numberOfLines={1}>
          {stayTitle}
        </Text>

        <Text
          className="font-manrope text-[12px] text-[#7E7E7E] mb-1"
          numberOfLines={2}
        >
          {stayRegion},{"\n"}
          {stayDepartment}
        </Text>

        <Text
          className="font-manropeBold text-[12px] text-black mb-3"
          numberOfLines={2}
        >
          {`${formatStartDate(startDate)} - ${formatEndDate(endDate)}`}
        </Text>

        <Text
          className="font-manropeBold text-[16px] text-woofBrown-500"
          numberOfLines={2}
        >
          {formatStatus(status)}
        </Text>
      </View>
    </View>
  );
}
