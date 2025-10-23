export interface EventType {
  id: number | string;
  clientId?: number;
  clientName: string;
  email: string;
  phone?: number | undefined;
  serviceId: number;
  startDate: Date;
  endDate: Date;
  bookingStatus: "CONFIRMED" | "CLIENT_ARRIVED" | "CLIENT_DID_NOT_ARRIVE";

};