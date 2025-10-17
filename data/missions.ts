import { ImageSourcePropType } from "react-native";

export type Mission = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  rating: string;
  distance: string;
  housing: string;
  heart?: boolean;
};

export const missionsNearby: Mission[] = [
  {
    id: 1,
    image: require("../assets/images/organicfarm.png"),
    title: "Organic farm",
    location: "Dordogne, France",
    rating: "4.8",
    distance: "25km away",
    housing: "All meals included",
    heart: true,
  },
  {
    id: 2,
    image: require("../assets/images/animalshelter.png"),
    title: "Animal shelter",
    location: "Provence, France",
    rating: "4.9",
    distance: "37km away",
    housing: "Shared housing",
    heart: true,
  },
  {
    id: 3,
    image: require("../assets/images/winefarm.png"),
    title: "Wine farm",
    location: "Bordeaux, France",
    rating: "4.8",
    distance: "25km away",
    housing: "All meals included",
  },
];

export const missionsFarm: Mission[] = [
  {
    id: 3,
    image: require("../assets/images/winefarm.png"),
    title: "Wine farm",
    location: "Bordeaux, France",
    rating: "4.8",
    distance: "25km away",
    housing: "All meals included",
  },
  {
    id: 4,
    image: require("../assets/images/animalfarm.png"),
    title: "Animal farm",
    location: "Normandy, France",
    rating: "4.8",
    distance: "25km away",
    housing: "Shared housing",
    heart: true,
  },
];

// --------------------
// 🐶 Animal care
// --------------------
export const missionsAnimal: Mission[] = [
  {
    id: 5,
    image: require("../assets/images/dogshelter.png"),
    title: "Dog shelter",
    location: "Marseille, France",
    rating: "3.7",
    distance: "453km away",
    housing: "All meals included",
  },
  {
    id: 6,
    image: require("../assets/images/wildlife.png"),
    title: "Wildlife Rescue Center",
    location: "Pyrénées, France",
    rating: "4.2",
    distance: "376km away",
    housing: "All meals included",
    heart: true,
  },
];

// --------------------
// 🌿 Environmental Projects
// --------------------
export const missionsEnv: Mission[] = [
  {
    id: 7,
    image: require("../assets/images/cleanbeaches.png"),
    title: "Clean beaches and protect marine life",
    location: "Brittany, France",
    rating: "4.8",
    distance: "222km away",
    housing: "All meals included",
  },
  {
    id: 8,
    image: require("../assets/images/planttrees.png"),
    title: "Help plant trees",
    location: "Alps, France",
    rating: "3.5",
    distance: "190km away",
    housing: "All meals included",
  },
];

// --------------------
// 🎭 Community & Cultural Support
// --------------------
export const missionsCultural: Mission[] = [
  {
    id: 9,
    image: require("../assets/images/communityevent.png"),
    title: "Local festival organization",
    location: "Nice, France",
    rating: "4.6",
    distance: "310km away",
    housing: "Shared housing",
  },
  {
    id: 10,
    image: require("../assets/images/kidsart.png"),
    title: "Support art workshops for children",
    location: "Toulouse, France",
    rating: "4.7",
    distance: "285km away",
    housing: "All meals included",
    heart: true,
  },
];
