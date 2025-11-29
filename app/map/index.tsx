import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import ResultMissionCard from "@/components/ResultMissionCard";
import { useStay } from "@/hooks/useStay";
import { Activity } from "@/types/stayservice/Activity";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { MapPin, Route } from "lucide-react-native";

export default function MapPage() {
  const { stays, getAllStays, loading, error } = useStay();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  useEffect(() => {
    getAllStays();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-woofBrown-500 justify-center items-center pt-safe">
        <ActivityIndicator size="large" color={COLORS.woofCream[500]} />
        <Text className="mt-4 text-white font-manropeSemiBold">
          Chargement des stays...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 bg-woofBrown-500 justify-center items-center px-4"
      >
        <Text className="text-white font-manropeBold text-lg mb-2">Erreur</Text>
        <Text className="text-white font-manrope text-center">{error}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 bg-woofCream rounded-full"
        >
          <Text className="font-manropeSemiBold">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      {/* MAP */}
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: stays.length > 0 ? stays[0].localisation[0] : 46.5,
          longitude: stays.length > 0 ? stays[0].localisation[1] : 2.2,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}
      >
        {stays.map((stay: Stay) => {
          const isSelected = selectedStay?.id === stay.id;

          return (
            <Marker
              key={stay.id}
              coordinate={{
                latitude: stay.localisation[0],
                longitude: stay.localisation[1],
              }}
              onPress={() => setSelectedStay(stay)}
            >
              <MapPin
                fill={isSelected ? COLORS.woofBrown[500] : COLORS.woofHeart}
                color={isSelected ? COLORS.woofBrown[500] : COLORS.woofHeart}
              />
            </Marker>
          );
        })}

        <View className="bg-white rounded-xl p-4 absolute bottom-0 right-0 m-8">
          <TouchableOpacity onPress={() => router.push("/map/roadtrip")}>
            <Route />
          </TouchableOpacity>
        </View>
      </MapView>

      {selectedStay && (
        <View className="absolute bottom-6 w-full px-4">
          <ResultMissionCard
            id={selectedStay.id}
            image={{
              uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvoyageforum.info%2Fimages%2Fhd%2Fposts%2Fopenmedium%2F1565809766-obt29F7ycgZ5Gwd.jpeg&f=1&nofb=1&ipt=293bb6071a66312150a9d449698c8e1ddfa64514f8f144f18e9e037c02062776",
            }} // À remplacer par l'image réelle
            title={selectedStay.title}
            location={`${selectedStay.region || ""} ${selectedStay.department || ""}`.trim()}
            description={selectedStay.description}
            advantages={selectedStay.activities.map((a: Activity) => a.label)}
            locationDetails={`${selectedStay.localisation[0]} / ${selectedStay.localisation[1]}`}
          />
        </View>
      )}
    </>
  );
}
