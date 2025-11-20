import ActivityTypeModal from "@/components/ActivityTypeModal";
import InfosModal from "@/components/InfosModal";
import OfferMissionCard from "@/components/OfferMissionCard";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { offers } from "../data/offers";

export default function MyOffer() {
  const { t } = useTranslation("myoffer");
  const [isActivityModalVisible, setIsActivityModalVisible] = useState(false);
  const [isInfosModalVisible, setIsInfosModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>([]);

  const id = 1;
  const backpackersNumber = 27;
  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-manropeBold">{t("notFound")}</Text>
      </View>
    );
  }

  const handleApplyActivity = () => {
    // On ouvre la 2e modale tout de suite
    setIsInfosModalVisible(true);
    // Et on laisse la 1re se fermer en parallèle
    setIsActivityModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.woofBrown[500] }}
      className="flex-1"
      edges={["top"]}
    >
      <StatusBar backgroundColor={COLORS.woofBrown[500]} style="light" />

      {/* Header */}
      <View className="items-center w-full h-[56px] bg-white flex-row py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center ml-6 w-12 h-12"
        >
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={COLORS.woofBrown[500]}
          />
        </TouchableOpacity>
        <Text className="text-lg font-manropeBold ml-[114px]">
          {t("title")}
        </Text>
      </View>

      {/* Contenu principal */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        {/* Mission card */}
        <View className="items-center mt-4">
          <OfferMissionCard
            key={offer.id}
            {...offer}
            backpackersTotal={backpackersNumber}
          />
        </View>

        {/* Add button */}
        <View className="mt-96 items-center">
          <TouchableOpacity
            onPress={() => setIsActivityModalVisible(true)}
            className="bg-woofBrow-500 w-36 h-12 px-3 py-1 rounded-2xl items-center justify-center mb-6 flex-row gap-2"
          >
            <Text className="text-base font-manropeBold text-white">
              {t("addNow")}
            </Text>
            <Ionicons name="add-circle-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ Modale 1 — Choix du type d’activité */}
      <ActivityTypeModal
        visible={isActivityModalVisible}
        onClose={() => setIsActivityModalVisible(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onApply={handleApplyActivity} // ← ouverture du 2e modal
      />

      {/* ✅ Modale 2 — Ajout d’informations */}
      <InfosModal
        visible={isInfosModalVisible}
        onClose={() => setIsInfosModalVisible(false)}
        selectedAdvantages={selectedAdvantages}
        setSelectedAdvantages={setSelectedAdvantages}
        selectedType={selectedType}
      />
    </SafeAreaView>
  );
}
