import { useState } from "react";

//le type est déjà écris dans le dossier type mais je te le laisse le gérer
export interface BookingData {
  stayId: number;
  backpackerId: number;
  short_description: string;
  request_date_start: Date;
  request_date_end: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
}

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (booking: BookingData) => {
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

      const data = await response.json();
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
