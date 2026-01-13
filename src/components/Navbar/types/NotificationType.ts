
type typeNotification = "BOOKING"

export interface NotificationType{
    id: string,
    clientName: String,
    clientImgUrl: string | null,
    type: typeNotification,
    date: Date,
    bookingStartDate: Date,
    serviceName:String,
    isReaded: boolean
}