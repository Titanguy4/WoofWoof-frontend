import { HapticTab } from "@/components/haptic-tab";
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
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.woofBrown[600],
        headerShown: false,
        tabBarInactiveTintColor: COLORS.woofGrey[300],
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("explore:title"),
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="woofshare"
        options={{
          title: t("woofshare:title"),
          tabBarIcon: ({ color, size }) => <Image size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: t("saved:title"),
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="missions"
        options={{
          title: t("missions:title"),
          tabBarIcon: ({ color, size }) => (
            <MapPinned size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myoffer"
        options={{
          title: t("myoffer:title"),
          tabBarIcon: ({ color, size }) => (
            <MessageCircleWarning size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="backpackers"
        options={{
          title: t("backpackers:title"),
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t("profil:title"),
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          href: null, // Cache la tab mais garde le stack accessible
        }}
      />
    </Tabs>
  );
}
