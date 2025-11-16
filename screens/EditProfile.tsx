import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditProfileModal from "../components/EditProfileModal";
import { user as initialUser } from "../data/user";

// ✅ Type du user (à adapter selon ton backend)
export type User = {
  name: string;
  email: string;
  password: string;
  age: number;
  number: string;
  address: string;
};

export default function EditProfile() {
  const [user, setUser] = useState<User>(initialUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState<keyof User | "">("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  // 🔄 Quand on clique sur le crayon
  const handleEdit = (attribute: keyof User, value: string | number) => {
    setSelectedAttr(attribute);
    setSelectedValue(String(value));
    setModalVisible(true);
  };

  // 💾 Quand on sauvegarde dans le modal
  const handleSave = (attribute: keyof User, newValue: string) => {
    setUser((prev) => ({
      ...prev,
      [attribute]: attribute === "age" ? Number(newValue) : newValue,
    }));
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500][500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500][500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500][500]}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-4">Edit Profile</Text>
      </View>

      {/* Contenu principal */}
      <ScrollView className="flex-1 bg-white px-4">
        <View className="flex-1 py-4 items-center">
          <Image
            source={require("../assets/images/scoobyprofile.png")}
            className="w-[100px] h-[100px] rounded-full"
          />
          <TouchableOpacity className="rounded-xl w-[95px] h-[45px] justify-center border border-woofGrey-200 items-center mt-4">
            <Text className="font-manropeMedium text-base text-black">
              Edit Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Champs utilisateur */}
        {Object.entries(user).map(([key, value]) => (
          <View
            key={key}
            className="bg-white px-4 flex-row justify-between py-2 mt-2"
          >
            <View className="py-1 gap-y-2 flex-1">
              <Text className="mt-3 text-sm text-woofGrey-900 font-manrope capitalize">
                {key}
              </Text>
              <Text className="text-base text-black font-manropeBold">
                {String(value)}
              </Text>
            </View>

            <TouchableOpacity
              className="flex-row py-2 items-center"
              onPress={() => handleEdit(key as keyof User, value)}
            >
              <MaterialIcons name="create" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal d'édition */}
      {selectedAttr && (
        <EditProfileModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          attribute={selectedAttr}
          value={selectedValue}
          onSave={handleSave}
        />
      )}
    </SafeAreaView>
  );
}
