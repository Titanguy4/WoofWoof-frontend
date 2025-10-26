import { ImageSourcePropType } from "react-native";

export type Review = {
  id: number;
  name: string;
  date: string;
  rating: string;
  comment: string;
};

export type Mission = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  rating: string;
  distance: string;
  housing: string;
  heart?: boolean;
  description : string;
  advantages : string[];
  reviews : Review[];
  locationDetails : string;
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
    description: "Our Cahors wine farm offers a unique volunteering experience in the heart of Occitanie. Volunteers can help with grape harvesting, vineyard maintenance, and animal care, while enjoying the peaceful countryside and traditional French farm life. Accommodation is shared on-site, and all meals are included, giving you the chance to experience local cuisine. This is an ideal opportunity for those looking to connect with nature, learn about sustainable farming, and immerse themselves in rural French culture.",
    advantages: [
      "Shared housing",
      "AC",
      "Wifi",
      "Flexible schedule",
      "All meals",
      "TV",
      "Hot water",
      "View all",
    ],
    reviews: [
      {
        id: 1,
        name: "Amanda",
        date: "2024-01-10",
        rating: "4",
        comment: "Overall, it was a very good experience. I liked that it was private room because I am too shy to live with some other people",
      },
      {
        id: 2,
        name: "John D.",
        date: "2024-09-10",
        rating: "4.5",
        comment: "Great opportunity to learn about wine farming and sustainable practices. The hosts were very welcoming and accommodating.",
      },
    ],
    locationDetails: "Domaine de la Vigne, 46000 Cahors, Occitanie, France",
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
