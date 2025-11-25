import { Accomodation } from "@/types/stayservice/Accomodation";
import { useState } from "react";

export const useAccomodation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:8080/accomodations";

  type AccomodationInput = Omit<Accomodation, "id_accomodation">;

  /** GET all accomodations */
  const getAllAccomodations = async (): Promise<Accomodation[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Accomodation[];
    } catch (err: any) {
      setError(err.message);
      console.error("getAllAccomodations error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET accomodation by ID */
  const getAccomodationById = async (
    id: number
  ): Promise<Accomodation | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Accomodation;
    } catch (err: any) {
      setError(err.message);
      console.error("getAccomodationById error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST create accomodation */
  const createAccomodation = async (
    accomodation: AccomodationInput
  ): Promise<Accomodation | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accomodation),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Accomodation;
    } catch (err: any) {
      setError(err.message);
      console.error("createAccomodation error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update accomodation */
  const updateAccomodation = async (
    id: number,
    updated: Partial<Accomodation>
  ): Promise<Accomodation | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Accomodation;
    } catch (err: any) {
      setError(err.message);
      console.error("updateAccomodation error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE accomodation */
  const deleteAccomodation = async (id: number): Promise<boolean | undefined> => {
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
      console.error("deleteAccomodation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllAccomodations,
    getAccomodationById,
    createAccomodation,
    updateAccomodation,
    deleteAccomodation,
    loading,
    error,
  };
};
