import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

import { MapErrorState } from "@/components/RoadTrip/MapErrorState";
import { MapLoadingState } from "@/components/RoadTrip/MapLoadingState";
import { StayCard } from "@/components/RoadTrip/StayCard";
import { StayMarkers } from "@/components/RoadTrip/StayMarkers";
import { WoofPlannerButton } from "@/components/RoadTrip/WoofPlannerButton";
import { useMapSelection } from "@/hooks/roadTrip/useMapSelection";
import { getInitialMapRegion } from "@/utils/mapUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function MapPage() {
  const { stays, loading, error, selectedStay, handleMarkerPress } =
    useMapSelection();

  const params = useLocalSearchParams();
  const sessionId = params.session_id as string | undefined;

  const [paid, setPaid] = useState<boolean | null>(null);

  useEffect(() => {
    // Pas de session_id => user n'a pas payé
    if (!sessionId) {
      setPaid(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `http://localhost:8082/payments/verify-session?session_id=${sessionId}`
        );
        const data = await res.json();
        setPaid(data.paid);
      } catch {
        setPaid(false);
      }
    };

    verify();
  }, [sessionId]);

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

      {paid === null ? null : (
        paid ? (
          <WoofPlannerButton hasSelectedStay={!!selectedStay} />
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 180,
              right: 20,
              backgroundColor: "#6c4f3d",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
            }}
            onPress={async () => {
              // création session Stripe
              const response = await fetch(
                "http://localhost:8082/payments/checkout/session",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    amount: 50, // montant en centimes
                    currency: "eur",
                    description: "WoofPlanner Reservation",
                  }),
                }
              );

              if (!response.ok) return;

              const sessionUrl = await response.text();
              Linking.openURL(sessionUrl);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Payer WoofPlanner
            </Text>
          </TouchableOpacity>
        )
      )}

      {selectedStay && (
        <View className="absolute bottom-6 w-full px-4">
          <StayCard stay={selectedStay} fullWidth />
        </View>
      )}
    </>
  );
}
