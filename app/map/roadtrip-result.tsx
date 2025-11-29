import { StepProposal } from "@/hooks/useWoofPlanner";
import { Stay } from "@/types/stayservice/Stay";
import { COLORS } from "@/utils/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { Check, MapPin } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const groupStaysByCoordinates = (stays: Stay[]) => {
  const groups = new Map<string, Stay[]>();

  stays.forEach((stay) => {
    const key = `${stay.localisation[0]},${stay.localisation[1]}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(stay);
  });

  return Array.from(groups.entries()).map(([coords, staysAtLocation]) => {
    const [lat, lng] = coords.split(",").map(Number);
    return {
      coordinate: { latitude: lat, longitude: lng },
      stays: staysAtLocation,
    };
  });
};

export default function RoadTripResult() {
  const params = useLocalSearchParams();
  const roadTripPlan: { stepProposals: StepProposal[] } = params.roadTripPlan
    ? JSON.parse(params.roadTripPlan as string)
    : null;

  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [selectedStays, setSelectedStays] = useState<Set<number>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);

  if (!roadTripPlan) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 bg-woofBrown-500 justify-center items-center"
      >
        <Text className="text-white font-manropeBold text-lg">
          Aucun road trip trouvé
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/map")}
          className="mt-4 px-6 py-3 bg-woofCream rounded-full"
        >
          <Text className="font-manropeSemiBold">Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const currentStep = roadTripPlan.stepProposals[selectedStepIndex];
  const allStays: Stay[] = roadTripPlan.stepProposals.flatMap(
    (step) => step.recommendedStays,
  );

  const toggleStaySelection = (stayId: number) => {
    const newSelection = new Set(selectedStays);
    if (newSelection.has(stayId)) {
      newSelection.delete(stayId);
    } else {
      newSelection.add(stayId);
    }
    setSelectedStays(newSelection);
  };

  const handleStayScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (width - 32));
    if (index >= 0 && index < currentStep.recommendedStays.length) {
      // Optionnel : centrer la map sur ce stay
    }
  };

  const handleAccept = () => {
    if (selectedStays.size === 0) {
      Alert.alert(
        "Aucune sélection",
        "Veuillez sélectionner au moins un séjour pour continuer",
      );
      return;
    }

    const selectedStaysData = allStays.filter((stay) =>
      selectedStays.has(stay.id),
    );

    Alert.alert(
      "Confirmation",
      `Vous avez sélectionné ${selectedStays.size} séjour(s).\nCes séjours seront ajoutés à vos réservations.`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: () => {
            router.push("/map");
          },
        },
      ],
    );
  };

  // Grouper les stays par coordonnées
  const groupedStays = groupStaysByCoordinates(allStays);

  // Calculer les coordonnées pour la polyline (uniquement stays sélectionnés)
  const selectedCoordinates = allStays
    .filter((stay) => selectedStays.has(stay.id))
    .map((stay) => ({
      latitude: stay.localisation[0],
      longitude: stay.localisation[1],
    }));

  // Calculer la région initiale
  const coordinates = allStays.map((stay) => ({
    latitude: stay.localisation[0],
    longitude: stay.localisation[1],
  }));

  return (
    <View className="flex-1 bg-white">
      {/* MAP */}
      <MapView
        style={{
          width: "100%",
          height: "50%",
        }}
        initialRegion={{
          latitude:
            coordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
            coordinates.length,
          longitude:
            coordinates.reduce((sum, coord) => sum + coord.longitude, 0) /
            coordinates.length,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {/* Afficher un marker par groupe de coordonnées */}
        {groupedStays.map((group, groupIndex) => {
          // Vérifier si au moins un stay du groupe est sélectionné
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
                    color={"black"}
                    strokeWidth={1}
                    size={36}
                  />
                  {/* Badge avec le nombre de stays */}
                  {group.stays.length > 1 && (
                    <View className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 items-center justify-center border-2 border-woofBrown-500 shadow">
                      <Text className="text-xs font-manropeBold text-woofBrown-500">
                        {group.stays.length}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Callout pour afficher les stays à cet endroit */}
              <Callout
                tooltip
                onPress={() => {
                  // Optionnel : ouvrir une modal avec tous les stays
                  console.log("Stays à cet endroit:", group.stays);
                }}
              >
                <View className="bg-white rounded-lg p-3 shadow-lg min-w-[200px] max-w-[250px]">
                  <Text className="font-manropeBold text-sm mb-2">
                    {group.stays.length} séjour
                    {group.stays.length > 1 ? "s" : ""} ici
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

        {/* Polyline uniquement si au moins 2 stays sont sélectionnés */}
        {selectedCoordinates.length >= 2 && (
          <Polyline
            coordinates={selectedCoordinates}
            strokeColor={COLORS.woofBrown[500]}
            strokeWidth={3}
            lineDashPattern={[10, 5]}
          />
        )}
      </MapView>

      {/* Bottom Section */}
      <View className="flex-1 bg-white">
        {/* Step Selector */}
        <View className="px-4 py-3 border-b border-gray-200">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {roadTripPlan.stepProposals.map((step, index) => {
              const stepHasSelection = step.recommendedStays.some((stay) =>
                selectedStays.has(stay.id),
              );
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedStepIndex(index);
                    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
                  }}
                  className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                    selectedStepIndex === index
                      ? "bg-woofBrown-500"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`font-manropeSemiBold ${
                      selectedStepIndex === index
                        ? "text-white"
                        : "text-gray-700"
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

        {/* Stays Carousel */}
        <View className="flex-1">
          <View className="px-4 py-3 flex-row justify-between items-center">
            <View>
              <Text className="font-manropeBold text-lg text-gray-800">
                Séjours à {currentStep.cityName}
              </Text>
              <Text className="font-manrope text-sm text-gray-600">
                {currentStep.recommendedStays.length} séjour
                {currentStep.recommendedStays.length > 1 ? "s" : ""} disponible
                {currentStep.recommendedStays.length > 1 ? "s" : ""}
              </Text>
            </View>
            <View className="bg-woofBrown-100 px-3 py-2 rounded-full">
              <Text className="font-manropeSemiBold text-woofBrown-700">
                {selectedStays.size} sélectionné
                {selectedStays.size > 1 ? "s" : ""}
              </Text>
            </View>
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleStayScroll}
            decelerationRate="fast"
            snapToInterval={width - 32}
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {currentStep.recommendedStays.map((stay) => {
              const isSelected = selectedStays.has(stay.id);
              return (
                <View
                  key={stay.id}
                  style={{ width: width - 32, marginRight: 16 }}
                >
                  <TouchableOpacity
                    onPress={() => toggleStaySelection(stay.id)}
                    activeOpacity={0.9}
                    className={`relative ${
                      isSelected
                        ? "border-4 border-woofBrown-500 rounded-3xl"
                        : ""
                    }`}
                  >
                    {isSelected && (
                      <View className="absolute top-4 right-4 z-10 bg-woofBrown-500 rounded-full p-2 shadow-lg">
                        <Check size={24} color="white" />
                      </View>
                    )}

                    <View className="w-full bg-white rounded-2xl flex-row overflow-hidden border border-woofBrown-200">
                      {/* Image */}
                      <Image
                        source={{
                          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvoyageforum.info%2Fimages%2Fhd%2Fposts%2Fopenmedium%2F1565809766-obt29F7ycgZ5Gwd.jpeg&f=1&nofb=1&ipt=293bb6071a66312150a9d449698c8e1ddfa64514f8f144f18e9e037c02062776",
                        }}
                        className="h-full w-[115px]"
                        resizeMode="cover"
                      />

                      {/* Texte */}
                      <View className="p-3 flex-1 justify-between">
                        <View>
                          <Text
                            className="font-manropeBold text-[14px]"
                            numberOfLines={1}
                          >
                            {stay.title}
                          </Text>

                          <Text
                            className="font-manrope text-[12px] mt-1 text-gray-600"
                            numberOfLines={2}
                          >
                            {stay.description}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            router.push(`/details/${stay.id}`);
                          }}
                        >
                          <Text className="text-blue-500 font-manropeSemiBold text-[13px] mt-2">
                            Voir Plus →
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Accept Button */}
        <View className="px-6 py-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleAccept}
            disabled={selectedStays.size === 0}
            className={`rounded-2xl py-4 items-center shadow-lg ${
              selectedStays.size === 0 ? "bg-gray-300" : "bg-woofBrown-500"
            }`}
          >
            <Text className="text-white font-manropeBold text-lg">
              Réserver {selectedStays.size > 0 ? `(${selectedStays.size})` : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
