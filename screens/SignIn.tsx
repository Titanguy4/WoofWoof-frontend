import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-xl text-white font-manropeBold ml-4">
          {t("auth.signInTitle")}
        </Text>
      </View>

      {/* Contenu principal */}
      <View className="rounded-t-[40px] flex-1 bg-woofCream-500 p-6">
        <View className="px-4 gap-y-1">
          <Text className="text-2xl text-woofBrown-500 font-manropeSemiBold">
            {t("auth.welcomeBack")}
          </Text>
          <Text className="text-sm text-black font-manropeSemiBold">
            {t("auth.welcomeSubtitle")}
          </Text>
        </View>

        <View className="mt-[39px] items-center">
          <Image
            source={require("../assets/images/woofwoof.png")}
            className="w-[285px] h-[176px]"
            resizeMode="contain"
          />
        </View>

        <View className="px-2 gap-y-5">
          <TextInput
            className="mt-[52px] border border-woofGrey-500 rounded-xl px-4 py-3 text-base text-black font-manrope"
            value={email}
            onChangeText={setEmail}
            placeholder={t("auth.emailPlaceholder")}
          />

          <View className="relative mb-6">
            <TextInput
              className="border border-woofGrey-500 rounded-xl px-4 py-3 text-base text-black font-manrope pr-10"
              value={password}
              onChangeText={setPassword}
              placeholder={t("auth.passwordPlaceholder")}
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

          <TouchableOpacity
            onPress={() => router.push("/forgotpassword")}
            className="items-end"
          >
            <Text className="text-sm text-woofGrey-500 font-manropeSemiBold">
              {t("auth.forgotPassword")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-2xl py-3 mt-[58px] items-center bg-woofBrown-500 text-white">
            <Text className="text-white font-manropeBold text-base">
              {t("auth.signInButton")}
            </Text>
          </TouchableOpacity>

          <View className="items-center mt-11">
            <View className="flex-row gap-x-2">
              <Text className="text-sm text-black font-manrope">
                {t("auth.dontHaveAccount")}{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/signup")}
                className="items-end"
              >
                <Text className="text-sm text-woofBrown-500 font-manropeSemiBold">
                  {t("auth.signUp")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
