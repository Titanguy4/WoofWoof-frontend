import Login from "@/screens/Login";
import ProfileScreen from "@/screens/Profile";
import { useAuth } from "@/utils/auth/AuthContext";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProfileTab() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation("profil");

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: t("title") }} />
      {isAuthenticated ? <ProfileScreen /> : <Login />}
    </>
  );
}
