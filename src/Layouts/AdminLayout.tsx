import { Outlet } from "react-router-dom";
import { NavbarAdmin } from "../components/Navbar/NavbarAdmin";

export const AdminLayout = () => {
    return (
        <>
            <NavbarAdmin />
            <div className="pt-20 min-h-screen bg-gray-200 flex flex-col items-center">
                <Outlet />
            </div>

        </>
    );
};
