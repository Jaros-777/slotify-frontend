import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { SlotInfo } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enGB } from "date-fns/locale/en-GB";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import "./BigCalendar.css"
import type { EventType } from "../types/EventType";
import { CustomEvent } from "./components/CustomEvent";
import { CustomToolbar } from "./components/CustomToolbar";
import type { ServiceType } from "../types/ServiceType";
import axios from "axios";
import { toLocalDateTimeString } from "./utils/dateUtils";


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

interface BigCalendarProps {
  weekStartDate: Date,
  onWeekChange: (date: Date) => void,
  events: EventType[],
  serviceData: ServiceType[]
}

export const BigCalendar = ({ weekStartDate, onWeekChange, serviceData, events }: BigCalendarProps) => {
  const [userToken, setUserToken] = useState<string | null>("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<EventType>>({});
  const [selectedDuration, setSelectedDuration] = useState<number>(15);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const diffInMinutes = (slotInfo.end.getTime() - slotInfo.start.getTime()) / 60000;

    setNewEvent({
      clientName: "",
      clientEmail: "",
      clientPhone: undefined,
      serviceId: serviceData[0].id,
      startDate: slotInfo.start,
      endDate: slotInfo.end,
      bookingStatus: "CONFIRMED",
      description:""
    });

    setSelectedDuration(diffInMinutes);
    setIsModalOpen(true);
  };



  const handleAddEvent = () => {
    if (!newEvent.clientName || !newEvent.startDate) {
      alert("Reservation must have client name");
      return;
    }


    newEvent.endDate = new Date(newEvent.startDate.getTime() + selectedDuration * 60);
    console.log(newEvent)

    axios.post("http://localhost:8080/events",
      {...newEvent,
        start: toLocalDateTimeString(newEvent.startDate),
        end:toLocalDateTimeString(newEvent.endDate)
      },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      }
    ).then(function(response){
      window.location.reload()
    }).catch(function(error){
    })

    setIsModalOpen(false);
    setSelectedDuration(15);
  };


  const handleDeleteEvent = (id: number | string | undefined) => {
    // if (!id) return;
    // setEvents(events.filter(e => e.id.toString() !== id.toString()));
    // setIsModalOpen(false);
  }

  function getWeekStart(date: Date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    return start;
  }



  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
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


  useEffect(()=>{
    const token = localStorage.getItem("token")
    setUserToken(token)
  },[])

  return (
    <div className="h-200 p-4 pb-0 w-full">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        defaultView="week"
        step={15}
        timeslots={1}
        date={weekStartDate}
        culture="en-GB"
        className="h-full bg-white"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event: EventType) => {
          setNewEvent(event);
          const durationInMinutes = (event.endDate.getTime() - event.startDate.getTime()) / 60000;
          setSelectedDuration(durationInMinutes);
          setIsModalOpen(true);
        }}
        scrollToTime={new Date(2025, 0, 1, 8, 0, 0)}
        components={{
          event: CustomEvent,
          toolbar: (props) => <CustomToolbar {...props} currentViewDate={weekStartDate} />,
        }}
        onNavigate={(date) => onWeekChange(getWeekStart(date))}
      />
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Client
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEvent();
              }}
            >
              <input
                type="text"
                required
                placeholder="Name"
                value={newEvent.clientName || ""}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, clientName: e.target.value })
                }
                className="w-full border p-2 rounded mb-4 border-gray-300"
              />
              <input
                type="email"
                placeholder="Mail"
                value={newEvent.clientEmail || ""}
                required
                onChange={(e) =>
                  setNewEvent({ ...newEvent, clientEmail: e.target.value })
                }
                className="w-full border p-2 rounded mb-4 border-gray-300"
              />
              <input
                type="tel"
                pattern="[0-9]+"
                placeholder="Phone"
                minLength={9}
                maxLength={9}
                value={newEvent.clientPhone || undefined}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, clientPhone: Number(e.target.value) })
                }
                className="w-full border p-2 rounded mb-4 border-gray-300"
              />


              <p className=" font-medium">Assign service</p>
              <select
                value={newEvent.serviceId ?? serviceData[0].id}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, serviceId: Number(e.target.value) })
                }
                className="w-full border p-2 rounded mb-4 border-gray-300"
              >
                {serviceData.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <div className="flex w-full justify-between">
                <div>
                  <p className=" font-medium">Date</p>
                  <input
                    className="border-1 border-black px-2 py-1 h-[2em] border-gray-300"
                    type="date"
                    value={newEvent.startDate ? newEvent.startDate.toLocaleDateString("en-CA") : ""}
                    onChange={(e) => {
                      if (!newEvent.startDate) return;
                      const [year, month, day] = e.target.value.split("-").map(Number);
                      const hours = newEvent.startDate.getHours();
                      const minutes = newEvent.startDate.getMinutes();
                      setNewEvent({
                        ...newEvent,
                        startDate: new Date(year, month - 1, day, hours, minutes),
                        endDate: newEvent.endDate
                          ? new Date(
                            year,
                            month - 1,
                            day,
                            newEvent.endDate.getHours(),
                            newEvent.endDate.getMinutes()
                          )
                          : new Date(year, month - 1, day, hours + 0.5, minutes),
                      });
                    }}
                  />

                </div>
                <div>
                  <p className=" font-medium">Time</p>
                  <select
                    className="border-1 px-2 py-1 h-[2em] border-gray-300"
                    value={
                      newEvent.startDate
                        ? `${newEvent.startDate.getHours().toString().padStart(2, "0")}:${newEvent.startDate
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}`
                        : ""
                    }
                    onChange={(e) => {
                      if (!newEvent.startDate) return;
                      const [hours, minutes] = e.target.value.split(":").map(Number);
                      setNewEvent({
                        ...newEvent,
                        startDate: new Date(
                          newEvent.startDate.getFullYear(),
                          newEvent.startDate.getMonth(),
                          newEvent.startDate.getDate(),
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
                    className="border-1 border-black px-2 py-1 h-[2em] border-gray-300"
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
