import { AuthContext } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { Tabs } from "expo-router";
import {
  CircleUserRound,
  Compass,
  Heart,
  Image,
  MapPinned,
  MessageCircleWarning,
  Users,
} from "lucide-react-native";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  if (!auth) return null; // ou un loader

  const { isWoofer, isBackpacker } = auth;

  // Les onglets fixes sauf Profile
  const baseTabsWithoutProfile = [
    { name: "index", icon: Compass, title: t("explore:title") },
    { name: "woofshare", icon: Image, title: t("woofshare:title") },
  ];

  // Onglet Profile
  const profileTab = { name: "profile", icon: CircleUserRound, title: t("profil:title") };

  // Tabs à ajouter selon le rôle
  const wooferTabs = [
    { name: "backpackers", icon: Users, title: t("backpackers:title") },
    { name: "myoffer", icon: MessageCircleWarning, title: t("myoffer:title") },
  ];

  const backpackerTabs = [
    { name: "saved", icon: Heart, title: t("saved:title") },
    { name: "missions", icon: MapPinned, title: t("missions:title") },
  ];

  // Combiner tous les onglets visibles, Profile toujours à droite
  const visibleTabs = [
    ...baseTabsWithoutProfile,
    ...(isWoofer ? wooferTabs : []),
    ...(isBackpacker ? backpackerTabs : []),
    profileTab,
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.woofBrown[600],
        tabBarInactiveTintColor: COLORS.woofGrey[300],
        headerShown: false,
      }}
      tabBar={({ navigation, state }) => (
        <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "white" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 }}>
            {visibleTabs.map((tab, index) => {
              const isFocused = state.index === index;
              const { name, icon: Icon, title } = tab;
              return (
                <TouchableOpacity
                  key={name}
                  onPress={() => navigation.navigate(name)}
                  style={{ flex: 1, alignItems: "center" }}
                >
                  <Icon color={isFocused ? COLORS.woofBrown[600] : COLORS.woofGrey[300]} size={24} />
                  <Text style={{ fontSize: 12, color: isFocused ? COLORS.woofBrown[600] : COLORS.woofGrey[300] }}>
                    {title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>
      )}
    >
      {visibleTabs.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.title }}
        />
      ))}
    </Tabs>
  );
}
