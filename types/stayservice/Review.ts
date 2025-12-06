export interface Review {
  id: number;
  name: string;
  country: string;
  rating: number;
  content: string | null;
  date: string | null;
}

export default Review;
