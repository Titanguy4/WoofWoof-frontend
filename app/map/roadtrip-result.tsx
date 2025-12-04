import { RoadTripMap } from "@/components/RoadTrip/RoadTripMap";
import { StayCard } from "@/components/RoadTrip/StayCard";
import { StepSelector } from "@/components/RoadTrip/StepSelector";
import { useRoadTripSelection } from "@/hooks/roadTrip/useRoadTripSelection";
import { useBooking } from "@/hooks/useBooking";
import { StepProposal } from "@/hooks/useWoofPlanner";
import BookingRequest from "@/types/booking/BookingRequest";
import { useAuth } from "@/utils/auth/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoadTripResult() {
  const { t } = useTranslation("roadtrip");
  const params = useLocalSearchParams();
  const roadTripPlan: { stepProposals: StepProposal[] } | null =
    params.roadTripPlan ? JSON.parse(params.roadTripPlan as string) : null;

  const email = params.email as string;
  const phoneNumber = params.phoneNumber as string;
  const startDate = params.startDate
    ? new Date(params.startDate as string)
    : null;
  const endDate = params.endDate ? new Date(params.endDate as string) : null;

  const scrollViewRef = useRef<ScrollView>(null);

  const { user } = useAuth();

  const {
    selectedStepIndex,
    setSelectedStepIndex,
    selectedStays,
    currentStep,
    allStays,
    toggleStaySelection,
    getSelectedStaysData,
  } = useRoadTripSelection(roadTripPlan);

  const { createMultipleBookings, loading: isBooking } = useBooking();

  if (!roadTripPlan || !currentStep) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 bg-woofBrown-500 justify-center items-center"
      >
        <Text className="text-white font-manropeBold text-lg">
          {t("result.noRoadTrip")}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/map")}
          className="mt-4 px-6 py-3 bg-woofCream rounded-full"
        >
          <Text className="font-manropeSemiBold">{t("actions.return")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleAccept = async () => {
    if (selectedStays.size === 0) {
      Alert.alert(t("errors.noSelection"), t("errors.noSelectionMessage"));
      return;
    }

    if (!startDate || !endDate) {
      Alert.alert(t("errors.error"), t("errors.missingDates"));
      return;
    }

    Alert.alert(
      t("booking.confirmation"),
      t("booking.confirmMessage", { count: selectedStays.size }),
      [
        { text: t("form.cancel"), style: "cancel" },
        {
          text: t("form.confirm"),
          onPress: async () => {
            try {
              const selectedStaysData = getSelectedStaysData();

              const bookingRequests: BookingRequest[] = selectedStaysData.map(
                (stay) => ({
                  stayId: stay.id,
                  userId: user.sub,
                  startRequestedDate: startDate.toISOString(),
                  endRequestedDate: endDate.toISOString(),
                  status: "pending" as const,
                  email: email,
                  number: phoneNumber,
                }),
              );

              const results = await createMultipleBookings(bookingRequests);

              if (results.failed.length === 0) {
                Alert.alert(
                  t("booking.success"),
                  t("booking.successMessage", {
                    count: results.success.length,
                  }),
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        router.dismiss();
                        router.push("/(tabs)/missions");
                      },
                    },
                  ],
                );
              } else if (results.success.length === 0) {
                Alert.alert(
                  t("booking.failure"),
                  t("booking.failureMessage", { count: results.failed.length }),
                );
              } else {
                Alert.alert(
                  t("booking.partialSuccess"),
                  t("booking.partialSuccessMessage", {
                    success: results.success.length,
                    failed: results.failed.length,
                  }),
                  [
                    {
                      text: "Voir mes réservations",
                      onPress: () => {
                        router.dismiss();
                        router.push("/(tabs)/missions");
                      },
                    },
                    {
                      text: "OK",
                      style: "cancel",
                    },
                  ],
                );
              }
            } catch (error) {
              console.error(
                "Erreur lors de la création des réservations:",
                error,
              );
              Alert.alert(t("errors.error"), t("errors.bookingError"));
            }
          },
        },
      ],
    );
  };

  const handleSelectStep = (index: number) => {
    setSelectedStepIndex(index);
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  return (
    <View className="flex-1 bg-white">
      <RoadTripMap allStays={allStays} selectedStays={selectedStays} />

      <View className="flex-1 bg-white">
        <StepSelector
          steps={roadTripPlan.stepProposals}
          selectedStepIndex={selectedStepIndex}
          selectedStays={selectedStays}
          onSelectStep={handleSelectStep}
        />

        <View className="flex-1">
          <View className="px-4 py-3 flex-row justify-between items-center">
            <View>
              <Text className="font-manropeBold text-lg text-gray-800">
                {t("result.staysAt")} {currentStep.cityName}
              </Text>
              <Text className="font-manrope text-sm text-gray-600">
                {currentStep.recommendedStays.length}{" "}
                {currentStep.recommendedStays.length > 1
                  ? t("result.stays")
                  : t("result.stay")}{" "}
                {currentStep.recommendedStays.length > 1
                  ? t("result.availablePlural")
                  : t("result.available")}
              </Text>
            </View>
            <View className="bg-woofBrown-100 px-3 py-2 rounded-full">
              <Text className="font-manropeSemiBold text-woofBrown-700">
                {selectedStays.size}{" "}
                {selectedStays.size > 1
                  ? t("result.selectedPlural")
                  : t("result.selected")}
              </Text>
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {currentStep.recommendedStays.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                isSelected={selectedStays.has(stay.id)}
                onToggle={toggleStaySelection}
              />
            ))}
          </ScrollView>
        </View>

        <View className="px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleAccept}
            disabled={selectedStays.size === 0 || isBooking}
            className={`rounded-2xl py-4 items-center shadow-lg ${
              selectedStays.size === 0 || isBooking
                ? "bg-gray-300"
                : "bg-woofBrown-500"
            }`}
          >
            {isBooking ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" size="small" />
                <Text className="text-white font-manropeBold text-lg ml-2">
                  {t("result.bookingInProgress")}
                </Text>
              </View>
            ) : (
              <Text className="text-white font-manropeBold text-lg">
                {t("result.book")}{" "}
                {selectedStays.size > 0 ? `(${selectedStays.size})` : ""}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
