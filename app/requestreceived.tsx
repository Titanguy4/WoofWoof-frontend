// app/details/[id].tsx
import { RequestReceived } from '@/screens';
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function RequestReceivedPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RequestReceived />
    </>
  );
}
