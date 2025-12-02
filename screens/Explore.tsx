import map from "@/assets/images/maps.png";
import woofwoof from "@/assets/images/tete-chien.png";
import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { useAuth } from "@/utils/auth/AuthContext";
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
  const { isAuthenticated } = useAuth();

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
      <View className="bg-woofBrown-500 p-4 gap-x-8 pt-safe flex-row items-center">
        <Image source={woofwoof} className="w-14 h-14" />
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

      <TouchableOpacity
        className="absolute bottom-0 right-0 m-5 border-4 border-woofBrown-300 rounded-full"
        onPress={() => {
          if (isAuthenticated) {
            router.push("/map");
          } else {
            router.push("/(tabs)/profile");
          }
        }}
      >
        <Image source={map} className="w-20 h-20" />
      </TouchableOpacity>
    </>
  );
}
