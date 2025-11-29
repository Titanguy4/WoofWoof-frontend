// screens/DetailsScreen.tsx
import { getIconForAdvantage } from "@/constants/advantages";
import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

type Props = {
  id: string | string[] | undefined;
};

export default function DetailsScreen({ id }: Props) {
  const { medias, fetchStayPhotos } = useMedia();
  const { getStayById, loading: stayLoading, error: stayError } = useStay();
  const [stay, setStay] = useState<Stay | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //recuperation du stay avec l'id
  useEffect(() => {
    const loadStay = async () => {
      const stayData = await getStayById(Number(id));
      if (stayData) setStay(stayData);
    };
    loadStay();
  }, [id]);

  // Chargement des images après récupération du stay
  useEffect(() => {
    const loadImage = async () => {
      if (!stay) {
        return;
      }

      // On fetch TOUJOURS les photos, même si stay.photoId est vide
      const photos = await fetchStayPhotos(stay.id);

      if (photos && photos.length > 0) {
        setImageUrl(photos[0].url);
      } else {
        console.log("⚠️ Aucune photo trouvée pour ce stay");
      }
    };

    loadImage();
  }, [stay]);

  if (stayLoading || !stay) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>Loading stay...</Text>
      </SafeAreaView>
    );
  }

  if (stayError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>Error: {stayError}</Text>
      </SafeAreaView>
    );
  }

  // ⭐ Calcul du rating
  const rating =
    stay.reviews && stay.reviews.length > 0
      ? (
          stay.reviews.reduce((sum, r) => sum + r.rating, 0) /
          stay.reviews.length
        ).toFixed(1)
      : "0.0";

  const FeatureCard = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => {
    return (
      <View className="w-[78px] h-[78px] bg-white rounded-2xl border border-gray-300 items-center justify-center mx-2 mb-4">
        {icon}
        <Text className="text-xs text-gray-700 mt-2 text-center">{label}</Text>
      </View>
    );
  };

  const ReviewCard = ({
    id,
    rating,
    content,
    date,
  }: {
    id: number;
    rating: string;
    content: string;
    date: string;
  }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View className="w-[280px] bg-white rounded-2xl border border-gray-200 p-4 mr-4 shadow-sm">
        {/* Header */}
        <View className="flex-row items-center mb-3">
          <Image
            source={require("../assets/icons/default_profile.png")}
            className="w-[42px] h-[42px] rounded-full mr-3"
          />
          <View>
            <Text className="font-manropeBold text-base text-black">Name</Text>
            <Text className="text-xs text-gray-500">Country</Text>
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
          {content}
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
            <TouchableOpacity className="items-center justify-center z-10 ml-3 mt-4 w-12 h-12 bg-white rounded-full shadow-md">
              <Ionicons name="share-outline" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className="items-center justify-center z-10 ml-3 mt-4 w-12 h-12 bg-white rounded-full shadow-md">
              <Ionicons name="heart-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[275] "
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[275px] bg-gray-200 flex items-center justify-center">
            <Text className="text-gray-400">Loading...</Text>
          </View>
        )}
        <View className="p-4">
          <Text className="text-2xl font-manropeBold mb-2">{stay.title}</Text>
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base text-gray-700">
              📍 {stay.localisation}
            </Text>
            <Text className="text-sm text-gray-500">
              ⭐ {rating} ({stay.reviews ? stay.reviews.length : 0} reviews)
            </Text>
          </View>
          <Text className="text-base text-gray-700 mb-4">
            {stay.activities[0]?.label}
          </Text>
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
          <Text className="text-xl mt-4 font-manropeBold mb-2">
            Description
          </Text>
          <Text className="text-base text-gray-700">{stay.description}</Text>
          <Text className="text-xl mt-4 font-manropeBold mb-2">
            What this missions offers
          </Text>
          {stay.accomodations && stay.accomodations.length > 0 && (
            <View className="mt-3 items-center justify-center border-b border-b-gray-300 mb-4">
              <View className="flex-row flex-wrap justify-start">
                {stay.accomodations.map((adv, index) => (
                  <FeatureCard
                    key={index}
                    icon={
                      <Ionicons
                        name={getIconForAdvantage(adv.label) as any}
                        size={24}
                        color={COLORS.woofDarkGrey}
                      />
                    }
                    label={adv.label}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
        <View className="px-4 flex-row items-center justify-between mb-4">
          <Text className="text-xl font-manropeBold mb-2">
            ⭐ {rating} ({stay.reviews ? stay.reviews.length : 0} reviews)
          </Text>
          <Text className="text-lg text-black underline font-manrope mb-2">
            Show all
          </Text>
        </View>
        {stay.reviews && stay.reviews.length > 0 && (
          <View className="px-4 pb-4">
            <Text className="text-xl font-manropeBold mb-3">Reviews</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {stay.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  id={review.id}
                  rating={String(review.rating)}
                  date={review.date ?? ""}
                  content={review.content ?? ""}
                />
              ))}
            </ScrollView>
          </View>
        )}
        <View className="mx-4 border-b border-b-gray-300 "></View>
        <View className="px-4 mt-4 mb-4">
          <Text className="text-xl font-manropeBold mb-2">Location</Text>
          <Text className="text-lg text-woofDarkGrey font-manrope mb-2">
            {stay.localisation}
          </Text>
          <Text className="self-end text-lg text-black underline font-manrope mb-4">
            Go to maps
          </Text>
        </View>
        <View className="mx-4 border-b border-b-gray-300 mb-4"></View>
        <View className="items-center mb-4">
          <TouchableOpacity
            onPress={() => router.push(`/missionrequest/${id}`)}
            className="bg-woofBrown-500 w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center mb-6"
          >
            <Text className="text-base font-manropeBold text-white">Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
