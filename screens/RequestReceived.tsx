import { COLORS } from "@/utils/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestReceivedScreen() {
  const { location, name } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="rounded-2xl items-center mt-12 px-4 bg-white">
          <View className="px-4 py-10 border-b border-gray-300 w-full items-center">
            <Image
              source={require("../assets/images/doglogo.png")}
              className="w-[147px] h-[139px] self-center"
            />
            <Text className="text-2xl mt-2 mb-3 font-manropeBold">
              Request received
            </Text>
            <Text className="text-base font-manropeBold">
              We will get you back shortly !{" "}
            </Text>
          </View>

          {/* --- Mission details --- */}
          <View className="px-4 py-7 border-b border-gray-300 w-full">
            <Text className="text-lg font-manropeBold mb-2">{name}</Text>
            <Text className="text-sm font-manrope mb-6 text-woofDarkGrey">
              {location}
            </Text>

            {/* 👤 User Info */}
            <Text className="text-lg font-manropeBold mb-2">Brooke Davis</Text>
            <Text className="text-sm font-manrope mb-2 text-woofDarkGrey">
              brookedavis@gmail.com
            </Text>
            <Text className="text-sm font-manrope text-woofDarkGrey">
              +33 796 000 000
            </Text>
          </View>

          {/* --- Buttons --- */}
          <View className="w-full px-10 items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/myoffer")}
              className="bg-woofBrown-500 w-full h-14 px-3 py-1 mt-7 rounded-2xl items-center justify-center mb-6"
            >
              <Text className="text-base font-manropeBold text-white">
                View Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
              className="bg-white border border-gray-300 w-full h-14 px-3 py-1 rounded-2xl items-center justify-center mb-6"
            >
              <Text className="text-base font-manropeBold text-black">
                Back to home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
