import { Stay } from "@/types/stayservice/Stay";
import { useState } from "react";
import { StepProposal } from "../useWoofPlanner";

export const useRoadTripSelection = (
  roadTripPlan: { stepProposals: StepProposal[] } | null,
) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [selectedStays, setSelectedStays] = useState<Set<number>>(new Set());

  const currentStep = roadTripPlan?.stepProposals[selectedStepIndex];
  const allStays: Stay[] =
    roadTripPlan?.stepProposals.flatMap((step) => step.recommendedStays) ?? [];

  const toggleStaySelection = (stayId: number) => {
    const newSelection = new Set(selectedStays);
    if (newSelection.has(stayId)) {
      newSelection.delete(stayId);
    } else {
      newSelection.add(stayId);
    }
    setSelectedStays(newSelection);
  };

  const getSelectedStaysData = () => {
    return allStays.filter((stay) => selectedStays.has(stay.id));
  };

  return {
    selectedStepIndex,
    setSelectedStepIndex,
    selectedStays,
    currentStep,
    allStays,
    toggleStaySelection,
    getSelectedStaysData,
  };
};
