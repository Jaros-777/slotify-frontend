import { TrendingUp, Check, CornerDownRight, Star } from "lucide-react"
import { useState } from "react"


export const Pricing = () => {
    const [chosenBilingCycle, setChosenBilingCycle] = useState<"6" | "12" | "24">("12")

    return (
        <section id="pricing" className="flex justify-center my-20">
            <div className="w-full max-w-350 px-4 lg:px-16">
                <h1 className="text-5xl font-bold">Plan for every business</h1>
                <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center ">
                    <p className="font-bold text-2xl">Choose a biling cycle</p>
                    <div className="border border-gray-300 rounded-2xl  grid grid-cols-3 py-2 px-4 mt-6 lg:mt-0 lg:ml-6 lg:text-lg font-medium relative">
                        <button
                            className={`px-4 py-2 rounded-2xl lg:w-30 text-nowrap cursor-pointer duration-200 ${chosenBilingCycle === "6" ? "bg-blue-500 text-white" : null} `}
                            onClick={() => setChosenBilingCycle("6")}
                        >6 months</button>
                        <button
                            className={`px-4 py-2 rounded-2xl lg:w-30 cursor-pointer duration-200 ${chosenBilingCycle === "12" ? "bg-blue-500 text-white" : null} `}
                            onClick={() => setChosenBilingCycle("12")}
                        >1 year</button>
                        <button
                            className={`px-4 py-2 rounded-2xl lg:w-30 cursor-pointer duration-200 ${chosenBilingCycle === "24" ? "bg-blue-500 text-white" : null} `}
                            onClick={() => setChosenBilingCycle("24")}
                        >2 years</button>
                        {chosenBilingCycle != "24" ?
                            <div className="flex flex-row-reverse xl:flex-row absolute top-16 right-16 xl:-top-4 xl:-right-60 items-end lg:items-start">
                                <TrendingUp className="h-14 w-14" />
                                <p className="px-4 py-2 rounded-2xl bg-blue-900 text-white ml-2 text-lg text-nowrap">Get 4 months for free</p>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-rows-4 gap-4 xl:gap-0 xl:grid-cols-4 xl:grid-rows-1  rounded-2xl mt-20">
                    <div className="mt-10 p-4 border border-gray-300 rounded-2xl xl:rounded-tr-none xl:rounded-br-none h-full">
                        <p className="font-bold text-3xl">Launch</p>
                        <p className="mt-4 h-24">A simple starting plan for individuals who want to begin accepting online bookings with ease.</p>
                        <h3 className="font-bold text-4xl my-8">USD 0</h3>
                        {chosenBilingCycle != "6" ?
                            <div className="lg:h-9">
                            </div>
                            : null
                        }
                        <button
                            className="border border-blue-500 rounded-sm font-medium duration-200 text-blue-500 w-full py-2 cursor-pointer mt-2
                        hover:border-blue-800 hover:text-blue-800"
                            onClick={() => alert("This section isn't implemented yet!")}
                        >Get started</button>
                        <p className="mt-4 font-medium">Payment fees from</p>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">3.00% + PLN 0.45</p>
                        </div>
                        <p className="mt-4 font-medium">Features</p>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Up to 40 bookings per month</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Client database for up to 100 contacts</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Public online booking page</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Web and mobile app access</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Email notifications for new bookings</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Basic client overview and history</p>
                        </div>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Quick setup with no configuration required</p>
                        </div>
                    </div>
                    <div className="mt-10 p-4 border lg:border-y border-gray-300 h-full rounded-2xl xl:rounded-none">
                        <p className="font-bold text-3xl">Growth</p>
                        <p className="mt-4 h-24">
                            Designed for freelancers and small businesses ready to manage a clients efficiently.
                        </p>

                        <div className=" my-8">
                            <div className="flex">
                                <h3 className="font-bold text-4xl text-nowrap">USD {chosenBilingCycle === "6" ? "6.99" : chosenBilingCycle === "12" ? "5.99" : "4.99"}</h3>
                                <div className="flex flex-col ml-4 font-medium">
                                    <p>/month</p>
                                    <p>+ VAT</p>
                                </div>
                            </div>
                            {chosenBilingCycle != "6" ?
                                <div className="flex items-start ml-4 mt-2">
                                    <CornerDownRight className="text-green-600" />
                                    <p className="px-4 py-1 ml-2 bg-green-600 text-white rounded-2xl text-sm font-medium"
                                    >+{chosenBilingCycle === "12" ? "2" : "4"} months free</p>
                                </div>
                                : null
                            }
                        </div>

                        <button className="border border-blue-500 rounded-sm font-medium duration-200 text-blue-500 w-full py-2 cursor-pointer
                        hover:border-blue-800 hover:text-blue-800"
                            onClick={() => alert("This section isn't implemented yet!")}
                        >
                            Try for free
                        </button>

                        <p className="mt-4 font-medium">Payment fees from</p>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">2.50% + USD 0.35</p>
                        </div>

                        <p className="mt-4 font-medium">Features</p>

                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Up to 200 bookings per month</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Unlimited client records</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Automated email and SMS reminders</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Calendar sync with Google and Outlook</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Basic booking analytics</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Exportable booking data</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Customizable availability settings</p></div>
                    </div>
                    <div className="mt-10 xl:mt-0">
                        <div className="col-end-4 bg-blue-500 flex items-center justify-center text-white rounded-t-2xl py-2">
                            <Star />
                            <p className="ml-2 font-medium">Top Choice</p>
                        </div>
                        <div className="p-4 border border-gray-300 bg-blue-100 h-full rounded-bl-2xl rounded-br-2xl xl:rounded-bl-none xl:rounded-br-none">
                            <p className="font-bold text-3xl">Professional</p>
                            <p className="mt-4 h-24">
                                Advanced tools for established businesses that need customization and automation.
                            </p>

                            <div className=" my-8">
                                <div className="flex">
                                    <h3 className="font-bold text-4xl text-nowrap">USD {chosenBilingCycle === "6" ? "19.99" : chosenBilingCycle === "12" ? "18.99" : "17.99"}</h3>
                                    <div className="flex flex-col ml-4 font-medium">
                                        <p>/month</p>
                                        <p>+ VAT</p>
                                    </div>
                                </div>
                                {chosenBilingCycle != "6" ?
                                    <div className="flex items-start ml-4 mt-2">
                                        <CornerDownRight className="text-green-600" />
                                        <p className="px-4 py-1 ml-2 bg-green-600 text-white rounded-2xl text-sm font-medium"
                                        >+{chosenBilingCycle === "12" ? "2" : "4"} months free</p>
                                    </div>
                                    : null
                                }
                            </div>

                            <button className="bg-blue-500 text-white rounded-sm font-medium duration-200 w-full py-2 cursor-pointer 
                        hover:bg-blue-600 "
                                onClick={() => alert("This section isn't implemented yet!")}
                            >
                                Try for free
                            </button>

                            <p className="mt-4 font-medium">Payment fees from</p>
                            <div className="flex mt-2">
                                <Check className="text-blue-500" />
                                <p className="ml-2">2.00% + USD 0.30</p>
                            </div>

                            <p className="mt-4 font-medium">Features</p>

                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Up to 500 bookings per month</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Memberships and service packages</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Custom booking page branding</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Editable notification templates</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Staff scheduling tools</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Priority customer support</p></div>
                            <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Advanced integrations</p></div>
                        </div>
                    </div>
                    <div className="mt-10 p-4 border border-gray-300 rounded-2xl xl:rounded-tl-none xl:rounded-bl-none h-full">


                        <p className="font-bold text-3xl">Enterprise</p>
                        <p className="mt-4 h-24">
                            A scalable solution built for large teams and multi-location businesses.
                        </p>

                        <h3 className="font-bold text-4xl mb-4 lg:my-8">Custom</h3>
                        {chosenBilingCycle != "6" ?
                            <div className="lg:h-9">
                            </div>
                            : null
                        }

                        <button className="border border-blue-500 rounded-sm font-medium duration-200 text-blue-500 w-full py-2 cursor-pointer mt-2
                         hover:border-blue-800 hover:text-blue-800"
                            onClick={() => alert("This section isn't implemented yet!")}
                        >
                            Contact sales
                        </button>

                        <p className="mt-4 font-medium">Payment fees from</p>
                        <div className="flex mt-2">
                            <Check className="text-blue-500" />
                            <p className="ml-2">Custom pricing</p>
                        </div>

                        <p className="mt-4 font-medium">Features</p>

                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Unlimited bookings and clients</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Multi-location management</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Advanced user roles and permissions</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">White-label booking experience</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">API access and integrations</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Dedicated onboarding support</p></div>
                        <div className="flex mt-2"><Check className="text-blue-500" /><p className="ml-2">Enhanced security controls</p></div>
                    </div>


                </div>

            </div>
        </section>
    )
}