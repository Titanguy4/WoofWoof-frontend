import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { Check, Globe } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LANG_KEY = "app_language";

/**
 * TODO: ajouter la langue
 */
export default function LanguagesStack() {
  const [language, setLanguage] = useState<"fr" | "en" | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANG_KEY);
        setLanguage((stored as "fr" | "en") ?? "fr");
      } catch {
        setLanguage("fr");
      }
    })();
  }, []);

  const select = async (lang: "fr" | "en") => {
    try {
      await AsyncStorage.setItem(LANG_KEY, lang);
      setLanguage(lang);
    } catch {
      setLanguage(lang);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Languages" }} />
      <View className="min-h-screen bg-woofCream-500 p-6">
        <Text className="text-lg font-manropeBold mb-4">
          Choose your language
        </Text>

        <TouchableOpacity
          onPress={() => select("fr")}
          className="flex-row items-center justify-between p-4 bg-white rounded-lg mb-3"
        >
          <View className="flex-row items-center gap-x-4">
            <Globe size={28} />
            <Text className="text-base">Français</Text>
          </View>
          {language === "fr" && <Check size={20} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => select("en")}
          className="flex-row items-center justify-between p-4 bg-white rounded-lg"
        >
          <View className="flex-row items-center gap-x-4">
            <Globe size={28} />
            <Text className="text-base">English</Text>
          </View>
          {language === "en" && <Check size={20} />}
        </TouchableOpacity>
      </View>
    </>
  );
}
