// app/details/[id].tsx
import { EditProfile } from "@/screens";
import { Stack } from "expo-router";
import React from "react";

export default function EditProfilePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditProfile />
    </>
  );
}
