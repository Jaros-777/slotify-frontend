export interface EventType {
  id: number | string;
  name: string;
  email: string;
  phone: number | undefined;
  service: number;
  start: Date;
  end: Date;
  bookingStatus: "Confirmed" | "Client arrived" | "Client did not arrive";

};