import { useBooking } from "@/hooks/useBooking";
import { useStay } from "@/hooks/useStay";
import { Booking } from "@/types/Booking";
import { useAuth } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackpackerCard from "../components/BackpackerCard";

export default function BackPackers() {
  const { t } = useTranslation("backpackers");
  const { getBookingsForWoofer, acceptBooking, rejectBooking } = useBooking();
  const { getStayById } = useStay();
  const { user } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsWithStay, setBookingsWithStay] = useState<
    (Booking & { stayTitle: string })[]
  >([]);
  const [initialLoading, setInitialLoading] = useState(true);

  /** Charger toutes les réservations */
  useEffect(() => {
    const fetchBookings = async () => {
      const bks = await getBookingsForWoofer(user?.sub || "");
      if (bks) setBookings(bks);
      setInitialLoading(false);
    };
    fetchBookings();
  }, [user?.sub]);

  /** Ajouter les titres de stays */
  useEffect(() => {
    const fetchStayTitles = async () => {
      const enriched = await Promise.all(
        bookings.map(async (b) => {
          const stay = await getStayById(b.stayId);
          return { ...b, stayTitle: stay?.title ?? "Unknown" };
        })
      );
      setBookingsWithStay(enriched);
    };

    if (bookings.length > 0) fetchStayTitles();
  }, [bookings]);

  if (initialLoading) return <Text>Loading...</Text>;

  /** ----------------- HANDLERS ------------------ */
  const handleAccept = async (id: number): Promise<boolean> => {
    // MAJ immédiate de l’UI
    setBookingsWithStay((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "ACCEPTED" } : b))
    );

    // Appel API en arrière-plan
    acceptBooking(id);

    return true; // obligatoire pour BackpackerCard
  };

  const handleReject = async (id: number): Promise<boolean> => {
    setBookingsWithStay((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "REJECTED" } : b))
    );

    rejectBooking(id);

    return true;
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
        <Text className="text-lg font-manropeBold ml-[105px]">
          {t("title")}
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="mt-4">
          {bookingsWithStay.map((b) => (
            <BackpackerCard
              key={b.id}
              id={b.id}
              email={b.email}
              number={b.number}
              stayId={b.stayId}
              stayTitle={b.stayTitle}
              startDate={b.startRequestedDate.toString()}
              endDate={b.endRequestedDate.toString()}
              status={b.status}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
