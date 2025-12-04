import { useStay } from "@/hooks/useStay";
import { Stay } from "@/types/stayservice/Stay";
import { useEffect, useState } from "react";

export const useMapSelection = () => {
  const { stays, getAllStays, loading, error } = useStay();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  useEffect(() => {
    getAllStays();
  }, []);

  const handleMarkerPress = (stay: Stay) => {
    if (selectedStay?.id === stay.id) {
      setSelectedStay(null);
    } else {
      setSelectedStay(stay);
    }
  };

  const clearSelection = () => setSelectedStay(null);

  return {
    stays,
    loading,
    error,
    selectedStay,
    handleMarkerPress,
    clearSelection,
  };
};
