import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type LikeContextType = {
  likedStays: number[];
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
};

const LikeContext = createContext<LikeContextType>({
  likedStays: [],
  toggleLike: () => {},
  isLiked: () => false,
});

export const LikeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedStays, setLikedStays] = useState<number[]>([]);

  // Load from storage at start
  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("liked_stays");
      if (stored) setLikedStays(JSON.parse(stored));
    };
    load();
  }, []);

  // Toggle like
  const toggleLike = async (id: number) => {
    let newLikes: number[];
    if (likedStays.includes(id)) {
      newLikes = likedStays.filter((sid) => sid !== id);
    } else {
      newLikes = [...likedStays, id];
    }
    setLikedStays(newLikes);
    await AsyncStorage.setItem("liked_stays", JSON.stringify(newLikes));
    console.log("Liked stays updated:", newLikes);
  };

  const isLiked = (id: number) => likedStays.includes(id);

  return (
    <LikeContext.Provider value={{ likedStays, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikes = () => useContext(LikeContext);
