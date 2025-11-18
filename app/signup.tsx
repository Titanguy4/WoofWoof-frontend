// app/details/[id].tsx
import { SignUp } from "@/screens";
import { Stack } from "expo-router";
import React from "react";

export default function SignUpPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignUp />
    </>
  );
}
