import { Stay } from "@/types/stayservice/Stay";
import { useState } from "react";

export const useStay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stays, setStays] = useState<Stay[]>([]);

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/stays";

  // Création : pas d'id_stay
  type StayInput = Omit<Stay, "id_stay">;

  /** GET all stays */
const getAllStays = async (): Promise<Stay[] | undefined> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    const stays = await res.json();
    setStays(stays);
    return stays;
  } catch (err) {
    console.error("GetAllStays error:", err);
  }
};

/** GET stay by ID */
const getStayById = async (id: number): Promise<Stay | undefined> => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("GetStayById error:", err);
  }
};

/** GET stay IDs by wooferId */
const getStayIdsByWoofer = async (wooferId: string): Promise<number[] | undefined> => {
  try {
    const res = await fetch(`${API_URL}/woofer/${wooferId}/ids`);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("GetStayIdsByWoofer error:", err);
  }
};

  /** POST create stay */
  const createStay = async (stay: StayInput): Promise<Stay | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stay),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Stay;
    } catch (err: any) {
      setError(err.message);
      console.error("CreateStay error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update stay (OPTION 1 : backend attend tout le Stay) */
  const updateStay = async (stay: Stay): Promise<Stay | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stay),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Stay;
    } catch (err: any) {
      setError(err.message);
      console.error("UpdateStay error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE stay */
  const deleteStay = async (id: number): Promise<boolean | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return true;
    } catch (err: any) {
      setError(err.message);
      console.error("DeleteStay error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stays,
    getAllStays,
    getStayIdsByWoofer,
    getStayById,
    createStay,
    updateStay,
    deleteStay,
    loading,
    error,
  };
};
