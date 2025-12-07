import { advantages } from "@/utils/constants/advantages";
import { COLORS } from "@/utils/constants/colors";
import { meals } from "@/utils/constants/meals";
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
  setSelectedAdvantages: (meals: string[]) => void;
  selectedMeals: string[];
  setSelectedMeals: (meals: string[]) => void;
  selectedType: string | null;
  onAdd: (
    name: string,
    description: string,
    activity: string,
    department: string,
        region: string,
  ) => void;
};

export default function InfosModal({
  visible,
  onClose,
  onAdd,
  selectedMeals,
  setSelectedMeals,
  selectedAdvantages,
  setSelectedAdvantages,
}: Props) {
  const [department, setDepartment] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState("");
  const [name, setName] = useState("");

  // ✅ Fonction pour gérer la sélection/désélection multiple
  const toggleAdvantage = (title: string) => {
    if (selectedAdvantages.includes(title)) {
      setSelectedAdvantages(
        selectedAdvantages.filter((item) => item !== title),
      );
    } else {
      setSelectedAdvantages([...selectedAdvantages, title]);
    }
  };

  // ✅ Fonction pour gérer la sélection/désélection multiple
  const toggleMeal = (title: string) => {
    if (selectedMeals.includes(title)) {
      setSelectedMeals(selectedMeals.filter((item) => item !== title));
    } else {
      setSelectedMeals([...selectedMeals, title]);
    }
  };

  const location = `${department.trim()}, ${region.trim()}`;

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
                  placeholderTextColor={COLORS.woofGrey[500]}
                  value={name}
                  onChangeText={setName}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>
            {/* Description */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Description</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Type an address..."
                  placeholderTextColor={COLORS.woofGrey[500]}
                  value={description}
                  onChangeText={setDescription}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* Activity */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Activity</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Type an activity..."
                  placeholderTextColor={COLORS.woofGrey[500]}
                  value={activity}
                  onChangeText={setActivity}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* Department */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Department</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Department..."
                  placeholderTextColor={COLORS.woofGrey[500]}
                  value={department}
                  onChangeText={setDepartment}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* Region */}
            <View className="rounded-2xl px-4 bg-white">
              <Text className="text-lg font-manrope">Region</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                <TextInput
                  placeholder="Region..."
                  placeholderTextColor={COLORS.woofGrey[500]}
                  value={region}
                  onChangeText={setRegion}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
              </View>
            </View>

            {/* 🧩 Meals */}
            <View className="px-4">
              <Text className="text-lg font-manrope mb-4">Meals</Text>
              {meals.map((item) => {
                const isSelected = selectedMeals.includes(item.title);
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => toggleMeal(item.title)}
                    activeOpacity={0.8}
                    className={`flex-row items-center border rounded-xl p-3 mb-3 ${
                      isSelected
                        ? "border-woofBrown-500 bg-woofBrown-500/5"
                        : "border-gray-300"
                    }`}
                  >
                    <Text className="flex-1 font-manropeBold text-[16px]">
                      {item.title}
                    </Text>
                    <RadioButton.Android
                      value={item.key}
                      onPress={() => toggleMeal(item.title)}
                      status={isSelected ? "checked" : "unchecked"}
                      color={COLORS.woofBrown[500]}
                      uncheckedColor="#C9C9C9"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 🧩 Avantages */}
            <View className="px-4">
              <Text className="text-lg font-manrope mb-4">
                Benefits for backpackers
              </Text>
              {advantages.map((item) => {
                const isSelected = selectedAdvantages.includes(item.title);
                return (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => toggleAdvantage(item.title)}
                    activeOpacity={0.8}
                    className={`flex-row items-center border rounded-xl p-3 mb-3 ${
                      isSelected
                        ? "border-woofBrown-500 bg-woofBrown-500/5"
                        : "border-gray-300"
                    }`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={
                        isSelected
                          ? COLORS.woofBrown[500]
                          : COLORS.woofGrey[900]
                      }
                      style={{ marginRight: 12 }}
                    />
                    <Text className="flex-1 font-manropeBold text-[16px]">
                      {item.title}
                    </Text>
                    <RadioButton.Android
                      value={item.key}
                      onPress={() => toggleAdvantage(item.title)}
                      status={isSelected ? "checked" : "unchecked"}
                      color={COLORS.woofBrown[500]}
                      uncheckedColor="#C9C9C9"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ✅ Bouton Add */}
            <View className="px-4">
              <TouchableOpacity
                onPress={() => {
                  onAdd(name, description, activity, department, region);
                  onClose(); // ferme le modal
                  router.push({
                    pathname: "/requestreceived",
                    params: {
                      location,
                      name,
                    },
                  });
                }}
                disabled={
                  selectedAdvantages.length === 0 ||
                  selectedMeals.length === 0 ||
                  description.trim() === "" ||
                  activity.trim() === "" ||
                  name.trim() === ""
                }
                className={`rounded-2xl py-3 mt-6 items-center ${
                  description.trim() !== "" &&
                  name.trim() !== "" &&
                  activity.trim() !== "" &&
                  selectedAdvantages.length > 0 &&
                  selectedMeals.length > 0
                    ? "bg-woofBrown-500"
                    : "bg-gray-400"
                }`}
              >
                <Text className="text-white font-manropeBold text-base">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
