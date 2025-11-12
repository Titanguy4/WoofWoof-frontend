// app/details/[id].tsx
import { ChatScreen } from '@/screens';
import { Stack } from "expo-router";
import React from "react";

export default function ChatPage() {


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChatScreen/>
    </>
  );
}
