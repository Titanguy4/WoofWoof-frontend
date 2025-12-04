import { CityStepCard } from "@/components/RoadTrip/CityStepCard";
import { RoadTripInfoStep } from "@/components/RoadTrip/RoadTripInfoStep";
import { useRoadTripForm } from "@/hooks/roadTrip/useRoadTripForm";
import { COLORS } from "@/utils/constants/colors";
import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Navigation,
  Plus,
  X,
} from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RoadTrip() {
  const { t } = useTranslation("roadtrip");
  const {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    steps,
    maxProposalsPerStep,
    setMaxProposalsPerStep,
    isLoading,
    canProceedToStep2,
    validateEmail,
    addStep,
    removeStep,
    handleCityInputChange,
    selectCity,
    handleSubmit,
    resetForm,
  } = useRoadTripForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white pt-safe"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <View className="bg-woofBrown-100 p-2 rounded-full mr-3">
            <Navigation size={20} color={COLORS.woofBrown[500]} />
          </View>
          <Text className="text-2xl font-manropeBold text-woofBrown-700">
            {t("header.title")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <X size={20} color={COLORS.woofBrown[500]} />
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View className="flex-row px-6 py-4">
        <View className="flex-1 flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${currentStep >= 1 ? "bg-woofBrown-500" : "bg-gray-300"}`}
          >
            <Text className="text-white font-manropeBold">1</Text>
          </View>
          <View
            className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? "bg-woofBrown-500" : "bg-gray-300"}`}
          />
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${currentStep >= 2 ? "bg-woofBrown-500" : "bg-gray-300"}`}
          >
            <Text className="text-white font-manropeBold">2</Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6 py-4"
        keyboardShouldPersistTaps="handled"
      >
        {currentStep === 1 ? (
          <RoadTripInfoStep
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            validateEmail={validateEmail}
          />
        ) : (
          <>
            {/* Steps Section */}
            <View className="mb-6">
              <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-4">
                {t("steps.step")} du voyage
              </Text>

              {steps.map((step, index) => (
                <CityStepCard
                  key={index}
                  step={step}
                  index={index}
                  canRemove={steps.length > 1}
                  onRemove={removeStep}
                  onInputChange={handleCityInputChange}
                  onSelectCity={selectCity}
                />
              ))}

              {/* Add Step Button */}
              <TouchableOpacity
                onPress={addStep}
                className="flex-row items-center justify-center bg-woofBrown-100 rounded-2xl py-4 border-2 border-dashed border-woofBrown-300"
              >
                <Plus size={20} color={COLORS.woofBrown[500]} />
                <Text className="ml-2 font-manropeSemiBold text-woofBrown-600">
                  {t("steps.addStep")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Max Proposals Section */}
            <View className="mb-6">
              <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-2">
                {t("form.maxProposalsLabel")}
              </Text>
              <TextInput
                className="bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200 font-manrope text-base"
                placeholder="3"
                keyboardType="number-pad"
                value={maxProposalsPerStep}
                onChangeText={setMaxProposalsPerStep}
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="px-6 py-4 border-t border-gray-200 bg-white">
        {currentStep === 1 ? (
          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity
              onPress={resetForm}
              className="flex-1 bg-gray-100 rounded-2xl py-4 items-center"
            >
              <Text className="text-gray-700 font-manropeSemiBold text-base">
                {t("actions.reset")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentStep(2)}
              disabled={!canProceedToStep2()}
              className={`flex-1 rounded-2xl py-4 items-center shadow-lg flex-row justify-center ${
                canProceedToStep2() ? "bg-woofBrown-500" : "bg-gray-300"
              }`}
            >
              <Text className="text-white font-manropeBold text-lg mr-2">
                {t("actions.next")}
              </Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity
              onPress={() => setCurrentStep(1)}
              className="flex-1 bg-gray-100 rounded-2xl py-4 items-center flex-row justify-center"
            >
              <ArrowLeft size={20} color={COLORS.woofBrown[500]} />
              <Text className="text-woofBrown-700 font-manropeSemiBold text-base ml-2">
                {t("actions.back")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              className={`flex-1 rounded-2xl py-4 items-center shadow-lg ${
                isLoading ? "bg-woofBrown-300" : "bg-woofBrown-500"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-manropeBold text-lg">
                  {t("actions.submit")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
