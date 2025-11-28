import { Booking } from "@/types/Booking";
import { useState } from "react";
import { useStay } from "./useStay";

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://localhost:8082/bookings";

  type BookingInput = Omit<Booking, "id">;

  const { getStayIdsByWoofer } = useStay();

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
      setError(err.message || "Error creating booking");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };


  const getBookingsByStayId = async (stayId: number): Promise<Booking[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/stay/${stayId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json() as Booking[];
    } catch (err: any) {
      setError(err.message || "Error fetching bookings by stayId");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, action: "accept" | "reject"): Promise<Booking | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/${action}/${id}`, { method: "PATCH" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json() as Booking;
    } catch (err: any) {
      setError(err.message || `Error ${action}ing booking`);
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getBookingsForWoofer = async (wooferId: string): Promise<Booking[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const stayIds = await getStayIdsByWoofer(wooferId);
      if (!stayIds || stayIds.length === 0) return [];

      // On récupère tous les bookings pour chaque stayId
      const bookingPromises = stayIds.map(id => getBookingsByStayId(id));
      const bookingsArrays = await Promise.all(bookingPromises);

      // On a un array d'array, on aplatit
      return bookingsArrays.flat().filter(Boolean) as Booking[];
    } catch (err: any) {
      setError(err.message || "Error fetching bookings for woofer");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
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
