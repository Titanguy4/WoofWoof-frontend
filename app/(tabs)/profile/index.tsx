import Login from "@/screens/Login";
import ProfileScreen from "@/screens/Profile";
import { useAuth } from "@/utils/auth/AuthContext";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileTab() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {isAuthenticated ? <ProfileScreen /> : <Login />}
    </>
  );
}
