import { COLORS } from "@/utils/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PaymentSuccess() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const sessionId = params.session_id as string | undefined;

  useEffect(() => {
    if (!sessionId) return;

    fetch(
      `http://localhost:8082/payments/verify-session?session_id=${sessionId}`
    );
  }, [sessionId]);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofCream[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="dark" />

      {/* Contenu principal */}
      <View className="px-6 mt-32 ">
        <View className="p-6 bg-white rounded-2xl">
          <View className="items-center">
            <Image
              source={require("../../assets/images/check_circle.png")}
              className="w-[126px] h-[126px] mb-8"
              resizeMode="contain"
            />

            <Text className="text-woofBrown-500 font-manropeBold text-lg mb-12">
              {t("payment.successTitle")}
            </Text>

            <Text
              numberOfLines={2}
              className="text-black font-manropeSemiBold text-base mb-2 text-center"
            >
              {t("payment.successMessageLine1")}
            </Text>
            <Text
              numberOfLines={2}
              className="text-woofDarkGrey font-manrope text-sm mb-10 text-center"
            >
              {t("payment.successMessageLine2")}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-woofBrown-500 rounded-2xl py-3 items-center"
            onPress={() => {
              router.push({
                pathname: "/map",
                params: { sessionId },
              });
            }}
          >
            <Text className="font-manropeBold text-base text-white">
              {t("payment.backToProfile")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
