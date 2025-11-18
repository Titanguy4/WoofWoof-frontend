import { PaymentSuccess } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function SignInPage() {


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PaymentSuccess/>
    </>
  );
}
