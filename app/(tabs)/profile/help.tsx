import { Stack } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";

const openUrl = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert("Impossible d'ouvrir le lien", url);
      return;
    }
    await Linking.openURL(url);
  } catch {
    Alert.alert("Erreur", "Impossible d'ouvrir le lien");
  }
};

export default function HelpAndSupport() {
  return (
    <View className="min-h-screen bg-woofCream-500 p-6 gap-y-5">
      <Stack.Screen options={{ title: "Help & Support" }} />

      <Text className="text-base mb-6">
        Nous n&apos;aiderons pas. Voici quelques ressources externes :
      </Text>

      <TouchableOpacity
        onPress={() => openUrl("https://www.google.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://chat.openai.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">ChatGPT</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://gemini.google.com")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">Gemini</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://hugotanguy.fr")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">Mon site (hugotanguy.fr)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openUrl("https://mathisfriess.space")}
        className="flex-row items-center justify-between p-4 bg-white rounded-lg"
      >
        <View className="flex-row items-center gap-x-4">
          <ExternalLink size={20} />
          <Text className="text-base">Google Scholar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
