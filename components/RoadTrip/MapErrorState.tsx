import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MapErrorStateProps {
  error: string;
}

export const MapErrorState: React.FC<MapErrorStateProps> = ({ error }) => {
  const { t } = useTranslation("roadtrip");

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-woofBrown-500 justify-center items-center px-4"
    >
      <Text className="text-white font-manropeBold text-lg mb-2">
        {t("errors.error")}
      </Text>
      <Text className="text-white font-manrope text-center">{error}</Text>
      <TouchableOpacity
        onPress={() => router.back()}
        className="mt-4 px-6 py-3 bg-woofCream rounded-full"
      >
        <Text className="font-manropeSemiBold">{t("actions.return")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
