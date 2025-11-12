import { Notifications } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function NotificationsPage() {


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Notifications/>
    </>
  );
}