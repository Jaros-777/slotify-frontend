
export interface OrderResponse{
    serviceId?: string
    chosenDate?: Date
    firstName?: string
    lastName?: string
    email?:string
    phone?:number
    description?: string
    agreements?: boolean
    loggedClient?: boolean
}