// app/details/[id].tsx
import { ChangePassword } from "@/screens";
import { Stack } from "expo-router";
import React from "react";

export default function ChangePasswordPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChangePassword />
    </>
  );
}
