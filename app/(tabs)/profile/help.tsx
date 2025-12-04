import { Stack } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";

export default function HelpAndSupport() {
  const { t } = useTranslation("profil");

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert(t("helpPage.cannotOpenLink"), url);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert(t("helpPage.error"), t("helpPage.cannotOpenLink"));
    }
  };

  return (
    <View className="min-h-screen bg-woofCream-500 p-6 gap-y-5">
      <Stack.Screen options={{ title: t("helpPage.title") }} />

      <Text className="text-base mb-6">{t("helpPage.description")}</Text>

      <TouchableOpacity
        onPress={() => openUrl("https://www.google.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">{t("helpPage.google")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://chat.openai.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">{t("helpPage.chatgpt")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://gemini.google.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">{t("helpPage.gemini")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://hugotanguy.fr")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">{t("helpPage.myWebsite")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://mathisfriess.space")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">{t("helpPage.googleScholar")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
