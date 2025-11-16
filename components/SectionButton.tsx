import { COLORS } from "@/utils/constants/colors";
import { ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SectionButtonProps = {
  icon?: ReactNode;
  label: string;
  onPress?: () => void;
  showChevron?: boolean;
};

export function SectionButton({
  icon,
  label,
  onPress,
  showChevron = true,
}: Readonly<SectionButtonProps>) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row py-3 items-center justify-between">
        <View className="flex-row items-center gap-x-3">
          {icon}
          <Text className="text-lg">{label}</Text>
        </View>
        {showChevron && (
          <ChevronRight
            className="start-end"
            size={24}
            color={COLORS.woofGrey[500][900]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
