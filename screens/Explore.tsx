import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HomeMissionCard from "../components/HomeMissionCard";


export default function ExploreScreen() {
  const { t } = useTranslation("explore");
  const { getAllStays, loading } = useStay();
  const [stays, setStays] = useState<Stay[]>([]);

  /** 🔥 Charger toutes les missions du backend */
  useEffect(() => {
    const load = async () => {
      const s = await getAllStays();

      if (s) {
        setStays(s);
      }
    };
    load();
  }, []);

  /** 🔥 Filtrage par type */
  const missionsNearby = stays;
  const missionsFarm = useMemo(() => {
    const res = stays.filter((s) => s.type === "FARM");
    return res;
  }, [stays]);

  const missionsAnimal = useMemo(() => {
    const res = stays.filter((s) => s.type === "ANIMAL");
    return res;
  }, [stays]);

  const missionsEnv = useMemo(() => {
    const res = stays.filter((s) => s.type === "ENVIRONMENTAL");
    return res;
  }, [stays]);

  const missionsCultural = useMemo(() => {
    const res = stays.filter((s) => s.type === "CULTURAL");
    return res;
  }, [stays]);


  return (
    <>
      <View className="bg-woofBrown-500 p-4 gap-y-3">
        <View className="flex-row pt-safe ">
          <View className="h-[48px] w-[267px] gap-2  ">
            <Text className="text-base font-manrope text-white ">
              Find your place to make an impact
            </Text>
            <Text className="text-xl font-manropeBold">
              WOOF WOOF !
            </Text>
          </View>
          <View className="flex-row justify-end items-center gap-2 flex-1">
            <TouchableOpacity onPress={() => router.push("/chat")}>
              <Image
                source={require("../assets/icons/message-2.png")}
                className="w-10 h-10  "
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Image
                source={require("../assets/icons/notif.png")}
                className="w-10 h-10  "
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="flex-row items-center bg-white rounded-3xl h-[48px] flex-1 mr-[10px]">
            <TouchableOpacity
              onPress={() => router.push("/search")}
              className="flex-row items-center flex-1"
            >
              <Text
                style={{ color: COLORS.woofGrey[500] }}
                className="flex-1 text-[15px] font-manropeMedium ml-4"
              >
                {t("search.placeholder")}
              </Text>
            </TouchableOpacity>
            <Ionicons
              className="mr-[14px]"
              name="search"
              size={20}
              color={COLORS.woofGrey[500]}
            />
          </View>
          <TouchableOpacity onPress={() => router.push("/map")}>
            <Image
              source={require("../assets/images/maps.png")}
              className="w-10 h-10  "
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-woofCream-500 "
        contentContainerClassName=""
      >
        {/* Nearby */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            {t("sections.nearby")}
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            {t("sections.showAll")}
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsNearby.map((stay) => (
              <HomeMissionCard key={stay.id} stay={stay} />
            ))}
          </ScrollView>
        </View>
        {/* Farm work */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            {t("sections.farm")}
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            {t("sections.showAll")}
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsFarm.map((stay) => (
              <HomeMissionCard key={stay.id} stay={stay} />
            ))}
          </ScrollView>
        </View>
        {/* Animal care */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            {t("sections.animal")}
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            {t("sections.showAll")}
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsAnimal.map((stay) => (
              <HomeMissionCard key={stay.id} stay={stay} />
            ))}
          </ScrollView>
        </View>
        {/* Environmental Projects */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            {t("sections.environment")}
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            {t("sections.showAll")}
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsEnv.map((stay) => (
              <HomeMissionCard key={stay.id} stay={stay} />
            ))}
          </ScrollView>
        </View>
        {/* Community & Cultural Support */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            {t("sections.community")}
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            {t("sections.showAll")}
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsCultural.map((stay) => (
              <HomeMissionCard key={stay.id} stay={stay} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}
