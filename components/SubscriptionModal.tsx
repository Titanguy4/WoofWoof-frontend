import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
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

export default function SubscriptionModal({
  visible,
  onClose,
  selectedType,
  setSelectedType,
  onApply
}: Props) {

  const subscriptions = [
    {
      key: "monthly",
      title: "Monthly",
      per: "month",
      price: "3,99",
    },
    {
      key: "yearly",
      title: "Yearly",
      per: "year",
      price: "39,99",
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
          className="bg-white rounded-t-3xl h-[577px] px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold text-center flex-1">
              Choose your subscription
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
              {subscriptions.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSelectedType(item.key)}
                  activeOpacity={0.8}
                  className={`flex-row h-[70px] items-center border rounded-xl p-3 mb-3 ${selectedType === item.key
                    ? "border-woofBrown bg-woofBrown/5"
                    : "border-gray-300"
                    }`}
                >
                  <View className="flex-1">
                    <Text className="font-manropeSemiBold text-[16px]">
                      {item.title}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="font-manropeBold text-[24px] mr-2 pb-1">
                        € {item.price}
                      </Text>
                      <Text className="font-manrope text-[14px]">
                        /{item.per}
                      </Text>
                    </View>
                  </View>

                  <RadioButton.Android
                    value={item.key}
                    color="#B87333"
                    uncheckedColor="#C9C9C9"
                  />
                </TouchableOpacity>
              ))}
            </RadioButton.Group>

            <View className="items-center justify-center mt-4 mb-4"> 
              <Image
                source={require("../assets/images/WoofWoof2.png")}
                className="w-[285px] h-[176px]"
                resizeMode="contain"
              />
            </View>

            {/* Bouton Apply */}
            <TouchableOpacity
              onPress={onApply}
              disabled={!selectedType}
              className={`rounded-2xl py-3 items-center ${selectedType ? "bg-woofBrown" : "bg-gray-400"
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