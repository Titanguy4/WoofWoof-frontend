export type MediaType = "WOOFSHARE_PHOTO" | "PROFILE_PHOTO" | "STAY_PHOTO";

export interface Media {
  id: number;
  url: string;
  postDate: string; // ISO date string (e.g. "2025-11-26T00:00:00Z")
  mediaType: MediaType;

  // Champs dépendants du type de média
  stayId?: number;    // Pour WOOFSHARE_PHOTO et STAY_PHOTO
  userId?: number;  // Pour PROFILE_PHOTO
}
