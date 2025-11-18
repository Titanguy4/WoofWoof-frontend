import { COLORS } from "@/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Props = {
  id: number;
  name: string;
  image?: string;
  messages: string;
};

export default function Discussion({ id, name, image, messages }: Props) {


  const parsedMessages: Message[] = JSON.parse(messages);
  const [text, setText] = useState("");

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === "me";
    return (
      <View
        className={`flex-row ${
          isMe ? "justify-end" : "justify-start"
        } mb-3 px-3`}
      >
        <View
          className={`max-w-[75%] px-4 py-2 rounded-2xl ${
            isMe ? "bg-woofBrown rounded-br-none" : "bg-white rounded-bl-none"
          }`}
        >
          {!isMe && (
            <Text className="text-xs text-gray-500 mb-1">{item.sender}</Text>
          )}
          <Text
            className={`text-[15px] ${
              isMe ? "text-white" : "text-gray-800"
            } font-manropeMedium`}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: COLORS.woofBrown }}
    >
      {/* Header */}
      <View className="justify-between flex-row items-center h-[56px] bg-white px-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <MaterialIcons name="chevron-left" size={30} color={COLORS.woofBrown} />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold">{name}</Text>
        {image ? (
          <Image source={{ uri: image }} className="w-10 h-10 rounded-full mr-2" />
        ) : (
          <View className="w-8 h-8 rounded-full bg-[#F4E3D3] items-center justify-center mr-2">
            <Text className="text-[13px] font-manropeBold text-woofBrown">
              {name?.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      {/* Messages */}
      <FlatList
        data={parsedMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        className="bg-woofCream flex-1"
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-woofCream px-4 pb-4 pt-2"
      >
        <View className="flex-row items-center bg-white rounded-3xl px-3 py-2">
          <TouchableOpacity className="mr-2">
            <Ionicons name="add" size={24} color={COLORS.woofBrown} />
          </TouchableOpacity>
          <TextInput
            className="flex-1 text-[15px] font-manropeMedium ml-1"
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity disabled={!text}>
            <Ionicons
              name="send"
              size={22}
              color={text ? COLORS.woofBrown : COLORS.woofGrey}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
