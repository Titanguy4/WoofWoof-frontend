import NotifComponent from "@/components/NotifComponent";
import { notifications } from "@/data/notifications";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500]}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[99.5px]">
          Notifications
        </Text>
      </View>

      {/* Contenu principal */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="items-center gap-y-6 mt-4">
          {notifications.map((n) => (
            <NotifComponent key={n.id} {...n} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
