// app/details/[id].tsx
import { MissionRequest } from '@/screens';
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function MissionRequestPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MissionRequest id={id} />
    </>
  );
}
