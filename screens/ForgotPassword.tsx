import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  // 🔍 Vérifie si l'email est valide
  const isValidEmail = (mail: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(mail);
  };

  const isDisabled = !isValidEmail(email);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofCream[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="dark" />

      {/* Header */}
      <View className="items-center w-full h-[56px] flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>
        <Text className="text-xl text-black font-manropeBold ml-4">
          Forgot password
        </Text>
      </View>

      {/* Contenu principal */}
      <View className="px-6 mt-6">
        <View className="rounded-2xl bg-white p-6">
          <Text className="text-woofDarkGrey font-manropeSemiBold text-sm mb-4">
            Type your email
          </Text>
          <TextInput
            className="border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope mb-6"
            value={email}
            onChangeText={setEmail}
            placeholder={"Email"}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text className="text-black font-manropeSemiBold text-base">
            We’ll text you a code by mail!
          </Text>

          {/* ✅ Bouton "Send" désactivé si email invalide */}
          <TouchableOpacity
            disabled={isDisabled}
            className={`rounded-2xl py-3 mt-[45px] items-center ${isDisabled ? "bg-gray-200" : "bg-woofBrown-500"}`}
            onPress={() => {
              console.log("Email envoyé à :", email);
            }}
          >
            <Text
              className={`font-manropeBold text-base ${
                isDisabled ? "text-white" : "text-white"
              }`}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
