import { conversations } from "@/data/conversations";
import Discussion from "@/screens/Discussion"; // ⚠️ adapte ce chemin si besoin
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function DiscussionPage() {

  

  const { id } = useLocalSearchParams();


  // id est souvent de type string | string[] | undefined
  const conversation = conversations.find((c) => String(c.id) === String(id));


  // Si la conversation n’existe pas
  if (!conversation) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <></>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Discussion
        id={conversation.id}
        name={conversation.name}
        image={conversation.image ?? undefined}
        messages={JSON.stringify(conversation.messages)}
      />
    </>
  );
}
