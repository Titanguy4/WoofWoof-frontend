import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { calculateMapRegion, groupStaysByCoordinates } from "@/utils/mapUtils";
import { MapPin } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";

interface RoadTripMapProps {
  allStays: Stay[];
  selectedStays: Set<number>;
}

export const RoadTripMap: React.FC<RoadTripMapProps> = ({
  allStays,
  selectedStays,
}) => {
  const { t } = useTranslation("roadtrip");
  const groupedStays = groupStaysByCoordinates(allStays);
  const selectedCoordinates = allStays
    .filter((stay) => selectedStays.has(stay.id))
    .map((stay) => ({
      latitude: stay.localisation[0],
      longitude: stay.localisation[1],
    }));

  return (
    <MapView
      style={{ width: "100%", height: "50%" }}
      initialRegion={calculateMapRegion(allStays)}
    >
      {groupedStays.map((group, groupIndex) => {
        const hasSelection = group.stays.some((stay) =>
          selectedStays.has(stay.id),
        );
        const allSelected = group.stays.every((stay) =>
          selectedStays.has(stay.id),
        );

        return (
          <Marker key={`group-${groupIndex}`} coordinate={group.coordinate}>
            <View className="items-center">
              <View className="relative">
                <MapPin
                  fill={
                    allSelected
                      ? COLORS.woofHeart
                      : hasSelection
                        ? COLORS.woofBrown[300]
                        : COLORS.woofBrown[500]
                  }
                  color="black"
                  strokeWidth={1}
                  size={36}
                />
                {group.stays.length > 1 && (
                  <View className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 items-center justify-center border-2 border-woofBrown-500 shadow">
                    <Text className="text-xs font-manropeBold text-woofBrown-500">
                      {group.stays.length}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <Callout tooltip>
              <View className="bg-white rounded-lg p-3 shadow-lg min-w-[200px] max-w-[250px]">
                <Text className="font-manropeBold text-sm mb-2">
                  {group.stays.length} {t("result.staysHere")}
                </Text>
                {group.stays.map((stay, index) => (
                  <View key={stay.id} className="mb-1">
                    <Text className="font-manrope text-xs" numberOfLines={1}>
                      {index + 1}. {stay.title}
                    </Text>
                  </View>
                ))}
              </View>
            </Callout>
          </Marker>
        );
      })}

      {selectedCoordinates.length >= 2 && (
        <Polyline
          coordinates={selectedCoordinates}
          strokeColor={COLORS.woofBrown[500]}
          strokeWidth={3}
          lineDashPattern={[10, 5]}
        />
      )}
    </MapView>
  );
};
