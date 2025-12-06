import ApplyMissionCard from "@/components/ApplyMissionCard";
import { useBooking } from "@/hooks/useBooking";
import { useStay } from "@/hooks/useStay";
import BookingRequest from "@/types/booking/BookingRequest";
import { Stay } from "@/types/stayservice/Stay";
import { useAuth } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { isValidEmail, isValidPhone } from "@/utils/constants/validation";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const { getStayById, loading: stayLoading, error: stayError } = useStay();
  const [stay, setStay] = useState<Stay | null>(null);

  //user
  const { user } = useAuth();

  //recuperation du stay avec l'id
  useEffect(() => {
    const loadStay = async () => {
      const stayData = await getStayById(Number(id));
      if (stayData) setStay(stayData);
    };
    loadStay();
  }, [id]);

  if (stayLoading || !stay) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>Loading stay...</Text>
      </SafeAreaView>
    );
  }

  if (stayError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text>Error: {stayError}</Text>
      </SafeAreaView>
    );
  }

  if (!stay) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">Mission not found</Text>
      </View>
    );
  }

  const isFormValid =
    isValidEmail(email) && isValidPhone(number) && startDate && endDate;

  const handleApply = async () => {
    if (!stay || !startDate || !endDate) return;

    // ✅ correspond au type Omit<Booking, "id">
    const booking: BookingRequest = {
      stayId: stay.id,
      userId: user?.id || null,
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
          start: dayjs(startDate).format("YYYY-MM-DD"),
          end: dayjs(endDate).format("YYYY-MM-DD"),
          email,
          number,
        },
      });
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500]}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[90px]">
          Mission request
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 bg-woofCream-500 px-4">
          {/* --- Mission card --- */}
          <View className="items-center mt-4">
            <ApplyMissionCard key={stay.id} stay={stay} />
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
              <Text className="text-lg font-manropeBold">
                Mission conditions
              </Text>
            </View>
            <View className="mt-4 px-4 mb-4">
              {stay.accomodations?.map((adv, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center py-2"
                >
                  <Text className="text-[14px] text-gray-700">{adv.label}</Text>
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
                placeholderTextColor={COLORS.woofGrey[500]}
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
                placeholderTextColor={COLORS.woofGrey[500]}
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
              className={`w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center ${isFormValid ? "bg-woofBrown-500" : "bg-gray-400"
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
