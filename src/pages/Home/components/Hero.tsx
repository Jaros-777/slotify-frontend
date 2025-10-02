import DoneLogo from "../assets/done-icon.png"
import BackgroundBellRing from "../assets/background-bell-ring.webp"

export const Hero =()=>{


    return(
        <section className="flex flex-col items-center my-24 " id="hero">
            <h1 className="text-7xl font-medium">Get Bokings, Take Payments,</h1>
            <h1 className="text-7xl mt-4 font-medium">and Grow Your Buisness</h1>
            <a href="#" className="mt-20 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 duration-200">Create free account</a>
            <div className="flex my-12">
                <div className="flex items-center mx-4">
                    <img src={DoneLogo} className="h-[1em] mr-2"/>
                    <p>Free plan forever</p>
                </div>
                <div className="flex items-center mx-4">
                    <img src={DoneLogo} className="h-[1em] mr-2"/>
                    <p>Works on web, Android and iOS</p>
                </div>
            </div>
            <img src={BackgroundBellRing} className="w-3/5 h-150 object-cover rounded-2xl mt-10"/>
        </section>
    )
}