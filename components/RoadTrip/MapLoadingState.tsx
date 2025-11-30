import { COLORS } from "@/utils/constants/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";

export const MapLoadingState: React.FC = () => {
  const { t } = useTranslation("roadtrip");

  return (
    <View className="flex-1 bg-woofBrown-500 justify-center items-center pt-safe">
      <ActivityIndicator size="large" color={COLORS.woofCream[500]} />
      <Text className="mt-4 text-white font-manropeSemiBold">
        {t("result.loading")}
      </Text>
    </View>
  );
};
