// app/details/[id].tsx
import { SignIn } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function SignInPage() {


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignIn/>
    </>
  );
}
