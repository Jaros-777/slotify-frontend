import type { scheduleDay } from "../../../../Admin/components/Settings/components/Availability/utlis/scheduleType";
import type { ServiceType } from "../../../../Admin/components/types/ServiceType";

export interface OrderType{
    availabiltyDTO: scheduleDay[],
    bussinessName:string,
    bussinessPictureUrl:string,
    serviceDTO: ServiceType
}