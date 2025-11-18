import * as SecureStore from "expo-secure-store";
import { changeLanguage } from "i18next";
import { Check, Globe } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const LANG_KEY = "app_language";

export default function LanguagesStack() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const languages = { en: "English", fr: "Français" };

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync(LANG_KEY);
        if (stored) {
          setLanguage(stored as "fr" | "en");
          await changeLanguage(stored);
        } else {
          setLanguage(i18n.language);
        }
      } catch {
        setLanguage(i18n.language);
      }
    })();
  }, []);

  const select = async (lang: string) => {
    try {
      await changeLanguage(lang);
      await SecureStore.setItemAsync(LANG_KEY, lang);
      setLanguage(lang);
    } catch (error) {
      console.error("Erreur lors du changement de langue:", error);
    }
  };

  return (
    <View className="min-h-screen bg-woofCream-500 p-6">
      <Text className="text-lg font-manropeBold mb-4">
        {t("profil:languages.description")}
      </Text>

      {Object.entries(languages).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => select(key)}
          className="flex-row items-center justify-between p-4 bg-white rounded-lg mb-3"
        >
          <View className="flex-row items-center gap-x-4">
            <Globe size={28} />
            <Text className="text-base">{value}</Text>
          </View>
          {language === key && <Check size={20} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}
