import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type NotifComponentProps = {
  id: number;
  image: ImageSourcePropType;
  image2x?: ImageSourcePropType;
  title: string;
  description: string;
  date: string;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

export default function NotifComponent({
  id,
  image,
  title,
  description,
  date,
}: NotifComponentProps) {
  return (
    <View className="w-full h-[120px] bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-500">
      {/* Image */}
      <View className="pl-4 items-center justify-center">
        <Image
          source={image}
          className="rounded-2xl h-[76px] w-[76px]"
          resizeMode="cover"
        />
      </View>

      {/* Texte */}
      <View className="flex-1 p-4 justify-center">
        {/* 🧩 Titre + Date alignés sur la même ligne */}
        <View className="flex-row justify-between items-center">
          <Text
            className="font-manropeBold text-[14px] flex-shrink"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="font-manropeBold text-[12px] text-[#7E7E7E] ml-2">
            {formatDate(date)}
          </Text>
        </View>

        {/* 🧾 Description */}
        <Text
          className="text-[12px] text-[#7E7E7E] mt-2 w-[220px]"
          numberOfLines={3}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
