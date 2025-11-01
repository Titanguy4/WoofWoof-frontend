import ApplyMissionCard from "@/components/ApplyMissionCard";
import { isValidEmail, isValidPhone } from "@/constants/validation";
import {
  missionsAnimal,
  missionsCultural,
  missionsEnv,
  missionsFarm,
  missionsNearby,
} from "@/data/missions";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { useBooking } from "@/hooks/useBooking";

type Props = {
  id: string | string[] | undefined;
};

export default function MissionRequest({ id }: Props) {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const { createBooking, loading } = useBooking();

  // Combine toutes les missions
  const allMissions = [
    ...missionsNearby,
    ...missionsFarm,
    ...missionsAnimal,
    ...missionsEnv,
    ...missionsCultural,
  ];

  const mission = allMissions.find((m) => m.id.toString() === id);

  if (!mission) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">Mission not found</Text>
      </View>
    );
  }

  const isFormValid =
    isValidEmail(email) && isValidPhone(number) && startDate && endDate;

  const handleApply = async () => {
    if (!mission || !startDate || !endDate) return;

    const booking = {
      missionId: mission.id,
      userId: 999, // temporaire
      startRequestedDate: dayjs(startDate).format("YYYY-MM-DD"),
      endRequestedDate: dayjs(endDate).format("YYYY-MM-DD"),
      status: "PENDING",
      email,
      number,
    };

    const result = await createBooking(booking);
    if (result) {
      router.push({
        pathname: "/requestsuccess/[id]",
        params: {
          id: String(id),
          start: booking.startRequestedDate,
          end: booking.endRequestedDate,
          email: booking.email,
          number: booking.number,
        },
      });

    }
  };


  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons name="chevron-left" size={30} color={COLORS.woofBrown} />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[90px]">
          Mission request
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 bg-woofCream px-4">
          {/* --- Mission card --- */}
          <View className="items-center mt-4">
            <ApplyMissionCard key={mission.id} {...mission} />
          </View>

          {/* --- Mission info --- */}
          <View className="rounded-2xl mt-4 px-4 py-4 bg-white">
            <View className="border-b border-gray-300 mb-2">
              <Text className="text-lg font-manropeBold">Your Mission</Text>
            </View>

            {/* Start date */}
            <View className="mt-2 pr-2 flex-row justify-between items-center">
              <Text className="text-base font-manropeBold">Start</Text>
              <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                <Text className="text-base font-manropeBold underline text-blue-600">
                  {startDate ? dayjs(startDate).format("YYYY-MM-DD") : "Choose"}
                </Text>
              </TouchableOpacity>
            </View>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}

            {/* End date */}
            <View className="mt-2 pr-2 flex-row justify-between items-center">
              <Text className="text-base font-manropeBold">End</Text>
              <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                <Text className="text-base font-manropeBold underline text-blue-600">
                  {endDate ? dayjs(endDate).format("YYYY-MM-DD") : "Choose"}
                </Text>
              </TouchableOpacity>
            </View>
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* --- Conditions --- */}
          <View className="rounded-2xl mt-4 px-4 bg-white">
            <View className="py-4 border-b border-gray-300">
              <Text className="text-lg font-manropeBold">Mission conditions</Text>
            </View>
            <View className="mt-4 px-4 mb-4">
              {mission.advantages?.map((advantage, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center py-2"
                >
                  <Text className="text-[14px] text-gray-700">{advantage}</Text>
                  <Text className="text-[14px] text-green-600">✔</Text>
                </View>
              ))}
            </View>
          </View>

          {/* --- Email --- */}
          <View className="rounded-2xl mt-4 px-4 bg-white">
            <View className="py-4 border-b border-gray-300">
              <Text className="text-lg font-manropeBold">Email</Text>
            </View>
            <View className="flex-row items-center my-4 bg-white border border-gray-300 rounded-3xl h-[52px] flex-1">
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={COLORS.woofGrey}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-[15px] font-manropeMedium ml-4"
              />
            </View>
          </View>

          {/* --- Phone --- */}
          <View className="rounded-2xl mt-4 mb-4 px-4 bg-white">
            <View className="py-4 border-b border-gray-300">
              <Text className="text-lg font-manropeBold">Number</Text>
            </View>
            <View className="flex-row items-center my-4 bg-white border border-gray-300 rounded-3xl h-[52px] flex-1">
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.woofGrey}
                value={number}
                onChangeText={setNumber}
                keyboardType="phone-pad"
                className="flex-1 text-[15px] font-manropeMedium ml-4"
              />
            </View>
          </View>

          {/* --- Apply button --- */}
          <View className="items-center mb-6">
            <TouchableOpacity
              disabled={!isFormValid || loading}
              onPress={handleApply}
              className={`w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center ${isFormValid ? "bg-woofBrown" : "bg-gray-400"
                }`}
            >
              <Text className="text-base font-manropeBold text-white">
                {loading ? "Submitting..." : "Apply now"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}