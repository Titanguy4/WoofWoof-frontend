
import { Accomodation } from './Accomodation';
import { Activity } from './Activity';
import { LearningSkill } from './LearningSkill';
import { Meal } from './Meal';
import { Review } from './Review';

export interface Stay {
  id_stay: number;
  title: string;
  description: string;

  // Geographic coordinates [latitude, longitude]
  localisation: number[];

  startDate: string;   // ISO date string (e.g. "2025-11-03T00:00:00Z")
  endDate: string;

  status: boolean;

  activities: Activity[];
  learningSkills: LearningSkill[];
  meals: Meal[];
  accomodations: Accomodation[];
  reviews: Review[];

  // Only storing IDs, no relation objects here
  photoId: number[];
  wooferId: number;
  bookingId?: number | null;
}
