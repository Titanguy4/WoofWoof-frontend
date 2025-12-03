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

export default function TabLayout() {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { isWoofer, isBackpacker } = auth;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.woofBrown[600],
        tabBarInactiveTintColor: COLORS.woofGrey[300],
        headerShown: false,
      }}
    >
      {/* Tabs communs */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("explore:title"),
          tabBarIcon: ({ color }) => <Compass color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="woofshare"
        options={{
          title: t("woofshare:title"),
          tabBarIcon: ({ color }) => <Image color={color} size={24} />,
        }}
      />

      {/* Tabs Woofer */}
      <Tabs.Screen
        name="backpackers"
        options={{
          title: t("backpackers:title"),
          tabBarIcon: ({ color }) => <Users color={color} size={24} />,
          href: isWoofer ? "/backpackers" : null,
        }}
      />
      <Tabs.Screen
        name="myoffer"
        options={{
          title: t("myoffer:title"),
          tabBarIcon: ({ color }) => (
            <MessageCircleWarning color={color} size={24} />
          ),
          href: isWoofer ? "/myoffer" : null,
        }}
      />

      {/* Tabs Backpacker */}
      <Tabs.Screen
        name="saved"
        options={{
          title: t("saved:title"),
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
          href: isBackpacker ? "/saved" : null,
        }}
      />
      <Tabs.Screen
        name="missions"
        options={{
          title: t("missions:title"),
          tabBarIcon: ({ color }) => <MapPinned color={color} size={24} />,
          href: isBackpacker ? "/missions" : null,
        }}
      />

      {/* Profile toujours visible */}
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profil:title"),
          tabBarIcon: ({ color }) => (
            <CircleUserRound color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
