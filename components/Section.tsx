import { ReactNode } from "react";
import { Text, View } from "react-native";

type SectionProps = {
  title: string;
  children: ReactNode;
  withDivider?: boolean;
};

export function Section({
  title,
  children,
  withDivider = false,
}: Readonly<SectionProps>) {
  return (
    <View className="gap-y-1">
      {withDivider && <View className="border-t border-woofGrey" />}
      <Text className="mt-3 font-bold text-lg">{title}</Text>
      {children}
    </View>
  );
}
