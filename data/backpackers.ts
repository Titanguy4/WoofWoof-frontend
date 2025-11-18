import { ImageSourcePropType } from "react-native";

export type BackpackerCardProps = {
  id: number;
  profileImage: ImageSourcePropType;
  name: string;
  age: number;
  missionId: number;
  missionTitle: string;
  startDate: string;
  endDate: string;
};

export const backpackers: BackpackerCardProps[] = [
  {
    id: 1,
    profileImage: require("../assets/icons/default_profile2.png"),
    name: "Haley James",
    age: 22,
    missionId: 3,
    missionTitle: "Wine farm",
    startDate: "2025-01-10",
    endDate: "2025-02-05",
  },
  {
    id: 2,
    profileImage: require("../assets/icons/avatar2.png"),
    name: "Jenny Scott",
    age: 27,
    missionId: 3,
    missionTitle: "Wine farm",
    startDate: "2025-03-01",
    endDate: "2025-03-25",
  },
];