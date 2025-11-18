import React, { createContext, useContext, useState } from "react";

export type FilterState = {
  advantages: string[];
  activityTypes: string[];
  volunteerProfile: string[];
};

const defaultState: FilterState = {
  advantages: [],
  activityTypes: [],
  volunteerProfile: [],
};

const SearchFiltersContext = createContext<any>(null);

export const SearchFiltersProvider = ({ children }: any) => {
  const [filters, setFilters] = useState<FilterState>(defaultState);

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const clearFilters = () => setFilters(defaultState);

  return (
    <SearchFiltersContext.Provider value={{ filters, toggleFilter, clearFilters }}>
      {children}
    </SearchFiltersContext.Provider>
  );
};

export const useSearchFilters = () => useContext(SearchFiltersContext);
