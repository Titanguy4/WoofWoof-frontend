import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeMissionCard from "../components/HomeMissionCard";
import { COLORS } from "../constants/colors";
import { missionsAnimal, missionsCultural, missionsEnv, missionsFarm, missionsNearby } from "../data/missions";

export default function ExploreScreen() {
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />
      <View className="bg-woofBrown h-[128px] px-4  ">
        <View className="flex-row  ">
          <View className="h-[48px] w-[267px] gap-2  ">
            <Text className="text-base font-manrope text-white ">
              Find your place to make an impact
            </Text>
            <Text className="text-xl font-manropeBold text-black  ">
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
        <View className="flex-row items-center mt-5">
          <View className="flex-row items-center bg-white rounded-3xl h-[48px] flex-1 mr-[10px]">
            <TouchableOpacity
              onPress={() => router.push('/search')}
              className="flex-row items-center flex-1"
            >
              <Text
                style={{ color: COLORS.woofGrey }}
                className="flex-1 text-[15px] font-manropeMedium ml-4"
              >
                Where do you want to help?
              </Text>
            </TouchableOpacity>
            <Ionicons className="mr-[14px]" name="search" size={20} color={COLORS.woofGrey} />
          </View>
          <Image
            source={require("../assets/images/maps.png")}
            className="w-[48px] h-[48px]"
            resizeMode="contain"
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-woofCream "
        contentContainerClassName=""
      >
        {/* Nearby */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            Nearby
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            Show all
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsNearby.map((mission) => (
              <HomeMissionCard key={mission.id} {...mission} />
            ))}
          </ScrollView>
        </View>
        {/* Farm work */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            Farm work
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            Show all
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsFarm.map((mission) => (
              <HomeMissionCard key={mission.id} {...mission} />
            ))}
          </ScrollView>
        </View>
        {/* Animal care */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            Animal care
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            Show all
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsAnimal.map((mission) => (
              <HomeMissionCard key={mission.id} {...mission} />
            ))}
          </ScrollView>
        </View>
        {/* Environmental Projects */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            Environmental Projects
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            Show all
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsEnv.map((mission) => (
              <HomeMissionCard key={mission.id} {...mission} />
            ))}
          </ScrollView>
        </View>
        {/* Community & Cultural Support */}
        <View className="px-4 flex-row justify-between items-center  ">
          <Text className="font-manropeBold text-lg mt-4  ">
            Community & Cultural Support
          </Text>
          <Text className="font-manropeSemiBold underline text-xs mt-4  ">
            Show all
          </Text>
        </View>
        <View className="px-4 mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {missionsCultural.map((mission) => (
              <HomeMissionCard key={mission.id} {...mission} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
