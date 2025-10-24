export interface EventType {
  id: number | string;
  clientName: string;
  clientEmail: string;
  clientPhone?: number  | null;
  serviceId: number;
  startDate: Date;
  endDate: Date;
  bookingStatus: "CONFIRMED" | "CLIENT_ARRIVED" | "CLIENT_DID_NOT_ARRIVE";
  description?: string | null
};