import { ImageSourcePropType } from "react-native";

export type Review = {
    id: number;
    country: string;
    name: string;
    date: string;
    rating: string;
    comment: string;
};

export type Offer = {
    id: number;
    image: ImageSourcePropType;
    image2x?: ImageSourcePropType;
    title: string;
    location: string;
    activity: string;
    meals: string;
    dailyHours: string;
    backpackersMax: number;
    housing: string;
    description?: string;
    advantages?: string[];
    locationDetails?: string;
};


export const offers: Offer[] = [
    {
        id: 1,
        image: require("../assets/images/winefarm.png"),
        image2x: require("../assets/images/winefarm_x2.png"),
        title: "Wine farm",
        location: "Cahors, Occitanie, France",
        activity : "Vineyard maintenance & harvesting",
        meals: "All meals included",
        backpackersMax: 4,
        housing: "Shared housing provided",
        dailyHours: "5h/day",
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
        locationDetails: "Domaine de la Vigne, 46000 Cahors, Occitanie, France",
    }
    ];