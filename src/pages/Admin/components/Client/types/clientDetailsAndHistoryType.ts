

export interface clientDetailsAndHistoryType{
    clientId:string
    clientName:string,
    clientEmail:string,
    clientPhone:string,
    historyDTO:clientHistoryType[]
}

interface clientHistoryType{
    id:string,
    clientId:string,
    startDate:Date,
    endDate:Date,
    serviceName:string
}