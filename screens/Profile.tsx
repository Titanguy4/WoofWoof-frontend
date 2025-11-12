import LanguageModal from "@/components/LanguageModal";
import LogoutModal from "@/components/LogoutModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";


export default function ProfileScreen() {

  const [logoutVisible, setLogoutVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);

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
        <View className="bg-white mx-4 -mt-36 mb-2 rounded-2xl shadow p-4">

          {/* --- Ligne 1 : Photo + Nom + Upgrade + Edit --- */}
          <View className="flex-row items-center">
            <Image
              source={require("../assets/images/scoobyprofile.png")}
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
            <TouchableOpacity onPress={() => router.push('/editProfile')}>
              <Image
                source={require("../assets/icons/edit.png")}
                className="w-[20px] h-[20px] ml-4"
              />
            </TouchableOpacity>
          </View>

          {/* --- Ligne 2 : Maison + Woofer + Volunteers --- */}
          <View className="py-3 px-4 flex-row rounded-lg border border-woofGreyBorder items-center justify-between mt-4">
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

            <Text className="font-manropeSemiBold text-base text-woofBrown">
              27 Volunteers hosted
            </Text>
          </View>
        </View>
        <View className="bg-white px-4 gap-y-1">
          <Text className="mt-3 text-lg text-black font-manrope">
            General
          </Text>
          <TouchableOpacity onPress={() => setLanguageVisible(true)} className="flex-row py-3 items-center justify-between">

            <View className="flex-row items-center">
              <Ionicons name="globe-outline" size={30} />
              <Text className="ml-3 text-xl text-black font-manropeBold">
                Language
              </Text>
            </View>
            <MaterialIcons name="chevron-right" className="start-end" size={24} color={COLORS.woofDarkGrey} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row py-3 mb-4 items-center justify-between">

            <View className="flex-row items-center">
              <Ionicons name="notifications" size={30} />
              <Text className="ml-3 text-xl text-black font-manropeBold">
                Notifications
              </Text>
            </View>
            <MaterialIcons name="chevron-right" className="start-end" size={24} color={COLORS.woofDarkGrey} />
          </TouchableOpacity>
        </View>
        <View className="bg-white px-4 gap-y-1">
          <View className="border-t border-woofGrey"></View>
          <Text className="mt-3 text-lg text-black font-manrope">
            Preferences
          </Text>
          <View className="flex-row py-3 items-center justify-between">

            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={30} color="black" />
              <Text className="ml-3 text-xl text-black font-manropeBold">
                Legal & Policies
              </Text>
            </View>
            <MaterialIcons name="chevron-right" className="start-end" size={24} color={COLORS.woofDarkGrey} />
          </View>
          <View className="flex-row py-3 items-center justify-between">

            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={30} />
              <Text className="ml-3 text-xl text-black font-manropeBold">
                Help & Support
              </Text>
            </View>
            <MaterialIcons name="chevron-right" className="start-end" size={24} color={COLORS.woofDarkGrey} />
          </View>
          <TouchableOpacity
            className="flex-row py-3 items-center justify-between"
            onPress={() => setLogoutVisible(true)}
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={30} />
              <Text className="ml-3 text-xl text-black font-manropeBold">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ MODAL LOGOUT */}
      <LogoutModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
      />

      <LanguageModal
        visible={languageVisible}
        onClose={() => setLanguageVisible(false)}
      />

    </SafeAreaView>
  );
}
