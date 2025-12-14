
export interface OrderResponse{
    chosenDate: Date
    chosenTime: string
    firstName?: string
    lastName?: string
    email?:string
    phone?:number
    description?: string
    agreements?: boolean
}