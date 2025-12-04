import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import teteChien from "../assets/images/tete-chien.png";
import { useAuth } from "../utils/auth/AuthContext";

export default function Login() {
  const { login, isLoading } = useAuth();

  return (
    <View className="flex-1 px-8 items-center justify-center bg-woofCream-500">
      <Image source={teteChien} className="w-48 h-48 mb-6" />

      <Text className="text-woofBrown-500 text-xl font-semibold mb-2">
        Aie.. Vous n&apos;êtes pas connecté
      </Text>
      <Text className="text-woofGrey-500 text-center mb-6 px-4">
        Merci de vous connecter à l&apos;aide de keycloak
      </Text>

      <TouchableOpacity
        onPress={login}
        activeOpacity={0.9}
        className={`w-2/3 h-24 py-3 rounded-full justify-center items-center mt-8 ${isLoading ? "bg-[#cfa07a]/60" : "bg-[#C57A46]"}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-2xl font-semibold">Connexion</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
