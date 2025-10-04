import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { SlotInfo } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { v4 as uuid } from 'uuid';


const locales = {
  "en-GB": enGB, // lokalizacja polska
};


// konfigurujemy "localizer" — czyli sposób obsługi dat
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface ServiceType {
  id: number;
  name: string;
}

type EventType = {
  id: number | string;
  name: string;
  email: string;
  phone: number | undefined;
  service: number;
  start: Date;
  end: Date;
  bookingStatus: "Confirmed" | "Client arrived" | "Client did not arrive";

};

export const BigCalendar = () => {
  const [services, setServices] = useState<ServiceType[]>([
    {
      id: 0,
      name: "Not assigned"
    },
    {
      id: 1,
      name: "Strzyzenie meskie"
    },
    {
      id: 2,
      name: "Golenie"
    },
    {
      id: 3,
      name: "Mycie wlosow"
    },
  ])

  const [events, setEvents] = useState<EventType[]>([
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
  ]);



  const [isModalOpen, setIsModalOpen] = useState(true);
  const [newEvent, setNewEvent] = useState<Partial<EventType>>({});

  // When user selects a time slot
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const durationInHours = (slotInfo.end.getTime() - slotInfo.start.getTime()) / (1000 * 60 * 60);
    setNewEvent({
      id: uuid(),
      name: "",
      email: "",
      phone: undefined,
      service: services[0].id,
      start: slotInfo.start,
      end: slotInfo.end,
      bookingStatus: "Confirmed"
    });
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.start) {
      setEvents([...events, newEvent as EventType]);
      setIsModalOpen(false);
    } else {
      alert("Can't create new reservation")
    }
    // if (newEvent.name && newEvent.start && newEvent.end) {
    //   setEvents([...events, newEvent as EventType]);
    //   setIsModalOpen(false);
    // }
  };

  const times = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  });

  const durations = [
    { value: 5, label: "5 min" },
    { value: 10, label: "10 min" },
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 45, label: "45 min" },
    { value: 60, label: "1 hr" },
    { value: 120, label: "2 hr" },
    { value: 180, label: "3 hr" },
    { value: 240, label: "4 hr" },
    { value: 300, label: "5 hr" },
    { value: 360, label: "6 hr" },
    { value: 420, label: "7 hr" },
    { value: 480, label: "8 hr" },
    { value: 540, label: "9 hr" },
    { value: 600, label: "10 hr" },
    { value: 660, label: "11 hr" },
    { value: 720, label: "12 hr" },
  ];

  return (
    <div className="h-150 p-4 w-full">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        step={30}
        timeslots={1}
        defaultDate={new Date()}
        culture="en-GB"
        className="h-full bg-white"
        onSelectSlot={handleSelectSlot}

      />
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4 text-center">
              New reservation
            </h2>
            <input
              type="text"
              placeholder="Client name"
              value={newEvent.name || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="email"
              placeholder="Client mail"
              value={newEvent.email || ""}
              onChange={(e) =>
                setNewEvent({ ...newEvent, email: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="number"
              placeholder="Client phone"
              value={newEvent.phone || undefined}
              onChange={(e) =>
                setNewEvent({ ...newEvent, phone: Number(e.target.value) })
              }
              className="w-full border p-2 rounded mb-4"
            />
            <p>Assign service</p>
            <select
              value={newEvent.service ?? services[0].id}
              onChange={(e) =>
                setNewEvent({ ...newEvent, service: Number(e.target.value) })
              }
              className="w-full border p-2 rounded mb-4"
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            <div className="flex">
              <div>
                <p>Date</p>
                <input type="date"
                  value={newEvent.start ? newEvent.start.toLocaleDateString("en-CA") : ""}
                  onChange={(e) => {
                    if (!newEvent.start) return;
                    const [year, month, day] = e.target.value.split("-").map(Number);
                    const hours = newEvent.start.getHours();
                    const minutes = newEvent.start.getMinutes();
                    setNewEvent({
                      ...newEvent,
                      start: new Date(year, month - 1, day, hours, minutes),
                      end: newEvent.end
                        ? new Date(
                          year,
                          month - 1,
                          day,
                          newEvent.end.getHours(),
                          newEvent.end.getMinutes()
                        )
                        : new Date(year, month - 1, day, hours + 0.5, minutes), // default duration 30 min
                    });
                  }}
                />

              </div>
              <div>
                <p>Time</p>
                <select
                >
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Duration</p>
                <select
                >
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
