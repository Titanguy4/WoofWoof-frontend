import Review from "@/types/stayservice/Review";
import { Stay, StayType } from "@/types/stayservice/Stay";

const defaultReviews: Review[] = [];

export const Stays: Stay[] = [
  {
    id: 1,
    title: "Wine Farm Experience",
    description: "Experience life on a traditional vineyard, help with grape harvesting and learn about winemaking.",
    type: "FARM" as StayType,

    localisation: [44.4490, 1.4400],
    startDate: "2025-11-03T00:00:00Z",
    endDate: "2025-11-10T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 1, label: "Shared housing" },
      { id_accomodation: 2, label: "AC" },
      { id_accomodation: 3, label: "Wifi" },
      { id_accomodation: 4, label: "Flexible schedule" },
      { id_accomodation: 5, label: "All meals" },
      { id_accomodation: 6, label: "TV" },
      { id_accomodation: 7, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 1,
  },
  {
    id: 2,
    title: "Animal Farm Volunteer",
    description: "Help care for farm animals, feed them, and learn about sustainable farming practices.",
    type: "FARM" as StayType,

    localisation: [49.1829, -0.3707],
    startDate: "2025-11-05T00:00:00Z",
    endDate: "2025-11-12T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 8, label: "Shared housing" },
      { id_accomodation: 9, label: "AC" },
      { id_accomodation: 10, label: "Wifi" },
      { id_accomodation: 11, label: "Flexible schedule" },
      { id_accomodation: 12, label: "All meals" },
      { id_accomodation: 13, label: "TV" },
      { id_accomodation: 14, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 2,
  },
  {
    id: 3,
    title: "Dog Shelter Helper",
    description: "Assist in caring for dogs, help with training sessions, and provide love and attention to the animals.",
    type: "ANIMAL" as StayType,

    localisation: [43.2965, 5.3698],
    startDate: "2025-11-03T00:00:00Z",
    endDate: "2025-11-10T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 15, label: "Shared housing" },
      { id_accomodation: 16, label: "AC" },
      { id_accomodation: 17, label: "Wifi" },
      { id_accomodation: 18, label: "Flexible schedule" },
      { id_accomodation: 19, label: "All meals" },
      { id_accomodation: 20, label: "TV" },
      { id_accomodation: 21, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 3,
  },
  {
    id: 4,
    title: "Wildlife Rescue Center",
    description: "Join our team to care for injured wildlife and participate in rehabilitation programs for safe release.",
    type: "ANIMAL" as StayType,

    localisation: [42.8263, -0.0064],
    startDate: "2025-11-06T00:00:00Z",
    endDate: "2025-11-14T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 22, label: "Shared housing" },
      { id_accomodation: 23, label: "AC" },
      { id_accomodation: 24, label: "Wifi" },
      { id_accomodation: 25, label: "Flexible schedule" },
      { id_accomodation: 26, label: "All meals" },
      { id_accomodation: 27, label: "TV" },
      { id_accomodation: 28, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 4,
  },
  {
    id: 5,
    title: "Beach Cleanup Volunteer",
    description: "Help preserve the coastline by participating in organized beach cleanups and marine protection activities.",
    type: "ENVIRONMENTAL" as StayType,

    localisation: [48.1173, -1.6778],
    startDate: "2025-11-02T00:00:00Z",
    endDate: "2025-11-09T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 29, label: "Shared housing" },
      { id_accomodation: 30, label: "AC" },
      { id_accomodation: 31, label: "Wifi" },
      { id_accomodation: 32, label: "Flexible schedule" },
      { id_accomodation: 33, label: "All meals" },
      { id_accomodation: 34, label: "TV" },
      { id_accomodation: 35, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 5,
  },
  {
    id: 6,
    title: "Art Workshop Assistant",
    description: "Support local art initiatives by assisting in workshops, engaging with children, and promoting cultural heritage.",
    type: "CULTURAL" as StayType,

    localisation: [43.7102, 7.2620],
    startDate: "2025-11-04T00:00:00Z",
    endDate: "2025-11-11T00:00:00Z",
    status: true,

    activities: [],
    learningSkills: [],
    meals: [],
    accomodations: [
      { id_accomodation: 36, label: "Shared housing" },
      { id_accomodation: 37, label: "AC" },
      { id_accomodation: 38, label: "Wifi" },
      { id_accomodation: 39, label: "Flexible schedule" },
      { id_accomodation: 40, label: "All meals" },
      { id_accomodation: 41, label: "TV" },
      { id_accomodation: 42, label: "Hot water" },
    ],
    reviews: defaultReviews,

    photoId: [],
    wooferId: 6,
  },
];
