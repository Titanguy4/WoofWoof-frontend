import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackpackerCard from "../components/BackpackerCard";
import { COLORS } from "../constants/colors";
import { backpackers } from "../data/backpackers";

export default function BackPackers() {
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color={COLORS.woofBrown} />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[105px]">Backpackers</Text>
      </View>

      {/* Contenu principal */}
      <ScrollView className="flex-1 bg-woofCream px-4">
        <View className="mt-4">
          {backpackers.map((b) => (
            <BackpackerCard
              key={b.id}
              {...b}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
