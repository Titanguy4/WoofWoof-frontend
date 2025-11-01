// app/details/[id].tsx
import { RequestSuccess } from '@/screens';
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function RequestSuccessPage() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RequestSuccess id={id} />
    </>
  );
}
