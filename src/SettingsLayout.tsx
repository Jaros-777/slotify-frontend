import { Outlet } from "react-router-dom"
import { SettingsSideBar } from "./pages/Admin/components/Settings/SettingsSideBar"
import { FooterAdmin } from "./components/Footer/FooterAdmin"

export const SettingsLayout = () => {

    return (
        <div className="flex w-full min-h-screen">
            <SettingsSideBar />
            <div className="bg-gray-200 w-full flex flex-col justify-between">
                <Outlet />
                <FooterAdmin/>
            </div>
        </div>

    )
}