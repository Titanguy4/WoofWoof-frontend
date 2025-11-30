import { NewStay, Stay } from "@/types/stayservice/Stay";
import { useState } from "react";

export const useStay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stays, setStays] = useState<Stay[]>([]);

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/stays";

  type StayInput = Omit<Stay, "id">;

  /** Normalise les coordonnées du backend */
  const normalizeCoordinate = (coord: number): number => {
    // Si > 1000, diviser par 1000000
    if (Math.abs(coord) > 1000) {
      return coord / 1000000;
    }
    return coord;
  };

  /** Normalise un stay complet */
  const normalizeStay = (stay: any): Stay => {
    return {
      ...stay,
      localisation: [
        normalizeCoordinate(stay.localisation[0]),
        normalizeCoordinate(stay.localisation[1]),
      ],
    };
  };

  /** GET all stays */
  const getAllStays = async (): Promise<Stay[] | undefined> => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const rawStays = await res.json();
      const normalizedStays = rawStays.map(normalizeStay);
      setStays(normalizedStays);
      return normalizedStays as Stay[];
    } catch (err: any) {
      setError(err.message);
      console.error("GetAllStays error:", err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /** GET stay by ID */
  const getStayById = async (id: number): Promise<Stay | undefined> => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const rawStay = await res.json();
      const normalizedStay = normalizeStay(rawStay);

      return normalizedStay;
    } catch (err: any) {
      setError(err.message);
      console.error("GetStayById error:", err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /** GET stay IDs by wooferId */
  const getStayIdsByWoofer = async (
    wooferId: string,
  ): Promise<number[] | undefined> => {
    try {
      const res = await fetch(`${API_URL}/woofer/${wooferId}/ids`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return await res.json();
    } catch (err) {
      console.error("GetStayIdsByWoofer error:", err);
    }
  };

  /** POST create stay */
  const createStay = async (stay: NewStay): Promise<NewStay | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stay),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const rawStay = await res.json();
      return normalizeStay(rawStay);
    } catch (err: any) {
      setError(err.message);
      console.error("CreateStay error:", err);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /** PUT update stay */
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

      const rawStay = await res.json();
      return normalizeStay(rawStay);
    } catch (err: any) {
      setError(err.message);
      console.error("UpdateStay error:", err);
      return undefined;
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
      return false;
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
