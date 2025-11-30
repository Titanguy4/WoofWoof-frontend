import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Marker } from "react-native-maps";

interface StayMarkersProps {
  stays: Stay[];
  selectedStayId: number | null;
  onMarkerPress: (stay: Stay) => void;
}

export const StayMarkers: React.FC<StayMarkersProps> = ({
  stays,
  selectedStayId,
  onMarkerPress,
}) => {
  return (
    <>
      {stays.map((stay: Stay) => {
        const isSelected = selectedStayId === stay.id;

        return (
          <Marker
            key={stay.id}
            coordinate={{
              latitude: stay.localisation[0],
              longitude: stay.localisation[1],
            }}
            onPress={(e) => {
              e.stopPropagation();
              onMarkerPress(stay);
            }}
          >
            <MapPin
              fill={isSelected ? COLORS.woofHeart : COLORS.woofBrown[500]}
              color="black"
              strokeWidth={1}
              size={36}
            />
          </Marker>
        );
      })}
    </>
  );
};
