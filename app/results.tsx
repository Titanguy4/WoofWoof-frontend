import { Results } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function RequestReceivedPage() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Results />
    </>
  );
}
