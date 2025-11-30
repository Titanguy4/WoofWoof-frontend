import { Booking } from "@/types/booking/Booking";
import BookingRequest from "@/types/booking/BookingRequest";
import { useAuth } from "@/utils/auth/AuthContext";
import { useState } from "react";

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/bookings";

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

      console.log("booking", JSON.stringify(booking));

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
    createMultipleBookings,
    loading,
    error,
  };
};
