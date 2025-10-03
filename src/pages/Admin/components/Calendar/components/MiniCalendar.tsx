
import { useState } from 'react';
import Calendar from 'react-calendar';

export const MiniCalendar = ()=>{
    const [value, setValue] = useState<Date>(new Date())

    return(
                <Calendar
                    onChange={()=>setValue}
                    value={value}
                />
    )
}