import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Animated, {
  SlideOutDown
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LanguageModal({ visible, onClose }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* ✅ Fond flou */}
      <View className="flex-1 justify-end">
        <BlurView intensity={40} tint="dark" className="absolute inset-0" />
        <View className="absolute inset-0 bg-black/30" />

        {/* ✅ Panneau animé */}
        <Animated.View
          entering={SlideOutDown.duration(250)}
          exiting={SlideOutDown.duration(250)}
          className="bg-white rounded-t-3xl px-5 py-11"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-manropeBold">Change language</Text>

            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Radios English / French */}
          <RadioButton.Group
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
          >
            {/* ENGLISH */}
            <TouchableOpacity
              onPress={() => setSelectedLanguage("en")}
              className="flex-row items-center border-b border-woofGrey justify-between p-4 mb-3"
              activeOpacity={0.8}
            >
              <Text className="text-base font-manrope text-black">
                🇬🇧    English
              </Text>

              <RadioButton.Android
                value="en"
                color="#B87333"
                uncheckedColor="#C9C9C9"
              />
            </TouchableOpacity>

            {/* FRENCH */}
            <TouchableOpacity
              onPress={() => setSelectedLanguage("fr")}
              className="flex-row items-center border-b border-woofGrey justify-between p-4"
              activeOpacity={0.8}
            >
              <Text className="text-base font-manrope text-black">
                🇫🇷    French
              </Text>

              <RadioButton.Android
                value="fr"
                color="#B87333"
                uncheckedColor="#C9C9C9"
              />
            </TouchableOpacity>
          </RadioButton.Group>
        </Animated.View>
      </View>
    </Modal>
  );
}
