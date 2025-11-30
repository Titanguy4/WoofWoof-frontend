export default interface BookingRequest {
  stayId: number;
  userId: string;
  startRequestedDate: string; // Format: "YYYY-MM-DD"
  endRequestedDate: string; // Format: "YYYY-MM-DD"
  status: string;
  email: string;
  number?: string;
}
