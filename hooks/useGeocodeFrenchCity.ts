import { useState } from "react";

export interface GeocodingResult {
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  postalCode?: string;
}

export function useGeocodeFrenchCity() {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Recherche plusieurs villes françaises correspondant à la requête
   */
  const searchCities = async (cityName: string): Promise<GeocodingResult[]> => {
    try {
      if (!cityName.trim()) return [];

      setIsSearching(true);
      setError(null);

      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
          cityName,
        )}&fields=nom,centre,codeRegion,region,codesPostaux&limit=5`,
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        return data.map((cityData: any) => ({
          city: cityData.nom,
          region: cityData.region?.nom || "",
          latitude: cityData.centre.coordinates[1],
          longitude: cityData.centre.coordinates[0],
          postalCode: cityData.codesPostaux?.[0] || "",
        }));
      }

      return [];
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la recherche de ville";
      console.error("Erreur searchCities:", errorMessage);
      setError(errorMessage);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  return { searchCities, isSearching, error };
}
