import { Review } from "@/types/stayservice/Review";
import { useState } from "react";

export const useReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL + "/reviews";

  // Input pour POST → pas d'id_review
  type ReviewInput = Omit<Review, "id_review">;

  /** GET all reviews */
  const getAllReviews = async (): Promise<Review[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Review[];
    } catch (err: any) {
      setError(err.message);
      console.error("getAllReviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET review by ID */
  const getReviewById = async (id: number): Promise<Review | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      // Le backend renvoie Optional<Review> → donc soit Review, soit null
      const data = await res.json();
      return data || undefined;
    } catch (err: any) {
      setError(err.message);
      console.error("getReviewById error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** GET reviews for a stay */
  const getReviewsByStayId = async (
    stayId: number,
  ): Promise<Review[] | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/stay/${stayId}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Review[];
    } catch (err: any) {
      setError(err.message);
      console.error("getReviewsByStayId error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** POST create review */
  const createReview = async (
    review: ReviewInput,
  ): Promise<Review | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Review;
    } catch (err: any) {
      setError(err.message);
      console.error("createReview error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** PUT update review */
  const updateReview = async (
    id: number,
    updated: Partial<Review>,
  ): Promise<Review | undefined> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      return (await res.json()) as Review;
    } catch (err: any) {
      setError(err.message);
      console.error("updateReview error:", err);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE review */
  const deleteReview = async (id: number): Promise<boolean | undefined> => {
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
      console.error("deleteReview error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllReviews,
    getReviewById,
    getReviewsByStayId,
    createReview,
    updateReview,
    deleteReview,
    loading,
    error,
  };
};
