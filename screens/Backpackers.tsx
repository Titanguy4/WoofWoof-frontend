import { useBooking } from "@/hooks/useBooking";
import { useStay } from "@/hooks/useStay";
import { Booking } from "@/types/booking/Booking";
import { useAuth } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackpackerCard from "../components/BackpackerCard";

export default function BackPackers() {
  const { t } = useTranslation("backpackers");
  const { user, accessToken } = useAuth(); // ✅ on récupère accessToken
  const { getBookingsForWoofer, acceptBooking, rejectBooking } = useBooking();
  const { getStayById } = useStay();
  console.log(user?.sub);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsWithStay, setBookingsWithStay] = useState<
    (Booking & { stayTitle: string })[]
  >([]);
  const [initialLoading, setInitialLoading] = useState(true);

  /** Si pas de token, on ne fait rien */
  const isAuthenticated = !!accessToken;

  /** Charger toutes les réservations uniquement si connecté */
  useEffect(() => {
    if (!isAuthenticated || !user?.sub) return; // ✅ stop si pas connecté

    const fetchBookings = async () => {
      const bks = await getBookingsForWoofer(user.sub);
      if (bks) setBookings(bks);
      setInitialLoading(false);
    };
    fetchBookings();
  }, [user?.sub, isAuthenticated]);

  /** Ajouter les titres de stays uniquement si bookings existent et user connecté */
  useEffect(() => {
    if (!isAuthenticated || bookings.length === 0) return;

    const fetchStayTitles = async () => {
      const enriched = await Promise.all(
        bookings.map(async (b) => {
          const stay = await getStayById(b.stayId);
          return { ...b, stayTitle: stay?.title ?? "Unknown" };
        }),
      );
      setBookingsWithStay(enriched);
    };
    fetchStayTitles();
  }, [bookings, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 16, color: COLORS.woofBrown[500] }}>
          {t("not_connected") ||
            "Vous devez être connecté pour voir cette page."}
        </Text>
      </SafeAreaView>
    );
  }

  if (initialLoading) {
      return (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color={COLORS.woofBrown[500]} />
        </View>
      );
    }

  /** ----------------- HANDLERS ------------------ */
  const handleAccept = async (id: number): Promise<boolean> => {
    setBookingsWithStay((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "ACCEPTED" } : b)),
    );
    acceptBooking(id);
    return true;
  };

  const handleReject = async (id: number): Promise<boolean> => {
    setBookingsWithStay((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "REJECTED" } : b)),
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
