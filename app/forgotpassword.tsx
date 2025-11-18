// app/details/[id].tsx
import { ForgotPassword } from "@/screens";
import { Stack } from "expo-router";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ForgotPassword />
    </>
  );
}
