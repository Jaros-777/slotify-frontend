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
  "en-GB": enGB,
};


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



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<EventType>>({});
  const [selectedDuration, setSelectedDuration] = useState<number>(30);

  // When user selects a time slot
  const handleSelectSlot = (slotInfo: SlotInfo) => {
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
      const endDate = new Date(newEvent.start.getTime() + selectedDuration * 60000);
      setEvents([
        ...events,
        { ...newEvent, end: endDate } as EventType,
      ]);
      setIsModalOpen(false);
      setSelectedDuration(30)
    } else {
      alert("Reservation must have client name");
    }
  };

  const handleDeleteEvent = (id: number | string | undefined) => {
    if (!id) return;
    setEvents(events.filter(e => e.id.toString() !== id.toString()));
    setIsModalOpen(false);

  }

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
        onSelectEvent={(event: EventType) => {
          setNewEvent(event);
          const durationInMinutes = (event.end.getTime() - event.start.getTime()) / 60000;
          setSelectedDuration(durationInMinutes);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4 text-center">
              New reservation
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // żeby nie przeładowywało strony
                handleAddEvent();
              }}
            >
              <input
                type="text"
                required
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
                type="tel"
                pattern="[0-9]+"
                placeholder="Client phone"
                minLength={9}
                maxLength={9}
                value={newEvent.phone || undefined}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, phone: Number(e.target.value) })
                }
                className="w-full border p-2 rounded mb-4"
              />


              <p className=" font-medium">Assign service</p>
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
              <div className="flex w-full justify-between">
                <div>
                  <p className=" font-medium">Date</p>
                  <input
                    className="border-1 border-black px-2 py-1 h-[2em]"
                    type="date"
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
                  <p className=" font-medium">Time</p>
                  <select
                    className="border-1 border-black px-2 py-1 h-[2em]"
                    value={
                      newEvent.start
                        ? `${newEvent.start.getHours().toString().padStart(2, "0")}:${newEvent.start
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}`
                        : ""
                    }
                    onChange={(e) => {
                      if (!newEvent.start) return;
                      const [hours, minutes] = e.target.value.split(":").map(Number);
                      setNewEvent({
                        ...newEvent,
                        start: new Date(
                          newEvent.start.getFullYear(),
                          newEvent.start.getMonth(),
                          newEvent.start.getDate(),
                          hours,
                          minutes
                        ),
                      });
                    }}
                  >
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className=" font-medium">Duration</p>
                  <select
                    className="border-1 border-black px-2 py-1 h-[2em]"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                  >
                    {durations.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex w-full justify-between pt-4 mt-4 border-t-1 border-gray-300 ">
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded font-medium hover:bg-gray-400 duration-200"
                  >
                    Cancel
                  </button>
                </div>


                <button
                  onClick={() => handleDeleteEvent(newEvent.id)}
                  className="px-4 py-2 text-red-500 font-medium rounded hover:bg-red-700 duration-200">
                  Delete
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
