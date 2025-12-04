import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  onPress: () => void;
  label?: string;
  disabled?: boolean;
};

export default function ButtonLoginKC({
  onPress,
  label = "Se connecter",
  disabled,
}: Readonly<Props>) {
  return (
    <View className="flex-1 bg-woofBrown-500 justify-center items-center">
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        className="w-2/3 h-20 rounded-md bg-white justify-center items-center shadow-sm"
      >
        <Text className="text-woofBrown-500 text-xl font-bold">{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
