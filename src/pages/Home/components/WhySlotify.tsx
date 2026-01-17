import { useEffect, useState } from "react"


export const WhySlotify = () => {

    const [numbers, setNumber] = useState<number>(0)
    const [toScroll, setToScroll] = useState<boolean>(false)

    const useCountUp = (target: number, start: boolean, speed:number) => {
        const [value, setValue] = useState(0)

        useEffect(() => {
            if (!start) return

            const interval = setInterval(() => {
                setValue(prev => {
                    if (prev >= target) {
                        clearInterval(interval)
                        return target
                    }
                    return prev + 1
                })
            }, speed)

            return () => clearInterval(interval)
        }, [start, target, speed])

        return value
    }


    // useEffect(() => {
    //     if (toScrool) {


    //         const interval = setInterval(() => {
    //             setNumber(prev => {
    //                 if (prev >= 25) {
    //                     clearInterval(interval)
    //                     return prev
    //                 }
    //                 return prev + 1
    //             })
    //         }, 200)

    //         return () => clearInterval(interval)
    //     }
    // }, [toScrool])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1300)
                setToScroll(true)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const bookedClients = useCountUp(25, toScroll, 70)
    const bookingsPerYear = useCountUp(23, toScroll, 70)
    const businesses = useCountUp(550, toScroll, 2)

    return (
        <section id="why" className="bg-gray-200 flex flex-col items-center mt-20 py-30">
            <h1 className="text-6xl font-bold">Why Slotify?</h1>
            <div className="flex justify-around w-2/3 mt-14">
                <div className="flex flex-col items-center">
                    <p 
                    className={`font-bold text-6xl transition-colors duration-5000 ease-in-out ${toScroll ? "text-black" : "text-gray-400"}`}
                    >{bookedClients}<span className="text-black">M</span></p>
                    <p className="mt-4">booked clients</p>
                </div>
                <div className="flex flex-col items-center">
                    <p 
                    className={`font-bold text-6xl transition-colors duration-5000 ease-in-out ${toScroll ? "text-black" : "text-gray-400"}`}
                    >{bookingsPerYear}<span className="text-black">M</span></p>
                    <p className="mt-4">bookings per year</p>
                </div>
                <div className="flex flex-col items-center">
                    <p 
                    className={`font-bold text-6xl transition-colors duration-6000 ease-in-out ${toScroll ? "text-black" : "text-gray-400"}`}
                    >{businesses}<span className="text-black">K</span></p>
                    <p className="mt-4">satisfied businesses</p>
                </div>
            </div>
        </section>
    )
}