
export type BookingStatus= "CONFIRMED" | "CLIENT_ARRIVED" | "CLIENT_DID_NOT_ARRIVE" | "TO_BE_CONFIRMED" | "VACATION"


export interface EventType {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: number  | null;
  serviceId: string;
  startDate: Date;
  endDate: Date;
  bookingStatus: BookingStatus;
  description?: string | null
};