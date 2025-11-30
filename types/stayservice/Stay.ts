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
  wooferName: string;
  // optionnal
  photoId?: number[];
}

type MealCreate = Omit<Meal, "id">;
type ActivityCreate = Omit<Activity, "id">;
type AccomodationCreate = Omit<Accomodation, "id">;

export interface NewStay {
  type: StayType;
  title: string;
  description: string;
  localisation: [number, number]; // [latitude, longitude]
  department: string | null;
  region: string | null;
  status: boolean;
  wooferId: string;
  bookingId: number | null;
  activities: ActivityCreate[];
  learningSkills: LearningSkill[];
  meals: MealCreate[];
  accomodations: AccomodationCreate[];
  reviews: Review[];
  wooferName: string;
  // optionnal
  photoId?: number[];
}
