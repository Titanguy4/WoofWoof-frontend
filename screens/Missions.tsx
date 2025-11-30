import MyMissionsCard from "@/components/MyMissionsCard";
import { useBooking } from "@/hooks/useBooking";
import { useMedia } from "@/hooks/useMedia";
import { useStay } from "@/hooks/useStay";
import { Booking } from "@/types/Booking";
import { useAuth } from "@/utils/auth/AuthContext";
import { COLORS } from "@/utils/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedControlTab from "react-native-segmented-control-tab";

export default function Missions() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { t } = useTranslation("missions");
  const { user } = useAuth();

  // Hooks
  const { getBookingsByUserId, loading, error } = useBooking();
  const { getStayById } = useStay();
  const { fetchStayPhotos } = useMedia();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsWithStay, setBookingsWithStay] = useState<
    (Booking & {
      stayTitle: string;
      stayRegion: string;
      stayDepartment: string;
      imageUrl: string;
    })[]
  >([]);


  // Load user bookings
  useEffect(() => {
    const load = async () => {
      const res = await getBookingsByUserId(user?.sub || "");
      setBookings(res);
    };
    load();
  }, []);

  /** Inject stay information + image URL */
  useEffect(() => {
    const enrich = async () => {
      const enriched = await Promise.all(
        bookings.map(async (b) => {
          const stay = await getStayById(b.stayId);
          const photos = await fetchStayPhotos(b.stayId);
          const imageUrl = photos[0].url;

          return {
            ...b,
            stayTitle: stay?.title ?? "Unknown",
            stayRegion: stay?.region ?? "Unknown",
            stayDepartment: stay?.department ?? "Unknown",
            imageUrl,
          };
        })
      );
      setBookingsWithStay(enriched);
    };

    if (bookings.length > 0) enrich();
  }, [bookings]);

  const handleTabChange = (index: number) => setSelectedIndex(index);

  // Convert dates
  const normalized = useMemo(() => {
    return bookingsWithStay.map((b) => ({
      ...b,
      startRequestedDate: new Date(b.startRequestedDate),
      endRequestedDate: new Date(b.endRequestedDate),
    }));
  }, [bookingsWithStay]);

  // Sort by start date
  const sorted = useMemo(() => {
    return [...normalized].sort(
      (a, b) =>
        b.startRequestedDate.getTime() - a.startRequestedDate.getTime()
    );
  }, [normalized]);

  // Filter ongoing / history
  const now = new Date();

  const filtered = useMemo(() => {
    if (selectedIndex === 0) {
      return sorted.filter(
        (m) =>
          m.status === "PENDING" ||
          m.endRequestedDate.getTime() > now.getTime()
      );
    }
    return sorted;
  }, [sorted, selectedIndex]);

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
          My missions
        </Text>
      </View>

      {/* Tabs */}
      <View className="bg-white px-4 py-3">
        <SegmentedControlTab
          values={[t("tabs.ongoing"), t("tabs.history")]}
          selectedIndex={selectedIndex}
          onTabPress={handleTabChange}
          borderRadius={20}
          tabStyle={{
            borderColor: COLORS.woofBrown[500],
            height: 48,
          }}
          activeTabStyle={{
            backgroundColor: COLORS.woofBrown[500],
          }}
          tabTextStyle={{
            color: COLORS.woofBrown[500],
            fontWeight: "600",
            fontSize: 16,
          }}
          activeTabTextStyle={{
            color: "white",
          }}
        />
      </View>

      {/* Body */}
      <ScrollView className="flex-1 bg-woofCream-500 px-4">
        <View className="items-center mt-4 gap-y-6">
          {loading && <Text>Loading...</Text>}
          {error && <Text className="text-red-600">{error}</Text>}

          {!loading && filtered.length > 0 ? (
            filtered.map((booking) => (
              <MyMissionsCard
                key={booking.id}
                id={booking.id}
                stayTitle={booking.stayTitle}
                stayRegion={booking.stayRegion}
                stayDepartment={booking.stayDepartment}
                imageUrl={booking.imageUrl}
                startDate={booking.startRequestedDate.toString()}
                endDate={booking.endRequestedDate.toString()}
                status={booking.status}
              />
            ))
          ) : (
            !loading && (
              <Text className="text-gray-500 mt-8">
                {t("noMissionsFound")}
              </Text>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
