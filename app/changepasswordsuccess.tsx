// app/details/[id].tsx
import { ChangePasswordSuccess } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function ChangePasswordSuccessPage() {


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChangePasswordSuccess/>
    </>
  );
}
