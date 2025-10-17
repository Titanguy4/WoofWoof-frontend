import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

      <ScrollView
        className="flex-1 bg-woofCream"
        showsVerticalScrollIndicator={false}
      >
        {/* === HEADER AVEC LE CHIEN === */}
        <View className="w-full h-[230px] -ml-9 bg-[#F6E9D8] items-center justify-center">
          <Image
            source={require("../assets/images/dogheader.png")}
            className="w-[180px] h-[180px]"
            resizeMode="contain"
          />
        </View>

        {/* === CARTE PROFIL === */}
        <View className="bg-white mx-4 -mt-36 rounded-2xl shadow p-4">
          
          {/* --- Ligne 1 : Photo + Nom + Upgrade + Edit --- */}
          <View className="flex-row items-center">
            <Image
              source={require("../assets/images/brookeprofile.png")}
              className="w-[40px] h-[40px] rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="font-manropeBold text-base text-black">
                Brooke Davis
              </Text>
              <Text className="font-manrope text-sm text-[#A6A9AC]">
                brookedavis@gmail.com
              </Text>
            </View>
            <View className="bg-woofBrown px-3 py-1 rounded-full">
              <Text className="text-[12px] font-manropeSemiBold text-white">
                Upgrade
              </Text>
            </View>
            <Image
              source={require("../assets/icons/edit.png")}
              className="w-[20px] h-[20px] ml-4"
            />
          </View>

          {/* --- Ligne 2 : Maison + Woofer + Volunteers --- */}
          <View className="flex-row rounded-lg border border-woofGreyBorder items-center justify-between mt-4">
            <View className="flex-row items-center">
              <Image
                source={require("../assets/images/home.png")}
                className="w-[36px] h-[30px] mr-2"
                resizeMode="contain"
              />
              <Text className="font-manropeMedium text-base text-black">
                Woofer
              </Text>
            </View>

            <Text className="font-manropeSemiBold text-sm text-[#FF8243]">
              27 Volunteers hosted
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
