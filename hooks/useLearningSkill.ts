import { LearningSkill } from "@/types/stayservice/LearningSkill";
import { useState } from "react";

export const useLearningSkill = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://localhost:8080/learningskills";

  // POST → pas d'id_skill
  type LearningSkillInput = Omit<LearningSkill, "id_skill">;

  /** GET all learning skills */
  const getAllLearningSkills = async (): Promise<LearningSkill[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as LearningSkill[];
    } catch (err: any) {
      setError(err.message);
      console.error("getAllLearningSkills error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET learning skill by ID */
  const getLearningSkillById = async (id: number): Promise<LearningSkill | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as LearningSkill;
    } catch (err: any) {
      setError(err.message);
      console.error("getLearningSkillById error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST create learning skill */
  const createLearningSkill = async (
    skill: LearningSkillInput
  ): Promise<LearningSkill | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as LearningSkill;
    } catch (err: any) {
      setError(err.message);
      console.error("createLearningSkill error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update learning skill */
  const updateLearningSkill = async (
    id: number,
    updated: Partial<LearningSkill>
  ): Promise<LearningSkill | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as LearningSkill;
    } catch (err: any) {
      setError(err.message);
      console.error("updateLearningSkill error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE learning skill */
  const deleteLearningSkill = async (
    id: number
  ): Promise<boolean | undefined> => {
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
      console.error("deleteLearningSkill error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllLearningSkills,
    getLearningSkillById,
    createLearningSkill,
    updateLearningSkill,
    deleteLearningSkill,
    loading,
    error,
  };
};
