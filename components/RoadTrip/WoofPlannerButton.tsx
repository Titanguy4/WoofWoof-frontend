import { router } from "expo-router";
import { Route } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WoofPlannerButtonProps {
  hasSelectedStay: boolean;
}

export const WoofPlannerButton: React.FC<WoofPlannerButtonProps> = ({
  hasSelectedStay,
}) => {
  return (
    <View
      className="bg-white rounded-xl p-4 absolute right-0 m-8 shadow-lg"
      style={{
        bottom: hasSelectedStay ? 180 : 20,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("/map/roadtrip")}
        className="flex-row items-center gap-x-4"
      >
        <Text className="font-bold">WoofPlanner</Text>
        <Route size={32} />
      </TouchableOpacity>
    </View>
  );
};
