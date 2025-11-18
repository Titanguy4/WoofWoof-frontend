import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { COLORS } from "@/utils/constants/colors";
import {
  CircleUserRound,
  Compass,
  Heart,
  Image,
  MapPinned,
  MessageCircleWarning,
  Users,
} from "lucide-react-native";

export default function TabLayout() {
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
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="woofshare"
        options={{
          title: "WoofShare",
          tabBarIcon: ({ color, size }) => <Image size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="missions"
        options={{
          title: "Missions",
          tabBarIcon: ({ color, size }) => (
            <MapPinned size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myoffer"
        options={{
          title: "Offers",
          tabBarIcon: ({ color, size }) => (
            <MessageCircleWarning size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="backpackers"
        options={{
          title: "Backpacks",
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <CircleUserRound size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
