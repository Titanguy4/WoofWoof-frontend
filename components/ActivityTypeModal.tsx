import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Animated, {
  Layout,
  SlideOutDown
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedType: string | null;
  setSelectedType: (type: string) => void;
  onApply: () => void;
};

export default function ActivityTypeModal({
  visible,
  onClose,
  selectedType,
  setSelectedType,
  onApply,
}: Props) {
  const activities = [
    {
      key: "animal",
      title: "Animal care",
      desc: "Assist with farm animals, shelters, or wildlife protection",
      img: require("../assets/images/animalType.png"),
    },
    {
      key: "farm",
      title: "Farm work",
      desc: "Planting, harvesting, and daily farm tasks",
      img: require("../assets/images/farmType.png"),
    },
    {
      key: "cultural",
      title: "Cultural event",
      desc: "Organize festivals, exhibitions, or community events",
      img: require("../assets/images/culturalType.png"),
    },
    {
      key: "environment",
      title: "Environmental project",
      desc: "Tree planting, beach cleaning, or eco-construction",
      img: require("../assets/images/environmentalType.png"),
    },
  ];

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
          entering={SlideOutDown.duration(250)}
          exiting={SlideOutDown.duration(250)} // 🔽 redescend proprement
          className="bg-white rounded-t-3xl h-[750px] px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold text-center flex-1">
              Select activity type
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          {/* Liste d’activités */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <RadioButton.Group
              onValueChange={(value) => setSelectedType(value)}
              value={selectedType || ""}
            >
              {activities.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSelectedType(item.key)}
                  activeOpacity={0.8}
                  className={`flex-row h-[108px] items-center border rounded-xl p-3 mb-3 ${selectedType === item.key
                    ? "border-woofBrown bg-woofBrown/5"
                    : "border-gray-300"
                    }`}
                >
                  <Image
                    source={item.img}
                    className="w-[76px] h-[76px] rounded-lg mr-3"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className="font-manropeBold text-[16px]">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500 text-[13px]">
                      {item.desc}
                    </Text>
                  </View>

                  <RadioButton.Android
                    value={item.key}
                    color="#B87333"
                    uncheckedColor="#C9C9C9"
                  />
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
            
            {/* Bouton Apply */}
            <TouchableOpacity
              onPress={onApply}
              disabled={!selectedType}
              className={`rounded-2xl py-3 mt-20 items-center ${selectedType ? "bg-woofBrown" : "bg-gray-400"
                }`}
            >
              <Text className="text-white font-manropeBold text-base">
                Apply
              </Text>
            </TouchableOpacity>
          </ScrollView>


        </Animated.View>
      </View>
    </Modal>
  );
}