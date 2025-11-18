import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native"; // 👁️ Icônes pour afficher / masquer le mot de passe
import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Vérifie si les deux mots de passe correspondent
  const arePasswordsMatched =
    password.trim() !== "" && password === confirmPassword;

  // ✅ Bouton désactivé tant que ça ne correspond pas
  const isDisabled = !arePasswordsMatched;

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
          Change password
        </Text>
      </View>

      {/* Contenu principal */}
      <View className="px-6 mt-6">
        <View className="rounded-2xl bg-white p-6">
          {/* Champ mot de passe */}
          <Text className="text-woofDarkGrey font-manropeSemiBold text-sm mb-4">
            Type your new password
          </Text>

          <View className="relative mb-6">
            <TextInput
              className="border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope pr-10"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable
              className="absolute right-4 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={22} color="#8E8E8E" />
              ) : (
                <Eye size={22} color="#8E8E8E" />
              )}
            </Pressable>
          </View>

          {/* Champ confirmation */}
          <Text className="text-woofDarkGrey font-manropeSemiBold text-sm mb-4">
            Confirm your password
          </Text>

          <View className="relative mb-6">
            <TextInput
              className="border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope pr-10"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <Pressable
              className="absolute right-4 top-3"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={22} color={COLORS.woofGrey[900]} />
              ) : (
                <Eye size={22} color={COLORS.woofGrey[900]} />
              )}
            </Pressable>
          </View>

          {/* Message d’erreur si ça ne correspond pas */}
          {!arePasswordsMatched && confirmPassword.length > 0 && (
            <Text className="text-red-500 font-manrope text-sm mb-2">
              Passwords do not match.
            </Text>
          )}

          {/* ✅ Bouton "Change password" désactivé si non valide */}
          <TouchableOpacity
            disabled={isDisabled}
            className={`rounded-2xl py-3 mt-[25px] items-center ${
              isDisabled ? "bg-gray-300" : "bg-woofBrow-500"
            }`}
            onPress={() => {
              router.push("/changepasswordsuccess");
            }}
          >
            <Text className="font-manropeBold text-base text-white">
              Change password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
