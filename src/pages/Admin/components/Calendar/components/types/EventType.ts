export interface EventType {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: number  | null;
  serviceId: string;
  startDate: Date;
  endDate: Date;
  bookingStatus: "CONFIRMED" | "CLIENT_ARRIVED" | "CLIENT_DID_NOT_ARRIVE";
  description?: string | null
};