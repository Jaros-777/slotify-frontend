import type { EventType } from "../types/EventType"
import { services } from "./services"

export const events: EventType[] = [
    {
        id: 1,
        name: "Project Meeting",
        email: "",
        phone: undefined,
        service: services[1].id,
        start: new Date(2025, 9, 4, 10, 0),
        end: new Date(2025, 9, 4, 10, 30),
        bookingStatus: "Confirmed",
    },
]