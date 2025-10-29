// screens/DetailsScreen.tsx
import { getIconForAdvantage, missionsAnimal, missionsCultural, missionsEnv, missionsFarm, missionsNearby, } from "@/data/missions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

type Props = {
  id: string | string[] | undefined;
};

export default function DetailsScreen({ id }: Props) {
  // Combine toutes les missions
  const allMissions = [
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ];

  // Trouve la mission correspondant à l'id
  const mission = allMissions.find((m) => m.id.toString() === id);

  if (!mission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">Mission not found</Text>
      </View>
    );
  }

  const FeatureCard = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => {
    return (
      <View className="w-[78px] h-[78px] bg-white rounded-2xl border border-gray-300 items-center justify-center mx-3 mb-4">
        {icon}
        <Text className="text-xs text-gray-700 mt-2 text-center">{label}</Text>
      </View>
    );
  };

  const ReviewCard = ({
    name,
    country,
    date,
    rating,
    comment,
    image,
  }: {
    name: string;
    country: string;
    date: string;
    rating: string;
    comment: string;
    image?: any;
  }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View className="w-[280px] bg-white rounded-2xl border border-gray-200 p-4 mr-4 shadow-sm">
        {/* Header */}
        <View className="flex-row items-center mb-3">
          <Image
            source={image || require("../assets/icons/default_profile.png")}
            className="w-[42px] h-[42px] rounded-full mr-3"
          />
          <View>
            <Text className="font-manropeBold text-base text-black">{name}</Text>
            <Text className="text-xs text-gray-500">{country}</Text>
          </View>
        </View>

        {/* Rating + Date */}
        <View className="flex-row items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name="star"
              size={14}
              color={i < Math.round(Number(rating)) ? "#F4B400" : "#D1D5DB"}
            />
          ))}
          <Text className="text-xs text-gray-400 ml-2">{date}</Text>
        </View>

        {/* Commentaire avec expansion */}
        <Text
          className="text-sm text-gray-700 leading-5"
          numberOfLines={expanded ? undefined : 3}
        >
          {comment}
        </Text>

        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text className="text-sm text-blackfont-manrope mt-2 underline">
            {expanded ? "Read less" : "Read more"}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />
      <ScrollView className="flex-1 bg-white">
        <View className="flex-row mx-3 -mb-16 justify-between items-center">
          {/* Chevron gauche */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center z-10 mt-4 w-12 h-12 bg-white rounded-full shadow-md"
          >
            <MaterialIcons name="chevron-left" size={24} color="black" />
          </TouchableOpacity>

          {/* Conteneur des 2 chevrons droits */}
          <View className="flex-row items-center">
            <TouchableOpacity
              className="items-center justify-center z-10 ml-3 mt-4 w-12 h-12 bg-white rounded-full shadow-md"
            >
              <Ionicons name="share-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              className="items-center justify-center z-10 ml-3 mt-4 w-12 h-12 bg-white rounded-full shadow-md"
            >
              <Ionicons name="heart-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={mission.image2x ? mission.image2x : mission.image} className="w-full h-[275] " resizeMode="cover" />
        <View className="p-4">
          <Text className="text-2xl font-manropeBold mb-2">{mission.title}</Text>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base text-gray-700">📍 {mission.location}</Text>
            <Text className="text-sm text-gray-500">
              ⭐ {mission.rating} ({mission.reviews ? mission.reviews.length : 0} reviews)
            </Text>
          </View>
          <Text className="text-base text-gray-700 mb-4">{mission.housing}</Text>
          <View className="py-5 border-t border-b border-t-gray-300 border-b-gray-300 flex-row items-center">
            <Image
              source={require("../assets/images/brookeprofile.png")}
              className="w-[40px] h-[40px] rounded-full"
            />
            <View className="ml-4 flex-1">
              <View className="flex-row items-center">
                <Text className="font-manropeBold text-lg text-black mr-1">
                  Brooke Davis
                </Text>
                <Image
                  source={require("../assets/icons/house_icon.png")}
                  className="w-[24px] h-[20px]"
                />
              </View>
              <Text className="font-manrope text-base text-woofDarkGrey">
                Woofer
              </Text>
            </View>
            <Image
              source={require("../assets/icons/message.png")}
              className="w-[28px] h-[28px] mr-4"
            />
          </View>
          <Text className="text-xl mt-4 font-manropeBold mb-2">Description</Text>
          <Text className="text-base text-gray-700">{mission.description}</Text>
          <Text className="text-xl mt-4 font-manropeBold mb-2">What this missions offers</Text>
          {mission.advantages && mission.advantages.length > 0 && (
            <View className="mt-3 items-center justify-center border-b border-b-gray-300 mb-4">
              <View className="flex-row flex-wrap justify-start">
                {mission.advantages.map((adv, index) => (
                  <FeatureCard
                    key={index}
                    icon={
                      <Ionicons
                        name={getIconForAdvantage(adv) as any}
                        size={24}
                        color={COLORS.woofDarkGrey}
                      />
                    }
                    label={adv}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
        <View className="px-4 flex-row items-center justify-between mb-4">
          <Text className="text-xl font-manropeBold mb-2">
            ⭐ {mission.rating} ({mission.reviews ? mission.reviews.length : 0} reviews)
          </Text>
          <Text className="text-lg text-black underline font-manrope mb-2">
            Show all
          </Text>
        </View>
        {mission.reviews && mission.reviews.length > 0 && (
          <View className="px-4 pb-4">
            <Text className="text-xl font-manropeBold mb-3">Reviews</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {mission.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  country={review.country}
                  date={review.date}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))}
            </ScrollView>
          </View>
        )}
        <View className="mx-4 border-b border-b-gray-300 "></View>
        <View className="px-4 mt-4 mb-4">
          <Text className="text-xl font-manropeBold mb-2">
            Location
          </Text>
          <Text className="text-lg text-woofDarkGrey font-manrope mb-2">
            {mission.locationDetails}
          </Text>
          <Text className="self-end text-lg text-black underline font-manrope mb-4">
            Go to maps
          </Text>
        </View>
        <View className="mx-4 border-b border-b-gray-300 mb-4"></View>
        <View className="items-center mb-4">
          <TouchableOpacity onPress={() => router.push(`/missionrequest/${id}`)} className="bg-woofBrown w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center mb-6">
            <Text className="text-base font-manropeBold text-white">
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
