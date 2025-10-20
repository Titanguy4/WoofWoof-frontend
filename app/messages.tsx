import { Messages } from "@/screens";
import { Stack } from "expo-router";
import React from "react";

export default function MessagesTab() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Chats",}} />
      <Messages />
    </>
  );
}