import { COLORS } from "@/utils/constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Mail, Phone } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RoadTripInfoStepProps {
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  validateEmail: (email: string) => boolean;
}

export const RoadTripInfoStep: React.FC<RoadTripInfoStepProps> = ({
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  validateEmail,
}) => {
  const { t } = useTranslation("roadtrip");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  const formatDate = (date: Date | null) => {
    if (!date) return t("form.selectDate");
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
      if (selectedDate) {
        setStartDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempStartDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowEndPicker(false);
      if (selectedDate) {
        setEndDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempEndDate(selectedDate);
      }
    }
  };

  const confirmStartDate = () => {
    if (tempStartDate) {
      setStartDate(tempStartDate);
    }
    setShowStartPicker(false);
    setTempStartDate(null);
  };

  const confirmEndDate = () => {
    if (tempEndDate) {
      setEndDate(tempEndDate);
    }
    setShowEndPicker(false);
    setTempEndDate(null);
  };

  const closeAllPickers = () => {
    setShowStartPicker(false);
    setShowEndPicker(false);
    setTempStartDate(null);
    setTempEndDate(null);
  };

  return (
    <View className="space-y-6">
      {/* Email */}
      <View>
        <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-2">
          {t("form.emailLabel")}
        </Text>
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
          <Mail size={20} color={COLORS.woofBrown[500]} />
          <TextInput
            className="flex-1 ml-3 font-manrope text-base"
            placeholder={t("form.emailPlaceholder")}
            value={email}
            onChangeText={setEmail}
            onFocus={closeAllPickers}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {email && !validateEmail(email) && (
          <Text className="text-red-500 text-sm mt-1 ml-2 font-manrope">
            {t("validation.invalidEmail")}
          </Text>
        )}
      </View>

      {/* Phone Number */}
      <View>
        <View className="flex-row items-center mb-2">
          <Text className="text-lg font-manropeSemiBold text-woofBrown-600">
            {t("form.phoneLabel")}
          </Text>
          <Text className="text-sm font-manrope text-gray-500 ml-2">
            {t("form.phoneOptional")}
          </Text>
        </View>
        <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200">
          <Phone size={20} color={COLORS.woofBrown[500]} />
          <TextInput
            className="flex-1 ml-3 font-manrope text-base"
            placeholder={t("form.phonePlaceholder")}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            onFocus={closeAllPickers}
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Date de début */}
      <View>
        <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-2">
          {t("form.startDateLabel")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowEndPicker(false);
            setTempEndDate(null);
            setTempStartDate(startDate);
            setShowStartPicker(true);
          }}
          className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200"
        >
          <Calendar size={20} color={COLORS.woofBrown[500]} />
          <Text
            className={`ml-3 font-manrope text-base ${!startDate ? "text-gray-400" : "text-gray-800"}`}
          >
            {formatDate(startDate)}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <>
            <DateTimePicker
              value={tempStartDate || startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleStartDateChange}
              minimumDate={new Date()}
            />
            {Platform.OS === "ios" && (
              <View className="flex-row justify-end mt-2 space-x-2">
                <TouchableOpacity
                  onPress={() => {
                    setShowStartPicker(false);
                    setTempStartDate(null);
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <Text className="font-manropeSemiBold text-gray-700">
                    {t("form.cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmStartDate}
                  className="bg-woofBrown-500 px-4 py-2 rounded-lg ml-2"
                >
                  <Text className="font-manropeSemiBold text-white">
                    {t("form.confirm")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      {/* Date de fin */}
      <View>
        <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-2">
          {t("form.endDateLabel")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowStartPicker(false);
            setTempStartDate(null);
            setTempEndDate(endDate);
            setShowEndPicker(true);
          }}
          className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200"
        >
          <Calendar size={20} color={COLORS.woofBrown[500]} />
          <Text
            className={`ml-3 font-manrope text-base ${!endDate ? "text-gray-400" : "text-gray-800"}`}
          >
            {formatDate(endDate)}
          </Text>
        </TouchableOpacity>
        {showEndPicker && (
          <>
            <DateTimePicker
              value={tempEndDate || endDate || startDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleEndDateChange}
              minimumDate={startDate || new Date()}
            />
            {Platform.OS === "ios" && (
              <View className="flex-row justify-end mt-2 space-x-2">
                <TouchableOpacity
                  onPress={() => {
                    setShowEndPicker(false);
                    setTempEndDate(null);
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  <Text className="font-manropeSemiBold text-gray-700">
                    {t("form.cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmEndDate}
                  className="bg-woofBrown-500 px-4 py-2 rounded-lg ml-2"
                >
                  <Text className="font-manropeSemiBold text-white">
                    {t("form.confirm")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        {endDate && startDate && endDate <= startDate && (
          <Text className="text-red-500 text-sm mt-1 ml-2 font-manrope">
            La date de fin doit être après la date de début
          </Text>
        )}
      </View>
    </View>
  );
};
