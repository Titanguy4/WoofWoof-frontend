import { useState } from "react";
import { Media } from "../types/Media";

const API_URL = "http://localhost:8083/medias";

export function useMedia() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<Media | null>(null);
  const [mediasByStay, setMediasByStay] = useState<{ [stayId: number]: Media[] }>({});

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

  // --- Fetch profile photo by userId ---
  const fetchProfilePhoto = async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/profile/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile photo");
      const data: Media = await response.json();
      setProfilePhoto(data || null);
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

      // Stocke les médias dans le dictionnaire par stayId
      setMediasByStay((prev) => ({
        ...prev,
        [stayId]: data,
      }));

      setError(null);
      return data;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return [];
    } finally {
      setLoading(false);
    }
  };


  // --- Fetch stayId from WoofShare photo ---
  const fetchStayIdFromWoofShare = async (
    mediaId: number,
  ): Promise<number | null> => {
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

  // --- Fetch all WoofShare photos ---
  const fetchAllWoofSharePhotos = async (): Promise<Media[]> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/woofshare`);
      if (!response.ok) throw new Error("Failed to fetch WoofShare photos");
      const data: Media[] = await response.json();
      setMedias(data);
      setError(null);
      return data; // <- retourner les données
    } catch (err: any) {
      setError(err.message || "Unknown error");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch WoofShare photos by stayId ---
  const fetchWoofSharePhotosByStay = async (stayId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/woofshare/stay/${stayId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch WoofShare photos for stay");
      }
      const data: Media[] = await response.json();
      setMedias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    medias,
    mediasByStay,
    loading,
    error,
    profilePhoto,
    fetchAllMedias,
    fetchProfilePhoto,
    fetchStayPhotos,
    fetchStayIdFromWoofShare,
    fetchAllWoofSharePhotos,
    fetchWoofSharePhotosByStay,
  };
}
