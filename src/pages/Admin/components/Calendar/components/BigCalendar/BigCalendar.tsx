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
import type { EventType, BookingStatus } from "../types/EventType";
import { CustomEvent } from "./components/CustomEvent";
import { CustomToolbar } from "./components/CustomToolbar";
import type { ServiceType } from "../../../types/ServiceType";
import axios from "axios";
import { toLocalDateTimeString } from "./utils/dateUtils";
import type { clientType } from "../../../Client/types/adminClientType";
import { useNavigate } from "react-router-dom";


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
  serviceData: ServiceType[],
  fetchData: () => void,
  setLoadingState: (value: boolean) => void
}

export const BigCalendar = ({ weekStartDate, onWeekChange, serviceData, events, fetchData, setLoadingState }: BigCalendarProps) => {
  const [userToken, setUserToken] = useState<string | null>("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<EventType>>({});
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  const [showEventDescription, setShowEventDescription] = useState<boolean>(false)
  const [showClientsList, setShowClientsList] = useState<boolean>(false);
  const [clientDetails, setClientDetails] = useState<clientType[]>([])
  const [filteredClientDetails, setFilteredClientDetails] = useState<clientType[]>([])
  const navigate = useNavigate()

  const handleSelectSlot = async (slotInfo: SlotInfo) => {
    await fetchPreviousClients()
    const diffInMinutes = (slotInfo.end.getTime() - slotInfo.start.getTime()) / 60000;

    setNewEvent({
      clientName: "",
      clientEmail: "",
      clientPhone: undefined,
      serviceId: serviceData[0].id,
      startDate: slotInfo.start,
      endDate: slotInfo.end,
      bookingStatus: "CONFIRMED",
      description: ""
    });

    setSelectedDuration(diffInMinutes);
    setShowEventDescription(false)
    setIsModalOpen(true);
  };


  const handleAddUpdateEvent = () => {
    if (!newEvent.clientName || !newEvent.startDate) {
      alert("Reservation must have client name");
      return;
    }

    newEvent.endDate = new Date(newEvent.startDate.getTime() + selectedDuration * 60 * 1000);

    const payload = {
      ...newEvent,
      startDate: toLocalDateTimeString(newEvent.startDate),
      endDate: toLocalDateTimeString(newEvent.endDate)
    };

    if (newEvent.id != undefined) {
      axios.put(`${import.meta.env.VITE_APP_URL}/events/update`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        }
      ).then(function (response) {
        setLoadingState(true)
        fetchData()
      }).catch(function (error) {
      })
    } else {
      axios.post(`${import.meta.env.VITE_APP_URL}/events`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        }
      ).then(function (response) {
        setLoadingState(true)
        fetchData()
      }).catch(function (error) {
      })
    }



    setIsModalOpen(false);
    setSelectedDuration(15);
  };


  const handleDeleteEvent = (id: number | string | undefined) => {
    axios.delete(`${import.meta.env.VITE_APP_URL}/events/delete/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      }
    ).then(res => {
      console.log(res)
      setLoadingState(true)
      fetchData()
    }).catch(function (error) {
      setIsModalOpen(false)
    })
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

  const fetchPreviousClients = async () => {
    await axios.get(`${import.meta.env.VITE_APP_URL}/admin/client/all`,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      }
    ).then(response => {
      setClientDetails(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }

  const filterClientNames = (text: string) => {
    const filtered = clientDetails.filter(e => e.name.toLowerCase().startsWith(text.toLowerCase()))

    if (filtered.length != 0 && text.length != 0) {
      setShowClientsList(true)
    } else {
      setShowClientsList(false)
    }
    setFilteredClientDetails(filtered)
  }


  useEffect(() => {
    const token = localStorage.getItem("token")
    setUserToken(token)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);



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
          if (event.bookingStatus === "VACATION") {
            localStorage.setItem("currentWeek", weekStartDate.toDateString())
            navigate(`/admin/settings/vacations/${event.id}`)
          } else {
            setNewEvent(event);
            const durationInMinutes = (event.endDate.getTime() - event.startDate.getTime()) / 60000;
            setSelectedDuration(durationInMinutes);
            setIsModalOpen(true);
            if (event.description != null) {
              setShowEventDescription(true)
            }
          }

        }}
        scrollToTime={new Date(2025, 0, 1, 8, 0, 0)}
        components={{
          event: CustomEvent,
          toolbar: (props) => <CustomToolbar {...props} currentViewDate={weekStartDate} />,
        }}
        eventPropGetter={(event: EventType) => {
          if (event.bookingStatus === "VACATION") {
            return {
              className: "vacation-event",
            };
          }
          if (event.bookingStatus === "TO_BE_CONFIRMED") {
            return {
              className: "to-be-confirmed-event",
            };
          }
          if (event.bookingStatus === "CLIENT_ARRIVED") {
            return {
              className: "client-arrived-event",
            };
          }
          if (event.bookingStatus === "CLIENT_DID_NOT_ARRIVE") {
            return {
              className: "client-did-not-arrive-event",
            };
          }
          return {};
        }}
        onNavigate={(date) => onWeekChange(getWeekStart(date))}
      />
      {isModalOpen && (
        <div className="fixed top-20 inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowClientsList(false)}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-96 flex flex-col items-start max-h-[90vh] overflow-y-auto" >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Client
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddUpdateEvent();
                }}
              >
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={newEvent.clientName || ""}
                    onChange={(e) => {
                      setNewEvent({ ...newEvent, clientName: e.target.value });
                      filterClientNames(e.target.value)
                    }
                    }
                    className="w-full border p-2 rounded mb-4 border-gray-300"
                  />
                  {showClientsList ?
                    <ul className="absolute bg-white p-2 border border-black w-84 left-0 top-10  z-100">
                      {filteredClientDetails.map(e => (
                        <li
                          onClick={() => {
                            setNewEvent(prev => ({
                              ...prev,
                              clientName: e.name,
                              clientEmail: e.email,
                              clientPhone: parseInt(e.phone) ?? undefined
                            }));
                            setShowClientsList(false)
                          }}
                          key={e.id}
                          className="cursor-pointer hover:bg-gray-300 px-2 flex">
                          <p>{e.name}</p>
                          <p className="ml-4">{e.email}</p>
                        </li>
                      ))}
                    </ul>
                    : null

                  }


                </div>
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
                  required
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
                    setNewEvent({ ...newEvent, serviceId: e.target.value })
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
                <p className="mt-4 font-medium">Booking status</p>
                <select
                  value={newEvent.bookingStatus}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, bookingStatus: e.target.value as BookingStatus })
                  }
                  className={`w-full border p-2 rounded mb-4 border-gray-300 ${newEvent.bookingStatus === "TO_BE_CONFIRMED" ? "bg-blue-100" : null}`}
                >
                  <option key={0} value={"CONFIRMED"}>
                    Confirmed
                  </option>
                  <option key={1} value={"TO_BE_CONFIRMED"}>
                    To confirm
                  </option>
                  <option key={2} value={"CLIENT_ARRIVED"}>
                    Client arrived
                  </option>
                  <option key={3} value={"CLIENT_DID_NOT_ARRIVE"}>
                    Client did not arrive
                  </option>

                </select>
                {showEventDescription ?
                  <>
                    <p className="font-medium">Description</p>
                    <textarea
                      value={newEvent.description || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, description: e.target.value })
                      }
                      className="w-full border p-2 rounded mb-4 border-gray-300"></textarea>
                  </>
                  :
                  <button className="cursor-pointer text-blue-500" onClick={() => setShowEventDescription(true)}>Add note</button>

                }
                <div className="flex w-full justify-between pt-4 mt-4 border-t-1 border-gray-300 ">
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded font-medium cursor-pointer hover:bg-blue-700 duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setIsModalOpen(false), setShowEventDescription(false) }}
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded font-medium cursor-pointer hover:bg-gray-400 duration-200"
                    >
                      Cancel
                    </button>
                  </div>


                  <button
                    onClick={() => handleDeleteEvent(newEvent.id)}
                    type="button"
                    className="px-4 py-2 text-red-500 font-medium rounded cursor-pointer hover:bg-red-700 hover:text-white duration-200">
                    Delete
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
