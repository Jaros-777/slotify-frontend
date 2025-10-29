import type { EventType } from "../../types/EventType";
import { useData } from "../../../../../../../AppRouter";

export const CustomEvent = ({ event }: { event: EventType }) => {
  const {serviceData} = useData();
  const currentService = serviceData.find(e=>e.id === event.serviceId)

  return (
    <div className="p-1 flex flex-col ">
      <span className="font-semibold text-[0.7rem] ">{event.clientName}</span>
      <span className=" text-[0.7rem] py-1 ">{currentService?.name}</span>
    </div>
  );
};
