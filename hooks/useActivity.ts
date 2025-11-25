import { Activity } from "@/types/stayservice/Activity";
import { useState } from "react";

export const useActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:8080/activities";

  // POST → pas d'id_activity fourni
  type ActivityInput = Omit<Activity, "id_activity">;

  /** GET all activities */
  const getAllActivities = async (): Promise<Activity[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Activity[];
    } catch (err: any) {
      setError(err.message);
      console.error("getAllActivities error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET activity by ID */
  const getActivityById = async (id: number): Promise<Activity | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Activity;
    } catch (err: any) {
      setError(err.message);
      console.error("getActivityById error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST create activity */
  const createActivity = async (
    activity: ActivityInput
  ): Promise<Activity | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Activity;
    } catch (err: any) {
      setError(err.message);
      console.error("createActivity error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update activity */
  const updateActivity = async (
    id: number,
    updated: Partial<Activity>
  ): Promise<Activity | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Activity;
    } catch (err: any) {
      setError(err.message);
      console.error("updateActivity error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE activity */
  const deleteActivity = async (id: number): Promise<boolean | undefined> => {
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
      console.error("deleteActivity error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    loading,
    error,
  };
};
