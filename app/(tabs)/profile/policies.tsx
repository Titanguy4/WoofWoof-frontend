import { Stack } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PoliciesStack() {
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
    <ScrollView
      className="min-h-screen bg-woofCream-500 p-6"
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: t("legalPage.title") }} />

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          {t("legalPage.termsTitle")}
        </Text>
        <Text className="text-sm text-woofBrown-700">
          {t("legalPage.termsDescription")}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          {t("legalPage.privacyTitle")}
        </Text>
        <Text className="text-sm text-woofBrown-700 mb-2">
          {t("legalPage.privacyDescription")}
        </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://example.com/privacy")}
          className="flex-row items-center gap-x-3 p-3 bg-white rounded-lg"
        >
          <ExternalLink size={18} />
          <Text className="text-base">{t("legalPage.fullPrivacyPolicy")}</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          {t("legalPage.cookiesTitle")}
        </Text>
        <Text className="text-sm text-woofBrown-700">
          {t("legalPage.cookiesDescription")}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          {t("legalPage.rightsTitle")}
        </Text>
        <Text className="text-sm text-woofBrown-700 mb-2">
          {t("legalPage.rightsDescription")}
        </Text>
        <TouchableOpacity
          onPress={() => openUrl("mailto:support@woofwoof.app")}
          className="flex-row items-center gap-x-3 p-3 bg-white rounded-lg"
        >
          <Text className="text-base">{t("legalPage.supportEmail")}</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-12">
        <Text className="text-sm text-woofBrown-700">
          {t("legalPage.version")}
        </Text>
      </View>
    </ScrollView>
  );
}
