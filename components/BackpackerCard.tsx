import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import profileImage from "../assets/icons/avatar2.png";

type BackpackerCardProps = {
  id: number;
  // pour l'instant profileimage name et age optionnels car on a pas utilisé encore keycloak
  //profileImage?: ImageSourcePropType;
  //name?: string;
  //age?: number;
  email: string;
  number: string;
  stayId: number;
  stayTitle: string;
  startDate: string;
  endDate: string;
};

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

export default function BackpackerCard({
  id,
  email,
  number,
  stayId,
  stayTitle,
  startDate,
  endDate,
}: BackpackerCardProps) {


  return (
    <View className="bg-white flex-row h-[108px] border-woofBrown-500 items-center border rounded-xl px-4 py-5 mb-3">
      <Image
        source={profileImage}
        className="w-[48px] h-[47px] rounded-full mr-6"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="font-manropeBold text-[14px] mb-1">{email}</Text>

        <Text className="text-woofGrey-900 text-[12px]">
          <Text className="font-manropeBold">Number: </Text>
          {number}
        </Text>

        <Text className="text-woofGrey-900 text-[12px]">
          <Text className="font-manropeBold">Mission: </Text>
          {stayTitle}
        </Text>

        <Text className="text-woofGrey-900 text-[12px]">
          <Text className="font-manropeBold">Dates: </Text>
          {`${formatStartDate(startDate)} - ${formatEndDate(endDate)}`}
        </Text>
      </View>
      <View className="w-[61px] h-full py-2">
        <TouchableOpacity className="bg-woofBrown-500 w-full h-[24px] px-3 py-1 rounded-2xl items-center justify-center mb-2">
          <Text className="text-xs font-manropeBold text-white">Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-woofCream-500 w-full h-[24px] px-3 py-1 rounded-2xl items-center justify-center">
          <Text className="text-xs font-manropeBold text-woofBrown-500">
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
