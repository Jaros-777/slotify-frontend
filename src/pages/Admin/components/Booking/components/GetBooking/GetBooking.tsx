import { Download, Mail, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCheckIsLogged } from "../../../utlis/checkIsLoged";
import { QRCodeCanvas } from "qrcode.react";
import FacebookLogo from "../assets/Facebook_Logo_Primary.png"
import WhatsAppLogo from "../assets/Digital_Glyph_Green.png"
import LinkedlnLogo from "../assets/LI-In-Bug.png"
import axios from "axios";

export const GetBooking = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { checkIsLogged, isAuthLoading } = useCheckIsLogged();
    const [showCopyInfo, setShowCopyInfo] = useState<boolean>(false)
    const [businessUrl, setBusinessUrl] = useState<string>("")

    const mailToSendSubject = encodeURIComponent(`I invite you to make a reservation - ${businessUrl.slice(22,businessUrl.length)}`);
    const mailToSendBody = encodeURIComponent(`Good morning.\nBelow is a link to the booking page:\n${businessUrl}`);
    const mailto = `mailto:?subject=${mailToSendSubject}&body=${mailToSendBody}`



    const downloadQRCode = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `&{businessUrl}_QRCode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(businessUrl)
        setShowCopyInfo(true)

        setTimeout(() => {
            setShowCopyInfo(false)
        }, 1000);
    }

    const fetchBusinessName = async (token: string) => {
        await axios.get("http://localhost:8080/business-profile/name",
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setBusinessUrl("http://localhost:5173/" + response.data.businessName.toLowerCase())
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        (async () => {
            const token = await checkIsLogged();
            if (token) {
                await fetchBusinessName(token);
            }
        })();
    }, []);

    if (isAuthLoading) {
        return <p className="mt-20">Checking authentication...</p>;
    }

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <div className=" bg-white w-full p-6 ">
                    <div className="flex justify-between items-center w-full pb-2">
                        <h1 className="text-3xl font-bold">Get booking</h1>
                    </div>
                </div>
                <div className="bg-white m-6 rounded-2xl p-4 w-5/6">
                    <h2 className="font-bold text-xl">Your Booking Website</h2>
                    <h3 className="border-gray-300 border-b pt-2 pb-4">Your Booking Website is how your customers can see your business profile and book your services online.</h3>
                    <div className="flex mt-4">
                        <div className="border border-gray-300 rounded-2xl w-1/5 p-4 flex flex-col items-center">
                            <p className="pb-4 font-bold text-left w-full">QR code</p>
                            <QRCodeCanvas
                                ref={canvasRef}
                                value={businessUrl}
                                size={200}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                            <button className="mt-4 p-2 border border-gray-300 text-nowrap text-gray-500 font-bold text-sm w-full flex items-center justify-center cursor-pointer hover:text-red-500" onClick={downloadQRCode}>
                                <Download className="mr-2 h-[1.2em]"></Download>
                                <span>DOWNLOAD QR CODE</span>
                            </button>
                        </div>
                        <div className="border border-gray-300 rounded-2xl w-4/5 p-4 ml-4">
                            <p className="font-bold">Share via socials</p>
                            <div className="my-4 flex justify-around">
                                <a href={mailto} className="flex flex-col items-center mx-2 cursor-pointer">
                                    <div className="bg-blue-100 p-3 rounded-3xl">
                                        <Mail className="h-10 w-10 text-blue-600"></Mail>
                                    </div>
                                    <p className="mt-2 text-sm">Email</p>
                                </a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${businessUrl}`} target="_blank" className="flex flex-col items-center mx-2 cursor-pointer">
                                    <div className="bg-blue-100 p-3 rounded-3xl">
                                        <img className="h-10 w-10" src={FacebookLogo} alt="" />
                                    </div>
                                    <p className="mt-2 text-sm">Facebook</p>
                                </a>
                                <a href={`https://api.whatsapp.com/send?text=Zobacz+to!%20${businessUrl}`} target="_blank" className="flex flex-col items-center mx-2 cursor-pointer">
                                    <div className="bg-blue-100 p-3 rounded-3xl">
                                        <img className="h-10" src={WhatsAppLogo} alt="" />
                                    </div>
                                    <p className="mt-2 text-sm">WhatsApp</p>
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${businessUrl}`} target="_blank" className="flex flex-col items-center mx-2 cursor-pointer">
                                    <div className="bg-blue-100 p-3 rounded-3xl">
                                        <img className="h-10" src={LinkedlnLogo} alt="" />
                                    </div>
                                    <p className="mt-2 text-sm">Linkedln</p>
                                </a>
                            </div>
                            <div className="flex items-center">
                                <div className="h-0.5 w-full bg-gray-300"></div>
                                <p className="px-4">or</p>
                                <div className="h-0.5 w-full bg-gray-300"></div>
                            </div>
                            <p className="font-bold mt-6">Copy link</p>
                            <div
                                onClick={copyLink}
                                className="mt-6 flex border border-gray-300 rounded-md justify-between px-4 py-2 cursor-pointer
                                hover:border-gray-500 duration-200"
                            >
                                <p className="font-light">{businessUrl}</p>
                                <Copy></Copy>
                                {showCopyInfo ?
                                    <div className="fixed bottom-30 left-[50%] bg-slate-900 border text-white border-gray-300 px-4 py-2">
                                        Link copied
                                    </div>
                                    : null
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}