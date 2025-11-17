import { Stack } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function PoliciesStack() {
  return (
    <ScrollView
      className="min-h-screen bg-woofCream-500 p-6"
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: "Legal & Policies" }} />

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          Conditions d&apos;utilisation
        </Text>
        <Text className="text-sm text-woofBrown-700">
          En utilisant WoofWoof, vous acceptez nos conditions
          d&apos;utilisation. L&apos;application fournit une plateforme de mise
          en relation et n&apos;est pas responsable des actions des
          utilisateurs.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          Politique de confidentialité
        </Text>
        <Text className="text-sm text-woofBrown-700 mb-2">
          Nous collectons uniquement les données nécessaires pour faire
          fonctionner le service (profil, préférences, etc.). Les données ne
          sont pas vendues à des tiers.
        </Text>
        <TouchableOpacity
          onPress={() => openUrl("https://example.com/privacy")}
          className="flex-row items-center gap-x-3 p-3 bg-white rounded-lg"
        >
          <ExternalLink size={18} />
          <Text className="text-base">
            Voir la politique de confidentialité complète
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">
          Cookies & tracking
        </Text>
        <Text className="text-sm text-woofBrown-700">
          Nous utilisons des cookies et des outils d&apos;analyse pour améliorer
          l&apos;application. Vous pouvez désactiver certains tracking via les
          paramètres de votre appareil.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-manropeBold mb-2">Droits & demandes</Text>
        <Text className="text-sm text-woofBrown-700 mb-2">
          Pour demander la suppression ou l&apos;export de vos données,
          contactez-nous :
        </Text>
        <TouchableOpacity
          onPress={() => openUrl("mailto:support@woofwoof.app")}
          className="flex-row items-center gap-x-3 p-3 bg-white rounded-lg"
        >
          <Text className="text-base">support@woofwoof.app</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-12">
        <Text className="text-sm text-woofBrown-700">
          Version de l&apos;application : 1.0.0 — Dernière mise à jour : 2025
        </Text>
      </View>
    </ScrollView>
  );
}
