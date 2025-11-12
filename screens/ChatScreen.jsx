import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Conversation from "../components/Conversation";
import { COLORS } from "../constants/colors";
import { conversations } from "../data/conversations";

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Filtrage intelligent (nom + contenu du dernier message)
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const lastMessage = conv.messages?.[conv.messages.length - 1]?.text || "";
      const searchLower = searchQuery.toLowerCase();

      return (
        conv.name.toLowerCase().includes(searchLower) ||
        lastMessage.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[122.5px]">Chats</Text>
      </View>

      {/* 👇 Zone beige */}
      <View className="flex-1 bg-woofCream px-4">
        {/* Barre de recherche */}
        <View className="flex-row items-center bg-white rounded-3xl h-[44px] w-full mt-4 px-3">
          <Ionicons name="search" size={20} color="black" />
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.woofGrey}
            className="flex-1 text-[15px] font-manropeMedium ml-4"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Liste des conversations */}
        <ScrollView className="flex-1 mt-4 pb-10 px-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <Conversation
                key={conv.id}
                id={conv.id}
                name={conv.name}
                messages={conv.messages}
                image={conv.image}
                unread={conv.unread}
              />
            ))
          ) : (
            <Text className="text-center text-woofGrey mt-6">
              No conversations found
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
