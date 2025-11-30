import { Booking } from "@/types/booking/Booking";
import BookingRequest from "@/types/booking/BookingRequest";
import { useAuth } from "@/utils/auth/AuthContext";
import { useState } from "react";
import { useStay } from "./useStay";

export const useBooking = () => {
  const [loading, setLoading] = useState(false); // seulement pour actions
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/bookings";
  const { getStayIdsByWoofer } = useStay();

  /** POST create booking */
  const createBooking = async (
    booking: BookingRequest,
  ): Promise<Booking | undefined> => {
    try {
      setLoading(true);
      setError(null);

      if (!accessToken) {
        throw new Error("Token d'authentification manquant");
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(booking),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error: ${res.status}`);
      }

      const createdBooking = await res.json();
      return createdBooking as Booking;
    } catch (err: any) {
      setError(err.message);
      console.error("CreateBooking error:", err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const getBookingsByStayId = async (stayId: number): Promise<Booking[]> => {
    try {
      const response = await fetch(`${API_URL}/stay/${stayId}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getBookingsForWoofer = async (wooferId: string): Promise<Booking[]> => {
    try {
      const stayIds = await getStayIdsByWoofer(wooferId);
      if (!stayIds || stayIds.length === 0) return [];

      const bookingsArrays = await Promise.all(
        stayIds.map((id: number) => getBookingsByStayId(id)),
      );

      return bookingsArrays.flat();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getBookingsByUserId = async (userId: string): Promise<Booking[]> => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const updateBookingStatus = async (
    id: number,
    action: "accept" | "reject",
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/${action}/${id}`, {
        method: "PATCH",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return (await response.json()) as Booking;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /** POST create multiple bookings */
  const createMultipleBookings = async (
    bookings: BookingRequest[],
  ): Promise<{
    success: Booking[];
    failed: { booking: BookingRequest; error: string }[];
  }> => {
    const results = {
      success: [] as Booking[],
      failed: [] as { booking: BookingRequest; error: string }[],
    };

    for (const booking of bookings) {
      const result = await createBooking(booking);
      if (result) {
        results.success.push(result);
      } else {
        results.failed.push({
          booking,
          error: error || "Erreur inconnue",
        });
      }
    }

    return results;
  };

  return {
    createBooking,
    getBookingsByStayId,
    getBookingsForWoofer,
    getBookingsByUserId,
    acceptBooking: (id: number) => updateBookingStatus(id, "accept"),
    rejectBooking: (id: number) => updateBookingStatus(id, "reject"),
    createMultipleBookings,
    loading,
    error,
  };
};
