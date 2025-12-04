import {
  GeocodingResult,
  useGeocodeFrenchCity,
} from "@/hooks/useGeocodeFrenchCity";
import { useWoofPlanner } from "@/hooks/useWoofPlanner";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

export interface StepInput {
  citySearch: string;
  isSearching: boolean;
  data: GeocodingResult | null;
  suggestions: GeocodingResult[];
  showSuggestions: boolean;
}

export const useRoadTripForm = () => {
  const { searchCities } = useGeocodeFrenchCity();
  const { createRoadTrip, isLoading, error } = useWoofPlanner();

  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: Itinéraire
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [steps, setSteps] = useState<StepInput[]>([
    {
      citySearch: "",
      isSearching: false,
      data: null,
      suggestions: [],
      showSuggestions: false,
    },
  ]);
  const [maxProposalsPerStep, setMaxProposalsPerStep] = useState<string>("3");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const canProceedToStep2 = () => {
    return (
      email &&
      validateEmail(email) &&
      startDate &&
      endDate &&
      endDate > startDate
    );
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        citySearch: "",
        isSearching: false,
        data: null,
        suggestions: [],
        showSuggestions: false,
      },
    ]);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleCitySearch = async (index: number, cityName: string) => {
    if (cityName.length < 2) {
      const newSteps = [...steps];
      newSteps[index].suggestions = [];
      newSteps[index].showSuggestions = false;
      setSteps(newSteps);
      return;
    }

    const newSteps = [...steps];
    newSteps[index].isSearching = true;
    setSteps(newSteps);

    const results = await searchCities(cityName);

    const updatedSteps = [...steps];
    updatedSteps[index].isSearching = false;
    updatedSteps[index].suggestions = results;
    updatedSteps[index].showSuggestions = results.length > 0;
    setSteps(updatedSteps);
  };

  const handleCityInputChange = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index].citySearch = text;
    newSteps[index].data = null;
    setSteps(newSteps);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        handleCitySearch(index, text);
      }, 500);
    } else {
      const resetSteps = [...steps];
      resetSteps[index].suggestions = [];
      resetSteps[index].showSuggestions = false;
      setSteps(resetSteps);
    }
  };

  const selectCity = (index: number, city: GeocodingResult) => {
    const newSteps = [...steps];
    newSteps[index].citySearch = city.city;
    newSteps[index].data = city;
    newSteps[index].showSuggestions = false;
    newSteps[index].suggestions = [];
    setSteps(newSteps);
  };

  const handleSubmit = async () => {
    const validSteps = steps
      .filter((step) => step.data !== null)
      .map((step) => ({
        cityName: step.data!.city,
        region: step.data!.region,
        latitude: step.data!.latitude,
        longitude: step.data!.longitude,
      }));

    if (validSteps.length === 0) {
      Alert.alert("Erreur", "Veuillez ajouter au moins une ville valide");
      return;
    }

    const roadTripRequest = {
      steps: validSteps,
      maxProposalsPerStep: parseInt(maxProposalsPerStep) || 3,
      email,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    const result = await createRoadTrip(roadTripRequest);

    if (result) {
      router.dismiss();
      setTimeout(() => {
        router.push({
          pathname: "/map/roadtrip-result",
          params: {
            roadTripPlan: JSON.stringify(result),
            email: email,
            phoneNumber: phoneNumber, // Ajout du phoneNumber ici
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
          },
        });
      }, 100);
    } else {
      Alert.alert(
        "Erreur",
        error || "Une erreur est survenue lors de la création du road trip",
      );
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setEmail("");
    setPhoneNumber("");
    setStartDate(null);
    setEndDate(null);
    setSteps([
      {
        citySearch: "",
        isSearching: false,
        data: null,
        suggestions: [],
        showSuggestions: false,
      },
    ]);
    setMaxProposalsPerStep("3");
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentStep,
    setCurrentStep,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    steps,
    maxProposalsPerStep,
    setMaxProposalsPerStep,
    isLoading,
    canProceedToStep2,
    validateEmail,
    addStep,
    removeStep,
    handleCityInputChange,
    selectCity,
    handleSubmit,
    resetForm,
  };
};
