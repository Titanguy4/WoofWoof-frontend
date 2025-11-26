import { Meal } from "@/types/stayservice/Meal";
import { useState } from "react";

export const useMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/meals";

  // Pour POST → pas d'id_meal
  type MealInput = Omit<Meal, "id_meal">;

  /** GET all meals */
  const getAllMeals = async (): Promise<Meal[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Meal[];
    } catch (err: any) {
      setError(err.message);
      console.error("getAllMeals error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET meal by ID */
  const getMealById = async (id: number): Promise<Meal | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Meal;
    } catch (err: any) {
      setError(err.message);
      console.error("getMealById error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST create meal */
  const createMeal = async (meal: MealInput): Promise<Meal | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Meal;
    } catch (err: any) {
      setError(err.message);
      console.error("createMeal error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update meal */
  const updateMeal = async (
    id: number,
    updated: Partial<Meal>,
  ): Promise<Meal | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Meal;
    } catch (err: any) {
      setError(err.message);
      console.error("updateMeal error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE meal */
  const deleteMeal = async (id: number): Promise<boolean | undefined> => {
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
      console.error("deleteMeal error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
    loading,
    error,
  };
};
