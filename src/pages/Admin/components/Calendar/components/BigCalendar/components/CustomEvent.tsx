import type { EventType } from "../../types/EventType";
import { services } from "../data/services";

export const CustomEvent = ({ event }: { event: EventType }) => {

  return (
    <div className="p-1 flex flex-col ">
      <span className="font-semibold text-[0.7rem] ">{event.name}</span>
      <span className=" text-[0.7rem] py-1 ">{services[event.service]?.name ?? "Unknow service"}</span>
    </div>
  );
};
