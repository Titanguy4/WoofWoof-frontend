export interface Booking {
  id: number;

  stayId: number;

  userId: string;

  startRequestedDate: Date;

  endRequestedDate: Date;

  status: "pending" | "accepted" | "rejected" | "cancelled";

  email: string;

  number: string;
}
