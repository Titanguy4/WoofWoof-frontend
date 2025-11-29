import { Booking } from "@/types/Booking";
import { useState } from "react";
import { useStay } from "./useStay";

export const useBooking = () => {
  const [loading, setLoading] = useState(false); // seulement pour actions
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://localhost:8082/bookings";
  const { getStayIdsByWoofer } = useStay();

  type BookingInput = Omit<Booking, "id">;

  // ------------------------
  // ACTIONS → loading = true
  // ------------------------

  const createBooking = async (booking: BookingInput) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json() as Booking;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, action: "accept" | "reject") => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/${action}/${id}`, { method: "PATCH" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json() as Booking;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // FETCH UTILS → PAS de loading
  // -----------------------------

  const getBookingsByStayId = async (stayId: number): Promise<Booking[]> => {
    try {
      const response = await fetch(`${BASE_URL}/stay/${stayId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        stayIds.map(id => getBookingsByStayId(id))
      );

      return bookingsArrays.flat();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return {
    createBooking,
    getBookingsByStayId,
    getBookingsForWoofer,
    acceptBooking: (id: number) => updateBookingStatus(id, "accept"),
    rejectBooking: (id: number) => updateBookingStatus(id, "reject"),
    loading,
    error,
  };
};
