import { Accomodation } from "./Accomodation";
import { Activity } from "./Activity";
import { LearningSkill } from "./LearningSkill";
import { Meal } from "./Meal";
import { Review } from "./Review";

export type StayType = "FARM" | "ANIMAL" | "CULTURAL" | "ENVIRONMENTAL";

export interface Stay {
  id: number;
  title: string;
  description: string;
  type: StayType;

  // Geographic coordinates [latitude, longitude]
  localisation: number[];


  status: boolean;

  activities: Activity[];
  learningSkills: LearningSkill[];
  meals: Meal[];
  accomodations: Accomodation[];
  reviews: Review[];

  // Only storing IDs, no relation objects here
  photoId?: number[];
  wooferId: number;
}
