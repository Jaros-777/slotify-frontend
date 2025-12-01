
export interface scheduleDay {
    id: number,
    dayOfWeek: number,
    openHour: string,
    closeHour: string,
    isClose: boolean,
}

// export interface scheduleWeek [
//     {monday: scheduleDay},
//     {tuesday: scheduleDay},
//     wednesday: scheduleDay,
//     thursday: scheduleDay,
//     friday: scheduleDay,
//     saturday: scheduleDay,
//     sunday: scheduleDay,
// ]
