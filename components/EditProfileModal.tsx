import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
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
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [callingCode, setCallingCode] = useState("+33");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  useEffect(() => {
    setNewValue(String(value));
  }, [value]);

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    onSave(attribute, passwords.new);
    onClose();
  };

  const handleNumberSave = () => {
    if (!newValue.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    onSave(attribute, `${callingCode} ${newValue}`);
    onClose();
  };

  const handleDefaultSave = () => {
    onSave(attribute, newValue);
    onClose();
  };

  // 📱 Quand un pays est sélectionné
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode[0]}`);
    setShowCountryPicker(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <BlurView intensity={40} tint="dark" className="absolute inset-0" />
        <View className="absolute inset-0 bg-black/30" />

        <Animated.View
          exiting={SlideOutDown.duration(250)}
          style={{ height: attribute === "password" ? 450 : 250 }}
          className="bg-white rounded-t-3xl px-5 py-6"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-manropeBold flex-1 capitalize">
              {attribute === "password"
                ? "Change Password"
                : `Change ${attribute}`}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-2xl text-gray-500">✕</Text>
            </TouchableOpacity>
          </View>

          {/* 🔐 PASSWORD */}
          {attribute === "password" ? (
            <View className="gap-y-3 mt-4">
              <Text className="text-lg font-manrope capitalize">
                Current password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Enter your current password"
                className="border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manropeBold"
                value={passwords.current}
                onChangeText={(t) =>
                  setPasswords((prev) => ({ ...prev, current: t }))
                }
              />
              <Text className="text-lg font-manrope capitalize">
                New password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Enter your new password"
                className="border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manropeBold"
                value={passwords.new}
                onChangeText={(t) =>
                  setPasswords((prev) => ({ ...prev, new: t }))
                }
              />
              <Text className="text-lg font-manrope capitalize">
                Confirm new password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Confirm your new password"
                className="border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manropeBold"
                value={passwords.confirm}
                onChangeText={(t) =>
                  setPasswords((prev) => ({ ...prev, confirm: t }))
                }
              />
              <TouchableOpacity
                onPress={handlePasswordSave}
                className="rounded-2xl py-3 mt-4 items-center bg-woofBrown-500"
              >
                <Text className="text-white font-manropeBold text-base">
                  Save Password
                </Text>
              </TouchableOpacity>
            </View>
          ) : attribute === "number" ? (
            // 📞 NUMÉRO DE TÉLÉPHONE
            <View className="mt-4">
              <View className="flex-row items-center gap-x-2">
                <TouchableOpacity
                  onPress={() => setShowCountryPicker(true)}
                  className="flex-row items-center border border-gray-300 rounded-xl px-3 py-3"
                >
                  <Text className="text-base font-manropeBold mr-1">
                    {callingCode}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="gray" />
                </TouchableOpacity>

                <TextInput
                  keyboardType="phone-pad"
                  placeholder="Enter your number"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manropeBold"
                  value={newValue}
                  onChangeText={setNewValue}
                />
              </View>

              <TouchableOpacity
                onPress={handleNumberSave}
                className="rounded-2xl py-3 mt-6 items-center bg-woofBrown-500"
              >
                <Text className="text-white font-manropeBold text-base">
                  Save Number
                </Text>
              </TouchableOpacity>

              {/* 🌍 Menu de sélection du pays */}
              {showCountryPicker && (
                <CountryPicker
                  withFlag
                  withCallingCode
                  withFilter
                  withCountryNameButton={false}
                  withAlphaFilter
                  onSelect={onSelect}
                  countryCode={countryCode}
                  visible={showCountryPicker}
                  onClose={() => setShowCountryPicker(false)}
                />
              )}
            </View>
          ) : (
            // ✏️ AUTRES CHAMPS
            <View>
              <Text className="text-lg font-manrope capitalize mb-2">
                {attribute}
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3 text-base text-black font-manrope"
                value={newValue}
                onChangeText={setNewValue}
                placeholder={`Enter your ${attribute}`}
              />
              <TouchableOpacity
                onPress={handleDefaultSave}
                className="rounded-2xl py-3 mt-6 items-center bg-woofBrown-500"
              >
                <Text className="text-white font-manropeBold text-base">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
