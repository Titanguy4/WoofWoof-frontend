import { StepProposal } from "@/hooks/useWoofPlanner";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface StepSelectorProps {
  steps: StepProposal[];
  selectedStepIndex: number;
  selectedStays: Set<number>;
  onSelectStep: (index: number) => void;
}

export const StepSelector: React.FC<StepSelectorProps> = ({
  steps,
  selectedStepIndex,
  selectedStays,
  onSelectStep,
}) => {
  return (
    <View className="px-4 py-3 border-b border-gray-200">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {steps.map((step, index) => {
          const stepHasSelection = step.recommendedStays.some((stay) =>
            selectedStays.has(stay.id),
          );
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectStep(index)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                selectedStepIndex === index ? "bg-woofBrown-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-manropeSemiBold ${
                  selectedStepIndex === index ? "text-white" : "text-gray-700"
                }`}
              >
                {step.cityName}
              </Text>
              {stepHasSelection && (
                <View className="ml-2 w-2 h-2 rounded-full bg-green-500" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
