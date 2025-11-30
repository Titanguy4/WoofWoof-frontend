import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

import { MapErrorState } from "@/components/RoadTrip/MapErrorState";
import { MapLoadingState } from "@/components/RoadTrip/MapLoadingState";
import { StayCard } from "@/components/RoadTrip/StayCard";
import { StayMarkers } from "@/components/RoadTrip/StayMarkers";
import { WoofPlannerButton } from "@/components/RoadTrip/WoofPlannerButton";
import { useMapSelection } from "@/hooks/roadTrip/useMapSelection";
import { getInitialMapRegion } from "@/utils/mapUtils";

export default function MapPage() {
  const { stays, loading, error, selectedStay, handleMarkerPress } =
    useMapSelection();

  if (loading) {
    return <MapLoadingState />;
  }

  if (error) {
    return <MapErrorState error={error} />;
  }

  return (
    <>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={getInitialMapRegion(stays)}
      >
        <StayMarkers
          stays={stays}
          selectedStayId={selectedStay?.id ?? null}
          onMarkerPress={handleMarkerPress}
        />
      </MapView>

      <WoofPlannerButton hasSelectedStay={!!selectedStay} />

      {selectedStay && (
        <View className="absolute bottom-6 w-full px-4">
          <StayCard stay={selectedStay} fullWidth />
        </View>
      )}
    </>
  );
}
