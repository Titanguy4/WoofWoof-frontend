import { Accomodation } from "./Accomodation";
import { Activity } from "./Activity";
import { LearningSkill } from "./LearningSkill";
import { Meal } from "./Meal";
import { Review } from "./Review";

export interface Stay {
  id: number;
  title: string;
  description: string;
  localisation: [number, number]; // [latitude, longitude]
  department: string | null;
  region: string | null;
  status: boolean;
  wooferId: number;
  bookingId: number | null;
  activities: Activity[];
  learningSkills: LearningSkill[];
  meals: Meal[];
  accomodations: Accomodation[];
  reviews: Review[];
}
