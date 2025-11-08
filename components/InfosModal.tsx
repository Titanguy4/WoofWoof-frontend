import { advantages } from "@/constants/advantages";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Animated, {
  Layout,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedAdvantages: string[];
  setSelectedAdvantages: (advantages: string[]) => void;
  selectedType: string | null;
};

export default function InfosModal({
  visible,
  onClose,
  selectedAdvantages,
  setSelectedAdvantages,
}: Props) {
  const [location, setLocation] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [name, setName] = useState("");

  // ✅ Fonction pour gérer la sélection/désélection multiple
  const toggleAdvantage = (key: string) => {
    if (selectedAdvantages.includes(key)) {
      setSelectedAdvantages(selectedAdvantages.filter((item) => item !== key));
    } else {
      setSelectedAdvantages([...selectedAdvantages, key]);
    }
  };

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
          layout={Layout.springify()}
          entering={SlideInUp.duration(200)}
          exiting={SlideOutDown.duration(250)}
          className="bg-white rounded-t-3xl h-[750px] px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold text-center flex-1">
              Add informations
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 📍 Name */}
            <View className="rounded-2xl mt-4 px-4 bg-white">
              <Text className="text-lg font-manrope">Name</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Type a name for your activity..."
                  placeholderTextColor={COLORS.woofGrey}
                  value={name}
                  onChangeText={setName}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>
            {/* 📍 Location */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Location</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Type an address..."
                  placeholderTextColor={COLORS.woofGrey}
                  value={location}
                  onChangeText={setLocation}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* ⏰ Daily hours */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Daily hours</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="0 - 8 hours..."
                  placeholderTextColor={COLORS.woofGrey}
                  value={dailyHours}
                  onChangeText={setDailyHours}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* 🧩 Avantages */}
            <View className="px-4">
              <Text className="text-lg font-manrope mb-4">
                Benefits for backpackers
              </Text>
              {advantages.map((item) => {
                const isSelected = selectedAdvantages.includes(item.key);
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => toggleAdvantage(item.key)}
                    activeOpacity={0.8}
                    className={`flex-row items-center border rounded-xl p-3 mb-3 ${isSelected
                      ? "border-woofBrown bg-woofBrown/5"
                      : "border-gray-300"
                      }`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={
                        isSelected ? COLORS.woofBrown : COLORS.woofDarkGrey
                      }
                      style={{ marginRight: 12 }}
                    />
                    <Text className="flex-1 font-manropeBold text-[16px]">
                      {item.title}
                    </Text>
                    <RadioButton.Android
                      value={item.key}
                      onPress={() => toggleAdvantage(item.key)}
                      status={isSelected ? "checked" : "unchecked"}
                      color={COLORS.woofBrown}
                      uncheckedColor="#C9C9C9"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ✅ Bouton Add */}
            <TouchableOpacity
              onPress={() => {
                onClose(); // ferme le modal
                router.push({
                  pathname: "/requestreceived",
                  params: {
                    location,
                    name
                  },
                });
              }}
              disabled={
                selectedAdvantages.length === 0 ||
                location.trim() === "" ||
                dailyHours.trim() === ""
              }
              className={`rounded-2xl py-3 mt-6 items-center ${location.trim() !== "" &&
                dailyHours.trim() !== "" &&
                selectedAdvantages.length > 0
                ? "bg-woofBrown"
                : "bg-gray-400"
                }`}
            >
              <Text className="text-white font-manropeBold text-base">
                Add
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
