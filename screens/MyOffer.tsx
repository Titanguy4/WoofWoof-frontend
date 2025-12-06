import ActivityTypeModal from "@/components/ActivityTypeModal";
import InfosModal from "@/components/InfosModal";
import OfferMissionCard from "@/components/OfferMissionCard";
import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import Accomodation from "@/types/stayservice/Accomodation";
import Activity from "@/types/stayservice/Activity";
import Meal from "@/types/stayservice/Meal";
import { NewStay, Stay } from "@/types/stayservice/Stay";
import { useAuth } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyOffer() {
  const { t } = useTranslation("myoffer");
  const [isActivityModalVisible, setIsActivityModalVisible] = useState(false);
  const [isInfosModalVisible, setIsInfosModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [staysData, setStaysData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddPhotoModalVisible, setIsAddPhotoModalVisible] = useState(false);
  const [currentStayIdForPhoto, setCurrentStayIdForPhoto] = useState<
    number | null
  >(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  const { getStayIdsByWoofer, getStayById, createStay } = useStay();
  const { fetchStayPhotos, createMedia } = useMedia();
  const temporaryWooferId = "77d98606-a1ab-4313-9cb6-88d1f188f8ee";
  const backpackersNumber = 27;

  const { user } = useAuth();

  /** Charger les stays pour ce woofer */
  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);
      try {
        const stayIds = await getStayIdsByWoofer(temporaryWooferId);
        if (stayIds && stayIds.length > 0) {
          const stays = await Promise.all(
            stayIds.map(async (id) => {
              const stay = await getStayById(id);
              if (!stay) return null;

              const activities =
                stay.activities?.map((a: any) => a.label) || [];
              const meals = stay.meals?.map((m: any) => m.label) || [];
              const learningSkills =
                stay.learningSkills?.map((l: any) => l.label) || [];
              const accomodations =
                stay.accomodations?.map((a: any) => a.label) || [];

              const mediaList = await fetchStayPhotos(stay.id);
              const imageUrl =
                mediaList && mediaList.length > 0 ? mediaList[0].url : "";

              return {
                id: stay.id,
                imageUrl,
                title: stay.title,
                region: stay.region,
                department: stay.department,
                activities,
                meals,
                learningSkills,
                accomodations,
              };
            }),
          );
          setStaysData(stays.filter(Boolean));
        }
      } catch (err) {
        console.error("Erreur fetch stays:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, [temporaryWooferId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={COLORS.woofBrown[500]} />
      </View>
    );
  }

  const lat = 44.449;
  const lon = 0.144;
  const localisation: [number, number] = [
    Math.round(lat * 1_000_000),
    Math.round(lon * 1_000_000),
  ];

  const handleCreateStay = async (
    name: string,
    activity: string,
    imageUrl: string,
    region: string,
    department: string,
  ) => {
    if (!selectedType) return;

    const newStay: NewStay = {
      type: selectedType as Stay["type"],
      title: name,
      description: "",
      localisation,
      department,
      region,
      status: true,
      wooferId: temporaryWooferId,
      bookingId: null,
      activities: [{ label: activity }] as Omit<Activity, "id">[],
      learningSkills: [],
      meals: selectedMeals.map((m) => ({ label: m })) as Omit<Meal, "id">[],
      accomodations: selectedAdvantages.map((a) => ({ label: a })) as Omit<
        Accomodation,
        "id"
      >[],
      reviews: [],
      wooferName: user?.name,
    };

    try {
      const created = await createStay(newStay);
      if (created) {
        setStaysData((prev) => [...prev, created]);
        setIsInfosModalVisible(false);
        setSelectedType(null);
        setSelectedAdvantages([]);
        setSelectedMeals([]);
      }
    } catch (err) {
      console.error("Erreur création stay:", err);
    }
  };

  const handleApplyActivity = () => {
    setIsInfosModalVisible(true);
    setIsActivityModalVisible(false);
  };

  const handleAddPhoto = async () => {
    if (!currentStayIdForPhoto || newPhotoUrl.trim() === "") return;

    try {
      await createMedia({
        stayId: currentStayIdForPhoto,
        url: newPhotoUrl,
        mediaType: "STAY_PHOTO",
        postDate: new Date().toISOString().split("T")[0],
      });

      setStaysData((prev) =>
        prev.map((stay) =>
          stay.id === currentStayIdForPhoto
            ? { ...stay, imageUrl: newPhotoUrl }
            : stay,
        ),
      );

      setNewPhotoUrl("");
      setCurrentStayIdForPhoto(null);
      setIsAddPhotoModalVisible(false);
    } catch (err) {
      console.error("Erreur création media:", err);
    }
  };

  return (
    <View className="flex-1 pt-safe bg-woofCream-500">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {staysData.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-manropeBold">{t("notFound")}</Text>
          </View>
        ) : (
          staysData.map((offer) => (
            <View key={offer.id} className="items-center mt-4 w-full">
              <OfferMissionCard
                {...offer}
                backpackersTotal={backpackersNumber}
                noPhoto={!offer.imageUrl}
                onAddPhotoPress={() => {
                  setCurrentStayIdForPhoto(offer.id);
                  setIsAddPhotoModalVisible(true);
                }}
              />
            </View>
          ))
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-woofCream-500">
        <View className="items-center pb-2">
          <TouchableOpacity
            onPress={() => setIsActivityModalVisible(true)}
            className="bg-woofBrown-500 rounded-xl items-center justify-center px-12 py-4 flex-row"
          >
            <Text className="text-base font-manropeBold text-white mr-2">
              {t("addNow")}
            </Text>
            <Ionicons name="add-circle-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <SafeAreaView edges={["bottom"]} />
      </View>

      {/* Modales */}
      <ActivityTypeModal
        visible={isActivityModalVisible}
        onClose={() => setIsActivityModalVisible(false)}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onApply={handleApplyActivity}
      />
      <InfosModal
        visible={isInfosModalVisible}
        onClose={() => setIsInfosModalVisible(false)}
        selectedAdvantages={selectedAdvantages}
        setSelectedAdvantages={setSelectedAdvantages}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
        selectedType={selectedType}
        onAdd={handleCreateStay}
      />

      {/* Mini-modal pour ajouter une photo */}
      {isAddPhotoModalVisible && (
        <Modal
          visible={isAddPhotoModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsAddPhotoModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/30">
            <View className="bg-white rounded-2xl p-5 w-11/12">
              <Text className="text-lg font-manropeBold mb-2">
                Ajouter une photo
              </Text>
              <TextInput
                placeholder="URL de l'image"
                value={newPhotoUrl}
                onChangeText={setNewPhotoUrl}
                className="border border-gray-300 rounded-xl p-3 mb-4"
              />
              <View className="flex-row justify-end">
                <TouchableOpacity
                  onPress={() => setIsAddPhotoModalVisible(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-xl"
                >
                  <Text>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddPhoto}
                  className="px-4 py-2 bg-woofBrown-500 rounded-xl"
                >
                  <Text className="text-white font-manropeBold">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
