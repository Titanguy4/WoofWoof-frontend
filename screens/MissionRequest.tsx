// screens/DetailsScreen.tsx
import ApplyMissionCard from "@/components/ApplyMissionCard";
import { isValidEmail, isValidPhone } from "@/constants/validation";
import { missionsAnimal, missionsCultural, missionsEnv, missionsFarm, missionsNearby } from "@/data/missions";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";


type Props = {
  id: string | string[] | undefined;
};

export default function DetailsScreen({ id }: Props) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

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



  const isFormValid = isValidEmail(email) && isValidPhone(number);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color={COLORS.woofBrown} />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[90px]">Mission request</Text>
      </View>

      <ScrollView className="flex-1 bg-woofCream px-4">
        <View className="items-center mt-4">
          <ApplyMissionCard key={mission.id} {...mission} />
        </View>

        {/* Mission info */}
        <View className="rounded-2xl mt-4 px-4 bg-white">
          <View className="py-4 border-b border-gray-300">
            <Text className="text-lg font-manropeBold">Your Mission</Text>
          </View>
          <View className="mt-4">
            <Text className="text-base font-manropeBold">Start</Text>
          </View>
          <View>
            <Text className="text-base font-manropeBold">End</Text>
          </View>
        </View>

        {/* Conditions */}
        <View className="rounded-2xl mt-4 px-4 bg-white">
          <View className="py-4 border-b border-gray-300">
            <Text className="text-lg font-manropeBold">Mission conditions</Text>
          </View>
          <View className="mt-4 px-4 mb-4">
            {mission.advantages?.map((advantage, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-2"
              >
                <Text className="text-[14px] text-gray-700">{advantage}</Text>
                <Text className="text-[14px] text-green-600">✔</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Email */}
        <View className="rounded-2xl mt-4 px-4 bg-white">
          <View className="py-4 border-b border-gray-300">
            <Text className="text-lg font-manropeBold">Email</Text>
          </View>
          <View className="flex-row items-center my-4 bg-white border border-gray-300 rounded-3xl h-[52px] flex-1">
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={COLORS.woofGrey}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-[15px] font-manropeMedium ml-4"
            />
          </View>
        </View>

        {/* Phone */}
        <View className="rounded-2xl mt-4 mb-4 px-4 bg-white">
          <View className="py-4 border-b border-gray-300">
            <Text className="text-lg font-manropeBold">Number</Text>
          </View>
          <View className="flex-row items-center my-4 bg-white border border-gray-300 rounded-3xl h-[52px] flex-1">
            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.woofGrey}
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
              className="flex-1 text-[15px] font-manropeMedium ml-4"
            />
          </View>
        </View>

        {/* Apply button */}
        <View className="items-center mb-4">
          <TouchableOpacity
            disabled={!isFormValid}
            onPress={() => router.push(`/requestsuccess/${id}`)}
            className={`w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center mb-6 ${
              isFormValid ? "bg-woofBrown" : "bg-gray-400"
            }`}
          >
            <Text className="text-base font-manropeBold text-white">
              Apply now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
