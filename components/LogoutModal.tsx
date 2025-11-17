import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideOutDown } from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LogoutModal({ visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* ✅ Fond flou + ombrage */}
      <View className="flex-1 justify-end">
        <BlurView intensity={40} tint="dark" className="absolute inset-0" />
        <View className="absolute inset-0 bg-black/30" />

        {/* ✅ Panneau animé du bas vers le haut */}
        <Animated.View
          entering={SlideOutDown.duration(200)}
          exiting={SlideOutDown.duration(250)}
          className="bg-white rounded-t-3xl h-[249px] px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold flex-1">Logout</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View className="rounded-2xl bg-white">
              <Text className="text-base text-woofDarkGrey font-manrope">
                Your profile information will be saved to make things easier
                when you return. See you again!
              </Text>
            </View>

            {/* ✅ Bouton Add */}
            <TouchableOpacity
              onPress={() => onClose()}
              className="rounded-2xl py-3 mt-6 items-center bg-woofBrown-500 text-white"
            >
              <Text className="text-white font-manropeBold text-base">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
