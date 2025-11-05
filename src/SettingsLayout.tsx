import { Outlet } from "react-router-dom"
import { Settings } from "./pages/Admin/components/Settings/Settings"

export const SettingsLayout = () => {

    return (
        <div className="flex w-full h-full">
            <Settings />
            <div className="bg-gray-200 w-full">
                <Outlet />
            </div>
        </div>

    )
}