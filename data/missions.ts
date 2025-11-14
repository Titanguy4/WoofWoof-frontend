import { ImageSourcePropType } from "react-native";

export type Review = {
  id: number;
  country: string;
  name: string;
  date: string;
  rating: string;
  comment: string;
};

export type Mission = {
  id: number;
  image: ImageSourcePropType;
  image2x?: ImageSourcePropType;
  title: string;
  location: string;
  rating: string;
  distance: string;
  housing: string;
  heart: boolean;                // ✅ toujours défini
  description: string;           // ✅ toujours défini
  advantages: string[];          // ✅ toujours défini
  reviews: Review[];             // ✅ toujours défini
  locationDetails: string;       // ✅ toujours défini
};

// ✅ Helper values
const defaultDescription =
  "Join this mission to contribute to local development, help the community and enjoy an enriching volunteer experience.";

const defaultAdvantages = [
  "Shared housing",
  "Wifi",
  "Flexible schedule",
  "All meals",
];

const defaultReviews: Review[] = [];

const defaultLocationDetails = "France";


// --------------------
// ✅ Missions Nearby
// --------------------
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
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
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
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
  {
    id: 3,
    image: require("../assets/images/winefarm.png"),
    image2x: require("../assets/images/winefarm_x2.png"),
    title: "Wine farm",
    location: "Cahors, Occitanie, France",
    rating: "3.3",
    distance: "25km away",
    housing: "🍽 All meals included",
    heart: false,
    description:
      "Our Cahors wine farm offers a unique volunteering experience in the heart of Occitanie...",
    advantages: [
      "Shared housing",
      "AC",
      "Wifi",
      "Flexible schedule",
      "All meals",
      "TV",
      "Hot water",
    ],
    reviews: [
      {
        id: 1,
        name: "Amanda",
        country: "France",
        date: "2024-01-10",
        rating: "4",
        comment:
          "Overall, it was a very good experience. I liked that it was private room because I am too shy to live with some other people",
      },
      {
        id: 2,
        country: "USA",
        name: "John D.",
        date: "2024-09-10",
        rating: "4.5",
        comment:
          "Great opportunity to learn about wine farming and sustainable practices.",
      },
    ],
    locationDetails: "Domaine de la Vigne, 46000 Cahors, Occitanie, France",
  },
];

// --------------------
// ✅ Missions Farm
// --------------------
export const missionsFarm: Mission[] = [
  {
    id: 3,
    image: require("../assets/images/winefarm.png"),
    image2x: require("../assets/images/winefarm_x2.png"),
    title: "Wine farm",
    location: "Cahors, Occitanie, France",
    rating: "3.3",
    distance: "25km away",
    housing: "All meals included",
    heart: false,
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
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
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
];

// --------------------
// ✅ Missions Animal
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
    heart: false,
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
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
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
];

// --------------------
// ✅ Missions Env
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
    heart: false,
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
  {
    id: 8,
    image: require("../assets/images/planttrees.png"),
    title: "Help plant trees",
    location: "Alps, France",
    rating: "3.5",
    distance: "190km away",
    housing: "All meals included",
    heart: false,
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
];

// --------------------
// ✅ Missions Cultural
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
    heart: false,
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
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
    description: defaultDescription,
    advantages: defaultAdvantages,
    reviews: defaultReviews,
    locationDetails: defaultLocationDetails,
  },
];


// ✅ Favorites
export const missionsFavorited: Mission[] = [
  ...missionsNearby,
  ...missionsFarm,
  ...missionsAnimal,
  ...missionsEnv,
  ...missionsCultural,
].filter((m) => m.heart);
