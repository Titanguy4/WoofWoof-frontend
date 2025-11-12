import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideOutDown } from "react-native-reanimated";
import type { User } from "../screens/EditProfile";

type Props = {
  visible: boolean;
  onClose: () => void;
  attribute: keyof User;
  value: string | number;
  onSave: (attribute: keyof User, newValue: string) => void;
};

export default function EditProfileModal({
  visible,
  onClose,
  attribute,
  value,
  onSave,
}: Props) {
  const [newValue, setNewValue] = useState<string>(String(value));

  // 🔁 Met à jour la valeur quand on change de champ
  useEffect(() => {
    setNewValue(String(value));
  }, [value]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        {/* ✅ Fond flou */}
        <BlurView intensity={40} tint="dark" className="absolute inset-0" />
        <View className="absolute inset-0 bg-black/30" />

        {/* ✅ Panneau animé */}
        <Animated.View
          entering={SlideOutDown.duration(200)}
          exiting={SlideOutDown.duration(250)}
          className="bg-white rounded-t-3xl h-[260px] px-5 py-4"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8 mt-4">
            <Text className="text-lg font-manropeBold flex-1 capitalize">
              Change {attribute}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <Text className="capitalize mb-4">
            {attribute}
          </Text>
          {/* Champ de saisie */}
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manropeBold"
            value={newValue}
            onChangeText={setNewValue}
            placeholder={`Enter your ${attribute}`}
          />

          {/* Bouton Save */}
          <TouchableOpacity
            onPress={() => {
              onSave(attribute, newValue);
              onClose();
            }}
            className="rounded-2xl py-3 mt-6 items-center bg-woofBrown"
          >
            <Text className="text-white font-manropeBold text-base">
              Save
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
