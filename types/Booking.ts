export interface Booking {
  id: number;

  missionId: number;

  userId: number;

  startRequestedDate: Date;

  endRequestedDate: Date;

  status: "pending" | "accepted" | "rejected" | "cancelled";

  email: string;

  number: string;
}
