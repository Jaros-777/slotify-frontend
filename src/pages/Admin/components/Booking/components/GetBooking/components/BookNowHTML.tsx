import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../../../utlis/checkIsLoged";
import { LoadingPage } from "../../../../../../../LoadingPage";
import { X, Copy, Check, Plus, ConciergeBell } from "lucide-react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SlotifyIcon from "@/assets/desk-bell-icon.webp"

type EmbedConfig = {
    text: string
    mainColor: string
    hoverColor: string
    size: "small" | "medium" | "large"
}

const colors = [
    "#1e40af",
    "#ea580c",
    "#059669",
    "#db2777",
    "#b91c1c",
    "#7c3aed",
    "#1d4ed8",
    "#0f766e",
    "#06b6d4",
    "#059696",
    "#f43f5e",
    "#9333ea",
    "#3b82f6",
    "#ec4899",
    "#10b981",
    "#f472b6"
];


export const BookNowHTML = () => {
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged("admin");
    const navigate = useNavigate()
    const [config, setConfig] = useState<EmbedConfig>({
        text: "book now",
        mainColor: colors[0],
        hoverColor: colors[0],
        size: "medium"
    })
    const [showCopyInfo, setShowCopyInfo] = useState<boolean>(false)
    const [businessUrl, setBusinessUrl] = useState<string>("")
    const colorInputRef = useRef<HTMLInputElement>(null);


    const buttonCode =
        `<a href="${businessUrl}"
        target="_blank"
            style="background-color:${config.mainColor}; padding:${config.size === "large" ? "18" : config.size === "medium" ? "14" : "10"}px; padding-left: ${config.size === "large" ? "28" : config.size === "medium" ? "24" : "16"}px; padding-right: ${config.size === "large" ? "28" : config.size === "medium" ? "24" : "16"}px; 
            border-radius: 4px; color: white; text-decoration: none;font-weight: 600; 
            font-family: Arial, Helvetica, sans-serif; display: inline-flex; align-items: center; justify-content: center;
            font-size: 18px;"
            onmouseover="this.style.backgroundColor='${config.hoverColor}'" 
            onmouseout="this.style.backgroundColor='${config.mainColor}'">
            <img src="https://unpkg.com/lucide-static@latest/icons/concierge-bell.svg" alt="Slotify logo" style="height: 26px; width: 26px;display: block;  filter: brightness(0) invert(1)">
            <p style="text-wrap: nowrap; margin: 0; margin-left: 8px;">${config.text.toUpperCase()}</p>
        </a>`

    function darkenHex(hex: string, amount: number) {
        hex = hex.replace("#", "");
        const num = parseInt(hex, 16);
        let r = (num >> 16) & 0xff;
        let g = (num >> 8) & 0xff;
        let b = num & 0xff;

        r = Math.max(0, Math.min(255, Math.floor(r * (1 - amount))));
        g = Math.max(0, Math.min(255, Math.floor(g * (1 - amount))));
        b = Math.max(0, Math.min(255, Math.floor(b * (1 - amount))));

        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)}`;
    }

    const copyLink = () => {
        navigator.clipboard.writeText(buttonCode)
        setShowCopyInfo(true)

        setTimeout(() => {
            setShowCopyInfo(false)
        }, 1000);
    }

    const fetchBusinessName = async (token: string) => {
        await axios.get(`${import.meta.env.VITE_APP_URL}/business-profile/name`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setBusinessUrl(`${window.location.href.split("/").slice(0, 3).join("/")}/` + response.data.businessName.toLowerCase())
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const openColorPicker = () => {
        colorInputRef.current?.click();
    };


    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token)
                fetchBusinessName(token)
        })();
    }, []);

    if (isAuthLoading) {
        return <LoadingPage text="Checking authentication..." ></LoadingPage>;
    }
    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-between items-center bg-white py-4 px-6">
                <X className="cursor-pointer" onClick={() => navigate("/admin/booking/get-booking")}></X>
                <div className="flex">
                    <p className="font-bold text-2xl">Booking button</p>

                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-6 duration-200 rounded-md font-medium cursor-pointer hover:bg-blue-600"
                    onClick={() => navigate("/admin/booking/get-booking")}
                >DONE</button>
            </div>
            <div className="flex min-h-screen justify-between">
                <div className="bg-gray-200 flex justify-center p-6 w-3/4">
                    <div className="bg-white w-4/5 rounded-md">
                        <p className="text-2xl font-bold p-6">Configure & preview</p>
                        <div className="border-t border-gray-300 p-6">
                            <div className="border border-gray-300 rounded-md p-4">
                                <p className="text-xl font-bold border-b border-gray-300 pb-2">Live preview</p>
                                <div className="pt-8 pb-4 ml-4 flex items-center">
                                    <a href={businessUrl}
                                        target="_blank"
                                        style={{
                                            backgroundColor: config.mainColor,
                                            padding: config.size === "large" ? "18px" : config.size === "medium" ? "14px" : "10px",
                                            paddingLeft: config.size === "large" ? "28px" : config.size === "medium" ? "24px" : "16px",
                                            paddingRight: config.size === "large" ? "28px" : config.size === "medium" ? "24px" : "16px",
                                            borderRadius: "4px",
                                            color: "white",
                                            textDecoration: "none",
                                            fontWeight: 600,
                                            fontFamily: "Arial, Helvetica, sans-serif",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "18px",
                                            boxSizing: "content-box"
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = config.hoverColor)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = config.mainColor)}
                                    >
                                        <ConciergeBell style={{ height: "26px", width: "26px", display: "block" }} />
                                        <span
                                            style={{ textWrap: "nowrap", margin: "0px", marginLeft: "8px" }}
                                        >{config.text.toUpperCase()}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="px-6">
                            <div className="border border-gray-300 rounded-md p-4">
                                <p className="text-xl font-bold border-b border-gray-300 pb-2">Text</p>
                                <input
                                    type="text"
                                    placeholder="Text"
                                    value={config.text}
                                    onChange={(e) => setConfig(prev => ({
                                        ...prev,
                                        text: e.target.value
                                    }))}
                                    className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full mt-4"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-300 rounded-md p-4">
                                <p className="text-xl font-bold border-b border-gray-300 pb-2">Color theme</p>
                                <ul className="grid grid-cols-8 gap-2 mt-4 px-6">
                                    {colors.map(index => (
                                        <li
                                            key={index}
                                            className="min-h-10 rounded-md flex items-center justify-center cursor-pointer"
                                            style={{ backgroundColor: index }}
                                            onClick={() => setConfig(prev => ({
                                                ...prev,
                                                mainColor: index,
                                                hoverColor: darkenHex(index, 0.2)
                                            }))}
                                        >
                                            {config.mainColor === index ?
                                                <Check className="text-white"></Check>
                                                : null
                                            }
                                        </li>
                                    ))}
                                </ul>
                                <p className="my-4">Add your own brand color</p>
                                <div className="relative h-10 w-20">
                                    <input
                                        type="color"
                                        ref={colorInputRef}
                                        value={colors.includes(config.mainColor) ? "#fafcfc" : config.mainColor}
                                        onChange={(e) => setConfig(prev => ({
                                            ...prev,
                                            mainColor: e.target.value,
                                            hoverColor: darkenHex(e.target.value, 0.2)
                                        }))}
                                        className="h-10 w-20  cursor-pointer"
                                    />
                                    {!colors.includes(config.mainColor) ?
                                        <Check onClick={openColorPicker} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"></Check>
                                        : <Plus onClick={openColorPicker} className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"></Plus>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-300 rounded-md p-4">
                                <p className="text-xl font-bold border-b border-gray-300 pb-2">Size</p>
                                <div className="flex justify-between mt-4 px-6">
                                    <button
                                        onClick={() => setConfig(prev => ({
                                            ...prev,
                                            size: "large"
                                        }))}
                                        className="py-2 px-4 border border-gray-300 rounded-md flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-blue-500 appearance-none checked:bg-blue-500 border border-blue-500 rounded-full cursor-pointer"
                                            checked={config.size === "large" ? true : false}
                                            readOnly
                                        />

                                        <p className="ml-2 text-xl font-medium">Large</p>
                                    </button>
                                    <button
                                        onClick={() => setConfig(prev => ({
                                            ...prev,
                                            size: "medium"
                                        }))}
                                        className="py-2 px-4 border border-gray-300 rounded-md flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-blue-500 appearance-none checked:bg-blue-500 border border-blue-500 rounded-full cursor-pointer"
                                            checked={config.size === "medium" ? true : false}
                                            readOnly
                                        />

                                        <p className="ml-2 text-xl font-medium">Medium</p>
                                    </button>
                                    <button
                                        onClick={() => setConfig(prev => ({
                                            ...prev,
                                            size: "small"
                                        }))}
                                        className="py-2 px-4 border border-gray-300 rounded-md flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-blue-500 appearance-none checked:bg-blue-500 border border-blue-500 rounded-full cursor-pointer"
                                            checked={config.size === "small" ? true : false}
                                            readOnly
                                        />

                                        <p className="ml-2 text-xl font-medium">Small</p>
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="bg-white border border-gray-300 p-4">
                    <p className="font-bold text-xl">Get code</p>
                    <div className="border border-gray-300 mt-4 rounded-md">
                        <p className="font-bold text-xl p-4">HTML code</p>
                        <p className="px-4">Copy the code below to add the booking button to your website.</p>
                        <div className="p-4">
                            <textarea
                                value={buttonCode}
                                className="w-full h-120 border border-gray-300 rounded-md p-2 whitespace-pre-wrap"
                                readOnly>
                            </textarea>
                            <button
                                onClick={copyLink}
                                className="border border-blue-500 p-2 mb-2 text-blue-500 cursor-pointer flex mt-4 w-full rounded-md justify-center duration-200 hover:bg-blue-500 hover:text-white">
                                <Copy></Copy>
                                <p className="ml-2">COPY CODE</p>
                            </button>
                            {showCopyInfo ?
                                <div className="fixed bottom-10 right-[13%] bg-slate-900 border text-white border-gray-300 px-4 py-2">
                                    Code copied
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}