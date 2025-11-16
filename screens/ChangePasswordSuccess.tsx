import { COLORS } from "@/utils/constants/colors";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordSuccess() {
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofCream[500][500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500][500]} style="dark" />

      {/* Contenu principal */}
      <View className="px-6 mt-6">
        <View className="p-6">
          <View className="items-center">
            <Image
              source={require("../assets/images/doglogo.png")}
              className="w-[190px] h-[181px] mb-10"
              resizeMode="contain"
            />

            <Text className="text-woofBrown font-manropeBold text-lg mb-12">
              Change password successfully!
            </Text>

            <Text
              numberOfLines={2}
              className="text-black font-manropeSemiBold text-base mb-8 text-center"
            >
              You have successfully change password. Please use the new password
              when Sign in.
            </Text>
          </View>

          <TouchableOpacity
            className="bg-woofBrown rounded-2xl py-3 items-center"
            onPress={() => {
              router.push("/(tabs)/explore");
            }}
          >
            <Text className="font-manropeBold text-base text-white">Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
