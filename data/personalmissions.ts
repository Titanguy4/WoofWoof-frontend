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
  heart?: boolean;
  description?: string;
  advantages?: string[];
  reviews?: Review[];
  locationDetails?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  startDate: string;
  endDate: string;
};

export const myMissions: Mission[] = [
  {
    id: 3,
    image: require("../assets/images/winefarm.png"),
    image2x: require("../assets/images/winefarm_x2.png"),
    title: "Wine farm",
    location: "Cahors, Occitanie, France",
    rating: "3.3",
    distance: "25km away",
    housing: "🍽 All meals included",
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
      "View all",
    ],
    reviews: [
      {
        id: 1,
        name: "Amanda",
        country: "France",
        date: "2024-01-10",
        rating: "4",
        comment:
          "Overall, it was a very good experience...",
      },
      {
        id: 2,
        country: "USA",
        name: "John D.",
        date: "2024-09-10",
        rating: "4.5",
        comment:
          "Great opportunity to learn about wine farming...",
      },
    ],
    locationDetails: "Domaine de la Vigne, 46000 Cahors, Occitanie, France",
    status: "pending",
    startDate: "2024-03-31",
    endDate: "2024-04-01",
  },

  {
    id: 5,
    image: require("../assets/images/dogshelter.png"),
    image2x: require("../assets/images/dogshelter_x2.png"),
    title: "Animal shelter",
    location: "Ardèche, France",
    rating: "4.7",
    distance: "120km away",
    housing: "🏡 Shared room",
    description:
      "Help take care of rescued dogs and cats in a peaceful shelter located in the heart of Ardèche...",
    advantages: ["Wifi", "Shared housing", "Nature area", "Flexible hours"],
    reviews: [
      {
        id: 1,
        name: "Lucie",
        country: "France",
        date: "2024-03-04",
        rating: "5",
        comment:
          "Amazing experience! The team is kind, and the dogs are adorable.",
      },
    ],
    locationDetails: "Refuge des Collines, Ardèche, France",
    status: "completed",
    startDate: "2024-02-22",
    endDate: "2024-03-04",
  },

  {
    id: 4,
    image: require("../assets/images/animalfarm.png"),
    image2x: require("../assets/images/animalfarm_x2.png"),
    title: "Animal farm",
    location: "Bordeaux, France",
    rating: "4.2",
    distance: "180km away",
    housing: "🍽 Meals included",
    description:
      "Join a family-run farm near Bordeaux and help with cows, goats, and farm maintenance...",
    advantages: ["Meals included", "Wifi", "Countryside", "Friendly hosts"],
    reviews: [
      {
        id: 1,
        name: "Carlos",
        country: "Spain",
        date: "2024-02-01",
        rating: "4",
        comment: "Physical but rewarding work. Loved the farm atmosphere.",
      },
    ],
    locationDetails: "Ferme du Pré Vert, Bordeaux, France",
    status: "completed",
    startDate: "2024-01-21",
    endDate: "2024-01-27",
  },

  {
    id: 10,
    image: require("../assets/images/kidsart.png"),
    image2x: require("../assets/images/kidsart_x2.png"),
    title: "Children’s workshop",
    location: "Lyon, France",
    rating: "4.8",
    distance: "90km away",
    housing: "🏡 Private room",
    description:
      "Assist teachers with creative workshops for children aged 6 to 10...",
    advantages: ["Private room", "Wifi", "Calm environment"],
    reviews: [
      {
        id: 1,
        name: "Emma",
        country: "UK",
        date: "2024-03-20",
        rating: "5",
        comment:
          "Loved working with the kids! Very positive environment.",
      },
    ],
    locationDetails: "Centre Loisirs Soleil, Lyon, France",
    status: "rejected",
    startDate: "2024-03-11",
    endDate: "2024-03-16",
  },
];
