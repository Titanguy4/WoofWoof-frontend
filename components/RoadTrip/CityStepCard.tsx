import { StepInput } from "@/hooks/roadTrip/useRoadTripForm";
import { GeocodingResult } from "@/hooks/useGeocodeFrenchCity";
import { COLORS } from "@/utils/constants/colors";
import { MapPinned, Trash2 } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CityStepCardProps {
  step: StepInput;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
  onInputChange: (index: number, text: string) => void;
  onSelectCity: (index: number, city: GeocodingResult) => void;
}

export const CityStepCard: React.FC<CityStepCardProps> = ({
  step,
  index,
  canRemove,
  onRemove,
  onInputChange,
  onSelectCity,
}) => {
  const { t } = useTranslation("roadtrip");

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200">
      {/* Step Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="bg-woofBrown-500 w-8 h-8 rounded-full items-center justify-center mr-2">
            <Text className="text-white font-manropeBold">{index + 1}</Text>
          </View>
          <Text className="text-base font-manropeSemiBold text-gray-700">
            {t("steps.step")} {index + 1}
          </Text>
        </View>
        {canRemove && (
          <TouchableOpacity onPress={() => onRemove(index)} className="p-2">
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      {/* City Search */}
      <View className="mb-3">
        <Text className="text-sm font-manropeSemiBold text-gray-600 mb-1">
          {t("form.cityLabel")}
        </Text>
        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-white rounded-xl px-4 py-3 border border-gray-300 font-manrope"
            placeholder={t("form.cityPlaceholder")}
            value={step.citySearch}
            onChangeText={(text) => onInputChange(index, text)}
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
                onPress={() => onSelectCity(index, city)}
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
        <View className="bg-woofBrown-50 rounded-xl p-3">
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
              {t("city.noCity")}
            </Text>
          </View>
        )}
    </View>
  );
};
