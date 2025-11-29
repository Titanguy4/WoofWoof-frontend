import { Stay } from "@/types/stayservice/Stay";
import { useState } from "react";

export interface StepProposal {
  cityName: string;
  recommendedStays: Stay[];
}

export interface RoadTripPlan {
  stepProposals: StepProposal[];
}

export interface StepRequest {
  cityName: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface RoadTripRequest {
  steps: StepRequest[];
  maxProposalsPerStep: number;
}

export function useWoofPlanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadTripPlan, setRoadTripPlan] = useState<RoadTripPlan | null>(null);

  /**
   * Créer un plan de road trip
   */
  const createRoadTrip = async (
    request: RoadTripRequest,
  ): Promise<RoadTripPlan | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:8084/planner/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: RoadTripPlan = await response.json();
      setRoadTripPlan(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors de la création du road trip";
      console.error("Erreur createRoadTrip:", errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPlan = () => {
    setRoadTripPlan(null);
    setError(null);
  };

  return {
    createRoadTrip,
    roadTripPlan,
    isLoading,
    error,
    resetPlan,
  };
}
