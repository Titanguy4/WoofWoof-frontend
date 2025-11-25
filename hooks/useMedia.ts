import { useState } from "react";
import { Media } from "../types/Media";

const API_URL = "http://localhost:8080/medias";

export function useMedia() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch all medias ---
  const fetchAllMedias = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch medias");
      const data: Media[] = await response.json();
      setMedias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch profile photos by username ---
  const fetchProfilePhotos = async (username: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/profile/${username}`);
      if (!response.ok) throw new Error("Failed to fetch profile photos");
      const data: Media[] = await response.json();
      setMedias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch stay photos by stayId ---
  const fetchStayPhotos = async (stayId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/stay/${stayId}`);
      if (!response.ok) throw new Error("Failed to fetch stay photos");
      const data: Media[] = await response.json();
      setMedias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch stayId from WoofShare photo ---
  const fetchStayIdFromWoofShare = async (mediaId: number): Promise<number | null> => {
    try {
      const response = await fetch(`${API_URL}/woofshare/${mediaId}`);
      if (!response.ok) throw new Error("Failed to fetch stayId");
      const stayId: number = await response.json();
      return stayId;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    medias,
    loading,
    error,
    fetchAllMedias,
    fetchProfilePhotos,
    fetchStayPhotos,
    fetchStayIdFromWoofShare,
  };
}
