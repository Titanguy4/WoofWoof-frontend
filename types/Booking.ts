export interface Booking {
  id: number;

  stayId: number;

  userId: string;

  startRequestedDate: Date;

  endRequestedDate: Date;

  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

  email: string;

  number: string;
}
