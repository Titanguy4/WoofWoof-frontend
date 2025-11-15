import { COLORS } from "@/constants/colors";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  Layout,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CardModal({
  visible,
  onClose,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardVisible, setCardVisible] = useState(false);



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
          className="bg-white rounded-t-3xl h-[383px] px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold text-center flex-1">
              Add Card
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          <View>
            {/* 📍 Card Number */}
            <View className="rounded-2xl mt-4 px-4 bg-white">
              <Text className="text-lg font-manrope">Card Number</Text>
              <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px] pr-3">
                <TextInput
                  placeholder="Type your card number"
                  placeholderTextColor={COLORS.woofGrey}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  className="flex-1 text-[15px] font-manropeMedium ml-4"
                />
                <Image
                  source={require("../assets/images/creditcard.png")}
                  className="w-[96px] h-[32px]"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="flex-row">
              {/* Expiration */}
              <View className="rounded-2xl px-4 bg-white flex-1">
                <Text className="text-lg font-manrope">Expiration</Text>
                <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                  <TextInput
                    placeholder="MM/YY"
                    placeholderTextColor={COLORS.woofGrey}
                    value={expirationDate}
                    onChangeText={setExpirationDate}
                    className="flex-1 text-[15px] font-manropeMedium ml-4"
                  />
                </View>
              </View>

              {/* CVV */}
              <View className="rounded-2xl px-4 bg-white flex-1">
                <Text className="text-lg font-manrope">CVV</Text>
                <View className="flex-row items-center mt-[6px] mb-5 border border-gray-300 rounded-2xl h-[52px]">
                  <TextInput
                    placeholder="XXX"
                    placeholderTextColor={COLORS.woofGrey}
                    value={cvv}
                    onChangeText={setCVV}
                    className="flex-1 text-[15px] font-manropeMedium ml-4"
                  />
                </View>
              </View>
            </View>



            {/* ✅ Bouton Add */}
            <TouchableOpacity
              onPress={() => {
                onClose(); // ferme le modal
                router.push({
                  pathname: "/paymentsuccess",
                });
              }}
              disabled={
                cardNumber.trim() === "" ||
                expirationDate.trim() === "" ||
                cvv.trim() === ""
              }
              className={`rounded-2xl py-3 mt-6 items-center ${cardNumber.trim() !== "" &&
                expirationDate.trim() !== "" &&
                cvv.trim() !== ""
                ? "bg-woofBrown"
                : "bg-gray-400"
                }`}
            >
              <Text className="text-white font-manropeBold text-base">
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
