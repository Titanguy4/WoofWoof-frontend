import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function NotificationsStack() {
  const { t } = useTranslation("profil");

  return (
    <View className="min-h-screen bg-woofCream-500">
      <Stack.Screen options={{ title: t("notificationsPage.title") }} />
    </View>
  );
}
