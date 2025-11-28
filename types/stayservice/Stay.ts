import { Accomodation } from "./Accomodation";
import { Activity } from "./Activity";
import { LearningSkill } from "./LearningSkill";
import { Meal } from "./Meal";
import { Review } from "./Review";

export type StayType = "FARM" | "ANIMAL" | "CULTURAL" | "ENVIRONMENTAL";

export interface Stay {
  id: number;
  type: StayType;
  title: string;
  description: string;
  localisation: [number, number]; // [latitude, longitude]
  department: string | null;
  region: string | null;
  status: boolean;
  wooferId: string;
  bookingId: number | null;
  activities: Activity[];
  learningSkills: LearningSkill[];
  meals: Meal[];
  accomodations: Accomodation[];
  reviews: Review[];
  // optionnal
  photoId?: number[];
}
