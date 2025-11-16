import { Booking } from "@/types/Booking";
import { useState } from "react";

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // On retire "id_booking" car il sera généré par le backend
  type BookingInput = Omit<Booking, "id_booking">;

  const createBooking = async (booking: BookingInput) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Booking = await response.json(); // la réponse contient probablement l'objet complet
      return data;
    } catch (err: any) {
      setError(err.message || "Error creating booking");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};
