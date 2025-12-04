// app/details/[id].tsx
import { Details } from "@/screens";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function MissionDetailsPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Details id={id as string} />
    </>
  );
}
