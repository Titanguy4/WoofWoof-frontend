import {
  GeocodingResult,
  useGeocodeFrenchCity,
} from "@/hooks/useGeocodeFrenchCity";
import { useWoofPlanner } from "@/hooks/useWoofPlanner";
import { COLORS } from "@/utils/constants/colors";
import { router } from "expo-router";
import { MapPinned, Navigation, Plus, Trash2, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface StepInput {
  citySearch: string;
  isSearching: boolean;
  data: GeocodingResult | null;
  suggestions: GeocodingResult[];
  showSuggestions: boolean;
}

export default function RoadTrip() {
  const { searchCities } = useGeocodeFrenchCity();
  const { createRoadTrip, isLoading, error } = useWoofPlanner();
  const [steps, setSteps] = useState<StepInput[]>([
    {
      citySearch: "",
      isSearching: false,
      data: null,
      suggestions: [],
      showSuggestions: false,
    },
  ]);
  const [maxProposalsPerStep, setMaxProposalsPerStep] = useState<string>("3");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        citySearch: "",
        isSearching: false,
        data: null,
        suggestions: [],
        showSuggestions: false,
      },
    ]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleCitySearch = async (index: number, cityName: string) => {
    if (cityName.length < 2) {
      const newSteps = [...steps];
      newSteps[index].suggestions = [];
      newSteps[index].showSuggestions = false;
      setSteps(newSteps);
      return;
    }

    const newSteps = [...steps];
    newSteps[index].isSearching = true;
    setSteps(newSteps);

    const results = await searchCities(cityName);

    const updatedSteps = [...steps];
    updatedSteps[index].isSearching = false;
    updatedSteps[index].suggestions = results;
    updatedSteps[index].showSuggestions = results.length > 0;
    setSteps(updatedSteps);
  };

  const handleCityInputChange = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index].citySearch = text;
    newSteps[index].data = null;
    setSteps(newSteps);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        handleCitySearch(index, text);
      }, 500);
    } else {
      const resetSteps = [...steps];
      resetSteps[index].suggestions = [];
      resetSteps[index].showSuggestions = false;
      setSteps(resetSteps);
    }
  };

  const selectCity = (index: number, city: GeocodingResult) => {
    const newSteps = [...steps];
    newSteps[index].citySearch = city.city;
    newSteps[index].data = city;
    newSteps[index].showSuggestions = false;
    newSteps[index].suggestions = [];
    setSteps(newSteps);
  };

  const handleSubmit = async () => {
    const validSteps = steps
      .filter((step) => step.data !== null)
      .map((step) => ({
        cityName: step.data!.city,
        region: step.data!.region,
        latitude: step.data!.latitude,
        longitude: step.data!.longitude,
      }));

    if (validSteps.length === 0) {
      Alert.alert("Erreur", "Veuillez ajouter au moins une ville valide");
      return;
    }

    const roadTripRequest = {
      steps: validSteps,
      maxProposalsPerStep: parseInt(maxProposalsPerStep) || 3,
    };

    const result = await createRoadTrip(roadTripRequest);

    let timeout;
    if (result) {
      router.dismiss();
      timeout = setTimeout(() => {
        router.push({
          pathname: "/map/roadtrip-result",
          params: {
            roadTripPlan: JSON.stringify(result),
          },
        });
      }, 100);
    } else {
      Alert.alert(
        "Erreur",
        error || "Une erreur est survenue lors de la création du road trip",
      );
    }
  };

  const resetForm = () => {
    setSteps([
      {
        citySearch: "",
        isSearching: false,
        data: null,
        suggestions: [],
        showSuggestions: false,
      },
    ]);
    setMaxProposalsPerStep("3");
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
            Road Trip
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <X size={20} color={COLORS.woofBrown[500]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-6 py-4"
        keyboardShouldPersistTaps="handled"
      >
        {/* Steps Section */}
        <View className="mb-6">
          <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-4">
            Étapes du voyage
          </Text>

          {steps.map((step, index) => (
            <View
              key={index}
              className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200"
            >
              {/* Step Header */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <View className="bg-woofBrown-500 w-8 h-8 rounded-full items-center justify-center mr-2">
                    <Text className="text-white font-manropeBold">
                      {index + 1}
                    </Text>
                  </View>
                  <Text className="text-base font-manropeSemiBold text-gray-700">
                    Étape {index + 1}
                  </Text>
                </View>
                {steps.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeStep(index)}
                    className="p-2"
                  >
                    <Trash2 size={18} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              {/* City Search */}
              <View className="mb-3">
                <Text className="text-sm font-manropeSemiBold text-gray-600 mb-1">
                  Ville
                </Text>
                <View className="flex-row items-center">
                  <TextInput
                    className="flex-1 bg-white rounded-xl px-4 py-3 border border-gray-300 font-manrope"
                    placeholder="Ex: Paris, Lyon, Marseille..."
                    value={step.citySearch}
                    onChangeText={(text) => handleCityInputChange(index, text)}
                    returnKeyType="done"
                  />
                  {step.isSearching && (
                    <ActivityIndicator
                      size="small"
                      color={COLORS.woofBrown[500]}
                      className="ml-2"
                    />
                  )}
                </View>

                {/* Suggestions Dropdown */}
                {step.showSuggestions && step.suggestions.length > 0 && (
                  <View className="mt-2 bg-white rounded-xl border border-gray-300 overflow-hidden">
                    {step.suggestions.map((city, cityIndex) => (
                      <TouchableOpacity
                        key={cityIndex}
                        onPress={() => selectCity(index, city)}
                        className="px-4 py-3 border-b border-gray-100"
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center">
                          <MapPinned
                            size={14}
                            color={COLORS.woofBrown[500]}
                            className="mr-2"
                          />
                          <View className="flex-1">
                            <Text className="font-manropeSemiBold text-gray-800">
                              {city.city}
                            </Text>
                            <Text className="text-xs font-manrope text-gray-500">
                              {city.region}
                              {city.postalCode && ` • ${city.postalCode}`}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Display Selected Result */}
              {step.data && !step.showSuggestions && (
                <View className="bg-woofBrown-50 rounded-xl p-3 space-y-2">
                  <View className="flex-row items-center">
                    <MapPinned size={16} color={COLORS.woofBrown[500]} />
                    <Text className="ml-2 font-manropeSemiBold text-woofBrown-700">
                      {step.data.city}
                    </Text>
                  </View>
                </View>
              )}

              {!step.data &&
                !step.isSearching &&
                !step.showSuggestions &&
                step.citySearch.length > 2 && (
                  <View className="bg-red-50 rounded-xl p-3">
                    <Text className="text-sm font-manrope text-red-600">
                      Aucune ville trouvée. Vérifiez l&apos;orthographe.
                    </Text>
                  </View>
                )}
            </View>
          ))}

          {/* Add Step Button */}
          <TouchableOpacity
            onPress={addStep}
            className="flex-row items-center justify-center bg-woofBrown-100 rounded-2xl py-4 border-2 border-dashed border-woofBrown-300"
          >
            <Plus size={20} color={COLORS.woofBrown[500]} />
            <Text className="ml-2 font-manropeSemiBold text-woofBrown-600">
              Ajouter une étape
            </Text>
          </TouchableOpacity>
        </View>

        {/* Max Proposals Section */}
        <View className="mb-6">
          <Text className="text-lg font-manropeSemiBold text-woofBrown-600 mb-2">
            Nombre de propositions par étape
          </Text>
          <TextInput
            className="bg-gray-50 rounded-2xl px-4 py-4 border border-gray-200 font-manrope text-base"
            placeholder="3"
            keyboardType="number-pad"
            value={maxProposalsPerStep}
            onChangeText={setMaxProposalsPerStep}
          />
        </View>
      </ScrollView>

      <View className="px-6 py-4 border-gray-200 space-y-3 bg-white flex flex-row justify-around">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          className={`rounded-2xl py-4 items-center shadow-lg w-[45%] ${
            isLoading ? "bg-woofBrown-300" : "bg-woofBrown-500"
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-manropeBold text-lg">Créer</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetForm}
          disabled={isLoading}
          className="bg-gray-100 rounded-2xl py-4 items-center w-[45%]"
        >
          <Text className="text-gray-700 font-manropeSemiBold text-base">
            Réinitialiser
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
